import { useState } from 'react'
import { Routes, Route, BrowserRouter } from "react-router-dom";
import './index.css'
import React from 'react';
import Career from'./pages/Career';
import Contact from './pages/Contact';
import Register from './pages/Register';
import HomePage from './pages/Homepage';
import About from "./pages/About";
import Navbar from './components/Navbar';
import Login from './pages/Login';
import PatientDashboard from './pages/PatientDashboard';
import DoctorRegistration from './pages/DoctorRegistration';
import DoctorDashboard from './pages/DoctorDashboard';
import DoctorAppointment from './pages/DoctorAppointment';
import StaffRegistration from './pages/StaffRegistration';
import Bookappointment from './pages/Bookappointment';
import Viewappointment from './pages/Viewappointment';
import DoctorViewPatient from './pages/Doctorviewpatient';
import DoctorConsult from './pages/DoctorConsult';
import DoctorallPatient from'./pages/DoctorallPatient';
import DoctorviewReports from './pages/DoctorviewReports';
import Patientviewreports from './pages/Patientviewreport';
import AdminDashboard from './pages/AdminDashboard';
import AddMedicine from './pages/Addmedicine';
import Adminviewpatient from './pages/Adminviewpatients';
import Adminviewdoctor from './pages/Adminviewdoctor';
import Payment from './pages/Payment';
import Patientviewmedicine from './pages/Patientviewmedicine';
import Doctorcomingappointment from'./pages/Doctorcomingappointment';
// import Login from "./pages/Login";
// import Admin from "./pages/Admin";
// import Register from "./pages/Register";
// import Cart from "./pages/Cart";
function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      
     <Navbar/>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/about" element={<About />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register/>}/>
        <Route path="/patientdashboard" element={<PatientDashboard />} />
        <Route path="/patientviewreports" element={<Patientviewreports />} />
        <Route path="/patientmedicine" element={<Patientviewmedicine />} />




        <Route path="/doctordashboard" element={<DoctorDashboard />} />
        <Route path="/doctorAppointments" element={<DoctorAppointment/>}/>
        <Route path="/doctorviewpatient/:patientId" element={<DoctorViewPatient/>}/>
         <Route path="/doctorconsultpatient/:patientId/:appointmentId" element={<DoctorConsult/>}/>
        <Route path="/doctorallpatient" element={<DoctorallPatient/>} />
        <Route path="/doctorcomingappointments" element={<Doctorcomingappointment/>} />


        <Route path="/appointment" element={<DoctorRegistration/>} />
        <Route path="/contact" element={<Contact/>}/>
        <Route path="/career" element={<Career/>} />
        <Route path="/docregister" element={<DoctorRegistration/>} />
        <Route path="/staffregister" element={<StaffRegistration/>} />
        <Route path="/bookappointment" element={<Bookappointment/>}/>
        <Route path="/viewappointment" element={<Viewappointment/>}/>


        <Route path="/adminDashboard" element={<AdminDashboard />} />
        <Route path="/adminaddmedicine" element={<AddMedicine/>} />
        <Route path="/adminviewpatients" element={<Adminviewpatient/>} />
         <Route path="/adminviewpatientrecords/:patientId" element={<Patientviewreports/>} />
          <Route path="/adminviewdoctors" element={<Adminviewdoctor/>} />


<Route path="/payment" element={<Payment/>}/>




        {/*<Route path="/usermgt" element={<User/>} />
        <Route path="*" element={<ErrorPage />} />  */}
      </Routes>
    </>
  )
}

export default App
