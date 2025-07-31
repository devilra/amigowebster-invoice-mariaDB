const mongoose = require("mongoose");

const productSchema = new mongoose.Schema({
  title: String,
  description: String,
  rate: Number,
  quantity: Number,
  amount: Number,
});

const invoiceSchema = new mongoose.Schema({
  invoiceNumber: {
    type: String,
    required: true,
    unique: true,
  },
  customerName: {
    type: String,
    required: true,
  },
  phone: String,
  address: String,
  invoiceDate: Date,
  products: [productSchema],
  totalAmount: Number,
  paidAmount: Number,
  balanceAmount: Number,
  createAt: {
    type: Date,
    default: Date.now(),
  },
});

module.exports = mongoose.model("Invoice", invoiceSchema);
