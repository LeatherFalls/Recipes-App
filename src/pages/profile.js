import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Footer from '../components/Footer';
import Header from '../components/Header';
import '../styles/Profile.css';
/* import '../styles/Footer.css'; */

export default function Profile() {
  const [email, setEmail] = useState('');

  useEffect(() => {
    const storage = JSON.parse(localStorage.getItem('user')) || ' ';
    setEmail(storage.email);
  }, []);
  return (
    <div className="profile-container">
      <Header titleName="Profile" filter={ false } />
      <div className="email-container">
        <p
          data-testid="profile-email"
          className="profile-email"
        >
          {email}
        </p>
      </div>
      <div className="links-container">
        <Link to="/done-recipes">
          <button type="button" data-testid="profile-done-btn">Done Recipes</button>
        </Link>
        <Link to="/favorite-recipes">
          <button
            type="button"
            data-testid="profile-favorite-btn"
          >
            Favorite Recipes
          </button>
        </Link>
        <Link to="/">
          <button
            type="button"
            data-testid="profile-logout-btn"
            onClick={ () => {
              localStorage.clear();
            } }
          >
            Logout
          </button>
        </Link>
      </div>
      <Footer />
    </div>
  );
}
