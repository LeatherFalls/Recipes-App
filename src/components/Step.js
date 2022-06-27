import PropTypes from 'prop-types';
import React, { useContext, useEffect, useState } from 'react';
import globalContext from '../context/globalContext';

export default function Step({ index, ingredient }) {
  const [checked, setChecked] = useState(false);
  const { recipeDetail, setStepChecked, stepsChecked } = useContext(globalContext);
  const recipeKey = Object.keys(recipeDetail).find((key) => key.includes('id'));
  const id = recipeDetail[recipeKey];
  const storageKey = recipeKey === 'idMeal' ? 'meals' : 'cocktails';
  const item = ingredient[0].includes('str') ? ingredient[1] : ingredient[0];
  const obj = JSON.parse(localStorage.getItem('inProgressRecipes'));
  const inStorage = obj[storageKey][id] && obj[storageKey][id].includes(item);

  useEffect(() => {
    const storage = JSON.parse(localStorage.getItem('inProgressRecipes'));
    const check = storage[storageKey][id];

    if (!check) {
      setChecked(false);
    } else {
      const isChecked = storage[storageKey][id] && storage[storageKey][id].includes(item);
      setChecked(isChecked);
    }

    setStepChecked({
      ...stepsChecked, length: index + 1, completed: storage[storageKey][id] || [] });

    return () => setStepChecked({ completed: [], length: 0 });
  }, []);

  function handleChecked({ target }) {
    setChecked(target.checked);
    const storage = JSON.parse(localStorage.getItem('inProgressRecipes'));

    if (!storage[storageKey][id]) {
      storage[storageKey][id] = [item];
    } else if (target.checked) {
      storage[storageKey][id] = [...storage[storageKey][id], item];
      setStepChecked({ ...stepsChecked, completed: storage[storageKey][id] });
    } else {
      storage[storageKey][id] = storage[storageKey][id]
        .filter((ingred) => ingred !== item);
      setStepChecked({ ...stepsChecked, completed: storage[storageKey][id] });
    }

    localStorage.setItem('inProgressRecipes', JSON.stringify(storage));
  }

  return (
    <li
      key={ index }
      data-testid={ `${index}-ingredient-step` }
    >
      <label htmlFor={ index } checked={ checked }>
        <input
          checked={ inStorage }
          id={ index }
          type="checkbox"
          className="checked ingredient-checkbox"
          onChange={ handleChecked }
        />
        {ingredient[0].includes('str') ? ingredient[1] : ingredient[0]}
        {' '}
        {!ingredient[0].includes('str') && `- ${ingredient[1]}`}
      </label>
    </li>
  );
}

Step.propTypes = {
  ingredient: PropTypes.arrayOf(PropTypes.arrayOf).isRequired,
  index: PropTypes.number.isRequired,
};
