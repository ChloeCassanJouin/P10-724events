import { useEffect, useState } from "react";
import { useData } from "../../contexts/DataContext";
import { getMonth } from "../../helpers/Date";
import "./style.scss";

const Slider = () => {
  const { data } = useData();
  const [index, setIndex] = useState(0);

  const byDateDesc = data?.focus.sort((evtA, evtB) => new Date(evtB.date) - new Date(evtA.date)) || [];

  useEffect(() => {
    const interval = setInterval(() => {
      setIndex((prevIndex) => (prevIndex + 1) % byDateDesc.length); 
    }, 5000);

    return () => clearInterval(interval); 
  }, [byDateDesc]);

  return (
    <div className="SlideCardList">
      {byDateDesc.length > 0 ? (
        byDateDesc.map((event, idx) => (
          <div
            key={event.id} 
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
              key={event.id} 
              type="radio"
              name="radio-button"
              checked={index === radioIdx}
              onChange={() => setIndex(radioIdx)} 
              style={{ cursor: 'pointer' }} 
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Slider;

{/*
  import { useEffect, useState } from "react";
import { useData } from "../../contexts/DataContext";
import { getMonth } from "../../helpers/Date";
import "./style.scss";

// NOUVEAU: Fonction pour générer des IDs uniques
const generateId = () => `id-${Math.random().toString(36).substr(2, 9)}`;

const Slider = () => {
  const { data } = useData();
  const [index, setIndex] = useState(0);
  // NOUVEAU: State pour stocker les slides avec leurs IDs
  const [slides, setSlides] = useState([]);

  // MODIFIÉ: Remplacé le tri direct par un useEffect
  useEffect(() => {
    if (data?.focus) {
      const sortedSlides = data.focus
        .sort((evtA, evtB) => new Date(evtB.date) - new Date(evtA.date))
        // NOUVEAU: Ajout d'un ID unique à chaque événement
        .map(event => ({
          ...event,
          id: generateId()
        }));
      setSlides(sortedSlides);
    }
  }, [data]);

  // MODIFIÉ: Utilisation de slides.length au lieu de byDateDesc.length
  useEffect(() => {
    const interval = setInterval(() => {
      setIndex((prevIndex) => (prevIndex + 1) % slides.length);
    }, 5000);
    return () => clearInterval(interval);
  }, [slides]);

  return (
    <div className="SlideCardList">
      // MODIFIÉ: Utilisation de slides au lieu de byDateDesc 
      {slides.length > 0 ? (
        slides.map((event, idx) => (
          <div
            // MODIFIÉ: Utilisation de l'ID généré
            key={event.id}
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
          // MODIFIÉ: Utilisation de slides au lieu de byDateDesc
          {slides.map((event, radioIdx) => (
            <input
              // MODIFIÉ: Utilisation de l'ID généré
              key={event.id}
              type="radio"
              name="radio-button"
              checked={index === radioIdx}
              onChange={() => setIndex(radioIdx)}
              style={{ cursor: 'pointer' }}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Slider;*/}