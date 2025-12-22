// pages/PatientLabResults.jsx
import React, { useEffect, useState } from "react";
import axios from "axios";
import Patientsidebar from "../components/Patientsidebar";

export default function Patientviewlabresult() {
  const [reports, setReports] = useState([]);
  const patientId = localStorage.getItem("patientId");

  useEffect(() => {
    axios
      .get(`${import.meta.env.VITE_API_URL}/api/labreports/patientreport/${patientId}`)
      .then((res) => setReports(res.data));
  }, []);

  return (
    <div className="flex">
      <Patientsidebar />
      <div className="p-6 w-full">
        <h2 className="text-xl font-bold mb-4">My Lab Results</h2>

        <table className="w-full border bg-white">
          <thead>
            <tr>
              <th>ID</th>
              <th>Doctor</th>
              <th>Test</th>
              <th>Result</th>
              <th>PDF</th>
            </tr>
          </thead>
          <tbody>
            {reports.map((r, i) => (
              <tr key={i}>
                <td>{r.labReportId}</td>
                <td>{r.doctorName}</td>
                <td>{r.testName}</td>
                <td>{r.result}</td>
                <td>
                  <button
                    onClick={() =>
                      window.open(
                        `${import.meta.env.VITE_API_URL}/api/labreports/reportpdf/${r.labReportId}`,
                        "_blank"
                      )
                    }
                    className="bg-blue-600 text-white px-2 py-1"
                  >
                    View PDF
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
