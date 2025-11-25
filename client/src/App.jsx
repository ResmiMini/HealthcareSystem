import { useState } from 'react'
import { Routes, Route, BrowserRouter } from "react-router-dom";
import './index.css'
import React from 'react'
import HomePage from './pages/Homepage'
import About from "./pages/About";
import Navbar from './components/NavBar';
import Login from './pages/Login';
import PatientDashboard from './pages/PatientDashboard';
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
        <Route path="/patientdashboard" element={<PatientDashboard />} />
         {/*<Route path="/register" element={<Register />} />
        <Route path="/feedback" element={<Feedback/>} />
        <Route path="/statistics" element={<Statistics/>} />
        <Route path="/usermgt" element={<User/>} />
        <Route path="*" element={<ErrorPage />} /> */}
      </Routes>
    </>
  )
}

export default App
