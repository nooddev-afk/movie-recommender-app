// src/components/ActionButtons.js
import React from "react";

export default function ActionButtons({ onFetch, onGuess, loading }) {
  return (
    <>
      {/* Desktop Buttons */}
      <div className="hidden md:flex justify-center items-center gap-4 mb-12">
        <button
          onClick={onFetch}
          className="bg-gradient-to-r from-red-600 to-pink-600 hover:from-red-700 hover:to-pink-700 px-8 py-3 rounded-xl shadow-xl text-white font-semibold text-lg transition"
        >
          {loading ? (
            <span className="animate-pulse">⏳ Loading...</span>
          ) : (
            "Get Recommendations"
          )}
        </button>

        <button
          onClick={onGuess}
          className="bg-purple-700 hover:bg-purple-800 px-8 py-3 rounded-xl shadow-xl text-white font-semibold text-lg transition"
        >
          {loading ? (
            <span className="animate-pulse">🔄 Loading...</span>
          ) : (
            "🎮 Guess the Movie"
          )}
        </button>
      </div>

      {/* Mobile Sticky Buttons */}
      <div className="fixed bottom-0 left-0 right-0 z-50 flex justify-around items-center bg-black border-t border-zinc-800 p-3 md:hidden">
        <button
          onClick={onFetch}
          className="flex-1 mx-2 bg-red-600 hover:bg-red-700 text-white text-sm font-semibold py-2 rounded-xl"
        >
          {loading ? (
            <span className="animate-pulse">⏳ Loading...</span>
          ) : (
            "🎯 Recommend"
          )}
        </button>

        <button
          onClick={onGuess}
          className="flex-1 mx-2 bg-purple-700 hover:bg-purple-800 text-white text-sm font-semibold py-2 rounded-xl"
        >
          {loading ? (
            <span className="animate-pulse">🔄 Loading...</span>
          ) : (
            "🎮 Guess"
          )}
        </button>
      </div>
    </>
  );
}
