import PropTypes from 'prop-types';
import React, { useContext, useState } from 'react';
import { useHistory } from 'react-router-dom';
import globalContext from '../context/globalContext';

export default function ButtonStartRecipe(props) {
  const { recipeDetail, stepsChecked } = useContext(globalContext);
  const [started, setStarted] = useState(false);
  const {
    textContent,
    path = false, testid = 'start-recipe-btn', finish = false } = props;
  const { push } = useHistory();

  const key = path === 'foods'
    ? ['idMeal', 'strMeal', 'Meal'] : ['idDrink', 'strDrink', 'Drink'];

  function checkSaved() {
    const storage = JSON.parse(localStorage.getItem('doneRecipes')) || [];
    const inStorage = storage.some((recipe) => recipe.id === recipeDetail[key[0]]);
    return inStorage;
  }

  function checkContinue() {
    const storage = JSON.parse(localStorage.getItem('inProgressRecipes')) || [];
    const inStorage = Object.values(storage)
      .some((progress) => Object.keys(progress)[0] === recipeDetail[key[0]]);

    return inStorage;
  }

  const saved = checkSaved();
  const inProgress = checkContinue();

  function handleClick() {
    const tags = recipeDetail.strTags ? recipeDetail.strTags.split(' ') : [];
    setStarted(!started);

    if (finish) {
      const obj = {
        id: recipeDetail[key[0]],
        type: recipeDetail.type,
        nationality: recipeDetail.strArea || '',
        category: recipeDetail.category || '',
        alcoholicOrNot: recipeDetail.alcoholicOrNot || '',
        name: recipeDetail[key[1]],
        image: recipeDetail[`str${key[2]}Thumb`],
        doneDate: recipeDetail.dateModified,
        tags,
      };

      const storage = JSON.parse(localStorage.getItem('doneRecipes')) || [];

      storage.push(obj);
      localStorage.setItem('doneRecipes', JSON.stringify(storage));

      push('/done-recipes');
    }
  }

  return (
    !saved && (
      <button
        data-testid={ testid }
        type="button"
        className="btn-start-recipe"
        onClick={ handleClick }
        disabled={ testid && stepsChecked.completed.length < stepsChecked.length }
      >
        {inProgress && !finish ? 'Continue Recipe' : textContent}
      </button>
    )
  );
}

ButtonStartRecipe.propTypes = {
  textContent: PropTypes.node.isRequired,
  path: PropTypes.string.isRequired,
  testid: PropTypes.string.isRequired,
  finish: PropTypes.bool.isRequired,
};
