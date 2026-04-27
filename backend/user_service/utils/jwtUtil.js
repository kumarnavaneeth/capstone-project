const jwt = require("jsonwebtoken");
require("dotenv").config();
exports.generateToken = (user) => {
  return jwt.sign(
    {
      userId: user.user_id,
      email: user.email,
      roles: user.roles, //its an array of roles
    },
    process.env.JWT_SECRET,
    { expiresIn: "1h" }
  );
};