import PropTypes from 'prop-types';
import React, { useState } from 'react';
import shareIcon from '../images/shareIcon.svg';

export default function ButtonShare({ link, testid }) {
  const [alert, setAlert] = useState();

  function handleCopy() {
    navigator.clipboard.writeText(link);
    setAlert(true);
    const interval = 2000;

    setTimeout(() => {
      setAlert(false);
    }, interval);
  }

  function renderButtonShare() {
    return (
      <button
        type="button"
        onClick={ () => handleCopy() }
        className="share-button"
      >
        <img src={ shareIcon } alt="share icon" data-testid={ testid } />

      </button>
    );
  }

  return (
    alert ? <p>Link copied!</p> : renderButtonShare()
  );
}

ButtonShare.propTypes = {
  link: PropTypes.string.isRequired,
  testid: PropTypes.string.isRequired,
};
