import React from 'react';
import './index.css'; // Global or Tailwind styles, if applicable

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-black text-white px-6 py-10 font-body">
      <div className="max-w-5xl mx-auto space-y-8">
        {/* Page Title */}
        <h1 className="text-4xl md:text-5xl font-bold text-center mb-6">
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
        <div className="space-y-8 leading-relaxed text-lg text-zinc-300">
          {/* Intro Section */}
          <section className="space-y-4">
            <p>
              Welcome to TheMoviesFinder — your weekend's new best friend 🎬🍿 
              Look, we’ve all been there. You sit down, snack in hand, 
              full of anticipation, and then — boom — 45 minutes of scrolling later, 
              you still haven’t picked anything. Enter <strong>TheMoviesFinder</strong>: 
              your go-to sidekick when it comes to figuring out what to watch 
              this weekend, weeknight, or basically any time you wanna chill.
            </p>
            <p>
              Whether you're on the hunt for the <strong>best movies to stream right now</strong>, 
              craving those laugh-out-loud <strong>comedy movies</strong>, 
              or deep diving into <strong>new streaming movies 2025-style</strong>, we gotchu. 
              No more decision fatigue. No more mindless scrolling. Just vibes and recommendations.
            </p>
          </section>

          {/* What’s TheMoviesFinder All About? */}
          <section className="space-y-4">
            <h2 className="text-2xl font-semibold text-zinc-50">
              So, what’s TheMoviesFinder all about?
            </h2>
            <p>
              We help you skip the stress and jump straight into the good stuff. 
              No more asking Google <em>"what movie should I watch quiz"</em> 
              or hopping through <strong>Reddit movies</strong> threads trying to decode 
              what “funny movies to watch high” actually means. 
              Just one smooth, clean place to:
            </p>
            <ul className="list-disc list-inside space-y-2 pl-4">
              <li>
                Discover <strong>new movies to stream this weekend</strong>, or literally whenever
              </li>
              <li>
                Browse the <strong>best shows on Apple TV</strong>, <strong>Netflix</strong>,{' '}
                <strong>Hulu</strong>, <strong>Amazon Prime</strong>, <strong>HBO Max</strong>,{' '}
                <strong>Peacock</strong> and other top platforms
              </li>
              <li>
                Filter by <strong>comedy</strong>, <strong>horror</strong>, <strong>mini-series</strong>,{' '}
                <strong>feel-good</strong>, <strong>zombie show</strong>, <strong>family comedy movies</strong>, 
                or whatever your vibe is tonight
              </li>
              <li>
                Check out what’s <strong>new on streaming this week</strong>, from the hottest{' '}
                <strong>Netflix 2025</strong> drops to that hidden{' '}
                <strong>new series to watch</strong> on Apple TV
              </li>
              <li>
                Even spin the wheel with a <strong>random movie generator</strong>, 
                <strong> movie name generator</strong>, or <strong>random Disney movie generator</strong> 
                if you're feeling spicy or just straight-up indecisive
              </li>
            </ul>
          </section>

          {/* We Speak Fluent Binge */}
          <section className="space-y-4">
            <h2 className="text-2xl font-semibold text-zinc-50">
              We speak fluent binge:
            </h2>
            <p>
              Want <strong>tv shows to stream</strong>? Easy. 
              Need <strong>funny family movies</strong> or <strong>feel good movies on Netflix</strong>? Yup. 
              Digging for <strong>best movies streaming now 2025</strong> or wondering 
              <em>what new movies are streaming</em> this weekend? 
              We’ve got your list — and then some.
            </p>
          </section>

          {/* Not Your Average Guide */}
          <section className="space-y-4">
            <h2 className="text-2xl font-semibold text-zinc-50">
              We’re not your average streaming guide:
            </h2>
            <ul className="list-disc list-inside space-y-2 pl-4">
              <li>
                We update our lists <strong>in real-time</strong>, highlighting{' '}
                <strong>new releases streaming this week</strong> and{' '}
                <strong>new streaming this weekend</strong>.
              </li>
              <li>
                Our smart rec engine serves up <strong>top streaming series</strong>,{' '}
                <strong>best new shows to watch</strong>, and even those underground bangers folks 
                whisper about in <strong>Reddit streaming movies</strong> threads.
              </li>
              <li>
                Into <strong>best movies on Amazon Prime</strong>, <strong>best movies Apple TV</strong>, 
                or <strong>new Netflix movies 2025</strong>? We keep it fresh, relevant, and 🔥.
              </li>
            </ul>
            <p>
              Whether you're deep into <strong>streaming shows to watch</strong>, 
              want the <strong>best comedy on Netflix</strong>, or need to know the{' '}
              <strong>best new streaming series</strong>, TheMoviesFinder is the plug. 
              And we don’t gatekeep.
            </p>
          </section>

          {/* Built for the Indecisive */}
          <section className="space-y-4">
            <h2 className="text-2xl font-semibold text-zinc-50">
              Built for the indecisive, the curious, and the weekend warriors
            </h2>
            <p>
              This isn’t just another site with a list. This is your <strong>movie matchmaker</strong>, 
              your <strong>show sommelier</strong>, your secret weapon for figuring out 
              what’s hot, trending, and underrated AF. We serve you:
            </p>
            <ul className="list-disc list-inside space-y-2 pl-4">
              <li><strong>Best shows streaming right now</strong></li>
              <li><strong>New streaming movies this weekend</strong></li>
              <li><strong>Best movies of the 2020s</strong></li>
              <li><strong>Best new movies to rent</strong></li>
              <li><strong>Good new movies to stream</strong></li>
              <li><strong>Bingeable tv shows</strong></li>
              <li><strong>Sitcoms to watch</strong></li>
              <li><strong>Best mini series on Netflix</strong></li>
              <li>
                <strong>Best Apple TV series</strong> and <strong>Peacock shows</strong> 
                you didn’t know you needed
              </li>
            </ul>
            <p>
              And hey, if you just wanna check what’s <strong>new on Netflix</strong>, 
              what’s <strong>new to Hulu</strong>, or what’s cooking with 
              <strong>Apple TV free weekend</strong>, we got the goods lined up.
            </p>
          </section>

          {/* TL;DR */}
          <section className="space-y-4">
            <h2 className="text-2xl font-semibold text-zinc-50">
              TL;DR? Here’s what you can expect:
            </h2>
            <ul className="list-disc list-inside space-y-2 pl-4">
              <li><strong>New movies streaming now</strong>, every week</li>
              <li><strong>Best shows to stream right now</strong>, handpicked, no fluff</li>
              <li><strong>Streaming this weekend</strong> sorted out for you</li>
              <li><strong>Reddit movie streams</strong>? Covered.</li>
              <li><strong>What to watch this weekend</strong>? Already queued.</li>
              <li>
                <strong>Best TV shows 2025</strong>, <strong>TV series 2024</strong>, 
                and even fresh <strong>new TV shows 2025</strong>? Yup.
              </li>
              <li>
                Want <strong>best horror movies on Netflix</strong> or the latest 
                <strong> comedy movies 2023</strong>? Pull up.
              </li>
            </ul>
            <p>
              Next time you’re spiraling into a scroll-hole trying to find 
              <strong> good shows to stream</strong>, or wondering <em>what’s new to stream this week</em>, 
              remember — TheMoviesFinder has already done the legwork. 
              Click less, stream more. Let’s gooo 🚀
            </p>
          </section>
        </div>
      </div>
    </div>
  );
}
