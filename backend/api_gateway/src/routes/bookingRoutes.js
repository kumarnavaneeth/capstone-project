const express = require("express");
const router = express.Router();
const { createProxyMiddleware } = require("http-proxy-middleware");
const { verifyToken, requireAdmin } = require("../middleware/authMiddleware");
const proxy = createProxyMiddleware({
    target: process.env.BOOKING_SERVICE_URL,
    changeOrigin: true,
});
router.get("/", verifyToken, proxy);
router.post("/", verifyToken, proxy);
router.get("/:id", verifyToken, proxy);
router.delete("/:id", verifyToken, requireAdmin, proxy);
module.exports = router;        