import { computeBudget } from "./budget";

describe("computeBudget", () => {
  test("should return OK when remaining is above threshold", () => {
    // Arrange
    const input = {
      monthlyIncome: 2000,
      monthlyFixedExpenses: 1200,
      alertThreshold: 100,
    };

    // Act
    const result = computeBudget(input);

    // Assert
    expect(result.remaining).toBe(800);
    expect(result.alert).toBe(false);
    expect(result.message).toContain("✅ OK");
  });

  test("should return ALERT when remaining is below or equal to threshold", () => {
    const input = {
      monthlyIncome: 1500,
      monthlyFixedExpenses: 1450,
      alertThreshold: 100,
    };

    const result = computeBudget(input);

    expect(result.remaining).toBe(50);
    expect(result.alert).toBe(true);
    expect(result.message).toContain("⚠️ Alerte");
  });

  test("should throw error when monthlyIncome is <= 0", () => {
    const input = {
      monthlyIncome: 0,
      monthlyFixedExpenses: 100,
      alertThreshold: 100,
    };

    expect(() => computeBudget(input)).toThrow("Revenu mensuel invalide");
  });

  test("should throw error when monthlyFixedExpenses is negative", () => {
    const input = {
      monthlyIncome: 1000,
      monthlyFixedExpenses: -1,
      alertThreshold: 100,
    };

    expect(() => computeBudget(input)).toThrow("Dépenses fixes invalides");
  });

  test("should throw error when alertThreshold is negative", () => {
    const input = {
      monthlyIncome: 1000,
      monthlyFixedExpenses: 100,
      alertThreshold: -1,
    };

    expect(() => computeBudget(input)).toThrow("Seuil d'alerte invalide");
  });
});
