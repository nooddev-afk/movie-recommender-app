import React, { useState } from 'react';
import axios from 'axios';

export default function MovieRecommendationApp() {
  const [selectedGenre, setSelectedGenre] = useState('');
  const [selectedCountry, setSelectedCountry] = useState('us');
  const [selectedPlatform, setSelectedPlatform] = useState('');
  const [selectedSort, setSelectedSort] = useState('popularity_1year');
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(false);
  const [posterCache, setPosterCache] = useState({});

  const genres = [
    'action', 'adventure', 'animation', 'biography', 'comedy', 'crime',
    'documentary', 'drama', 'family', 'fantasy', 'history', 'horror',
    'music', 'mystery', 'romance', 'sci-fi', 'sport', 'thriller', 'war', 'western'
  ];

  const platforms = ['netflix', 'prime', 'disney', 'hulu', 'hbo', 'apple', 'peacock'];
  const countries = ['us', 'in', 'gb', 'de', 'fr'];
  const sortOptions = [
    { label: 'Popularity', value: 'popularity_1year' },
    { label: 'Rating', value: 'rating' }
  ];

  const API_HOST = 'https://streaming-availability.p.rapidapi.com/shows';
  const API_HEADERS = {
    'X-RapidAPI-Key': process.env.REACT_APP_RAPIDAPI_KEY,
    'X-RapidAPI-Host': 'streaming-availability.p.rapidapi.com',
  };

  const sendAnalyticsEvent = (eventName, params) => {
    if (window.gtag) {
      window.gtag('event', eventName, params);
    }
  };

  const fetchMovies = async () => {
    if (!selectedGenre) return;
    setLoading(true);
    sendAnalyticsEvent('get_recommendations', {
      genre: selectedGenre,
      country: selectedCountry,
      platform: selectedPlatform,
      sort: selectedSort,
    });
    try {
      const response = await axios.get(`${API_HOST}/search/filters`, {
        headers: API_HEADERS,
        params: {
          country: selectedCountry,
          show_type: 'movie',
          output_language: 'en',
          genres: selectedGenre,
          catalogs: selectedPlatform ? [selectedPlatform] : undefined,
          limit: 20,
          order_by: selectedSort,
          order_direction: 'desc',
        },
      });

      const fetchedMovies = response.data.shows || [];
      setMovies(fetchedMovies);

      const posters = {};
      await Promise.all(fetchedMovies.map(async (movie) => {
        const tmdbId = movie.tmdbId?.split('/')?.[1];
        if (!tmdbId) return;
        try {
          const tmdbResponse = await axios.get(`https://api.themoviedb.org/3/movie/${tmdbId}`, {
            params: {
              api_key: process.env.REACT_APP_TMDB_API_KEY
            }
          });
          const path = tmdbResponse.data.poster_path;
          posters[movie.id] = path ? `https://image.tmdb.org/t/p/w500${path}` : 'https://via.placeholder.com/300x450?text=No+Image';
        } catch {
          posters[movie.id] = 'https://via.placeholder.com/300x450?text=No+Image';
        }
      }));
      setPosterCache(posters);
    } catch (error) {
      console.error('❌ Failed to fetch movies:', error);
      setMovies([]);
    }
    setLoading(false);
  };

  const getPosterURL = (movie) => {
    return posterCache[movie.id] || 'https://via.placeholder.com/300x450?text=No+Image';
  };

  const getIMDBRating = (movie) => {
    if (movie.imdbRating && typeof movie.imdbRating === 'number') {
      return (movie.imdbRating / 10).toFixed(1);
    }
    if (movie.rating && typeof movie.rating === 'number') {
      return (movie.rating / 10).toFixed(1);
    }
    return 'N/A';
  };

  return (
    <div className="min-h-screen bg-black text-white p-6">
      <h1 className="text-4xl font-bold text-center mb-6">What Should I Watch?</h1>

      <div className="flex justify-center flex-wrap gap-4 mb-6">
        <select
          onChange={(e) => setSelectedCountry(e.target.value)}
          className="p-3 bg-zinc-900 text-white rounded border border-zinc-700"
        >
          {countries.map((code) => (
            <option key={code} value={code}>{code.toUpperCase()}</option>
          ))}
        </select>

        <select
          onChange={(e) => setSelectedGenre(e.target.value)}
          className="p-3 bg-zinc-900 text-white rounded border border-zinc-700"
        >
          <option value="">Select Genre</option>
          {genres.map((genre) => (
            <option key={genre} value={genre}>{genre.charAt(0).toUpperCase() + genre.slice(1)}</option>
          ))}
        </select>

        <select
          onChange={(e) => setSelectedPlatform(e.target.value)}
          className="p-3 bg-zinc-900 text-white rounded border border-zinc-700"
        >
          <option value="">All Platforms</option>
          {platforms.map((platform) => (
            <option key={platform} value={platform}>{platform.toUpperCase()}</option>
          ))}
        </select>

        <select
          onChange={(e) => setSelectedSort(e.target.value)}
          className="p-3 bg-zinc-900 text-white rounded border border-zinc-700"
        >
          {sortOptions.map((sort) => (
            <option key={sort.value} value={sort.value}>{sort.label}</option>
          ))}
        </select>

        <button
          onClick={fetchMovies}
          className="bg-red-600 hover:bg-red-700 px-6 py-3 rounded shadow font-semibold"
        >
          {loading ? 'Loading...' : 'Get Recommendations'}
        </button>
      </div>

      {movies.length > 0 && (
        <div className="border-t border-zinc-700 mb-6"></div>
      )}

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
        {movies.map((movie, index) => (
          <div key={index} className="bg-zinc-900 border border-zinc-700 rounded-xl overflow-hidden shadow-lg">
            <img
              src={getPosterURL(movie)}
              alt={movie.title || movie.originalTitle || 'Untitled'}
              className="w-full h-[400px] object-cover"
            />
            <div className="p-4">
              <h2 className="text-xl font-bold text-white mb-1">{movie.title || movie.originalTitle}</h2>
              <p className="text-sm text-zinc-400">{movie.overview?.slice(0, 150) || 'No overview available.'}...</p>
              <p className="text-xs text-yellow-400 mt-2">⭐ IMDB: {getIMDBRating(movie)}</p>
            </div>
          </div>
        ))}
      </div>

      {movies.length > 0 && (
        <div className="mt-12 px-4 md:px-0 max-w-3xl mx-auto text-white text-sm leading-6">
          <h2 className="text-lg font-semibold mb-2">What to Watch This Week</h2>
          <p className="mb-2">
            Discover good movies and trending TV shows to stream right now. Whether you're looking for the best movies on Netflix,
            new comedy movies, or classic films worth rewatching, our curated picks make choosing what to watch effortless.
          </p>
          <p className="mb-2">
            Stay updated with new movies out now, recent Netflix series, and top-rated television shows from 2024.
            From feel-good comedy to all-time greats — stream the stories that match your mood.
          </p>
          <p>
            No more endless scrolling. Just real recommendations for movies to watch, shows to stream, and what’s worth your time today.
          </p>
        </div>
      )}
    </div>
  );
}