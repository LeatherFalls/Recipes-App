import PropTypes from 'prop-types';
import React from 'react';
import '../styles/CardIngredients.css';

export default function CardIngredients({ name, src, i, recom }) {
  const limitTitleCaracters = (title) => {
    const limit = 10;
    if (title.length > limit) {
      return `${title.slice(0, limit)}...`;
    }
    return title;
  };
  return (
    <div
      data-testid={ `${i}-${recom ? 'recomendation-card' : 'recipe-card'}` }
      className="recipe-ingredients"
    >
      <div className="img-ingredient">
        <img
          src={ src }
          alt={ name }
          data-testid={ `${i}-card-img` }
        />
      </div>
      <p
        data-testid={ `${i}-${recom ? 'recomendation-title' : 'card-name'}` }
        className="recipe-name"
      >
        {limitTitleCaracters(name)}
      </p>
      <p className="more-details--ingredients">
        <span>+  </span>
        More Details
      </p>
    </div>
  );
}

CardIngredients.propTypes = {
  name: PropTypes.string.isRequired,
  src: PropTypes.string.isRequired,
  i: PropTypes.number.isRequired,
  recom: PropTypes.bool.isRequired,
};
