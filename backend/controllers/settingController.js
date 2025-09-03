const Setting = require("../models/setting");

// exports.createSetting = async (req, res) => {
//   try {
//     const userId = req.user._id;
//     const { businessName, businessNumber, address, phone, email } = req.body;

//     let setting = await Setting.findOne({ user: userId });

//     //console.log(setting, req.file);

//     if (setting) {
//       setting.businessName = businessName || setting.businessName;
//       setting.businessNumber = businessNumber || setting.businessNumber;
//       setting.address = address || setting.address;
//       setting.phone = phone || setting.phone;
//       setting.email = email || setting.email;

//       if (req.file) {
//         setting.logo = req.file.path;
//       }

//       console.log("if inside running");

//       await setting.save();
//       const updatedSetting = await Setting.findOne({ user: userId });

//       return res.status(200).json({
//         success: true,
//         message: "Setting updated successfully",
//         updatedSetting,
//       });
//     }

//     console.log("if outside running");

//     setting = new Setting({
//       user: userId,
//       businessName,
//       businessNumber,
//       address,
//       phone,
//       email,
//       logo: req.file ? req.file.path : null,
//     });

//     await setting.save();

//     res.status(201).json({
//       success: true,
//       message: "Setting created successfully",
//       setting,
//     });
//   } catch (error) {
//     res.status(500).json({ success: false, message: error.message });
//   }
// };

exports.createSetting = async (req, res) => {
  try {
    const userId = req.user._id;
    const { businessName, businessNumber, address, phone, email } = req.body;

    let setting = await Setting.findOne({ user: userId });

    if (setting) {
      const updatedSetting = await Setting.findOneAndUpdate(
        { user: userId },
        {
          $set: {
            businessName: businessName || setting.businessName,
            businessNumber: businessNumber || setting.businessNumber,
            address: address || setting.address,
            phone: phone || setting.phone,
            email: email || setting.email,
            ...(req.file && { logo: req.file.path }),
          },
        },
        { new: true } // 👈 ensures latest updated document is returned
      );

      console.log(updatedSetting);

      return res.status(200).json({
        success: true,
        message: "Setting updated successfully",
        setting: updatedSetting,
      });
    }

    // If no setting exists, create new
    const newSetting = await Setting.create({
      user: userId,
      businessName,
      businessNumber,
      address,
      phone,
      email,
      logo: req.file ? req.file.path : null,
    });

    res.status(201).json({
      success: true,
      message: "Setting created successfully",
      setting: newSetting,
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

exports.getMySetting = async (req, res) => {
  try {
    const setting = await Setting.findOne({ user: req.user._id });
    if (!setting) {
      return res
        .status(404)
        .json({ success: false, message: "No settings found" });
    }
    res.status(200).json({ success: true, setting });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};
