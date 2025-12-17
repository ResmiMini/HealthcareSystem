import React, { useEffect, useState } from "react";
import axios from "axios";
import Patientsidebar from "../components/Patientsidebar"

export default function Patientviewmedicine() {
  const [medicines, setMedicines] = useState([]);
  const patientId = localStorage.getItem("patientId");

  useEffect(() => {
    axios
      .get(
        `${import.meta.env.VITE_API_URL}/api/prescriptions/patientviewmedicine/${patientId}`
      )
      .then((res) => setMedicines(res.data.medicines))
      .catch((err) => console.error(err));
  }, []);

  return (
  <>
    <div className="flex min-h-screen bg-[url('/src/assets/image/back.jpg')]  py-2 px-4 mx-10 ">
         <Patientsidebar />
      

      {/* Desktop Table */}
      <div className="hidden md:block mt-6 overflow-x-auto">
        <table className="w-full border rounded-lg overflow-hidden shadow-md">
          <thead className="bg-gray-100">
            <tr>
              <th className="p-3 border text-left">Medicine</th>
              <th className="p-3 border text-left">Category</th>
              <th className="p-3 border text-left">dosage</th>
            <th className="p-3 border text-left">frequency</th>

            </tr>
          </thead>

          <tbody>
            {medicines.map((m) => (
              <tr
                key={m.medicineId}
                className="hover:bg-blue-50 transition"
              >
                <td className="p-3 border font-semibold text-gray-800">
                  {m.name}
                </td>
                <td className="p-3 border">
                  <span className="px-3 py-1 text-sm rounded-full bg-blue-100 text-blue-800">
                    {m.category}
                  </span>
                </td>
                <td className="p-3 border text-green-600 font-bold">
                  ₹{m.price}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Mobile Cards */}
      <div className="md:hidden mt-6 space-y-4">
  {medicines.map((m, index) => (
    <div
      key={`${m.medicineId}-${index}`}
      className="bg-white rounded-xl shadow-md p-4 border hover:shadow-lg transition"
    >
      {/* Medicine Name */}
      <h2 className="text-lg font-bold text-[#03506F]">
        {m.name}
      </h2>

      {/* Category */}
      <span className="inline-block mt-1 text-xs bg-blue-100 text-blue-700 px-3 py-1 rounded-full">
        {m.category}
      </span>

      {/* Dosage & Frequency */}
      <div className="mt-3 space-y-1 text-sm text-gray-700">
        <p>
          💊 <span className="font-semibold">Dosage:</span> {m.dosage}
        </p>
        <p>
          ⏰ <span className="font-semibold">Frequency:</span> {m.frequency}
        </p>
      </div>

      {/* Price (Optional) */}
      {m.price && (
        <div className="mt-3 text-right">
          <span className="text-green-600 font-bold">
            ₹{m.price}
          </span>
        </div>
      )}
    </div>
  ))}
</div>


      {/* Empty State */}
      {medicines.length === 0 && (
        <div className="text-center mt-10 text-gray-500">
          <p>No medicines prescribed yet.</p>
        </div>
      )}
    </div>
    </>
  );
}
