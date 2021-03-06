const Expense = require("../models/expenseModel.js");
const catchAsyncError = require("../Utils/catchAsyncError.js");

exports.addExpense = catchAsyncError(async (req, res, next) => {
  const {
    supplier,
    discount,
    totalAmount,
    recivedItems,
  } = req.body;

  const expense = await new Expense({
    supplier,
    discount,
    totalAmount,
    recivedItems,
  }).save();

  res.status(201).json({
    success: true,
    expense,
  });

})



exports.getAllExpense = catchAsyncError(async (req, res, next) => {
  const { time } = req.query;

  if (time === 'today') {
    const today = new Date();
    const startOfToday = new Date(today.getFullYear(), today.getMonth(), today.getDate());
    const endOfToday = new Date(today.getFullYear(), today.getMonth(), today.getDate() + 1);

    const expense = await Expense.find({ createdAt: { $gte: startOfToday, $lt: endOfToday } }).populate("recivedItems.product");
    res.status(200).json({
      success: true,
      expense,
    });
  }

  if (time === 'week') {
    const day = new Date();
    day.setDate(day.getDate() - 7);

    const expense = await Expense.find({ createdAt: { $gte: day } }).populate("recivedItems.product");
    res.status(200).json({
      success: true,
      expense,
    });
  }

  if (time === 'month') {
    const day = new Date();
    day.setDate(day.getDate() - 30);

    const expense = await Expense.find({ createdAt: { $gte: day } }).populate("recivedItems.product");
    res.status(200).json({
      success: true,
      expense,
    });
  }

  const expense = await Expense.find().populate("recivedItems.product");
  res.status(200).json({
    success: true,
    expense,
  });

})