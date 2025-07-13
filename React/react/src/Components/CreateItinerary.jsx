import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import axios from "axios";

const styles = {
  page: {
    backgroundImage: `url('./images/back.jpg')`,
    backgroundSize: "cover",
    backgroundPosition: "center",
    minHeight: "100vh",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    flexDirection: "column",
  },
  container: {
    backgroundColor: "rgba(255, 255, 255, 0.9)",
    padding: "40px",
    borderRadius: "12px",
    boxShadow: "0 8px 16px rgba(0,0,0,0.3)",
    width: "50%",
    textAlign: "center",
    marginBottom: "20px",
  },
  title: {
    fontFamily: '"Courier New", Courier, monospace',
    fontSize: "28px",
    marginBottom: "20px",
  },
  itinerarySection: {
    margin: "20px 0",
    textAlign: "left",
  },
  dayHeader: {
    fontSize: "20px",
    fontWeight: "bold",
    margin: "10px 0",
  },
  item: {
    padding: "10px",
    borderRadius: "6px",
    backgroundColor: "#f9f9f9",
    margin: "5px 0",
    display: "flex",
    alignItems: "center",
  },
  hotelImage: {
    width: "100px",
    height: "100px",
    objectFit: "cover",
    borderRadius: "6px",
    marginRight: "10px",
  },
  attractionImage: {
    width: "100px",
    height: "100px",
    objectFit: "cover",
    borderRadius: "6px",
    marginRight: "10px",
  },
  button: {
    width: "100%",
    padding: "10px",
    marginTop: "15px",
    backgroundColor: "orange",
    color: "white",
    border: "none",
    borderRadius: "6px",
    cursor: "pointer",
    fontSize: "16px",
  },
  secondaryButton: {
    width: "100%",
    padding: "10px",
    marginTop: "10px",
    backgroundColor: "#007bff",
    color: "white",
    border: "none",
    borderRadius: "6px",
    cursor: "pointer",
    fontSize: "16px",
  },
  paymentButton: {
    width: "100%",
    padding: "10px",
    marginTop: "10px",
    backgroundColor: "#ffc107",
    color: "black",
    border: "none",
    borderRadius: "6px",
    cursor: "pointer",
    fontSize: "16px",
  },
  error: {
    color: "red",
    fontSize: "14px",
    margin: "10px 0",
  },
};

export default function CreateItinerary() {
  const navigate = useNavigate();
  const location = useLocation();
  const { formData } = location.state || {};
  const { destination, days, budget, travelWith, flight, name } = formData || {};

  const [itinerary, setItinerary] = useState({ hotels: [], dailyAttractions: [] });
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(true);
  const [totalCost, setTotalCost] = useState(null);

  useEffect(() => {
    const fetchRecommendations = async () => {
      if (!destination || !days || !budget) {
        setError("Missing travel data. Please fill out the form in the Dashboard.");
        setLoading(false);
        return;
      }

      try {
        const response = await axios.post(
          "http://localhost:5000/api/recommendation",
          { destination, days, budget },
          { withCredentials: true }
        );
        setItinerary(response.data);
        setError("");

        const saveData = {
          traveler: name,
          destination: destination,
          duration: days,
          budget: budget,
          travelingWith: travelWith,
          flight: flight,
          hotelRecommendations: response.data.hotels.map((hotel) => hotel.name),
          dailyAttractions: {
            day1: response.data.dailyAttractions[0]?.map(attr => attr.name) || [],
            day2: response.data.dailyAttractions[1]?.map(attr => attr.name) || [],
          },
        };

        await axios.post("http://localhost:5000/api/traveler", saveData);

        if (budget === "cheap") {
          setTotalCost(Math.floor(Math.random() * (2500 - 1500 + 1)) + 1500);
        } else if (budget === "moderate") {
          setTotalCost(Math.floor(Math.random() * (5000 - 2500 + 1)) + 2500);
        } else if (budget === "luxury") {
          setTotalCost(Math.floor(Math.random() * (7500 - 5000 + 1)) + 5000);
        }
      } catch (err) {
        setError(err.response?.data?.error || "Failed to fetch recommendations. Please try again.");
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    fetchRecommendations();
  }, [destination, days, budget, name, travelWith, flight]);

  const handleDownload = () => {
    if (!formData || itinerary.hotels.length === 0) {
      alert("No itinerary available to download.");
      return;
    }
    const content = `
      Travel Itinerary for ${name}
      Destination: ${destination}
      Duration: ${days} days
      Budget: ${budget}
      Traveling With: ${travelWith}
      Flight: ${flight}
      
      Hotel:
      ${itinerary.hotels.map((hotel) => `- ${hotel.name} (${hotel.price})`).join("\n")}
      
      Daily Activities:
      ${itinerary.dailyAttractions
        .map((day, index) => `Day ${index + 1}:\n  - ${day.map(attr => attr.name).join("\n  - ")}`)
        .join("\n")}
    `;
    const blob = new Blob([content], { type: "text/plain" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = `${name}_itinerary.txt`;
    link.click();
    URL.revokeObjectURL(url);
  };

  const handleLogout = async () => {
    try {
      await axios.post("http://localhost:5000/api/auth/logout", {}, { withCredentials: true });
      navigate("/");
    } catch (error) {
      console.error("Logout failed:", error);
    }
  };

  const handlePayment = () => {
    navigate("/payment", { state: { totalCost } });
  };

  if (!formData || !destination) {
    return (
      <div style={styles.page}>
        <div style={styles.container}>
          <h2 style={styles.title}>Error</h2>
          <p style={styles.error}>
            No travel data provided. Please fill out the form in the Dashboard.
          </p>
          <button style={styles.button} onClick={() => navigate("/dashboard")}>
            Go to Dashboard
          </button>
          <button style={styles.secondaryButton} onClick={handleLogout}>
            Logout
          </button>
        </div>
      </div>
    );
  }

  return (
    <div style={styles.page}>
      <div style={styles.container}>
        <h2 style={styles.title}>Your Travel Itinerary</h2>
        {error && <p style={styles.error}>{error}</p>}
        {loading ? (
          <p>Loading recommendations...</p>
        ) : (
          <>
            <div style={styles.itinerarySection}>
              <h3>Traveler: {name}</h3>
              <p>Destination: {destination}</p>
              <p>Duration: {days} days</p>
              <p>Budget: {budget}</p>
              <p>Traveling With: {travelWith}</p>
              <p>Flight: {flight}</p>
              {totalCost && <p>Estimated Total Cost: ₹{totalCost}</p>}
            </div>
            <div style={styles.itinerarySection}>
              <h3>Hotel Recommendations</h3>
              {itinerary.hotels.length > 0 ? (
                itinerary.hotels.map((hotel, index) => (
                  <div key={index} style={styles.item}>
                    {hotel.image && (
                      <img
                        src={hotel.image}
                        alt={hotel.name}
                        style={styles.hotelImage}
                      />
                    )}
                    <div>
                      {hotel.name} ({hotel.price})
                    </div>
                  </div>
                ))
              ) : (
                <p>No hotel recommendations available.</p>
              )}
            </div>
            <div style={styles.itinerarySection}>
              <h3>Daily Attractions</h3>
              {itinerary.dailyAttractions.length > 0 ? (
                itinerary.dailyAttractions.map((day, index) => (
                  <div key={index}>
                    <h4 style={styles.dayHeader}>Day {index + 1}</h4>
                    {day.map((attraction, idx) => (
                      <div key={idx} style={styles.item}>
                        {attraction.image && (
                          <img
                            src={attraction.image}
                            alt={attraction.name}
                            style={styles.attractionImage}
                          />
                        )}
                        <div>{attraction.name}</div>
                      </div>
                    ))}
                  </div>
                ))
              ) : (
                <p>No attractions available.</p>
              )}
            </div>
            <button style={styles.button} onClick={handleDownload}>
              Download Itinerary
            </button>
            <button style={styles.paymentButton} onClick={handlePayment}>
              Proceed to Payment
            </button>
            <button style={styles.secondaryButton} onClick={handleLogout}>
              Logout
            </button>
          </>
        )}
      </div>
    </div>
  );
}