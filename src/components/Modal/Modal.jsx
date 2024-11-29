import { useEffect } from "react";

function Modal({ onClose, children, isOpen, modalContent = "modal__content" }) {
  useEffect(() => {
    const handleEscape = (e) => {
      if (e.key === "Escape") {
        onClose();
      }
    };

    document.addEventListener("keydown", handleEscape);
    return () => document.removeEventListener("keydown", handleEscape);
  }, [onClose]);

  const handleOverlay = (e) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  return (
    <div
      className={`modal ${isOpen && "modal_opened"}`}
      onClick={handleOverlay}
    >
      <div className={modalContent}>
        {children}
        <button className="modal__close" type="button" onClick={onClose} />
      </div>
    </div>
  );
}

export default Modal;
