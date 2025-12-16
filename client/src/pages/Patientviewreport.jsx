import { useEffect, useState } from "react";
import React from "react";
import axios from "axios";
import Patientsidebar from "../components/Patientsidebar";

export default function Patientviewreports() {
  const [reports, setReports] = useState([]);
  const [error, setError] = useState("");

  // ✅ Get patientId from localStorage
  const patientId = localStorage.getItem("patientId");

  useEffect(() => {
    const fetchReports = async () => {
      try {
        const res = await axios.get(
          `${import.meta.env.VITE_API_URL}/api/medicalrecord/patientreport/${patientId}`
        );
        setReports(res.data);
      } catch (err) {
        setError(
          err.response?.data?.message 
        );
      }
    };

    if (patientId) {
      fetchReports();
    }
  }, [patientId]);

  return (
    <>
      <Patientsidebar />

      <div className="ml-72 p-6 min-h-screen bg-gray-100">
        <h2 className="text-2xl font-bold mb-6">
          My Medical Reports
        </h2>

        {error && (
          <p className="text-red-500 mb-4">{error}</p>
        )}

        <div className="bg-white rounded-xl shadow p-4 overflow-x-auto">
          <table className="w-full border-collapse">
            <thead>
              <tr className="bg-gray-200">
                                <th className="border p-3">Doctor</th>
                <th className="border p-3">Diagnosis</th>
                              </tr>
            </thead>

            <tbody>
              {reports.length === 0 ? (
                <tr>
                  <td colSpan="4" className="text-center p-4">
                    No medical reports found
                  </td>
                </tr>
              ) : (
                reports.map((r, index) => (
                  <tr key={index} className="hover:bg-gray-50">
                    
                    <td className="border p-3">
                      {r.doctorId}
                    </td>

                    <td className="border p-3">
                      {r.diagnosis}
                    </td>

                    
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
}
