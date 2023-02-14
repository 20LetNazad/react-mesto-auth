import React, { useState } from 'react';
import { Link } from 'react-router-dom';

export default function Register({ onRegister }) {
  const [userData, setUserData] = useState({
    email: '',
    password: '',
  });

  function handleChange(e) {
    const { name, value } = e.target;
    setUserData({
      ...userData,
      [name]: value,
    });
  }

  function handleSubmit(e) {
    e.preventDefault();

    if (!userData.email || !userData.password) {
      return;
    }

    onRegister(userData);
  }

  return (
    <div className="auth">
      <h2 className="auth__title">Регистрация</h2>
      <form className="auth__form" onSubmit={handleSubmit}>
        <input
          className="auth__input auth__input_type_email"
          name="email"
          autoComplete="off"
          placeholder="Email"
          type="email"
          required
          value={userData.email || ''}
          onChange={handleChange}
        />
        <input
          className="auth__input auth__input_type_password"
          autoComplete="off"
          name="password"
          placeholder="Пароль"
          type="password"
          required
          value={userData.password || ''}
          onChange={handleChange}
        />
        <button className="auth__button" type="submit">
          Зарегистрироваться
        </button>
      </form>
      <p className="auth__subtitle">
        Уже зарегистрированы?
        <Link to={'/sign-in'} className="auth__link">
          Войти
        </Link>
      </p>
    </div>
  );
}
