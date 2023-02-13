export default function InfoTooltip({ onClose, title, src }) {
  return (
    <div className="popup popup_type_status popup_opened">
      <div className="popup__container popup__container_type_status">
        <button
          aria-label="Закрыть"
          className="popup__close-button"
          onClick={onClose}
        >
          Х
        </button>
        <img src={src} className="popup__status-img" />
        <h2 className="popup__title popup__title_type_status">{title}</h2>
      </div>
    </div>
  );
}
