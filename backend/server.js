import express from "express";
import "dotenv/config";
import cors from "cors";
import {connectDB} from './config/db.js'
import dns from 'dns'
import userRouter from "./routes/userRoute.js";
import incomeRouter from "./routes/incomeRoute.js";
import dashboardRouter from "./routes/dashboardRoute.js";
import expenseRouter from "./routes/expenseRoute.js";
const app = express();
//change dns server
dns.setServers(["1.1.1.1","8.8.8.8"]);
// MIDDLEWARE
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({extended:true}))
// DATABASE
connectDB();
// ROUTES
app.use("/api/user", userRouter);
app.use("/api/income", incomeRouter);
app.use("/api/expense", expenseRouter);
app.use("/api/dashboard", dashboardRouter);

app.get("/", (req, res) => {
  res.send("Welcome");
});

const PORT = 4000;

app.listen(PORT, () => {
  console.log(`Server is running at ${PORT}`);
});
