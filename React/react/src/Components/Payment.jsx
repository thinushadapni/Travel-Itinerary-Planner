import React, { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";

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
    backgroundColor: 'rgba(255, 255, 255, 0.9)',
    padding: '40px',
    borderRadius: '12px',
    boxShadow: '0 8px 16px rgba(0,0,0,0.3)',
    width: '30%',
    textAlign: 'center',
},
  input: {
    width: "100%",
    padding: "10px",
    margin: "10px 0",
    borderRadius: "6px",
    border: "1px solid #ccc",
    fontSize: "16px",
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
  success: {
    color: "green",
    fontSize: "20px",
    marginTop: "20px",
  }
};

export default function Payment() {
  const location = useLocation();
  const navigate = useNavigate();
  const { totalCost } = location.state || {};

  const [accountNumber, setAccountNumber] = useState("");
  const [paymentSuccess, setPaymentSuccess] = useState(false);

  const handlePay = () => {
    if (accountNumber.length < 8) {
      alert("Please enter a valid account number.");
      return;
    }
    setPaymentSuccess(true);
    setTimeout(() => {
      navigate("/");
    }, 5000); // Redirect back to dashboard after 2s
  };

  return (
    <div style={styles.page}>
      <div style={styles.container}>
        <h2>Payment Details</h2>
        <p>Total Amount to Pay: ₹{totalCost}</p>
        <input
          type="text"
          placeholder="Enter Account Number"
          value={accountNumber}
          onChange={(e) => setAccountNumber(e.target.value)}
          style={styles.input}
        />
        <button style={styles.button} onClick={handlePay}>
          Pay Now
        </button>
        {paymentSuccess && (
          <div style={styles.success}>
            Payment Successful! 🎉
          </div>
        )}
      </div>
    </div>
  );
}
