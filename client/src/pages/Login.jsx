import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { useState, useContext } from "react";
import axios from "axios";
// import { UserContext } from "../context/UserContext"; // Make sure you have this

export default function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      const res = await axios.post("http://localhost:5000/api/login/login", {username,password});
      const userRole=res.data.user.role;
      console.log("Role ->", res.data);
       setMessage(`Login Successful ✔ | Role: ${userRole}`);
      if (userRole === "patient") {
      navigate("/patientDashboard");
    } else if (userRole === "doctor") {
      navigate("/doctorDashboard");
    } else if (userRole === "admin") {
      navigate("/doctorDashboard");
    }  else {
      // setMessage("Unknown role");
      setMessage(`Login Successful ✔ | Role: ${userRole}`);
    }

      // setMessage("Login Successful ✔");
    }
     catch (error)
      {
      setMessage("sorry");
       }
  };

  return (
    <>
    <br></br>
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
            className="w-full bg-gradient-to-r from-[#0097A0] to-[#03506F] text-white p-2 rounded-md hover: hover:from-yellow-500 hover:to-yellow-700"
          >
            Login
          </button>

          <p>
            Don’t have an account?{" "}
            <Link to="/register" className="text-blue-600 hover:underline">
              Register here
            </Link>
          </p>

          <p>By clicking on Login, I accept the Terms & Conditions & Privacy Policy</p>
        </form>

        {message && <p className="mt-4 text-center">{message}</p>}
      </div>
    </div>
    </>
  );
}
