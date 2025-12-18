import React, { useState } from "react";
import axios from "axios";
import Staffsidebar from "../components/Staffsidebar";

export default function StaffBilling() {
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
            `${import.meta.env.VITE_API_URL}/api/medicine/${m.medicineId}`
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

      <div className="ml-72 p-6 min-h-screen bg-gray-50">
        <h1 className="text-2xl font-bold mb-6 text-[#03506F]">
          Medicine billing
        </h1>

        {/* Patient ID */}
        <div className="flex gap-4 mb-6">
          <input
            type="text"
            placeholder="Enter Patient ID"
            value={patientId}
            onChange={(e) => setPatientId(e.target.value)}
            className="border p-2 rounded w-64"
          />
          <button
            onClick={fetchPrescription}
            className="bg-[#03506F] text-white px-5 py-2 rounded"
          >
            Fetch Prescription
          </button>
        </div>

        {error && (
          <p className="text-red-600 font-semibold mb-4">{error}</p>
        )}

        {/* Prescription Info */}
        {prescription && (
          <div className="bg-white p-4 rounded shadow mb-6">
            <p><b>Prescription ID:</b> {prescription.prescriptionId}</p>
            <p><b>Doctor ID:</b> {prescription.doctorId}</p>
            <p><b>Date:</b> {new Date(prescription.date).toLocaleDateString()}</p>
          </div>
        )}

        {/* Line-by-line Medicine Billing */}
        {billItems.map((item, index) => (
          <div
            key={index}
            className="bg-white rounded shadow p-4 mb-4"
          >
            <p className="text-lg font-bold text-[#03506F]">
              💊 {item.name}
            </p>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-3 text-sm">
              <p><b>Dosage:</b> {item.dosage}</p>
              <p><b>Frequency:</b> {item.frequency}</p>
              <p><b>Price:</b> ₹{item.price}</p>

              <div>
                <label className="block font-semibold mb-1">
                  Quantity
                </label>
                <input
                  type="number"
                  min="1"
                  value={item.quantity}
                  onChange={(e) =>
                    updateQuantity(index, Number(e.target.value))
                  }
                  className="border p-1 rounded w-20"
                />
              </div>
            </div>

            <div className="mt-3 text-right font-bold text-green-600">
              Line Total: ₹{item.total}
            </div>
          </div>
        ))}

        {/* Grand Total */}
        {billItems.length > 0 && (
          <div className="mt-6 text-right text-2xl font-bold text-[#03506F]">
            Total Amount: ₹{totalAmount}
          </div>
        )}
      </div>
    </>
  );
}
