const express = require("express");
const router = express.Router();
const { createProxyMiddleware } = require("http-proxy-middleware");
const { verifyToken, requireAdmin } = require("../middleware/authMiddleware");
const proxy = createProxyMiddleware({
    target: process.env.USER_SERVICE_URL,
    changeOrigin: true,
    pathRewrite: { "^/admin/login": "/api/v1.0/flight/admin/login" },
    parseReqBody: false,
    on: {
        proxyReq: (proxyReq, request, response) => {
            console.log(`Proxying: ${request.method} ${request.url} → ${process.env.USER_SERVICE_URL}`);
        },
        error: (err, request, response) => {
            console.error("Proxy error:", err.message);
            response.status(500).json({ message: "Proxy error", error: err.message });
        },
    },
});
router.post("/register", proxy);
router.post("/login", proxy);
router.post("/admin/login", proxy);

router.get("/profile", verifyToken, proxy);
router.get("/admin/profile", verifyToken, requireAdmin, proxy);
module.exports = router;