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
    <Docsidebar/>
    <div className="flex justify-center mt-10">
      <div className="bg-white shadow-lg rounded-xl p-6 w-full max-w-3xl">
        <h2 className="text-2xl font-bold text-[#03506F] mb-4">
          👨‍⚕️ Doctor Profile
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
          <p><b>Doctor ID:</b> {doctor.doctorId}</p>
          <p><b>Name:</b> {doctor.name}</p>
          <p><b>Department:</b> {doctor.department}</p>
          <p><b>Specialization:</b> {doctor.specialization}</p>
          <p><b>Qualification:</b> {doctor.qualification}</p>
          <p><b>Experience:</b> {doctor.experience} years</p>
          <p><b>Phone:</b> {doctor.phone}</p>
          <p><b>Email:</b> {doctor.email}</p>
          <p><b>Gender:</b> {doctor.gender}</p>
          <p>
            <b>Status:</b>{" "}
            <span className={`font-semibold ${doctor.status === "Approved"
              ? "text-green-600"
              : "text-red-600"}`}>
              {doctor.status}
            </span>
          </p>
        </div>
      </div>
    </div>
    </>
  );
}
