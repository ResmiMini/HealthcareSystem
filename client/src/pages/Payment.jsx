import { useLocation, useNavigate } from "react-router-dom";
import { useState } from "react";
import axios from "axios";
import React from "react";

export default function Payment() {
  const { state } = useLocation();
  const navigate = useNavigate();

  const { appointmentId, patientId, amount } = state;

  const [method, setMethod] = useState("");
  const [loading, setLoading] = useState(false);

  const handlePayment = () => {
    if (!method) {
      alert("Please select a payment method");
      return;
    }

    setLoading(true);

    // ⏳ Fake payment delay
    setTimeout(async () => {
      try {
        console.log({ appointmentId, patientId, amount, method });
        await axios.post(`${import.meta.env.VITE_API_URL}/api/payment/savepayment`, {
          appointmentId,
          patientId,
          amount,
          method
        });

        alert("Payment Successful ✅");

        navigate("/patientDashboard");
      } catch (err) {
        alert("Payment failed");
      } finally {
        setLoading(false);
      }
    }, 3000);
  };

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center">
      <div className="bg-white p-6 rounded-xl shadow-lg w-[420px]">
        
        <h2 className="text-xl font-bold mb-4 text-center">
          Complete Payment
        </h2>

        <div className="text-sm text-gray-600 mb-4">
          Appointment ID: <b>{appointmentId}</b>
          <br />
          Amount: <b>₹{amount}</b>
        </div>

        {/* PAYMENT METHODS */}
        <div className="space-y-3">

          {/* CARD */}
          <div
            onClick={() => setMethod("Card")}
            className={`border p-3 rounded-lg cursor-pointer 
            ${method === "Card" ? "border-green-600 bg-green-50" : ""}`}
          >
            💳 Credit / Debit Card
          </div>

          {/* UPI */}
          <div
            onClick={() => setMethod("UPI")}
            className={`border p-3 rounded-lg cursor-pointer 
            ${method === "UPI" ? "border-green-600 bg-green-50" : ""}`}
          >
            📱 UPI (GPay / PhonePe / Paytm)
          </div>

          {/* NET BANKING */}
          <div
            onClick={() => setMethod("NetBanking")}
            className={`border p-3 rounded-lg cursor-pointer 
            ${method === "NetBanking" ? "border-green-600 bg-green-50" : ""}`}
          >
            🏦 Net Banking
          </div>
        </div>

        {/* PAY BUTTON */}
        <button
          onClick={handlePayment}
          disabled={loading}
          className="w-full bg-green-600 text-white py-2 rounded-lg mt-5"
        >
          {loading ? "Processing Payment..." : "Pay Now"}
        </button>
      </div>
    </div>
  );
}
