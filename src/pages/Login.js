import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser } from '@fortawesome/free-regular-svg-icons';
import { faKey } from '@fortawesome/free-solid-svg-icons';
import burger from '../img/burger.svg';
import '../styles/Login.css';

export default function Login({ history }) {
  const [stateEmail, setStateEmail] = useState('');
  const [statePassword, setStatePassword] = useState('');
  const [isDisable, setIsDisable] = useState(true);

  const loginValidation = () => {
    const SEIS = 6;
    if (statePassword.length >= SEIS
      && stateEmail.includes('@')
      && stateEmail.includes('.com')) {
      return setIsDisable(false);
    } return setIsDisable(true);
  };

  const handleChange = ({ target: { value, name } }) => {
    if (name === 'email') setStateEmail(value);
    if (name === 'password') setStatePassword(value);
    loginValidation();
  };

  const handleCLick = (e) => {
    e.preventDefault();
    localStorage.setItem('mealsToken', 1);
    localStorage.setItem('cocktailsToken', 1);
    localStorage.setItem('user', JSON.stringify({ email: stateEmail }));
    history.push('/foods');
  };

  return (
    <div className="login-container">
      <img src={ burger } alt="Logo" className="login-image" />
      <p className="login-text">
        <span>SING IN</span>
        <span>TO CONTINUE</span>
      </p>
      <div className="login-form">
        <div className="textfield">
          <label htmlFor="email-input">
            <FontAwesomeIcon icon={ faUser } className="login-icon" />
            Email
            <input
              placeholder="Digite seu email"
              className="email-input"
              data-testid="email-input"
              type="email"
              onChange={ handleChange }
              value={ stateEmail }
              name="email"
            />
          </label>
        </div>
        <div className="textfield">
          <label htmlFor="password-input">
            <FontAwesomeIcon icon={ faKey } className="login-icon" />
            Senha
            <input
              placeholder="Digite sua senha"
              className="password-input"
              data-testid="password-input"
              type="password"
              onChange={ handleChange }
              value={ statePassword }
              name="password"
            />
          </label>
        </div>
        <button
          className="login-btn"
          type="submit"
          data-testid="login-submit-btn"
          disabled={ isDisable }
          onClick={ handleCLick }
        >
          Enter
        </button>
      </div>
    </div>
  );
}

Login.propTypes = {
  history: PropTypes.shape({
    push: PropTypes.func,
  }).isRequired,
};
