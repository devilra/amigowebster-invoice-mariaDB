const express = require("express");
const authMiddleware = require("../middlewares/authMiddleware");
const { getTotalAmount } = require("../controllers/invoiceAnalytic");

const router = express.Router();

router.get("/total-amount", getTotalAmount);

module.exports = router;
