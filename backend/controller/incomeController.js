import incomeModel from "../models/incomeModel.js";
import XLSX from "xlsx";
import getDateRange from "../utils/dataFilter.js";
//add income

export async function addIncome(req, res) {
  const userId = req.user.id;
  const { description, amount, category, date } = req.body;
  try {
    if (!description || !amount || !category || !date) {
      return res
        .status(400)
        .json({ message: "Please fill all the fields", success: false });
    }
    const newIncome = new incomeModel({
      userId,
      description,
      amount,
      category,
      date: new Date(date),
    });
    await newIncome.save();
    res.status(201).json({
      message: "Income added successfully",
      success: true,
      income: newIncome,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Server error", success: false });
  }
}

//get all income of user
export async function getIncomes(req, res) {
  const userId = req.user.id;
  try {
    const incomes = await incomeModel.find({ userId }).sort({ date: -1 });
    res.status(200).json({ incomes, success: true });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Server error", success: false });
  }
}

//update income
export async function updateIncome(req, res) {
  const userId = req.user.id;
  const incomeId = req.params.id;
  const { description, amount } = req.body;
  try {
    const updatedIncome = await incomeModel.findOneAndUpdate(
      { _id: incomeId, userId },
      { description, amount },
      { new: true },
    );
    if (!updatedIncome) {
      return res
        .status(404)
        .json({ message: "Income not found", success: false });
    }
    res.json({
      message: "Income updated successfully",
      success: true,
      income: updatedIncome,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Server error", success: false });
  }
}

//delete income
export async function deleteIncome(req, res) {
  try {
    const income = await incomeModel.findOneAndDelete({
      _id: req.params.id,
      userId: req.user.id,
    });
    if (!income) {
      return res
        .status(404)
        .json({ message: "Income not found", success: false });
    }
    return res.json({ message: "Income deleted successfully", success: true });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Server error", success: false });
  }
}
//to download income data as excel file
export async function downloadIncomes(req, res) {
  const userId = req.user.id;
  const { description, amount, category, date } = req.body;
  try {
    const incomes = await incomeModel.find({ userId }).sort({ date: -1 });
    const plainData = incomes.map((income) => ({
      Description: income.description,
      Amount: income.amount,
      Category: income.category,
      Date: new Date(income.date).toLocaleDateString(),
    }));

    const worksheet = XLSX.utils.json_to_sheet(plainData);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, "Incomes");
    XLSX.writeFile(workbook, "incomes.xlsx");
    res.download("incomes.xlsx");
    console.log(error);
    res.status(500).json({ message: "Server error", success: false });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Server error", success: false });
  }
}


//income overview for dashboard
export async function getIncomeOverview(req, res) {
    try{
  const userId = req.user.id;
  const { range = "monthly" } = req.query;
  const { startDate, endDate } = getDateRange(range);
  const incomes = await incomeModel
    .find({
      userId,
      date: { $gte: startDate, $lte: endDate },
    })
    .sort({ date: -1 });    
    const totalIncome = incomes.reduce((acc, cur) => acc + cur.amount, 0);
    const averageIncome = incomes.length > 0 ? totalIncome / incomes.length : 0;
    const numberOfTransactions = incomes.length;
    res.status(200).json({success:true,data:{ totalIncome,averageIncome,numberOfTransactions,range }});
}
catch (error) {
    console.log(error);
    res.status(500).json({ message: "Server error", success: false });
  }
}