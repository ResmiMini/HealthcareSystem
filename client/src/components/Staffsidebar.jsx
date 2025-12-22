import { NavLink } from "react-router-dom";
import React from "react";

export default function Staffsidebar() {
  const linkClass =
    "block px-4 py-2 rounded hover:bg-blue-600 hover:text-white";

  return (
    <div className="w-72 min-h-screen p-6 border-r border-gray-300">
      
      <h2 className="text-2xl font-bold mb-8 text-center text-[#0097A0]">
        Admin Panel
      </h2>

      <nav className="space-y-7">
        <NavLink to="/staffdashboard" className="block py-2 px-3 rounded-lg  bg-[#0097A0] hover:bg-yellow-600">
          Dashboard
        </NavLink>

        <NavLink to="/adminaddtest" className="block py-2 px-3 rounded-lg  bg-[#0097A0] hover:bg-yellow-600">
          Add Test
        </NavLink>

        <NavLink to="/adminaddmedicine" className="block py-2 px-3 rounded-lg  bg-[#0097A0] hover:bg-yellow-600">
          Add Medicine
        </NavLink>

        <NavLink to="/Medicinebill" className="block py-2 px-3 rounded-lg  bg-[#0097A0] hover:bg-yellow-600">
          Medicine Bill
        </NavLink>

        <NavLink to="/Labresult" className="block py-2 px-3 rounded-lg  bg-[#0097A0] hover:bg-yellow-600">
         Update Lab Results
        </NavLink>

        
      </nav>
    </div>
  );
}
