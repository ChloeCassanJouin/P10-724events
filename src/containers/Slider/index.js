import { useEffect, useState } from "react";
import { useData } from "../../contexts/DataContext";
import { getMonth } from "../../helpers/Date";
import "./style.scss";

const Slider = () => {
  const { data } = useData();
  const [index, setIndex] = useState(0);

  const byDateDesc = data?.events.sort((evtA, evtB) => new Date(evtB.date) - new Date(evtA.date)) || [];

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
            key={event.id || `event-${idx}`} // Fallback pour les clés
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
            key={event.id || `radio-${radioIdx}`} // Fallback pour les clés
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