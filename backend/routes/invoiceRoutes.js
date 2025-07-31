const express = require("express");
const {
  createInvoice,
  getAllInvoices,
  getInvoiceById,
  deleInvoice,
  editInvoice,
} = require("../controllers/invoiceController");

const router = express.Router();

router.post("/", createInvoice);
router.get("/", getAllInvoices);
router.get("/:id", getInvoiceById);
router.delete("/:id", deleInvoice);
router.put("/:id", editInvoice);

module.exports = router;
