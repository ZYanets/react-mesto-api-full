class Api {
  constructor(options) {
    this._baseUrl = options.baseUrl;
    this._headers = options.headers;
  }

  getAppInfo() {
    return Promise.all([this.getUserInfo(), this.getCardList()])
  }

  /* ---------------------- Загрузка необходимой информации с сервера ----------------------*/
  _getInfo() {
    return (res => {
      if (res.ok) {
        return res.json();
      }
      return Promise.reject(`Ошибка: ${res.status}`);
    });
  }
  /* ---------------------- Получение карточек с сервера ----------------------*/
  getCardList() {
    return fetch(`${this._baseUrl}/cards`, {
      method: 'GET',
      headers: this._headers
    })
      .then(this._getInfo());
  }

  /* ---------------------- Получение данных пользователя на сервер ----------------------*/
  getUserInfo() {
    return fetch(`${this._baseUrl}/users/me`, {
      method: 'GET',
      headers: this._headers,
    })
      .then(this._getInfo());
  }

  /* ---------------------- Отправка данных пользователя на сервер ----------------------*/
  setUserInfo(data) {
    return fetch(`${this._baseUrl}/users/me`, {
      method: 'PATCH',
      headers: this._headers,
      body: JSON.stringify({
        name: data.name,
        about: data.about
      })
    })
      .then(this._getInfo());
  }

  /* ---------------------- Добавление карточки на сервер ----------------------*/
  addCard(cardData) {
    return fetch(`${this._baseUrl}/cards`, {
      method: 'POST',
      headers: this._headers,
      body: JSON.stringify({
        name: cardData.name,
        link: cardData.link
      })
    })
      .then(this._getInfo());
  }

  /* ---------------------- Удаление карточки из сервера ----------------------*/
  deleteCard(card) {
    return fetch(`${this._baseUrl}/cards/${card._id}`, {
      method: 'DELETE',
      headers: this._headers,
    })
      .then(this._getInfo());
  }

  /* ---------------------- Постановка и снятие лайка ----------------------*/
  changeLikeCardStatus(cardData, isLiked) {
    return fetch(`${this._baseUrl}/cards/likes/${cardData}`, {
      method: isLiked ? 'PUT' : 'DELETE',
      headers: this._headers,
    })
      .then(this._getInfo());
  }


  /* ---------------------- Обновление аватара пользователя ----------------------*/
  setUserAvatar(data) {
    return fetch(`${this._baseUrl}/users/me/avatar`, {
      method: 'PATCH',
      headers: this._headers,
      body: JSON.stringify({
        avatar: data.avatar,
      })
    })
      .then(this._getInfo());
  }
}

const api = new Api({
  baseUrl: 'https://mesto.nomoreparties.co/v1/cohort-29',
  headers: {
    authorization: '8640dfea-edcf-4553-ad3c-1569bb70c97f',
    'Content-Type': 'application/json'
  }
});

export {api};
