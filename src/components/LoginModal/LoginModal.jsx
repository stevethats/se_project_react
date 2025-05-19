import ModalWithForm from "../ModalWithForm/ModalWithForm.jsx";
import useForm from "../../hooks/useForm.jsx";

const LoginModal = ({
  onCloseClick,
  buttonText,
  title,
  isOpen,
  handleLogin,
  handleRedirect,
}) => {
  const { values, handleChange, setValues } = useForm({});
  const resetForm = () => {
    setValues({});
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    handleLogin({ ...values }, resetForm);
  };

  const handleRedirectClick = (e) => {
    handleRedirect();
    resetForm();
  };

  return (
    <ModalWithForm
      buttonText={buttonText}
      title={title}
      isOpen={isOpen}
      handleCloseClick={onCloseClick}
      onSubmit={handleSubmit}
      handleRedirectClick={handleRedirectClick}
    >
      <label className="modal__label" htmlFor="email">
        Email {""}
        <input
          className="modal__input"
          type="email"
          id="login-email"
          placeholder="Email"
          name="email"
          value={values.email || ""}
          onChange={handleChange}
        ></input>
      </label>
      <label className="modal__label" htmlFor="password">
        Password {""}
        <input
          className="modal__input"
          type="password"
          id="login-password"
          placeholder="Password"
          name="password"
          value={values.password || ""}
          onChange={handleChange}
        ></input>
      </label>
    </ModalWithForm>
  );
};

export default LoginModal;
