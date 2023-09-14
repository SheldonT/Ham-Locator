/** @format */

import * as React from "react";
import { render, screen, waitFor } from "@testing-library/react";
import "@testing-library/jest-dom/extend-expect";

import InputBar from "../InputBar.js";

jest.mock("axios", () => ({
  get: jest.fn(() => Promise.resolve({ data: {} })),
  post: jest.fn(() => Promise.resolve({ data: {} })),
  // Add other methods that you use in your code
}));

jest.mock("callsign", () => ({
  getAmateurRadioInfoByCallsign: jest.fn(() => ({})),
}));

describe("Input Bar", () => {
  test("Checking input", async () => {
    render(<InputBar />);

    const nameField = screen.queryByPlaceholderText("Name");

    expect(nameField).toBeNull();
  });
});
