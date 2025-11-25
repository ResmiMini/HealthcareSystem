import React from "react";

import StatsSection from "../components/StatsSection";
import Navbar from "../components/NavBar";
import whitelogo from"../assets/image/whitelogo.png"

const HomePage = () => {
  return (
    <div className="font-sans  w-[full] ">
          
<br></br>
  <div className="relative bg-cover bg-gradient-to-r from-[#0097A0] to-[#03506F]  rounded-[10px] mx-10 px-20 py-[4cm] text-[#0097A0] flex flex-col md:flex-row items-center">

  
  <div className="md:w-1/2  text-center md:text-center">
    <h1 className="text-7xl font-extrabold text-white  leading-tight text-center  fade-up">
      Complete<br></br>
    </h1>
    <br></br>
    <h1 className="text-5xl text-white font-extrabold leading-tight text-center  typewriter">
      Healthcare Solution
    </h1>
    {/* <img   src={whitelogo}  alt="Doctor" className="w-[4cm] h-[4cm] rounded-lg "          />  */}

  </div>
  <div className="flex items-center gap-4">
  {/* Contact Us Button */}
  <button className="flex items-center gap-2 bg-white text-black font-semibold px-6 py-3 rounded-full shadow-md hover:bg-yellow-700 transition">
    Contact Us
    <h2>✙</h2>
  </button>

  
  <button className="flex items-center gap-2 bg-white text-black font-semibold px-6 py-3 rounded-full shadow-md hover:bg-yellow-700 transition">
    Appointment
    ✙
  </button>
</div>

 </div>
<StatsSection/>
    </div>
  );
};

export default HomePage;
