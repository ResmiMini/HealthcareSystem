import React, { useEffect, useState } from "react";
import axios from "axios";
import Adminsidebar from "../components/Adminsidebar";

export default function Adminviewdoctor() {
  const [message, setMessage] = useState("");
  const [doctors, setDoctors] = useState([]);
  const [selectedDoctor, setSelectedDoctor] = useState(null);

  useEffect(() => {
    fetchDoctors();
  }, []);

  const fetchDoctors = async () => {
    const res = await axios.get(`${import.meta.env.VITE_API_URL}/api/doctor/alldoctors`);
    setDoctors(res.data);
  };

  const approveDoctor = async (doctorId) => {
    await axios.put(`${import.meta.env.VITE_API_URL}/api/doctor/approvedoctor/${doctorId}`);
    setMessage("✅ Doctor approved successfully");
    setTimeout(() => setMessage(""), 3000);
    fetchDoctors();
  };

  const deleteDoctor = async (doctorId) => {
    if (window.confirm("Are you sure?")) {
      await axios.delete(`${import.meta.env.VITE_API_URL}/api/doctor/deletedoctor/${doctorId}`);
      fetchDoctors();
    }
  };

  const viewDoctor = async (doctorId) => {
  try {
    console.log("Fetching doctor 👉", doctorId);

    const res = await axios.get(
      `${import.meta.env.VITE_API_URL}/api/doctor/getByDoctorId/${doctorId}`
    );

    setSelectedDoctor(res.data.doctor);
    
  } catch (err) {
    console.error("View doctor error 👉", err);
  }
};
  return (
    <>
    <div className="flex min-h-screen bg-[url('/src/assets/image/back.jpg')]">
    <Adminsidebar/>
    <div className="p-6">
      <br></br>
      <h1 className="text-2xl font-bold mb-4">Doctor Approvals</h1>

      {/* TABLE */}
      <table className="w-full border">
        <thead className="bg-gray-200">
          <tr>
            <th className="p-2 border">Doctor ID</th>
            <th className="p-2 border">Name</th>
            <th className="p-2 border">Actions</th>
          </tr>
        </thead>
        <tbody>
          {doctors.map((d) => (
            <tr key={d._id}>
              <td className="p-2 border">{d.doctorId}</td>
              <td className="p-2 border">{d.name}</td>
              <td className="p-2 border space-x-2">
                <button
                  onClick={() => viewDoctor(d.doctorId)}
                  className="px-3 py-1 bg-blue-500 text-white rounded"
                >
                  View
                </button>

                <button
                  disabled={d.status === "approved"}
                  onClick={() => approveDoctor(d.doctorId)}
                  className="px-3 py-1 bg-green-500 text-white rounded disabled:opacity-50"
                >
                  Approve
                </button>

                <button
                  onClick={() => deleteDoctor(d.doctorId)}
                  className="px-3 py-1 bg-red-500 text-white rounded"
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* VIEW DETAILS */}
      {selectedDoctor && (
        <div className="mt-6 p-4 border rounded bg-gray-50">
          <h2 className="text-xl font-bold mb-2">Doctor Details</h2>

          <p><b>Name:</b> {selectedDoctor.name}</p>
          <p><b>Email:</b> {selectedDoctor.email}</p>
          <p><b>Phone:</b> {selectedDoctor.phone}</p>
          <p><b>Department:</b> {selectedDoctor.specialization}</p>
          <p><b>Qualification:</b> {selectedDoctor.qualification}</p>
          <p><b>Status:</b> {selectedDoctor.status}</p>

          {selectedDoctor.resume && (
           <a
  href={`${selectedDoctor.resume}?dl=true`}
 target="_blank"
  rel="noopener noreferrer"
  className="text-blue-600 underline"
>
  View Resume (PDF)
</a>
          )}
        </div>
      )}
    </div>
    </div>
    </>
  );
}
