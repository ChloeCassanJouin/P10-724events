import PropTypes from "prop-types";
import { useEffect, useRef, useState } from "react";
import Icon from "../../components/Icon";
import "./style.scss";

const Modal = ({ opened, Content, children }) => {
  const [isOpened, setIsOpened] = useState(opened);
  const modalRef = useRef(null); // Référence pour le conteneur de la modale

  const handleClickOutside = (event) => {
    if (modalRef.current && !modalRef.current.contains(event.target)) {
      setIsOpened(false); // Ferme la modale si on clique à l'extérieur
    }
  };

  useEffect(() => {
    if (isOpened) {
      document.addEventListener("mousedown", handleClickOutside); // Écouteur pour les clics
    } else {
      document.removeEventListener("mousedown", handleClickOutside); // Nettoie l'écouteur
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside); // Nettoyage de l'écouteur lors de la destruction du composant
    };
  }, [isOpened]);

  return (
    <>
      {children({ isOpened, setIsOpened })}
      {isOpened && (
        <div className="modal">
          <div className="content" ref={modalRef}>
            {Content}
            <button
              type="button"
              data-testid="close-modal"
              onClick={() => setIsOpened(false)}
            >
              <Icon name="close" />
            </button>
          </div>
        </div>
      )}
    </>
  );
};

Modal.defaultProps = {
  opened: false,
}

Modal.propTypes = {
  opened: PropTypes.bool,
  Content: PropTypes.node.isRequired,
  children: PropTypes.func.isRequired,
}

export default Modal;