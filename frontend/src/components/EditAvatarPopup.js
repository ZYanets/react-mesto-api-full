import React from 'react';
import PopupWithForm from './PopupWithForm';

function EditAvatarPopup(props) {
  const avatarRef = React.useRef();
  
  function handleSubmit(e) {
    e.preventDefault();
  
    props.onUpdateAvatar({
      avatar: avatarRef.current.value
    });
  } 

  React.useEffect(() => {
    avatarRef.current.value='';
  }, [props.isOpen]);

  return (
    <PopupWithForm
      isOpen={props.isOpen}
      name={'avatar'}
      title={'Обновить аватар'}
      onClose={props.onClose}
      textButton={'Сохранить'}
      onSubmit={handleSubmit}>
      <input
        ref={avatarRef}
        className="popup__input popup__input_type_avatar-link"
        type="url"
        id="avatar"
        name="avatar"
        placeholder="https://somewebsite.com/someimage.jpg"
        required/>
      <span id="avatar-error" className="popup__error"></span>
    </PopupWithForm>
  );
}

export default EditAvatarPopup;