import { useEffect, useState } from "react";
import axios from "axios";
import Patientsidebar from "../components/Patientsidebar";
import Footer from "../components/Footer";

export default function Patientviewreports() {
  const [reports, setReports] = useState([]);
  const [error, setError] = useState("");

  const patientId = localStorage.getItem("patientId");

  useEffect(() => {
    const fetchReports = async () => {
      try {
        const res = await axios.get(
          `${import.meta.env.VITE_API_URL}/api/medicalrecord/patientreport/${patientId}`
        );

        setReports(res.data.records); // ✅ FIX
      } catch (err) {
        setError(err.response?.data?.message || "Something went wrong");
      }
    };

    if (patientId) fetchReports();
  }, [patientId]);

  return (
    <>
      <div className="flex min-h-screen bg-[url('/src/assets/image/back.jpg')] py-4 px-4 mx-10 gap-6">
        <Patientsidebar />

        <div className="flex-1 flex flex-col items-center">
          <h2 className="text-2xl font-bold mb-6 text-gray-800">
            My Medical Reports
          </h2>

          <div className="bg-white rounded-xl shadow p-6 w-full max-w-4xl overflow-x-auto">
            {error && (
              <p className="text-red-600 text-center mb-4">{error}</p>
            )}

            <table className="w-full border-collapse">
              <thead>
                <tr className="bg-gray-200 text-left">
                  <th className="border p-3">Doctor</th>
                  <th className="border p-3">Diagnosis</th>
                </tr>
              </thead>

              <tbody>
                {reports.length === 0 ? (
                  <tr>
                    <td colSpan="2" className="text-center p-6 text-gray-500">
                      No medical reports found
                    </td>
                  </tr>
                ) : (
                  reports.map((r, index) => (
                    <tr key={index} className="hover:bg-gray-50">
                      <td className="border p-3">
                        {r.doctorName || "Unknown Doctor"}
                      </td>
                      <td className="border p-3">{r.diagnosis}</td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      <Footer />
    </>
  );
}
