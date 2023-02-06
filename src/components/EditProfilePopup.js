import { useState, useEffect, useContext } from 'react';
import PopupWithForm from './PopupWithForm';
import CurrentUserContext from '../contexts/CurrentUserContext';

export default function EditProfilePopup({ isOpen, onClose, onSubmit }) {
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const currentUser = useContext(CurrentUserContext);

  useEffect(() => {
    setName(currentUser.name);
    setDescription(currentUser.about);
  }, [currentUser, isOpen]);

  function handleSubmit(e) {
    e.preventDefault();

    onSubmit({
      name,
      about: description,
    });
  }

  function handleNameChange(e) {
    setName(e.target.value);
  }

  function handleDescriptionChange(e) {
    setDescription(e.target.value);
  }

  return (
    <PopupWithForm
      name="profile"
      title="Редактировать профиль"
      buttonText="Сохранить"
      isOpen={isOpen}
      onClose={onClose}
      onSubmit={handleSubmit}
    >
      <input
        autoComplete="off"
        className="popup__input popup__input_type_name"
        id="popup__input_name"
        name="name"
        placeholder="Имя"
        type="text"
        minLength="2"
        maxLength="40"
        required
        value={name || ''}
        onChange={handleNameChange}
      />
      <span className="popup__input-error" id="popup__input_name-error"></span>
      <input
        autoComplete="off"
        className="popup__input popup__input_type_description"
        id="popup__input_description"
        name="about"
        placeholder="Описаине"
        type="text"
        minLength="2"
        maxLength="200"
        required
        value={description || ''}
        onChange={handleDescriptionChange}
      />
      <span
        className="popup__input-error"
        id="popup__input_description-error"
      ></span>
    </PopupWithForm>
  );
}
