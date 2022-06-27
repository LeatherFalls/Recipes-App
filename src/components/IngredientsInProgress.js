import React, { useContext, useEffect } from 'react';
import PropTypes from 'prop-types';
import globalContext from '../context/globalContext';
import { getRecipeProgress, setRecipeProgress } from '../services/localStorage';
import '../styles/Ingredients.css';

export default function IngredientsInProgress({ type, id }) {
  const { recipeDetail } = useContext(globalContext);

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

  useEffect(() => {
    if (!getRecipeProgress()) {
      setRecipeProgress({
        cocktails: {},
        meals: {},
      });
    }
  }, []);

  const handleCheck = () => {
    const $li = document.querySelectorAll('.ingredient-item');
    const $checkbox = document.querySelectorAll('.ingredient-checkbox');
    const selectedItem = 'selected-item';
    const storage = getRecipeProgress();
    $li.forEach((element, index) => {
      let ingredientsArray = [...ingredients];

      if ($checkbox[index].checked) {
        ingredientsArray = storage[type][id]
          ? [...storage[type][id], index]
          : [index];
      }
      const currentItem = storage[type].length
        ? {
          ...storage,
          [type]: {
            [id]: ingredientsArray,
          },
        }
        : {
          ...storage,
          [type]: {
            ...storage[type],
            [id]: ingredientsArray,
          },
        };
      console.log(currentItem);
      if ($checkbox[index].checked) {
        element.classList.add(selectedItem);
        setRecipeProgress(currentItem);
      } else {
        element.classList.remove(selectedItem);
      }
    });
    console.log(getRecipeProgress()[type][id]);
    console.log($checkbox);
    console.log($li);
    console.log(ingredients);
  };

  const loadProgress = () => {
    const storage = getRecipeProgress()[type][id];
    const li = document.querySelectorAll('.ingredient-item');
    const selectedItem = 'selected-item';
    for (let i = 0; i < li.length; i += 1) {
      if (storage && storage.includes(i)) {
        li[i].childNodes[0].checked = true;
      } else {
        li[i].childNodes[0].checked = false;
      }
      if (li[i].childNodes[0].checked) {
        li[i].classList.add(selectedItem);
      } else {
        li[i].classList.remove(selectedItem);
      }
    }
  };

  useEffect(() => loadProgress());
  useEffect(() => loadProgress(), [type, id]);
  return (
    <div className="ingredients-container">
      <h3 className="ingredients-title">Ingredients</h3>
      <ul>
        { ingredients.map((ingredient, i) => (
          <li
            key={ i }
            data-testid={ `${i}-ingredient-step` }
            className="ingredient-item"
          >
            <input
              type="checkbox"
              className="ingredient-checkbox"
              onChange={ handleCheck }
            />
            {ingredient[0].includes('str') ? ingredient[1] : ingredient[0]}
            {' '}
            {!ingredient[0].includes('str') && `- ${ingredient[1]}`}
          </li>
        ))}
      </ul>
    </div>
  );
}
// push
IngredientsInProgress.propTypes = {
  type: PropTypes.string,
  id: PropTypes.string,
}.isRequired;
