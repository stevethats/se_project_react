import ModalWithForm from "../ModalWithForm/ModalWithForm.jsx";
import useForm from "../../hooks/useForm.jsx";

const RegisterModal = ({
  onCloseClick,
  buttonText,
  title,
  isOpen,
  handleRegistration,
}) => {
  const { values, handleChange, setValues } = useForm({});

  const handleSubmit = (e) => {
    e.preventDefault();
    const resetForm = () => {
      setValues({});
    };
    handleRegistration({ ...values }, resetForm);
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
        Name* {""}
        <input
          className="modal__input"
          type="text"
          id="name"
          placeholder="Name"
          value={values.name || ""}
          name="name"
          onChange={handleChange}
        ></input>
      </label>
      <label className="modal__label" htmlFor="imageUrl">
        Avatar* {""}
        <input
          className="modal__input"
          type="url"
          id="imageUrl"
          placeholder="Image URL"
          name="avatar"
          value={values.avatar || ""}
          onChange={handleChange}
        ></input>
      </label>
      <label className="modal__label" htmlFor="email">
        Email* {""}
        <input
          className="modal__input"
          type="email"
          id="email"
          placeholder="Email"
          name="email"
          value={values.email || ""}
          onChange={handleChange}
        ></input>
      </label>
      <label className="modal__label" htmlFor="password">
        Password* {""}
        <input
          className="modal__input"
          type="password"
          id="password"
          placeholder="Password"
          name="password"
          value={values.password || ""}
          onChange={handleChange}
        ></input>
      </label>
    </ModalWithForm>
  );
};

export default RegisterModal;
