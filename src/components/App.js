import React, { useState, useEffect } from 'react';
import { Routes, Route, Navigate, useNavigate } from 'react-router-dom';
import api from '../utils/Api';
import * as Auth from '../utils/Auth';
import Header from './Header';
import Main from './Main';
import Footer from './Footer';
import AddPlacePopup from './AddPlacePopup';
import ImagePopup from './ImagePopup';
import EditProfilePopup from './EditProfilePopup';
import EditAvatarPopup from './EditAvatarPopup';
import CurrentUserContext from '../contexts/CurrentUserContext';
import ProtectedRoute from './ProtectedRoute';
import Login from './Login';
import Register from './Register';

export default function App() {
  const [loggedIn, setLoggedIn] = useState(false);
  const navigate = useNavigate();

  const [isEditProfilePopupOpen, setEditProfilePopupOpen] = useState(false);
  const [isAddPlacePopupOpen, setAddPlacePopupOpen] = useState(false);
  const [isEditAvatarPopupOpen, setEditAvatarPopupOpen] = useState(false);
  const [selectedCard, setSelectedCard] = useState(null);
  const [cards, setCards] = useState([]);
  const [currentUser, setCurrentUser] = useState({});

  useEffect(() => {
    Promise.all([api.userInfo(), api.renderCards()])
      .then(([userData, cardData]) => {
        setCurrentUser(userData);
        setCards(cardData);
      })
      .catch((err) => {
        console.log(`Ошибка.....: ${err}`);
      });
  }, []);

  function handleCardLike(card) {
    const isLiked = card.likes.some((i) => i._id === currentUser._id);

    api
      .changeLikeCardStatus(card._id, !isLiked)
      .then((newCard) => {
        setCards((state) =>
          state.map((c) => (c._id === card._id ? newCard : c))
        );
      })
      .catch((err) => {
        console.log(`Ошибка.....: ${err}`);
      });
  }

  function handleCardDelete(card) {
    api
      .removeCard(card._id)
      .then(() => {
        setCards((cardElement) =>
          cardElement.filter((c) => c._id !== card._id && c)
        );
      })
      .catch((err) => {
        console.log(`Ошибка.....: ${err}`);
      });
  }

  function handleUpdateUser(userData) {
    api
      .editProfile(userData)
      .then((newData) => {
        setCurrentUser(newData);
        closeAllPopups();
      })
      .catch((err) => {
        console.log(`Ошибка.....: ${err}`);
      });
  }

  function handleUpdateAvatar(userData) {
    api
      .editAvatar(userData)
      .then((newAvatar) => {
        setCurrentUser(newAvatar);
        closeAllPopups();
      })
      .catch((err) => {
        console.log(`Ошибка.....: ${err}`);
      });
  }

  function handleAddPlaceSubmit(cardData) {
    api
      .addCard(cardData)
      .then((newCard) => {
        setCards([newCard, ...cards]);
        closeAllPopups();
      })
      .catch((err) => {
        console.log(`Ошибка.....: ${err}`);
      });
  }

  function handleRegister({ email, password }) {
    return Auth.register(email, password)
      .then(() => {
        navigate('/sign-in');
      })
      .catch((err) => {
        console.log(err);
      });
  }

  function handleLogin({ email, password }) {
    return Auth.login(email, password).then((data) => {
      if (data.token) {
        localStorage.setItem('jwt', data.jwt);
        setLoggedIn(true);
        navigate('/');
      }
    });
  }

  function handleEditProfileClick() {
    setEditProfilePopupOpen(true);
  }

  function handleAddPlaceClick() {
    setAddPlacePopupOpen(true);
  }

  function handleEditAvatarClick() {
    setEditAvatarPopupOpen(true);
  }

  function handleCardClick(card) {
    setSelectedCard(card);
  }

  function closeAllPopups() {
    setEditProfilePopupOpen(false);
    setAddPlacePopupOpen(false);
    setEditAvatarPopupOpen(false);
    setSelectedCard(null);
  }

  return (
    <CurrentUserContext.Provider value={currentUser}>
      <div className="page">
        <Header />
        <Routes>
          <Route
            path="/"
            element={
              <ProtectedRoute
                loggedIn={loggedIn}
                onEditProfile={handleEditProfileClick}
                onAddPlace={handleAddPlaceClick}
                onEditAvatar={handleEditAvatarClick}
                onCardClick={handleCardClick}
                onCardLike={handleCardLike}
                onCardDelete={handleCardDelete}
                cards={cards}
                component={Main}
              />
            }
          />
          <Route path="/sign-in" element={<Login onLogin={handleLogin} />} />
          <Route
            path="/sign-up"
            element={<Register onRegister={handleRegister} />}
          />
          <Route
            path="*"
            element={
              loggedIn ? <Navigate to="/" /> : <Navigate to="/sign-in" />
            }
          />
        </Routes>
        <Footer />
        <EditProfilePopup
          isOpen={isEditProfilePopupOpen}
          onClose={closeAllPopups}
          onSubmit={handleUpdateUser}
        />
        <AddPlacePopup
          isOpen={isAddPlacePopupOpen}
          onClose={closeAllPopups}
          onSubmit={handleAddPlaceSubmit}
        />
        <EditAvatarPopup
          isOpen={isEditAvatarPopupOpen}
          onClose={closeAllPopups}
          onSubmit={handleUpdateAvatar}
        />
        <ImagePopup card={selectedCard} onClose={closeAllPopups} />
      </div>
    </CurrentUserContext.Provider>
  );
}
