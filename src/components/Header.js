import PropTypes from 'prop-types';
import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import globalContext from '../context/globalContext';
import profileIcon from '../images/profileIcon.svg';
import searchIcon from '../images/searchIcon.svg';
import '../styles/Header.css';

export default function Header(props) {
  const { titleName, filter } = props;
  const { showFilter, setShowFilter } = useContext(globalContext);

  return (
    <div>
      <header className="header-icons">
        <h2
          data-testid="page-title"
          className="screen-name"
        >
          {titleName}
        </h2>
        <div className="profile-search">
          <Link to="/profile">
            <img src={ profileIcon } alt="Logo-profile" data-testid="profile-top-btn" />
          </Link>
          { filter && (
            <button
              type="button"
              onClick={ () => setShowFilter(!showFilter) }
              className="header-search"
            >
              <img src={ searchIcon } alt="Logo-search" data-testid="search-top-btn" />
            </button>)}
        </div>
      </header>
    </div>
  );
}
Header.propTypes = {
  titleName: PropTypes.string.isRequired,
  filter: PropTypes.bool.isRequired,
};
