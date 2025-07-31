const express = require("express");
require("dotenv").config();
const cors = require("cors");
const connectDB = require("./config/db");
const invoiceRoutes = require("./routes/invoiceRoutes");

const app = express();
const PORT = process.env.PORT;

app.use(express.json());
app.use(cors());

app.use("/api/invoices", invoiceRoutes);

app.listen(PORT, () => {
  console.log(`Server Connected ${PORT}`);
  connectDB();
});
