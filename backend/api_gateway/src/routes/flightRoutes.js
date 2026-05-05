const express = require("express");
const router = express.Router();
const { createProxyMiddleware } = require("http-proxy-middleware");
const { verifyToken, requireAdmin } = require("../middleware/authMiddleware");
router.use((request, response, next) => {
    console.log(`FLIGHT ROUTE HIT: ${request.method} ${request.url}`);
    next();
});
const flightProxy = createProxyMiddleware({
    target: process.env.FLIGHT_SERVICE_URL,
    changeOrigin: true,
    parseReqBody: false,
    pathRewrite: (path) => {
        const newPath = `/api/v1.0/flight${path}`;
        console.log(`PATH RECEIVED: ${path}`);
        console.log(`PATH REWRITTEN: ${newPath}`);
        return newPath;
    },
    on: {
        proxyReq: (proxyReq, request) => {
            console.log(`PROXYING TO: ${process.env.FLIGHT_SERVICE_URL}${proxyReq.path}`);
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
const addFlightProxy = createProxyMiddleware({
    target: process.env.FLIGHT_SERVICE_URL,
    changeOrigin: true,
    parseReqBody: false,
    pathRewrite: () => "/api/v1.0/flight",
    on: {
        proxyReq: (proxyReq, request) => {
            console.log(`ADD FLIGHT PROXYING TO: ${process.env.FLIGHT_SERVICE_URL}${proxyReq.path}`);
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
router.post("/search", flightProxy);
// admin routes
router.post("/airline/register", verifyToken, requireAdmin, flightProxy);
router.post("/airline/:airlineId/block", verifyToken, requireAdmin, flightProxy);
router.post("/airline/:airlineId/activate", verifyToken, requireAdmin, flightProxy);
router.post("/", verifyToken, requireAdmin, addFlightProxy);
router.post("/:flightId/status", verifyToken, requireAdmin, flightProxy);

router.get("/:flightId", flightProxy);
module.exports = router;