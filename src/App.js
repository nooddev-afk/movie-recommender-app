// src/App.js
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import MovieRecommendationApp from './MovieRecommendationApp';
import AboutPage from './AboutPage'; // adjust path if needed
import TrendingWidgetPage from './TrendingWidgetPage';

export default function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<MovieRecommendationApp />} />
        <Route path="/trending-movies/shows-in-2025" element={<TrendingWidgetPage />} />
        <Route path="/about" element={<AboutPage />} />
      </Routes>
    </Router>
  );
}
