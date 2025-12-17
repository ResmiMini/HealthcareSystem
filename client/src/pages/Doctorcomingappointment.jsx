import React, { useEffect, useState ,useContext} from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { AuthContext } from "../context/AuthContext";
import { Link } from "react-router-dom";
import Docsidebar from "../components/Docsidebar";

export default function DoctorAppointment() {
      const { user } = useContext(AuthContext);
      const navigate = useNavigate();
    

  const [appointments, setAppointments] = useState([]);

  const doctorId = localStorage.getItem("doctorId");

  useEffect(() => {
    if (!doctorId) return;

    const fetchAppointments = async () => {
      try {
        const res = await axios.get(
          `${import.meta.env.VITE_API_URL}/api/appointment/getBycomingappDoctorId/${doctorId}`
        );
        setAppointments(res.data.appointments);
      } catch (err) {
        console.error(err);
      }
    };

    fetchAppointments();
  }, [doctorId]);

  return (
    <>
     <Docsidebar/>
      {/* -------- Main content (RIGHT of sidebar) -------- */}
<div className="ml-72 p-6">   {/* pushes content right by sidebar width */}
  <h1 className="text-2xl font-semibold mb-4">Appointment Details</h1>

  <div className="overflow-x-auto">
    <table className="min-w-full border-collapse border border-gray-300">
      <thead>
        <tr className="bg-gray-100">
          <th className="px-4 py-2 border">Appointment ID</th>
          <th className="px-4 py-2 border">Date</th>
          <th className="px-4 py-2 border">Patient ID</th>
          <th className="px-4 py-2 border">Actions</th>
        </tr>
      </thead>

      <tbody>
        {appointments.length === 0 ? (
          <tr>
            <td colSpan="5" className="text-center py-6">
              No appointments found.
            </td>
          </tr>
        ) : (
          appointments.map((a) => (
            <tr key={a._id} className="odd:bg-white even:bg-gray-50">
              <td className="px-4 py-2 border">{a.appointmentId}</td>
              <td className="px-4 py-2 border">{new Date(a.date).toLocaleDateString()}</td>
              <td className="px-4 py-2 border">{a.patientId}</td>
              <td className="px-4 py-2 border">
                <button className="px-3 py-1 bg-red-200 rounded hover:bg-red-600">
                  delete
                </button>
                
                


                <button
  onClick={() => navigate(`/doctorviewpatient/${a.patientId}`)}
  className="px-3 py-1 bg-green-100 text-green-600 rounded hover:bg-green-200"
>
  View
</button>
              </td>
            </tr>
          ))
        )}
      </tbody>
    </table>
  </div>
</div>


    
            
    </>
  );
}
