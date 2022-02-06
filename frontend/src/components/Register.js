import React from 'react';
import { Link } from 'react-router-dom';

function Register(props) {
  const [email, setEmail] = React.useState('');
  const [password, setPassword] = React.useState('');
  
  function handleChangeEmail(e) {
    setEmail(e.target.value);
  }

  function handleChangePassword(e) {
    setPassword(e.target.value);
  }

  function handleSubmit(e) {
    e.preventDefault();
  
    props.onRegister({
      email, password
    })
  }

  return (
    <div className="register">
      <h2 className="register__header">
        Регистрация
      </h2>
      <form onSubmit={handleSubmit} className="register__form">
        <input
          value={email}
          onChange={handleChangeEmail}
          className="register__input register__input_type_email"
          type="email"
          id="email"
          name="email"
          placeholder="Email"
          required
        />
        <span id="email-error" className="register__error"></span>
        <input
          value={password}
          onChange={handleChangePassword}
          className="register__input register__input_type_password"
          type="password"
          id="password"
          name="password"
          placeholder="Пароль"
          minLength="6"
          maxLength="20"
          required/>
        <span id="password-error" className="register__error"></span>
        <button className="button register__button" type="submit">Зарегистрироваться</button>
        <p className="register__text">Уже зарегистрированы?
          <Link to="/sign-in" className="register__link"> Войти</Link>
        </p>
      </form>
      
    </div> 
  )
}

export default Register;