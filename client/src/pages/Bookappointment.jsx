import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";
import { useContext } from "react";
import Patientsidebar from "../components/Patientsidebar";
export default function AppointmentPage() {
    const { user } = useContext(AuthContext);
     const navigate = useNavigate();
  const [departments, setDepartments] = useState([]);
  const [doctors, setDoctors] = useState([]);

  const [selectedDept, setSelectedDept] = useState("");
  const [selectedDoctor, setSelectedDoctor] = useState("");
  const [selectedDate, setSelectedDate] = useState("");

  const [message, setMessage] = useState("");

const patientId = localStorage.getItem("patientId");
// console.log("Patient ID:", patientId);


  // Load Departments
  useEffect(() => {
    axios.get(`${import.meta.env.VITE_API_URL}/api/doctor/department`)
      .then(res => setDepartments(res.data.specializations))
      .catch(err => console.error(err));
  }, []);

  const fetchDoctors = async (department) => {
  try {
    const res = await axios.get(
      `${import.meta.env.VITE_API_URL}/api/doctor/byDepartment/${department}`
    );
    setDoctors(res.data.doctors || []);
  } catch (err) {
    console.error("Error loading doctors:", err);
  }
};

  // Book Appointment
  const book = async () => {
   
    if (!selectedDept || !selectedDoctor || !selectedDate) {
      return setMessage("Please fill all fields!");
    }
//console.log(patientId);
    try {
      const res = await axios.post(`${import.meta.env.VITE_API_URL}/api/appointment/bookappointment`, {
        patientId,
        doctorId: selectedDoctor,
        date: selectedDate,
          });

      setMessage("Appointment booked successfully! to confirm your appointment please pay consultation fee");
      
      setTimeout(() => {
      navigate("/payment", {
  state: {
    appointmentId: res.data.appointment.appointmentId,
    patientId,
    amount: 500
  }
});
    }, 1500);


  }
   
    
    catch (err) {
       
      setMessage(err.response.data.message);
    }
  };

  return (
  <>
  <Patientsidebar />

<div className="min-h-screen bg-gray-100 bg-[url('/src/assets/image/back.jpg')] 
                bg-cover bg-center px-4 py-10 md:ml-64">
  
  <div className="flex justify-center items-start">
    
    <div className="bg-white shadow-2xl rounded-2xl 
                    w-full max-w-md sm:max-w-lg 
                    p-6 sm:p-8">

      {/* Title */}
      <h1 className="text-2xl sm:text-3xl font-bold 
                     text-center text-[#03506F] mb-6">
        Book Appointment
      </h1>

      {/* Department */}
      <select
        className="w-full p-2.5 border rounded-lg mb-4 
                   focus:outline-none focus:ring-2 
                   focus:ring-[#0097A0]"
        value={selectedDept}
        onChange={(e) => {
          setSelectedDept(e.target.value);
          setSelectedDoctor("");
          fetchDoctors(e.target.value);
        }}
      >
        <option value="">-- Select Department --</option>
        {departments.map((d) => (
          <option key={d} value={d}>{d}</option>
        ))}
      </select>

      {/* Doctor */}
      <select
        className="w-full p-2.5 border rounded-lg mb-4 
                   focus:outline-none focus:ring-2 
                   focus:ring-[#0097A0] disabled:bg-gray-100"
        value={selectedDoctor}
        onChange={(e) => setSelectedDoctor(e.target.value)}
        disabled={!selectedDept}
      >
        <option value="">-- Select Doctor --</option>
        {doctors.map((doc) => (
          <option key={doc.doctorId} value={doc.doctorId}>
            {doc.name}
          </option>
        ))}
      </select>

      {/* Date */}
      <input
        type="date"
        className="w-full p-2.5 border rounded-lg mb-6
                   focus:outline-none focus:ring-2 
                   focus:ring-[#0097A0]"
        value={selectedDate}
        onChange={(e) => setSelectedDate(e.target.value)}
      />

      {/* Button */}
      <button
        onClick={book}
        className="w-full bg-gradient-to-r 
                   from-[#0097A0] to-[#03506F] 
                   text-white py-2.5 rounded-lg 
                   font-semibold tracking-wide
                   hover:from-yellow-500 hover:to-yellow-700
                   transition-all duration-300"
      >
        Book Appointment
      </button>

      {/* Message */}
      {message && (
        <p className="text-center mt-4 font-semibold text-red-600">
          {message}
        </p>
      )}

    </div>
  </div>
</div>

  
  
    </>
  );
}
