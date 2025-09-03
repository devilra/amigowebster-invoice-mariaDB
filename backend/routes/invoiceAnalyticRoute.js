const express = require("express");
const {
  getTotalAmount,
  totalPaidAmount,
  persistTotalAmount,
  getTotalBalanceAmount,
} = require("../controllers/invoiceAnalytic");
const { authMiddleware } = require("../middlewares/authMiddleware");

const router = express.Router();

router.get("/total-amount", authMiddleware, getTotalAmount);
router.get("/total-paid-amount", authMiddleware, totalPaidAmount);
//router.get("/invoice-persist-paid-amount", persistTotalAmount);
router.get("/total-balance", authMiddleware, getTotalBalanceAmount);

module.exports = router;
