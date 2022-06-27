import { useContext } from 'react';
import globalContext from '../context/globalContext';
import fetchAPI from '../services/fetchAPI';

export default function useRecipes() {
  const { recipes, setRecipes, setIngredients } = useContext(globalContext);

  async function getAllRecipes(param) {
    const key = param === 'thecocktaildb' ? 'drinks' : 'meals';
    const URL = `https://www.${param}.com/api/json/v1/1/search.php?s=`;
    const result = await fetchAPI(URL);
    const num = 12;
    const newRecipes = Object.values(result[key]).filter((recipe, i) => i < num);

    setRecipes({ ...recipes, [key]: newRecipes });
  }

  async function getIngredients(param) {
    const key = param === 'thecocktaildb'
      ? ['drinks', 'strIngredient1'] : ['meals', 'strIngredient'];
    console.log(key);
    const URL = `https://www.${param}.com/api/json/v1/1/list.php?i=list`;
    const result = await fetchAPI(URL);
    const num = 12;
    const ingredients = Object.values(result[key[0]]).filter((recipe, i) => i < num)
      .map((ingredient) => ingredient[key[1]]);

    setIngredients(ingredients);
  }

  async function getCategory(param) {
    const URL = `https://www.${param}.com/api/json/v1/1/list.php?c=list`;
    const result = await fetchAPI(URL);
    return result;
  }

  async function getFilter(param, value, key) {
    const URL = `https://www.${param}.com/api/json/v1/1/filter.php?c=${value}`;
    const result = await fetchAPI(URL);
    const num = 12;
    const recipesFilter = result[key].filter((recipe, i) => i < num);

    setRecipes({ ...recipes, [key]: recipesFilter });
  }

  async function getRecipesByNationality(param) {
    const result = await fetchAPI(`https://www.themealdb.com/api/json/v1/1/filter.php?a=${param}`);
    const num = 12;
    const recipesFilter = result.meals.filter((recipe, i) => i < num);
    setRecipes({ ...recipes, meals: recipesFilter });
  }

  async function getDetails(urlParam, id) {
    const URL = `https://www.${urlParam}.com/api/json/v1/1/lookup.php?i=${id}`;
    const result = await fetchAPI(URL);
    return Object.values(result)[0][0];
  }

  async function getRecomendations(param) {
    const checkParam = param === 'thecocktaildb' ? 'themealdb' : 'thecocktaildb';
    const URL = `https://www.${checkParam}.com/api/json/v1/1/search.php?s=`;
    const result = await fetchAPI(URL);
    const num = 6;
    const recomendations = Object.values(result)[0].filter((recomendation, i) => i < num);
    return recomendations;
  }

  async function getRandomRecipe(param) {
    const urlParam = param === 'foods' ? 'themealdb' : 'thecocktaildb';
    const URL = `https://www.${urlParam}.com/api/json/v1/1/random.php`;
    const recipe = await fetchAPI(URL);
    return recipe;
  }

  return {
    getAllRecipes,
    getRandomRecipe,
    getCategory,
    getFilter,
    getDetails,
    getRecomendations,
    getRecipesByNationality,
    getIngredients,
  };
}
