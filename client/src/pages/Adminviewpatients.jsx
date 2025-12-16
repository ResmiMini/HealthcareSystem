import { useEffect, useState } from "react";
import React from "react";
import axios from "axios";
import AdminSidebar from "../components/Adminsidebar";
import { useNavigate,Link } from "react-router-dom";


export default function Adminviewpatient() {
  const [patients, setPatients] = useState([]);
const navigate = useNavigate();
  useEffect(() => {
    const fetchPatients = async () => {
      const res = await axios.get(
        `${import.meta.env.VITE_API_URL}/api/patient/allpatient`
      );
      setPatients(res.data);
    };

    fetchPatients();
  }, []);

  return (
    <div className="flex min-h-screenbg-[url('/src/assets/image/back.jpg')]">
      <AdminSidebar />

      <div className="flex-1 p-8">
        <h2 className="text-2xl font-bold mb-6">
          All Patients
        </h2>

        <div className="bg-white rounded-xl shadow p-4 overflow-x-auto">
          <table className="w-full border-collapse">
            <thead>
              <tr className="bg-gray-200">
                <th className="border p-3">Patient ID</th>
                <th className="border p-3">Name</th>
                <th className="border p-3">Age</th>
                <th className="border p-3">Gender</th>
                <th className="border p-3">Phone</th>
                <th className="border p-3">Blood Group</th>
                 <th className="border p-3">Actions</th>
              </tr>
            </thead>

            <tbody>
              {patients.length === 0 ? (
                <tr>
                  <td colSpan="6" className="text-center p-4">
                    No patients found
                  </td>
                </tr>
              ) : (
                patients.map((p) => (
                  <tr key={p.patientId} className="hover:bg-gray-50">
                    <td className="border p-3">{p.patientId}</td>
                    <td className="border p-3">{p.name}</td>
                    <td className="border p-3">{p.age}</td>
                    <td className="border p-3">{p.gender}</td>
                    <td className="border p-3">{p.phone}</td>
                    <td className="border p-3">{p.blood_group}</td>
                    <td className="border p-3 text-center space-x-2">
                      <button
                        onClick={() =>
                          navigate(`/adminviewpatientrecords/${p.patientId}`)
                        }
                        className="bg-yellow-600 text-white px-3 py-1 rounded hover:bg-blue-700"
                      >
                        View Records
                      </button>

                      <button
                        onClick={() => deletePatient(p.patientId)}
                        className="bg-red-600 text-white px-3 py-1 rounded hover:bg-red-700"
                      >
                        Delete
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
  );
}
