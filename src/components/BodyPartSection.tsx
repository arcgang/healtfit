import type { BodyPartCategory, HealthMetric } from "../types/health";
import { MetricCard } from "./MetricCard";

interface BodyPartSectionProps {
  title: string;
  bodyPart: BodyPartCategory;
  metrics: HealthMetric[];
}

export function BodyPartSection({ title, metrics }: BodyPartSectionProps) {
  if (metrics.length === 0) return null;

  return (
    <section className="body-part-section">
      <h2 className="section-title">{title}</h2>
      <div className="metrics-grid">
        {metrics.map((metric) => (
          <MetricCard
            key={metric.id}
            label={metric.label}
            value={metric.value}
            unit={metric.unit}
          />
        ))}
      </div>
    </section>
  );
}
