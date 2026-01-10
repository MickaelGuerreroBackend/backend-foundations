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
