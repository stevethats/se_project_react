import ModalWithForm from "../ModalWithForm/ModalWithForm.jsx";
import useForm from "../../hooks/useForm.jsx";

const EditProfileModal = ({
  onCloseClick,
  buttonText,
  title,
  isOpen,
  handleEditProfile,
}) => {
  const { values, handleChange, setValues } = useForm({});

  const handleSubmit = (e) => {
    e.preventDefault();
    const resetForm = () => {
      setValues({});
    };
    handleEditProfile({ ...values }, resetForm);
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
          id="editProfile-name"
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
          id="editProfile-imageUrl"
          placeholder="Image URL"
          name="avatar"
          value={values.avatar || ""}
          onChange={handleChange}
        ></input>
      </label>
    </ModalWithForm>
  );
};

export default EditProfileModal;
