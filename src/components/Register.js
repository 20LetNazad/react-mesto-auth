import { Link } from 'react-router-dom';

export default function Register() {
  return (
    <div className="auth">
      <h2 className="auth__title">Регистрация</h2>
      <form className="auth__form">
        <input
          className="auth__input auth__input_type_email"
          autoComplete="off"
          placeholder="Email"
          type={'email'}
        />
        <input
          className="auth__input auth__input_type_password"
          autoComplete="off"
          placeholder="Пароль"
          type={'password'}
        />
        <button className="auth__button">Зарегистрироваться</button>
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
