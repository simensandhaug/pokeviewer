import React from "react";
import { render, screen} from "@testing-library/react";
import App from "../App";

test("renders column selector", () => {
  render(<App />);
  const columnSelector = screen.getByText("Toggle Columns:");
  expect(columnSelector).toBeInTheDocument();
});

test("column selector has correct number of checkboxes", () => {
  render(<App />);
  const checkboxes = screen.getAllByRole("checkbox");
  expect(checkboxes.length).toBe(4);
});

test("checkboxes have correct labels", () => {
  render(<App />);
  const labels = ["picture", "weight", "height", "types"];

  labels.forEach((label) => {
    const checkbox = screen.getByLabelText(label);
    expect(checkbox).toBeInTheDocument();
    expect(checkbox).toHaveAttribute("type", "checkbox");
  });
});
