const express = require("express");
const { check, validationResult } = require("express-validator");
const Event = require("../models/Event");
const router = express.Router();

// Get all events
router.get("/", async (req, res) => {
    try {
        const events = await Event.find();
        res.json(events);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// Add a new event
router.post(
    "/",
    [
        check("title", "Title is required").notEmpty(),
        check("date", "A valid date is required").isISO8601(),
        check("description", "Description is required").notEmpty(),
    ],
    async (req, res) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }

        try {
            const newEvent = new Event(req.body);
            const savedEvent = await newEvent.save();
            res.json(savedEvent);
        } catch (error) {
            res.status(500).json({ message: error.message });
        }
    }
);

// Update an event
router.put("/:id", async (req, res) => {
    try {
        const updatedEvent = await Event.findByIdAndUpdate(req.params.id, req.body, {
            new: true,
            runValidators: true, // Ensures validation on update
        });
        res.json(updatedEvent);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// Delete an event
router.delete("/:id", async (req, res) => {
    try {
        await Event.findByIdAndDelete(req.params.id);
        res.json({ message: "Event deleted successfully" });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

module.exports = router;
