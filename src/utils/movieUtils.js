// src/utils/movieUtils.js
import axios from "axios";
import {
  STREAMING_API_HOST,
  STREAMING_API_HEADERS,
  TMDB_API_BASE_URL,
} from "./apiConfig";

// ----------- Poster & Rating Helpers -----------
export function getPosterURL(movie) {
  return (
    movie?.posterURL || "https://via.placeholder.com/300x450?text=No+Image"
  );
}

export function getIMDBRating(movie) {
  if (typeof movie.imdbRating === "number")
    return (movie.imdbRating / 10).toFixed(1);
  if (typeof movie.rating === "number") return (movie.rating / 10).toFixed(1);
  return "N/A";
}

// ----------- API Helpers -----------
export async function fetchStreamingMovies({
  selectedGenre,
  selectedCountry,
  selectedPlatform,
  selectedSort,
}) {
  const response = await axios.get(`${STREAMING_API_HOST}/search/filters`, {
    headers: STREAMING_API_HEADERS,
    params: {
      country: selectedCountry,
      show_type: "movie",
      output_language: "en",
      genres: selectedGenre,
      catalogs: selectedPlatform ? [selectedPlatform] : undefined,
      limit: 20,
      order_by: selectedSort,
      order_direction: "desc",
    },
  });

  return response.data.shows || [];
}

export async function enrichWithTMDBPosters(movies) {
  return await Promise.all(
    movies.map(async (movie) => {
      const tmdbId = movie.tmdbId?.split("/")?.[1];
      if (!tmdbId) return movie;

      try {
        const tmdbResponse = await axios.get(`${TMDB_API_BASE_URL}/${tmdbId}`, {
          params: { api_key: process.env.REACT_APP_TMDB_API_KEY },
        });
        const path = tmdbResponse.data.poster_path;
        movie.posterURL = path ? `https://image.tmdb.org/t/p/w500${path}` : "";
      } catch {
        movie.posterURL = "";
      }

      return movie;
    })
  );
}
