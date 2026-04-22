const jwt = require("jsonwebtoken");
const SECRET = "mysecretkey";
exports.generateToken = (user) => {
  return jwt.sign(
    {
      userId: user.id,
      email: user.email,
      role: user.role,
    },
    SECRET,
    { expiresIn: "1h" }
  );
};