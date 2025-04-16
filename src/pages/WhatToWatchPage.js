import React, { useState, useEffect, useRef } from 'react';
import { Helmet } from 'react-helmet';
import { Link } from 'react-router-dom';
import axios from 'axios';

const SERVICE_NAMES = {
  netflix: 'NETFLIX',
  prime: 'PRIME',
  hbo: 'HBO',
  hulu: 'HULU',
  disney: 'DISNEY+',
  apple: 'APPLE TV',
  peacock: 'PEACOCK',
};

export default function WhatToWatchPage() {
  const [loading, setLoading] = useState(false);
  const [country, setCountry] = useState('');
  const [items, setItems] = useState([]);
  const [posterCache, setPosterCache] = useState({});
  const sliderRef = useRef(null);

  const API_HOST = 'https://streaming-availability.p.rapidapi.com/shows';
  const API_HEADERS = {
    'X-RapidAPI-Key': process.env.REACT_APP_RAPIDAPI_KEY,
    'X-RapidAPI-Host': 'streaming-availability.p.rapidapi.com',
  };

  useEffect(() => {
    async function fetchUserCountry() {
      try {
        const resp = await axios.get('https://ipapi.co/json/');
        setCountry(resp.data.country_code.toLowerCase());
      } catch (error) {
        console.error('Failed to detect country:', error);
        setCountry('us');
      }
    }
    fetchUserCountry();
  }, []);

  useEffect(() => {
    if (!country) return;
    fetchTrendingItems();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [country]);

  async function fetchTrendingItems() {
    setLoading(true);
    try {
      const resp = await axios.get(`${API_HOST}/search/filters`, {
        headers: API_HEADERS,
        params: {
          country: country,
          show_type: 'movie',
          output_language: 'en',
          limit: 10,
          order_by: 'popularity_1year',
          order_direction: 'desc',
        },
      });

      const foundItems = resp.data?.shows || [];
      const finalItems = [];
      const tempCache = { ...posterCache };

      for (let i = 0; i < foundItems.length; i++) {
        const item = foundItems[i];
        const tmdbId = item.tmdbId?.split('/')?.[1];
        let posterUrl;

        if (!tmdbId) {
          posterUrl = 'https://via.placeholder.com/300x450?text=No+TMDB+ID';
        } else {
          try {
            const tmdbResp = await axios.get(
              `https://api.themoviedb.org/3/movie/${tmdbId}`,
              {
                params: {
                  api_key: process.env.REACT_APP_TMDB_API_KEY,
                },
              }
            );
            const tmdbData = tmdbResp.data;
            posterUrl = tmdbData.poster_path
              ? `https://image.tmdb.org/t/p/w500${tmdbData.poster_path}`
              : 'https://via.placeholder.com/300x450?text=No+Poster';
          } catch (tmdbErr) {
            console.error('Failed TMDB fetch for', item.title, tmdbErr);
            posterUrl = 'https://via.placeholder.com/300x450?text=TMDB+Error';
          }
        }

        tempCache[item.id] = posterUrl;
        finalItems.push(item);
      }

      setPosterCache(tempCache);
      setItems(finalItems);
    } catch (err) {
      console.error('Failed to fetch trending picks:', err);
    }
    setLoading(false);
  }

  function getPoster(item) {
    return posterCache[item.id] || 'https://via.placeholder.com/300x450?text=Loading...';
  }

  function getServiceLabel(item) {
    if (item.catalogs?.length > 0) {
      const serv = item.catalogs[0];
      return SERVICE_NAMES[serv] || serv.toUpperCase();
    }
    return null;
  }

  return (
    <div className="relative min-h-screen bg-gradient-to-b from-black via-zinc-900 to-black text-white font-body px-4 pt-20 pb-56">
      <Helmet>
        <title>What to Watch | The Movies Finder</title>
        <meta
          name="description"
          content="Confused about what to watch? Discover the best movies, top TV shows, and trending content on Netflix, Hulu, Prime, Apple TV+, and more — updated in real-time."
        />
        <meta
          name="keywords"
          content="what to watch, good movies to watch, best shows to watch, movies to stream, best tv shows, netflix series, movies 2024, new tv shows, good shows, new netflix movies, best movies to stream, watch series, what to watch on netflix"
        />
      </Helmet>

      <div className="absolute inset-0 z-0 pointer-events-none bg-[url('https://www.transparenttextures.com/patterns/asfalt-dark.png')] opacity-10 mix-blend-soft-light" />

      <div className="relative z-10 max-w-5xl mx-auto">
        <h1 className="text-3xl md:text-4xl font-heading font-semibold text-center mb-6">
          What to Watch
        </h1>
        <p className="text-center text-sm text-zinc-400 mb-10 max-w-2xl mx-auto">
          Your one-stop destination for the best movies, trending series, and binge-worthy shows — handpicked and updated in real time.
        </p>

        {/* 🔥 SEO TEXT STARTS HERE */}
        <div className="space-y-6 text-sm text-zinc-300 leading-relaxed">
          <p>
            Let’s be honest — deciding what to watch has become a full-time job. With thousands of shows, movies, and
            streaming options, it’s harder than ever to pick something that’s actually worth your time. That’s why we
            built this page: to answer the internet’s most common question — “what should I watch right now?”
          </p>
          <p>
            Whether you’re into good movies to watch with friends, comedy movies that’ll crack you up, or underrated
            Netflix series to binge alone, we’ve got all your streaming moods covered. This isn’t another generic list
            that repeats “Stranger Things” and calls it a day. This is curated, constantly updated, and tailored to
            what’s hot this week.
          </p>
          <p>
            If you’re looking for what to watch on Netflix, the best new TV shows on Hulu, or movies out now on Prime —
            it’s all right here. We’ve even tagged the best shows on Apple TV, trending movies on Reddit, and random gems
            most people miss. You’ll find good movies, new Netflix movies, popular series, and upcoming movies 2024 fans
            are hyped for.
          </p>
          <p>
            Into true crime? We’ve got crime thrillers and dark documentaries. Want a feel-good Friday? Scroll for
            funny movies, romantic Netflix originals, or heartwarming family stories. Craving suspense? We’ve added the
            best horror movies on Netflix and Hulu that’ll keep you up all night.
          </p>
          <p>
            This page is built for every type of streamer: from casual scrollers who just want good shows to watch, to
            hardcore binge-watchers who finish entire seasons in a weekend. We factor in what’s trending on social,
            Reddit movies hype, IMDb scores, and even new Netflix series 2024 users are loving.
          </p>
          <p>
            We also have options if you're feeling totally indecisive. Our smart filters work like a random movie
            generator — but smarter. You can jump from “top streaming movies” to “best shows to stream right now”
            without wasting hours digging through app menus.
          </p>
          <p>
            Every recommendation is sourced from live streaming availability data. So whether you're on Netflix, Hulu,
            Amazon Prime, Apple TV+, or even Peacock, you’ll know instantly what’s available to stream in your region.
          </p>
          <p>
            Tired of seeing the same content everywhere? We’re different. We keep this list alive — adding new releases,
            pulling out hidden gems, and cutting the clutter. If you’ve ever opened 4 streaming apps and still ended up
            watching reruns, this page is your solution.
          </p>
          <p className="text-green-400 font-medium">
            TL;DR: You’ll never ask “what should I watch?” again — just scroll, explore, and stream. We've got the
            internet's best answer to "what to watch."
          </p>
        </div>
        {/* 🔥 SEO TEXT ENDS HERE */}

        <div className="mt-10">
          <h2 className="text-xl font-heading mb-3">
            Top Trending Picks in {country?.toUpperCase() || 'US'}
          </h2>

          {loading ? (
            <p className="text-sm text-zinc-400">Loading trending titles...</p>
          ) : (
            <div className="relative">
              <button
                onClick={() => {
                  if (sliderRef.current) sliderRef.current.scrollLeft -= 600;
                }}
                className="absolute left-0 top-1/2 -translate-y-1/2 bg-zinc-800 hover:bg-zinc-700 text-white px-3 py-2 rounded-r-md z-20 hidden md:block"
              >
                &larr;
              </button>

              <div
                ref={sliderRef}
                className="overflow-x-auto flex gap-4 scroll-smooth md:mx-10 px-2 py-3"
                style={{ scrollBehavior: 'smooth' }}
              >
                {items.map((item, idx) => {
                  const posterUrl = getPoster(item);
                  const serviceLabel = getServiceLabel(item);
                  return (
                    <div
                      key={item.id || idx}
                      className="flex-shrink-0 w-48 bg-zinc-800 rounded-md p-3 shadow"
                    >
                      <img
                        src={posterUrl}
                        alt={item.title}
                        className="w-full h-auto rounded mb-2"
                      />
                      <h3 className="text-sm font-medium mb-1 line-clamp-2">{item.title}</h3>
                      {serviceLabel && (
                        <p className="text-xs text-pink-400 font-semibold">
                          {serviceLabel}
                        </p>
                      )}
                    </div>
                  );
                })}
              </div>

              <button
                onClick={() => {
                  if (sliderRef.current) sliderRef.current.scrollLeft += 600;
                }}
                className="absolute right-0 top-1/2 -translate-y-1/2 bg-zinc-800 hover:bg-zinc-700 text-white px-3 py-2 rounded-l-md z-20 hidden md:block"
              >
                &rarr;
              </button>
            </div>
          )}
        </div>
      </div>

      <div className="fixed bottom-0 left-0 right-0 z-50 bg-zinc-900 border-t border-zinc-800 py-4 px-4">
        <div className="max-w-5xl mx-auto flex justify-center">
          <Link
            to="/"
            className="bg-gradient-to-r from-red-500 to-pink-500 hover:from-red-600 hover:to-pink-600 text-white px-6 py-3 rounded-xl shadow-xl font-medium transition"
          >
            🔍 Start Exploring What to Watch
          </Link>
        </div>
      </div>
    </div>
  );
}
