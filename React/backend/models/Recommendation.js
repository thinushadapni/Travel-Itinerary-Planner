const mongoose = require("mongoose");

const recommendationSchema = new mongoose.Schema({
  destination: { type: String, required: true, index: true },
  hotels: [
    {
      name: { type: String, required: true },
      type: { type: String, enum: ["cheap", "moderate", "luxury"], required: true },
      price: { type: String, required: true },
      image: { type: String } // Optional image for hotels
    },
  ],
  attractions: [
    {
      name: { type: String, required: true },
      image: { type: String } // Added image field for attractions
    }
  ],
});

module.exports = mongoose.model("Recommendation", recommendationSchema);