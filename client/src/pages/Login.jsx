import React, { useState, useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { AuthContext } from "../context/AuthContext";   // <--- ADD THIS
import Footer from "../components/Footer";

export default function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");
  const navigate = useNavigate();

  const { setUser } = useContext(AuthContext);  // <--- ADD THIS

  const handleLogin = async (e) => {
  e.preventDefault();
  setMessage("");

  try {
    const res = await axios.post(
      "http://localhost:5000/api/login/login",
      { username, password }
    );

    localStorage.setItem("user", JSON.stringify(res.data.user));
    localStorage.setItem("token", res.data.token);
    setUser(res.data.user);

    const { role, userId } = res.data.user;

    if (role === "patient") {
      const patientRes = await axios.get(
        `http://localhost:5000/api/patient/getByUserId/${userId}`
      );
      localStorage.setItem(
        "patientId",
        patientRes.data.patient.patientId
      );
      navigate("/patientDashboard");

    } else if (role === "doctor") {
      const docRes = await axios.get(
        `http://localhost:5000/api/doctor/getByuserId/${userId}`
      );
      localStorage.setItem(
        "doctorId",
        docRes.data.doctor.doctorId
      );
      navigate("/doctorDashboard");

    } else if (role === "admin") {
      navigate("/adminDashboard");
    }

  } catch (error) {
    console.log("LOGIN ERROR 👉", error.response);

    setMessage(
      error.response?.data?.message ||
      "Login failed. Please try again."
    );
  }
};


  return (
    <>
      <br />
      <div className="flex items-center justify-center h-[15cm] bg-[url('/src/assets/image/back.jpg')] py-2 px-4 mx-10 rounded-[10px]">
        <div className="bg-white p-5 rounded-2xl shadow-md w-[550px]">
          <h2 className="text-2xl font-bold mb-6 text-center">Login ➚ </h2>

          <form onSubmit={handleLogin} className="space-y-4">
            <input
              type="text"
              placeholder="Username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className="w-full p-2 border rounded-md"
            />
            <input
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full p-2 border rounded-md"
            />

            <button
              type="submit"
              className="w-full bg-gradient-to-r from-[#0097A0] to-[#03506F] text-white p-2 rounded-md hover:from-yellow-500 hover:to-yellow-700"
            >
              Login
            </button>

            <p>
              Don’t have an account?{" "}
              <Link to="/register" className="text-blue-600 hover:underline">
                Register here
              </Link>
            </p>

            <p>
              By clicking Login, I accept the Terms & Conditions & Privacy
              Policy
            </p>
          </form>

          {message && <p className="mt-4 text-center">{message}</p>}
        </div>
      </div>
      <Footer/>
    </>
  );
}
