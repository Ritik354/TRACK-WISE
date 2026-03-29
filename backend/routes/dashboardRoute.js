import express from "express";

import { authMiddleware } from "../middleware/auth.js";
import { getDashboardData } from "../controller/dashboardController.js";

const dashboardRouter = express.Router();

dashboardRouter.get("/", authMiddleware, getDashboardData);

export default dashboardRouter;