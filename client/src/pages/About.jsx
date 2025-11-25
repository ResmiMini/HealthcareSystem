import React from "react";
import hospital from "../assets/image/hospital.jpg"
import Achievements from "./Achievments";
export default function About() {
  return (
    <>
     <section className="text-center">
      <h1 className="text-4xl font-bold mb-4"><br></br>About Us</h1>
      <hr></hr>
     <div className="text-xl">
  <img src={hospital} alt="Hospital" className="mx-auto " />
</div>
<p className="text-xl "><br></br>Located in the vibrant heart of India, Healthcare Hospitals is one of the largest private 
  multi-specialist hospitals in Asia.<br></br> APJ abdul kalaam laid the hospital's cornerstone in Kochi in 1998. 
  <br></br>We are dedicated to providing the most sophisticated healthcare to people from all walks of life. </p>
      
    </section> 
    <Achievements/>
    </>
  );
}
