import { useRef } from 'react';
import PopupWithForm from './PopupWithForm';

export default function EditAvatarPopup({ isOpen, onClose, onSubmit }) {
  const avatarRef = useRef();

  function handleSubmit(e) {
    e.preventDefault();

    onSubmit({
      avatar: avatarRef.current.value,
    });
  }

  return (
    <PopupWithForm
      name="avatar"
      title="Обновить аватар"
      buttonText="Сохранить"
      isOpen={isOpen}
      onClose={onClose}
      onSubmit={handleSubmit}
    >
      <input
        autoComplete="off"
        className="popup__input popup__input_type_link"
        id="popup__input_avatar-url"
        name="avatar"
        placeholder="Ссылка на изображение"
        type="url"
        required
        ref={avatarRef}
      />
      <span
        className="popup__input-error"
        id="popup__input_avatar-url-error"
      ></span>
    </PopupWithForm>
  );
}
