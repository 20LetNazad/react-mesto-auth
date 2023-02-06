import React from 'react';
import { useContext } from 'react';
import Card from './Card';
import CurrentUserContext from '../contexts/CurrentUserContext';

export default function Main({
  onEditAvatar,
  onEditProfile,
  onAddPlace,
  onCardClick,
  onCardLike,
  onCardDelete,
  cards,
}) {
  const currentUser = useContext(CurrentUserContext);

  return (
    <main>
      <section className="profile">
        <div className="profile__content">
          <div className="profile__button" onClick={onEditAvatar}></div>
          <img
            className="profile__avatar"
            alt="Аватар пользователя"
            src={currentUser.avatar}
          />
          <div className="profile__info">
            <div className="profile__edit">
              <h1 className="profile__nickmane">{currentUser.name}</h1>
              <button
                aria-label="Редактировать профиль"
                className="profile__edit-button"
                onClick={onEditProfile}
              ></button>
            </div>
            <p className="profile__description">{currentUser.about}</p>
          </div>
        </div>
        <button
          aria-label="Добавить изображение"
          className="add-button"
          onClick={onAddPlace}
        ></button>
      </section>
      <section className="cards">
        <ul className="elements">
          {cards.map((cardData) => (
            <Card
              key={cardData._id}
              card={cardData}
              onCardClick={onCardClick}
              onCardLike={onCardLike}
              onCardDelete={onCardDelete}
            />
          ))}
        </ul>
      </section>
    </main>
  );
}
