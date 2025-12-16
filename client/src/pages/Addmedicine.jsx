import { useState } from "react";
import React from "react";
import axios from "axios";
import AdminSidebar from "../components/Adminsidebar";

export default function AddMedicine() {
  const [name, setName] = useState("");
  const [category, setCategory] = useState("");
  const [price, setPrice] = useState("");

  const handleAddMedicine = async () => {
  if (!name || !category || !price) {
    alert("Please fill all fields");
    return;
  }

  try {
    const res = await axios.post(
      "http://localhost:5000/api/medicine/addmedicine",
      {
        name,
        category,
        price
      }
    );

    alert("Medicine added successfully");

    // Clear fields
    setName("");
    setCategory("");
    setPrice("");

  } catch (error) {
    alert("Failed to add medicine");
  }
};
 

  return (
    <div className="flex bg-[url('/src/assets/image/back.jpg')]">
      <AdminSidebar />
      <br></br>
      <div className="p-6 flex-1 flex justify-center flex start ">
  {/* Card */}
  <div className="w-full max-w-md border border-gray-300 rounded-xl shadow-md bg-white p-6">
    
    <h2 className="text-xl font-bold mb-6 text-center">
      Add Medicine
    </h2>

    <div className="space-y-4">
      <input
        type="text"
        placeholder="Medicine Name"
        onChange={(e) => setName(e.target.value)}
        className="w-full border border-gray-300 p-2 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
      />

      <select
  onChange={(e) => setCategory(e.target.value)}
  className="w-full border border-gray-300 p-2 rounded
             focus:outline-none focus:ring-2 focus:ring-blue-500"
>
  <option value="">Select Medicine Type</option>
  <option value="Tablet">Tablet</option>
  <option value="Syrup">Syrup</option>
  <option value="Injection">Injection</option>
  <option value="Capsule">Capsule</option>
  <option value="Ointment">Ointment</option>
</select>
      <input
        type="number"
        placeholder="Price"
        onChange={(e) => setPrice(e.target.value)}
        className="w-full border border-gray-300 p-2 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
      />

      <button onClick={handleAddMedicine }
        className="w-full bg-yellow-600 text-white py-2 rounded-lg hover:bg-yellow-300 transition font-semibold"
      >
        Add Medicine
      </button>
    </div>

  </div>
</div>

    </div>
  );
}
