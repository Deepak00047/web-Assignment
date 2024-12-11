const express = require("express");
const router = express.Router();
const Animal = require("../models/Animal");

// No token required for adding animals
// Get all animals (public route)
router.get("/", async (req, res) => {
    try {
        const animals = await Animal.find();
        res.json(animals);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// Add a new animal (no token required)
router.post("/", async (req, res) => {
    try {
        const { name, habitat, diet, facts } = req.body;

        // Validation (make sure all required fields are filled)
        if (!name || !habitat || !diet || !facts) {
            return res.status(400).json({ message: "Please fill in all fields." });
        }

        // Create new animal
        const newAnimal = new Animal({ name, habitat, diet, facts });
        await newAnimal.save();
        res.status(201).json(newAnimal); // Return the created animal
    } catch (error) {
        console.error("Error adding animal:", error);
        res.status(500).json({ message: "Failed to add animal. Please try again." });
    }
});

// Update an animal (requires admin role)
router.put("/:id", async (req, res) => {
    // Check if the user is an admin, if required (you can enable this again if you want)
    if (req.user && req.user.role !== "admin") {
        return res.status(403).json({ message: "Permission denied, admin only" });
    }

    try {
        const updatedAnimal = await Animal.findByIdAndUpdate(req.params.id, req.body, {
            new: true,
            runValidators: true, // Ensures validation on update
        });
        if (!updatedAnimal) {
            return res.status(404).json({ message: "Animal not found." });
        }
        res.json(updatedAnimal);
    } catch (error) {
        console.error("Error updating animal:", error);
        res.status(500).json({ message: error.message });
    }
});

// Delete an animal (requires admin role)
router.delete("/:id", async (req, res) => {
    // Check if the user is an admin (you can enable this again if you want)
    if (req.user && req.user.role !== "admin") {
        return res.status(403).json({ message: "Permission denied, admin only" });
    }

    try {
        const animal = await Animal.findByIdAndDelete(req.params.id);
        if (!animal) {
            return res.status(404).json({ message: "Animal not found." });
        }
        res.json({ message: "Animal deleted successfully" });
    } catch (error) {
        console.error("Error deleting animal:", error);
        res.status(500).json({ message: error.message });
    }
});

module.exports = router;
