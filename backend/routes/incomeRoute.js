import express from "express";
import { authMiddleware } from "../middleware/auth.js";
import { addIncome, deleteIncome, downloadIncomes, getIncomeOverview, getIncomes, updateIncome } from "../controller/incomeController.js";

const incomeRouter = express.Router();

incomeRouter.post("/add", authMiddleware, addIncome);
incomeRouter.get("/get", authMiddleware, getIncomes);
incomeRouter.put("/update/:id", authMiddleware, updateIncome);
incomeRouter.delete("/delete/:id", authMiddleware, deleteIncome);
incomeRouter.get("/overview", authMiddleware, getIncomeOverview);
incomeRouter.get("/download", authMiddleware, downloadIncomes);
export default incomeRouter;