const jwt = require("jsonwebtoken");

exports.tokenVerification = (req, res, next) => {
  const authHeader = req.headers["authorization"];
  const token = req.cookies?.token || (authHeader && authHeader.split(" ")[1]);

  if (!token) return res.status(401).json({ message: "Token missing" });

  jwt.verify(token, process.env.JWT_SECRET_KEY, (err, decoded) => {
    if (err)
      return res.status(403).json({ message: "invalid or expired token" });
    req.user = decoded;
    next();
  });
};
