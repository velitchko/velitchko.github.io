import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';
import { remark } from 'remark';
import remarkGfm from 'remark-gfm';
import remarkMath from 'remark-math';
import remarkRehype from 'remark-rehype';
import rehypeStringify from 'rehype-stringify';
import rehypeHighlight from 'rehype-highlight';
import hljs from 'highlight.js/lib/core';
import latex from 'highlight.js/lib/languages/latex';
import rehypeCopyButton from './rehypeCopyButton';
import { BlogPost } from '@/data/blog';

// Register LaTeX language for syntax highlighting
hljs.registerLanguage('latex', latex);

const blogPostsDirectory = path.join(process.cwd(), 'data/blog-posts');

/**
 * Get all blog post slugs from markdown files
 */
export function getAllBlogPostSlugs(): string[] {
  try {
    const fileNames = fs.readdirSync(blogPostsDirectory);
    return fileNames
      .filter(fileName => fileName.endsWith('.md'))
      .map(fileName => fileName.replace(/\.md$/, ''));
  } catch (error) {
    console.error('Error reading blog posts directory:', error);
    return [];
  }
}

/**
 * Parse markdown file and return BlogPost
 */
export async function getBlogPostBySlug(slug: string): Promise<BlogPost | null> {
  try {
    const fullPath = path.join(blogPostsDirectory, `${slug}.md`);
    
    // Check if file exists before trying to read it
    if (!fs.existsSync(fullPath)) {
      return null;
    }
    
    const fileContents = fs.readFileSync(fullPath, 'utf8');

    // Parse frontmatter
    const { data, content } = matter(fileContents);

    // Process markdown to HTML with syntax highlighting, LaTeX, and copy button
    const processedContent = await remark()
      .use(remarkGfm)
      .use(remarkMath)
      .use(remarkRehype, { allowDangerousHtml: true })
      .use(rehypeHighlight, { 
        languages: { latex },
        prefix: 'hljs-'
      })
      .use(rehypeCopyButton)
      .use(rehypeStringify, { allowDangerousHtml: true })
      .process(content);

    const contentHtml = processedContent.toString();

    // Calculate reading time (rough estimate: 200 words per minute)
    const words = content.split(/\s+/).length;
    const readingTime = Math.ceil(words / 200);

    // Parse attachments if they exist
    const attachments = data.attachments
      ? (Array.isArray(data.attachments) ? data.attachments : [data.attachments])
      : undefined;

    const blogPost: BlogPost = {
      slug,
      title: data.title || 'Untitled',
      subtitle: data.subtitle,
      date: data.date || new Date().toISOString().split('T')[0],
      author: data.author || 'Velitchko Filipov',
      hashtags: Array.isArray(data.hashtags) ? data.hashtags : (data.hashtags || '').split(',').map((t: string) => t.trim()).filter(Boolean),
      excerpt: data.excerpt || content.substring(0, 150) + '...',
      content: contentHtml,
      categories: Array.isArray(data.categories) ? data.categories : (data.categories || '').split(',').map((c: string) => c.trim()).filter(Boolean),
      attachments,
      readingTime,
      featured: data.featured || false,
    };

    return blogPost;
  } catch (error) {
    console.error(`Error reading blog post ${slug}:`, error);
    return null;
  }
}

/**
 * Get all blog posts, sorted by date (newest first)
 */
export async function getAllBlogPosts(): Promise<BlogPost[]> {
  const slugs = getAllBlogPostSlugs();
  const posts = await Promise.all(
    slugs.map(slug => getBlogPostBySlug(slug))
  );

  // Filter out null posts and sort by date
  return posts
    .filter((post): post is BlogPost => post !== null)
    .sort((a, b) => {
      const dateA = new Date(a.date).getTime();
      const dateB = new Date(b.date).getTime();
      return dateB - dateA; // Newest first
    });
}

/**
 * Get all unique categories from blog posts
 */
export async function getAllCategories(): Promise<string[]> {
  const posts = await getAllBlogPosts();
  const categories = new Set<string>();
  
  posts.forEach(post => {
    post.categories.forEach(category => categories.add(category));
  });

  return Array.from(categories).sort();
}

/**
 * Get all unique hashtags from blog posts
 */
export async function getAllHashtags(): Promise<string[]> {
  const posts = await getAllBlogPosts();
  const hashtags = new Set<string>();
  
  posts.forEach(post => {
    post.hashtags.forEach(tag => hashtags.add(tag));
  });

  return Array.from(hashtags).sort();
}

/**
 * Filter blog posts by category
 */
export async function getBlogPostsByCategory(category: string): Promise<BlogPost[]> {
  const posts = await getAllBlogPosts();
  return posts.filter(post => 
    post.categories.some(cat => cat.toLowerCase() === category.toLowerCase())
  );
}

/**
 * Filter blog posts by hashtag
 */
export async function getBlogPostsByHashtag(hashtag: string): Promise<BlogPost[]> {
  const posts = await getAllBlogPosts();
  return posts.filter(post =>
    post.hashtags.some(tag => tag.toLowerCase() === hashtag.toLowerCase())
  );
}
