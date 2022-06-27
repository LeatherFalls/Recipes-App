import React from 'react';
import { Link } from 'react-router-dom';
import Footer from '../components/Footer';
import Header from '../components/Header';
import '../styles/Explore.css';

export default function Explore() {
  return (
    <div className="explore-container">
      <Header titleName="Explore" filter={ false } />
      <div className="explore">
        <Link to="/explore/foods">
          <button
            data-testid="explore-foods"
            type="button"
            className="explore-btn"
          >
            Explore Foods
          </button>
        </Link>
        <Link to="/explore/drinks">
          <button
            data-testid="explore-drinks"
            type="button"
            className="explore-btn"
          >
            Explore Drinks
          </button>
        </Link>
      </div>
      <Footer />
    </div>
  );
}
