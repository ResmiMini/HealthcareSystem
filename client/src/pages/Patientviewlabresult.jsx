// pages/PatientLabResults.jsx
import React, { useEffect, useState } from "react";
import axios from "axios";
import Patientsidebar from "../components/Patientsidebar";
import jsPDF from "jspdf";
import Logo from "../assets/image/Logo.png";
export default function Patientviewlabresult() {
  const [reports, setReports] = useState([]);
  const patientId = localStorage.getItem("patientId");

  useEffect(() => {
    axios
      .get(`${import.meta.env.VITE_API_URL}/api/labreports/patientreport/${patientId}`)
      .then((res) => setReports(res.data));
  }, []);
   const viewPDF = (report) => {
    
    const doc = new jsPDF();
    let y = 15; // vertical cursor
  
    // ===== HEADER =====
    doc.addImage(Logo, "PNG", 10, y, 22, 22);
  
    doc.setFontSize(16);
    doc.setFont("helvetica", "bold");
    doc.text("HEALTHCARE  HOSPITAL", 40, y + 6);
  
    doc.setFontSize(11);
    doc.setFont("helvetica", "normal");
    doc.text("Your Health Our Responsibility", 40, y + 13);
    doc.text("Nooranadu Alappuzha, Kerala", 40, y + 18);
  
    y += 30;
    doc.line(10, y, 200, y); // divider
  
    // ===== TITLE =====
    y += 10;
    doc.setFontSize(14);
    doc.setFont("helvetica", "bold");
    doc.text("LAB Report", 80, y);
  
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
      `Test: ${report.testName}`,
      170
    );
    doc.text(diagnosisText, 14, y);
    y += diagnosisText.length * 6;
  
    y += 5;
    doc.text(`Result: ${report.result}`, 14, y);
  
    // ===== OPEN PDF =====
    const pdfUrl = doc.output("bloburl");
    window.open(pdfUrl);
  };

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
      onClick={() => viewPDF(r)}
      className="px-4 py-1 bg-blue-600 text-white rounded hover:bg-blue-700"
    >
      View
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
