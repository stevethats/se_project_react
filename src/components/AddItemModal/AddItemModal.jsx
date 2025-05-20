import ModalWithForm from "../ModalWithForm/ModalWithForm.jsx";
import useForm from "../../hooks/useForm.jsx";

const AddItemModal = ({
  onCloseClick,
  buttonText,
  title,
  isOpen,
  onAddItem,
}) => {
  const { values, handleChange, setValues } = useForm({});

  const handleSubmit = (e) => {
    e.preventDefault();
    const resetForm = () => {
      setValues({});
    };
    onAddItem({ ...values }, resetForm);
  };

  return (
    <ModalWithForm
      buttonText={buttonText}
      title={title}
      isOpen={isOpen}
      handleCloseClick={onCloseClick}
      onSubmit={handleSubmit}
    >
      <label className="modal__label">
        Name {""}
        <input
          className="modal__input"
          type="text"
          id="addItem-name"
          placeholder="Name"
          value={values.name || ""}
          name="name"
          onChange={handleChange}
        ></input>
      </label>
      <label className="modal__label">
        Image {""}
        <input
          className="modal__input"
          type="url"
          id="addItem-imageUrl"
          placeholder="Image URL"
          name="imageUrl"
          value={values.imageUrl || ""}
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
