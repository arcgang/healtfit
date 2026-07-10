import { render, screen, fireEvent } from "@testing-library/react";
import { HealthDashboard } from "./HealthDashboard";

test("renders DashboardHeader", () => {
  render(<HealthDashboard userName="Test User" />);
  expect(screen.getByText("Health Management Dashboard")).toBeTruthy();
});

test("renders BodyPartFilter with All button", () => {
  render(<HealthDashboard userName="Test User" />);
  expect(screen.getByRole("button", { name: "All" })).toBeTruthy();
});

test("shows all body-part sections by default", () => {
  render(<HealthDashboard userName="Test User" />);
  // One representative metric from each of the four categories in mockHealthData
  expect(screen.getByText("Systolic Blood Pressure")).toBeTruthy(); // cardiovascular
  expect(screen.getByText("BMI")).toBeTruthy();                     // metabolic
  expect(screen.getByText("Creatinine")).toBeTruthy();              // renal
  expect(screen.getByText("Haemoglobin")).toBeTruthy();             // blood
});

test("filtering to a single body part hides other sections", () => {
  render(<HealthDashboard userName="Test User" />);
  fireEvent.click(screen.getByRole("button", { name: "cardiovascular" }));
  expect(screen.getByText("Systolic Blood Pressure")).toBeTruthy();
  expect(screen.queryByText("BMI")).toBeFalsy();
  expect(screen.queryByText("Creatinine")).toBeFalsy();
  expect(screen.queryByText("Haemoglobin")).toBeFalsy();
});

test("clicking All after filtering restores all sections", () => {
  render(<HealthDashboard userName="Test User" />);
  fireEvent.click(screen.getByRole("button", { name: "cardiovascular" }));
  fireEvent.click(screen.getByRole("button", { name: "All" }));
  expect(screen.getByText("Systolic Blood Pressure")).toBeTruthy();
  expect(screen.getByText("BMI")).toBeTruthy();
  expect(screen.getByText("Creatinine")).toBeTruthy();
  expect(screen.getByText("Haemoglobin")).toBeTruthy();
});
