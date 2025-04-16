// src/pages/Contact.js
import React from 'react';

export default function Contact() {
  return (
    <div className="min-h-screen bg-black text-white px-6 py-20 font-body max-w-3xl mx-auto">
      <h1 className="text-3xl font-bold mb-6 text-center">Contact Us</h1>

      <p className="text-zinc-300 text-sm leading-relaxed mb-6 text-center">
        Have questions, suggestions, or want to collaborate? Feel free to reach out. We usually reply within 24 hours.
      </p>

      <div className="text-center">
        <a
          href="mailto:contact@themoviesfinder.com"
          className="bg-gradient-to-r from-red-500 to-pink-500 hover:from-red-600 hover:to-pink-600 px-6 py-3 rounded-full text-white font-medium transition shadow-lg"
        >
          📧 Email Us at info@themoviesfinder.com
        </a>
      </div>
    </div>
  );
}
