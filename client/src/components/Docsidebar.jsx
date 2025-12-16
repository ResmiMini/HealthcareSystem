import { useContext } from "react";
import React from "react";
import { NavLink, useNavigate} from "react-router-dom";
import Logo from "../assets/image/Logo.png";
import { Link } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";
export default function Docsidebar()
{
     const { user } = useContext(AuthContext);
    return(
        <>
        {/* -------- Sidebar -------- */}
      <aside className="w-72 bg-gray shadow-md fixed h-full p-6">
        <h2 className="text-2xl font-bold text-yellow-600 mb-4">
          Doctor Panel
        </h2>

        {/* Doctor Info */}
        <div className="bg-yellow-600 p-4 rounded-lg mb-6">
          <h3 className="font-semibold text-lg">Dr. {user?.username}</h3>
          <p className="text-gray-600 text-sm">Health Care Hospital</p>
        </div>

        {/* Menu Items */}
        <nav className="space-y-7">
          <Link
            to="/doctordashboard"
            className="block py-2 px-3 rounded-lg  bg-[#0097A0] hover:bg-yellow-600"
          >
            Dashboard
          </Link>

          <Link
            to="/doctorAppointments"
            className="block py-2 px-3 rounded-lg bg-[#0097A0] hover:bg-yellow-600"
          >
            Appointments
          </Link>

          <Link
            to="/doctorallpatient"
            className="block py-2 px-3 rounded-lg bg-[#0097A0] hover:bg-yellow-600"
          >
            My Patients
          </Link>

          <Link
            to="/doctor/schedule"
            className="block py-2 px-3 rounded-lg bg-[#0097A0] hover:bg-yellow-600"
          >
            Schedule
          </Link>

          <Link
            to="/doctorviewreports"
            className="block py-2 px-3 rounded-lg bg-[#0097A0] hover:bg-yellow-600"
          >
            Reports
          </Link>

          <Link
            to="/doctor/profile"
            className="block py-2 px-3 rounded-lg bg-[#0097A0] hover:bg-yellow-600"
          >
            Profile
          </Link>
        </nav>

        
      </aside>
      </>
    );
}
 