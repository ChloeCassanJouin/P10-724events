/* eslint-disable react/self-closing-comp */ 
/* eslint-disable react/button-has-type */ 
/* eslint-disable jsx-a11y/control-has-associated-label */
import { fireEvent, render, screen } from "@testing-library/react";
import Modal from "./index";

describe("When Modal data is created", () => {
  it("a modal content is displayed", () => {
    render(
      <Modal opened Content={<div>modal content</div>}>
        {() => null}
      </Modal>
    );
    expect(screen.getByText("modal content")).toBeInTheDocument();
  });

  describe("and a click is triggered to display the modal", () => {
    it("the content of modal is displayed", async () => {
      render(
        <Modal Content={<div>modal content</div>}>
          {({ setIsOpened }) => (
            <button data-testid="open-modal" onClick={() => setIsOpened(true)}></button>
          )}
        </Modal>
      );

      // Vérifie que le contenu n'est pas visible avant le clic
      expect(screen.queryByText("modal content")).not.toBeInTheDocument();

      // Simule un clic pour ouvrir la modale
      fireEvent.click(screen.getByTestId("open-modal"));

      // Vérifie que le contenu est visible après le clic
      expect(screen.getByText("modal content")).toBeInTheDocument();
    });
  });

  describe("and a click is triggered to the close button modal", () => {
    it("the content of the modal is hidden", async () => {
      render(
        <Modal opened Content={<div>modal content</div>}>
          {() => null}
        </Modal>
      );

      expect(screen.getByText("modal content")).toBeInTheDocument();

      fireEvent.click(screen.getByTestId("close-modal"));

      expect(screen.queryByText("modal content")).not.toBeInTheDocument();
    });
  });

  // Nouveau test pour fermeture modale après clic à l'extérieur
  describe("and a click is triggered outside the modal", () => {
    it("the modal is closed", async () => {
      render(
        <Modal opened Content={<div>modal content</div>}>
          {() => <div data-testid="modal-overlay" />}
        </Modal>
      );

      // Vérifie que le contenu est visible au départ
      expect(screen.getByText("modal content")).toBeInTheDocument();

      // Simule un clic à l'extérieur de la modale (dans le body)
      fireEvent(
        document.body, // Utilisation de `document.body` pour simuler un clic à l'extérieur
        new MouseEvent("mousedown", {
          cancelable: true,
          bubbles: true,
        })
      );

      // Vérifie que la modale est fermée (le contenu ne doit plus être visible)
      expect(screen.queryByText("modal content")).not.toBeInTheDocument();
    });
  });
});

/* eslint-disable react/self-closing-comp */ 
/* eslint-disable react/button-has-type */
/* eslint-disable jsx-a11y/control-has-associated-label */
/* import { fireEvent, render, screen } from "@testing-library/react";
import Modal from "./index";

describe("When Modal data is created", () => {
  it("a modal content is displayed", () => {
    render(
      <Modal opened Content={<div>modal content</div>}>
        {() => null}
      </Modal>
    );
    expect(screen.getByText("modal content")).toBeInTheDocument();
  });

  describe("and a click is triggered to display the modal", () => {
    it("the content of modal is displayed", async () => {
      render(
        <Modal Content={<div>modal content</div>}>
          {() => <button data-testid="open-modal"></button>}
        </Modal>
      );
      expect(screen.queryByText("modal content")).not.toBeInTheDocument();
      fireEvent(
        screen.getByTestId("open-modal"),
        new MouseEvent("click", {
          cancelable: true,
          bubbles: true,
        })
      );
      expect(screen.getByText("modal content")).toBeInTheDocument();
    });
  });

  describe("and a click is triggered to the close button modal", () => {
    it("the content of the modal is hidden", async () => {
      render(
        <Modal opened Content={<div>modal content</div>}>
          {() => null}
        </Modal>
      );

      expect(screen.getByText("modal content")).toBeInTheDocument();
      fireEvent(
        screen.getByTestId("close-modal"),
        new MouseEvent("click", {
          cancelable: true,
          bubbles: true,
        })
      );
      expect(screen.queryByText("modal content")).not.toBeInTheDocument();
    });
  });

  // Nouveau test pour fermeture modale après clic à l'extérieur
  describe("and a click is triggered outside the modal", () => {
    it("the modal is closed", async () => {
      render(
        <Modal opened Content={<div>modal content</div>}>
          {() => <div data-testid="modal-overlay" />}
        </Modal>
      );

      expect(screen.getByText("modal content")).toBeInTheDocument();

      fireEvent(
        screen.getByTestId("modal-overlay"),
        new MouseEvent("click", {
          cancelable: true,
          bubbles: true,
        })
      );

      expect(screen.queryByText("modal content")).not.toBeInTheDocument();
    });
  });
}); */