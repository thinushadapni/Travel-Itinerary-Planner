import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const styles = {
  page: {
    backgroundImage: `url('./images/back.jpg')`,
    backgroundSize: 'cover',
    backgroundPosition: 'center',
    minHeight: '100vh',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
  container: {
    backgroundColor: 'rgba(255, 255, 255, 0.9)',
    padding: '40px',
    borderRadius: '12px',
    boxShadow: '0 8px 16px rgba(0,0,0,0.3)',
    width: '30%',
    textAlign: 'center',
  },
  title: {
    fontFamily: '"Courier New", Courier, monospace',
    fontSize: '28px',
    marginBottom: '20px',
  },
  input: {
    width: '100%',
    padding: '10px',
    margin: '10px 0',
    borderRadius: '6px',
    border: '1px solid #ccc',
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

export default function Dashboard() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: "",
    destination: "",
    days: "",
    transport: "",
    budget: "",
    travelWith: "",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("User Travel Info:", formData);
    navigate("/flight", { state: formData });
  };

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/");
  };

  return (
    <div style={styles.page}>
      <div style={styles.container}>
        <h2 style={styles.title}>Welcome to the Dashboard</h2>
        <form onSubmit={handleSubmit}>
          <input
            style={styles.input}
            type="text"
            name="name"
            placeholder="Your Name"
            value={formData.name}
            onChange={handleChange}
            required
          />
          <input
            style={styles.input}
            type="text"
            name="destination"
            placeholder="Destination"
            value={formData.destination}
            onChange={handleChange}
            required
          />
          <input
            style={styles.input}
            type="number"
            name="days"
            placeholder="Number of Days"
            value={formData.days}
            onChange={handleChange}
            required
          />
          <select
            style={styles.input}
            name="budget"
            value={formData.budget}
            onChange={handleChange}
            required
          >
            <option value="">Budget</option>
            <option value="cheap">Cheap</option>
            <option value="moderate">Moderate</option>
            <option value="luxury">Luxury</option>
          </select>
          <select
            style={styles.input}
            name="travelWith"
            value={formData.travelWith}
            onChange={handleChange}
            required
          >
            <option value="">Traveling With</option>
            <option value="family">Family</option>
            <option value="friends">Friends</option>
            <option value="alone">Alone</option>
          </select>
          <button type="submit" style={styles.button}>Create Itinerary</button>
        </form>
        <br />
        <button onClick={handleLogout} style={styles.button}>Logout</button>
      </div>
    </div>
  );
}
