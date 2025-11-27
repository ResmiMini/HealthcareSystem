import {useState } from "react";
import {useNavigate } from "react-router-dom";
import axios from "axios"
import React from "react";
export default function RegisterForm() {
  const navigate=useNavigate();

  // const [patientDetails, setPatientDetails] = useState(null);
  const [formData, setFormData] = useState({
    name: "",
    age: "",
    dob: "",
    email: "",
    phone: "",
    address: "",
    blood_group: "",
    username: "",
    password: "",
    confirmPassword: "",
  });

  const [error, setError] = useState("");

  const bloodGroups = [
    "A+","A-","B+","B-","O+","O-","AB+","AB-"
  ];


  const handleDOB = (e) => {
  const dob = e.target.value;
  const birthDate = new Date(dob);
  const today = new Date();

  let age = today.getFullYear() - birthDate.getFullYear();
  const monthDiff = today.getMonth() - birthDate.getMonth();

  if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birthDate.getDate())) {
    age--;
  }

  setFormData({ ...formData, dob: dob, age: age });
};
  // Handle Input
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // Submit


  const handleSubmit = async (e) => {
  e.preventDefault();
  if (formData.password !== formData.confirmPassword) {
    setError("Passwords do not match!");
    return;
  }

  try {
    // 1️⃣ Save Login Credentials
    const loginRes = await axios.post("http://localhost:5000/api/login/addlogin", {
      username: formData.username,
      password: formData.password,
      role: "patient"
    });

    const loginId = loginRes.data.login.userId; // backend must return this

    console.log("loginid is  " ,loginId);

    // 2️⃣ Save Patient Details
    const patientData = {
      name: formData.name,
      age: formData.age,
      dob: formData.dob,
      email: formData.email,
      phone: formData.phone,
      address: formData.address,
      blood_group: formData.blood_group,
      userId: loginId
    };

    await axios.post("http://localhost:5000/api/patient/addpatient", patientData);

    alert("Patient Registered Successfully!");
    navigate("/login");

  } catch (error) {
    console.log(error);
    alert("Failed to register patient");
  }
};
  return (
    <div className="flex justify-center bg-[url('/src/assets/image/back.jpg')] items-center min-h-screen bg-gray-100 p-4">
      <form
        onSubmit={handleSubmit}
        className="w-full max-w-lg bg-white shadow-lg rounded-xl p-6 space-y-4"
      >
        <h2 className="text-2xl font-bold text-center text-[#03506F]">
          Patient Registration
        </h2>

        {error && (
          <p className="text-red-600 text-center font-semibold">{error}</p>
        )}

        {/* Name */}
        <input
          type="text"
          name="name"
          placeholder="Full Name"
          value={formData.name}
          onChange={handleChange}
          className="w-full p-2 border rounded-md"
          required
        />

        

        <div className="flex gap-4">
  {/* Age Auto-Filled */}
  <input
    type="number"
    name="age"
    placeholder="Age"
    value={formData.age}
    readOnly
    className="w-1/2 p-2 border rounded-md bg-gray-100"
  />

  {/* DOB — onChange triggers age calculation */}
  <input
    type="date"
    name="dob"
    value={formData.dob}
    onChange={handleDOB}
    className="w-1/2 p-2 border rounded-md"
    required
  />
</div>

        {/* Email */}
        <input
          type="email"
          name="email"
          placeholder="Email"
          value={formData.email}
          onChange={handleChange}
          className="w-full p-2 border rounded-md"
          required
        />

        {/* Phone */}
        <input
          type="tel"
          name="phone"
          placeholder="Phone Number"
          value={formData.phone}
          onChange={handleChange}
          className="w-full p-2 border rounded-md"
          required
        />

        {/* Address */}
        <textarea
          name="address"
          placeholder="Address"
          value={formData.address}
          onChange={handleChange}
          className="w-full p-2 border rounded-md"
          rows={3}
          required
        />

        {/* Blood Group Dropdown */}
        <select
          name="blood_group"
          value={formData.blood_group}
          onChange={handleChange}
          className="w-full p-2 border rounded-md"
          required
        >
          <option value="">Select Blood Group</option>
          {bloodGroups.map((group) => (
            <option key={group} value={group}>{group}</option>
          ))}
        </select>



        <p className="text-2xl font-bold text-center text-[#03506F]"> Login Details </p>
{/* Username */}
        <input
          type="text"
          name="username"
          placeholder="Username"
          value={formData.username}
          onChange={handleChange}
          className="w-full p-2 border rounded-md"
          required
        />
        {/* Password */}
        <input
          type="password"
          name="password"
          placeholder="Password"
          value={formData.password}
          onChange={handleChange}
          className="w-full p-2 border rounded-md"
          required
        />

        {/* Confirm Password */}
        <input
          type="password"
          name="confirmPassword"
          placeholder="Confirm Password"
          value={formData.confirmPassword}
          onChange={handleChange}
          className="w-full p-2 border rounded-md"
          required
        />{error && (
    <p className="text-red-600 text-sm mt-1">
      {error}
    </p>
  )}

        {/* Submit Button */}
        <button
          type="submit"
          className="w-full bg-gradient-to-r from-[#0097A0] to-[#03506F] text-white p-2 rounded-md hover:from-yellow-500 hover:to-yellow-800"
        >
          Register
        </button>
      </form>
    </div>
  );
}
