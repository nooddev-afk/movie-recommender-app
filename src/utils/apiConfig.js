// src/utils/apiConfig.js

export const STREAMING_API_HOST = 'https://streaming-availability.p.rapidapi.com/shows';
export const STREAMING_API_HEADERS = {
  'X-RapidAPI-Key': process.env.REACT_APP_RAPIDAPI_KEY,
  'X-RapidAPI-Host': 'streaming-availability.p.rapidapi.com',
};

export const TMDB_API_BASE_URL = 'https://api.themoviedb.org/3/movie';
