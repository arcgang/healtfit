import { render, screen, fireEvent } from "@testing-library/react";
import { BodyPartFilter } from "./BodyPartFilter";
import { BodyPartCategory } from "../types/health";

const categories = [
  BodyPartCategory.cardiovascular,
  BodyPartCategory.metabolic,
  BodyPartCategory.renal,
];

test("renders an All button", () => {
  render(
    <BodyPartFilter
      categories={categories}
      selected="all"
      onChange={() => {}}
    />
  );
  expect(screen.getByRole("button", { name: "All" })).toBeTruthy();
});

test("renders a button for each category", () => {
  render(
    <BodyPartFilter
      categories={categories}
      selected="all"
      onChange={() => {}}
    />
  );
  for (const cat of categories) {
    expect(screen.getByRole("button", { name: cat })).toBeTruthy();
  }
});

test("calls onChange with the correct category when a category button is clicked", () => {
  const onChange = vi.fn();
  render(
    <BodyPartFilter
      categories={categories}
      selected="all"
      onChange={onChange}
    />
  );
  fireEvent.click(screen.getByRole("button", { name: BodyPartCategory.metabolic }));
  expect(onChange).toHaveBeenCalledWith(BodyPartCategory.metabolic);
});

test("calls onChange with 'all' when the All button is clicked", () => {
  const onChange = vi.fn();
  render(
    <BodyPartFilter
      categories={categories}
      selected={BodyPartCategory.cardiovascular}
      onChange={onChange}
    />
  );
  fireEvent.click(screen.getByRole("button", { name: "All" }));
  expect(onChange).toHaveBeenCalledWith("all");
});

test("highlights the All button when selected is 'all'", () => {
  render(
    <BodyPartFilter
      categories={categories}
      selected="all"
      onChange={() => {}}
    />
  );
  const allButton = screen.getByRole("button", { name: "All" });
  expect(allButton.getAttribute("data-active")).toBe("true");
});

test("does not highlight category buttons when selected is 'all'", () => {
  render(
    <BodyPartFilter
      categories={categories}
      selected="all"
      onChange={() => {}}
    />
  );
  for (const cat of categories) {
    const btn = screen.getByRole("button", { name: cat });
    expect(btn.getAttribute("data-active")).not.toBe("true");
  }
});

test("highlights the selected category button", () => {
  render(
    <BodyPartFilter
      categories={categories}
      selected={BodyPartCategory.renal}
      onChange={() => {}}
    />
  );
  const renalButton = screen.getByRole("button", { name: BodyPartCategory.renal });
  expect(renalButton.getAttribute("data-active")).toBe("true");
});

test("does not highlight the All button when a category is selected", () => {
  render(
    <BodyPartFilter
      categories={categories}
      selected={BodyPartCategory.renal}
      onChange={() => {}}
    />
  );
  const allButton = screen.getByRole("button", { name: "All" });
  expect(allButton.getAttribute("data-active")).not.toBe("true");
});
