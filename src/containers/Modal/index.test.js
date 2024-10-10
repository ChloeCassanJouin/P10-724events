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

      expect(screen.queryByText("modal content")).not.toBeInTheDocument();

      fireEvent.click(screen.getByTestId("open-modal"));

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

  describe("and a click is triggered outside the modal", () => {
    it("the modal is closed", async () => {
      render(
        <Modal opened Content={<div>modal content</div>}>
          {() => <div data-testid="modal-overlay" />}
        </Modal>
      );

      expect(screen.getByText("modal content")).toBeInTheDocument();

      fireEvent(
        document.body, 
        new MouseEvent("mousedown", {
          cancelable: true,
          bubbles: true,
        })
      );


      expect(screen.queryByText("modal content")).not.toBeInTheDocument();
    });
  });
});
