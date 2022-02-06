import React from 'react';

function ImagePopup(props) {
  React.useEffect(() => {
    if (!props.card) return;

    function handleEsc(event) {
      if (event.key === 'Escape') {
        props.onClose()
      }
    };

    function handleOverlay(event) {
      if (event.target.classList.contains('popup_opened')) {
        props.onClose()
      }
    };

    document.addEventListener("click", handleOverlay); 
    document.addEventListener("keydown", handleEsc)

    return () => {
      document.removeEventListener("keydown", handleEsc);
      document.removeEventListener("click", handleOverlay)
    }
  });
  
  return (
    <div className={`popup popup_type_view-card ${props.card.link ? 'popup_opened' : ''}`}>
      <div className="popup__container popup__container_type_view-card">
          <button className="popup__button-close popup__button-close_type_view-card" type="button" onClick={props.onClose}></button>
          <img className="popup__view-card-photo" src={props.card.link} alt={props.card.name}/>
          <p className="popup__view-card-caption">{props.card.name}</p>
      </div>
    </div>
  );
}

export default ImagePopup;