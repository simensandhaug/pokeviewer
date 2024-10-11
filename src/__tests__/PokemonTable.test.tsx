import { render, screen, within } from "@testing-library/react";
import App from "../App";

test("table has headers 'Name' and 'ID'", () => {
  render(<App />);
  const table = screen.getByRole("table");
  const tableHeaders = within(table).getAllByRole("columnheader");
  const headerTexts = tableHeaders.map((header) => header.textContent);

  expect(headerTexts).toContain("Name");
  expect(headerTexts).toContain("ID");
});
