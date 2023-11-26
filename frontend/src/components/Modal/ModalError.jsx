import PropTypes from "prop-types";
import ButtonPrimary from "../ButtonPrimary";
import "./ModalError.scss";

function ModalError({ isOpen, setIsOpen, message, firstButton }) {
  return (
    <div className={`actionModal ${isOpen && "show"}`}>
      <p>{message}</p>
      <div className="buttons">
        <ButtonPrimary
          type="button"
          className="yesBtn"
          onClick={() => {
            setIsOpen(false);
          }}
        >
          {firstButton}
        </ButtonPrimary>
      </div>
    </div>
  );
}

export default ModalError;

ModalError.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  setIsOpen: PropTypes.func.isRequired,
  message: PropTypes.string.isRequired,
  firstButton: PropTypes.string.isRequired,
};
