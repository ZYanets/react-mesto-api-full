import React from 'react';
import PopupWithForm from './PopupWithForm';

function AddPlacePopup(props) {
  const [name, setName] = React.useState('');
  const [link, setLink] = React.useState('');
   
  function handleChangeName(e) {
    setName(e.target.value);
  }

  function handleChangeLink(e) {
    setLink(e.target.value);
  }

  function handleSubmit(e) {
    e.preventDefault();
  
    props.onAddPlace({
      name: name,
      link: link,
    })
  }

  React.useEffect(() => {
    setName('');
    setLink('');
  }, [props.isOpen]);

  return (
    <PopupWithForm
      isOpen={props.isOpen}
      name={'add-card'}
      title={'Новое место'}
      onClose={props.onClose}
      textButton={'Создать'}
      onSubmit={handleSubmit}>
      <input
        value={name}
        onChange={handleChangeName}
        className="popup__input popup__input_type_card-name"
        type="text"
        id="card-name"
        name="name"
        placeholder="Название"
        minLength="2"
        maxLength="30"
        required/>
      <span id="card-name-error" className="popup__error"></span>
      <input
        value={link}
        onChange={handleChangeLink}
        className="popup__input popup__input_type_card-link"
        type="url"
        id="card-link"
        name="link"
        placeholder="Ссылка на картинку"
        required/>
      <span id="card-link-error" className="popup__error"></span>
    </PopupWithForm>    
  )
}

export default AddPlacePopup;