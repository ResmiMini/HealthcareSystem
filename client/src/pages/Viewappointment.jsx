import React, { useEffect, useState } from "react";
import axios from "axios";
import Patientsidebar from "../components/Patientsidebar";

export default function Viewappointment() {
  const [appointments, setAppointments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const patientId = localStorage.getItem("patientId");

  // 🔹 Fetch appointments
  const fetchAppointments = async () => {
    try {
      setLoading(true);
      setError("");

      if (!patientId) {
        setError("Patient not logged in");
        return;
      }

      const res = await axios.get(
        `${import.meta.env.VITE_API_URL}/api/appointment/viewappointment/${patientId}`
      );

      console.log("API RESPONSE:", res.data);

      setAppointments(res.data.appointments || []);
    } catch (err) {
      console.error("FETCH ERROR:", err);
      setError("Failed to load appointments");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchAppointments();
  }, []);

  // 🔹 Delete appointment
  const deleteAppointment = async (appointmentId) => {
    if (!window.confirm("Are you sure you want to delete this appointment?"))
      return;

    try {
      await axios.delete(
        `${import.meta.env.VITE_API_URL}/api/appointment/deleteappointment/${appointmentId}`
      );
      fetchAppointments();
    } catch (err) {
      console.error("DELETE ERROR:", err);
      alert("Failed to delete appointment");
    }
  };

  return (
    <div className="flex min-h-screen bg-gray-100">
      {/* Sidebar */}
      <Patientsidebar />

      {/* Main Content */}
      <div className="flex-1 p-8">
        <h2 className="text-3xl font-bold mb-6 text-gray-800 text-center">
          My Appointments
        </h2>

        {/* Loading */}
        {loading && (
          <p className="text-center text-gray-500">Loading appointments...</p>
        )}

        {/* Error */}
        {error && (
          <p className="text-center text-red-600 font-semibold">{error}</p>
        )}

        {/* Table */}
        {!loading && !error && (
          <div className="flex justify-center">
            <div className="w-full max-w-5xl bg-white rounded-xl shadow-lg p-6">
              <table className="w-full border-collapse">
                <thead>
                  <tr className="bg-gray-100 text-gray-700">
                    <th className="border p-3 text-left">Appointment ID</th>
                    <th className="border p-3 text-left">Doctor</th>
                    <th className="border p-3 text-left">Specialization</th>
                    <th className="border p-3 text-left">Date</th>
                    <th className="border p-3 text-center">Action</th>
                  </tr>
                </thead>

                <tbody>
                  {appointments.length === 0 ? (
                    <tr>
                      <td
                        colSpan="5"
                        className="text-center p-4 text-gray-500"
                      >
                        No appointments found
                      </td>
                    </tr>
                  ) : (
                    appointments.map((a) => (
                      <tr
                        key={a._id}
                        className="hover:bg-gray-50 transition"
                      >
                        <td className="border p-3">
                          {a.appointmentId}
                        </td>

                        <td className="border p-3 font-semibold">
                          {a.doctorName || "Unknown Doctor"}
                        </td>

                        <td className="border p-3">
                          {a.specialization || "-"}
                        </td>

                        <td className="border p-3">
                          {new Date(a.date).toLocaleDateString()}
                        </td>

                        <td className="border p-3 text-center">
                          <button
                            onClick={() =>
                              deleteAppointment(a.appointmentId)
                            }
                            className="bg-red-600 text-white px-4 py-1.5 rounded-lg hover:bg-red-700 transition"
                          >
                            Delete
                          </button>
                        </td>
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
