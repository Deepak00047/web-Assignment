const jwt = require("jsonwebtoken");

// Middleware to verify the token and check user role (admin or user)
const verifyToken = (req, res, next) => {
    const token = req.header("Authorization") && req.header("Authorization").split(" ")[1]; // Get token from header

    if (!token) {
        return res.status(401).json({ message: "Access denied, no token provided" });
    }

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        req.user = decoded; // Attach user info (id and role) to the request

        // If the user is trying to access an admin route, check their role
        if (req.user.role !== "admin") {
            return res.status(403).json({ message: "Access denied, admin role required" });
        }

        next(); // Call the next middleware or route handler
    } catch (error) {
        res.status(400).json({ message: "Invalid token" });
    }
};

// Middleware for verifying token for all users (non-admins can access user routes)
const verifyUserToken = (req, res, next) => {
    const token = req.header("Authorization") && req.header("Authorization").split(" ")[1]; // Get token from header

    if (!token) {
        return res.status(401).json({ message: "Access denied, no token provided" });
    }

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        req.user = decoded; // Attach user info (id and role) to the request
        next(); // Call the next middleware or route handler for user routes
    } catch (error) {
        res.status(400).json({ message: "Invalid token" });
    }
};

module.exports = { verifyToken, verifyUserToken };
