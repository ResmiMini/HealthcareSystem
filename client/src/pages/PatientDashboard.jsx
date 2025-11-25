import React from "react";
import { useNavigate } from "react-router-dom";
import logout from "../assets/image/logout.png"

export default function PatientDashboard() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      
      {/* Header */}
      <div className="bg-white shadow-md p-4 rounded-xl mb-6 flex justify-between items-center">
        <h1 className="text-2xl font-bold text-blue-700">Patient Dashboard</h1>
        <button
          onClick={() => navigate("/")}
          className="text-white px-4 py-2 rounded-lg hover:bg-yellow-700"
        >
          <img src={logout}></img>
        </button>
      </div>

      {/* Main Sections */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">

        {/* Card 1 */}
        <div className="bg-white p-6 rounded-xl shadow hover:shadow-lg cursor-pointer">
          <h2 className="text-xl font-semibold mb-2 text-blue-600">My Appointments</h2>
          <p className="text-gray-600">View your upcoming and past hospital appointments.</p>
        </div>

        {/* Card 2 */}
        <div className="bg-white p-6 rounded-xl shadow hover:shadow-lg cursor-pointer">
          <h2 className="text-xl font-semibold mb-2 text-blue-600">Medical Reports</h2>
          <p className="text-gray-600">Check your lab reports, medical history, and prescriptions.</p>
        </div>

        {/* Card 3 */}
        <div className="bg-white p-6 rounded-xl shadow hover:shadow-lg cursor-pointer">
          <h2 className="text-xl font-semibold mb-2 text-blue-600">Book Appointment</h2>
          <p className="text-gray-600">Schedule a new appointment with a doctor.</p>
        </div>

      </div>
    </div>
  );
}
