const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
const connectDB = require("./config/db");

// Load environment variables
dotenv.config();

// Connect to MongoDB
connectDB();

// Initialize Express
const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Routes
app.use("/api/animals", require("./routes/animals"));
app.use("/api/events", require("./routes/events"));
app.use("/api/tickets", require("./routes/tickets"));
app.use("/api/auth", require("./routes/auth"));

// Default route for testing
app.get("/", (req, res) => {
    res.send("Welcome to Zoomania API");
});

// Error handling middleware
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).json({ message: "Internal Server Error" });
});

// Start the server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
