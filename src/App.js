// src/App.js
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import MovieRecommendationApp from './MovieRecommendationApp';
import TrendingWidgetPage from './TrendingWidgetPage';

export default function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<MovieRecommendationApp />} />
        <Route path="/trending-movies/shows-in-2025" element={<TrendingWidgetPage />} />
      </Routes>
    </Router>
  );
}
