export function getRecipeProgress() {
  return JSON.parse(localStorage.getItem('inProgressRecipes'));
}

export function setRecipeProgress(value) {
  return localStorage.setItem('inProgressRecipes', JSON.stringify(value));
}

export function getDoneRecipes() {
  return JSON.parse(localStorage.getItem('doneRecipes'));
}

export function setDoneRecipes(value) {
  return localStorage.setItem('doneRecipes', JSON.stringify(value));
}
