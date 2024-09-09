import { useEffect, useState } from "react";
import { useData } from "../../contexts/DataContext";
import { getMonth } from "../../helpers/Date";
import "./style.scss";

const Slider = () => {
  const { data } = useData();
  const [index, setIndex] = useState(0);

  // Trier les événements par date
  const byDateDesc = data?.focus.sort((evtA, evtB) =>
    new Date(evtA.date) < new Date(evtB.date) ? -1 : 1
  );

  // Mettre à jour l'index toutes les 5 secondes
  useEffect(() => {
    const interval = setInterval(() => {
      setIndex((prevIndex) => (prevIndex + 1) % byDateDesc.length); // L'index revient à 0 après la dernière image
    }, 5000);

    // Nettoyage de l'intervalle à la fin du cycle de vie du composant
    return () => clearInterval(interval); // On nettoie l'intervalle
  }, [byDateDesc]);

  return (
    <div className="SlideCardList">
      {byDateDesc?.map((event, idx) => (
        <div
          key={event.title} // Utilisez une clé unique comme event.title ou event.id
          className={`SlideCard SlideCard--${index === idx ? "display" : "hide"}`}
        >
          <img src={event.cover} alt="forum" />
          <div className="SlideCard__descriptionContainer">
            <div className="SlideCard__description">
              <h3>{event.title}</h3>
              <p>{event.description}</p>
              <div>{getMonth(new Date(event.date))}</div>
            </div>
          </div>
        </div>
      ))}
      {/* Pagination */}
      <div className="SlideCard__paginationContainer">
        <div className="SlideCard__pagination">
          {byDateDesc?.map((event, radioIdx) => (
            <input
              key={event.title} // Utilisez un titre ou un id unique au lieu de radioIdx
              type="radio"
              name="radio-button"
              checked={index === radioIdx} // Lié à l'index actuel
              onChange={() => setIndex(radioIdx)} // Changement d'index au clic sur un bullet point
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Slider;