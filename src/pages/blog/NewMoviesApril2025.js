// src/pages/blog/NewMoviesApril2025.js
import React from 'react';
import { Helmet } from 'react-helmet';
import { Link } from 'react-router-dom';

export default function NewMoviesApril2025() {
  return (
    <div className="min-h-screen bg-black text-white px-6 py-20 font-body">
      <Helmet>
        <title>Top 5 New Movies This Week (April 22–28, 2025) | The Movies Finder</title>
        <meta
          name="description"
          content="Discover the top new movies to stream or catch in theaters this week (April 22–28, 2025). Curated picks across Netflix, Prime, Apple TV+, and more."
        />
        <meta
          name="keywords"
          content="new movies 2025, april movie releases, what to watch april 2025, netflix prime video hulu, apple tv new movies"
        />
      </Helmet>

      <div className="max-w-3xl mx-auto">
        <Link to="/blog" className="text-sm text-pink-500 hover:underline mb-6 inline-block">
          ← Back to Blog
        </Link>

        <h1 className="text-4xl md:text-5xl font-extrabold text-white mb-6">
          🎬 Top 5 New Movies You Can’t Miss This Week (April 22–28, 2025)
        </h1>

        <p className="text-zinc-400 mb-6 text-lg leading-relaxed">
          Tired of doom-scrolling every app trying to find that one movie that won’t waste your night? We got you. This week (April 22–28, 2025), streaming platforms are dropping some absolute bangers — from sci-fi epics to romantic brain-twisters, and even political thrillers that'll have you staring at the credits in silence. Whether you’re a film nerd or just wanna chill with popcorn, here are 5 picks that are trending right now and actually worth your time.
        </p>

        <h2 className="text-2xl font-bold text-white mb-3">🔥 Fresh Drops Worth Watching</h2>
        <div className="text-zinc-400 mb-6 space-y-6 leading-relaxed">
          <div>
            <strong>Rebel Moon: Part Two (Netflix):</strong> Zack Snyder is back with bigger explosions, more space rebellions, and a visual style that’s practically built for 4K screens. If you liked Part One, this follow-up brings more grit, emotional arcs, and cinematic chaos.
          </div>

          <div>
            <strong>Fingernails (Apple TV+):</strong> Ever wish you could scientifically prove if your partner is the one? This weirdly romantic dystopian flick lets you test your love — literally. It’s artsy, a little unhinged, and hits harder than you’d expect.
          </div>

          <div>
            <strong>The Kill Room (Prime Video):</strong> A satirical crime thriller with Uma Thurman and Samuel L. Jackson? Say less. This darkly funny ride through the art world’s criminal underbelly is sharp, stylish, and wildly unpredictable.
          </div>

          <div>
            <strong>The Greatest Hits (Hulu):</strong> What if a song could transport you back in time? This music-infused romance plays with memory and grief in a way that’s fresh, emotional, and deeply Gen Z-coded. Also — the soundtrack slaps.
          </div>

          <div>
            <strong>Civil War (In Theaters):</strong> From the director of <em>Ex Machina</em>, this is a political thriller set in a future U.S. divided by chaos. It’s haunting, raw, and designed to spark discussion. Go see it in theaters if you want that big-screen tension.
          </div>
        </div>

        <p className="text-zinc-400 leading-relaxed mb-6">
          So yeah — no skips this week. These aren’t just “good enough” to play in the background. They’re the kind of films that’ll stick with you or at least give you something solid to debate in the group chat. Whether you’re watching solo, with your partner, or on a FaceTime stream night — these picks deliver.
        </p>

        <p className="text-green-500 text-sm">
          We update this list every week — come back next Monday for your next hit list. 🎥🍿
        </p>
      </div>
    </div>
  );
}
