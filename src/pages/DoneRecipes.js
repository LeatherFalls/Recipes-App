import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import ButtonShare from '../components/ButtonShare';
import Footer from '../components/Footer';
import Header from '../components/Header';
import '../styles/DoneRecipes.css';

export default function DoneRecipes() {
  const [doneRecipes, setDoneRecipes] = useState(
    JSON.parse(localStorage.getItem('doneRecipes')),
  );
  if (doneRecipes === null) {
    return (
      <div>
        <Header titleName="Done Recipes" filter={ false } />
        <h1>Você não tem receitas feitas</h1>
      </div>
    );
  }
  const handleClick = (e, type) => {
    switch (type) {
    case 'all':
      setDoneRecipes(JSON.parse(localStorage.getItem('doneRecipes')));
      break;
    case 'food':
      setDoneRecipes(doneRecipes.filter((recipe) => recipe.type === 'food'));
      break;
    case 'drink':
      setDoneRecipes(doneRecipes.filter((recipe) => recipe.type === 'drink'));
      break;
    default:
    }
  };
  return (
    <>
      <Header titleName="Done Recipes" />
      <section className="done-filters">
        <button
          type="button"
          onClick={ (e) => handleClick(e, 'all') }
          data-testid="filter-by-all-btn"
        >
          All

        </button>
        <button
          onClick={ (e) => handleClick(e, 'food') }
          type="button"
          data-testid="filter-by-food-btn"
        >
          Food

        </button>
        <button
          onClick={ (e) => handleClick(e, 'drink') }
          type="button"
          data-testid="filter-by-drink-btn"
        >
          Drinks

        </button>
      </section>
      <section className="done-recipes">
        {doneRecipes.map((recipe, index) => (
          <div key={ index } className="done-image-container">
            <div className="done-image">
              <Link
                to={ recipe.type === 'food'
                  ? `/foods/${recipe.id}` : `/drinks/${recipe.id}` }
              >
                <img
                  src={ recipe.image }
                  alt={ recipe.name }
                  data-testid={ `${index}-horizontal-image` }
                />
              </Link>
            </div>
            <div className="done-information-container">
              <div className="information-content">
                <Link
                  to={ recipe.type === 'foods'
                    ? `/foods/${recipe.id}` : `/drinks/${recipe.id}` }
                >
                  <h3 data-testid={ `${index}-horizontal-name` }>{recipe.name}</h3>
                </Link>
                <h6
                  data-testid={ `${index}-horizontal-top-text` }
                >
                  {recipe.type === 'food'
                    ? `${recipe.nationality} - ${recipe.category}`
                    : `${recipe.alcoholicOrNot} - ${recipe.category}`}

                </h6>
                {recipe.tags.map((tag, i) => (
                  <h6
                    key={ i }
                    data-testid={ `${index}-${tag}-horizontal-tag` }
                  >
                    {tag}

                  </h6>
                ))}
              </div>
              <div className="information-share">
                <ButtonShare
                  link={ `http://localhost:3000/foods/${recipe.id}` }
                  testid={ `${index}-horizontal-share-btn` }
                />
              </div>
            </div>
          </div>
        ))}
      </section>
      <Footer />
    </>
  );
}
