import React, { useContext, useEffect, useState } from 'react';
import Carousel from 'react-multi-carousel';
import 'react-multi-carousel/lib/styles.css';
import ReactPlayer from 'react-player/youtube';
import { Link, useHistory, useParams } from 'react-router-dom';
import ButtonStartRecipe from '../components/ButtonStartRecipe';
import CardRecipe from '../components/CardRecipe';
import HeaderRecipe from '../components/HeaderRecipe';
import Ingredients from '../components/Ingredients';
import Instructions from '../components/Instructions';
import globalContext from '../context/globalContext';
import useRecipes from '../hooks/useRecipes';
import '../styles/Details.css';

export default function Details() {
  const { getDetails, getRecomendations } = useRecipes();
  const { recipeDetail, setRecipeDetail } = useContext(globalContext);
  const { location: { pathname } } = useHistory();
  const path = pathname.split('/')[1];
  const [recomendations, setRecomendations] = useState([]);
  const [previewReco, setPreviewReco] = useState(false);

  const { id } = useParams();

  const check = path === 'foods'
    ? ['themealdb', 'Meal', 'foods', 'idDrink', 'drinks']
    : ['thecocktaildb', 'Drink', 'drinks', 'idMeal', 'foods'];

  const idRecipe = `str${path === 'foods' ? 'Drink' : 'Meal'}`;

  useEffect(() => {
    async function fetchRecipe() {
      const result = await getDetails(check[0], id);
      const recomendationsResult = await getRecomendations(check[0]);
      setRecipeDetail(result);
      setRecomendations(recomendationsResult);
    }

    fetchRecipe();
  }, [previewReco]);

  const responsive = {
    superLargeDesktop: {
      breakpoint: { max: 4000, min: 3000 },
      items: 5,
    },
    desktop: {
      breakpoint: { max: 3000, min: 1024 },
      items: 3,
    },
    tablet: {
      breakpoint: { max: 1024, min: 464 },
      items: 2,
    },
    mobile: {
      breakpoint: { max: 360, min: 0 },
      items: 2,
    },
  };

  function renderVideo() {
    return (
      <div data-testid="video">
        <h3 className="details-video">Vídeo</h3>
        <ReactPlayer
          url={ recipeDetail.strYoutube }
          width="100%"
          height="100%"
          controls
        />
      </div>
    );
  }

  return (
    <div>
      <HeaderRecipe />
      <Ingredients />
      <Instructions />
      { pathname.includes('foods') && renderVideo() }
      <h3 className="details-recomendations">Recomendations</h3>
      <Carousel responsive={ responsive } shouldResetAutoplay={ false }>
        { recomendations.map((reco, i) => (
          <Link
            key={ i }
            to={ `/${check[4]}/${reco[check[3]]}` }
            onClick={ () => setPreviewReco(!previewReco) }
          >
            <div>
              <CardRecipe
                src={ reco[`${idRecipe}Thumb`] }
                name={ reco[idRecipe] }
                i={ i }
                recom
              />
            </div>
          </Link>
        ))}
      </Carousel>
      <Link to={ `/${path}/${recipeDetail[`id${check[1]}`]}/in-progress` }>
        <div className="btn-start-recipe-container">
          <ButtonStartRecipe
            textContent="Start Recipe"
            path={ path }
            testid="start-recipe-btn"
          />
        </div>
      </Link>
    </div>
  );
}
