import React, { useEffect, useState } from "react";
import axios from "axios";
import Docsidebar from "../components/Docsidebar";

export default function Doctorprofile() {
  const [doctor, setDoctor] = useState(null);
  const doctorId = localStorage.getItem("doctorId");

  useEffect(() => {
    if (!doctorId) return;

    axios
      .get(
        `${import.meta.env.VITE_API_URL}/api/doctor/getByDoctorId/${doctorId}`
      )
      .then(res => setDoctor(res.data.doctor))
      .catch(err => console.error(err));
  }, [doctorId]);

  if (!doctor) {
    return <p className="text-center mt-10">Loading doctor details...</p>;
  }

  return (
    <>
    
  <div className="flex min-h-screen">
    {/* Sidebar */}
    <Docsidebar />

    {/* Main Content */}
    <div className="flex-1 flex justify-center items-start px-6 py-10">
      <div className="bg-white shadow-xl rounded-2xl w-full max-w-4xl">

        {/* Header */}
        <div className="bg-gradient-to-r from-[#0097A0] to-[#03506F] text-white px-6 py-4 rounded-t-2xl">
          <h2 className="text-2xl font-bold flex items-center gap-2">
            👨‍⚕️ Doctor Profile
          </h2>
        </div>

        {/* Content */}
        <div className="p-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-y-5 gap-x-10 text-sm">

            {/* Left column */}
            <div className="flex justify-between">
              <span className="font-semibold text-gray-600">Doctor ID</span>
              <span className="text-gray-800">{doctor.doctorId}</span>
            </div>

            <div className="flex justify-between">
              <span className="font-semibold text-gray-600">Name</span>
              <span className="text-gray-800">{doctor.name}</span>
            </div>

            <div className="flex justify-between">
              <span className="font-semibold text-gray-600">Department</span>
              <span className="text-gray-800">{doctor.department}</span>
            </div>

            <div className="flex justify-between">
              <span className="font-semibold text-gray-600">Specialization</span>
              <span className="text-gray-800">{doctor.specialization}</span>
            </div>

            <div className="flex justify-between">
              <span className="font-semibold text-gray-600">Qualification</span>
              <span className="text-gray-800">{doctor.qualification}</span>
            </div>

            <div className="flex justify-between">
              <span className="font-semibold text-gray-600">Experience</span>
              <span className="text-gray-800">
                {doctor.experience} years
              </span>
            </div>

            <div className="flex justify-between">
              <span className="font-semibold text-gray-600">Phone</span>
              <span className="text-gray-800">{doctor.phone}</span>
            </div>

            <div className="flex justify-between">
              <span className="font-semibold text-gray-600">Email</span>
              <span className="text-gray-800">{doctor.email}</span>
            </div>

            <div className="flex justify-between">
              <span className="font-semibold text-gray-600">Gender</span>
              <span className="text-gray-800">{doctor.gender}</span>
            </div>

            <div className="flex justify-between">
              <span className="font-semibold text-gray-600">Status</span>
              <span
                className={`font-bold ${
                  doctor.status === "Approved"
                    ? "text-green-600"
                    : "text-red-600"
                }`}
              >
                {doctor.status}
              </span>
            </div>

          </div>
        </div>

      </div>
    </div>
  </div>
</>

  );
}
