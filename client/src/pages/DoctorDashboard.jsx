import React, { useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import Docsidebar from "../components/Docsidebar";

export default function DoctorDashboard() {
  const { user } = useContext(AuthContext);

  return (
    <>
      {/* Sidebar */}
      <Docsidebar />

      {/* Main Content */}
      <div
        className="
          min-h-screen 
          bg-[url('/src/assets/image/back.jpg')] 
          bg-cover bg-center bg-no-repeat
          flex items-center justify-center
          px-4
          md:ml-72
        "
      >
        <div className="bg-white/70 backdrop-blur-md p-6 md:p-10 rounded-2xl shadow-xl text-center">
          <h1 className="text-2xl sm:text-3xl md:text-5xl font-extrabold text-yellow-600 drop-shadow-md">
            Welcome, Dr. {user?.username}
          </h1>

          <p className="mt-4 text-sm sm:text-base md:text-lg text-gray-700">
            Have a great day caring for your patients 👩‍⚕️👨‍⚕️
          </p>
        </div>
      </div>
    </>
  );
}
