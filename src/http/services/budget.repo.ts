import { pool } from "../../db";

export async function saveBudgetRow(data: {
  income: number;
  expenses: number;
  threshold: number;
  remaining: number;
  alert: boolean;
  message: string;
}) {
  const result = await pool.query(
    `
    INSERT INTO budgets (income, expenses, threshold, remaining, alert, message)
    VALUES ($1, $2, $3, $4, $5, $6)
    RETURNING *
    `,
    [
      data.income,
      data.expenses,
      data.threshold,
      data.remaining,
      data.alert,
      data.message,
    ]
  );

  return result.rows[0];
}

export async function listBudgets() {
  const result = await pool.query(
    `SELECT * FROM budgets ORDER BY created_at DESC LIMIT 20`
  );
  return result.rows;
}
