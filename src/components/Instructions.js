import React, { useContext } from 'react';
import globalContext from '../context/globalContext';
import '../styles/Instructions.css';

export default function Instructions() {
  const { recipeDetail } = useContext(globalContext);
  return (
    <div className="instructions-container">
      <h3 className="instructions-title">Instructions</h3>
      <p data-testid="instructions" className="instructions-description">
        {recipeDetail.strInstructions}
      </p>
    </div>
  );
}
