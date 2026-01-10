import { computeBudget } from "../../domain/budget";

export function getBudgetResult(
  income: number,
  expenses: number,
  threshold: number
) {
  return computeBudget({
    monthlyIncome: income,
    monthlyFixedExpenses: expenses,
    alertThreshold: threshold,
  });
}
