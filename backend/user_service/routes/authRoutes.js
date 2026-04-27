const express = require("express");
const router = express.Router();
const authController = require("../controllers/authController");
const { verifyToken, requireAdmin } = require("../middleware/authMiddleware");

//public routes
router.post("/user/register", authController.register);
router.post("/user/login", authController.login);
router.post("/admin/login", authController.login);

//protected routes for users 
router.get("/user/profile", verifyToken, (request, response) => {
  response.json({ message: "profile fetched", user: request.user });
});

//protected routes for admin
router.get("/admin/profile", verifyToken, requireAdmin, (request, response) => {
  response.json({ message: "admin access granted", requestedBy: request.user });
});
router.get("/test", (request, response) => {
  response.send("Auth routes working");
});
module.exports = router;