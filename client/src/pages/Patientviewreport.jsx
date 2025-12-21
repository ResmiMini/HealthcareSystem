import React,{ useEffect, useState } from "react";
import axios from "axios";
import Patientsidebar from "../components/Patientsidebar";
import Footer from "../components/Footer";
import jsPDF from "jspdf";
import Logo from "../assets/image/Logo.png";

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

        setReports(res.data.records); 
      } catch (err) {
        setError(err.response?.data?.message || "Something went wrong");
      }
    };

    if (patientId) fetchReports();
  }, [patientId]);
  const viewPDF = (report) => {
  
  const doc = new jsPDF();
  let y = 15; // vertical cursor

  // ===== HEADER =====
  doc.addImage(hospitalLogo, "PNG", 10, y, 22, 22);

  doc.setFontSize(16);
  doc.setFont("helvetica", "bold");
  doc.text("ABC MULTI SPECIALITY HOSPITAL", 40, y + 6);

  doc.setFontSize(11);
  doc.setFont("helvetica", "normal");
  doc.text("Caring for Life", 40, y + 13);
  doc.text("Trivandrum, Kerala", 40, y + 18);

  y += 30;
  doc.line(10, y, 200, y); // divider

  // ===== TITLE =====
  y += 10;
  doc.setFontSize(14);
  doc.setFont("helvetica", "bold");
  doc.text("Medical Report", 80, y);

  // ===== CONTENT =====
  y += 12;
  doc.setFontSize(11);
  doc.setFont("helvetica", "normal");

  doc.text(`Patient ID: ${patientId}`, 14, y);
  y += 8;

  doc.text(`Doctor Name: ${report.doctorName}`, 14, y);
  y += 8;

  // Diagnosis (wrapped)
  const diagnosisText = doc.splitTextToSize(
    `Diagnosis: ${report.diagnosis}`,
    170
  );
  doc.text(diagnosisText, 14, y);
  y += diagnosisText.length * 6;

  y += 5;
  doc.text(`Date: ${new Date().toLocaleDateString()}`, 14, y);

  // ===== OPEN PDF =====
  const pdfUrl = doc.output("bloburl");
  window.open(pdfUrl);
};

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
                  <th className="border p-3">Action</th>
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

 <td className="border p-3 text-center">
    <button
      onClick={() => viewPDF(r)}
      className="px-4 py-1 bg-blue-600 text-white rounded hover:bg-blue-700"
    >
      View
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

      <Footer />
    </>
  );
}
