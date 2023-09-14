/** @format */

import * as React from "react";
import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom/extend-expect";

import TextField from "../TextField.js";

describe("Text Field Component", () => {
  test("Input is in the document", () => {
    render(<TextField />);

    const findField = screen.getByTestId("inputField");

    expect(findField).toBeInDocument;
  });

  test("Input is enabled by default, and no error is displayed", () => {
    render(<TextField />);

    const findField = screen.getByTestId("inputField");
    const findErrorPopUp = screen.getByTestId("popUp");

    const errorPopUpDisplay = window.getComputedStyle(findErrorPopUp);

    expect(findField).toBeEnabled();
    expect(errorPopUpDisplay.display).toBe("none");
  });

  test("Input can be disabled with props", () => {
    render(<TextField disarm={true} />);

    const findField = screen.getByTestId("inputField");

    expect(findField).toBeDisabled();
  });

  test("Checking invalid input warning", () => {
    const validate = () => false;
    const setValid = () => false;
    const warning = false;

    render(
      <TextField validate={validate} setValid={setValid} warning={warning} />
    );

    const findTextField = screen.getByTestId("inputField");
    const errorBorder = window.getComputedStyle(findTextField);

    expect(errorBorder.borderColor).toBe("red");
  });

  test("Checking invalid input popup", () => {
    const validate = () => false;
    const setValid = () => false;
    const warning = true;

    render(
      <TextField validate={validate} setValid={setValid} warning={warning} />
    );

    const findPopUp = screen.getByTestId("popUp");
    const errorDisplay = window.getComputedStyle(findPopUp);

    expect(errorDisplay.display).toBe("flex");
  });
});
