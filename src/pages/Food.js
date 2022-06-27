import React, { useContext, useEffect } from 'react';
import { Link } from 'react-router-dom';
import CardRecipe from '../components/CardRecipe';
import Filters from '../components/Filters';
import Footer from '../components/Footer';
import Header from '../components/Header';
import SearchBar from '../components/SearchBar';
import globalContext from '../context/globalContext';
import useRecipes from '../hooks/useRecipes';

export default function Food() {
  const { recipes, all, showFilter, ingredients } = useContext(globalContext);
  const { getAllRecipes } = useRecipes();

  useEffect(() => {
    if (ingredients.length === 0) {
      getAllRecipes('themealdb');
    }
    return () => getAllRecipes('themealdb');
  }, []);

  const checkAll = all ? 'Category' : 'Meal';

  return (
    <div className="pages-footer">
      <Header titleName="Foods" filter />
      {showFilter ? <SearchBar /> : <Filters />}
      <div className="recipes-container">
        { recipes.meals && recipes.meals.map((recipe, i) => (
          <Link key={ i } to={ `/foods/${recipe.idMeal}` }>
            <CardRecipe
              src={ recipe[`str${checkAll}Thumb`] }
              i={ i }
              name={ recipe[`str${checkAll}`] }
              recom={ false }
            />
          </Link>
        ))}
      </div>
      <Footer />
    </div>
  );
}
