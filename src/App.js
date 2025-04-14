import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './index.css'; // assuming Tailwind and global styles are imported here

export default function MovieRecommendationApp() {
  const [selectedGenre, setSelectedGenre] = useState('');
  const [selectedCountry, setSelectedCountry] = useState('');
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

  useEffect(() => {
    const fetchUserCountry = async () => {
      try {
        const response = await axios.get('https://ipapi.co/json/');
        const countryCode = response.data.country_code.toLowerCase();
        setSelectedCountry(countryCode);
      } catch (error) {
        console.error('🌍 Failed to detect country:', error);
        setSelectedCountry('us');
      }
    };
    fetchUserCountry();
  }, []);

  const fetchMovies = async () => {
    if (!selectedGenre) return;
    setLoading(true);
    sendAnalyticsEvent('get_recommendations_clicked', {
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
        } catch (err) {
          console.error(`🖼️ TMDB Poster fetch failed for ${movie.title} (TMDB ID: ${tmdbId}, Country: ${selectedCountry})`, err);
          posters[movie.id] = 'https://via.placeholder.com/300x450?text=No+Image';
        }
      }));
      setPosterCache(posters);

      sendAnalyticsEvent('get_recommendations_success', {
        genre: selectedGenre,
        country: selectedCountry,
        platform: selectedPlatform,
        sort: selectedSort,
        results: fetchedMovies.length
      });
    } catch (error) {
      console.error(`❌ Failed to fetch movies for country "${selectedCountry}"`, error);
      sendAnalyticsEvent('get_recommendations_failed', {
        genre: selectedGenre,
        country: selectedCountry,
        platform: selectedPlatform,
        sort: selectedSort,
        error: error.message
      });
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

  const PillSelector = ({ options, selected, onSelect }) => (
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
  );

  return (
    <div className="min-h-screen bg-black text-white px-4 py-6 font-body relative">
      <div className="absolute top-6 right-6 text-xs text-zinc-400 uppercase font-semibold">
        {selectedCountry?.toUpperCase()}
      </div>

      <h1 className="text-4xl md:text-5xl font-heading text-center mb-10 leading-tight tracking-tight">What Should I Watch?</h1>

      <div className="space-y-10 max-w-5xl mx-auto mb-20">
        <div>
          <h3 className="text-zinc-400 text-xs md:text-sm uppercase font-medium mb-3 tracking-wide text-center md:text-left">Select Genre</h3>
          <PillSelector options={genres} selected={selectedGenre} onSelect={setSelectedGenre} />
        </div>
        <div>
          <h3 className="text-zinc-400 text-xs md:text-sm uppercase font-medium mb-3 tracking-wide text-center md:text-left">Select Platform</h3>
          <PillSelector options={platforms} selected={selectedPlatform} onSelect={setSelectedPlatform} />
        </div>
        <div>
          <h3 className="text-zinc-400 text-xs md:text-sm uppercase font-medium mb-3 tracking-wide text-center md:text-left">Sort By</h3>
          <PillSelector options={sortOptions} selected={selectedSort} onSelect={setSelectedSort} />
        </div>

        <div className="fixed bottom-4 left-0 right-0 z-10 flex justify-center md:static">
          <button
            onClick={fetchMovies}
            className="bg-gradient-to-r from-red-600 to-pink-600 hover:from-red-700 hover:to-pink-700 px-10 py-3 rounded-xl shadow-xl text-white font-semibold text-lg transition"
          >
            {loading ? 'Loading...' : 'Get Recommendations'}
          </button>
        </div>
      </div>

      {movies.length > 0 && <div className="border-t border-zinc-700 mb-6 max-w-5xl mx-auto"></div>}

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
        {movies.map((movie, index) => (
          <div key={index} className="bg-zinc-900 border border-zinc-700 rounded-2xl overflow-hidden shadow-md">
            <img
              src={getPosterURL(movie)}
              alt={movie.title || movie.originalTitle || 'Untitled'}
              className="w-full h-[400px] object-cover"
            />
            <div className="p-5">
              <h2 className="text-lg font-heading text-white mb-1 leading-snug tracking-tight">{movie.title || movie.originalTitle}</h2>
              <p className="text-sm text-zinc-400 mb-2 leading-relaxed line-clamp-4">{movie.overview?.slice(0, 150) || 'No overview available.'}...</p>
              <p className="text-xs text-yellow-400 font-medium">⭐ IMDB: {getIMDBRating(movie)}</p>
            </div>
          </div>
        ))}
      </div>

      {movies.length > 0 && (
        <div className="mt-16 px-4 md:px-0 max-w-3xl mx-auto text-white text-sm leading-6 font-body">
          <h2 className="text-xl font-semibold mb-2 font-heading text-center">What to Watch This Week</h2>
          <p className="mb-2 text-center text-zinc-400">
            Discover good movies and trending TV shows to stream right now. Whether you're looking for the best movies on Netflix,
            new comedy movies, or classic films worth rewatching, our curated picks make choosing what to watch effortless.
          </p>
          <p className="mb-2 text-center text-zinc-400">
            Stay updated with new movies out now, recent Netflix series, and top-rated television shows from 2024.
            From feel-good comedy to all-time greats — stream the stories that match your mood.
          </p>
          <p className="text-center text-zinc-400">
            No more endless scrolling. Just real recommendations for movies to watch, shows to stream, and what’s worth your time today.
          </p>
        </div>
      )}
    </div>
  );
}