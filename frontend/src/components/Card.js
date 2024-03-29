import React from 'react';
import {CurrentUserContext} from '../contexts/CurrentUserContext';

function Card(props) {
  const currentUser = React.useContext(CurrentUserContext);
  const isOwn = props.card.owner === currentUser._id;

  const isLiked = props.card.likes.some(i => i === currentUser._id);
  const cardLikeButtonClassName = (
    `element__button-like ${isLiked ? 'element__button-like_active' : ''}`
  )

  function handleClick() {
    props.onCardClick(props.card);
  }

  function handleLikeClick() {
    props.onCardLike(props.card);
  }

  function handleDeleteClick() {
    props.onCardDelete(props.card);
  }

  return(
    <article className="element">
      <img className="element__image" src={props.card.link} alt={props.card.name} onClick={handleClick}/>
      {isOwn && (
        <button className='element__button-delete' type="button" onClick={handleDeleteClick}></button>
      )}
      <div className="element__info">
        <h2 className="element__title">{props.card.name}</h2>
        <div className="element__like">
          <button className={cardLikeButtonClassName} type="button" onClick={handleLikeClick}></button>
          <p className="element__like-count">{props.card.likes.length}</p>
        </div>
      </div>
    </article>
  )   
}

export default Card;