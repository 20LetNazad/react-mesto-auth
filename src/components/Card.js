import React from 'react';
import { useContext } from 'react';
import CurrentUserContext from '../contexts/CurrentUserContext';

export default function Card({ onCardClick, onCardLike, onCardDelete, card }) {
  function handleCardClick() {
    onCardClick(card);
  }

  function handleLikeClick() {
    onCardLike(card);
  }

  function handleDeleteClick() {
    onCardDelete(card);
  }

  const currentUser = useContext(CurrentUserContext);
  const isOwn = card.owner._id === currentUser._id;
  const isLiked = card.likes.some((i) => i._id === currentUser._id);

  const cardLikeButtonClassName = `element__like ${
    isLiked && 'element__like_active'
  }`;

  return (
    <li className="cards__item element">
      {isOwn && (
        <button
          className="element__delete element__delete_visible"
          onClick={handleDeleteClick}
        />
      )}
      <img
        className="element__image"
        src={card.link}
        onClick={handleCardClick}
      />
      <div className="element__info">
        <h2 className="element__title">{card.name}</h2>
        <div className="element__like-block">
          <button
            aria-label="Поставить лайк"
            className={cardLikeButtonClassName}
            onClick={handleLikeClick}
          ></button>
          <p className="element__count">{card.likes.length}</p>
        </div>
      </div>
    </li>
  );
}
