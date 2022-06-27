import React from 'react';
import { Route, Switch } from 'react-router-dom';
import './App.css';
import GlobalProvider from './context/globalProvider';
import Details from './pages/Details';
import DoneRecipes from './pages/DoneRecipes';
import Drinks from './pages/Drinks';
import Explore from './pages/Explore';
import ExploreFoodsOrDrinks from './pages/ExploreFoodsOrDrinks';
import FavoriteRecipes from './pages/FavoriteRecipes';
import Food from './pages/Food';
import FoodsByNationality from './pages/FoodsByNationality';
import Login from './pages/Login';
import NotFound from './pages/NotFound';
import Profile from './pages/profile';
import RecipeInProgress from './pages/RecipeInProgress';
import RecipesByIngredients from './pages/RecipesByIngredients';

function App() {
  return (
    <GlobalProvider>
      <Switch>
        <Route exact path="/" component={ Login } />
        <Route exact path="/foods" component={ Food } />
        <Route exact path="/drinks" component={ Drinks } />
        <Route exact path="/explore" component={ Explore } />
        <Route exact path="/explore/:foods" component={ ExploreFoodsOrDrinks } />
        <Route exact path="/explore/:drinks" component={ ExploreFoodsOrDrinks } />
        <Route
          exact
          path="/explore/:category/ingredients"
          component={ RecipesByIngredients }
        />
        <Route
          exact
          path="/explore/foods/nationalities"
          component={ FoodsByNationality }
        />
        <Route
          exact
          path="/explore/foods/nationalities"
          component={ FoodsByNationality }
        />
        <Route exact path="/profile" component={ Profile } />
        <Route exact path="/done-recipes" component={ DoneRecipes } />
        <Route exact path="/favorite-recipes" component={ FavoriteRecipes } />
        <Route exact path="/foods/:id" component={ Details } />
        <Route exact path="/drinks/:id" component={ Details } />
        <Route exact path="/drinks/:id/in-progress" component={ RecipeInProgress } />
        <Route exact path="/foods/:id/in-progress" component={ RecipeInProgress } />
        <Route
          exact
          path="/explore/drinks/nationalities"
          component={ NotFound }
        />
      </Switch>
    </GlobalProvider>
  );
}

export default App;
