const jwt = require("jsonwebtoken");

exports.authMiddleware = (req, res, next) => {
  const token = req.cookies.token;

  if (!token) return res.status(401).json({ msg: "No token, access denied" });

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    //console.log(decoded);
    req.user = { _id: decoded.id, role: decoded.role };
    //console.log(req.user)
    //console.log("middleware finish");
    next();
  } catch (error) {
    res.status(401).json({ msg: "Invalid token" });
  }
};

exports.adminMiddleware = (req, res, next) => {
  try {
    if (req.user && req.user.role === "admin") {
      next();
    } else {
      return res.status(403).json({ msg: "Access denied, Admin only!" });
    }
  } catch (error) {
    return res.status(500).json({ msg: error.message });
  }
};
