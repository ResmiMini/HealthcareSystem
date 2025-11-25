import { useContext, useState } from "react";
import React from "react";
import { NavLink, useNavigate } from "react-router-dom";
import Logo from "../assets/image/Logo.jpg";

export default function Navbar() {
  
  const linkClasses = ({ isActive }) =>
    isActive
      ? "w-full  bg-yellow-700 text-black font-bold px-4 py-2 rounded-lg shadow-md text-center transition"
      : "w-full  hover:bg-yellow-100 text-white px-4 py-2 rounded-lg text-center transition";

  return (
    <nav className="bg-gradient-to-r from-[#0097A0] to-[#03506F] py-2 px-4 mx-10 rounded-[10px] flex justify-between items-center   ">    
    <img   src={Logo}     alt="Doctor" className="w-[2.5cm] h-[2.5cm] rounded-lg shadow-lg object-cover"          /> 
      {/* Logo */}
     <p className="text-2xl text-white text-center fade-up"> your health our responsibility</p>
      {/* Desktop Menu */}
      <div className="hidden md:flex gap-6 items-center text-l">
        <NavLink to="/" className={linkClasses}> Home</NavLink>
        <NavLink to="/about" className={linkClasses}>About</NavLink>
        <NavLink to="/login" className={linkClasses} >Login</NavLink>
        <NavLink to="/service" className={linkClasses} >service</NavLink>
        <NavLink to="/contact" className={linkClasses} >Contact</NavLink>

        </div>      
               
        
    </nav>
  );
}
