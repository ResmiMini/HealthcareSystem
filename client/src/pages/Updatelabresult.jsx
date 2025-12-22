import React, { useState } from "react";
import axios from "axios";

export default function Updatelabresult() {
  const [labReportId, setLabReportId] = useState("");
  const [details, setDetails] = useState(null);
  const [result, setResult] = useState("");
  const [loading, setLoading] = useState(false);

  const fetchDetails = async () => {
    try {
      setLoading(true);
      const res = await axios.get(
        `${import.meta.env.VITE_API_URL}/api/labreports/labreportbyid/${labReportId}`
      );
      setDetails(res.data);
      setResult(res.data.result || "");
    } catch (err) {
      alert("Lab report not found");
    } finally {
      setLoading(false);
    }
  };

  const saveResult = async () => {
    try {
      await axios.put(
        `${import.meta.env.VITE_API_URL}/api/labreports/updateresult/${labReportId}`,
        { result }
      );
      alert("Result saved successfully ✅");
      setDetails(null);
      setLabReportId("");
      setResult("");
    } catch (err) {
      alert("Failed to save result");
    }
  };

  return (
    <div className="p-6 max-w-xl mx-auto bg-white rounded shadow">
      <h2 className="text-xl font-bold mb-4">Enter Lab Result</h2>

      {/* Lab Report ID */}
      <input
        type="text"
        placeholder="Enter Lab Report ID"
        value={labReportId}
        onChange={(e) => setLabReportId(e.target.value)}
        className="w-full border p-2 rounded mb-3"
      />

      <button
        onClick={fetchDetails}
        className="w-full bg-blue-600 text-white py-2 rounded"
      >
        Fetch Details
      </button>

      {loading && <p className="mt-3">Loading...</p>}

      {/* Display Details */}
      {details && (
        <div className="mt-5 space-y-3">
          <p><b>Doctor:</b> {details.doctorName}</p>
          <p><b>Patient:</b> {details.patientName}</p>
          <p><b>Test:</b> {details.testName}</p>

          <textarea
            placeholder="Enter Result"
            value={result}
            onChange={(e) => setResult(e.target.value)}
            className="w-full border p-2 rounded"
          />

          <button
            onClick={saveResult}
            className="w-full bg-green-600 text-white py-2 rounded"
          >
            Save Result
          </button>
        </div>
      )}
    </div>
  );
}
