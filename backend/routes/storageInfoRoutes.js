const express = require("express");
const mongoose = require("mongoose");

const router = express.Router();

router.get("/storage-info", async (req, res) => {
  try {
    const db = mongoose.connection.db;

    // Fetch DB stats
    const stats = await db.stats();
    console.log("MongoDB Stats:", stats);

    // Custom Max Storage Limit (500 MB)
    const maxLimit = 500 * 1024 * 1024; // 500 MB in bytes
    const dataSize = Number(stats.dataSize) || 0; // Convert to number
    const freeSpace = maxLimit - dataSize > 0 ? maxLimit - dataSize : 0;

    // Percentages
    const freePercent = maxLimit > 0 ? ((freeSpace / maxLimit) * 100).toFixed(2) : "0.00";
    const usedPercent = maxLimit > 0 ? ((dataSize / maxLimit) * 100).toFixed(2) : "0.00";

    // Debugging
    console.log("DEBUG =>", { dataSize, maxLimit, freeSpace, freePercent, usedPercent });

    // Response
    res.json({
  storageSize: ((maxLimit / 1024) / 1024).toFixed(2) + " MB",
  dataSize: ((dataSize / 1024) / 1024).toFixed(4) + " MB",
  freeSpace: ((freeSpace / 1024) / 1024).toFixed(2) + " MB",
  freePercent: freePercent + "%",
  usedPercent: usedPercent + "%"
});

  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error fetching storage info" });
  }
});

module.exports = router;
