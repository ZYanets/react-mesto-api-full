import React from 'react';

function PopupWithForm(props) {
  React.useEffect(() => {
    if (!props.isOpen) return;

    function handleEsc(event) {
      if (event.key === 'Escape') {
        props.onClose()
      }
    }

    document.addEventListener("keydown", handleEsc)

    return () => {
      document.removeEventListener("keydown", handleEsc)
    }
  });

  React.useEffect(() => {
    if (!props.isOpen) return;

    function handleOverlay(event) {
      if (event.target.classList.contains('popup_opened')) {
        props.onClose()
      }
    }

    document.addEventListener("click", handleOverlay)
    
    return () => {
      document.removeEventListener("click", handleOverlay)
    }
  });
  
  return (
    <div className={`popup popup_type_${props.name} ${props.isOpen ? 'popup_opened' : ''}`}> 
      <div className={`popup__container popup__container_type_form popup__container_type_${props.name}`}>
        <button onClick={props.onClose} className="popup__button-close" type="button"></button>
          <form className={`popup__form popup__form_type_${props.name}`} name={`${props.name}`} onSubmit={props.onSubmit}>
            <h2 className="popup__header">{props.title}</h2>
            {props.children}
            <button className={`button popup__button popup__button_type_${props.name}`} type="submit">{props.textButton}</button>
        </form>
      </div>
    </div>
  )
}

export default PopupWithForm;