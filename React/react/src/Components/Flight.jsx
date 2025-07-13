import React, { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";

const styles = {
  page: {
    backgroundImage: `url('./images/back.jpg')`,
    backgroundSize: 'cover',
    backgroundPosition: 'center',
    minHeight: '100vh',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'column',
  },
  container: {
    backgroundColor: 'rgba(255, 255, 255, 0.9)',
    padding: '40px',
    borderRadius: '12px',
    boxShadow: '0 8px 16px rgba(0,0,0,0.3)',
    width: '40%',
    textAlign: 'center',
    marginBottom: '20px',
  },
  title: {
    fontFamily: '"Courier New", Courier, monospace',
    fontSize: '28px',
    marginBottom: '20px',
  },
  flightCard: {
    padding: '10px',
    margin: '10px 0',
    borderRadius: '8px',
    boxShadow: '0 4px 8px rgba(0,0,0,0.2)',
  },
  button: {
    width: '100%',
    padding: '10px',
    marginTop: '15px',
    backgroundColor: 'orange',
    color: 'white',
    border: 'none',
    borderRadius: '6px',
    cursor: 'pointer',
    fontSize: '16px',
  },
};

export default function Flight() {
  const navigate = useNavigate();
  const location = useLocation();
  const formData = location.state || {};  // ✅ Correct way

  const [flights] = useState([
    { id: 1, name: "IndiGo 6E 123", available: true },
    { id: 2, name: "Vistara UK 456", available: false },
    { id: 3, name: "SpiceJet SG 789", available: true },
    { id: 4, name: "GoAir G8 321", available: false },
    { id: 5, name: "AirAsia I5 654", available: true },
  ]);

  const handleBookFlight = (flight) => {
    if (flight.available) {
      navigate("/create", { state: { formData: { ...formData, flight: flight.name } } });
    }
  };


  return (
    <div style={styles.page}>
      <div style={styles.container}>
        <h2 style={styles.title}>Available Flights</h2>
        {flights.map((flight) => (
          <div
            key={flight.id}
            style={{
              ...styles.flightCard,
              backgroundColor: flight.available ? "white" : "#f0f0f0",
              color: flight.available ? "black" : "gray",
            }}
          >
            <h4>{flight.name}</h4>
            <button
              style={{
                ...styles.button,
                backgroundColor: flight.available ? "#28a745" : "#ccc",
                cursor: flight.available ? "pointer" : "not-allowed",
              }}
              disabled={!flight.available}
              onClick={() => handleBookFlight(flight)}
            >
              Book Flight
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}
