const express = require("express");
const {
  register,
  login,
  getMe,
  logout,
  updateProfile,
  changePassword,
} = require("../controllers/authController");
const User = require("../models/User");
const {
  authMiddleware,
  adminMiddleware,
} = require("../middlewares/authMiddleware");
const { forgotPassword } = require("../controllers/forgotPassword");
const { resetPassword } = require("../controllers/resetPassword");

const router = express.Router();

router.post("/register", register);
router.post("/login", login);
router.post("/forgot-password", forgotPassword);
router.get("/me", authMiddleware, getMe);
// router.get("/", async (req, res) => {
//   const users = await User.find();
//   res.json(users);
// });
router.get("/all-users", authMiddleware, adminMiddleware, async (req, res) => {
  const users = await User.find().select("-password");
  res.json(users);
});

router.get("/logout", logout);
router.put("/update-profile", authMiddleware, updateProfile);
router.put("/change-password", authMiddleware, changePassword);
router.put("/reset-password/:token", resetPassword);

module.exports = router;
