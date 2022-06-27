import React, { useContext, useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import globalContext from '../context/globalContext';
import useRecipes from '../hooks/useRecipes';
import '../styles/Filters.css';

export default function Filters() {
  const { location: { pathname } } = useHistory();
  const { getAllRecipes, getCategory, getFilter } = useRecipes();
  const { filter, setFilter } = useContext(globalContext);

  const [categories, setCategories] = useState([]);
  const checkPath = pathname === '/foods'
    ? { key: 'meals', urlParam: 'themealdb' }
    : { key: 'drinks', urlParam: 'thecocktaildb' };

  useEffect(() => {
    async function fetchCategories() {
      const result = await getCategory(checkPath.urlParam);
      setCategories(...Object.values(result));
    }

    fetchCategories();
  }, []);

  async function handleFilter({ target }) {
    const { value } = target;
    setFilter(value);

    if (filter === value) {
      setFilter('');
      getAllRecipes(checkPath.urlParam);
      return;
    }

    getFilter(checkPath.urlParam, value, checkPath.key);
  }

  return (
    <div className="buttons-filter-container">
      <p className="categories">Categories</p>
      <div className="categories-inputs">
        <input
          type="button"
          data-testid="All-category-filter"
          value="All"
          onClick={ () => getAllRecipes(checkPath.urlParam) }
        />
        { categories.map((category, i) => {
          const num = 5;

          return i < num ? <input
            key={ i }
            data-testid={ `${category.strCategory}-category-filter` }
            type="button"
            value={ category.strCategory }
            onClick={ handleFilter }
          />
            : null;
        }) }
      </div>
    </div>
  );
}
