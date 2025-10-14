export interface BlogPost {
  slug: string;
  title: string;
  subtitle?: string;
  date: string; // ISO date string
  author: string;
  hashtags: string[];
  excerpt: string;
  content: string; // Markdown content
  categories: string[];
  attachments?: Array<{
    name: string;
    url: string;
    type: 'pdf' | 'other';
  }>;
  readingTime?: number; // in minutes
  featured?: boolean;
}

// This will be populated by the markdown parser
// Blog posts are stored as .md files in /data/blog-posts/
export const blogPosts: BlogPost[] = [];
