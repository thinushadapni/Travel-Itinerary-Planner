const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');

// Create a Schema
const TravelerSchema = new mongoose.Schema({
  traveler: String,
  destination: String,
  duration: String,
  budget: String,
  travelingWith: String,
  flight: String,
  hotelRecommendations: [String],
  dailyAttractions: {
    day1: [String],
    day2: [String]
  }
});

// Create a Model
const Traveler = mongoose.model('traveler', TravelerSchema);

// POST route to create itinerary
router.post('/', async (req, res) => {
  try {
    const newItinerary = new Traveler(req.body);
    await newItinerary.save();
    res.status(201).json({ message: 'Itinerary created successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
});

module.exports = router;
