import { Router } from "express";
import { getBudget } from "../controllers/budget.controller";

export const budgetRouter = Router();

budgetRouter.get("/budget", getBudget);
