import React from 'react';
import { Helmet } from 'react-helmet';
import { Link } from 'react-router-dom';

export default function WeekendWatchPage() {
  return (
    <div className="relative min-h-screen bg-gradient-to-b from-black via-zinc-900 to-black text-white font-body px-4 pt-20 pb-56">
      <Helmet>
        <title>What to Watch This Weekend | The Movies Finder</title>
        <meta
          name="description"
          content="Wondering what to watch this weekend? Explore the best movies to stream, new TV shows, and trending content across Netflix, Hulu, Prime, Apple TV+, and more — updated weekly."
        />
        <meta
          name="keywords"
          content="what to watch this weekend, new movies to stream, streaming this weekend, best streaming movies, new tv shows, netflix movies, apple tv, best movies to stream, trending movies, random movie generator, weekend movies"
        />
      </Helmet>

      {/* Optional background texture */}
      <div className="absolute inset-0 z-0 pointer-events-none bg-[url('https://www.transparenttextures.com/patterns/asfalt-dark.png')] opacity-10 mix-blend-soft-light" />

      <div className="relative z-10 max-w-5xl mx-auto">
        <h1 className="text-3xl md:text-4xl font-heading font-semibold text-center mb-6">
          What to Watch This Weekend
        </h1>
        <p className="text-center text-sm text-zinc-400 mb-10 max-w-2xl mx-auto">
          Updated weekly with the best new movies to stream and trending TV shows you can binge this weekend — skip the endless scroll and get watching.
        </p>

        <div className="space-y-6 text-sm text-zinc-300 leading-relaxed">
          <p>
            What to watch this weekend? It’s a question we ask every Friday night. Between work, college, or just
            chilling, we all want to make our weekend count. And let’s be real — with new streaming content dropping
            every week, deciding what to watch can get overwhelming. That’s why we created this space: to help you find
            the best movies and shows to stream this weekend without wasting 30 minutes scrolling.
          </p>
          <p>
            Whether you're on Netflix, Prime, Apple TV, Hulu, or HBO Max, this guide is built to show you the latest
            releases, most talked-about shows, and underrated gems that are trending right now. We cover all major
            platforms and recommend movies that are fresh, fun, emotional, funny, or just absolutely binge-worthy. If
            it's good and it's streaming this weekend — it's listed here.
          </p>
          <p>
            Need a good laugh? We’ve listed the best new comedy movies to stream this weekend. Looking for something
            dark and thrilling? Scroll for the latest crime dramas and Netflix thrillers that are getting all the buzz.
            In the mood for romance or a true story? Yup, we’ve got those too. We even track the best Apple TV shows and
            Amazon Prime exclusives so you don’t miss out.
          </p>
          <p>
            This list updates every Friday to reflect what’s actually new. Not stuff that came out a month ago — we mean
            brand-new streaming releases, top IMDb picks, and social media trending series you can binge right now. 
            Think of this page as your personal random movie generator, minus the randomness.
          </p>
          <p>
            And don’t sleep on the new TV shows either. The best series to watch this weekend are often the ones that
            haven’t hit your radar yet. We highlight new TV shows 2024 audiences are loving, hidden gems blowing up on
            Reddit, and must-watch episodes from all over.
          </p>
          <p className="text-green-400 font-medium">
            TL;DR — If you’re asking what to stream this weekend, you’re in the right place. Save this page, hit that
            CTA, and find what to watch now.
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
