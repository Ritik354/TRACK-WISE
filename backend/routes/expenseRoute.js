import express from "express";
import { authMiddleware } from "../middleware/auth.js";
import { addExpense, deleteExpense, downloadExpenses, getExpenseOverview, getExpenses, updateExpense } from "../controller/expenseController.js";

const expenseRouter = express.Router();

expenseRouter.post("/add", authMiddleware, addExpense);
expenseRouter.get("/get", authMiddleware, getExpenses);

expenseRouter.put("/update/:id", authMiddleware, updateExpense);
expenseRouter.delete("/delete/:id", authMiddleware, deleteExpense);

expenseRouter.get("/overview", authMiddleware, getExpenseOverview);
expenseRouter.get("/download", authMiddleware, downloadExpenses);

export default expenseRouter;