import React from 'react';
import Header from './Header';
import Main from './Main';
import Footer from './Footer';
import ImagePopup from './ImagePopup';
import {api} from '../utils/Api';
import {CurrentUserContext} from '../contexts/CurrentUserContext';
import EditProfilePopup from './EditProfilePopup';
import EditAvatarPopup from './EditAvatarPopup';
import AddPlacePopup from './AddPlacePopup';
import { Route, Switch, useHistory } from 'react-router-dom';
import Login from './Login';
import Register from './Register';
import ProtectedRoute from './ProtectedRoute';
import InfoTooltip from './InfoTooltip';
import * as auth from '../utils/auth.js';

function App() {
  const [isEditProfilePopupOpen, setIsEditProfilePopupOpen] = React.useState(false);
  const [isAddPlacePopupOpen, setIsAddPlacePopupOpen] = React.useState(false);
  const [isEditAvatarPopupOpen, setIsEditAvatarPopupOpen] = React.useState(false);
  const [isInfoTooltipOpen, setIsInfoTooltipOpen] = React.useState(false);

  const [selectedCard, setSelectedCard] = React.useState({name: '', link: ''});
  const [currentUser, setCurrentUser] = React.useState({name: '', about: '', avatar: '', _id: ''});
  const [userEmail, setUserEmail] = React.useState('');
  const [cards, setCards] = React.useState([]);

  const [isRegistered, setIsRegistered] = React.useState(false);
  const [isLoggedIn, setIsLoggedIn] = React.useState(false);

  const history = useHistory();
 
  function handleEditProfileClick() {
    setIsEditProfilePopupOpen(true);
  }
  
  function handleAddPlaceClick() {
    setIsAddPlacePopupOpen(true);
  }

  function handleEditAvatarClick() {
    setIsEditAvatarPopupOpen(true);
  }

  function handleInfoTooltip() {
    setIsInfoTooltipOpen(true);
  }

  function handleCardClick(card) {
    setSelectedCard(card);
  }

  function closeAllPopups() {
    setIsEditProfilePopupOpen(false);
    setIsAddPlacePopupOpen(false);
    setIsEditAvatarPopupOpen(false);
    setIsInfoTooltipOpen(false);
    setSelectedCard({name: '', link: ''});
  }

  function handleRegister({password, email}) {
    auth.register(password, email)
    .then(() => {
      setIsRegistered(true);
      history.push('/sign-in')
    })
    .catch(err => {
      console.log(`Ошибка при регистрации: ${err}`);
      setIsRegistered(false);
    })
    .finally(() => {
      handleInfoTooltip()
    })
  }

  function handleLogin({password, email}) {
    auth.authorize(password, email)
    .then((data) => {
      if (data.token) {
      setIsLoggedIn(true);
      setUserEmail(email);
      history.push('/')
      }
    })
    .catch(err => console.log(`Ошибка при входе: ${err}`))
  }

  function handleSignOut() {
    localStorage.removeItem('jwt');
    setIsLoggedIn(false);
    history.push('/login');
  }

  function handleUpdateUser(data) {
    api.setUserInfo(data)
    .then((userData) => {
      setCurrentUser({name: userData.name, about: userData.about, avatar: userData.avatar});
    })
    .then(() => closeAllPopups())
    .catch(err => console.log(`Ошибка при обновлении данных пользователя: ${err}`))
  }

  function handleUpdateAvatar(data) {
    api.setUserAvatar(data)
    .then((userData) => {
      setCurrentUser({name: userData.name, about: userData.about, avatar: userData.avatar});
    })
    .then(() => closeAllPopups())
    .catch(err => console.log(`Ошибка при обновлении аватара: ${err}`))
  }

  function handleAddPlaceSubmit(card){
    api.addCard(card)
    .then((newCard) => {
      setCards ([newCard, ...cards])
    })
    .then(() => closeAllPopups())
    .catch(err => console.log(`Ошибка при добавлении новой карточки: ${err}`))
  }
  
  function handleCardLike(card) {
    const isLiked = card.likes.some(i => i._id === currentUser._id);
    api.changeLikeCardStatus(card._id, !isLiked)
    .then((newCard) => {
      setCards((state) => state.map((c) => c._id === card._id ? newCard : c));
    })
    .catch(err => console.log(`Ошибка при лайке/дизлайке карточки: ${err}`))
  }

  function handleCardDelete(card) {
    api.deleteCard(card)
    .then(() => {
      setCards((state) => state.filter(c => c._id !== card._id));
    })
    .catch(err => console.log(`Ошибка при удалении карточки: ${err}`))
  } 

  React.useEffect(() => {
    api.getUserInfo()
    .then((userData) => {
      setCurrentUser(userData);
    })
    .catch(err => console.log(`Ошибка при загрузке данных пользователя с сервера: ${err}`))
  }, []);

  React.useEffect(() => {
    api.getCardList()
    .then((cardData) => {
      setCards(cardData);
    })
    .catch(err => console.log(`Ошибка при загрузке данных карточек с сервера: ${err}`))
  }, []);

  React.useEffect(() => {
    if (localStorage.getItem('jwt')){
      const jwt = localStorage.getItem('jwt');
      auth.checkToken(jwt)
      .then((res) => {
        if (res) {
          console.log(res.data)
          setUserEmail(res.data.email)
          setIsLoggedIn(true)
          history.push('/');
          }
      })
      .catch(err => console.log(`Ошибка при загрузке токена пользователя: ${err}`))
    }
  }, [history]);

    return (
    <CurrentUserContext.Provider value={currentUser}>
      <div className="page">
        <Header
          email={userEmail}
          onSignOut={handleSignOut}/>
        <Switch>
          <Route path='/sign-in'>
            <Login onLogin={handleLogin}/>
          </Route>
          <Route path='/sign-up'>
            <Register onRegister={handleRegister}/>
          </Route>
          <ProtectedRoute
            component={Main}
            isLoggedIn={isLoggedIn}
            path='/'
            cards={cards}
            onEditAvatar={handleEditAvatarClick}
            onEditProfile={handleEditProfileClick}
            onAddPlace={handleAddPlaceClick}
            onCardClick={handleCardClick}
            onCardLike={handleCardLike}
            onCardDelete={handleCardDelete}/>
        </Switch>
        
        {isLoggedIn && <Footer />}
        <EditProfilePopup
          isOpen={isEditProfilePopupOpen}
          onClose={closeAllPopups}
          onUpdateUser={handleUpdateUser}/>
        <EditAvatarPopup
          isOpen={isEditAvatarPopupOpen}
          onClose={closeAllPopups}
          onUpdateAvatar={handleUpdateAvatar}/>
        <AddPlacePopup
          isOpen={isAddPlacePopupOpen}
          onClose={closeAllPopups}
          onAddPlace={handleAddPlaceSubmit}
          />
        <ImagePopup
          card={selectedCard}
          onClose={closeAllPopups}/>  
        <InfoTooltip
          isOpen={isInfoTooltipOpen}
          isRegistered={isRegistered}
          onClose={closeAllPopups}/>   
      </div>
    </CurrentUserContext.Provider>
  );
}

export default App;