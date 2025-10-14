'use client';

import { useState } from 'react';
import Link from 'next/link';
import type { BlogPost } from '@/data/blog';

interface BlogListingProps {
  posts: BlogPost[];
  categories: string[];
}

export default function BlogListing({ posts, categories }: BlogListingProps) {
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);

  // Filter posts by category
  const filteredPosts = selectedCategory
    ? posts.filter(post => post.categories.includes(selectedCategory))
    : posts;

  return (
    <>
      {/* Category Filter */}
      {categories.length > 0 && (
        <div className="mb-12">
          <div className="flex flex-wrap gap-3">
            {selectedCategory && (
              <button
                onClick={() => setSelectedCategory(null)}
                className="px-4 py-2 text-sm font-mono border-2 border-neon-pink/50 text-neon-pink bg-neon-pink/10 hover:border-neon-pink transition-all duration-300 relative overflow-hidden group"
              >
                <span className="absolute inset-0 bg-neon-pink transform translate-y-full transition-transform duration-300 group-hover:translate-y-0 -z-10"></span>
                <span className="relative z-10 transition-colors duration-300 group-hover:text-retro-darker">✕ CLEAR</span>
              </button>
            )}
            {categories.map((category) => (
              <button
                key={category}
                onClick={() => setSelectedCategory(category)}
                className={`px-4 py-2 text-sm font-mono border-2 transition-all duration-300 cursor-pointer relative overflow-hidden group ${
                  selectedCategory === category
                    ? 'border-neon-cyan text-retro-darker bg-neon-cyan font-bold'
                    : 'border-neon-cyan/50 text-neon-cyan bg-neon-cyan/10 hover:border-neon-cyan'
                }`}
              >
                <span className={`absolute inset-0 bg-neon-cyan transform translate-y-full transition-transform duration-300 ${selectedCategory === category ? '' : 'group-hover:translate-y-0'} -z-10`}></span>
                <span className={`relative z-10 transition-colors duration-300 ${selectedCategory === category ? '' : 'group-hover:text-retro-darker'}`}>
                  {category}
                </span>
              </button>
            ))}
          </div>
        </div>
      )}

      {/* Blog Posts */}
      <div className="space-y-8">
        {filteredPosts.length === 0 ? (
          <div className="retro-card text-center py-12">
            <p className="text-neon-cyan/60 text-lg">No posts found</p>
          </div>
        ) : (
          filteredPosts.map((post) => (
            <article key={post.slug} className="retro-card group hover:scale-[1.02] transition-transform duration-300">
              <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-4 mb-4">
                <div className="flex-1">
                  <Link href={`/blog/${post.slug}`}>
                    <h2 className="text-xl sm:text-2xl font-retro text-neon-cyan group-hover:text-neon-pink group-hover:neon-glow transition-colors mb-2">
                      {post.title}
                    </h2>
                  </Link>
                  <div className="flex flex-wrap items-center gap-3 text-sm text-neon-cyan/60">
                    <time className="font-mono">{new Date(post.date).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}</time>
                    {post.readingTime && (
                      <>
                        <span>•</span>
                        <span className="font-mono">{post.readingTime} min read</span>
                      </>
                    )}
                  </div>
                </div>
              </div>

              <p className="text-neon-cyan/80 mb-4 leading-relaxed">
                {post.excerpt}
              </p>

              {/* Author */}
              {post.author && (
                <div className="text-sm text-neon-cyan/60 font-mono mb-3">
                  By {post.author}
                </div>
              )}

              {/* Hashtags */}
              {post.hashtags && post.hashtags.length > 0 && (
                <div className="flex flex-wrap gap-2 mb-3">
                  {post.hashtags.map((tag) => (
                    <span
                      key={tag}
                      className="px-2 py-1 text-xs font-mono border border-neon-pink/30 text-neon-pink/80 bg-neon-pink/5"
                    >
                      #{tag}
                    </span>
                  ))}
                </div>
              )}

              {/* Categories */}
              <div className="flex flex-wrap gap-2 mb-4">
                {post.categories.map((category) => (
                  <span
                    key={category}
                    className="px-3 py-1 text-xs border border-neon-cyan/30 text-neon-cyan/80 bg-neon-cyan/5"
                  >
                    {category}
                  </span>
                ))}
              </div>

              <Link
                href={`/blog/${post.slug}`}
                className="inline-flex items-center text-sm text-neon-pink hover:neon-glow transition-colors"
              >
                READ MORE
                <svg className="w-4 h-4 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </Link>
            </article>
          ))
        )}
      </div>
    </>
  );
}
