import express, { Request, Response } from "express";
import { computeBudget } from "../domain/budget";

const app = express();
const PORT = 3000;

// Route GET /budget
app.get("/budget", (req: Request, res: Response) => {
  const income = Number(req.query.income);
  const expenses = Number(req.query.expenses);
  const threshold = Number(req.query.threshold);

  try {
    const result = computeBudget({
      monthlyIncome: income,
      monthlyFixedExpenses: expenses,
      alertThreshold: threshold,
    });

    res.json(result);
  } catch (error) {
    res.status(400).json({
      error: (error as Error).message,
    });
  }
});

app.listen(PORT, () => {
  console.log(`Express server running on http://localhost:${PORT}`);
});
