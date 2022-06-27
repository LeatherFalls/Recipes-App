import React, { useContext, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import CardRecipe from '../components/CardRecipe';
import Footer from '../components/Footer';
import Header from '../components/Header';
import SearchBar from '../components/SearchBar';
import globalContext from '../context/globalContext';
import useRecipes from '../hooks/useRecipes';
import fetchAPI from '../services/fetchAPI';

export default function FoodsByNationality() {
  const [nationalities, setNationalities] = useState([]);
  const { recipes, showFilter } = useContext(globalContext);
  const { getAllRecipes, getRecipesByNationality } = useRecipes();

  useEffect(() => {
    async function getNationalities() {
      const result = await fetchAPI('https://www.themealdb.com/api/json/v1/1/list.php?a=list');
      setNationalities(result.meals);
      getAllRecipes('themealdb');
    }

    getNationalities();
  }, []);

  async function handleFilter({ target }) {
    const { value } = target;
    if (value === 'All') {
      getAllRecipes('themealdb');
      return;
    }

    getRecipesByNationality(value);
  }

  function renderSelect() {
    return (
      <select
        data-testid="explore-by-nationality-dropdown"
        onChange={ handleFilter }
      >
        <option data-testid="All-option">All</option>
        { nationalities.map((area, i) => (
          <option
            data-testid={ `${area.strArea}-option` }
            key={ i }
          >
            {area.strArea}

          </option>)) }
      </select>
    );
  }

  return (
    <div>
      <Header titleName="Explore Nationalities" filter />
      {showFilter ? <SearchBar /> : renderSelect()}
      { recipes.meals.map((recipe, i) => (
        <Link to={ `/foods/${recipe.idMeal}` } key={ i }>
          <CardRecipe
            i={ i }
            name={ recipe.strMeal }
            src={ recipe.strMealThumb }
            recom={ false }
          />
        </Link>
      )) }
      <Footer />
    </div>
  );
}
