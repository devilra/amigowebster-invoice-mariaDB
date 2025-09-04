const crypto = require("crypto");
const User = require("../models/User");
const { error } = require("console");
const sendEmail = require("../utils/sendEmail");

const getResetPasswordTemplate = (resetURL, userName) => {
  return `
  <!DOCTYPE html>
  <html>
    <head>
      <meta charset="UTF-8" />
      <title>Password Reset</title>
      <style>
        body { font-family: Arial, sans-serif; background: #f4f4f4; margin: 0; padding: 0; }
        .container { max-width: 600px; margin: 30px auto; background: #fff; padding: 20px; border-radius: 8px; box-shadow: 0 2px 6px rgba(0,0,0,0.1); }
        .header { text-align: center; padding: 10px 0; }
        .header h2 { color: #333; }
        .content { font-size: 16px; line-height: 1.6; color: #555; }
        .btn { display: inline-block; margin: 20px 0; padding: 12px 24px; background: #007bff; color: #fff; text-decoration: none; border-radius: 5px; font-weight: bold; }
        .footer { font-size: 12px; text-align: center; color: #999; margin-top: 30px; }
      </style>
    </head>
    <body>
      <div class="container">
        <div class="header">
          <h2>Password Reset Request</h2>
        </div>
        <div class="content">
          <p>Hi <b>${userName}</b>,</p>
          <p>You requested to reset your password. Please click the button below to reset it. This link is valid only for <b>15 minutes</b>.</p>
          <a href="${resetURL}" class="btn" target="_blank">Reset Password</a>
          <p>If you didn’t request this, please ignore this email. Your password will remain safe.</p>
        </div>
        <div class="footer">
          <p>© ${new Date().getFullYear()} YourApp. All rights reserved.</p>
        </div>
      </div>
    </body>
  </html>
  `;
};

exports.forgotPassword = async (req, res) => {
  const { email } = req.body;

  try {
    const user = await User.findOne({ email });
    if (!user) return res.status(404).json({ msg: "User not found" });

    // generate token
    const resetToken = crypto.randomBytes(32).toString("hex");
    const resetTokenHash = crypto
      .createHash("sha256")
      .update(resetToken)
      .digest("hex");

    // save token + expiry (15 mins)

    const local = process.env.LOCALHOST_CLIENT_URL;
    const production = process.env.PRODUCTION_CLIENT_URL;

    user.resetPasswordToken = resetTokenHash;
    user.resetPasswordExpire = Date.now() + 15 * 60 * 1000;

    console.log(resetToken, resetTokenHash);

    await user.save();

    const resetUrl = `${production}/reset-password/${resetToken}`;
    const message = getResetPasswordTemplate(resetUrl, error.name);

    // send email

    await sendEmail({
      email: user.email,
      subject: "Password Reset Request",
      message,
    });

    res.status(200).json({ msg: "Password reset link sent to email" });
  } catch (error) {
    res.status(500).json({ msg: "Server error", error: error.message });
  }
};
