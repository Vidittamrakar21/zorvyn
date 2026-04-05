
const Record = require("../models/Record");

exports.createRecord = async (req, res) => {
  const record = await Record.create({ ...req.body, userId: req.user.id });
  res.status(201).json(record);
};

exports.getRecords = async (req, res) => {
  const { type, category, startDate, endDate, page = 1, limit = 10, search } = req.query;

  let filter = { isDeleted: false };
  if (type) filter.type = type;
  if (category) filter.category = category;

  if (startDate && endDate) {
    if (new Date(startDate) > new Date(endDate)) {
      return res.status(400).json({ message: "Invalid date range" });
    }
    filter.date = { $gte: new Date(startDate), $lte: new Date(endDate) };
  }

  if (search) filter.notes = { $regex: search, $options: "i" };

  const records = await Record.find(filter)
    .skip((page - 1) * limit)
    .limit(Number(limit))
    .sort({ createdAt: -1 });

  const total = await Record.countDocuments(filter);

  res.json({ total, page: Number(page), records });
};

exports.updateRecord = async (req, res) => {
  const record = await Record.findByIdAndUpdate(req.params.id, req.body, { new: true });
  res.json(record);
};

exports.deleteRecord = async (req, res) => {
  await Record.findByIdAndUpdate(req.params.id, { isDeleted: true });
  res.json({ message: "Deleted" });
};