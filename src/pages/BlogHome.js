// src/pages/BlogHome.js
import React from 'react';
import { Link } from 'react-router-dom';

const blogPosts = [
  {
    title: 'What to Watch This Weekend (April 19–21)',
    slug: 'weekend-watch-april-2024',
    description: 'Your weekend streaming guide — Netflix, Prime & hidden gems.',
    image: 'https://image.tmdb.org/t/p/w500/ctMserH8g2SeOAnCw5gFjdQF8mo.jpg',

  },
  {
    title: 'Top 5 New Movies You Can’t Miss This Week (April 22–28)',
    slug: 'new-movies-april-2024',
    description: 'Fresh releases across Netflix, Prime, and Apple TV — handpicked for movie buffs.',
    image: 'https://image.tmdb.org/t/p/w500/xOMo8BRK7PfcJv9JCnx7s5hj0PX.jpg',
  },
  {
    title: 'Netflix Secret: What to Watch When Nothing Looks Good (April 2025)',
    slug: 'netflix-secret-april-2025',
    description: 'Feeling stuck on Netflix? This April guide helps you break decision paralysis and stream smart.',
    image: 'https://image.tmdb.org/t/p/w500/8uVKfOJUhmybNsVh089EqLHUYEG.jpg',

  },
  
];

export default function BlogHome() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-black via-zinc-900 to-black text-white px-6 py-20 font-body">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-4xl md:text-5xl font-heading text-center mb-12 text-white flex items-center justify-center gap-3">
          <span className="text-5xl">🎬</span> <span className="bg-gradient-to-r from-red-500 to-pink-500 text-transparent bg-clip-text">Latest from The Blog</span>
        </h1>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
          {blogPosts.map((post, index) => (
            <Link
              to={`/blog/${post.slug}`}
              key={index}
              className="bg-zinc-900 border border-zinc-800 rounded-2xl overflow-hidden hover:shadow-2xl hover:scale-105 transition-transform duration-300 group"
            >
              <div className="relative h-60 overflow-hidden">
                <img
                  src={post.image}
                  alt={post.title}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                  onError={(e) => {
                    e.target.src = 'https://via.placeholder.com/500x300?text=Image+Not+Found';
                  }}
                />
              </div>
              <div className="p-5">
                <h2 className="text-lg font-semibold text-white mb-2 leading-snug font-heading">
                  {post.title}
                </h2>
                <p className="text-sm text-zinc-400 mb-3 font-body">
                  {post.description}
                </p>
                <span className="text-xs text-pink-500 font-medium hover:underline font-body">Read More →</span>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}