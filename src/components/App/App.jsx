import React, { useState } from "react";
import { Routes, Route, useNavigate } from "react-router-dom";
import "./App.css";

import Header from "../Header/Header.jsx";
import Main from "../Main/Main.jsx";
import Footer from "../Footer/Footer.jsx";
import { apiKey, location } from "../../utils/constants.js";

import Profile from "../Profile/Profile.jsx";
import AddItemModal from "../AddItemModal/AddItemModal.jsx";
import ItemModal from "../ItemModal/ItemModal.jsx";
import ConfirmDeleteModal from "../ConfirmDeleteModal/ConfirmDeleteModal.jsx";
import RegisterModal from "../RegisterModal/RegisterModal.jsx";
import LoginModal from "../LoginModal/LoginModal.jsx";
import EditProfileModal from "../EditProfileModal/EditProfileModal.jsx";

import ProtectedRoute from "../ProtectedRoute.jsx";

import {
  getForecastWeather,
  filterDataFromWeatherApi,
} from "../../utils/weatherApi.js";
import {
  getItems,
  createClothingCard,
  deleteClothingCard,
  addCardLike,
  removeCardLike,
  updateUserInfo,
} from "../../utils/api.js";

import { setToken, getToken, removeToken } from "../../utils/token.js";
import {
  login,
  register,
  checkTokenValidityWithServer,
} from "../../utils/auth.js";

import CurrentTemperatureUnitContext from "../../contexts/CurrentTemperatureUnitContext.js";
import CurrentUserContext from "../../contexts/CurrentUserContext.js";

function App() {
  const [weatherData, setWeatherData] = React.useState({
    type: "",
    temp: { F: 999, C: 999 },
    city: "",
  });
  const [activeModal, setAcitveModal] = React.useState("");
  const [selectedCard, setSelectedCard] = React.useState({});
  const [currentTemperatureUnit, setCurrentTemperatureUnit] =
    React.useState("F");
  const [clothingItems, setClothingItems] = React.useState([]);
  const [isLoading, setIsLoading] = React.useState(false);

  const [currentUser, setCurrentUser] = React.useState({});
  const [isLoggedIn, setIsLoggedIn] = React.useState(false);

  const handleLogin = ({ email, password }, resetForm) => {
    setIsLoading(true);
    if (!email || !password) {
      return;
    }

    login(email, password)
      .then((data) => {
        if (data.token) {
          checkTokenValidityWithServer(data.token)
            .then((userData) => {
              setToken(data.token);
              setCurrentUser(userData.data);
              setIsLoggedIn(true);
            })
            .catch(console.error);
          resetForm();
          closeActiveModal();
          const redirectPath = location.state?.from?.pathname || "/";
          useNavigate(redirectPath);
        }
      })
      .catch(console.error)
      .finally(() => {
        setIsLoading(false);
      });
  };

  const handleRegistration = ({ name, avatar, email, password }, resetForm) => {
    setIsLoading(true);

    register(name, avatar, email, password)
      .then(() => {
        handleLogin({ email, password }, resetForm);
        resetForm();
        closeActiveModal();
      })
      .catch(console.error)
      .finally(() => {
        setIsLoading(false);
      });
  };

  const handleEditProfile = ({ name, avatar }, resetForm) => {
    setIsLoading(true);
    const token = getToken();
    updateUserInfo(name, avatar, token)
      .then((updatedUser) => {
        setCurrentUser(updatedUser.data);
        resetForm();
        closeActiveModal();
      })
      .catch(console.error)
      .finally(() => {
        setIsLoading(false);
      });
  };

  const handleLogout = () => {
    removeToken();
    setIsLoggedIn(false);
    setCurrentUser({});
  };

  const onAddItem = (item, resetForm) => {
    setIsLoading(true);
    const token = getToken();
    createClothingCard(item, token)
      .then((itemData) => {
        setClothingItems([itemData.data, ...clothingItems]);
        resetForm();
        closeActiveModal();
      })
      .catch(console.error)
      .finally(() => {
        setIsLoading(false);
      });
  };

  const handleCardLike = ({ _id }, isLiked) => {
    const token = localStorage.getItem("jwt");
    // Check if this card is not currently liked
    !isLiked
      ? // if so, send a request to add the user's id to the card's likes array
        // the first argument is the card's id
        addCardLike(_id, token)
          .then((updatedCard) => {
            setClothingItems((cards) =>
              cards.map((item) => (item._id === _id ? updatedCard.data : item))
            );
          })
          .catch((err) => console.log(err))
      : // if not, send a request to remove the user's id from the card's likes array
        // the first argument is the card's id
        removeCardLike(_id, token)
          .then((updatedCard) => {
            setClothingItems((cards) =>
              cards.map((item) => (item._id === _id ? updatedCard.data : item))
            );
          })
          .catch((err) => console.log(err));
  };

  const handleDeleteItem = () => {
    deleteClothingCard(selectedCard._id)
      .then(() => {
        setClothingItems(
          clothingItems.filter((item) => {
            return item._id !== selectedCard._id;
          })
        );
        closeActiveModal();
      })
      .catch(console.error);
  };

  const handleRegistrationClick = () => {
    setAcitveModal("register");
  };

  const handleLoginClick = () => {
    setAcitveModal("login");
  };

  const handleEditProfileClick = () => {
    setAcitveModal("edit-profile");
  };

  const handleCardClick = (card) => {
    setAcitveModal("preview");
    setSelectedCard(card);
  };

  const handleAddClick = () => {
    setAcitveModal("add-garment");
  };

  const handleConfirmDelete = () => {
    closeActiveModal();
    setAcitveModal("confirm");
  };

  const closeActiveModal = () => {
    setAcitveModal("");
  };

  const handleToggleSwitchChange = () => {
    if (currentTemperatureUnit === "C") {
      setCurrentTemperatureUnit("F");
    }

    if (currentTemperatureUnit === "F") {
      setCurrentTemperatureUnit("C");
    }
  };

  //WeatherApi data gathering
  React.useEffect(() => {
    if (location.latitude && location.longitude) {
      getForecastWeather(location, apiKey)
        .then((data) => {
          const filteredData = filterDataFromWeatherApi(data);
          setWeatherData(filteredData);
        })
        .catch(console.error);
    }
  }, []);

  //Local Api data gathering
  React.useEffect(() => {
    getItems()
      .then((data) => {
        setClothingItems(data);
      })
      .catch(console.error);
  }, []);

  //Check for token
  React.useEffect(() => {
    const jwt = getToken();

    if (!jwt) {
      return;
    }

    checkTokenValidityWithServer(jwt)
      .then((userData) => {
        setCurrentUser(userData.data);
        setIsLoggedIn(true);
      })
      .catch(console.error);
  }, []);

  return (
    <CurrentUserContext.Provider
      value={{ currentUser, isLoggedIn, selectedCard, setSelectedCard }}
    >
      <div className="page">
        <CurrentTemperatureUnitContext.Provider
          value={{ currentTemperatureUnit, handleToggleSwitchChange }}
        >
          <div className="page__content">
            <Header
              weatherData={weatherData}
              handleAddClick={handleAddClick}
              handleLoginClick={handleLoginClick}
              handleRegistrationClick={handleRegistrationClick}
            />
            <Routes>
              <Route
                path="/"
                element={
                  <Main
                    weatherData={weatherData}
                    handleCardClick={handleCardClick}
                    clothingItems={clothingItems}
                    onCardLike={handleCardLike}
                  />
                }
              />
              <Route
                path="/profile"
                element={
                  <ProtectedRoute>
                    <Profile
                      onAddClick={handleAddClick}
                      onCardClick={handleCardClick}
                      onCardLike={handleCardLike}
                      clothingItems={clothingItems}
                      handleEditProfileClick={handleEditProfileClick}
                      handleLogout={handleLogout}
                    />
                  </ProtectedRoute>
                }
              />
            </Routes>
            <Footer />
          </div>
          <RegisterModal
            buttonText={isLoading ? "Loading..." : "Register"}
            title="Register"
            onCloseClick={closeActiveModal}
            isOpen={activeModal === "register"}
            handleRegistration={handleRegistration}
          ></RegisterModal>
          <LoginModal
            buttonText={isLoading ? "Loading..." : "Login"}
            title="Login"
            onCloseClick={closeActiveModal}
            isOpen={activeModal === "login"}
            handleLogin={handleLogin}
          ></LoginModal>
          <EditProfileModal
            buttonText={isLoading ? "Saving..." : "Submit"}
            title="Edit profile"
            onCloseClick={closeActiveModal}
            isOpen={activeModal === "edit-profile"}
            handleEditProfile={handleEditProfile}
          ></EditProfileModal>
          <AddItemModal
            buttonText={isLoading ? "Saving..." : "Add garment"}
            title="New garment"
            onCloseClick={closeActiveModal}
            isOpen={activeModal === "add-garment"}
            onAddItem={onAddItem}
          />
          <ItemModal
            isOpen={activeModal === "preview"}
            card={selectedCard}
            onCloseClick={closeActiveModal}
            onDeleteClick={handleConfirmDelete}
          />
          <ConfirmDeleteModal
            isOpen={activeModal === "confirm"}
            onCloseClick={closeActiveModal}
            onDeleteClick={handleDeleteItem}
          />
        </CurrentTemperatureUnitContext.Provider>
      </div>
    </CurrentUserContext.Provider>
  );
}

export default App;
