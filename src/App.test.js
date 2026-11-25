import { render, screen } from "@testing-library/react";
import App from "./App";

test("renders restaurant menu for a table", () => {
  render(<App />);
  expect(screen.getAllByText(/Oak & Leaf/i).length).toBeGreaterThan(0);
  expect(screen.getAllByText(/Table 14/i).length).toBeGreaterThan(0);
});
