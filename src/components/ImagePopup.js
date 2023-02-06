import React from 'react';

export default function ImagePopup({ card, onClose }) {
  return (
    <div className={`popup image-popup ${card && 'popup_opened'}`}>
      <figure className="image-popup__block">
        <button
          aria-label="Закрыть"
          className="popup__close-button"
          onClick={onClose}
        >
          Х
        </button>
        <img
          className="image-popup__img"
          src={card ? card.link : ''}
          alt={card ? card.name : ''}
        />
        <figcaption className="image-popup__caption">
          {card ? card.name : ''}
        </figcaption>
      </figure>
    </div>
  );
}
