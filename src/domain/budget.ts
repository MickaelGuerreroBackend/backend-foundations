// src/domain/budget.ts

export interface BudgetInput {
  monthlyIncome: number;
  monthlyFixedExpenses: number;
  alertThreshold: number;
}

export interface BudgetResult {
  remaining: number;
  alert: boolean;
  message: string;
}

export function computeBudget(input: BudgetInput): BudgetResult {
  if (input.monthlyIncome <= 0) {
    throw new Error("Revenu mensuel invalide (doit être > 0).");
  }

  if (input.monthlyFixedExpenses < 0) {
    throw new Error(
      "Dépenses fixes invalides (ne peuvent pas être négatives)."
    );
  }

  if (input.alertThreshold < 0) {
    throw new Error("Seuil d'alerte invalide (doit être >= 0).");
  }

  const remaining = input.monthlyIncome - input.monthlyFixedExpenses;
  const alert = remaining <= input.alertThreshold;

  const message = alert
    ? `⚠️ Alerte : il ne te reste que ${remaining}€ (seuil ${input.alertThreshold}€).`
    : `✅ OK : il te reste ${remaining}€ (seuil ${input.alertThreshold}€).`;

  return { remaining, alert, message };
}
