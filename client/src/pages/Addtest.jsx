import React, { useState } from "react";
import axios from "axios";
import Staffsidebar from "../components/Staffsidebar";

export default function AddTest() {
  const [name, setName] = useState("");
  const [price, setPrice] = useState("");
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage("");
    setError("");

    if (!name || !price) {
      setError("All fields are required");
      return;
    }

    try {
      setLoading(true);

      const res = await axios.post(
        `${import.meta.env.VITE_API_URL}/api/test/addtest`,
        {
          name,
          price
        }
      );

      setMessage(res.data.message);
      setName("");
      setPrice("");
    } catch (err) {
      setError(
        err.response?.data?.message || "Something went wrong"
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex">
      <Staffsidebar />

      <div className="flex-1 p-10">
        <h1 className="text-2xl font-bold mb-6">Add Medical Test</h1>

        <form
          onSubmit={handleSubmit}
          className="bg-white shadow-md rounded-lg p-6 w-full max-w-md"
        >
          {/* Test Name */}
          <div className="mb-4">
            <label className="block mb-1 font-semibold">
              Test Name
            </label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full border rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
              placeholder="Enter test name"
            />
          </div>

          {/* Price */}
          <div className="mb-4">
            <label className="block mb-1 font-semibold">
              Price (₹)
            </label>
            <input
              type="number"
              value={price}
              onChange={(e) => setPrice(e.target.value)}
              className="w-full border rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
              placeholder="Enter price"
            />
          </div>

          {/* Messages */}
          {error && (
            <p className="text-red-600 mb-3">{error}</p>
          )}
          {message && (
            <p className="text-green-600 mb-3">{message}</p>
          )}

          {/* Submit */}
          <button
            type="submit"
            disabled={loading}
            className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700 transition"
          >
            {loading ? "Adding..." : "Add Test"}
          </button>
        </form>
      </div>
    </div>
  );
}
