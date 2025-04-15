// ✅ WhatToWatchPage.js
import React from 'react';
import { Helmet } from 'react-helmet';
import { Link } from 'react-router-dom';

export default function WhatToWatchPage() {
  return (
    <div className="relative min-h-screen bg-gradient-to-b from-black via-zinc-900 to-black text-white font-body px-4 pt-20 pb-56">
      <Helmet>
        <title>What to Watch | The Movies Finder</title>
        <meta
          name="description"
          content="Confused about what to watch? Discover the best movies, top TV shows, and trending content on Netflix, Hulu, Prime, Apple TV+, and more — updated in real-time."
        />
        <meta
          name="keywords"
          content="what to watch, good movies to watch, best shows to watch, movies to stream, best tv shows, netflix series, movies 2024, new tv shows, good shows, new netflix movies, best movies to stream, watch series, what to watch on netflix"
        />
      </Helmet>

      {/* Optional texture */}
      <div className="absolute inset-0 z-0 pointer-events-none bg-[url('https://www.transparenttextures.com/patterns/asfalt-dark.png')] opacity-10 mix-blend-soft-light" />

      <div className="relative z-10 max-w-5xl mx-auto">
        <h1 className="text-3xl md:text-4xl font-heading font-semibold text-center mb-6">
          What to Watch
        </h1>
        <p className="text-center text-sm text-zinc-400 mb-10 max-w-2xl mx-auto">
          Your one-stop destination for the best movies, trending series, and binge-worthy shows — handpicked and updated in real time.
        </p>

        <div className="space-y-6 text-sm text-zinc-300 leading-relaxed">
          <p>
            Let’s be honest — deciding what to watch has become a full-time job. With thousands of shows, movies, and
            streaming options, it’s harder than ever to pick something that’s actually worth your time. That’s why we
            built this page: to answer the internet’s most common question — “what should I watch right now?”
          </p>

          <p>
            Whether you’re into good movies to watch with friends, comedy movies that’ll crack you up, or underrated
            Netflix series to binge alone, we’ve got all your streaming moods covered. This isn’t another generic list
            that repeats “Stranger Things” and calls it a day. This is curated, constantly updated, and tailored to
            what’s hot this week.
          </p>

          <p>
            If you’re looking for what to watch on Netflix, the best new TV shows on Hulu, or movies out now on Prime —
            it’s all right here. We’ve even tagged the best shows on Apple TV, trending movies on Reddit, and random gems
            most people miss. You’ll find good movies, new Netflix movies, popular series, and upcoming movies 2024 fans
            are hyped for.
          </p>

          <p>
            Into true crime? We’ve got crime thrillers and dark documentaries. Want a feel-good Friday? Scroll for
            funny movies, romantic Netflix originals, or heartwarming family stories. Craving suspense? We’ve added the
            best horror movies on Netflix and Hulu that’ll keep you up all night.
          </p>

          <p>
            This page is built for every type of streamer: from casual scrollers who just want good shows to watch, to
            hardcore binge-watchers who finish entire seasons in a weekend. We factor in what’s trending on social,
            Reddit movies hype, IMDb scores, and even new Netflix series 2024 users are loving.
          </p>

          <p>
            We also have options if you're feeling totally indecisive. Our smart filters work like a random movie
            generator — but smarter. You can jump from “top streaming movies” to “best shows to stream right now”
            without wasting hours digging through app menus.
          </p>

          <p>
            Every recommendation is sourced from live streaming availability data. So whether you're on Netflix, Hulu,
            Amazon Prime, Apple TV+, or even Peacock, you’ll know instantly what’s available to stream in your region.
          </p>

          <p>
            Tired of seeing the same content everywhere? We’re different. We keep this list alive — adding new releases,
            pulling out hidden gems, and cutting the clutter. If you’ve ever opened 4 streaming apps and still ended up
            watching reruns, this page is your solution.
          </p>

          <p className="text-green-400 font-medium">
            TL;DR: You’ll never ask “what should I watch?” again — just scroll, explore, and stream. We've got the
            internet's best answer to "what to watch."
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
            🔍 Start Exploring What to Watch
          </Link>
        </div>
      </div>
    </div>
  );
}