// src/MovieRecommendationApp.js
import React, { useState, useEffect, useCallback, useRef } from "react";
import axios from "axios";
import "./index.css";
import { sendAnalyticsEvent, GA_EVENTS } from "./utils/analytics";
import { GENRES, PLATFORMS, SORT_OPTIONS } from "./constants/filters";
import SeoHelmet from "./components/SeoHelmet";
import MovieCard from "./components/MovieCard";
import GuessTheMovie from "./components/GuessTheMovie";
import { motion } from "framer-motion";
import FilterBar from "./components/FilterBar";
import {
  fetchStreamingMovies,
  enrichWithTMDBPosters,
} from "./utils/movieUtils";
import ActionButtons from "./components/ActionButtons";

export default function MovieRecommendationApp() {
  const [selectedGenre, setSelectedGenre] = useState("");
  const [selectedCountry, setSelectedCountry] = useState("");
  const [selectedPlatform, setSelectedPlatform] = useState("");
  const [selectedSort, setSelectedSort] = useState("popularity_1year");
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(false);
  const [isGuessGameActive, setIsGuessGameActive] = useState(false);
  const [guessGameMovie, setGuessGameMovie] = useState(null);
  const resultsRef = useRef(null);
  const topRef = useRef(null);

  const handleStartGuessGame = () => {
    if (movies.length > 0) {
      const randomIndex = Math.floor(Math.random() * movies.length);
      const selected = movies[randomIndex];
      console.log("🎯 Selected movie:", selected);
      setGuessGameMovie(selected);
      setIsGuessGameActive(true);
    } else {
      alert("Please fetch recommendations first!");
    }
  };

  const scrollToTop = () => {
    topRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    const fetchUserCountry = async () => {
      try {
        const response = await axios.get("https://ipapi.co/json/");
        setSelectedCountry(response.data.country_code.toLowerCase());
      } catch (error) {
        console.error("🌍 Country detection failed:", error);
        setSelectedCountry("us");
      }
    };
    fetchUserCountry();
  }, []);

  const fetchMovies = useCallback(async () => {
    if (!selectedGenre) return;
    setLoading(true);
    try {
      sendAnalyticsEvent(GA_EVENTS.GET_RECOMMENDATIONS_CLICKED, {
        genre: selectedGenre,
        country: selectedCountry,
        platform: selectedPlatform,
        sort: selectedSort,
      });
    } catch (e) {
      console.warn("Analytics error (clicked)", e);
    }

    try {
      const fetchedMovies = await fetchStreamingMovies({
        selectedGenre,
        selectedCountry,
        selectedPlatform,
        selectedSort,
      });

      const enrichedMovies = await enrichWithTMDBPosters(fetchedMovies);

      setMovies(enrichedMovies);
      await new Promise((resolve) => setTimeout(resolve, 50));
      resultsRef.current?.scrollIntoView({ behavior: "smooth" });

      try {
        sendAnalyticsEvent(GA_EVENTS.GET_RECOMMENDATIONS_SUCCESS, {
          genre: selectedGenre,
          country: selectedCountry,
          platform: selectedPlatform,
          sort: selectedSort,
          results: fetchedMovies.length,
        });
      } catch (e) {
        console.warn("Analytics error (success)", e);
      }
    } catch (error) {
      console.error("❌ Movie fetch failed", error);
      try {
        sendAnalyticsEvent(GA_EVENTS.GET_RECOMMENDATIONS_FAILED, {
          genre: selectedGenre,
          country: selectedCountry,
          platform: selectedPlatform,
          sort: selectedSort,
          error: error.message,
        });
      } catch (e) {
        console.warn("Analytics error (failed)", e);
      }
      setMovies([]);
    }
    setLoading(false);
  }, [selectedGenre, selectedCountry, selectedPlatform, selectedSort]);

  const ContentBlock = () => (
    <div className="text-white text-sm md:text-base leading-relaxed space-y-4 max-w-screen-md mx-auto px-4 md:px-0 py-6">
      <p>
        <strong>
          I didn’t build this because I’m a developer. I built this because I
          was tired of wasting 40 minutes every night just trying to decide what
          to watch.
        </strong>{" "}
        You know the drill — open Netflix, scroll for a bit, close it. Open
        Prime Video. Still nothing. It became more frustrating than fun. So I
        made this. For you. For me. For anyone stuck in decision paralysis every
        night.
      </p>

      <p>
        <strong>MoviesFinder</strong> helps you instantly discover{" "}
        <strong>new movies to stream</strong>,{" "}
        <strong>new movies streaming now</strong>,{" "}
        <strong>what to watch this weekend</strong>, and even{" "}
        <strong>random movie generator</strong> picks when you’re feeling
        indecisive. Whether it’s <strong>best shows on Apple TV</strong> or{" "}
        <strong>best movies on Apple TV</strong>, we keep things fresh so you’re
        never bored again.
      </p>

      <p>
        We update the platform every week with <strong>new TV shows</strong>,{" "}
        <strong>best Apple TV shows</strong>,{" "}
        <strong>new streaming this weekend</strong>, and{" "}
        <strong>new movies to stream this weekend</strong> — so if you’re
        wondering <strong>what to stream this weekend</strong>, you’re in the
        right place.
      </p>

      <p>
        <strong>📱 On mobile?</strong> Tap the ☰ button on the top-right corner
        to open the menu. Inside, you’ll find a{" "}
        <strong>Trending section</strong> — it shows you exactly{" "}
        <strong>what to watch this weekend</strong> without the guesswork.
      </p>

      <p>
        <strong>🎮 Try the “Guess the Movie” game too</strong> — we’ll blur a
        poster, give you clues, and let you try to guess. It’s like a movie
        night mini-game. Some people play it just to discover{" "}
        <strong>new movies to stream</strong>.
      </p>

      <h2 className="text-lg font-semibold pt-4">⚡ How It Works</h2>
      <ul className="list-disc list-inside space-y-2">
        <li>
          <strong>Pick your vibe:</strong> Choose a genre (action, comedy,
          thriller, drama, horror, or anything else).
        </li>
        <li>
          <strong>Select your platform:</strong> Netflix, Prime, Hulu, Disney+,
          Apple TV — or leave it open for all.
        </li>
        <li>
          <strong>Tap “Get Recommendations”:</strong> We fetch the latest,
          region-matched, platform-available stuff.
        </li>
        <li>
          <strong>Scroll the picks:</strong> These are curated for mood,
          availability, and what's new.
        </li>
        <li>
          <strong>Click to stream:</strong> Done. Watch. Chill. Repeat.
        </li>
      </ul>

      <p>
        From <strong>new movies streaming now</strong> to{" "}
        <strong>new movies 2025 streaming</strong> and{" "}
        <strong>new release movies streaming</strong>, we’ve got it all in one
        place. This isn’t just another list — it’s a shortcut to the best thing
        to watch tonight.
      </p>

      <p className="font-semibold">
        🎬 Stop scrolling. Start watching. Your next favorite thing is literally
        one tap away.
      </p>
    </div>
  );

  return (
    <div
      ref={topRef}
      className="relative min-h-screen bg-black text-white font-body pb-32"
    >
      <SeoHelmet
        title="The Movies Finder | What Should I Watch?"
        description="Find trending, platform-available movies personalized by genre, country, and platform. The easiest way to decide what to watch next!"
      />

      <div className="absolute top-6 right-6 text-xs text-zinc-400 uppercase font-semibold">
        {selectedCountry?.toUpperCase()}
      </div>

      <div className="pt-20 px-4">
        <h1 className="text-4xl md:text-5xl font-heading text-center mb-10 leading-tight tracking-tight">
          What Should I Watch?
        </h1>

        <div className="space-y-10 max-w-5xl mx-auto mb-20">
          <FilterBar
            selectedGenre={selectedGenre}
            setSelectedGenre={setSelectedGenre}
            selectedCountry={selectedCountry}
            setSelectedCountry={setSelectedCountry}
            selectedPlatform={selectedPlatform}
            setSelectedPlatform={setSelectedPlatform}
            selectedSort={selectedSort}
            setSelectedSort={setSelectedSort}
            genres={GENRES}
            platforms={PLATFORMS}
            sortOptions={SORT_OPTIONS}
            countryCode={selectedCountry}
          />

          <ActionButtons
            onFetch={fetchMovies}
            onGuess={handleStartGuessGame}
            loading={loading}
          />

          {movies.length > 0 && (
            <button
              onClick={scrollToTop}
              className="fixed bottom-20 right-4 bg-zinc-700 hover:bg-zinc-600 text-white px-4 py-2 rounded-full shadow-md text-sm md:hidden z-50"
            >
              ↑ Top
            </button>
          )}

          {movies.length > 0 && (
            <div className="border-t border-zinc-700 mb-6 max-w-5xl mx-auto"></div>
          )}

          <div
            ref={resultsRef}
            className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8 max-w-6xl mx-auto"
          >
            {movies.map((movie) => (
              <motion.div
                key={movie.tmdbId || movie.id}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4 }}
              >
                <MovieCard movie={movie} />
              </motion.div>
            ))}
          </div>

          {isGuessGameActive && guessGameMovie && (
            <div className="mt-8">
              <GuessTheMovie
                movie={guessGameMovie}
                onClose={() => setIsGuessGameActive(false)}
              />
            </div>
          )}

          <ContentBlock />
        </div>
      </div>
    </div>
  );
}
