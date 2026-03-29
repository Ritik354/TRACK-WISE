import expenseModel from "../models/expenseModel.js";
import getDateRange from "../utils/dataFilter.js";
import XLSX from "xlsx";
//add expense
export async function addExpense(req, res) {
    const userId = req.user.id;
    const { description, amount, category, date } = req.body;   
    try {
        if (!description || !amount || !category || !date) {
            return res.status(400).json({ message: "Please fill all the fields", success:false });
        }
        const newExpense = new expenseModel({
            userId,
            description,
            amount,
            category,
            date: new Date(date),
        });
        await newExpense.save();
        res.status(201).json({ message: "Expense added successfully", success:true, expense: newExpense });
    }
    catch (error) {
        console.log(error);
        res.status(500).json({ message: "Server error", success:false });
    }
}

//get all expenses of user
export async function getExpenses(req, res) {
    const userId = req.user.id;
    try {
        const expenses = await expenseModel.find({ userId }).sort({ date: -1 });
        res.status(200).json({ expenses, success:true });
    }
    catch (error) {
        console.log(error);
        res.status(500).json({ message: "Server error", success:false });
    }
}

//update expense
export async function updateExpense(req, res) {
    const userId = req.user.id;
    const expenseId = req.params.id;
    const { description, amount } = req.body;
    try {
        const updatedExpense = await expenseModel.findOneAndUpdate(
            { _id: expenseId, userId },
            { description, amount },
            { new: true },
        );
        if (!updatedExpense) {
            return res.status(404).json({ message: "Expense not found", success:false });
        }
        res.json({ message: "Expense updated successfully", success:true, expense: updatedExpense });
    }
    catch (error) {
        console.log(error);
        res.status(500).json({ message: "Server error", success:false });   
        }
}

//delete expense

export async function deleteExpense(req, res) {
    const userId = req.user.id;
    const expenseId = req.params.id;
    try {
        const deletedExpense = await expenseModel.findOneAndDelete({ _id: expenseId, userId });
        if (!deletedExpense) {
            return res.status(404).json({ message: "Expense not found", success:false });
        }
        res.json({ message: "Expense deleted successfully", success:true });
    }
    catch (error) {
        console.log(error);
        res.status(500).json({ message: "Server error", success:false });
    }   
}

//download expenses in excel format
export async function downloadExpenses(req, res) {
  const userId = req.user.id;
  const { description, amount, category, date } = req.body;
  try {
    const expenses = await expenseModel.find({ userId }).sort({ date: -1 });
    const plainData = expenses.map((expense) => ({
      Description: expense.description,
      Amount: expense.amount,
      Category: expense.category,
      Date: new Date(expense.date).toLocaleDateString(),
    }));

    const worksheet = XLSX.utils.json_to_sheet(plainData);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, "Expenses");
    XLSX.writeFile(workbook, "expenses.xlsx");
    res.download("expenses.xlsx");
    console.log(error);
    res.status(500).json({ message: "Server error", success: false });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Server error", success: false });
  }
}

//to get overview of expenses based on date range
export async function getExpenseOverview(req, res) {
    try{
  const userId = req.user.id;
  const { range = "monthly" } = req.query;
  const { startDate, endDate } = getDateRange(range);
  const expenses = await expenseModel
    .find({
      userId,
      date: { $gte: startDate, $lte: endDate },
    })
    .sort({ date: -1 });    
    const totalExpenses = expenses.reduce((acc, cur) => acc + cur.amount, 0);
    const averageExpense = expenses.length > 0 ? totalExpenses / expenses.length : 0;
    const numberOfTransactions = expenses.length;
    res.status(200).json({success:true,data:{ totalExpenses,averageExpense,numberOfTransactions,range }});
}
catch (error) {
    console.log(error);
    res.status(500).json({ message: "Server error", success: false });
  }
}