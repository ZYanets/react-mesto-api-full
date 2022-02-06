import React from 'react';
import PopupWithForm from './PopupWithForm';
import {CurrentUserContext} from '../contexts/CurrentUserContext';

function EditProfilePopup(props) {
  const [name, setName] = React.useState('');
  const [description, setDescription] = React.useState('');
  const currentUser = React.useContext(CurrentUserContext);

  React.useEffect(() => {
    setName(currentUser.name);
    setDescription(currentUser.about);
  }, [currentUser, props.isOpen]); 

  function handleChangeName(e) {
    setName(e.target.value);
  }

  function handleChangeDescription(e) {
    setDescription(e.target.value);
  }

  function handleSubmit(e) {
    e.preventDefault();
  
    props.onUpdateUser({
      name: name,
      about: description,
    });
  }

  return (
    <PopupWithForm
      isOpen={props.isOpen}
      name={'edit-profile'}
      title={'Редактировать профиль'}
      onClose={props.onClose}
      textButton={'Сохранить'}
      onSubmit={handleSubmit}>
      <input
        value={name}
        onChange={handleChangeName}
        className="popup__input popup__input_type_username"
        type="text"
        id="profile-name"
        name="name"
        placeholder="Имя"
        minLength="2"
        maxLength="40"
        required/>
      <span id="profile-name-error" className="popup__error"></span>
      <input
        value={description}
        onChange={handleChangeDescription}
        className="popup__input popup__input_type_about"
        type="text"
        id="profile-about"
        name="about"
        placeholder="О себе"
        minLength="2"
        maxLength="200"
        required/>
      <span id="profile-about-error" className="popup__error"></span>    
    </PopupWithForm>  
  );
}

export default EditProfilePopup;