interface MetricCardProps {
  label: string;
  value: string | number;
  unit: string;
  status?: "normal" | "warning" | "critical";
}

const statusClasses: Record<string, string> = {
  normal: "badge-green",
  warning: "badge-yellow",
  critical: "badge-red",
};

export function MetricCard({ label, value, unit, status }: MetricCardProps) {
  return (
    <div className="metric-card">
      <span className="metric-label">{label}</span>
      <div className="metric-value-row">
        <span className="metric-value">{value}</span>
        <span className="metric-unit">{unit}</span>
      </div>
      {status && (
        <span className={`metric-badge ${statusClasses[status]}`}>{status}</span>
      )}
    </div>
  );
}
