const Invoice = require("../models/Invoice");
const mongoose = require("mongoose");

const getCustomers = async (req, res) => {
  try {
    const userId = req.user._id;

    const customers = await Invoice.aggregate([
      { $match: { user: new mongoose.Types.ObjectId(userId) } },
      {
        $group: {
          _id: {
            email: { $ifNull: ["$customerEmail", ""] },
            name: "$customerName",
            address: "$address",
          },
          orders: { $sum: 1 },
          totalAmount: { $sum: "$totalAmount" },
          balanceAmount: { $sum: "$balanceAmount" },
        },
      },
      {
        $project: {
          _id: 0,
          customerName: "$_id.name",
          customerEmail: "$_id.email",
          customerAddress: "$_id.address",
          orders: 1,
          totalAmount: 1,
          balanceAmount: 1,
        },
      },
    ]);

    res.status(200).json(customers);
  } catch (error) {
    console.error("Error fetching customers:", error);
    res.status(500).json({ message: "Server error" });
  }
};

// 🔴 Delete Customer (delete all invoices of that customer)
const deleteCustomer = async (req, res) => {
  try {
    const userId = req.user._id;
    const { customerId } = req.params; // here customerId = email

    await Invoice.deleteMany({
      user: userId,
      customerName: customerId,
    });

    res.status(200).json({ message: "Customer deleted successfully" });
  } catch (error) {
    console.error("Error deleting customer:", error);
    res.status(500).json({ message: "Server error" });
  }
};

module.exports = { getCustomers, deleteCustomer };
