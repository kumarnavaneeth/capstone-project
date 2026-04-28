const jwt = require("jsonwebtoken");
require("dotenv").config();
exports.verifyToken = (request, response, next) => {
    const authHeader = request.headers["authorization"];
    const token = authHeader && authHeader.split(" ")[1];
    if (!token) {
        return response.status(401).json({ message: "Access denied. No token provided." });
    }
    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        request.user = decoded;
        next();
    } catch (error) {
        if (error.name === "TokenExpiredError") {
            return response.status(401).json({ message: "Token expired. Please login again." });
        }
        return response.status(403).json({ message: "Invalid token." });
    }
};
exports.requireAdmin = (request, response, next) => {
    if (!request.user || !request.user.roles?.includes("ADMIN")) {
        return response.status(403).json({ message: "Access denied. Admins only." });
    }
    next();
};
exports.requireUser = (...roles) => (request, response, next) => {
    const hasRole = request.user?.roles?.some(role => roles.includes(role));
    if (!hasRole) {
        return response.status(403).json({ message: `Access denied. Required: ${roles.join(" or ")}` });
    }
    next();
};