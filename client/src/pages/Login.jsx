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
      `${import.meta.env.VITE_API_URL}/api/login/login`,
      { username, password },
  {
    withCredentials: true
  }
    );

    localStorage.setItem("user", JSON.stringify(res.data.user));
    localStorage.setItem("token", res.data.token);
    setUser(res.data.user);

    const { role, userId } = res.data.user;

    if (role === "patient") {
      console.log("reached");
      const patientRes = await axios.get(
        `${import.meta.env.VITE_API_URL}/api/patient/getByuserId/${userId}`
      );
      localStorage.setItem(
        "patientId",
        patientRes.data.patient.patientId
      );
      navigate("/patientDashboard");

    } else if (role === "doctor") {
      const docRes = await axios.get(
        `${import.meta.env.VITE_API_URL}/api/doctor/getByuserId/${userId}`
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
    console.log("LOGIN ERROR ", error.response);

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
              required
            />
            <input
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full p-2 border rounded-md"
              required
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
                Register here(only patients can register here)
              </Link>
            </p>

            <p>
              By clicking Login, I accept the Terms & Conditions & Privacy
              Policy
            </p>
            <p
  className="text-sm text-blue-600 text-center cursor-pointer hover:underline"
  onClick={() => navigate("/resetpassword")}
>
  Forgot Password?
</p>
          </form>

          {message && <p className="mt-4 text-center">{message}</p>}
        </div>
      </div>
      <Footer/>
    </>
  );
}
