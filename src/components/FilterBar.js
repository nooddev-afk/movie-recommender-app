// src/components/FilterBar.js
import React from "react";

export default function FilterBar({
  selectedGenre,
  setSelectedGenre,
  selectedCountry,
  setSelectedCountry,
  selectedPlatform,
  setSelectedPlatform,
  selectedSort,
  setSelectedSort,
  genres,
  platforms,
  sortOptions,
  countryCode,
}) {
  return (
    <div className="space-y-12 mb-16">
      {/* Country Display */}
      <div className="text-right text-xs text-zinc-400 uppercase font-semibold pr-2">
        Country: {countryCode?.toUpperCase()}
      </div>

      {/* Genre */}
      <div className="space-y-2">
        <div className="text-center text-sm text-zinc-400 font-semibold uppercase">
          Select Genre
        </div>
        <div className="flex flex-wrap justify-center gap-3">
          {genres.map((genre) => (
            <button
              key={genre}
              onClick={() => setSelectedGenre(genre)}
              className={`px-5 py-2 rounded-full text-sm font-medium border ${
                selectedGenre === genre
                  ? "bg-gradient-to-r from-red-500 to-pink-500 text-white border-transparent shadow"
                  : "bg-zinc-800 text-zinc-300 border-zinc-600 hover:border-zinc-400 hover:scale-105 duration-150"
              }`}
            >
              {genre.charAt(0).toUpperCase() + genre.slice(1)}
            </button>
          ))}
        </div>
      </div>

      {/* Platform */}
      <div className="space-y-2">
        <div className="text-center text-sm text-zinc-400 font-semibold uppercase">
          Select Platform
        </div>
        <div className="flex flex-wrap justify-center gap-3">
          {platforms.map((platform) => (
            <button
              key={platform}
              onClick={() => setSelectedPlatform(platform)}
              className={`px-5 py-2 rounded-full text-sm font-medium border ${
                selectedPlatform === platform
                  ? "bg-gradient-to-r from-red-500 to-pink-500 text-white border-transparent shadow"
                  : "bg-zinc-800 text-zinc-300 border-zinc-600 hover:border-zinc-400 hover:scale-105 duration-150"
              }`}
            >
              {platform.toUpperCase()}
            </button>
          ))}
        </div>
      </div>

      {/* Sort */}
      <div className="space-y-2">
        <div className="text-center text-sm text-zinc-400 font-semibold uppercase">
          Sort By
        </div>
        <div className="flex flex-wrap justify-center gap-3">
          {sortOptions.map((sort) => (
            <button
              key={sort.value}
              onClick={() => setSelectedSort(sort.value)}
              className={`px-5 py-2 rounded-full text-sm font-medium border ${
                selectedSort === sort.value
                  ? "bg-gradient-to-r from-red-500 to-pink-500 text-white border-transparent shadow"
                  : "bg-zinc-800 text-zinc-300 border-zinc-600 hover:border-zinc-400 hover:scale-105 duration-150"
              }`}
            >
              {sort.label}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
