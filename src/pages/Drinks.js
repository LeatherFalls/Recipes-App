import React, { useContext, useEffect } from 'react';
import { Link } from 'react-router-dom';
import CardRecipe from '../components/CardRecipe';
import Footer from '../components/Footer';
import Header from '../components/Header';
import SearchBar from '../components/SearchBar';
import Filters from '../components/Filters';
import globalContext from '../context/globalContext';
import useRecipes from '../hooks/useRecipes';

export default function Drinks() {
  const { recipes, all, showFilter, ingredients } = useContext(globalContext);
  const checkAll = all ? 'Category' : 'Drink';
  const { getAllRecipes } = useRecipes();

  useEffect(() => {
    if (ingredients.length === 0) {
      getAllRecipes('thecocktaildb');
    }
    return () => getAllRecipes('thecocktaildb');
  }, []);

  function renderRecipes(recipe, i) {
    const num = 12;
    if (i >= num) return '';
    return (
      <Link key={ i } to={ `/drinks/${recipe.idDrink}` }>
        <CardRecipe
          src={ recipe[`str${checkAll}Thumb`] }
          i={ i }
          name={ recipe[`str${checkAll}`] }
          recom={ false }
        />
      </Link>
    );
  }

  return (
    <div>
      <Header titleName="Drinks" filter />
      {showFilter ? <SearchBar /> : <Filters />}
      <div className="recipes-container">
        { recipes.drinks && recipes.drinks.map((recipe, i) => renderRecipes(recipe, i)) }
      </div>
      <Footer />
    </div>
  );
}
