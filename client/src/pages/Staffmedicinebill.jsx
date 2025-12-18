import React, { useState } from "react";
import axios from "axios";
import Staffsidebar from "../components/Staffsidebar";

export default function Staffmedicinebill() {
  const [patientId, setPatientId] = useState("");
  const [prescription, setPrescription] = useState(null);
  const [billItems, setBillItems] = useState([]);
  const [totalAmount, setTotalAmount] = useState(0);
  const [error, setError] = useState("");

  // Fetch prescription
  const fetchPrescription = async () => {
    try {
      setError("");
      setPrescription(null);
      setBillItems([]);

      const res = await axios.get(
        `${import.meta.env.VITE_API_URL}/api/prescriptions/patientviewmedicine/${patientId}`
      );

      const pres = res.data.prescription;
      setPrescription(pres);

      const items = await Promise.all(
        pres.medicines.map(async (m) => {
          const medRes = await axios.get(
            `${import.meta.env.VITE_API_URL}/api/medicine/getBymedicineId/${m.medicineId}`
          );

          return {
            medicineId: m.medicineId,
            name: medRes.data.name,
            dosage: m.dosage,
            frequency: m.frequency,
            price: medRes.data.price,
            quantity: 1,
            total: medRes.data.price
          };
        })
      );

      setBillItems(items);
      calculateTotal(items);

    } catch (err) {
      setError("Prescription not found for this patient ID");
    }
  };

  // Update quantity
  const updateQuantity = (index, qty) => {
    const updated = [...billItems];
    updated[index].quantity = qty;
    updated[index].total = qty * updated[index].price;

    setBillItems(updated);
    calculateTotal(updated);
  };

  const calculateTotal = (items) => {
    const sum = items.reduce((acc, item) => acc + item.total, 0);
    setTotalAmount(sum);
  };

  return (

      <>
  <Staffsidebar />

  <div className="ml-72 p-8 min-h-screen bg-gray-100">
    <h1 className="text-3xl font-bold mb-8 text-[#03506F]">
      Medicine Billing
    </h1>

    {/* Patient ID Section */}
    <div className="bg-white p-5 rounded-xl shadow mb-8 flex items-center gap-4">
      <input
        type="text"
        placeholder="Enter Patient ID"
        value={patientId}
        onChange={(e) => setPatientId(e.target.value)}
        className="border p-3 rounded-md w-72 focus:outline-none focus:ring-2 focus:ring-[#03506F]"
      />
      <button
        onClick={fetchPrescription}
        className="bg-[#03506F] text-white px-6 py-3 rounded-md hover:bg-[#02394f]"
      >
        Fetch Prescription
      </button>
    </div>

    {error && (
      <p className="text-red-600 font-semibold mb-6">{error}</p>
    )}

    {/* Prescription Info */}
    {prescription && (
      <div className="bg-white p-5 rounded-xl shadow mb-8 grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
        <p><b>Prescription ID:</b> {prescription.prescriptionId}</p>
        <p><b>Doctor ID:</b> {prescription.doctorId}</p>
        <p><b>Date:</b> {new Date(prescription.date).toLocaleDateString()}</p>
      </div>
    )}

    {/* Medicines */}
    {billItems.map((item, index) => (
      <div
        key={index}
        className="bg-white rounded-xl shadow p-6 mb-6"
      >
        {/* Medicine Name + Line Total */}
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-lg font-bold text-[#03506F]">
            {index + 1}. {item.name}
          </h2>
          <span className="text-lg font-bold text-green-600">
            ₹{item.total}
          </span>
        </div>

        {/* Details */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-sm items-end">
          <div>
            <p className="text-gray-500">Dosage</p>
            <p className="font-semibold">{item.dosage}</p>
          </div>

          <div>
            <p className="text-gray-500">Frequency</p>
            <p className="font-semibold">{item.frequency}</p>
          </div>

          <div>
            <p className="text-gray-500">Unit Price</p>
            <p className="font-semibold">₹{item.price}</p>
          </div>

          <div>
            <label className="text-gray-500 block mb-1">
              Quantity
            </label>
            <input
              type="number"
              min="1"
              value={item.quantity}
              onChange={(e) =>
                updateQuantity(index, Number(e.target.value))
              }
              className="border p-2 rounded-md w-24 text-center focus:outline-none focus:ring-2 focus:ring-[#03506F]"
            />
          </div>
        </div>
      </div>
    ))}

    {/* Grand Total */}
    {billItems.length > 0 && (
      <div className="bg-white p-6 rounded-xl shadow mt-8 flex justify-between items-center">
        <p className="text-xl font-semibold text-gray-700">
          Grand Total
        </p>
        <p className="text-3xl font-bold text-[#03506F]">
          ₹{totalAmount}
        </p>
      </div>
    )}
  </div>
</>

  );
}
