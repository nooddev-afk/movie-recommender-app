import React from 'react';
import { Link } from 'react-router-dom';
import './Footer.css';

export default function Footer() {
  return (
    <footer className="footer">
      <div className="footer-links">
        <Link to="/what-to-watch-this-weekend">What to Watch This Weekend</Link>
        <Link to="/new-movies">New Movies to Stream</Link>
        <Link to="/what-to-watch">What to Watch</Link>
        <Link to="/new-tv-shows">New TV Shows</Link>
      </div>
    </footer>
  );
}
