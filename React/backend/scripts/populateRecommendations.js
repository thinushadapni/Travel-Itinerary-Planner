const mongoose = require("mongoose");
const Recommendation = require("../models/Recommendation");

const sampleData = [
  {
    destination: "Paris",
    hotels: [
      { name: "Hotel Le Bristol", type: "luxury", price: "5000", image: "./images/cl2.jpg" },
      { name: "Hotel Ibis Bastille", type: "moderate", price: "3000", image: "./images/ch1.jpg" },
      { name: "Hotel Formule 1", type: "cheap", price: "1520", image: "./images/ch2.jpg" },
    ],
    attractions: [
      { name: "Eiffel Tower", image: "./images/EiffelTower.jpg" },
      { name: "Louvre Museum", image: "./images/LouvreMuseum.jpg" },
      { name: "Notre-Dame Cathedral", image: "./images/Notre-DameCathedral.jpg" },
      { name: "Sacré-Cœur Basilica", image: "./images/Sacré-CœurBasilica.jpeg" },
      { name: "Versailles Palace", image: "./images/VersaillesPalace.jpg" },
    ],
  },
  {
    destination: "New York",
    hotels: [
      { name: "The Plaza Hotel", type: "luxury", price: "5400", image: "./images/cl3.jpeg" },
      { name: "Hampton Inn Manhattan", type: "moderate", price: "2300", image: "./images/dm8.jpg" },
      { name: "HI NYC Hostel", type: "cheap", price: "1000", image: "./images/dc2.jpg" },
    ],
    attractions: [
      { name: "Statue of Liberty", image: "./images/Statue.jpg" },
      { name: "Central Park", image: "./images/CentralPark.jpg" },
      { name: "Metropolitan Museum of Art", image: "./images/art.jpg" },
      { name: "Times Square", image: "./images/times.jpg" },
      { name: "Brooklyn Bridge", image: "./images/bridge.jpg" },
    ],
  },
  {
    destination: "Tokyo",
    hotels: [
      { name: "Park Hyatt Tokyo", type: "luxury", price: "4500", image: "./images/hotel2.jpeg" },
      { name: "Hotel Sunroute Plaza", type: "moderate", price: "3200", image: "./images/dl3.jpg" },
      { name: "Nine Hours Capsule", type: "cheap", price: "1300", image: "./images/dl6.png" },
    ],
    attractions: [
      { name: "Shibuya Crossing", image: "./images/cross.jpg" },
      { name: "Tokyo Skytree", image: "./images/sky.jpg" },
      { name: "Senso-ji Temple", image: "./images/temple.jpg" },
      { name: "Shinjuku Gyoen National Garden", image: "./images/garden.jpg" },
      { name: "Tsukiji Fish Market", image: "./images/fish.jpg" },
    ],
  },
];

async function populateDatabase() {
  try {
    await mongoose.connect("mongodb://127.0.0.1:27017/travelPlanner", {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log("Connected to MongoDB");

    await Recommendation.deleteMany({});
    console.log("Cleared existing recommendations");

    await Recommendation.insertMany(sampleData);
    console.log("Inserted sample data");

    const count = await Recommendation.countDocuments();
    console.log(`Total documents: ${count}`);
  } catch (error) {
    console.error("Error populating database:", error);
  } finally {
    mongoose.connection.close();
  }
}

populateDatabase();
//node scripts/populateRecommendations.js