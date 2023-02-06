export default function PopupWithForm(props) {
  return (
    <div
      className={`popup popup_type_${props.name} ${
        props.isOpen && 'popup_opened'
      }`}
    >
      <div className="popup__container">
        <button
          aria-label="Закрыть"
          className="popup__close-button"
          onClick={props.onClose}
        >
          Х
        </button>
        <h2 className="popup__title">{props.title}</h2>
        <form
          className="popup__form"
          name={props.name}
          onSubmit={props.onSubmit}
        >
          {props.children}
          <button className="popup__submit-button" type="submit">
            {props.buttonText}
          </button>
        </form>
      </div>
    </div>
  );
}
