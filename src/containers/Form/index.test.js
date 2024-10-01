import { fireEvent, render, screen, waitFor } from "@testing-library/react";
import Form from "./index";

describe("When Events is created", () => {
  it("a list of event card is displayed", async () => {
    render(<Form />);
    await screen.findByText("Email");
    await screen.findByText("Nom");
    await screen.findByText("Prénom");
    await screen.findByText("Personel / Entreprise");
  });

  describe("and a click is triggered on the submit button", () => {
    it("the success action is called", async () => {
      const onSuccess = jest.fn();
      render(<Form onSuccess={onSuccess} />);

      // Remplir le formulaire pour passer la validation
      fireEvent.change(screen.getByTestId("field-testid-nom"), { target: { value: "Doe" } });
      fireEvent.change(screen.getByTestId("field-testid-prenom"), { target: { value: "John" } });
      fireEvent.change(screen.getByTestId("field-testid-email"), { target: { value: "john.doe@example.com" } });
      /* code initial 01/10!!! (screen.getByPlaceholderText("field-testid-message"), { target: { value: "Ceci est un message." } });*/
      fireEvent.change(screen.getByTestId("field-testid-message"), { target: { value: "Ceci est un message." } });

      // Simuler le clic sur le bouton de soumission
      /* code initial 01/10!!!!fireEvent.click(screen.getByTestId("button-test-id"));*/
      fireEvent(
        await screen.findByTestId("button-test-id"),
        new MouseEvent("click", {
          cancelable: true,
          bubbles: true,
        })
      );

      // Attendre que le texte "En cours" soit affiché
      await waitFor(() => expect(screen.getByText("En cours")).toBeInTheDocument());

      // Vérifier que la fonction onSuccess a été appelée
      expect(onSuccess).toHaveBeenCalled();
    });
  });
});

/*  test initial 01/10!!! import { fireEvent, render, screen } from "@testing-library/react";
import Form from "./index";

describe("When Events is created", () => {
  it("a list of event card is displayed", async () => {
    render(<Form />);
    await screen.findByText("Email");
    await screen.findByText("Nom");
    await screen.findByText("Prénom");
    await screen.findByText("Personel / Entreprise");
  });

  describe("and a click is triggered on the submit button", () => {
    it("the success action is called", async () => {
      const onSuccess = jest.fn();
      render(<Form onSuccess={onSuccess} />);
      fireEvent(
        await screen.findByTestId("button-test-id"),
        new MouseEvent("click", {
          cancelable: true,
          bubbles: true,
        })
      );
      await screen.findByText("En cours");
      await screen.findByText("Envoyer");
      expect(onSuccess).toHaveBeenCalled();
    });
  });
}); */
