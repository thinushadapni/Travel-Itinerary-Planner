const express = require("express");
const router = express.Router();
const Recommendation = require("../models/Recommendation");

router.post("/recommendation", async (req, res) => {
  const { destination, days, budget } = req.body;
  console.log("Request body:", { destination, days, budget });

  if (!destination || !days || !budget) {
    return res.status(400).json({ error: "Missing required fields" });
  }

  try {
    console.log("Searching for destination:", destination.trim());
    const recommendation = await Recommendation.findOne({
      destination: { $regex: new RegExp(destination.trim(), "i") },
    });
    console.log("Found recommendation:", recommendation);

    if (!recommendation) {
      return res.status(404).json({ error: `No recommendations found for ${destination}` });
    }

    let budgetType;
    if (typeof budget === "string" && ["cheap", "moderate", "luxury"].includes(budget.toLowerCase())) {
      budgetType = budget.toLowerCase();
      console.log("Mapped budget to type:", budgetType);
    } else if (!isNaN(budget)) {
      const budgetValue = parseFloat(budget);
      if (budgetValue <= 100) budgetType = "cheap";
      else if (budgetValue <= 300) budgetType = "moderate";
      else budgetType = "luxury";
      console.log("Mapped numerical budget to type:", budgetType);
    } else {
      return res.status(400).json({ error: "Invalid budget format. Use 'cheap', 'moderate', 'luxury', or a numerical value." });
    }

    const hotels = recommendation.hotels.filter((hotel) => hotel.type === budgetType);
    console.log("Filtered hotels:", hotels);

    const selectedHotels = hotels.length > 0 ? hotels : [recommendation.hotels[0]];

    const attractions = recommendation.attractions;
    const dailyAttractions = [];
    const maxAttractionsPerDay = 2;

    for (let i = 0; i < days; i++) {
      const startIndex = i * maxAttractionsPerDay;
      const dayAttractions = attractions.slice(startIndex, startIndex + maxAttractionsPerDay);
      if (dayAttractions.length > 0) {
        dailyAttractions.push(dayAttractions);
      }
    }
    console.log("Daily attractions:", dailyAttractions);

    res.json({
      hotels: selectedHotels,
      dailyAttractions,
    });
  } catch (error) {
    console.error("Error fetching recommendations:", error);
    res.status(500).json({ error: "Server error" });
  }
});

module.exports = router;