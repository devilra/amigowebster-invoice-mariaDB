const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const crypto = require("crypto");
const User = require("../models/User");

exports.register = async (req, res) => {
  const { name, email, password } = req.body;

  try {
    const userExist = await User.findOne({ where: { email } });
    if (userExist) return res.status(400).json({ msg: "User already exists" });

    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = await User.create({
      name,
      email,
      password: hashedPassword,
    });
    res.status(201).json({
      msg: "User registered",
      newUser: {
        id: newUser.id,
        name: newUser.name,
        email: newUser.email,
      },
    });
  } catch (error) {
    res.status(500).json({ msg: "Server error", error: error.message });
  }
};

exports.login = async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await User.findOne({ where: { email } });
    if (!user) return res.status(404).json({ msg: "User not found" });

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return res.status(401).json({ msg: "Invalid credentials" });

    const token = jwt.sign(
      { id: user.id, role: user.role },
      process.env.JWT_SECRET,
      {
        expiresIn: "7d",
      }
    );

    //console.log(token);

    res.cookie("token", token, {
      httpOnly: true,
      secure: true, // localhost ku false, deploy panna true
      sameSite: "none",
      path: "/", // ✅ ensure cookie works for all routes
      maxAge: 7 * 24 * 60 * 60 * 1000,
    });

    res.status(200).json({
      msg: "Login successful",
      user: {
        id: user.id,
        name: user.name,
        email: user.email,
        role: user.role,
      },
    });
  } catch (error) {
    res.status(500).json({ msg: "Server error", error: error.message });
  }
};

exports.logout = async (req, res) => {
  res.clearCookie("token", {
    httpOnly: true,
    sameSite: "none",
    secure: true,
    path: "/", // ✅ clear cookie correctly
  });
  res.status(200).json({ msg: "Logged out successfully" });
};

exports.getMe = async (req, res) => {
  try {
    const user = await User.findByPk(req.user._id, {
      attributes: { exclude: ["password"] },
    });
    if (!user) return res.status(404).json({ msg: "User not found" });
    res.status(200).json({ user });
  } catch (error) {
    res.status(500).json({ msg: "Server error", error: error.message });
  }
};

exports.updateProfile = async (req, res) => {
  try {
    const { name, email } = req.body;
    const user = await User.findByPk(req.user.id);
    if (!user) return res.status(404).json({ msg: "User not found" });

    // email update panna try pannuraangala check pannunga
    if (email && email !== user.email) {
      const emailExist = await User.findOne({ where: { email } });
      if (emailExist) {
        return res.status(400).json({ msg: "Email already taken" });
      }
      user.email = email;
    }

    if (name) user.name = name;

    await user.save();

    res.status(200).json({
      msg: "Profile updated successfully",
      user: {
        id: user.id,
        name: user.name,
        email: user.email,
        role: user.role,
      },
    });
  } catch (error) {
    res.status(500).json({ msg: "Server error", error: error.message });
  }
};

exports.changePassword = async (req, res) => {
  try {
    const { currentPassword, newPassword } = req.body;
    const user = await User.findByPk(req.user.id);
    if (!user) return res.status(404).json({ msg: "User not found" });

    // current password check
    const isMatch = await bcrypt.compare(currentPassword, user.password);
    if (!isMatch)
      return res.status(400).json({ msg: "Current password is incorrect" });

    // hash new password
    const hashedPassword = await bcrypt.hash(newPassword, 10);
    user.password = hashedPassword;

    await user.save();
    res.status(200).json({ msg: "Password changed successfully" });
  } catch (error) {
    res.status(500).json({ msg: "Server error", error: error.message });
  }
};

// exports.forgotPassword = async (req, res) => {
//   try {
//     const { email } = req.body;
//     const user = await User.findOne({ email });
//     if (!user) return res.status(404).json({ msg: "User not found" });

//     // generate token

//     const resetToken = crypto.randomBytes(32).toString("hex");
//     const resetTokenHash = crypto
//       .createHash("sha256")
//       .update(resetToken)
//       .digest("hex");

//     // save token + expiry (15 mins)

//     user.resetPasswordToken = resetToken;
//     user.resetPasswordExpire = Date.now() + 15 * 60 * 1000;
//     await user.save();

//     const resetURL = ``;
//   } catch (error) {}
// };
