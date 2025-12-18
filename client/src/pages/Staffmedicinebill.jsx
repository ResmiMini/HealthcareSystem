import React, { useState } from "react";
import axios from "axios";
import Staffsidebar from "../components/Staffsidebar";

export default function StaffPrescriptionDetails() {
  const [patientId, setPatientId] = useState("");
  const [medicines, setMedicines] = useState([]);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const fetchPrescriptionAndMedicines = async () => {
    try {
      setError("");
      setMedicines([]);
      setLoading(true);

      // 1️⃣ Fetch latest prescription by patientId
      const presRes = await axios.get(
        `${import.meta.env.VITE_API_URL}/api/prescriptions/patientviewmedicine/${patientId}`,
        { headers: { "Cache-Control": "no-cache" } }
      );

      const prescription = presRes.data.prescription;

      if (!prescription || !prescription.medicines) {
        setError("No prescription found for this patient");
        setLoading(false);
        return;
      }

      // 2️⃣ Fetch medicine details using medicineId
      const mergedMedicines = await Promise.all(
        prescription.medicines.map(async (pm) => {
          const medRes = await axios.get(
            `${import.meta.env.VITE_API_URL}/api/medicine/${pm.medicineId}`
          );

          return {
            medicineId: pm.medicineId,
            name: medRes.data.name,
            category: medRes.data.category,
            price: medRes.data.price,
            dosage: pm.dosage,
            frequency: pm.frequency
          };
        })
      );

      setMedicines(mergedMedicines);
      setLoading(false);

    } catch (err) {
      console.error(err);
      setError("Prescription or medicines not found");
      setLoading(false);
    }
  };

  return (
    <>
      <Staffsidebar />

      <div className="ml-72 p-8 min-h-screen bg-gray-100">
        <h1 className="text-2xl font-bold mb-6 text-[#03506F]">
          Prescription Details
        </h1>

        {/* Patient ID Input */}
        <div className="bg-white p-5 rounded-xl shadow mb-6 flex gap-4">
          <input
            type="text"
            placeholder="Enter Patient ID"
            value={patientId}
            onChange={(e) => setPatientId(e.target.value)}
            className="border p-3 rounded w-64"
          />
          <button
            onClick={fetchPrescriptionAndMedicines}
            className="bg-[#03506F] text-white px-6 py-3 rounded"
          >
            Fetch Details
          </button>
        </div>

        {/* Loading */}
        {loading && (
          <p className="text-blue-600 font-semibold">
            Fetching prescription...
          </p>
        )}

        {/* Error */}
        {error && (
          <p className="text-red-600 font-semibold mb-4">
            {error}
          </p>
        )}

        {/* Line-by-line Medicine Display */}
        {medicines.map((m, index) => (
          <div
            key={`${m.medicineId}-${index}`}
            className="bg-white rounded-xl shadow p-5 mb-5 border-l-4 border-[#03506F]"
          >
            <h2 className="text-lg font-bold text-[#03506F] mb-2">
              💊 {m.name}
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-4 gap-4 text-sm">
              <p>
                <span className="text-gray-500">Category:</span>{" "}
                <b>{m.category}</b>
              </p>
              <p>
                <span className="text-gray-500">Dosage:</span>{" "}
                <b>{m.dosage}</b>
              </p>
              <p>
                <span className="text-gray-500">Frequency:</span>{" "}
                <b>{m.frequency} days</b>
              </p>
              <p>
                <span className="text-gray-500">Price:</span>{" "}
                <b>₹{m.price}</b>
              </p>
            </div>
          </div>
        ))}

        {/* Empty State */}
        {!loading && medicines.length === 0 && !error && (
          <div className="bg-white p-6 rounded-xl shadow text-center text-gray-500">
            No medicine data to display
          </div>
        )}
      </div>
    </>
  );
}
