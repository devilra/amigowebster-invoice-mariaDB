// Get TotalAmount customers

const Invoice = require("../models/Invoice");

exports.getTotalAmount = async (req, res) => {
  try {
    const totalAmount = await Invoice.aggregate([
      // {
      //   $match: {
      //     user: req.user._id,
      //   },
      // },
      {
        $group: {
          _id: null,
          total: {
            $sum: "$totalAmount",
          },
        },
      },
    ]);

    console.log(totalAmount);

    res.json({
      totalAmount: totalAmount.length > 0 ? totalAmount[0].total : 0,
    });
  } catch (error) {
    console.log(error.message);
    res.status(500).json({ message: error.message });
  }
};
