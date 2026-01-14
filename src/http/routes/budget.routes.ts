import { Router } from "express";
import {
  getBudget,
  postBudget,
  getBudgets,
} from "../controllers/budget.controller";

export const budgetRouter = Router();

budgetRouter.get("/budget", getBudget);
budgetRouter.post("/budget", postBudget);
budgetRouter.get("/budgets", getBudgets);
