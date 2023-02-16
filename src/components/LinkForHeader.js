import { Link } from 'react-router-dom';

export default function LinkForHeader({
  link,
  text,
  linksClass,
  onSignOut,
  userEmail,
}) {
  return (
    <>
      <div className="header__container">
        <p className="header__email">{userEmail}</p>
        <Link to={link} className={linksClass} onClick={onSignOut}>
          {text}
        </Link>
      </div>
    </>
  );
}
