import { render, screen } from "@testing-library/react";
import { BodyPartSection } from "./BodyPartSection";
import { BodyPartCategory } from "../types/health";
import type { HealthMetric } from "../types/health";

const cardiovascularMetrics: HealthMetric[] = [
  {
    id: "bp-systolic",
    label: "Systolic Blood Pressure",
    value: 118,
    unit: "mmHg",
    category: BodyPartCategory.cardiovascular,
    bodyPart: "heart",
  },
  {
    id: "bp-diastolic",
    label: "Diastolic Blood Pressure",
    value: 76,
    unit: "mmHg",
    category: BodyPartCategory.cardiovascular,
    bodyPart: "heart",
  },
];

test("renders section title", () => {
  render(
    <BodyPartSection
      title="Cardiovascular"
      bodyPart={BodyPartCategory.cardiovascular}
      metrics={cardiovascularMetrics}
    />
  );
  expect(screen.getByText("Cardiovascular")).toBeTruthy();
});

test("renders one MetricCard per metric", () => {
  render(
    <BodyPartSection
      title="Cardiovascular"
      bodyPart={BodyPartCategory.cardiovascular}
      metrics={cardiovascularMetrics}
    />
  );
  expect(screen.getByText("Systolic Blood Pressure")).toBeTruthy();
  expect(screen.getByText("Diastolic Blood Pressure")).toBeTruthy();
  expect(screen.getAllByText("mmHg")).toHaveLength(2);
});

test("renders nothing when metrics array is empty", () => {
  const { container } = render(
    <BodyPartSection
      title="Cardiovascular"
      bodyPart={BodyPartCategory.cardiovascular}
      metrics={[]}
    />
  );
  expect(container.firstChild).toBeFalsy();
});
