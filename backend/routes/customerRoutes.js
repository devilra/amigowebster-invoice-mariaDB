const express = require("express");
const router = express.Router();
const {
  getCustomers,
  deleteCustomer,
} = require("../controllers/customerController");
const {
  adminMiddleware,
  authMiddleware,
} = require("../middlewares/authMiddleware");

// Get all customers for logged-in user
router.get("/", authMiddleware, getCustomers);

// Delete specific customer (by email or id)
router.delete("/:customerId", authMiddleware, deleteCustomer);

module.exports = router;
