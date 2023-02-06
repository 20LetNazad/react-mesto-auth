class Api {
  constructor(config) {
    this._headers = config.headers;
    this._url = config.url;
    this._userId = config.userId;
  }

  /** Проверка запросов на сервер */
  _resStatus(res) {
    if (res.ok) {
      return res.json();
    } else {
      return Promise.reject(`Ошибка: ${res.status}`);
    }
  }

  /** Информация о юзере */
  userInfo() {
    return fetch(`${this._url}/users/me`, {
      headers: this._headers,
    }).then(this._resStatus);
  }

  /** Информация о карточках */
  renderCards() {
    return fetch(`${this._url}/cards`, {
      headers: this._headers,
    }).then(this._resStatus);
  }

  /** Изменение профиля */
  editProfile(data) {
    return fetch(`${this._url}/users/me`, {
      method: 'PATCH',
      headers: this._headers,
      body: JSON.stringify({
        name: data.name,
        about: data.about,
      }),
    }).then(this._resStatus);
  }

  /** Изменение аватара */
  editAvatar(data) {
    return fetch(`${this._url}/users/me/avatar`, {
      method: 'PATCH',
      headers: this._headers,
      body: JSON.stringify({
        avatar: data.avatar,
      }),
    }).then(this._resStatus);
  }
  /** Добавление карточки */
  addCard(data) {
    return fetch(`${this._url}/cards`, {
      method: 'POST',
      headers: this._headers,
      body: JSON.stringify({
        name: data.name,
        link: data.link,
      }),
    }).then(this._resStatus);
  }

  /** Добавить лайк карточке */
  addLike(cardId) {
    return fetch(`${this._url}/cards/${cardId}/likes`, {
      method: 'PUT',
      headers: this._headers,
    }).then(this._resStatus);
  }

  /** Убрать лайк карточки */
  removeLike(cardId) {
    return fetch(`${this._url}/cards/${cardId}/likes`, {
      method: 'DELETE',
      headers: this._headers,
    }).then(this._resStatus);
  }

  /** Сменить состояние лайка */
  changeLikeCardStatus(cardId, like) {
    return fetch(`${this._url}/cards/${cardId}/likes`, {
      method: like ? 'PUT' : 'DELETE',
      headers: this._headers,
    }).then(this._resStatus);
  }

  /** Удалить карточку */
  removeCard(cardId) {
    return fetch(`${this._url}/cards/${cardId}`, {
      method: 'DELETE',
      headers: this._headers,
    }).then(this._resStatus);
  }
}

const api = new Api({
  url: 'https://mesto.nomoreparties.co/v1/cohort-55',
  userId: '5c67497edf177b6be73287c3',
  headers: {
    authorization: '96508db4-2bdb-409e-a863-4987f404d514',
    'Content-Type': 'application/json',
  },
});

export default api;
