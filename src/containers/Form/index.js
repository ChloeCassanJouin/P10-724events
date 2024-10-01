import { useCallback, useState } from "react";
import PropTypes from "prop-types";
import Field, { FIELD_TYPES } from "../../components/Field";
import Select from "../../components/Select";
import Button, { BUTTON_TYPES } from "../../components/Button";

// Mock de l'API contact pour simuler l'envoi du formulaire
const mockContactApi = () =>
  new Promise((resolve) => {
    setTimeout(resolve, 500);
  });

const Form = ({ onSuccess, onError }) => {
  const [sending, setSending] = useState(false);
  const [formData, setFormData] = useState({
    nom: '',
    prenom: '',
    type: '',
    email: '',
    message: ''
  });
  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
    setErrors({
      ...errors,
      [name]: ''
    });
  };

  const isValidEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const validate = () => {
    const newErrors = {};
    if (!formData.nom) newErrors.nom = 'Le nom est requis.';
    if (!formData.prenom) newErrors.prenom = 'Le prénom est requis.';
    if (!formData.email) {
      newErrors.email = 'L\'email est requis.';
    } else if (!isValidEmail(formData.email)) {
      newErrors.email = 'L\'email est invalide.';
    }
    if (!formData.message) newErrors.message = 'Le message est requis.';
    return newErrors;
  };

  const sendContact = useCallback(
    async (evt) => {
      evt.preventDefault();
      const validationErrors = validate();
      if (Object.keys(validationErrors).length > 0) {
        setErrors(validationErrors);
        return;
      }

      setSending(true);
      try {
        await mockContactApi();
        setSending(false);
        setFormData({
          nom: '',
          prenom: '',
          type: '',
          email: '',
          message: ''
        });
        onSuccess();
      } catch (err) {
        setSending(false);
        onError(err);
      }
    },
    [formData, onSuccess, onError]
  );


  return (
    <form onSubmit={sendContact}>
      <div className="row">
        <div className="col">
          <div className="inputField">
            <span>Nom</span>
            <input
              data-testid="field-testid-nom" // Assurez-vous que ceci est unique
              name="nom"
              type="text"
              value={formData.nom}
              onChange={handleChange}
            />
            {errors.nom && <div className="error">{errors.nom}</div>}
          </div>

          <div className="inputField">
            <span>Prénom</span>
            <input
              data-testid="field-testid-prenom" // Assurez-vous que ceci est unique
              name="prenom"
              type="text"
              value={formData.prenom}
              onChange={handleChange}
            />
            {errors.prenom && <div className="error">{errors.prenom}</div>}
          </div>

          <Select
            name="type"
            selection={["Personel", "Entreprise"]}
            onChange={handleChange}
            label="Personel / Entreprise"
            type="large"
            titleEmpty
            value={formData.type}
            data-testid="select-testid" // Unique data-testid
          />

          <div className="inputField">
            <span>Email</span>
            <input
              className="email-field"
              data-testid="field-testid-email" // Assurez-vous que ceci est unique
              name="email"
              type="text"
              value={formData.email}
              onChange={handleChange}
            />
            {errors.email && <div className="error">{errors.email}</div>}
          </div>

          <Button type={BUTTON_TYPES.SUBMIT} disabled={sending} data-testid="button-test-id">
            {sending ? "En cours" : "Envoyer"}
          </Button>
        </div>
        
        <div className="col">
          <div className="inputField">
            <span>Message</span>
            <Field
              name="message"
              placeholder="message"
              label="Message"
              type={FIELD_TYPES.TEXTAREA}
              value={formData.message}
              onChange={handleChange}
              data-testid="field-testid-message"
            />
            {errors.message && <div className="error">{errors.message}</div>}
          </div>
        </div>
      </div>
    </form>
  );
};

Form.propTypes = {
  onError: PropTypes.func,
  onSuccess: PropTypes.func,
};

Form.defaultProps = {
  onError: () => null,
  onSuccess: () => null,
};

export default Form;

/* import { useCallback, useState } from "react";
import PropTypes from "prop-types";
import Field, { FIELD_TYPES } from "../../components/Field";
import Select from "../../components/Select";
import Button, { BUTTON_TYPES } from "../../components/Button";

const mockContactApi = () => new Promise((resolve) => { setTimeout(resolve, 500); });

const Form = ({ onSuccess, onError }) => {
  const [sending, setSending] = useState(false);

  // État pour les valeurs du formulaire
  const [formData, setFormData] = useState({
    nom: '',
    prenom: '',
    type: '',
    email: '',
    message: ''
  });

  // Fonction pour mettre à jour les champs
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

  // Fonction pour gérer l'envoi du formulaire
  const sendContact = useCallback(
    async (evt) => {
      evt.preventDefault();
      setSending(true);
      try {
        await mockContactApi();
        setSending(false);
        setFormData({
          nom: '',
          prenom: '',
          type: '',
          email: '',
          message: ''
        });
        onSuccess(); // rajout Chloé pour affichage modale
      } catch (err) {
        setSending(false);
        onError(err);
      }
    },
    [onSuccess, onError]
  );

  return (
    <form onSubmit={sendContact}>
      <div className="row">
        <div className="col">
          <Field
            name="nom"
            placeholder=""
            label="Nom"
            value={formData.nom}
            onChange={handleChange}
          />
          <Field
            name="prenom"
            placeholder=""
            label="Prénom"
            value={formData.prenom}
            onChange={handleChange}
          />
          <Select
            name="type"
            selection={["Personel", "Entreprise"]}
            onChange={handleChange} // Assurez-vous que le gestionnaire de changement est approprié
            label="Personel / Entreprise"
            type="large"
            titleEmpty
            value={formData.type} // Passez la valeur actuelle
          />
          <Field
            name="email"
            className="email-field"
            placeholder=""
            label="Email"
            value={formData.email}
            onChange={handleChange}
          />
          <Button type={BUTTON_TYPES.SUBMIT} disabled={sending}>
            {sending ? "En cours" : "Envoyer"}
          </Button>
        </div>
        <div className="col">
          <Field
            name="message"
            placeholder="message"
            label="Message"
            type={FIELD_TYPES.TEXTAREA}
            value={formData.message}
            onChange={handleChange}
          />
        </div>
      </div>
    </form>
  );
};

Form.propTypes = {
  onError: PropTypes.func,
  onSuccess: PropTypes.func,
};

Form.defaultProps = {
  onError: () => null,
  onSuccess: () => null,
};

export default Form; */