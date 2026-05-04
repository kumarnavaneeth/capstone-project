const express = require("express");
const router = express.Router();
const { createProxyMiddleware } = require("http-proxy-middleware");
const { verifyToken, requireAdmin } = require("../middleware/authMiddleware");
//proxy user routes
const userProxy = createProxyMiddleware({
    target: process.env.USER_SERVICE_URL + "/api/v1.0/flight/user",
    changeOrigin: true,
    parseReqBody: false,
    on: {
        proxyReq: (proxyReq, request, response) => {
            console.log(`Proxying: ${request.method} ${request.url} → ${process.env.USER_SERVICE_URL}`);
            if (request.rawBody){
                proxyReq.setHeader("Content-Type", "application/json");
                proxyReq.setHeader("Content-Length", Buffer.byteLength(request.rawBody));
                proxyReq.write(request.rawBody);
            }
        },
        error: (error, request, response) => {
            console.error("Proxy error:", error.message);
            response.status(500).json({ message: "Proxy error", error: error.message });
        },
    },
});
//proxy admin routes
const adminProxy = createProxyMiddleware({
    target: process.env.USER_SERVICE_URL + "/api/v1.0/flight",
    changeOrigin: true,
    parseReqBody: false,
    on: {
        proxyReq: (proxyReq, request, response) => {
            console.log(`Proxying: ${request.method} ${request.url} → ${process.env.USER_SERVICE_URL}`);
            if (request.rawBody) { 
                proxyReq.setHeader("Content-Type", "application/json");
                proxyReq.setHeader("Content-Length", Buffer.byteLength(request.rawBody));
                proxyReq.write(request.rawBody);
            }
        },
        error: (error, request, response) => {
            console.error("Proxy error:", error.message);
            response.status(500).json({ message: "Proxy error", error: error.message });
        },
    },
});
// user routes
router.post("/register", userProxy);
router.post("/login", userProxy);
router.get("/profile", verifyToken, userProxy);
// admin routes
router.post("/admin/login", adminProxy);
router.get("/admin/profile", verifyToken, requireAdmin, adminProxy);

module.exports = router;