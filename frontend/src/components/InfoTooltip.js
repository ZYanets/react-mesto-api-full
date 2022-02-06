import React from 'react';
import success from '../images/success.svg';
import error from '../images/error.svg';

function InfoTooltip(props) {
  return (
    <div className={`popup popup_type_infotooltip ${props.isOpen ? 'popup_opened' : ''}`}> 
      <div className="popup__container popup__container_type_infotooltip">
        <button onClick={props.onClose} className="popup__button-close" type="button"></button>
          <div className="popup__form popup__form_type_infotooltip">
            <img className="popup__image" src={props.isRegistered ? success : error} alt={props.isRegistered ? "Зарегистрировано" : "Ошибка"}/>
            <p className="popup__text">{props.isRegistered ? "Вы успешно зарегистрировались!" : "Что-то пошло не так! Попробуйте ещё раз."}</p>
          </div>
      </div>
    </div>
  )
}

export default InfoTooltip;