import React, { useState } from 'react';

export default function Login({ onLogin }) {
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

    onLogin(userData);
  }

  return (
    <div className="auth">
      <h2 className="auth__title">Вход</h2>
      <form className="auth__form" onSubmit={handleSubmit}>
        <input
          className="auth__input auth__input_type_email"
          autoComplete="off"
          placeholder="Email"
          required
          name="email"
          type={'email'}
          onChange={handleChange}
        />
        <input
          className="auth__input auth__input_type_password"
          autoComplete="off"
          placeholder="Пароль"
          required
          name="password"
          type={'password'}
          onChange={handleChange}
        />
        <button className="auth__button">Войти</button>
      </form>
    </div>
  );
}
