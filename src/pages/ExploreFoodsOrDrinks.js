import React from 'react';
import { Link, useHistory, useParams } from 'react-router-dom';
import Footer from '../components/Footer';
import Header from '../components/Header';
import useRecipes from '../hooks/useRecipes';
import '../styles/ExploreFoodsOrDrinks.css';

export default function ExploreDrinks() {
  const params = Object.values(useParams())[0];
  const { getRandomRecipe } = useRecipes();
  const { push } = useHistory();

  const capitalize = (str) => str.charAt(0).toUpperCase() + str.substr(1);

  async function handleRecipe() {
    const key = params === 'foods' ? ['meals', 'idMeal'] : ['drinks', 'idDrink'];
    const recipe = await getRandomRecipe(params);
    push(`/${params}/${recipe[key[0]][0][key[1]]}`);
  }

  return (
    <div>
      <Header titleName={ `Explore ${capitalize(params)}` } filter={ false } />
      <div className="explore-links">
        <Link to={ `/explore/${params}/ingredients` }>
          <button type="button" data-testid="explore-by-ingredient">By Ingredient</button>
        </Link>
        { params === 'foods' && (
          <Link to="/explore/foods/nationalities">
            <button
              type="button"
              data-testid="explore-by-nationality"
            >
              By Nationality
            </button>
          </Link>

        )}
        <button
          type="button"
          data-testid="explore-surprise"
          onClick={ handleRecipe }
        >
          Surprise me!

        </button>
      </div>
      <Footer />
    </div>
  );
}
