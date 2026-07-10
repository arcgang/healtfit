import { render, screen } from "@testing-library/react";
import { DashboardHeader } from "./DashboardHeader";

test("renders the page title", () => {
  render(<DashboardHeader userName="Alice" />);
  expect(screen.getByText("Health Management Dashboard")).toBeTruthy();
});

test("renders the user name in the subtitle", () => {
  render(<DashboardHeader userName="Alice" />);
  expect(screen.getByText("Alice")).toBeTruthy();
});
