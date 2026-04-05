const mongoose = require("mongoose");

const recordSchema = new mongoose.Schema(
    {
      userId: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
      amount: { type: Number, required: true },
      type: { type: String, enum: ["income", "expense"], required: true },
      category: String,
      date: { type: Date, required: true },
      notes: String,
      isDeleted: { type: Boolean, default: false },
    },
    { timestamps: true }
  );
  module.exports = mongoose.model("Record", recordSchema);