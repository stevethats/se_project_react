import React, { useState } from "react";
import { Routes, Route, useParams } from "react-router-dom";
import "./App.css";

import Header from "../Header/Header.jsx";
import Main from "../Main/Main.jsx";
import Footer from "../Footer/Footer.jsx";
import { apiKey, location } from "../../utils/constants.js";

import Profile from "../Profile/Profile.jsx";
import AddItemModal from "../AddItemModal/AddItemModal.jsx";
import ItemModal from "../ItemModal/ItemModal.jsx";
import ConfirmDeleteModal from "../ConfirmDeleteModal/ConfirmDeleteModal.jsx";

import {
  getForecastWeather,
  filterDataFromWeatherApi,
} from "../../utils/weatherApi.js";
import {
  getItems,
  createClothingCard,
  deleteClothingCard,
} from "../../utils/api.js";
import CurrentTemperatureUnitContext from "../../contexts/CurrentTemperatureUnitContext.js";

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

  const onAddItem = (item) => {
    createClothingCard(item)
      .then(() => getItems())
      .then((data) => {
        setClothingItems(data);
      })
      .catch(console.error);
  };

  const handleDeleteItem = () => {
    deleteClothingCard(selectedCard._id);
    setClothingItems(
      clothingItems.filter((item) => {
        return item._id !== selectedCard._id;
      })
    );
    closeActiveModal();
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

  return (
    <div className="page">
      <CurrentTemperatureUnitContext.Provider
        value={{ currentTemperatureUnit, handleToggleSwitchChange }}
      >
        <div className="page__content">
          <Header weatherData={weatherData} handleAddClick={handleAddClick} />
          <Routes>
            <Route
              path="/"
              element={
                <Main
                  weatherData={weatherData}
                  handleCardClick={handleCardClick}
                  clothingItems={clothingItems}
                />
              }
            />
            <Route
              path="/profile"
              element={
                <Profile
                  onAddClick={handleAddClick}
                  onCardClick={handleCardClick}
                  clothingItems={clothingItems}
                />
              }
            />
          </Routes>
          <Footer />
        </div>
        <AddItemModal
          buttonText="Add garment"
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
  );
}

export default App;
