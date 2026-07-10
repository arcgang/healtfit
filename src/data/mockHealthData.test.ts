import { mockDashboardData } from "./mockHealthData";
import { BodyPartCategory } from "../types/health";
import type { DashboardData, HealthMetric } from "../types/health";

describe("mockDashboardData structure", () => {
  test("is exported and conforms to DashboardData type", () => {
    const data: DashboardData = mockDashboardData;
    expect(data).toBeDefined();
    expect(typeof data).toBe("object");
  });

  test("metrics array is non-empty", () => {
    expect(Array.isArray(mockDashboardData.metrics)).toBe(true);
    expect(mockDashboardData.metrics.length).toBeGreaterThan(0);
  });
});

describe("HealthMetric required fields", () => {
  test("every metric has id, label, value, unit, category, bodyPart", () => {
    for (const metric of mockDashboardData.metrics) {
      const m = metric as HealthMetric;
      expect(typeof m.id).toBe("string");
      expect(m.id.length).toBeGreaterThan(0);

      expect(typeof m.label).toBe("string");
      expect(m.label.length).toBeGreaterThan(0);

      expect(typeof m.value).toBe("number");

      expect(typeof m.unit).toBe("string");
      expect(m.unit.length).toBeGreaterThan(0);

      expect(typeof m.category).toBe("string");
      expect(Object.values(BodyPartCategory)).toContain(m.category);

      expect(typeof m.bodyPart).toBe("string");
      expect(m.bodyPart.length).toBeGreaterThan(0);
    }
  });
});

describe("BodyPartCategory enum coverage", () => {
  function metricsForCategory(cat: BodyPartCategory): HealthMetric[] {
    return mockDashboardData.metrics.filter((m) => m.category === cat);
  }

  test("has at least one cardiovascular metric", () => {
    expect(metricsForCategory(BodyPartCategory.cardiovascular).length).toBeGreaterThan(0);
  });

  test("has at least one metabolic metric", () => {
    expect(metricsForCategory(BodyPartCategory.metabolic).length).toBeGreaterThan(0);
  });

  test("has at least one renal metric", () => {
    expect(metricsForCategory(BodyPartCategory.renal).length).toBeGreaterThan(0);
  });

  test("has at least one blood metric", () => {
    expect(metricsForCategory(BodyPartCategory.blood).length).toBeGreaterThan(0);
  });
});

describe("BMI metric", () => {
  function getBMI(): HealthMetric | undefined {
    return mockDashboardData.metrics.find((m) => m.label.toLowerCase().includes("bmi"));
  }

  test("BMI metric exists", () => {
    expect(getBMI()).toBeDefined();
  });

  test("BMI value is in healthy/plausible range (10–50)", () => {
    const bmi = getBMI();
    if (!bmi) return;
    expect(bmi.value).toBeGreaterThanOrEqual(10);
    expect(bmi.value).toBeLessThanOrEqual(50);
  });

  test("BMI unit is kg/m2 or equivalent", () => {
    const bmi = getBMI();
    if (!bmi) return;
    expect(bmi.unit).toMatch(/kg\/m/i);
  });

  test("BMI category is metabolic", () => {
    const bmi = getBMI();
    if (!bmi) return;
    expect(bmi.category).toBe(BodyPartCategory.metabolic);
  });
});

describe("Blood Pressure metrics", () => {
  function getSystolic(): HealthMetric | undefined {
    return mockDashboardData.metrics.find((m) =>
      m.label.toLowerCase().includes("systolic")
    );
  }

  function getDiastolic(): HealthMetric | undefined {
    return mockDashboardData.metrics.find((m) =>
      m.label.toLowerCase().includes("diastolic")
    );
  }

  test("systolic blood pressure metric exists", () => {
    expect(getSystolic()).toBeDefined();
  });

  test("diastolic blood pressure metric exists", () => {
    expect(getDiastolic()).toBeDefined();
  });

  test("systolic value is in plausible range (70–200 mmHg)", () => {
    const s = getSystolic();
    if (!s) return;
    expect(s.value).toBeGreaterThanOrEqual(70);
    expect(s.value).toBeLessThanOrEqual(200);
  });

  test("diastolic value is in plausible range (40–130 mmHg)", () => {
    const d = getDiastolic();
    if (!d) return;
    expect(d.value).toBeGreaterThanOrEqual(40);
    expect(d.value).toBeLessThanOrEqual(130);
  });

  test("systolic is greater than diastolic", () => {
    const s = getSystolic();
    const d = getDiastolic();
    if (!s || !d) return;
    expect(s.value).toBeGreaterThan(d.value);
  });

  test("blood pressure metrics have mmHg unit", () => {
    const s = getSystolic();
    const d = getDiastolic();
    if (s) expect(s.unit).toMatch(/mmhg/i);
    if (d) expect(d.unit).toMatch(/mmhg/i);
  });

  test("blood pressure metrics are cardiovascular category", () => {
    const s = getSystolic();
    const d = getDiastolic();
    if (s) expect(s.category).toBe(BodyPartCategory.cardiovascular);
    if (d) expect(d.category).toBe(BodyPartCategory.cardiovascular);
  });
});

describe("Blood stats metrics", () => {
  function findMetric(keyword: string): HealthMetric | undefined {
    return mockDashboardData.metrics.find((m) =>
      m.label.toLowerCase().includes(keyword.toLowerCase())
    );
  }

  test("haemoglobin metric exists", () => {
    expect(findMetric("haemoglobin") ?? findMetric("hemoglobin")).toBeDefined();
  });

  test("WBC metric exists", () => {
    expect(findMetric("wbc") ?? findMetric("white blood")).toBeDefined();
  });

  test("RBC metric exists", () => {
    expect(findMetric("rbc") ?? findMetric("red blood")).toBeDefined();
  });

  test("platelets metric exists", () => {
    expect(findMetric("platelet")).toBeDefined();
  });

  test("haemoglobin value is in plausible range (5–20 g/dL)", () => {
    const hb = findMetric("haemoglobin") ?? findMetric("hemoglobin");
    if (!hb) return;
    expect(hb.value).toBeGreaterThanOrEqual(5);
    expect(hb.value).toBeLessThanOrEqual(20);
  });

  test("WBC value is in plausible range (1–30 ×10³/µL)", () => {
    const wbc = findMetric("wbc") ?? findMetric("white blood");
    if (!wbc) return;
    expect(wbc.value).toBeGreaterThanOrEqual(1);
    expect(wbc.value).toBeLessThanOrEqual(30);
  });

  test("RBC value is in plausible range (2–8 ×10⁶/µL)", () => {
    const rbc = findMetric("rbc") ?? findMetric("red blood");
    if (!rbc) return;
    expect(rbc.value).toBeGreaterThanOrEqual(2);
    expect(rbc.value).toBeLessThanOrEqual(8);
  });

  test("platelets value is in plausible range (50–500 ×10³/µL)", () => {
    const plt = findMetric("platelet");
    if (!plt) return;
    expect(plt.value).toBeGreaterThanOrEqual(50);
    expect(plt.value).toBeLessThanOrEqual(500);
  });

  test("blood stats metrics are blood category", () => {
    const bloodMetrics = ["haemoglobin", "hemoglobin", "wbc", "white blood", "rbc", "red blood", "platelet"];
    const found = mockDashboardData.metrics.filter((m) =>
      bloodMetrics.some((k) => m.label.toLowerCase().includes(k))
    );
    expect(found.length).toBeGreaterThan(0);
    for (const m of found) {
      expect(m.category).toBe(BodyPartCategory.blood);
    }
  });
});

describe("Kidney function metrics", () => {
  function findMetric(keyword: string): HealthMetric | undefined {
    return mockDashboardData.metrics.find((m) =>
      m.label.toLowerCase().includes(keyword.toLowerCase())
    );
  }

  test("creatinine metric exists", () => {
    expect(findMetric("creatinine")).toBeDefined();
  });

  test("eGFR metric exists", () => {
    expect(findMetric("egfr") ?? findMetric("gfr")).toBeDefined();
  });

  test("BUN metric exists", () => {
    expect(findMetric("bun") ?? findMetric("blood urea")).toBeDefined();
  });

  test("creatinine value is in plausible range (0.3–15 mg/dL)", () => {
    const cr = findMetric("creatinine");
    if (!cr) return;
    expect(cr.value).toBeGreaterThan(0.3);
    expect(cr.value).toBeLessThanOrEqual(15);
  });

  test("eGFR value is in plausible range (5–150 mL/min/1.73m²)", () => {
    const egfr = findMetric("egfr") ?? findMetric("gfr");
    if (!egfr) return;
    expect(egfr.value).toBeGreaterThanOrEqual(5);
    expect(egfr.value).toBeLessThanOrEqual(150);
  });

  test("BUN value is in plausible range (2–100 mg/dL)", () => {
    const bun = findMetric("bun") ?? findMetric("blood urea");
    if (!bun) return;
    expect(bun.value).toBeGreaterThanOrEqual(2);
    expect(bun.value).toBeLessThanOrEqual(100);
  });

  test("kidney function metrics are renal category", () => {
    const renalMetrics = ["creatinine", "egfr", "gfr", "bun", "blood urea"];
    const found = mockDashboardData.metrics.filter((m) =>
      renalMetrics.some((k) => m.label.toLowerCase().includes(k))
    );
    expect(found.length).toBeGreaterThan(0);
    for (const m of found) {
      expect(m.category).toBe(BodyPartCategory.renal);
    }
  });
});

describe("metric id uniqueness", () => {
  test("all metric ids are unique", () => {
    const ids = mockDashboardData.metrics.map((m) => m.id);
    const uniqueIds = new Set(ids);
    expect(uniqueIds.size).toBe(ids.length);
  });
});
