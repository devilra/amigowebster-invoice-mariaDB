const express = require("express");
const upload = require("../middlewares/upload");
const {
  createSetting,
  getMySetting,
} = require("../controllers/settingController");
const { authMiddleware } = require("../middlewares/authMiddleware");
const router = express.Router();

// Create or update setting
router.post("/", authMiddleware, upload.single("logo"), createSetting);

// Get logged-in user's setting
router.get("/", authMiddleware, getMySetting);

module.exports = router;
