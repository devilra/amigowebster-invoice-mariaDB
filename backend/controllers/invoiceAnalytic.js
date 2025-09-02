// Get TotalAmount customers

const { ObjectId } = require("mongoose").Types;
const Invoice = require("../models/Invoice");
const TotalPaidInvoice = require("../models/totalPaidInvoice");

const mongoose = require("mongoose");

exports.getTotalAmount = async (req, res) => {

  try {
    const userId =
      typeof req.user._id === "string"
        ? new mongoose.Types.ObjectId(req.user._id)
        : req.user._id;
    const totalAmount = await Invoice.aggregate([
      {
        $match: {
        user: userId
        },
      },
      {
        $group: {
          _id: null,
          total: { $sum: "$totalAmount" },
        },
      },
    ]);

    res.json({
      totalAmount: totalAmount.length > 0 ? totalAmount[0].total : 0,
    });
  } catch (error) {
    console.log(error.message);
    res.status(500).json({ message: error.message });
  }
};


//Total Paid Amount

exports.totalPaidAmount = async (req, res) => {
  try {
    const userId =
      typeof req.user._id === "string"
        ? new mongoose.Types.ObjectId(req.user._id)
        : req.user._id;
    const result = await Invoice.aggregate([
      {
        $match: {
           user:userId,
          paidAmount: {
            $gt: 0,
          },
        },
      },
      {
        $group: {
          _id: null,
          totalPaid: {
            $sum: "$paidAmount",
          },
        },
      },
    ]);

    const totalPaid = result.length > 0 ? result[0].totalPaid : 0;
    res.json({ totalPaid });
  } catch (error) {
    console.error("Error fetching total paid amount:", error.message);
    res.status(500).json({ error: "Server error" });
  }
};

// exports.persistTotalAmount = async (req, res) => {
//   try {
//     const record = await TotalPaidInvoice.findOne();
//     res.json({ totalpaid: record ? record.totalPaid : 0 });
//   } catch (error) {
//     res.status(500).json({ error: error.message });
//   }
// };

exports.getTotalBalanceAmount = async (req, res) => {
 

  try {
    const userId =
      typeof req.user._id === "string"
        ? new mongoose.Types.ObjectId(req.user._id)
        : req.user._id;
    const totalBalanceAmount = await Invoice.aggregate([
      {
        $match:{
          user :userId
        }
      },
      {
        $group: {
          _id: null,
          total: {
            $sum: "$balanceAmount",
          },
        },
      },
    ]);

    res.json({
      totalBalanceAmount: totalBalanceAmount[0]?.total || 0,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
