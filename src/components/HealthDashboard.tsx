import { useState } from "react";
import { BodyPartCategory } from "../types/health";
import { mockDashboardData } from "../data/mockHealthData";
import { DashboardHeader } from "./DashboardHeader";
import { BodyPartFilter } from "./BodyPartFilter";
import { BodyPartSection } from "./BodyPartSection";

interface HealthDashboardProps {
  userName: string;
}

export function HealthDashboard({ userName }: HealthDashboardProps) {
  const [selectedBodyPart, setSelectedBodyPart] = useState<BodyPartCategory | "all">("all");

  const categories = Array.from(
    new Set(mockDashboardData.metrics.map((m) => m.category))
  ) as BodyPartCategory[];

  const visibleCategories =
    selectedBodyPart === "all" ? categories : categories.filter((c) => c === selectedBodyPart);

  return (
    <div>
      <DashboardHeader userName={userName} />
      <BodyPartFilter
        categories={categories}
        selected={selectedBodyPart}
        onChange={setSelectedBodyPart}
      />
      {visibleCategories.map((category) => (
        <BodyPartSection
          key={category}
          title={category}
          bodyPart={category}
          metrics={mockDashboardData.metrics.filter((m) => m.category === category)}
        />
      ))}
    </div>
  );
}
