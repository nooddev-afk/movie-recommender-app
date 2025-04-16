// src/MovieRecommendationApp.js
import React, { useState, useEffect, useCallback, memo } from 'react';
import axios from 'axios';
import './index.css';
import { sendAnalyticsEvent, GA_EVENTS } from './utils/analytics';
import { GENRES, PLATFORMS, SORT_OPTIONS } from './constants/filters';
import { STREAMING_API_HOST, STREAMING_API_HEADERS, TMDB_API_BASE_URL } from './utils/apiConfig';
import { Helmet } from 'react-helmet';
import MovieCard from './components/MovieCard';

const PillSelector = memo(({ options, selected, onSelect }) => (
  <div className="flex flex-wrap justify-center gap-3 md:gap-4">
    {options.map((opt) => (
      <button
        key={opt.value || opt}
        onClick={() => onSelect(opt.value || opt)}
        className={`px-5 py-2.5 rounded-full text-sm md:text-base font-medium border transition font-body tracking-wide ${
          (opt.value || opt) === selected
            ? 'bg-gradient-to-r from-red-500 to-pink-500 text-white border-transparent shadow-md'
            : 'bg-zinc-800 text-zinc-300 border-zinc-600 hover:border-zinc-400 hover:scale-105 duration-150 ease-in-out'
        }`}
      >
        {opt.label || opt.charAt(0).toUpperCase() + opt.slice(1)}
      </button>
    ))}
  </div>
));

export default function MovieRecommendationApp() {
  const [selectedGenre, setSelectedGenre] = useState('');
  const [selectedCountry, setSelectedCountry] = useState('');
  const [selectedPlatform, setSelectedPlatform] = useState('');
  const [selectedSort, setSelectedSort] = useState('popularity_1year');
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchUserCountry = async () => {
      try {
        const response = await axios.get('https://ipapi.co/json/');
        setSelectedCountry(response.data.country_code.toLowerCase());
      } catch (error) {
        console.error('🌍 Country detection failed:', error);
        setSelectedCountry('us');
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
        sort: selectedSort
      });
    } catch (e) {
      console.warn('Analytics error (clicked)', e);
    }

    try {
      const response = await axios.get(`${STREAMING_API_HOST}/search/filters`, {
        headers: STREAMING_API_HEADERS,
        params: {
          country: selectedCountry,
          show_type: 'movie',
          output_language: 'en',
          genres: selectedGenre,
          catalogs: selectedPlatform ? [selectedPlatform] : undefined,
          limit: 20,
          order_by: selectedSort,
          order_direction: 'desc'
        }
      });

      const fetchedMovies = response.data.shows || [];

      await Promise.all(fetchedMovies.map(async (movie) => {
        const tmdbId = movie.tmdbId?.split('/')?.[1];
        if (!tmdbId) return;
        try {
          const tmdbResponse = await axios.get(`${TMDB_API_BASE_URL}/${tmdbId}`, {
            params: { api_key: process.env.REACT_APP_TMDB_API_KEY }
          });
          const path = tmdbResponse.data.poster_path;
          movie.posterURL = path ? `https://image.tmdb.org/t/p/w500${path}` : '';
        } catch {
          movie.posterURL = '';
        }
      }));

      setMovies(fetchedMovies);

      try {
        sendAnalyticsEvent(GA_EVENTS.GET_RECOMMENDATIONS_SUCCESS, {
          genre: selectedGenre,
          country: selectedCountry,
          platform: selectedPlatform,
          sort: selectedSort,
          results: fetchedMovies.length
        });
      } catch (e) {
        console.warn('Analytics error (success)', e);
      }
    } catch (error) {
      console.error('❌ Movie fetch failed', error);
      try {
        sendAnalyticsEvent(GA_EVENTS.GET_RECOMMENDATIONS_FAILED, {
          genre: selectedGenre,
          country: selectedCountry,
          platform: selectedPlatform,
          sort: selectedSort,
          error: error.message
        });
      } catch (e) {
        console.warn('Analytics error (failed)', e);
      }
      setMovies([]);
    }
    setLoading(false);
  }, [selectedGenre, selectedCountry, selectedPlatform, selectedSort]);

  return (
    <div className="relative min-h-screen bg-black text-white font-body pb-32">
      <Helmet>
        <title>The Movies Finder | What Should I Watch?</title>
        <meta
          name="description"
          content="Find trending, platform-available movies personalized by genre, country, and platform. The easiest way to decide what to watch next!"
        />
        <meta property="og:title" content="The Movies Finder | What Should I Watch?" />
        <meta property="og:description" content="Personalized movie recommendations based on your mood, genre, and OTT platforms." />
      </Helmet>

      <div className="absolute top-6 right-6 text-xs text-zinc-400 uppercase font-semibold">
        {selectedCountry?.toUpperCase()}
      </div>

      <div className="pt-20 px-4">
        <h1 className="text-4xl md:text-5xl font-heading text-center mb-10 leading-tight tracking-tight">
          What Should I Watch?
        </h1>

        <div className="space-y-10 max-w-5xl mx-auto mb-20">
          <div>
            <h3 className="text-zinc-400 text-xs md:text-sm uppercase font-medium mb-3 tracking-wide text-center md:text-left">
              Select Genre
            </h3>
            <PillSelector options={GENRES} selected={selectedGenre} onSelect={setSelectedGenre} />
          </div>
          <div>
            <h3 className="text-zinc-400 text-xs md:text-sm uppercase font-medium mb-3 tracking-wide text-center md:text-left">
              Select Platform
            </h3>
            <PillSelector options={PLATFORMS} selected={selectedPlatform} onSelect={setSelectedPlatform} />
          </div>
          <div>
            <h3 className="text-zinc-400 text-xs md:text-sm uppercase font-medium mb-3 tracking-wide text-center md:text-left">
              Sort By
            </h3>
            <PillSelector options={SORT_OPTIONS} selected={selectedSort} onSelect={setSelectedSort} />
          </div>

          <div className="fixed bottom-4 left-0 right-0 z-10 flex justify-center md:static">
            <button
              onClick={fetchMovies}
              className="bg-gradient-to-r from-red-600 to-pink-600 hover:from-red-700 hover:to-pink-700 px-10 py-3 rounded-xl shadow-xl text-white font-semibold text-lg transition flex items-center gap-2"
            >
              {loading ? (
                <>
                  <svg className="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z" />
                  </svg>
                  Loading...
                </>
              ) : (
                'Get Recommendations'
              )}
            </button>
          </div>
        </div>

        {movies.length > 0 && (
          <div className="border-t border-zinc-700 mb-6 max-w-5xl mx-auto"></div>
        )}

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {movies.map((movie) => (
            <MovieCard key={movie.tmdbId || movie.id} movie={movie} />
          ))}
        </div>
      </div>
    </div>
  );
}
