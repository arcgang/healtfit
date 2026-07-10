import { BodyPartCategory } from "../types/health";

interface BodyPartFilterProps {
  categories: BodyPartCategory[];
  selected: BodyPartCategory | "all";
  onChange: (value: BodyPartCategory | "all") => void;
}

export function BodyPartFilter({ categories, selected, onChange }: BodyPartFilterProps) {
  return (
    <div>
      <button data-active={selected === "all" ? "true" : undefined} onClick={() => onChange("all")}>
        All
      </button>
      {categories.map((cat) => (
        <button
          key={cat}
          data-active={selected === cat ? "true" : undefined}
          onClick={() => onChange(cat)}
        >
          {cat}
        </button>
      ))}
    </div>
  );
}
