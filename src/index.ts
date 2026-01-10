import { computeBudget } from "./domain/budget";

function runScenario(
  label: string,
  income: number,
  expenses: number,
  threshold: number
) {
  try {
    const result = computeBudget({
      monthlyIncome: income,
      monthlyFixedExpenses: expenses,
      alertThreshold: threshold,
    });

    console.log(`[${label}] ${result.message}`);
  } catch (error) {
    console.error(`[${label}] Erreur:`, (error as Error).message);
  }
}

runScenario("OK", 2000, 1200, 100);
runScenario("ALERTE", 1500, 1450, 100);
