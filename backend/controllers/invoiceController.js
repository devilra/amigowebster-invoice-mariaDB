const Invoice = require("../models/Invoice");

exports.createInvoice = async (req, res) => {
  try {
    const lastInvoice = await Invoice.findOne().sort({ invoiceNumber: -1 });
    let newNumber = 1;

    if (lastInvoice && lastInvoice.invoiceNumber) {
      const lastNumber = parseInt(
        lastInvoice.invoiceNumber.replace("INV", ""),
        10
      );
      newNumber = lastNumber + 1;
    }

    const autoInvoiceNumber = `INV${newNumber.toString().padStart(4, "0")}`;

    const invoice = new Invoice({
      ...req.body,
      invoiceNumber: autoInvoiceNumber,
    });

    await invoice.save();

    res.status(201).json({
      msg: "Invoice save Successfull",
      invoice,
    });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

exports.getAllInvoices = async (req, res) => {
  try {
    const invoices = await Invoice.find().sort({ createAt: -1 });
    if (invoices.length === 0) {
      return res.json({
        msg: "No invoices",
      });
    }
    res.json(invoices);
  } catch (error) {
    res.status(500).json({ message: err.message });
  }
};

exports.getInvoiceById = async (req, res) => {
  try {
    const invoice = await Invoice.findById(req.params.id);
    if (!invoice) {
      return res.json({
        msg: "Invoice Not Found",
      });
    }

    res.json(invoice);
  } catch (error) {
    res.status(404).json({ message: "Invoice not found" });
  }
};

exports.deleInvoice = async (req, res) => {
  try {
    const invoice = await Invoice.findById(req.params.id);
    if (!invoice) {
      return res.json({
        msg: "Invoice Not Found",
      });
    }
    await Invoice.findByIdAndDelete(req.params.id);
    res.json({
      msg: "Invoice Deleted Successfully",
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.editInvoice = async (req, res) => {
  try {
    const updated = await Invoice.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });
    res.json(updated);
  } catch (error) {
    res.status(500).json({ msg: error.message });
  }
};
