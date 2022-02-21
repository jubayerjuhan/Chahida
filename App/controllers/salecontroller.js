const Sale = require("../models/salemodel.js");
const catchAsyncError = require("../Utils/catchAsyncError.js");

exports.addSale = catchAsyncError(async (req, res, next) => {
  const {
    customerType,
    name,
    paymentMethod,
    saleItems,
    priceBreakdown,
    note,
  } = req.body;

  const sale = new Sale({
    customerType,
    name,
    paymentMethod,
    saleItems,
    priceBreakdown,
    note
  });
  await sale.save();
  res.status(201).json({
    success: true,
    sale,
  });

})


exports.getAllSale = catchAsyncError(async (req, res, next) => {
  const { time } = req.query;

  if (time === 'today') {
    const today = new Date();
    const startOfToday = new Date(today.getFullYear(), today.getMonth(), today.getDate());
    const endOfToday = new Date(today.getFullYear(), today.getMonth(), today.getDate() + 1);

    const sale = await Sale.find({ createdAt: { $gte: startOfToday, $lt: endOfToday } }).populate("saleItems.product");
    res.status(200).json({
      success: true,
      sale,
    });
  }

  if (time === 'week') {
    const day = new Date();
    day.setDate(day.getDate() - 7);

    const sale = await Sale.find({ createdAt: { $gte: day } }).populate("saleItems.product");
    res.status(200).json({
      success: true,
      sale,
    });
  }

  if (time === 'month') {
    const day = new Date();
    day.setDate(day.getDate() - 30);
    console.log(day);

    const sale = await Sale.find({ createdAt: { $gte: day } }).populate("saleItems.product");
    res.status(200).json({
      success: true,
      sale,
    });
  }


  const sale = await Sale.find().populate("saleItems.product");
  res.status(201).json({
    success: true,
    sale,
  });

})