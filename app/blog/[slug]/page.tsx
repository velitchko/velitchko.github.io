import Link from 'next/link';
import { getBlogPostBySlug, getAllBlogPostSlugs } from '@/lib/markdown';
import { notFound } from 'next/navigation';
import ExportBibtex from './ExportBibtex';

export async function generateStaticParams() {
  const slugs = getAllBlogPostSlugs();
  return slugs.map((slug) => ({
    slug: slug,
  }));
}

export default async function BlogPostPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const post = await getBlogPostBySlug(slug);

  if (!post) {
    notFound();
  }

  return (
    <div className="min-h-screen pt-32 pb-20">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Back Link */}
        <Link 
          href="/blog"
          className="inline-flex items-center text-neon-cyan hover:text-neon-pink hover:neon-glow transition-colors mb-8"
        >
          <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
          </svg>
          BACK TO BLOG
        </Link>

        {/* Post Header */}
        <article className="retro-card">
          <h1 className="text-2xl sm:text-3xl md:text-4xl font-retro text-neon-pink neon-glow-pink mb-2">
            {post.title}
          </h1>
          
          {post.subtitle && (
            <h2 className="text-lg sm:text-xl text-neon-cyan/70 mb-6">
              {post.subtitle}
            </h2>
          )}

          <div className="flex flex-wrap items-center gap-4 text-sm text-neon-cyan/60 mb-6">
            <time className="font-mono">
              {new Date(post.date).toLocaleDateString('en-US', { 
                year: 'numeric', 
                month: 'long', 
                day: 'numeric' 
              })}
            </time>
            {post.author && (
              <>
                <span>•</span>
                <span className="font-mono">By {post.author}</span>
              </>
            )}
            {post.readingTime && (
              <>
                <span>•</span>
                <span className="font-mono">{post.readingTime} min read</span>
              </>
            )}
          </div>

          {/* Hashtags */}
          {post.hashtags && post.hashtags.length > 0 && (
            <div className="flex flex-wrap gap-2 mb-6">
              {post.hashtags.map((tag) => (
                <span
                  key={tag}
                  className="px-3 py-1 text-sm font-mono border border-neon-pink/30 text-neon-pink/80 bg-neon-pink/5"
                >
                  #{tag}
                </span>
              ))}
            </div>
          )}

          {/* Categories */}
          <div className="flex flex-wrap gap-2 mb-8 pb-8 border-b border-neon-cyan/20">
            {post.categories.map((category) => (
              <span
                key={category}
                className="px-3 py-1 text-xs border border-neon-cyan/30 text-neon-cyan/80 bg-neon-cyan/5"
              >
                {category}
              </span>
            ))}
          </div>

          {/* Post Content - Markdown rendered as HTML */}
          <div className="blog-content">
            <div 
              dangerouslySetInnerHTML={{ __html: post.content }}
            />
          </div>

          {/* Attachments */}
          {post.attachments && post.attachments.length > 0 && (
            <div className="mt-12 pt-8 border-t border-neon-cyan/20">
              <h3 className="text-xl font-retro text-neon-cyan mb-4">Attachments</h3>
              <div className="space-y-3">
                {post.attachments.map((attachment, idx) => (
                  <a
                    key={idx}
                    href={attachment.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-3 p-4 border border-neon-cyan/30 hover:border-neon-pink hover:bg-neon-pink/5 transition-all group"
                  >
                    <svg className="w-6 h-6 text-neon-cyan group-hover:text-neon-pink" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 21h10a2 2 0 002-2V9.414a1 1 0 00-.293-.707l-5.414-5.414A1 1 0 0012.586 3H7a2 2 0 00-2 2v14a2 2 0 002 2z" />
                    </svg>
                    <span className="font-mono text-neon-cyan group-hover:text-neon-pink">
                      {attachment.name}
                    </span>
                    {attachment.type === 'pdf' && (
                      <span className="ml-auto text-xs text-neon-cyan/60">PDF</span>
                    )}
                  </a>
                ))}
              </div>
            </div>
          )}

          {/* BibTeX Citation */}
          <ExportBibtex post={post} />
        </article>

        {/* Navigation */}
        <div className="mt-12 flex justify-between items-center">
          <Link
            href="/blog"
            className="retro-button"
          >
            ← ALL POSTS
          </Link>
          <Link
            href="/"
            className="retro-button"
          >
            HOME
          </Link>
        </div>
      </div>
    </div>
  );
}
