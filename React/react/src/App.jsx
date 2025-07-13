import React from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import Login from "./Components/Login";
import Register from "./Components/Register";
import Dashboard from "./Components/Dashboard";
import Flight from "./Components/Flight"
import CreateItinerary from "./Components/CreateItinerary";
import Payment from "./Components/Payment";

function App() {
  const isAuthenticated = !!localStorage.getItem("token");

  return (
    <Router>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/dashboard" element={isAuthenticated ? <Dashboard /> : <Navigate to="/" />} />
        <Route path="/flight" element={isAuthenticated ? <Flight /> : <Navigate to="/" />} />
        <Route path="/create" element={isAuthenticated ? <CreateItinerary /> : <Navigate to="/" />} />
        <Route path="/payment" element={isAuthenticated ? <Payment /> : <Navigate to="/" />} />
      </Routes>
    </Router>
  );
}

export default App;