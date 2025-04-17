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
        </div>
      </div>
    </div>
  );
}
