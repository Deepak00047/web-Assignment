const mongoose = require("mongoose");

const TicketSchema = new mongoose.Schema({
    user: { type: String, required: true },
    event: { type: mongoose.Schema.Types.ObjectId, ref: "Event", required: true },
    quantity: { type: Number, required: true },
    totalPrice: { type: Number, required: true },
});

module.exports = mongoose.model("Ticket", TicketSchema);
