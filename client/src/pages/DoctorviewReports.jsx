import { useState} from "react";
import React from "react";
import axios from "axios";
import Docsidebar from "../components/Docsidebar";

export default function DoctorviewReports() {
  const [patientId, setPatientId] = useState("");
  const [records, setRecords] = useState([]);
  const [error, setError] = useState("");

  const doctorId = localStorage.getItem("doctorId");

  const searchReports = async () => {
    try {
      setError("");
      setRecords([]);

      const res = await axios.get(
        `http://localhost:5000/api/medicalrecord/patientreport/${patientId}`
      );

      setRecords(res.data);
    } catch (err) {
      setError(
        err.response?.data?.message || "No records found"
      );
    }
  };

  return (
    <>
    <Docsidebar/>
     <div className="ml-72 p-6">
      <h2 className="text-xl font-bold mb-4">
        Search Patient Medical Reports
      </h2>

      {/* Search Box */}
      <div className="flex gap-4 mb-6">
        <input
          type="text"
          placeholder="Enter Patient ID (e.g. PAT001)"
          value={patientId}
          onChange={e => setPatientId(e.target.value)}
          className="border p-2 rounded w-64"
        />

        <button
          onClick={searchReports}
          className="bg-yellow-600 text-white px-6 rounded hover:bg-yellow-300"
        >
          Search
        </button>
      </div>

      {/* Error */}
      {error && <p className="text-red-500 mb-4">{error}</p>}

      {/* Result Table */}
      {records.length > 0 && (
        <table className="w-full border">
          <thead className="bg-gray-200">
            <tr>
              <th className="border p-2">Appointment ID</th>
              <th className="border p-2">Symptoms</th>
              <th className="border p-2">Diagnosis</th>
             
            </tr>
          </thead>
          <tbody>
            {records.map((r, index) => (
              <tr key={index}>
                <td className="border p-2">{r.appointmentId}</td>
                <td className="border p-2">{r.symptoms}</td>
                <td className="border p-2">{r.diagnosis}</td>
                
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
    </>
  );
}
