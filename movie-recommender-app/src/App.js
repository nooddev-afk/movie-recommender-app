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
          api_key: '1d11d1a61d96bcbed284f937afed2b5a',
          with_genres: genreId,
          sort_by: 'popularity.desc',
          language: 'en-US'
        }
      });

      const movies = tmdbRes.data.results.slice(0, 5);

      // Fetch availability from Utelly API (mocked with fallback)
      const enrichedMovies = await Promise.all(movies.map(async movie => {
        try {
          const utellyRes = await axios.get(`https://utelly-tv-shows-and-movies-availability-v1.p.rapidapi.com/lookup`, {
            params: { term: movie.title, country: 'us' },
            headers: {
              'x-rapidapi-host': 'utelly-tv-shows-and-movies-availability-v1.p.rapidapi.com',
              'x-rapidapi-key': '89f924df7bmsh8133cc401b05ef8p191a41jsn7ee6e65bd'
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
    <div className="p-6 max-w-4xl mx-auto">
      <h1 className="text-3xl font-bold mb-6">What Should I Watch?</h1>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
        <select onChange={e => setSelectedGenre(e.target.value)} className="p-2 rounded">
          <option value="">Select Genre</option>
          {Object.keys(genreMap).map(g => <option key={g} value={g}>{g}</option>)}
        </select>

        <select onChange={e => setSelectedMood(e.target.value)} className="p-2 rounded">
          <option value="">Select Mood</option>
          {moods.map(m => <option key={m} value={m}>{m}</option>)}
        </select>

        <select onChange={e => setSelectedPlatform(e.target.value)} className="p-2 rounded">
          <option value="">Select Platform</option>
          {platforms.map(p => <option key={p} value={p}>{p}</option>)}
        </select>
      </div>

      <button onClick={fetchRecommendations} className="bg-blue-600 text-white px-4 py-2 rounded">
        {loading ? 'Loading...' : 'Get Recommendations'}
      </button>

      <div className="mt-8 grid grid-cols-1 md:grid-cols-2 gap-4">
        {results.map(movie => (
          <div key={movie.id} className="border rounded-lg p-4 shadow">
            {movie.poster_path && (
              <img
                src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
                alt={movie.title}
                className="mb-4 w-full rounded"
              />
            )}
            <h2 className="text-xl font-semibold mb-2">{movie.title}</h2>
            <p className="text-sm text-gray-600 mb-2">{movie.overview?.slice(0, 150)}...</p>
            <p className="text-sm font-medium">Rating: {movie.vote_average}</p>
            <p className="text-sm">Available on: {movie.platform}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
