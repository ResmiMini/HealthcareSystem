import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import Docsidebar from "../components/Docsidebar";

export default function DoctorViewPatient() {
  const { patientId } = useParams();
  const [patient, setPatient] = useState(null);

  useEffect(() => {
    const fetchPatient = async () => {
      try {
        const res = await axios.get(
          `http://localhost:5000/api/patient/getByPatientId/${patientId}`
        );
        setPatient(res.data);
      } catch (err) {
        console.error(err);
      }
    };

    fetchPatient();
  }, [patientId]);

  if (!patient) {
    return (
      <>
        <Docsidebar />
        <div className="ml-72 p-10">Loading patient details...</div>
      </>
    );
  }

  return (
    <>
      <Docsidebar />
      <div className="ml-72 min-h-screen flex justify-center p-6 bg-gray-50">
        <div className="bg-white shadow rounded-xl p-8 w-full max-w-3xl">

          <h1 className="text-3xl font-bold text-yellow-600 text-center mb-6">
            Patient Details
          </h1>

          <div className="overflow-x-auto">
  <table className="min-w-full border border-gray-300 rounded-lg">
    <tbody>
      <tr className="border-b">
        <th className="border px-4 py-2 text-left bg-gray-100 w-1/3">
          Patient ID
        </th>
        <td className="border px-4 py-2">
          {patient?.patientId}
        </td>
      </tr>

      <tr className="border-b">
        <th className="border px-4 py-2 text-left bg-gray-100">
          Name
        </th>
        <td className="border px-4 py-2">
          {patient?.name}
        </td>
      </tr>

      <tr className="border-b">
        <th className="border px-4 py-2 text-left bg-gray-100">
          Age
        </th>
        <td className="border px-4 py-2">
          {patient?.age}
        </td>
      </tr>

      <tr className="border-b">
        <th className="border px-4 py-2 text-left bg-gray-100">
          Gender
        </th>
        <td className="border px-4 py-2">
          {patient?.gender || "Not specified"}
        </td>
      </tr>

      <tr className="border-b">
        <th className="border px-4 py-2 text-left bg-gray-100">
          Phone
        </th>
        <td className="border px-4 py-2">
          {patient?.phone}
        </td>
      </tr>

      <tr className="border-b">
        <th className="border px-4 py-2 text-left bg-gray-100">
          Email
        </th>
        <td className="border px-4 py-2">
          {patient?.email}
        </td>
      </tr>

      <tr>
        <th className="border px-4 py-2 text-left bg-gray-100">
          Address
        </th>
        <td className="border px-4 py-2">
          {patient?.address}
        </td>
      </tr>
    </tbody>
  </table>
</div>

        </div>
      </div>
    </>
  );
}
