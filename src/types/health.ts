export enum BodyPartCategory {
  cardiovascular = "cardiovascular",
  metabolic = "metabolic",
  renal = "renal",
  blood = "blood",
}

export interface HealthMetric {
  id: string;
  label: string;
  value: number;
  unit: string;
  category: BodyPartCategory;
  bodyPart: string;
}

export type DashboardData = {
  metrics: HealthMetric[];
};
