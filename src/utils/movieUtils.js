// src/utils/movieUtils.js

export function getPosterURL(movie) {
    return movie?.posterURL || 'https://via.placeholder.com/300x450?text=No+Image';
  }
  
  export function getIMDBRating(movie) {
    if (typeof movie.imdbRating === 'number') return (movie.imdbRating / 10).toFixed(1);
    if (typeof movie.rating === 'number') return (movie.rating / 10).toFixed(1);
    return 'N/A';
  }
  