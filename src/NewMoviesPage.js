// ✅ NewMoviesPage.js
import React from 'react';
import { Helmet } from 'react-helmet';
import { Link } from 'react-router-dom';

export default function NewMoviesPage() {
  return (
    <div className="relative min-h-screen bg-gradient-to-b from-black via-zinc-900 to-black text-white font-body px-4 pt-20 pb-56">
      <Helmet>
        <title>New Movies to Stream | The Movies Finder</title>
        <meta
          name="description"
          content="Explore the best new movies to stream this weekend. Get real-time updates on what's new on Netflix, Hulu, Apple TV, Prime Video, and more — no more FOMO."
        />
        <meta
          name="keywords"
          content="new movies to stream, best new movies, new movies streaming now, new streaming movies, netflix new releases, movies to watch, new netflix movies, movies streaming now, trending movies, good movies, reddit movies, hulu shows"
        />
      </Helmet>

      {/* Optional background grain */}
      <div className="absolute inset-0 z-0 pointer-events-none bg-[url('https://www.transparenttextures.com/patterns/asfalt-dark.png')] opacity-10 mix-blend-soft-light" />

      <div className="relative z-10 max-w-5xl mx-auto">
        <h1 className="text-3xl md:text-4xl font-heading font-semibold text-center mb-6">
          New Movies to Stream
        </h1>
        <p className="text-center text-sm text-zinc-400 mb-10 max-w-2xl mx-auto">
          A constantly updated list of what’s new on Netflix, Hulu, Prime, Apple TV+, and more. No fluff. Just the best
          new movies to stream right now.
        </p>

        <div className="space-y-6 text-sm text-zinc-300 leading-relaxed">
          <p>
            If you're hunting for new movies to stream this weekend, you’re in the right place. This isn’t another basic
            blog that tells you to watch something that dropped two months ago. We dig deep into what’s actually
            trending right now on Netflix, Prime Video, Hulu, Apple TV+, and other streaming platforms — so you know
            exactly what to watch the moment you land here.
          </p>

          <p>
            From blockbuster new streaming movies to under-the-radar indie flicks, this list is built for streamers who
            want quality over quantity. Whether you're into comedy movies, thriller dramas, best horror movies on
            Netflix, or random picks from Reddit movies threads — we’re dropping it all here.
          </p>

          <p>
            Our engine scrapes new netflix movies, best movies on amazon prime, and even fresh Apple TV originals.
            Whether you're asking “what's new on Netflix?” or “what movies are streaming now?”, we’ve got you covered.
            The list updates every 24 hours so you're always seeing the freshest drops — not outdated recaps.
          </p>

          <p>
            Highlights include new movies to stream this weekend, what to watch on Netflix, trending Apple TV shows,
            new tv shows 2024, and upcoming series that you can bookmark right now. We also include movies out now and
            series that align with your mood — funny movies, deep thrillers, and even good movies to cry over (no shame).
          </p>

          <p>
            Want to explore more? We give you access to random movie generator logic that surfaces unexpected hits. Some
            titles even blow up first on Reddit or TikTok before the algorithm catches up — and you’ll find those here
            first.
          </p>

          <p>
            You don’t need to bounce between Netflix series 2024 lists, Hulu TV pages, and Prime Video recommendations
            anymore. Everything’s centralized. Whether you're into best movies streaming now, movies to stream with
            friends, or finding underrated stuff for movie night — you’ll find it here, no cap.
          </p>

          <p className="text-green-400 font-medium">
            Ready to stop scrolling and start watching? Let’s find the best new movies to stream right now.
          </p>
        </div>
      </div>

      {/* ✅ Sticky CTA Footer Bar */}
      <div className="fixed bottom-0 left-0 right-0 z-50 bg-zinc-900 border-t border-zinc-800 py-4 px-4">
        <div className="max-w-5xl mx-auto flex justify-center">
          <Link
            to="/"
            className="bg-gradient-to-r from-red-500 to-pink-500 hover:from-red-600 hover:to-pink-600 text-white px-6 py-3 rounded-xl shadow-xl font-medium transition"
          >
            🎬 Browse Movie Picks Now
          </Link>
        </div>
      </div>
    </div>
  );
}
