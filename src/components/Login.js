export default function Login() {
  return (
    <div className="auth">
      <h2 className="auth__title">Вход</h2>
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
        <button className="auth__button">Войти</button>
      </form>
    </div>
  );
}
