import PropTypes from 'prop-types';
import React, { useContext, useEffect, useState } from 'react';
import globalContext from '../context/globalContext';
import blackHeartIcon from '../images/blackHeartIcon.svg';
import whiteHeartIconfrom from '../images/whiteHeartIcon.svg';

export default function FavoriteButton({ path }) {
  const { recipeDetail } = useContext(globalContext);
  const [favorite, setFavorite] = useState(false);
  const [key, setKey] = useState(false);

  useEffect(() => {
    setKey(path === 'foods' ? 'Meal' : 'Drink');
    const storage = JSON.parse(localStorage.getItem('favoriteRecipes')) || [];
    const isFavorite = storage.some((recipe) => recipe.id === recipeDetail[`id${key}`]);
    setFavorite(isFavorite);
  });

  function addFavorite(data, favorites) {
    const newFavoritesList = [...favorites, data];
    localStorage.setItem('favoriteRecipes', JSON.stringify(newFavoritesList));
  }

  function removeFavorite(id, favorites) {
    const newFavoritesList = favorites.filter((recipe) => recipe.id !== id);
    localStorage.setItem('favoriteRecipes', JSON.stringify(newFavoritesList));
  }

  function handleClick() {
    const favorites = JSON.parse(localStorage.getItem('favoriteRecipes')) || [];

    const newFavorite = {
      id: recipeDetail[`id${key}`],
      type: path === 'foods' ? 'food' : 'drink',
      nationality: recipeDetail.strArea ? recipeDetail.strArea : '',
      category: recipeDetail.strCategory,
      alcoholicOrNot: recipeDetail.strAlcoholic ? recipeDetail.strAlcoholic : '',
      name: recipeDetail[`str${key}`],
      image: recipeDetail[`str${key}Thumb`],
    };

    if (!favorite) {
      addFavorite(newFavorite, favorites);
      setFavorite(true);
    } else {
      removeFavorite(recipeDetail[`id${key}`], favorites);
      setFavorite(false);
    }
  }

  return (
    <button
      type="button"
      onClick={ handleClick }
      className="fav-button"
    >
      <img
        data-testid="favorite-btn"
        src={ favorite ? blackHeartIcon : whiteHeartIconfrom }
        alt="favorite icon"
      />
    </button>
  );
}

FavoriteButton.propTypes = {
  path: PropTypes.string.isRequired,
};
