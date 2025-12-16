import React, { useState } from "react";
import axios from "axios";

export default function DoctorRegistration() {
  const [form, setForm] = useState({
    name: "",
    address: "",
    phone: "",
    email: "",
    qualification: "",
    specialization: "",
    username: "",
    password: "",
    confirmPassword: "",
  });

  const [resume, setResume] = useState(null);
  const [error, setError] = useState("");
  const [message, setMessage] = useState("");

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleFile = (e) => {
    setResume(e.target.files[0]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Password validation
    if (form.password !== form.confirmPassword) {
      setError("Passwords do not match!");
      return;
    }
    setError("");

    if (!resume) {
      setMessage("Please upload a PDF resume");
      return;
    }

    try {
      // 1️⃣ Create Login
      const loginRes = await axios.post(`${import.meta.env.VITE_API_URL}/api/login/addlogin`, {
        username: form.username,
        password: form.password,
        role: "staff"
        
        
      });
    const userId = loginRes.data.userId; // backend must return this
console.log(userId);

      // 2️⃣ Prepare FormData for Doctor Registration
      const data = new FormData();
      data.append("userId", userId); 
      data.append("name", form.name);
      data.append("address", form.address);
      data.append("phone", form.phone);
      data.append("email", form.email);
      data.append("qualification", form.qualification);
      data.append("departement", form.departement); 
     data.append("designation", form.designation); 
      data.append("resume", resume);

console.log(resume);
      // 3️⃣ Save staff
      const res = await axios.post(`${import.meta.env.VITE_API_URL}/api/staff/addStaff`,data,
        {
          headers: { "Content-Type": "multipart/form-data" },
        }
      );

      setMessage("Staff Registered Successfully ✔");

      // Reset form
      setForm({
        name: "",
        address: "",
        phone: "",
        email: "",
        qualification: "",
        departement: "",
        designation:"",
        username: "",
        password: "",
        confirmPassword: "",
      });

      setResume(null);
    } catch (error) {
      console.error(error);
      setMessage("Registration failed ❌");
    }
  };

  return (
    <div className="h-auto py-10 bg-gray-100 flex justify-center items-center">
      <div className="bg-white shadow-xl rounded-xl p-8 w-[550px]">
        <h1 className="text-3xl font-bold text-center text-[#03506F] mb-5">
          Staff Registration
        </h1>

        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Staff Name */}
          <input
            type="text"
            name="name"
            value={form.name}
            onChange={handleChange}
            required
            className="w-full border p-2 rounded-md"
            placeholder="Enter staff Name"
          />

          {/* Address */}
          <input
            type="text"
            name="address"
            value={form.address}
            onChange={handleChange}
            required
            className="w-full border p-2 rounded-md"
            placeholder="Enter Address"
          />

          {/* Phone */}
          <input
            type="text"
            name="phone"
            value={form.phone}
            onChange={handleChange}
            required
            className="w-full border p-2 rounded-md"
            placeholder="Enter Phone Number"
          />

          {/* Email */}
          <input
            type="email"
            name="email"
            value={form.email}
            onChange={handleChange}
            required
            className="w-full border p-2 rounded-md"
            placeholder="Enter Email"
          />

          {/* Qualification */}
         <select
  name="qualification"
  value={form.qualification}
  onChange={handleChange}
  required
  className="w-full border p-2 rounded-md bg-white"
>
  <option value="">Select Qualification</option>

  
  {/* Nursing Qualifications */}
  <option value="GNM">GNM (General Nursing & Midwifery)</option>
  <option value="BSc Nursing">BSc Nursing</option>
  <option value="MSc Nursing">MSc Nursing</option>

  {/* Paramedical / Allied Health */}
  <option value="DMLT">DMLT (Diploma in Medical Lab Technology)</option>
  <option value="BMLT">BMLT (Bachelor of Medical Lab Technology)</option>
  <option value="CMLT">CMLT (Certificate in Medical Lab Technology)</option>

  <option value="Diploma in Radiology">Diploma in Radiology</option>
  <option value="BSc Radiology">BSc Radiology</option>

  <option value="BPT">BPT (Physiotherapy)</option>
  <option value="MPT">MPT (Master of Physiotherapy)</option>

  <option value="BPharm">B.Pharm</option>
  <option value="MPharm">M.Pharm</option>
  <option value="DPharm">D.Pharm</option>

  <option value="Diploma in OT Technology">Diploma in OT Technology</option>
  <option value="Diploma in Dialysis Technology">Diploma in Dialysis Technology</option>
  <option value="Diploma in ECG Technology">Diploma in ECG Technology</option>

  
</select>

          {/* Departement */}
          <select
  name="departement"
  value={form.departement}
  onChange={handleChange}
  required
  className="w-full border p-2 rounded-md bg-white"
>
  <option value="">Select Department</option>
  <option value="Cardiology">Cardiology</option>
  <option value="Neurology">Neurology</option>
  <option value="Orthopedics">Orthopedics</option>
  <option value="Gastroenterology">Gastroenterology</option>
  <option value="Dermatology">Dermatology</option>
  <option value="ENT (Ear, Nose, Throat)">ENT (Ear, Nose, Throat)</option>
  <option value="Gynecology">Gynecology</option>
  <option value="Pediatrics">Pediatrics</option>
  <option value="General Medicine">General Medicine</option>
</select>
          
          {/* various designations */}
          <select
  name="designation"
  value={form.designation}
  onChange={handleChange}
  required
  className="w-full border p-2 rounded-md bg-white"
>  <option value="">Select Designation</option>
  <option value="Head Nurse">Head Nurse</option>
  <option value="Senior Staff Nurse">Senior Staff Nurse</option>
  <option value="Staff Nurse">Staff Nurse</option>
  <option value="Nursing Assistant">Nursing Assistant</option>
  <option value="Lab Technician">Lab Technician</option>
  <option value="Radiology Technician">Radiology Technician</option>
  <option value="Pharmacy Technician">Pharmacy Technician</option>
  <option value="Operation Theatre Technician">Operation Theatre Technician</option>
  <option value="ECG Technician">ECG Technician</option>
  <option value="Dialysis Technician">Dialysis Technician</option>
   </select>

          {/* Resume */}
          <input
            type="file"
            name="resume"
            accept="application/pdf"
            onChange={handleFile}
            required
            className="w-full border p-2 rounded-md"
          />

          <p className="text-2xl font-bold text-center text-[#03506F]">
            Login Details
          </p>

          {/* Username */}
          <input
            type="text"
            name="username"
            value={form.username}
            onChange={handleChange}
            required
            className="w-full p-2 border rounded-md"
            placeholder="Username"
          />

          {/* Password */}
          <input
            type="password"
            name="password"
            value={form.password}
            onChange={handleChange}
            required
            className="w-full p-2 border rounded-md"
            placeholder="Password"
          />

          {/* Confirm Password */}
          <input
            type="password"
            name="confirmPassword"
            value={form.confirmPassword}
            onChange={handleChange}
            required
            className="w-full p-2 border rounded-md"
            placeholder="Confirm Password"
          />

          {error && (
            <p className="text-red-600 text-sm mt-1">
              {error}
            </p>
          )}

          {/* Register Button */}
          <button
            type="submit"
            className="w-full bg-gradient-to-r from-[#0097A0] to-[#03506F] text-white py-2 rounded-md hover:from-yellow-500 hover:to-yellow-700"
          >
            Register Staff
          </button>
        </form>

        {message && (
          <p className="mt-4 text-center font-semibold text-blue-700">
            {message}
          </p>
        )}
      </div>
    </div>
  );
}
