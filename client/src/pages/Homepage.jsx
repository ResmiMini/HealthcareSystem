import React from "react";
import Footer from "../components/Footer";
import StatsSection from "../components/StatsSection";
import Navbar from "../components/Navbar";
import whitelogo from"../assets/image/whitelogo.png"
import Department from "../components/Department";

const HomePage = () => {
  return (
    <div className="font-sans  w-[full] ">
          
<br></br>
  <div className="relative mx-4 sm:mx-6 md:mx-10 rounded-2xl overflow-hidden">

  {/* 🔹 BLURRED BACKGROUND IMAGE */}
  <div
    className="absolute inset-0 bg-[url('/src/assets/image/hospital.jpg')]
               bg-cover bg-center scale-110 filter blur-[.5px]"
  ></div>

  {/* 🔹 GRADIENT OVERLAY */}
  <div className="absolute inset-0 bg-gradient-to-r 
                  from-[#0097A0]/80 to-[#03506F]/80">
  </div>

  {/* 🔹 CONTENT (NOT BLURRED) */}
  <div
    className="relative px-6 sm:px-10 py-12 sm:py-16
               flex flex-col md:flex-row
               items-center justify-between gap-8"
  >

    {/* LEFT CONTENT */}
    <div className="md:w-1/2 text-center md:text-left">
      <h1 className="text-3xl sm:text-4xl md:text-6xl 
                     font-extrabold text-white leading-tight fade-up">
        Complete
      </h1>

      <h1 className="mt-3 text-2xl sm:text-3xl md:text-5xl 
                     font-extrabold text-white leading-tight typewriter">
        Healthcare Solution
      </h1>

      <p className="mt-4 text-sm sm:text-base text-white/90 max-w-md">
        Trusted care, expert doctors, and seamless appointments — all in one place.
      </p>
    </div>

    {/* RIGHT BUTTONS */}
    <div className="flex flex-col sm:flex-row items-center gap-4">
      <button
        className="flex items-center gap-2 bg-white text-black 
                   font-semibold px-6 py-3 rounded-full shadow-md
                   hover:bg-yellow-700 hover:text-white transition-all"
      >
        Contact Us <span className="text-lg">✙</span>
      </button>

      <button
        className="flex items-center gap-2 bg-white text-black 
                   font-semibold px-6 py-3 rounded-full shadow-md
                   hover:bg-yellow-700 hover:text-white transition-all"
      >
        Appointment <span className="text-lg">✙</span>
      </button>
    </div>

  </div>
</div>

 <StatsSection/>

<Department/>

<Footer/>
    </div>
  );
};

export default HomePage;
