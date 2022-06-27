import React, { useContext } from 'react';
import { Link, useHistory } from 'react-router-dom';
import globalContext from '../context/globalContext';
import ButtonShare from './ButtonShare';
import FavoriteButton from './FavoriteButton';
import '../styles/Details.css';

export default function HeaderRecipe() {
  const { recipeDetail } = useContext(globalContext);
  const { location: { pathname } } = useHistory();
  const path = pathname.split('/')[1];
  const checkStr = path === 'foods' ? 'Meal' : 'Drink';

  return (
    <div>
      <div className="detail-img">
        <Link to="/foods">
          Home
        </Link>
        <img
          data-testid="recipe-photo"
          src={ recipeDetail[`str${checkStr}Thumb`] }
          alt="recipe"
        />
      </div>
      <div className="title-container">
        <div className="category-title">
          <p data-testid="recipe-category">
            {path === 'foods' ? recipeDetail.strCategory : recipeDetail.strAlcoholic }
          </p>
          <h1 data-testid="recipe-title">
            {recipeDetail[`str${checkStr}`]}
          </h1>
        </div>
        <div className="details-btns">
          <ButtonShare
            link={ `http://localhost:3000/${pathname.split('/')[1]}/${recipeDetail[`id${checkStr}`]}` }
            testid="share-btn"
          />
          <FavoriteButton path={ path } />
        </div>
      </div>
    </div>
  );
}
