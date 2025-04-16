// src/pages/AboutPage.js
import React from 'react';
import '../index.css'; // Global or Tailwind styles, if applicable

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-black text-white pt-20 px-6 md:px-10 font-body">
      <div className="max-w-5xl mx-auto space-y-10">
        {/* Page Title */}
        <h1 className="text-4xl md:text-5xl font-heading font-bold text-center">
          About TheMoviesFinder
        </h1>

        {/* Back to Home Link */}
        <div className="text-center">
          <a
            href="/"
            className="text-sm text-zinc-400 hover:text-pink-400 underline transition"
          >
            ← Back to Home
          </a>
        </div>

        {/* Main Content */}
        <div className="space-y-10 leading-relaxed text-base md:text-lg text-zinc-300">
          {/* Intro Section */}
          <section className="space-y-5">
            <p>
              Welcome to TheMoviesFinder — your weekend's new best friend 🎬🍿 Look, we’ve all been there. You sit down, snack in hand, full of anticipation, and then — boom — 45 minutes of scrolling later, you still haven’t picked anything. Enter <strong>TheMoviesFinder</strong>: your go-to sidekick when it comes to figuring out what to watch this weekend, weeknight, or basically any time you wanna chill.
            </p>
            <p>
              Whether you're on the hunt for the <strong>best movies to stream right now</strong>, craving those laugh-out-loud <strong>comedy movies</strong>, or deep diving into <strong>new streaming movies 2025-style</strong>, we gotchu. No more decision fatigue. No more mindless scrolling. Just vibes and recommendations.
            </p>
          </section>

          {/* What’s TheMoviesFinder All About? */}
          <section className="space-y-5">
            <h2 className="text-2xl font-semibold text-zinc-50 font-heading">
              So, what’s TheMoviesFinder all about?
            </h2>
            <p>
              We help you skip the stress and jump straight into the good stuff. No more asking Google <em>"what movie should I watch quiz"</em> or hopping through <strong>Reddit movies</strong> threads trying to decode what “funny movies to watch high” actually means. Just one smooth, clean place to:
            </p>
            <ul className="list-disc list-inside space-y-2 pl-4">
              <li>Discover <strong>new movies to stream this weekend</strong>, or literally whenever</li>
              <li>Browse the best shows on <strong>Apple TV</strong>, <strong>Netflix</strong>, <strong>Hulu</strong>, <strong>Amazon Prime</strong>, <strong>HBO Max</strong>, <strong>Peacock</strong></li>
              <li>Filter by <strong>comedy</strong>, <strong>horror</strong>, <strong>mini-series</strong>, <strong>feel-good</strong>, <strong>family comedy movies</strong>, and more</li>
              <li>Check out what’s <strong>new on streaming this week</strong>, from Netflix drops to hidden Apple TV gems</li>
              <li>Spin the wheel with a <strong>random movie generator</strong>, <strong>name generator</strong>, or <strong>Disney movie picker</strong></li>
            </ul>
          </section>

          {/* We Speak Fluent Binge */}
          <section className="space-y-5">
            <h2 className="text-2xl font-semibold text-zinc-50 font-heading">
              We speak fluent binge:
            </h2>
            <p>
              Want <strong>TV shows to stream</strong>? Easy. Need <strong>funny family movies</strong> or <strong>feel good movies on Netflix</strong>? Yup. Digging for the <strong>best movies streaming now</strong> or wondering <em>what new movies are streaming</em> this weekend? We got your list — and then some.
            </p>
          </section>

          {/* Not Your Average Guide */}
          <section className="space-y-5">
            <h2 className="text-2xl font-semibold text-zinc-50 font-heading">
              We’re not your average streaming guide:
            </h2>
            <ul className="list-disc list-inside space-y-2 pl-4">
              <li>We update our lists <strong>in real-time</strong>, featuring <strong>new releases streaming this week</strong></li>
              <li>Our rec engine serves up <strong>top streaming series</strong> and <strong>hidden gems from Reddit</strong></li>
              <li>From <strong>Prime Video bangers</strong> to <strong>fresh Netflix drops</strong>, we keep it 🔥</li>
            </ul>
            <p>
              Whether you’re into <strong>horror series</strong>, <strong>mini series on Netflix</strong>, or just <strong>good vibes only shows</strong>, we got you.
            </p>
          </section>

          {/* Built for the Indecisive */}
          <section className="space-y-5">
            <h2 className="text-2xl font-semibold text-zinc-50 font-heading">
              Built for the indecisive, the curious, and the weekend warriors
            </h2>
            <p>
              This isn’t just another site with a list. This is your <strong>movie matchmaker</strong>, your <strong>streaming concierge</strong>, your <strong>FOMO cure</strong>. We serve you:
            </p>
            <ul className="list-disc list-inside space-y-2 pl-4">
              <li><strong>Best shows streaming right now</strong></li>
              <li><strong>New streaming movies this weekend</strong></li>
              <li><strong>Best movies of the 2020s</strong></li>
              <li><strong>Good new movies to stream</strong></li>
              <li><strong>Binge-worthy TV shows</strong></li>
              <li><strong>Sitcoms to watch</strong></li>
              <li><strong>Mini series on every platform</strong></li>
            </ul>
          </section>

          {/* TL;DR */}
          <section className="space-y-5">
            <h2 className="text-2xl font-semibold text-zinc-50 font-heading">
              TL;DR? Here’s what you can expect:
            </h2>
            <ul className="list-disc list-inside space-y-2 pl-4">
              <li><strong>New movies streaming now</strong>, every week</li>
              <li><strong>Best shows to stream</strong>, no fluff</li>
              <li><strong>Weekend streaming picks</strong> done for you</li>
              <li><strong>Reddit movie streams</strong>? We cover that.</li>
              <li><strong>What to watch this weekend</strong>? Already queued.</li>
              <li><strong>TV hits from 2024, 2025, and beyond</strong></li>
              <li><strong>Netflix, Prime, Hulu, Apple TV — fully loaded</strong></li>
            </ul>
            <p>
              Next time you’re spiraling into a scroll-hole, wondering <em>what’s new to stream this week</em>, just remember — TheMoviesFinder has already done the legwork. Click less. Stream more. 🚀
            </p>
          </section>
        </div>
      </div>
    </div>
  );
}