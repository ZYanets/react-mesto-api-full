import React from 'react';

function Login(props) {
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
  
    props.onLogin({
      email, password
    })
  }

  return (
    <div className="login">
      <h2 className="login__header">
        Вход
      </h2>
      <form onSubmit={handleSubmit} className="login__form">
        <input
          value={email}
          onChange={handleChangeEmail}
          className="login__input login__input_type_email"
          type="email"
          id="email"
          name="email"
          placeholder="Email"
          required
        />
        <span id="email-error" className="login__error"></span>
        <input
          value={password}
          onChange={handleChangePassword}
          className="login__input login__input_type_password"
          type="password"
          id="password"
          name="password"
          placeholder="Пароль"
          minLength="6"
          maxLength="20"
          required/>
        <span id="password-error" className="login__error"></span>
        <button className="button login__button" type="submit">Войти</button>
      </form>
    </div> 
  )
}

export default Login;