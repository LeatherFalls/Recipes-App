import React, { useContext, useEffect } from 'react';
import { useHistory, useParams } from 'react-router-dom';
import ButtonStartRecipe from '../components/ButtonStartRecipe';
import HeaderRecipe from '../components/HeaderRecipe';
import Ingredients from '../components/Ingredients';
import Instructions from '../components/Instructions';
import globalContext from '../context/globalContext';
import useRecipes from '../hooks/useRecipes';
import '../styles/RecipesInProgress.css';

export default function RecipeInProgress() {
  const { getDetails } = useRecipes();
  const { setRecipeDetail } = useContext(globalContext);
  const { location: { pathname } } = useHistory();
  const path = pathname.split('/')[1];
  const { id } = useParams();

  const check = path === 'foods' ? 'themealdb' : 'thecocktaildb';

  useEffect(() => {
    async function fetchRecipe() {
      const result = await getDetails(check, id);
      setRecipeDetail(result);
    }

    fetchRecipe();
  }, []);

  return (
    <div className="btn-start-recipe-container">
      <HeaderRecipe />
      <ButtonStartRecipe
        textContent="Finish Recipe"
        path={ path }
        testid="finish-recipe-btn"
        finish
      />
      <Ingredients inProgress />
      <Instructions />
    </div>
  );
}
