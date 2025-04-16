import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X } from 'lucide-react'; // uses Lucide icons

export default function Header() {
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation();

  return (
    <header className="bg-black border-b border-zinc-800 text-white px-4 py-4 fixed top-0 w-full z-50">
      <div className="max-w-6xl mx-auto flex items-center justify-between">
        <Link to="/" className="text-xl font-bold tracking-tight flex items-center gap-2">
          🎬 The Movies Finder
        </Link>

        {/* Desktop Nav */}
        <div className="hidden md:flex space-x-6 text-sm items-center">
          <Link
            to="/trending-movies/shows-in-2025"
            className="bg-zinc-800 hover:bg-zinc-700 px-4 py-2 rounded-full border border-zinc-600 transition"
          >
            🔥 View Trending
          </Link>
          <Link
            to="/about"
            className={`hover:text-pink-400 transition ${
              location.pathname === '/about' ? 'text-pink-400' : 'text-zinc-400'
            }`}
          >
            About Us
          </Link>
          <Link
            to="/blog"
            className={`hover:text-pink-400 transition ${
              location.pathname.startsWith('/blog') ? 'text-pink-400' : 'text-zinc-400'
            }`}
          >
            📝 Blog
          </Link>
        </div>

        {/* Hamburger for mobile */}
        <button onClick={() => setIsOpen(!isOpen)} className="md:hidden">
          {isOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Mobile Nav Menu */}
      {isOpen && (
        <div className="md:hidden mt-4 flex flex-col space-y-4 text-sm text-zinc-300 px-2">
          <Link
            to="/trending-movies/shows-in-2025"
            onClick={() => setIsOpen(false)}
            className="bg-zinc-800 hover:bg-zinc-700 px-4 py-2 rounded-full border border-zinc-600 text-center"
          >
            🔥 View Trending
          </Link>
          <Link
            to="/about"
            onClick={() => setIsOpen(false)}
            className="hover:text-pink-400 transition text-center"
          >
            About Us
          </Link>
          <Link
            to="/blog"
            onClick={() => setIsOpen(false)}
            className="hover:text-pink-400 transition text-center"
          >
            📝 Blog
          </Link>
        </div>
      )}
    </header>
  );
}
