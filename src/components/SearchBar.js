import React, { useContext, useState } from 'react';
import { useHistory } from 'react-router-dom';
import globalContext from '../context/globalContext';
import fetchAPI from '../services/fetchAPI';
import '../styles/SearchBar.css';

export default function SearchBar() {
  const { setRecipes, recipes, setFilter, filter } = useContext(globalContext);
  const history = useHistory();
  const [valueInput, setValueInput] = useState('');

  function checkURL() {
    const { pathname } = history.location;
    const urlParam = pathname === '/foods' ? 'themealdb' : 'thecocktaildb';
    const ingredientUrl = `https://www.${urlParam}.com/api/json/v1/1/filter.php?i=${valueInput}`;
    const nameUrl = `https://www.${urlParam}.com/api/json/v1/1/search.php?s=${valueInput}`;
    const firstLetter = `https://www.${urlParam}.com/api/json/v1/1/search.php?f=${valueInput}`;

    switch (filter) {
    case 'ingredient':
      return ingredientUrl;
    case 'name':
      return nameUrl;
    case 'firstLetter':
      return valueInput.length > 1
        ? global.alert('Your search must have only 1 (one) character')
        : firstLetter;
    default:
      return false;
    }
  }

  async function handleClick() {
    const { pathname } = history.location;
    const URL = checkURL();
    const result = await fetchAPI(URL).catch(() => []);
    const key = Object.keys(result)[0];

    const check = pathname === '/foods' ? !result.meals : !result.drinks;

    if (check) {
      global.alert('Sorry, we haven\'t found any recipes for these filters.');
      return;
    }

    setRecipes({ ...recipes, [key]: Object.values(result[key]) });
    if (pathname === '/foods' && result.meals.length === 1) {
      history.push(`${pathname}/${result.meals[0].idMeal}`);
    } else if (pathname === '/drinks' && result.drinks.length === 1) {
      history.push(`${pathname}/${result.drinks[0].idDrink}`);
    }
  }

  return (
    <div className="search-container">
      <input
        type="text"
        data-testid="search-input"
        className="search-input"
        onChange={ ({ target }) => setValueInput(target.value) }
        placeholder="Search Recipe"
      />
      <div className="filter-container">
        <label htmlFor="radio-button1" className="radio-label">
          <input
            className="radio-btn"
            name="filter-radio"
            type="radio"
            id="radio-button1"
            value="ingredient"
            onChange={ ({ target }) => setFilter(target.value) }
            data-testid="ingredient-search-radio"
          />
          Ingredient
        </label>

        <label htmlFor="radio-button2" className="radio-label">
          <input
            className="radio-btn"
            name="filter-radio"
            type="radio"
            value="name"
            onChange={ ({ target }) => setFilter(target.value) }
            id="radio-button2"
            data-testid="name-search-radio"
          />
          Name
        </label>
        <label htmlFor="radio-button3" className="radio-label">
          <input
            className="radio-btn"
            name="filter-radio"
            type="radio"
            value="firstLetter"
            onChange={ ({ target }) => setFilter(target.value) }
            id="radio-button3"
            data-testid="first-letter-search-radio"
          />
          First Letter
        </label>
      </div>
      <div className="filter-btn-container">
        <button
          className="filter-btn-search"
          type="button"
          data-testid="exec-search-btn"
          onClick={ handleClick }
        >
          Search
        </button>
      </div>
    </div>
  );
}
