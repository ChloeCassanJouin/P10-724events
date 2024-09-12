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
              onChange={() => setIndex(radioIdx)}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Slider;

/* import { useEffect, useState } from "react";
import { useData } from "../../contexts/DataContext";
import { getMonth } from "../../helpers/Date";

import "./style.scss";

const Slider = () => {
  const { data } = useData();
  const [index, setIndex] = useState(0);

  // Tri des événements par date
  const byDateDesc = data?.focus.sort((evtA, evtB) =>
    new Date(evtA.date) < new Date(evtB.date) ? -1 : 1
  );

  // Fonction pour passer à la carte suivante
  const nextCard = () => {
    setTimeout(() => setIndex(index < byDateDesc.length - 1 ? index + 1 : 0), 5000);
  };

  // Utilisation de useEffect pour lancer la fonction nextCard
  useEffect(() => {
    const timer = nextCard();
    return () => clearTimeout(timer); // Nettoyage du timeout
  }, [index]);

  return (
    <div className="SlideCardList">
      {byDateDesc?.map((event, idx) => (
        <div
          key={event.title} // Assurez-vous que chaque titre est unique, sinon utilisez un identifiant
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
      ))}


      <div className="SlideCard__paginationContainer">
        <div className="SlideCard__pagination">
          {byDateDesc.map((event) => (
            <input
              key={event.title} // Assurez-vous que chaque titre est unique, sinon utilisez un identifiant
              type="radio"
              name="radio-button"
              checked={index === byDateDesc.indexOf(event)}
              onChange={() => setIndex(byDateDesc.indexOf(event))} // Permet de changer l'image en cliquant sur les bullets
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Slider; */ 

/* import { useEffect, useState } from "react";
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

export default Slider; */