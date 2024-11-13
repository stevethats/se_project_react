import React, { useState } from "react";
import "./App.css";
import Header from "../Header/Header.jsx";
import Main from "../Main/Main.jsx";
import Footer from "../Footer/Footer.jsx";
import ModalWithForm from "../ModalWithForm/ModalWithForm.jsx";
import ItemModal from "../ItemModal/ItemModal.jsx";
import { apiKey, location } from "../../utils/constants.js";
import {
  getForecastWeather,
  filterDataFromWeatherApi,
} from "../../utils/weatherApi.js";

function App() {
  const [weatherData, setWeatherData] = React.useState({
    type: "",
    temp: { F: 999, C: 999 },
    city: "",
  });
  const [activeModal, setAcitveModal] = React.useState("");
  const [selectedCard, setSelectedCard] = React.useState("");

  React.useEffect(() => {
    if (location.latitude && location.longitude) {
      getForecastWeather(location, apiKey)
        .then((data) => {
          const filteredData = filterDataFromWeatherApi(data);
          setWeatherData(filteredData);
        })
        .catch((err) => console.log(err));
    }
  }, []);

  const handleCardClick = (card) => {
    setAcitveModal("preview");
    setSelectedCard(card);
  };

  const handleAddClick = () => {
    setAcitveModal("add-garment");
  };

  const closeActiveModal = () => {
    setAcitveModal("");
  };

  return (
    <div className="page">
      <div className="page__content">
        <Header weatherData={weatherData} handleAddClick={handleAddClick} />
        <Main weatherData={weatherData} handleCardClick={handleCardClick} />
        <Footer />
      </div>
      <ModalWithForm
        buttonText="Add garment"
        title="New garment"
        activeModal={activeModal}
        handleCloseClick={closeActiveModal}
      >
        <label className="modal__label" htmlFor="name">
          Name {""}
          <input
            className="modal__input"
            type="text"
            id="name"
            placeholder="Name"
          ></input>
        </label>
        <label className="modal__label" htmlFor="imageUrl">
          Image {""}
          <input
            className="modal__input"
            type="url"
            id="imageUrl"
            placeholder="Image URL"
          ></input>
        </label>
        <fieldset className="modal__radio-btns">
          <legend className="modal__legend">Select the weather type:</legend>
          <label className="modal__label modal__input_type_radio" htmlFor="hot">
            <input className="modal__radio-input" type="radio" id="hot" /> Hot
          </label>
          <label
            className="modal__label modal__input_type_radio"
            htmlFor="warm"
          >
            <input className="modal__radio-input" type="radio" id="warm" /> Warm
          </label>
          <label
            className="modal__label modal__input_type_radio"
            htmlFor="cold"
          >
            <input className="modal__radio-input" type="radio" id="cold" /> Cold
          </label>
        </fieldset>
      </ModalWithForm>
      <ItemModal
        activeModal={activeModal}
        card={selectedCard}
        onCloseClick={closeActiveModal}
      />
    </div>
  );
}

export default App;
