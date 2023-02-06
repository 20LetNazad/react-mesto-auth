import React from 'react';
import { useState, useEffect } from 'react';
import PopupWithForm from './PopupWithForm';

export default function AddPlacePopup({ isOpen, onClose, onSubmit }) {
  const [name, setName] = useState('');
  const [link, setLink] = useState('');

  useEffect(() => {
    if (isOpen) {
      setName('');
      setLink('');
    }
  }, [isOpen]);

  function handleSubmit(e) {
    e.preventDefault();

    onSubmit({
      name,
      link,
    });
  }

  function handleCardNameChange(e) {
    setName(e.target.value);
  }

  function handleLinkChange(e) {
    setLink(e.target.value);
  }

  return (
    <PopupWithForm
      name="card"
      title="Новое место"
      buttonText="Создать"
      isOpen={isOpen}
      onClose={onClose}
      onSubmit={handleSubmit}
    >
      <input
        autoComplete="off"
        className="popup__input popup__input_type_image-name"
        id="popup__input_place-name"
        name="cardName"
        placeholder="Название"
        type="text"
        minLength="2"
        maxLength="30"
        required
        onChange={handleCardNameChange}
        value={name || ''}
      />
      <span
        className="popup__input-error"
        id="popup__input_place-name-error"
      ></span>
      <input
        autoComplete="off"
        className="popup__input popup__input_type_link"
        id="popup__input_url"
        name="link"
        placeholder="Ссылка на картинку"
        type="url"
        required
        onChange={handleLinkChange}
        value={link || ''}
      />
      <span className="popup__input-error" id="popup__input_url-error"></span>
    </PopupWithForm>
  );
}
