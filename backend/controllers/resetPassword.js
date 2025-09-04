const crypt = require("crypto");
const User = require("../models/User");
const bcrypt = require("bcryptjs");

exports.resetPassword = async (req, res) => {
  try {
    const { token } = req.params; // raw token from URL
    const { newPassword } = req.body;

    // hash the token (because we stored hashed token in DB)

    const resetTokenHash = crypto
      .createHash("sha256")
      .update(token)
      .digest("hex");

    // find user with this token + not expired

    const user = await User.findOne({
      resetPasswordToken: resetTokenHash,
      resetPasswordExpire: {
        $gt: Date.now(), // expiry check
      },
    });

    if (!user) {
      return res.status(400).json({ msg: "Invalid or expired token" });
    }

    // hash new password
    const hashedPassword = await bcrypt.hash(newPassword, 10);

    // update password
    user.password = hashedPassword;
    user.resetPasswordToken = undefined; //clean token
    user.resetPasswordExpire = undefined;

    await user.save();
    res.status(200).json({ msg: "Password reset successful" });
  } catch (error) {
    res.status(500).json({ msg: "Server error", error: error.message });
  }
};
