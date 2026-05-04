const express = require("express");
const router = express.Router();
const { createProxyMiddleware } = require("http-proxy-middleware");
const { verifyToken } = require("../middleware/authMiddleware");
const ticketProxy = createProxyMiddleware({
    target: process.env.BOOKING_SERVICE_URL,
    changeOrigin: true,
    parseReqBody: false,
    pathRewrite: (path) => {
        const newPath = `/api/v1.0/flight/booking${path}`;
        console.log(`BOOKING PATH: ${path} → ${newPath}`);
        return newPath;
    },
    on: {
        proxyReq: (proxyReq, request) => {
            console.log(`BOOKING PROXYING TO: ${process.env.BOOKING_SERVICE_URL}${proxyReq.path}`);
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
const ticketInfoProxy = createProxyMiddleware({
    target: process.env.BOOKING_SERVICE_URL,
    changeOrigin: true,
    parseReqBody: false,
    pathRewrite: (path) => {
        const newPath = `/api/v1.0/flight${path}`;
        console.log(`TICKET PATH: ${path} → ${newPath}`);
        return newPath;
    },
    on: {
        proxyReq: (proxyReq, request) => {
            console.log(`TICKET PROXYING TO: ${process.env.BOOKING_SERVICE_URL}${proxyReq.path}`);
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
// public routes
router.get("/ticket/:pnr", ticketInfoProxy);
// protected routes
router.post("/:flightId", verifyToken, ticketProxy);
router.patch("/cancel/:pnr", verifyToken, ticketProxy);
router.get("/history/:userId", verifyToken, ticketProxy);

module.exports = router;