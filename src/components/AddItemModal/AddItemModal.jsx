import React from "react";
import ModalWithForm from "../ModalWithForm/ModalWithForm.jsx";
import useForm from "../../hooks/useForm.jsx";

const AddItemModal = ({
  onCloseClick,
  buttonText,
  title,
  isOpen,
  onAddItem,
}) => {
  const { values, handleChange } = useForm({});

  const handleSubmit = (e) => {
    e.preventDefault();
    onAddItem({ ...values });
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
          value={values.name}
          name="name"
          onChange={handleChange}
        ></input>
      </label>
      <label className="modal__label" htmlFor="imageUrl">
        Image {""}
        <input
          className="modal__input"
          type="url"
          id="imageUrl"
          placeholder="Image URL"
          name="imageUrl"
          value={values.link}
          onChange={handleChange}
        ></input>
      </label>
      <fieldset className="modal__radio-btns" onChange={handleChange}>
        <legend className="modal__legend">Select the weather type:</legend>
        <label className="modal__label modal__input_type_radio" htmlFor="hot">
          <input
            className="modal__radio-input"
            type="radio"
            id="hot"
            name="weather"
            value="hot"
          />{" "}
          Hot
        </label>
        <label className="modal__label modal__input_type_radio" htmlFor="warm">
          <input
            className="modal__radio-input"
            type="radio"
            id="warm"
            name="weather"
            value="warm"
          />{" "}
          Warm
        </label>
        <label className="modal__label modal__input_type_radio" htmlFor="cold">
          <input
            className="modal__radio-input"
            type="radio"
            id="cold"
            name="weather"
            value="cold"
          />{" "}
          Cold
        </label>
      </fieldset>
    </ModalWithForm>
  );
};

export default AddItemModal;
