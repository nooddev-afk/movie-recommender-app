// src/components/MovieCard.js
import React from 'react';
import { getPosterURL, getIMDBRating } from '../utils/movieUtils';

const MovieCard = ({ movie }) => {
  return (
    <div className="bg-zinc-900 border border-zinc-700 rounded-2xl overflow-hidden shadow-md">
      <img
        src={getPosterURL(movie)}
        alt={movie.title || movie.originalTitle || 'Untitled'}
        className="w-full h-[400px] object-cover"
      />
      <div className="p-5">
        <h2 className="text-lg font-heading text-white mb-1 leading-snug tracking-tight">
          {movie.title || movie.originalTitle}
        </h2>
        <p className="text-sm text-zinc-400 mb-2 leading-relaxed line-clamp-4">
          {movie.overview?.slice(0, 150) || 'No overview available.'}...
        </p>
        <p className="text-xs text-yellow-400 font-medium">
          ⭐ IMDB: {getIMDBRating(movie)}
        </p>
      </div>
    </div>
  );
};

export default MovieCard;
