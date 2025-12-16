import React, { useEffect, useState } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";

export default function DoctorConsult() {
  const [testName, setTestName] = useState("");
  const [medicines, setMedicines] = useState([]);
  const [categories, setCategories] = useState([]);
  const [patient, setPatient] = useState(null);
  const { patientId,appointmentId } = useParams();


  useEffect(() => {
    const fetchPatient = async () => {
      try {
        const res = await axios.get(
          `${import.meta.env.VITE_API_URL}/api/patient/getByPatientId/${patientId}`
        );
        setPatient(res.data);
      } catch (err) {
        console.error(err);
      }
    };

    fetchPatient();
  }, [patientId]);


  const [form, setForm] = useState({
    patientId: "",
    patientName: "",
    symptoms: "",
    diagnosis: "",
    medicines: [
      {
        category: "", 
        medicineId:"",
        dosage: "",
        frequency: "",
      },
    ],
  });

  const cleanedMedicines = form.medicines.map(m => ({
  medicineId: m.medicineId,
  dosage: m.dosage,
  frequency: Number(m.frequency),
}));
  // Fetch medicines
  useEffect(() => {
    const fetchMedicines = async () => {
      const res = await axios.get(`${import.meta.env.VITE_API_URL}/api/medicine/getallmedicine`);
      setMedicines(res.data);

      const uniqueCategories = [
        ...new Set(res.data.map((m) => m.category)),
      ];
      setCategories(uniqueCategories);
    };
    fetchMedicines();
  }, []);

  // Handle basic fields
  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  // Handle medicine row changes
  const handleMedicineChange = (index, e) => {
    const updated = [...form.medicines];
    updated[index][e.target.name] = e.target.value;
    setForm({ ...form, medicines: updated });
  };

  // Add medicine row
  const addMedicine = () => {
    setForm({
      ...form,
      medicines: [
        ...form.medicines,
        { category: "",medicineId: "", dosage: "", frequency: "" },
      ],
    });
  };

  // Remove medicine row
  const removeMedicine = (index) => {
    const updated = form.medicines.filter((_, i) => i !== index);
    setForm({ ...form, medicines: updated });
  };

  const handleSubmit = async (e) => {
  e.preventDefault();

  try {
    console.log("appointmentId before POST:", appointmentId);
    await axios.post(`${import.meta.env.VITE_API_URL}/api/medicalrecord/addmedicalrecord`, {
      patientId: patient.patientId,
      doctorId: localStorage.getItem("doctorId"),
      appointmentId:appointmentId,
      symptoms: form.symptoms,
      diagnosis: form.diagnosis,
    });
console.log("FORM medicines:", form.medicines);
console.log("CLEAN medicines:", cleanedMedicines);
console.log(
  "🚀 POSTING TO:",
  `${import.meta.env.VITE_API_URL}/api/prescriptions/addprescription`
);
    await axios.post(`${import.meta.env.VITE_API_URL}/api/prescriptions/addprescription`, {
      patientId: patient.patientId,
      doctorId: localStorage.getItem("doctorId"),
      appointmentId:appointmentId,
      medicines: cleanedMedicines,
    });

    alert("Medical record & prescription saved successfully");
  } catch (err) {
    console.error(err);
    alert("Failed to save data");
  }
};


  return (
    <div className="min-h-screen bg-gray-100 p-4 md:p-8">
      <div className="max-w-5xl mx-auto bg-white p-6 rounded-xl shadow">

        <h2 className="text-2xl font-bold text-center text-yellow-700 mb-6">
          Patient Prescription
        </h2>

        <form onSubmit={handleSubmit} className="space-y-6">

          {/* Patient Info */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <input
              name="patientId"
              placeholder={patient?.patientId}
              value={form.patientId}
              onChange={handleChange}
              className="border p-2 rounded-md"
              
            />
            <input
              name="appoiId"
              placeholder={appointmentId}
              value={form.patientId}
              onChange={handleChange}
              className="border p-2 rounded-md"
              
            />
            <input
              name="patientName"
              placeholder={patient?.name}
              value={form.patientName}
              onChange={handleChange}
              className="border p-2 rounded-md"
             
            />
          </div>

          {/* Symptoms & Diagnosis */}
          <textarea
            name="symptoms"
            placeholder="Symptoms"
            value={form.symptoms}
            onChange={handleChange}
            className="border p-2 rounded-md w-full"
          />

          <textarea
            name="diagnosis"
            placeholder="Diagnosis"
            value={form.diagnosis}
            onChange={handleChange}
            className="border p-2 rounded-md w-full"
          />

          {/* Medicines Table */}
          <div className="overflow-x-auto">
            <h1 className="text-4xl text-center text-yellow-600">MEDICINES</h1>
            <br></br>
            <table className="min-w-full border border-gray-300">
              <thead className="bg-gray-100">
                <tr>
                  <th className="border px-2 py-2">Category</th>
                  <th className="border px-2 py-2">Medicine</th>
                  <th className="border px-2 py-2">Dosage</th>
                  <th className="border px-2 py-2">Duration (Days)</th>
                  <th className="border px-2 py-2">Action</th>
                </tr>
              </thead>
              <tbody>
                {form.medicines.map((med, index) => {
                  const filtered = medicines.filter(
                    (m) => m.category === med.category
                  );

                  return (
                    <tr key={index}>
                      <td className="border p-2">
                        <select
                          name="category"
                          value={med.category}
                          onChange={(e) => handleMedicineChange(index, e)}
                          className="w-full border p-1 rounded"
                        >
                          <option value="">Select</option>
                          {categories.map((cat) => (
                            <option key={cat} value={cat}>
                              {cat}
                            </option>
                          ))}
                        </select>
                      </td>

                      <td className="border p-2">
                        <select
                          name="medicineId"
                          value={med.medicineId}
                          onChange={(e) => handleMedicineChange(index, e)}
                          className="w-full border p-1 rounded"
                          disabled={!med.category}
                        >
                          <option value="">Select</option>
                          {filtered.map((m) => (
                            <option key={m.medicineId} value={m.medicineId}>
                              {m.name}
                            </option>
                          ))}
                        </select>
                      </td>

                      <td className="border p-2">
                        <input
                          name="dosage"
                          placeholder="1-0-1"
                          value={med.dosage}
                          onChange={(e) => handleMedicineChange(index, e)}
                          className="border p-1 rounded w-full"
                        />
                      </td>

                      <td className="border p-2">
                        <input
                          name="frequency"
                          type="number"
                          placeholder="Days"
                          value={med.frequency}
                          onChange={(e) => handleMedicineChange(index, e)}
                          className="border p-1 rounded w-full"
                        />
                      </td>

                      <td className="border p-2 text-center bg-red-300">
                        {form.medicines.length > 1 && (
                          <button
                            type="button"
                            onClick={() => removeMedicine(index)}
                            className="text-red-600 font-bold"
                          >
                        DELETE
                          </button>
                        )}
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>

          {/* Add Medicine */}
          <button
            type="button"
            onClick={addMedicine}
            className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700"
          >
            + Add Medicine
          </button>


  <h1 className="text-4xl text-center text-yellow-600">LAB TEST </h1>
          <select
  value={testName}
  onChange={(e) => setTestName(e.target.value)}
  className="w-full border p-2 rounded-md"
>
  <option value="">Select Test</option>
  <option value="Blood Test">Blood Test</option>
  <option value="Urine Test">Urine Test</option>
  <option value="X-Ray">X-Ray</option>
  <option value="ECG">ECG</option>
  <option value="MRI Scan">MRI Scan</option>
</select>

          {/* Submit */}
          <div className="text-right">
            <button
              type="submit"
              className="bg-yellow-600 text-white px-6 py-2 rounded hover:bg-yellow-700"
            >
              Save Prescription
            </button>
          </div>

        </form>
      </div>
    </div>
  );
}
