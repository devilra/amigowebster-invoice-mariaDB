const mongoose = require("mongoose");

const totalPaidSchema = new mongoose.Schema({
  user: {
    type:mongoose.Schema.Types.ObjectId,
    ref:"User",
    required:true
  },
  totalPaid: {
    type: Number,
    default: 0,
  },
});

module.exports = mongoose.model("TotalPaid", totalPaidSchema);
