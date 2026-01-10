// JOUR 3 — Mini moteur Budget (backend logique)

// 1) On définit la forme des données qu'on attend.
// (Comme une "fiche" obligatoire)
interface BudgetInput {
  monthlyIncome: number; // revenus mensuels
  monthlyFixedExpenses: number; // dépenses fixes mensuelles
  alertThreshold: number; // seuil d'alerte (ex: 100)
}

// 2) On définit la forme du résultat qu'on veut obtenir.
interface BudgetResult {
  remaining: number; // reste à vivre
  alert: boolean; // alerte déclenchée ou non
  message: string; // message lisible pour l'humain
}

// 3) Fonction principale : elle applique tes règles.
function computeBudget(input: BudgetInput): BudgetResult {
  // Règle de sécurité 1 : un revenu doit être > 0
  if (input.monthlyIncome <= 0) {
    throw new Error("Revenu mensuel invalide (doit être > 0).");
  }

  // Règle de sécurité 2 : les dépenses fixes ne peuvent pas être négatives
  if (input.monthlyFixedExpenses < 0) {
    throw new Error(
      "Dépenses fixes invalides (ne peuvent pas être négatives)."
    );
  }

  // Règle de sécurité 3 : le seuil d'alerte doit être >= 0
  if (input.alertThreshold < 0) {
    throw new Error("Seuil d'alerte invalide (doit être >= 0).");
  }

  // Ta règle métier : reste à vivre = revenus - dépenses fixes
  const remaining = input.monthlyIncome - input.monthlyFixedExpenses;

  // Ta règle métier : alerte si reste <= seuil
  const alert = remaining <= input.alertThreshold;

  const message = alert
    ? `⚠️ Alerte : il ne te reste que ${remaining}€ (seuil ${input.alertThreshold}€).`
    : `✅ OK : il te reste ${remaining}€ (seuil ${input.alertThreshold}€).`;

  return { remaining, alert, message };
}

// 4) Test (comme si une appli envoyait des données au backend)
try {
  const result = computeBudget({
    monthlyIncome: 0,
    monthlyFixedExpenses: 100,
    alertThreshold: 100,
  });

  console.log(result.message);
} catch (error) {
  console.error("Erreur:", (error as Error).message);
}
