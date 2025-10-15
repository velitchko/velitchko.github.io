import Link from 'next/link';
import { getAllBlogPosts, getAllCategories } from '@/lib/markdown';
import BlogListing from '@/app/blog/BlogListing';

export default async function BlogPage() {
  const posts = await getAllBlogPosts();
  const allCategories = await getAllCategories();

  return (
    <div className="min-h-screen pt-32 pb-20">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-12">
          <Link 
            href="/"
            className="inline-flex items-center text-neon-cyan hover:text-neon-pink hover:neon-glow transition-colors mb-6"
          >
            <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
            </svg>
            BACK TO HOME
          </Link>
          
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-retro neon-glow-pink mb-4">
            [blog.log]
          </h1>
          <p className="text-neon-cyan/80 text-lg">
            updates, thoughts, and rants on visualization research
          </p>
        </div>

        <BlogListing posts={posts} categories={allCategories} />
      </div>
    </div>
  );
}
