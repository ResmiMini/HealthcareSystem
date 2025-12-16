import React, { useEffect, useState } from "react";
import axios from "axios";
import Patientsidebar from '../components/Patientsidebar';

export default function Viewappointment() {
  const [appointments, setAppointments] = useState([]);

  const patientId = localStorage.getItem("patientId");

  useEffect(() => {
    fetchAppointments();
  }, []);

  const fetchAppointments = async () => {
    try {
      const res = await axios.get(
        `${import.meta.env.VITE_API_URL}/api/appointment/viewappointment/${patientId}`
      );
      const appts = res.data.appointments;
      const updatedAppointments = await Promise.all(
  appts.map(async (appt) => {
    try {
      const doctorRes = await axios.get(
        `${import.meta.env.VITE_API_URL}/api/doctor/getByDoctorId/${appt.doctorId}`
      );
      return {
        ...appt,
        doctorName: doctorRes.data.doctor.name,   // add doctor name
      };
    } catch (err) {
      return { ...appt, doctorName: "Unknown Doctor" };
    }
  })
);
      setAppointments(updatedAppointments);
    } catch (err) {
      console.error(err);
    }
  };

  const deleteAppointment = async (appointmentId) => {
    if (!window.confirm("Are you sure you want to delete this appointment?"))
      return;

    try {
      await axios.delete(
        `${import.meta.env.VITE_API_URL}/api/appointment/deleteappointment/${appointmentId}`
      );
            fetchAppointments();
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <>
  {/* Sidebar */}
  <Patientsidebar />

  {/* Page Layout */}
  <div className="flex min-h-screen bg-gray-100">
    
    {/* Sidebar Spacer (must match sidebar width) */}
    <div className="w-72"></div> {/* change to w-64 if needed */}

    {/* Main Content */}
    <div className="flex-1 p-8">
      
      {/* Page Title */}
      <h2 className="font-bold text-2xl mb-6 text-gray-800">
        My Appointments
      </h2>

      {/* Table Wrapper */}
      <div className="flex justify-center">
        <div className="w-full max-w-4xl bg-white rounded-xl shadow-md p-6">
          
          <table className="w-full border-collapse">
            <thead>
              <tr className="bg-gray-100 text-gray-700">
                <th className="border p-3 text-left">Date</th>
                <th className="border p-3 text-left">Doctor</th>
                <th className="border p-3 text-center">Action</th>
              </tr>
            </thead>

            <tbody>
              {appointments.length === 0 ? (
                <tr>
                  <td colSpan="3" className="text-center p-4 text-gray-500">
                    No appointments found
                  </td>
                </tr>
              ) : (
                appointments.map((a) => (
                  <tr
                    key={a.appointmentId}
                    className="hover:bg-gray-50 transition"
                  >
                    <td className="border p-3">
                      {new Date(a.date).toLocaleDateString()}
                    </td>

                    <td className="border p-3">
                      {a.doctorId?.name || "Doctor"}
                    </td>

                    <td className="border p-3 text-center">
                      <button
                        onClick={() => deleteAppointment(a.appointmentId)}
                        className="bg-yellow-600 text-white px-4 py-1.5 rounded-lg hover:bg-red-600 transition"
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

    </div>
  </div>
</>

  );
}
