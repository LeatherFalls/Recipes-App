import PropTypes from 'prop-types';
import React, { useContext, useEffect } from 'react';
import globalContext from '../context/globalContext';
import '../styles/Ingredients.css';
import Step from './Step';

export default function Ingredients({ inProgress }) {
  const { recipeDetail } = useContext(globalContext);

  useEffect(() => {
    if (!localStorage.getItem('inProgressRecipes')) {
      const obj = { cocktails: {}, meals: {} };
      localStorage.setItem('inProgressRecipes', JSON.stringify(obj));
    }
  }, []);

  function filterValues(key) {
    return Object.entries(recipeDetail)
      .filter((array) => (array[0].includes(key)
      && array[1] && array[1].trim().length > 0));
  }

  const ingredients = filterValues('Ingredient');
  const measures = filterValues('Measure');

  measures.forEach((measure, i) => {
    ingredients[i].splice(0, 1);
    ingredients[i].push(measure[1]);
  });

  function renderIngredient(ingredient, i) {
    return (
      <li key={ i } data-testid={ `${i}-ingredient-name-and-measure` }>
        {ingredient[0].includes('str') ? ingredient[1] : ingredient[0]}
        {' '}
        {!ingredient[0].includes('str') && `- ${ingredient[1]}`}
      </li>
    );
  }

  return (
    <div className="ingredients-container">
      <h3 className="ingredients-title">Ingredients</h3>
      <ul>
        { ingredients.map((ingredient, i) => (
          inProgress
            ? <Step key={ i } ingredient={ ingredient } index={ i } />
            : renderIngredient(ingredient, i)
        ))}
      </ul>
    </div>
  );
}

Ingredients.defaultProps = {
  inProgress: false,
};

Ingredients.propTypes = {
  inProgress: PropTypes.bool,
};
