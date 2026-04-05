const RecordModel = require("../models/Record");

exports.getSummary = async (req, res) => {
  const base = { isDeleted: false };

  const [income, expense, categories, monthly] = await Promise.all([
    RecordModel.aggregate([{ $match: { ...base, type: "income" } }, { $group: { _id: null, total: { $sum: "$amount" } } }]),
    RecordModel.aggregate([{ $match: { ...base, type: "expense" } }, { $group: { _id: null, total: { $sum: "$amount" } } }]),
    RecordModel.aggregate([{ $match: base }, { $group: { _id: "$category", total: { $sum: "$amount" } } }]),
    RecordModel.aggregate([
      { $match: base },
      { $group: { _id: { $month: "$date" }, total: { $sum: "$amount" } } },
      { $sort: { "_id": 1 } }
    ])
  ]);

  const totalIncome = income[0]?.total || 0;
  const totalExpense = expense[0]?.total || 0;

  res.json({ totalIncome, totalExpense, net: totalIncome - totalExpense, categories, monthly });
};