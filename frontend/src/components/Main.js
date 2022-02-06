import React from 'react';
import Card from './Card';
import {CurrentUserContext} from '../contexts/CurrentUserContext';

function Main(props) {
  const currentUser = React.useContext(CurrentUserContext);
  
  return (
    <main className="main">
      <section className="profile">
        <div className="profile__avatar">
          <img className="profile__avatar-image" src={currentUser.avatar} alt="Аватар пользователя" />
          <button onClick={props.onEditAvatar} className="profile__avatar-edit" type="button"></button>
        </div>
        <div className="profile__info">
          <h1 className="profile__username" name="name">{currentUser.name}</h1>
          <button onClick={props.onEditProfile} className="profile__button-edit" type="button"></button>
          <p className="profile__about" name="about">{currentUser.about}</p>
        </div>
        <button onClick={props.onAddPlace} className="profile__button-add" type="button"></button>
      </section>
      <section className="elements">
        {props.cards.map((card) => (
          <Card
            card={card}
            key={card._id}
            onCardClick={props.onCardClick}
            onCardLike={props.onCardLike}
            onCardDelete={props.onCardDelete}/>
        ))}   
      </section>
    </main>
  );
}

export default Main;