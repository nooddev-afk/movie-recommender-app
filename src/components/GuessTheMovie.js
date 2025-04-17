import React, { useState } from "react";

export default function GuessTheMovie({ movie, onClose }) {
  const [userGuess, setUserGuess] = useState("");
  const [revealed, setRevealed] = useState(false);
  const [isCorrect, setIsCorrect] = useState(null);

  if (!movie) return null;

  // ✅ Extract first available country and platforms
  const availableCountry = Object.keys(movie.streamingOptions || {})[0] || "";
  const regionPlatforms = movie.streamingOptions?.[availableCountry] || [];

  // ✅ Parse platform names (used in hints)
  const platformNamesStr = regionPlatforms
    .map((p) => {
      if (typeof p === "string") return p;
      if (typeof p === "object") {
        const name =
          typeof p.service === "string"
            ? p.service
            : typeof p.name === "string"
            ? p.name
            : null;
        return name ? name.toUpperCase() : "Unknown Platform";
      }
      return "Unknown Platform";
    })
    .filter(Boolean)
    .join(", ");

  const director = movie.directors?.[0] || "Unknown";
  const leadActor = movie.cast?.[0] || "Unknown";
  const year = movie.releaseYear || "Unknown year";

  const checkGuess = () => {
    const cleanedGuess = userGuess.trim().toLowerCase();
    const cleanedTitle = movie.title.trim().toLowerCase();
    const correct = cleanedGuess === cleanedTitle;
    setIsCorrect(correct);
    setRevealed(true);
  };

  return (
    <div className="fixed inset-0 z-50 bg-black bg-opacity-80 flex justify-center items-center p-4 overflow-auto">
      <div className="w-full max-w-md bg-zinc-900 p-5 rounded-xl shadow-lg border border-zinc-700 relative max-h-[95vh] overflow-y-auto">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-zinc-400 hover:text-white text-xl"
        >
          ✖
        </button>

        <h2 className="text-lg font-bold mb-3 text-center">
          🎮 Guess the Movie
        </h2>

        <img
          src={
            movie.posterURL ||
            "https://via.placeholder.com/300x450?text=No+Poster"
          }
          alt={movie.title || "Poster"}
          className={`w-full max-h-[300px] sm:max-h-[400px] object-contain rounded-md mb-4 transition-all duration-300 ${
            !revealed ? "blur-sm scale-105 opacity-80" : "blur-0 opacity-100"
          }`}
        />

        <ul className="text-zinc-300 mb-4 space-y-1 text-sm">
          <li>
            🎭 Lead actor: <strong>{leadActor}</strong>
          </li>
          <li>
            🎬 Director: <strong>{director}</strong>
          </li>
          <li>
            📅 Released in: <strong>{year}</strong>
          </li>
          <li>
            🌍 Available in your location on{" "}
            <strong>{platformNamesStr || "some platforms"}</strong>
          </li>
        </ul>

        <input
          type="text"
          placeholder="Your guess..."
          value={userGuess}
          onChange={(e) => setUserGuess(e.target.value)}
          disabled={revealed}
          className="w-full px-4 py-2 mb-4 rounded bg-zinc-800 text-white placeholder-zinc-500 focus:outline-none focus:ring-2 focus:ring-pink-500"
        />

        {!revealed ? (
          <button
            onClick={checkGuess}
            className="w-full bg-green-600 hover:bg-green-700 text-white font-semibold py-2 rounded transition"
          >
            Reveal Answer
          </button>
        ) : (
          <>
            <div className="text-center mt-4 mb-4">
              {isCorrect ? (
                <>
                  <p className="text-green-400 text-lg font-semibold mb-1">
                    🎉 Correct! It's <strong>{movie.title}</strong>
                  </p>
                  <p className="text-zinc-300 text-sm">
                    Wanna rewatch or explore more?
                  </p>
                </>
              ) : (
                <>
                  <p className="text-red-400 text-lg font-semibold mb-1">
                    ❌ You guessed wrong
                  </p>
                  <p className="text-white">
                    The answer was <strong>{movie.title}</strong>
                  </p>
                  <p className="text-zinc-300 text-sm mt-1">Give it a go?</p>
                </>
              )}
            </div>

            <div className="flex flex-wrap justify-center gap-3 mt-2">
              {regionPlatforms.map((p, index) => {
                const label =
                  typeof p === "object"
                    ? typeof p.service === "string"
                      ? p.service.toUpperCase()
                      : p.name || `Platform ${index + 1}`
                    : `Platform ${index + 1}`;
                const link =
                  typeof p === "object" && typeof p.link === "string"
                    ? p.link
                    : null;
                return (
                  <button
                    key={label + index}
                    onClick={() => link && window.open(link, "_blank")}
                    className="bg-pink-600 hover:bg-pink-700 text-white text-sm px-4 py-2 rounded-lg shadow transition"
                  >
                    {`Watch on ${label}`}
                  </button>
                );
              })}
            </div>

            <div className="text-center mt-6 text-sm text-zinc-500 italic">
              Already seen this? More game types coming soon 👀
            </div>
          </>
        )}
      </div>
    </div>
  );
}
