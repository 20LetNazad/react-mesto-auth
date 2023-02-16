import { Route, Routes } from 'react-router-dom';
import LinkForHeader from './LinkForHeader';

export default function Header({ loggedIn, userEmail, onSignOut }) {
  return (
    <header className="header">
      <div className="logo"></div>
      {loggedIn ? (
        <LinkForHeader
          link="/sign-in"
          text="Выйти"
          userEmail={userEmail}
          linksClass="header__link header__link_type_leave"
          onSignOut={onSignOut}
        />
      ) : (
        <Routes>
          <Route
            path="/sign-in"
            element={
              <LinkForHeader
                link="/sign-up"
                text="Регистрация"
                linksClass="header__link"
              />
            }
          ></Route>
          <Route
            path="/sign-up"
            element={
              <LinkForHeader
                link={'/sign-in'}
                text="Войти"
                linksClass="header__link"
              />
            }
          ></Route>
        </Routes>
      )}
    </header>
  );
}
