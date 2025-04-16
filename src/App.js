// src/App.js
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import MovieRecommendationApp from './MovieRecommendationApp';
import AboutPage from './AboutPage'; // adjust path if needed
import TrendingWidgetPage from './TrendingWidgetPage';
import WeekendWatchPage from './WeekendWatchPage';
import NewMoviesPage from './NewMoviesPage';
import WhatToWatchPage from './WhatToWatchPage';
import NewTVShowsPage from './NewTVShowsPage';
import Footer from './components/Footer'; // if not already added
import Contact from './Contact';
import PrivacyPolicy from './PrivacyPolicy';


export default function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<MovieRecommendationApp />} />
        <Route path="/trending-movies/shows-in-2025" element={<TrendingWidgetPage />} />
        <Route path="/about" element={<AboutPage />} />
        <Route path="/what-to-watch-this-weekend" element={<WeekendWatchPage />} />
<Route path="/new-movies" element={<NewMoviesPage />} />
<Route path="/what-to-watch" element={<WhatToWatchPage />} />
<Route path="/new-tv-shows" element={<NewTVShowsPage />} />
<Route path="/privacy-policy" element={<PrivacyPolicy />} />
<Route path="/contact" element={<Contact />} />

      </Routes>
      <Footer />
      
    </Router>
  );
}
