import ModalWithForm from "../ModalWithForm/ModalWithForm.jsx";
import useForm from "../../hooks/useForm.jsx";

const RegisterModal = ({
  onCloseClick,
  buttonText,
  title,
  isOpen,
  handleRegistration,
  handleRedirect,
}) => {
  const { values, handleChange, setValues } = useForm({});
  const resetForm = () => {
    setValues({});
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    handleRegistration({ ...values }, resetForm);
  };

  const handleRedirectClick = () => {
    handleRedirect();
    resetForm();
  };

  return (
    <ModalWithForm
      buttonText={buttonText}
      title={title}
      isOpen={isOpen}
      handleCloseClick={onCloseClick}
      handleRedirectClick={handleRedirectClick}
      onSubmit={handleSubmit}
    >
      <label className="modal__label" htmlFor="name">
        Name* {""}
        <input
          className="modal__input"
          type="text"
          id="register-name"
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
          id="register-imageUrl"
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
          type="-email"
          id="register-email"
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
          id="register-password"
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
