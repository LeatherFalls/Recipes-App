import { getRecipeProgress, setRecipeProgress } from './localStorage';

export const handleCheck = (type, ingredients, id) => {
  const $li = document.querySelectorAll('.ingredient-item');
  const $checkbox = document.querySelectorAll('.ingredient-checkbox');
  const selectedItem = 'selected-item';
  const storage = getRecipeProgress();
  $li.forEach((element, index) => {
    let ingredientsArray = [...ingredients];

    if ($checkbox[index].checked) {
      ingredientsArray = storage[type][id]
        ? [...storage[type][id], index]
        : [index];
    }
    const currentItem = storage[type].length
      ? {
        ...storage,
        [type]: {
          [id]: ingredientsArray,
        },
      }
      : {
        ...storage,
        [type]: {
          ...storage[type],
          [id]: ingredientsArray,
        },
      };
    console.log(currentItem);
    if ($checkbox[index].checked) {
      element.classList.add(selectedItem);
      setRecipeProgress(currentItem);
    } else {
      element.classList.remove(selectedItem);
    }
  });
};

export const loadProgress = () => {
  const storage = getRecipeProgress()[type][id];
  const li = document.querySelectorAll('.ingredient-item');
  const selectedItem = 'selected-item';
  for (let i = 0; i < li.length; i += 1) {
    if (storage && storage.includes(i)) {
      li[i].childNodes[0].checked = true;
    } else {
      li[i].childNodes[0].checked = false;
    }
    if (li[i].childNodes[0].checked) {
      li[i].classList.add(selectedItem);
    } else {
      li[i].classList.remove(selectedItem);
    }
  }
};
