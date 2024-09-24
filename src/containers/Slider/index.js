import { useEffect, useState } from "react";
import { useData } from "../../contexts/DataContext";
import { getMonth } from "../../helpers/Date";
import "./style.scss";

const Slider = () => {
  const { data } = useData();
  const [index, setIndex] = useState(0);

  // Tri des événements par date décroissante
  const byDateDesc = data?.focus.sort((evtA, evtB) => new Date(evtB.date) - new Date(evtA.date)) || [];

  useEffect(() => {
    const interval = setInterval(() => {
      setIndex((prevIndex) => (prevIndex + 1) % byDateDesc.length); // Boucle après la dernière carte
    }, 5000);

    return () => clearInterval(interval); // Nettoyage
  }, [byDateDesc]);

  return (
    <div className="SlideCardList">
      {byDateDesc.length > 0 ? (
        byDateDesc.map((event, idx) => (
          <div
            key={event.id} // Utilisez un identifiant unique
            className={`SlideCard ${index === idx ? "SlideCard--display" : "SlideCard--hide"}`}
          >
            <img src={event.cover} alt={event.title} />
            <div className="SlideCard__descriptionContainer">
              <div className="SlideCard__description">
                <h3>{event.title}</h3>
                <p>{event.description}</p>
                <div>{getMonth(new Date(event.date))}</div>
              </div>
            </div>
          </div>
        ))
      ) : (
        <p>No events to display</p>
      )}

      <div className="SlideCard__paginationContainer">
        <div className="SlideCard__pagination">
          {byDateDesc.map((event, radioIdx) => (
            <input
              key={event.id} // Utilisez un identifiant unique
              type="radio"
              name="radio-button"
              checked={index === radioIdx}
              onChange={() => setIndex(radioIdx)} // Change l'index au clic
              style={{ cursor: 'pointer' }} // Optionnel : change le curseur au survol
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Slider;