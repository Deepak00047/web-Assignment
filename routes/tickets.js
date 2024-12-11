const express = require("express");
const router = express.Router();
const Ticket = require("../models/Ticket");

// Get all tickets
router.get("/", async (req, res) => {
    try {
        const tickets = await Ticket.find();
        res.json(tickets);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// Create a new ticket
router.post("/", async (req, res) => {
    try {
        const newTicket = new Ticket(req.body);
        const savedTicket = await newTicket.save();
        res.json(savedTicket);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// Update a ticket
router.put("/:id", async (req, res) => {
    try {
        const updatedTicket = await Ticket.findByIdAndUpdate(req.params.id, req.body, {
            new: true,
            runValidators: true,
        });
        res.json(updatedTicket);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// Delete a ticket
router.delete("/:id", async (req, res) => {
    try {
        await Ticket.findByIdAndDelete(req.params.id);
        res.json({ message: "Ticket deleted successfully" });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

module.exports = router;
