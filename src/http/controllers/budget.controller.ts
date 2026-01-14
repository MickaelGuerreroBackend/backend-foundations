import { saveBudgetRow, listBudgets } from "../services/budget.repo";
function parseNumber(value: unknown, fieldName: string): number {
  const num = Number(value);

  if (Number.isNaN(num)) {
    throw new Error(`Champ invalide: ${fieldName} doit être un nombre.`);
  }

  return num;
}

import type { Request, Response } from "express";
import { getBudgetResult } from "../services/budget.service";

export function getBudget(req: Request, res: Response) {
  const income = Number(req.query.income);
  const expenses = Number(req.query.expenses);
  const threshold = Number(req.query.threshold);

  try {
    const result = getBudgetResult(income, expenses, threshold);
    res.json(result);
  } catch (error) {
    res.status(400).json({ error: (error as Error).message });
  }
}
export async function postBudget(req: Request, res: Response) {
  try {
    const income = parseNumber(req.body.income, "income");
    const expenses = parseNumber(req.body.expenses, "expenses");
    const threshold = parseNumber(req.body.threshold, "threshold");

    const result = getBudgetResult(income, expenses, threshold);

    const saved = await saveBudgetRow({
      income,
      expenses,
      threshold,
      remaining: result.remaining,
      alert: result.alert,
      message: result.message,
    });

    res.json(saved);
  } catch (error) {
    res.status(400).json({ error: (error as Error).message });
  }
}
export async function getBudgets(req: Request, res: Response) {
  try {
    const rows = await listBudgets();
    res.json(rows);
  } catch (error) {
    res.status(500).json({ error: "DB error" });
  }
}
