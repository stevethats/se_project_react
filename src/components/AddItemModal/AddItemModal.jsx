import React from "react";
import ModalWithForm from "../ModalWithForm/ModalWithForm.jsx";

const AddItemModal = ({
  onCloseClick,
  buttonText,
  title,
  isOpen,
  onAddItem,
}) => {
  const [name, setName] = React.useState("");
  const handleNameChange = (e) => {
    setName(e.target.value);
  };

  const [link, setLink] = React.useState("");
  const handleLinkChange = (e) => {
    setLink(e.target.value);
  };

  const [weather, setWeather] = React.useState("");
  const handleWeatherChange = (e) => {
    setWeather(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onAddItem({ name: name, weather: weather, imageUrl: link });
    onCloseClick();
  };

  return (
    <ModalWithForm
      buttonText={buttonText}
      title={title}
      isOpen={isOpen}
      handleCloseClick={onCloseClick}
      onSubmit={handleSubmit}
    >
      <label className="modal__label" htmlFor="name">
        Name {""}
        <input
          className="modal__input"
          type="text"
          id="name"
          placeholder="Name"
          value={name}
          onChange={handleNameChange}
        ></input>
      </label>
      <label className="modal__label" htmlFor="imageUrl">
        Image {""}
        <input
          className="modal__input"
          type="url"
          id="imageUrl"
          placeholder="Image URL"
          value={link}
          onChange={handleLinkChange}
        ></input>
      </label>
      <fieldset className="modal__radio-btns" onChange={handleWeatherChange}>
        <legend className="modal__legend">Select the weather type:</legend>
        <label className="modal__label modal__input_type_radio" htmlFor="hot">
          <input
            className="modal__radio-input"
            type="radio"
            id="hot"
            name="weather-type"
            value="hot"
          />{" "}
          Hot
        </label>
        <label className="modal__label modal__input_type_radio" htmlFor="warm">
          <input
            className="modal__radio-input"
            type="radio"
            id="warm"
            name="weather-type"
            value="warm"
          />{" "}
          Warm
        </label>
        <label className="modal__label modal__input_type_radio" htmlFor="cold">
          <input
            className="modal__radio-input"
            type="radio"
            id="cold"
            name="weather-type"
            value="cold"
          />{" "}
          Cold
        </label>
      </fieldset>
    </ModalWithForm>
  );
};

export default AddItemModal;
