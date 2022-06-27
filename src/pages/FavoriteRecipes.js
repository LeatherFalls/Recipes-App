import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import ButtonShare from '../components/ButtonShare';
import Footer from '../components/Footer';
import Header from '../components/Header';
import blackHeartIcon from '../images/blackHeartIcon.svg';
import '../styles/FavoriteRecipes.css';

export default function FavoriteRecipes() {
  const [favorites, setFavorites] = useState([]);
  const [defaultFilter, setDefaultFilter] = useState([]);
  const filterRecipes = [...favorites];

  useEffect(() => {
    const storage = JSON.parse(localStorage.getItem('favoriteRecipes')) || [];
    setDefaultFilter(storage);
    setFavorites(storage);
  }, []);

  function removeRecipe(id) {
    const newFavoritesList = favorites.filter((recipe) => recipe.id !== id);
    localStorage.setItem('favoriteRecipes', JSON.stringify(newFavoritesList));
    setFavorites(newFavoritesList);
    setDefaultFilter(newFavoritesList);
  }

  function handleFilter({ target }) {
    const { textContent } = target;

    if (textContent === 'Drinks') {
      setFavorites(defaultFilter.filter((recipe) => recipe.type === 'drink'));
    } else if (textContent === 'Food') {
      setFavorites(defaultFilter.filter((recipe) => recipe.type === 'food'));
    } else {
      setFavorites(defaultFilter);
    }
  }

  function renderRecipe(recipe, i) {
    const path = recipe.type === 'food' ? 'foods' : 'drinks';

    return (
      <div key={ i } className="card-favorite">
        <div className="img-container-favorite">
          <Link to={ `/${path}/${recipe.id}` }>
            <img
              src={ recipe.image }
              data-testid={ `${i}-horizontal-image` }
              alt="recipe favorite"
            />
          </Link>
        </div>
        <div className="information-favorite">
          <div className="information-content">
            <Link to={ `/${path}/${recipe.id}` }>
              <h4 data-testid={ `${i}-horizontal-name` }>{recipe.name}</h4>
            </Link>
            <p
              data-testid={ `${i}-horizontal-top-text` }
            >
              { recipe.type === 'drink'
                ? recipe.alcoholicOrNot
                : recipe.nationality }
              {' '}
              <span>{ recipe.nationality && `- ${recipe.category}` }</span>
            </p>
          </div>
          <div className="information-favShare">
            <ButtonShare
              link={ `http://localhost:3000/${path}/${recipe.id}` }
              testid={ `${i}-horizontal-share-btn` }
            />

            <button type="button" onClick={ () => removeRecipe(recipe.id) }>
              <img
                data-testid={ `${i}-horizontal-favorite-btn` }
                src={ blackHeartIcon }
                alt="fav icon"
              />
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div>
      <Header titleName="Favorite Recipes" filter={ false } />
      <div className="filters-container">
        <button
          onClick={ handleFilter }
          type="button"
          data-testid="filter-by-all-btn"
        >
          All
        </button>
        <button
          type="button"
          data-testid="filter-by-food-btn"
          onClick={ handleFilter }
        >
          Food

        </button>
        <button
          type="button"
          data-testid="filter-by-drink-btn"
          onClick={ handleFilter }
        >
          Drinks

        </button>
      </div>
      { filterRecipes.map((recipe, i) => renderRecipe(recipe, i))}
      <Footer />
    </div>
  );
}
