const mongoose = require("mongoose");

const AnimalSchema = new mongoose.Schema({
    name: { type: String, required: true },
    habitat: { type: String, required: true },
    diet: { type: String, required: true },
    facts: { type: String, required: true },
});

module.exports = mongoose.model("Animal", AnimalSchema);
