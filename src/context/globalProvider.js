import PropTypes from 'prop-types';
import React, { useState } from 'react';
import globalContext from './globalContext';

export default function GlobalProvider({ children }) {
  const [recipes, setRecipes] = useState({ drinks: [], meals: [], backup: [] });
  const [showFilter, setShowFilter] = useState(false);
  const [filter, setFilter] = useState('');
  const [toggle, setToggle] = useState(false);
  const [all, setAll] = useState(false);
  const [detailRecipe, setDetailRecipe] = useState(false);
  const [recipeDetail, setRecipeDetail] = useState([]);
  const [ingredients, setIngredients] = useState([]);
  const [stepsChecked, setStepChecked] = useState({ completed: [], length: 0 });

  const context = {
    recipes,
    setRecipes,
    showFilter,
    setShowFilter,
    setFilter,
    filter,
    toggle,
    setToggle,
    all,
    setAll,
    detailRecipe,
    setDetailRecipe,
    recipeDetail,
    setRecipeDetail,
    ingredients,
    setIngredients,
    stepsChecked,
    setStepChecked,
  };

  return (
    <globalContext.Provider value={ context }>
      { children }
    </globalContext.Provider>
  );
}

GlobalProvider.propTypes = {
  children: PropTypes.node.isRequired,
};
