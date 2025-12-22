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
   // starting position
y += 12;
doc.setFontSize(11);
doc.setFont("helvetica", "normal");

const labelX = 14;   // left column (labels)
const valueX = 60;   // right column (values)
const maxWidth = 130;
const lineGap = 8;

// ───────── Patient ID ─────────
doc.setFont("helvetica", "bold");
doc.text("Patient ID :", labelX, y);
doc.setFont("helvetica", "normal");
doc.text(patientId, valueX, y);
y += lineGap;

// ───────── Doctor Name ─────────
doc.setFont("helvetica", "bold");
doc.text("Doctor Name :", labelX, y);
doc.setFont("helvetica", "normal");
doc.text(report.doctorName || "-", valueX, y);
y += lineGap;

// ───────── Test Name (wrapped) ─────────
doc.setFont("helvetica", "bold");
doc.text("Test Name :", labelX, y);
doc.setFont("helvetica", "normal");

const testText = doc.splitTextToSize(
  report.testName || "-",
  maxWidth
);
doc.text(testText, valueX, y);
y += testText.length * lineGap;

// ───────── Result (wrapped & highlighted) ─────────
y += 4;
doc.setFont("helvetica", "bold");
doc.text("Result :", labelX, y);
doc.setFont("helvetica", "normal");

const resultText = doc.splitTextToSize(
  report.result || "Pending",
  maxWidth
);
doc.text(resultText, valueX, y);
y += resultText.length * lineGap;

    // ===== OPEN PDF =====
    const pdfUrl = doc.output("bloburl");
    window.open(pdfUrl);
  };

  return (
    <div className="flex">
      <Patientsidebar />
      <div className="p-6 w-full">
        <h2 className="text-xl font-bold mb-4">My Lab Results</h2>

        <table className="w-full border border-gray-400 border-collapse bg-white">
  <thead className="bg-gray-100">
    <tr>
      
      <th className="border border-gray-400 px-3 py-2">Doctor</th>
      <th className="border border-gray-400 px-3 py-2">Test</th>
      <th className="border border-gray-400 px-3 py-2">Result</th>
      <th className="border border-gray-400 px-3 py-2">PDF</th>
    </tr>
  </thead>

  <tbody>
    {reports.map((r, i) => (
      <tr
        key={r.labReportId || i}
        className="hover:bg-gray-50"
      >
       
        <td className="border border-gray-400 px-3 py-2 text-center">
          {r.doctorName}
        </td>
        <td className="border border-gray-400 px-3 py-2 text-center">
          {r.testName}
        </td>
        <td className="border border-gray-400 px-3 py-2 text-center font-semibold">
          {r.result}
        </td>
        <td className="border border-gray-400 px-3 py-2 text-center">
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
