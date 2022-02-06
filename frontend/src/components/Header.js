import React from 'react';
import headerLogo from '../images/header-logo.svg';
import { Switch, Route, Link } from 'react-router-dom';


function Header(props) {
  return (
    <header className="header">
      <img className="header__logo" src={headerLogo} alt="Mesto Russia" />
      <Switch>
        <Route exact path="/">
          <div className="header__container">
            <p className="header__email">{props.email}</p>
            <Link to="/sign-in" className="header__link header__link_type_signin" onClick={props.onSignOut}>
              Выйти
            </Link>
          </div>
        </Route>
        <Route path="/sign-up">
          <div className="header__container">
            <Link to="/sign-in" className="header__link">
              Войти
            </Link>
          </div>
        </Route>
        <Route path="/sign-in">
          <div className="header__container">
            <Link to="/sign-up" className="header__link">
              Регистрация
            </Link>
          </div>
        </Route>
      </Switch>
    </header>
  );
}

export default Header;