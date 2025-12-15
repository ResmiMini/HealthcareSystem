import React from "react";
import { useNavigate,Link } from "react-router-dom";
import { useLocation } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";
import { useContext } from "react";
import Patientsidebar from'../components/Patientsidebar';

export default function PatientDashboard() {
  const navigate = useNavigate();
  const { user } = useContext(AuthContext);
 
  return (
    <>
  {/* Sidebar */}
  <Patientsidebar />

  {/* Page Layout */}
  <div className="flex min-h-screen bg-gray-100">
    
    {/* Spacer for fixed sidebar width */}
    <div className="w-72"></div>  {/* adjust if sidebar width differs */}

    {/* Main Content */}
    <div className="flex-1 flex justify-center items-center p-6">
      
      {/* Welcome Card */}
      <div
        className="bg-white/70 backdrop-blur-md 
                   p-6 md:p-10 
                   rounded-2xl shadow-xl 
                   text-center 
                   max-w-xl w-full
                   bg-[url('/src/assets/image/back.jpg')] bg-cover bg-center"
      >
        <h1 className="text-2xl sm:text-3xl md:text-5xl font-extrabold text-yellow-600 drop-shadow-md">
          Welcome, {user?.username}
        </h1>
<br></br>
        <p className="mt-4 text-sm sm:text-base md:text-lg text-gray-700">
          “There is one consolation in being sick; and that is the possibility that you may recover to a better state than you were ever in before.” 
        </p>
      </div>

    </div>
  </div>
</>

  );
}
