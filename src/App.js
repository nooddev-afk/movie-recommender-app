import React, { useState } from 'react';
import axios from 'axios';

const genreMap = {
  Action: 28,
  Drama: 18,
  Comedy: 35,
  Romance: 10749,
  Thriller: 53,
  'Sci-Fi': 878,
  Horror: 27,
  Animation: 16
};

const moods = [
  'Chill', 'Emotional', 'Edge-of-Seat', 'Feel-Good', 'Dark', 'Wholesome'
];

const platforms = ['Netflix', 'Prime Video', 'Disney+', 'Hulu'];

export default function MovieRecommendationApp() {
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
          language: 'en-US'
        }
      });

      const movies = tmdbRes.data.results.slice(0, 5);

      const enrichedMovies = await Promise.all(movies.map(async movie => {
        try {
          const utellyRes = await axios.get(`https://utelly-tv-shows-and-movies-availability-v1.p.rapidapi.com/lookup`, {
            params: { term: movie.title, country: 'us' },
            headers: {
              'x-rapidapi-host': 'utelly-tv-shows-and-movies-availability-v1.p.rapidapi.com',
              'x-rapidapi-key': process.env.REACT_APP_UTELLY_API_KEY
            }
          });

          const platform = utellyRes.data.results[0]?.locations?.map(loc => loc.display_name).join(', ') || 'Unknown';

          return {
            ...movie,
            platform
          };
        } catch (e) {
          return {
            ...movie,
            platform: 'Netflix / Prime Video (mocked)'
          };
        }
      }));

      setResults(enrichedMovies);
    } catch (error) {
      console.error('Error fetching data:', error);
    }
    setLoading(false);
  };

  return (
    <div className="min-h-screen bg-black text-white font-sans px-4 py-6">
      <h1 className="text-4xl font-extrabold text-red-600 mb-10 text-center">What Should I Watch?</h1>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-10 max-w-4xl mx-auto">
        <select onChange={e => setSelectedGenre(e.target.value)} className="p-3 bg-zinc-900 text-white rounded border border-zinc-700">
          <option value="">Select Genre</option>
          {Object.keys(genreMap).map(g => <option key={g} value={g}>{g}</option>)}
        </select>

        <select onChange={e => setSelectedMood(e.target.value)} className="p-3 bg-zinc-900 text-white rounded border border-zinc-700">
          <option value="">Select Mood</option>
          {moods.map(m => <option key={m} value={m}>{m}</option>)}
        </select>

        <select onChange={e => setSelectedPlatform(e.target.value)} className="p-3 bg-zinc-900 text-white rounded border border-zinc-700">
          <option value="">Select Platform</option>
          {platforms.map(p => <option key={p} value={p}>{p}</option>)}
        </select>
      </div>

      <div className="flex justify-center">
        <button onClick={fetchRecommendations} className="bg-red-600 hover:bg-red-700 transition text-white px-6 py-3 text-lg font-semibold rounded shadow-md">
          {loading ? 'Loading...' : 'Get Recommendations'}
        </button>
      </div>

      <div className="mt-12 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {results.map(movie => (
          <div key={movie.id} className="bg-zinc-900 border border-zinc-700 rounded-xl overflow-hidden shadow-lg hover:shadow-xl transition">
            {movie.poster_path && (
              <img
                src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
                alt={movie.title}
                className="w-full h-[400px] object-cover"
              />
            )}
            <div className="p-4">
              <h2 className="text-xl font-bold mb-2 text-white">{movie.title}</h2>
              <p className="text-sm text-zinc-400 mb-3">{movie.overview?.slice(0, 150)}...</p>
              <p className="text-sm text-white font-semibold">⭐ Rating: {movie.vote_average}</p>
              <p className="text-xs text-red-400 mt-1">Available on: {movie.platform}</p>
            </div>
          </div>
        ))}
      </div>

      {results.length > 0 && (
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
