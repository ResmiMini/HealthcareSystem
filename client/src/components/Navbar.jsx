import React, { useContext, useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import Logo from "../assets/image/Logo.png";
import { AuthContext } from "../context/AuthContext";

export default function Navbar() {
  const navigate = useNavigate();
  const { user, logout } = useContext(AuthContext);
  const [menuOpen, setMenuOpen] = useState(false);

  const linkClasses = ({ isActive }) =>
    isActive
      ? "block px-4 py-2 rounded-lg bg-yellow-600 text-black font-semibold"
      : "block px-4 py-2 rounded-lg text-white hover:bg-yellow-100 hover:text-black transition";

  return (
    <nav className="bg-gradient-to-r from-[#0097A0] to-[#03506F] py-2 px-4 mx-4 md:mx-10 rounded-xl">
      <div className="flex justify-between items-center">
        
        {/* Logo */}
        <img
          src={Logo}
          alt="Logo"
          className="w-30 h-[3cm] rounded-lg shadow-lg object-cover"
        />

        {/* Title */}
        <p className="hidden md:block text-l text-white text-center">
          your health our responsibility
        </p>

        {/* Desktop Menu */}
        <div className="hidden md:flex gap-4 items-center">
          <NavLink to="/" className={linkClasses}>Home</NavLink>
          <NavLink to="/about" className={linkClasses}>About</NavLink>
          <NavLink to="/career" className={linkClasses}>Career</NavLink>
          <NavLink to="/contact" className={linkClasses}>Contact</NavLink>

          {user ? (
            <>
              <span className="text-yellow-300 font-semibold">
                Hello, {user.username}
              </span>

              <button
                onClick={() => {
                  logout();
                  navigate("/login");
                }}
                className="bg-yellow-600 px-4 py-2 rounded-lg text-white hover:bg-red-600 transition"
              >
                Logout
              </button>
            </>
          ) : (
            <NavLink to="/login" className={linkClasses}>
              Login
            </NavLink>
          )}
        </div>

        {/* Mobile Menu Button */}
        <button
          className="md:hidden text-white text-3xl"
          onClick={() => setMenuOpen(!menuOpen)}
        >
          ☰
        </button>
      </div>

      {/* Mobile Menu */}
      {menuOpen && (
        <div className="md:hidden mt-4 bg-[#03506F] rounded-xl p-4 space-y-2">
          <NavLink to="/" className={linkClasses} onClick={() => setMenuOpen(false)}>Home</NavLink>
          <NavLink to="/about" className={linkClasses} onClick={() => setMenuOpen(false)}>About</NavLink>
          <NavLink to="/career" className={linkClasses} onClick={() => setMenuOpen(false)}>Career</NavLink>
          <NavLink to="/contact" className={linkClasses} onClick={() => setMenuOpen(false)}>Contact</NavLink>

          {user ? (
            <>
              <span className="block text-yellow-300 px-4">
                Hello, {user.username}
              </span>

              <button
                onClick={() => {
                  logout();
                  navigate("/login");
                  setMenuOpen(false);
                }}
                className="w-full bg-yellow-600 px-4 py-2 rounded-lg text-white hover:bg-red-600"
              >
                Logout
              </button>
            </>
          ) : (
            <NavLink
              to="/login"
              className={linkClasses}
              onClick={() => setMenuOpen(false)}
            >
              Login
            </NavLink>
          )}
        </div>
      )}
    </nav>
  );
}
