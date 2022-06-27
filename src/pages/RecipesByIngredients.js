import React, { useContext, useEffect } from 'react';
import { useHistory, useParams } from 'react-router-dom';
import CardRecipe from '../components/CardRecipe';
import Footer from '../components/Footer';
import Header from '../components/Header';
import globalContext from '../context/globalContext';
import useRecipes from '../hooks/useRecipes';
import fetchAPI from '../services/fetchAPI';

export default function FoodsByIngredients() {
  const { ingredients, recipes, setRecipes } = useContext(globalContext);
  const { push } = useHistory();
  const { getIngredients } = useRecipes();
  const params = useParams();
  const key = params.category === 'foods'
    ? ['themealdb', 'meals']
    : ['thecocktaildb', 'drinks'];

  useEffect(() => {
    getIngredients(key[0]);
  }, []);

  async function setRecipesByIngredients(ingredient) {
    const URL = `https://www.${key[0]}.com/api/json/v1/1/filter.php?i=${ingredient}`;
    const result = await fetchAPI(URL).catch(() => []);

    setRecipes({ ...recipes, [key[1]]: Object.values(result[key[1]]) });
    push(`/${params.category}`);
  }
  // req 75 a 77
  return (
    <div>
      <Header titleName="Explore Ingredients" filter={ false } />
      <div className="recipes-container">
        { ingredients && ingredients.map((ingredient, i) => (
          <button
            type="button"
            key={ i }
            data-testid={ `${i}-ingredient-card` }
            onClick={ () => setRecipesByIngredients(ingredient) }
          >
            <CardRecipe
              src={ `https://www.${key[0]}.com/images/ingredients/${ingredient}-Small.png` }
              i={ i }
              name={ ingredient }
              recom={ false }
              testid={ `${i}-ingredient-card` }
            />
          </button>
        ))}
      </div>
      <Footer />
    </div>
  );
}
