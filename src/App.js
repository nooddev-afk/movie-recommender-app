import React, { useState } from 'react';
import axios from 'axios';
import './index.css';

const genreMap = {
  Action: 28,
  Drama: 18,
  Comedy: 35,
  Romance: 10749,
  Thriller: 53,
  'Sci-Fi': 878,
  Horror: 27,
  Animation: 16,
};

const moods = [
  'Chill', 'Emotional', 'Edge-of-Seat', 'Feel-Good', 'Dark', 'Wholesome'
];

const platforms = ['Netflix', 'Prime Video', 'Disney+', 'Hulu'];

export default function App() {
  const [selectedGenre, setSelectedGenre] = useState('');
  const [selectedMood, setSelectedMood] = useState('');
  const [selectedPlatform, setSelectedPlatform] = useState('');
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(false);

  const fetchRecommendations = async () => {
    setLoading(true);
    try {
      const genreId = genreMap[selectedGenre];

      const tmdbRes = await axios.get(`https://api.themoviedb.org/3/discover/movie`, {
        params: {
          api_key: process.env.REACT_APP_TMDB_API_KEY,
          with_genres: genreId,
          sort_by: 'popularity.desc',
          language: 'en-US',
        },
      });

      const movies = tmdbRes.data.results.slice(0, 6);

      const enriched = movies.map(movie => ({
        ...movie,
        platform: selectedPlatform || 'Netflix / Prime Video (mock)',
      }));

      setResults(enriched);
    } catch (e) {
      console.error('API failed', e);
    }
    setLoading(false);
  };

  return (
    <div className="min-h-screen bg-black text-white font-sans p-6">
      <h1 className="text-4xl md:text-5xl font-extrabold text-red-600 mb-10 text-center">
        What Should I Watch?
      </h1>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 max-w-4xl mx-auto mb-8">
        <select
          onChange={(e) => setSelectedGenre(e.target.value)}
          className="bg-zinc-900 text-white p-3 rounded border border-zinc-700"
        >
          <option value="">🎬 Select Genre</option>
          {Object.keys(genreMap).map((g) => (
            <option key={g} value={g}>{g}</option>
          ))}
        </select>

        <select
          onChange={(e) => setSelectedMood(e.target.value)}
          className="bg-zinc-900 text-white p-3 rounded border border-zinc-700"
        >
          <option value="">🧠 Select Mood</option>
          {moods.map((m) => (
            <option key={m} value={m}>{m}</option>
          ))}
        </select>

        <select
          onChange={(e) => setSelectedPlatform(e.target.value)}
          className="bg-zinc-900 text-white p-3 rounded border border-zinc-700"
        >
          <option value="">📺 Select Platform</option>
          {platforms.map((p) => (
            <option key={p} value={p}>{p}</option>
          ))}
        </select>
      </div>

      <div className="text-center">
        <button
          onClick={fetchRecommendations}
          className="bg-red-600 hover:bg-red-700 px-8 py-3 text-lg rounded shadow-md font-semibold transition"
        >
          {loading ? 'Loading...' : 'Get Recommendations'}
        </button>
      </div>

      <div className="mt-12 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
        {results.map((movie) => (
          <div
            key={movie.id}
            className="bg-zinc-900 border border-zinc-700 rounded-xl overflow-hidden shadow-lg hover:shadow-xl transition"
          >
            {movie.poster_path && (
              <img
                src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
                alt={movie.title}
                className="w-full h-80 object-cover"
              />
            )}
            <div className="p-4">
              <h2 className="text-xl font-bold mb-1">{movie.title}</h2>
              <p className="text-sm text-zinc-400 mb-2">{movie.overview?.slice(0, 120)}...</p>
              <div className="flex justify-between items-center">
                <span className="text-sm text-red-400">⭐ {movie.vote_average}</span>
                <span className="text-xs bg-red-800 px-2 py-1 rounded">{movie.platform}</span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
