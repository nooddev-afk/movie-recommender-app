// src/TrendingWidgetPage.js
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

export default function TrendingWidgetPage() {
  const [country, setCountry] = useState('');
  const [shows, setShows] = useState([]);
  const [posterCache, setPosterCache] = useState({});
  const [showType, setShowType] = useState('movie');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const detectCountry = async () => {
      try {
        const response = await axios.get('https://ipapi.co/json/');
        setCountry(response.data.country_code.toLowerCase());
      } catch (error) {
        console.error('🌍 Country detection failed:', error);
        setCountry('us');
      }
    };
    detectCountry();
  }, []);

  useEffect(() => {
    const fetchTrending = async () => {
      if (!country) return;
      setLoading(true);
      try {
        const res = await axios.get('https://streaming-availability.p.rapidapi.com/shows/top', {
          headers: {
            'X-RapidAPI-Key': process.env.REACT_APP_RAPIDAPI_KEY,
            'X-RapidAPI-Host': 'streaming-availability.p.rapidapi.com'
          },
          params: {
            country,
            service: 'netflix'
          }
        });

        const data = Array.isArray(res.data) ? res.data : res.data.shows || [];
        const filtered = data.filter(item => item.showType === showType);
        setShows(filtered);

        const posters = {};
        await Promise.all(
          filtered.map(async (item) => {
            const tmdbId = item.tmdbId?.split('/')[1];
            const mediaType = item.tmdbId?.includes('movie') ? 'movie' : 'tv';
            if (!tmdbId) return;
            try {
              const tmdbRes = await axios.get(`https://api.themoviedb.org/3/${mediaType}/${tmdbId}`, {
                params: {
                  api_key: process.env.REACT_APP_TMDB_API_KEY
                }
              });
              const path = tmdbRes.data.poster_path;
              posters[item.id] = {
                poster: path ? `https://image.tmdb.org/t/p/w300${path}` : null,
                rating: tmdbRes.data.vote_average || null
              };
            } catch (err) {
              console.error(`🖼️ TMDB fetch failed for ${item.title}`, err);
              posters[item.id] = {
                poster: null,
                rating: null
              };
            }
          })
        );
        setPosterCache(posters);
      } catch (error) {
        console.error('❌ Failed to fetch trending shows:', error);
        setShows([]);
      } finally {
        setLoading(false);
      }
    };

    fetchTrending();
  }, [country, showType]);

  const getPosterURL = (show) => {
    return posterCache[show.id]?.poster || 'https://via.placeholder.com/300x450?text=No+Image';
  };

  return (
    <div className="min-h-screen bg-black text-white pt-20 px-4 md:px-6 font-body">
      <div className="mb-6">
        <h1 className="text-3xl md:text-4xl font-heading text-center md:text-left font-bold tracking-tight mb-2">
          🔥 Trending {showType === 'movie' ? 'Movies' : 'Series'} in {country?.toUpperCase() || '...'}
        </h1>
        <p className="text-sm text-zinc-400 text-center md:text-left mb-2">
          Updated daily with real-time platform rankings.
        </p>
        <div className="text-center md:text-right">
          <Link to="/" className="text-sm text-zinc-400 hover:text-white underline">
            ← Back to Home
          </Link>
        </div>
      </div>

      <div className="flex justify-center space-x-4 mb-6">
        <button
          className={`px-4 py-2 rounded-full font-semibold ${showType === 'movie' ? 'bg-white text-black' : 'bg-zinc-800 text-white border border-white'}`}
          onClick={() => setShowType('movie')}
        >
          Movies
        </button>
        <button
          className={`px-4 py-2 rounded-full font-semibold ${showType === 'series' ? 'bg-white text-black' : 'bg-zinc-800 text-white border border-white'}`}
          onClick={() => setShowType('series')}
        >
          Series
        </button>
      </div>

      {loading ? (
        <p className="text-center text-zinc-400 animate-pulse">Loading trending content...</p>
      ) : shows.length === 0 ? (
        <p className="text-center text-zinc-400">No trending content available.</p>
      ) : (
        <>
          <p className="text-xs text-center text-zinc-500 mb-2 md:hidden">⬅️ Swipe to explore more</p>
          <div className="overflow-x-auto whitespace-nowrap scroll-smooth overscroll-x-contain scrollbar-hide px-4 py-2">
            <div className="flex gap-5">
              {shows.map((show) => (
                <div
                  key={show.id}
                  className="inline-block w-64 flex-shrink-0 bg-zinc-900 border border-zinc-700 rounded-2xl overflow-hidden shadow-md"
                >
                  <img
                    src={getPosterURL(show)}
                    alt={show.title || 'Untitled'}
                    className="w-full h-[360px] object-cover"
                  />
                  <div className="p-4">
                    <h3 className="text-base font-semibold text-white truncate">
                      {show.title || show.originalTitle || 'Untitled'}
                    </h3>
                    <p className="text-sm text-zinc-400 min-h-[48px] truncate">
  {show.overview?.trim()
    ? show.overview.slice(0, 100)
    : "This show’s description isn’t available yet."}
</p>
                    {posterCache[show.id]?.rating && (
                      <p className="text-xs text-yellow-400 mt-2">
                        ⭐ {posterCache[show.id].rating.toFixed(1)}
                      </p>
                    )}
                    <p className="text-xs text-zinc-400 mt-1">📺 {show.streamingInfo?.[0]?.service || 'Netflix'}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </>
      )}
    </div>
  );
}
