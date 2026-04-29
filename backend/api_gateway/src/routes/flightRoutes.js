const express = require("express");
const router = express.Router();
const { createProxyMiddleware } = require("http-proxy-middleware");
const { verifyToken, requireAdmin } = require("../middleware/authMiddleware");
const { verify } = require("jsonwebtoken");
const proxy = createProxyMiddleware({
    target: process.env.FLIGHT_SERVICE_URL,
    changeOrigin: true,
});
//public routes
router.get("/search", proxy);
//protected routes
router.get("/", verifyToken, proxy);
router.post("/", verifyToken, requireAdmin, proxy);
router.put("/:id", verifyToken, requireAdmin, proxy);
router.delete("/:id", verifyToken, requireAdmin, proxy);
module.exports = router;