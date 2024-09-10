import { useState } from "react";
import EventCard from "../../components/EventCard";
import Select from "../../components/Select";
import { useData } from "../../contexts/DataContext";
import Modal from "../Modal";
import ModalEvent from "../ModalEvent";

import "./style.css";

const PER_PAGE = 9;

const EventList = () => {
  const { data, error } = useData();
  const [type, setType] = useState();
  const [currentPage, setCurrentPage] = useState(1);
  const filteredEvents = (
    (!type
      ? data?.events
      : data?.events.filter(event => event.type === type)) || []
  ).filter((event, index) => {
    if (
      (currentPage - 1) * PER_PAGE <= index &&
      PER_PAGE * currentPage > index
    ) {
      return true;
    }
    return false;
  });
  const changeType = (evtType) => {
    setCurrentPage(1);
    setType(evtType);
  };
  const pageNumber = Math.floor((filteredEvents?.length || 0) / PER_PAGE) + 1;
  const typeList = new Set(data?.events.map((event) => event.type));
  return (
    <>
      {error && <div>An error occured</div>}
      {data === null ? (
        "loading"
      ) : (
        <>
          <h3 className="SelectTitle">Catégories</h3>
          <Select
            selection={Array.from(typeList)}
            onChange={(value) => (value ? changeType(value) : changeType(null))}
          />
          <div id="events" className="ListContainer">
            {filteredEvents.map((event) => (
              <Modal key={event.id} Content={<ModalEvent event={event} />}>
                {({ setIsOpened }) => (
                  <EventCard
                    onClick={() => setIsOpened(true)}
                    imageSrc={event.cover}
                    title={event.title}
                    date={new Date(event.date)}
                    label={event.type}
                  />
                )}
              </Modal>
            ))}
          </div>
          <div className="Pagination">
            {[...Array(pageNumber || 0)].map((_, n) => (
              // eslint-disable-next-line react/no-array-index-key
              <a key={n} href="#events" onClick={() => setCurrentPage(n + 1)}>
                {n + 1}
              </a>
            ))}
          </div>
        </>
      )}
    </>
  );
};

export default EventList;

/* import { useState } from "react";
import EventCard from "../../components/EventCard";
import Select from "../../components/Select";
import { useData } from "../../contexts/DataContext";
import Modal from "../Modal";
import ModalEvent from "../ModalEvent";

import "./style.css";

const PER_PAGE = 9;

const EventList = () => {
  const { data, error } = useData();
  const [type, setType] = useState();
  const [currentPage, setCurrentPage] = useState(1);

  // Assurez-vous que `data` et `data.events` sont définis
  const events = data ? data.events : [];

  // Filtrer les événements par type (si un type est sélectionné)
  const eventsToDisplay = events.filter((event) =>
    type ? event.type === type : true
  );

  const filteredEvents = eventsToDisplay.slice(
    (currentPage - 1) * PER_PAGE,
    currentPage * PER_PAGE
  );

  // Gestion du changement de catégorie
  const changeType = (evtType) => {
    console.log("Selected type:", evtType); 
    setCurrentPage(1); // Réinitialiser la page
    setType(evtType); // Appliquer le type de filtre sélectionné
  };

  const pageNumber = Math.ceil(eventsToDisplay.length / PER_PAGE);

  const typeList = Array.from(new Set(events.map((event) => event.type)));

  return (
    <>
      {error && <div>An error occurred</div>}
      {data === null ? (
        "loading"
      ) : (
        <>
          <h3 className="SelectTitle">Catégories</h3>
          <Select
            selection={typeList}
            onChange={(value) => (value ? changeType(value) : changeType(null))}
          />
          <div id="events" className="ListContainer">
            {filteredEvents.map((event) => (
              <Modal key={event.id} Content={<ModalEvent event={event} />}>
                {({ setIsOpened }) => (
                  <EventCard
                    onClick={() => setIsOpened(true)}
                    imageSrc={event.cover || "defaultImage.jpg"} // Valeur par défaut
                    title={event.title || "Titre non disponible"} // Valeur par défaut
                    date={new Date(event.date)}
                    label={event.type}
                  />
                )}
              </Modal>
            ))}
          </div>
          <div className="Pagination">
            {[...Array(pageNumber)].map((_, n) => (
              <a key={`page-${n + 1}`} href="#events" onClick={() => setCurrentPage(n + 1)}>
                {n + 1}
              </a>
            ))}
          </div>
        </>
      )}
    </>
  );
};

export default EventList; */

/* import { useState } from "react";
import EventCard from "../../components/EventCard";
import Select from "../../components/Select";
import { useData } from "../../contexts/DataContext";
import Modal from "../Modal";
import ModalEvent from "../ModalEvent";

import "./style.css";

const PER_PAGE = 9;

const EventList = () => {
  const { data, error } = useData();
  const [type, setType] = useState();
  const [currentPage, setCurrentPage] = useState(1);


   // Filtrer les événements par type (si un type est sélectionné)
   const eventsToDisplay = data.events.filter((event) =>
    type ? event.type === type : true
  );

  const filteredEvents = eventsToDisplay.slice(
    (currentPage - 1) * PER_PAGE,
    currentPage * PER_PAGE
  );
  /* const filteredEvents = (
    (!type
      ? data?.events
      : data?.events) || []
  ).filter((event, index) => {
    if (
      (currentPage - 1) * PER_PAGE <= index &&
      PER_PAGE * currentPage > index
    ) {
      return true;
    }
    return false;
  }); 

  // Gestion du changement de catégorie
  const changeType = (evtType) => {
    console.log("Selected type:", evtType); 
    setCurrentPage(1); // Réinitialiser la page
    setType(evtType); // Appliquer le type de filtre sélectionné
  };

  const pageNumber = Math.ceil(eventsToDisplay.length / PER_PAGE);
 // const pageNumber = Math.floor((filteredEvents?.length || 0) / PER_PAGE) + 1;

 const typeList = Array.from(new Set(data.events.map((event) => event.type)));
  // const typeList = new Set(data?.events.map((event) => event.type));
  return (
    <>
      {error && <div>An error occured</div>}
      {data === null ? (
        "loading"
      ) : (
        <>
          <h3 className="SelectTitle">Catégories</h3>
          <Select
            selection={Array.from(typeList)}
            onChange={(value) => (value ? changeType(value) : changeType(null))}
          />
          <div id="events" className="ListContainer">
            {filteredEvents.map((event) => (
              <Modal key={event.id} Content={<ModalEvent event={event} />}>
                {({ setIsOpened }) => (
                  <EventCard
                    onClick={() => setIsOpened(true)}
                    imageSrc={event.cover}
                    title={event.title}
                    date={new Date(event.date)}
                    label={event.type}
                  />
                )}
              </Modal>
            ))}
          </div>
          <div className="Pagination">
            {[...Array(pageNumber || 0)].map((_, n) => (
              // eslint-disable-next-line react/no-array-index-key
              <a key={n} href="#events" onClick={() => setCurrentPage(n + 1)}>
                {n + 1}
              </a>
            ))}
          </div>
        </>
      )}
    </>
  );
};

export default EventList; */

/* import { useState } from "react";
import EventCard from "../../components/EventCard";
import Select from "../../components/Select";
import { useData } from "../../contexts/DataContext";
import Modal from "../Modal";
import ModalEvent from "../ModalEvent";

import "./style.css";

const PER_PAGE = 9;

const EventList = () => {
  const { data, error } = useData();
  const [type, setType] = useState(null); // Assurez-vous que type commence à `null`
  const [currentPage, setCurrentPage] = useState(1);

  if (!data?.events) {
    return <div>Loading...</div>;
  }

  console.log("Events data:", data.events); // 18 realisations


  // Filtrer les événements par type (si un type est sélectionné)
  const eventsToDisplay = data.events.filter((event) =>
    type ? event.type === type : true
  );

  console.log("Events to display:", eventsToDisplay); // 18 realisations

  // Pagination après avoir filtré par type
  const filteredEvents = eventsToDisplay.slice(
    (currentPage - 1) * PER_PAGE,
    currentPage * PER_PAGE
  );

  console.log("Filtered events:", filteredEvents);

  // Gestion du changement de catégorie
  const changeType = (evtType) => {
    console.log("Selected type:", evtType); 
    setCurrentPage(1); // Réinitialiser la page
    setType(evtType); // Appliquer le type de filtre sélectionné
  };

  // Calcul du nombre total de pages en fonction des événements filtrés
  const pageNumber = Math.ceil(eventsToDisplay.length / PER_PAGE);

  // Obtenir la liste des catégories
  const typeList = Array.from(new Set(data.events.map((event) => event.type)));

  console.log("Type list:", typeList);

  return (
    <>
      {error && <div>An error occurred</div>}
      {data === null ? (
        "loading"
      ) : (
        <>
          <h3 className="SelectTitle">Catégories</h3>
          <Select
  selection={typeList}
  onChange={(value) => {
    console.log("Select onChange called with:", value); // Vérifiez la valeur reçue
    changeType(value); // Appliquez la valeur sélectionnée
  }}
/>
          <div id="events" className="ListContainer">
            {filteredEvents.map((event) => (
              <Modal key={event.id} Content={<ModalEvent event={event} />}>
                {({ setIsOpened }) => (
                  <EventCard
                    onClick={() => setIsOpened(true)}
                    imageSrc={event.cover}
                    title={event.title}
                    date={new Date(event.date)}
                    label={event.type}
                  />
                )}
              </Modal>
            ))}
          </div>
          <div className="Pagination">
            {[...Array(pageNumber)].map((_, n) => (
              <a
                key={`page-${n + 1}`} // Création d'une clé unique pour chaque page
                href="#events"
                onClick={() => setCurrentPage(n + 1)}
              >
                {n + 1}
              </a>
            ))}
          </div>
        </>
      )}
    </>
  );
};

export default EventList; */