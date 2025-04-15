// ✅ NewTVShowsPage.js
import React from 'react';
import { Helmet } from 'react-helmet';
import { Link } from 'react-router-dom';

export default function NewTVShowsPage() {
  return (
    <div className="relative min-h-screen bg-gradient-to-b from-black via-zinc-900 to-black text-white font-body px-4 pt-20 pb-56">
      <Helmet>
        <title>New TV Shows | The Movies Finder</title>
        <meta
          name="description"
          content="Discover the best new TV shows to watch right now. From Netflix and Hulu to Apple TV and Prime Video, this list updates constantly with trending series and fresh releases."
        />
        <meta
          name="keywords"
          content="new tv shows, new tv shows 2024, tv shows to watch, new shows, netflix series, streaming shows, hulu tv, watch series, best tv shows, shows to stream, apple tv shows"
        />
      </Helmet>

      {/* Optional texture background */}
      <div className="absolute inset-0 z-0 pointer-events-none bg-[url('https://www.transparenttextures.com/patterns/asfalt-dark.png')] opacity-10 mix-blend-soft-light" />

      <div className="relative z-10 max-w-5xl mx-auto">
        <h1 className="text-3xl md:text-4xl font-heading font-semibold text-center mb-6">
          New TV Shows to Watch
        </h1>
        <p className="text-center text-sm text-zinc-400 mb-10 max-w-2xl mx-auto">
          Stop asking your group chat what to watch. We’ve got the newest, most bingeable TV shows across all platforms — updated in real time.
        </p>

        <div className="space-y-6 text-sm text-zinc-300 leading-relaxed">
          <p>
            If you’re tired of outdated “Top 10” lists or randomly scrolling through platforms, this is your new go-to.
            We’ve gathered the freshest new TV shows to stream across Netflix, Hulu, Prime Video, Apple TV+, and more — all in one place.
          </p>

          <p>
            From new Netflix series and 2024 breakout hits to Hulu shows and Apple TV exclusives, we’re always updating
            this page to reflect the most-watched, most-hyped, and most slept-on shows right now. It’s the perfect place
            to discover a new obsession.
          </p>

          <p>
            Looking for shows to watch with friends? Or maybe something slow-burn for solo weekends? We’ve got drama
            series, mystery thrillers, reality TV, rom-coms, sci-fi drops, and everything in between. Whether you’re
            after emotional binge-fests, funny sitcoms, or dark documentaries — you’ll find something here.
          </p>

          <p>
            New TV shows are launching every week — and we keep up. Our list includes trending Netflix series, new Hulu
            originals, and Apple TV+ sleeper hits that deserve your attention. You’ll even find shows that Reddit,
            Twitter, and TikTok can’t stop talking about — including surprise breakouts that haven’t hit mainstream yet.
          </p>

          <p>
            If you’ve already finished the biggest hits and need what’s next, scroll on. Our recommendations are built
            around what’s actually available to stream — no trailers-only nonsense, no geo-blocked hype. Just real shows,
            streaming now.
          </p>

          <p>
            This page is ideal for those searching “tv shows to watch,” “new tv shows 2024,” “best shows to stream,” or
            even “watch series online.” And yes — we include new episodes for returning seasons, pilot debuts, and
            limited series you can finish in one weekend.
          </p>

          <p className="text-green-400 font-medium">
            TL;DR: Stop wasting time scrolling — these are the new TV shows worth watching right now. Updated daily. Watched by millions.
          </p>
        </div>
      </div>

      {/* Sticky CTA Footer Bar */}
      <div className="fixed bottom-0 left-0 right-0 z-50 bg-zinc-900 border-t border-zinc-800 py-4 px-4">
        <div className="max-w-5xl mx-auto flex justify-center">
          <Link
            to="/"
            className="bg-gradient-to-r from-red-500 to-pink-500 hover:from-red-600 hover:to-pink-600 text-white px-6 py-3 rounded-xl shadow-xl font-medium transition"
          >
            📺 Explore Show Picks
          </Link>
        </div>
      </div>
    </div>
  );
}
