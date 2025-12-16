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
      <aside className="w-64 bg-gray shadow-md   p-6">
        <h2 className="text-2xl font-bold text-yellow-600 mb-4">
         patient panel
        </h2>

        {/* Doctor Info */}
        <div className="bg-yellow-600 p-4 rounded-lg mb-6">
          <h3 className="font-semibold text-lg"> {user?.username}</h3>
          <p className="text-gray-600 text-sm">Health Care Hospital</p>
        </div>

        {/* Menu Items */}
        <nav className="space-y-7">
          <Link
            to="/patientdashboard"
            className="block py-2 px-3 rounded-lg  bg-[#0097A0] hover:bg-yellow-600"
          >
            Dashboard
          </Link>

           <Link to="/viewappointment" className="block py-2 px-3 rounded-lg  bg-[#0097A0] hover:bg-yellow-600">My Appointments</Link>

          <Link to="/bookappointment"className="block py-2 px-3 rounded-lg  bg-[#0097A0] hover:bg-yellow-600">Book Appointment</Link>

          

          <Link
            to="/patientviewreports"
            className="block py-2 px-3 rounded-lg bg-[#0097A0] hover:bg-yellow-600"
          >
            Reports
          </Link>
<Link
            to="/patientmedicine"
            className="block py-2 px-3 rounded-lg bg-[#0097A0] hover:bg-yellow-600"
          >
           My medicine
          </Link>
          <Link
            to="/doctor/profile"
            className="block py-2 px-3 rounded-lg bg-[#0097A0] hover:bg-yellow-600"
          >
            payment
          </Link>
          
        </nav>

        
      </aside>
      </>
    );
}
 