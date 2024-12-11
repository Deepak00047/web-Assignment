const express = require("express");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const User = require("../models/User"); // Importing the User model
const router = express.Router();

// Register a user
router.post("/register", async (req, res) => {
    const { name, email, password, role } = req.body;

    try {
        // Hash the password before storing it
        const hashedPassword = await bcrypt.hash(password, 10);

        // Create a new user with the given details and default role as "user" if not provided
        const newUser = new User({
            name,
            email,
            password: hashedPassword,
            role: role || "user",  // Default role is "user"
        });

        // Save the user to the database
        await newUser.save();

        res.status(201).json({ message: "User registered successfully" });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// Login a user
router.post("/login", async (req, res) => {
    const { email, password } = req.body;

    try {
        // Find user by email
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(400).json({ message: "Invalid credentials" });
        }

        // Compare entered password with the stored hashed password
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(400).json({ message: "Invalid credentials" });
        }

        // Create JWT token with user ID and role as payload
        const token = jwt.sign({ id: user._id, role: user.role }, process.env.JWT_SECRET, {
            expiresIn: "1h",
        });

        res.json({ token });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

module.exports = router;
