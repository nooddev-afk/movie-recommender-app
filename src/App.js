// src/App.js
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import Header from './components/Header';
import Footer from './components/Footer';

import MovieRecommendationApp from './MovieRecommendationApp';
import TrendingWidgetPage from './TrendingWidgetPage';
import WeekendWatchPage from './pages/WeekendWatchPage';
import NewMoviesPage from './pages/NewMoviesPage';
import WhatToWatchPage from './pages/WhatToWatchPage';
import NewTVShowsPage from './pages/NewTVShowsPage';
import AboutPage from './pages/AboutPage';
import Contact from './pages/Contact';
import PrivacyPolicy from './pages/PrivacyPolicy';
import WeekendWatchApril2025 from './pages/blog/WeekendWatchApril2025';
import BlogHome from './pages/BlogHome';
import NewMoviesApril2025 from './pages/blog/NewMoviesApril2025';
import NetflixSecretApril2025 from './pages/blog/NetflixSecretApril2025';
import NoraAunorTribute from './pages/blog/NoraAunorTribute';



// BlogHome route will be added later

export default function App() {
  return (
    <Router>
      <Header />
      
      <Routes>
        <Route path="/" element={<MovieRecommendationApp />} />
        <Route path="/trending-movies/shows-in-2025" element={<TrendingWidgetPage />} />
        <Route path="/about" element={<AboutPage />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/privacy-policy" element={<PrivacyPolicy />} />
        <Route path="/what-to-watch-this-weekend" element={<WeekendWatchPage />} />
        <Route path="/new-movies" element={<NewMoviesPage />} />
        <Route path="/what-to-watch" element={<WhatToWatchPage />} />
        <Route path="/new-tv-shows" element={<NewTVShowsPage />} />
        <Route path="/blog/weekend-watch-april-2025" element={<WeekendWatchApril2025 />} />
        <Route path="/blog/new-movies-april-2025" element={<NewMoviesApril2025 />} />
        <Route path="/blog/netflix-secret-april-2025" element={<NetflixSecretApril2025 />} />
        <Route path="/blog/remembering-nora-aunor-tribute" element={<NoraAunorTribute />} />
        
        <Route path="/blog" element={<BlogHome />} />

      </Routes>

      <Footer />
    </Router>
  );
}
