const mongoose = require("mongoose");

const settingSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true, // yaroda setting nu identify panna
    },
    businessName: {
      type: String,
      required: true,
    },
    businessNumber: {
      type: String,
      required: true,
    },
    address: {
      type: String,
      required: true,
    },
    phone: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
    },
    logo: { type: String }, // cloudinary url save aagum
  },
  { timestamps: true }
);

module.exports = mongoose.model("Setting", settingSchema);
