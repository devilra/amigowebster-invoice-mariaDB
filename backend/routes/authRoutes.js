const express = require("express");
const {
  register,
  login,
  getMe,
  logout,
} = require("../controllers/authController");
const User = require("../models/User");
const {
  authMiddleware,
  adminMiddleware,
} = require("../middlewares/authMiddleware");

const router = express.Router();

router.post("/register", register);
router.post("/login", login);
router.get("/me", authMiddleware, getMe);
router.get("/all-users", authMiddleware, adminMiddleware, async (req, res) => {
  const users = await User.find().select("-password");
  res.json(users);
});
router.get("/logout", logout);

module.exports = router;
