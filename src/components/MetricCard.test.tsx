import { render, screen } from "@testing-library/react";
import { MetricCard } from "./MetricCard";

test("renders label", () => {
  render(<MetricCard label="Heart Rate" value={72} unit="bpm" />);
  expect(screen.getByText("Heart Rate")).toBeTruthy();
});

test("renders numeric value", () => {
  render(<MetricCard label="Heart Rate" value={72} unit="bpm" />);
  expect(screen.getByText("72")).toBeTruthy();
});

test("renders string value", () => {
  render(<MetricCard label="Blood Pressure" value="120/80" unit="mmHg" />);
  expect(screen.getByText("120/80")).toBeTruthy();
});

test("renders unit", () => {
  render(<MetricCard label="Heart Rate" value={72} unit="bpm" />);
  expect(screen.getByText("bpm")).toBeTruthy();
});

test("renders normal status badge with correct colour class", () => {
  render(<MetricCard label="Heart Rate" value={72} unit="bpm" status="normal" />);
  const badge = screen.getByText("normal");
  expect(badge.className).toContain("green");
});

test("renders warning status badge with correct colour class", () => {
  render(<MetricCard label="Heart Rate" value={95} unit="bpm" status="warning" />);
  const badge = screen.getByText("warning");
  expect(badge.className).toContain("yellow");
});

test("renders critical status badge with correct colour class", () => {
  render(<MetricCard label="Heart Rate" value={140} unit="bpm" status="critical" />);
  const badge = screen.getByText("critical");
  expect(badge.className).toContain("red");
});

test("renders no badge when status is omitted", () => {
  render(<MetricCard label="Heart Rate" value={72} unit="bpm" />);
  expect(screen.queryByText("normal")).toBeFalsy();
  expect(screen.queryByText("warning")).toBeFalsy();
  expect(screen.queryByText("critical")).toBeFalsy();
});
