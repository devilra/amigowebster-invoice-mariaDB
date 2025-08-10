const express = require("express");
require("dotenv").config();
const cors = require("cors");
const connectDB = require("./config/db");
const cookieParser = require("cookie-parser");
const invoiceRoutes = require("./routes/invoiceRoutes");
const authRoutes = require("./routes/authRoutes.js");
const uploadRoute = require("./routes/uploadRoute");
const analyticRoute = require("./routes/invoiceAnalyticRoute.js");

const app = express();
const PORT = process.env.PORT;

app.use(express.json());
app.use(cookieParser());
app.use(
  cors({
    //origin: "https://mern-invoice-create.vercel.app",
    origin: "http://localhost:5173",
    credentials: true,
  })
);

app.use("/api/invoices", invoiceRoutes);
app.use("/api/auth", authRoutes);
app.use("/api/upload", uploadRoute);
app.use("/api/analytics", analyticRoute);

app.listen(PORT, () => {
  console.log(`Server Connected ${PORT}`);
  connectDB();
});
