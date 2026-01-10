import express from "express";
import { budgetRouter } from "./routes/budget.routes";

export const app = express();
app.use(express.json());
app.use(budgetRouter);
