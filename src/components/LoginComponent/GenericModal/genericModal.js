import styles from "./genericModal.module.css";

export default function GenericModal({
  isOpen,
  onClose,
  useSmall = false,
  children,
}) {
  function handleOnClose() {
    onClose();
  }

  function onMainClick(event) {
    event.stopPropagation();
  }
  return (
    <div
      className={`${styles.modal} ${
        isOpen ? styles.modalOpen : styles.modalClosed
      }`}
      onClick={handleOnClose}
    >
      <div
        className={
          useSmall
            ? `${styles.main} ${styles.mainSmall}`
            : `${styles.main} ${styles.mainBig}`
        }
        onClick={onMainClick}
      >
        {children}
      </div>
    </div>
  );
}
