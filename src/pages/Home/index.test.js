import { fireEvent, render, screen, within } from "@testing-library/react";
import Home from "./index";

describe("When Form is created", () => {
  it("a list of fields card is displayed", async () => {
    render(<Home />);
    await screen.findByText("Email");
    await screen.findByText("Nom");
    await screen.findByText("Prénom");
    await screen.findByText("Personel / Entreprise");
  });

  describe("and a click is triggered on the submit button", () => {
    it("the success message is displayed", async () => {
      render(<Home />);
      fireEvent(
        await screen.findByText("Envoyer"),
        new MouseEvent("click", {
          cancelable: true,
          bubbles: true,
        })
      );
      await screen.findByText("En cours");
      await screen.findByText("Message envoyé !");
    });
  });

});


describe("When a page is created", () => {
  it("a list of events is displayed", async () => {
    render(<Home />);

    const eventTitles = await screen.findAllByText("Nos réalisations");

    const eventTitle = eventTitles[0]; 

    expect(eventTitle).toBeInTheDocument();
  });


  it("a list of people is displayed", async () => {
    render(<Home />);
  
    const personCard = await screen.findByText("Samira");
    expect(personCard).toBeInTheDocument();
  
    await screen.findByText("Jean-baptiste");
  });


  it("a footer is displayed", async () => {
    render(<Home />);
  
    const address = await screen.findByText("45 avenue de la République, 75000 Paris");
    expect(address).toBeInTheDocument();

    const phoneNumber = await screen.findByText("01 23 45 67 89");
    expect(phoneNumber).toBeInTheDocument();
  
  });


  it("an event card, with the last event, is displayed in the footer", async () => {
    render(<Home />);
  
    // Cherche dans le footer un composant EventCard avec le label 'boom'
    const footer = document.querySelector("footer");
    const eventCardFooter = within(footer).getByText("boom"); // Utilise 'boom' comme label
  
    expect(eventCardFooter).toBeInTheDocument();
  });
});
