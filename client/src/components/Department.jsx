import { ArrowUpRight } from "lucide-react";
import React from "react";

const departments = [
  {
    name: "Cardiology",
    image:
      "https://i.pinimg.com/736x/55/bd/ac/55bdacb74a01c887ee7f57dca083cf5b.jpg",
  },
  {
    name: "Neurology",
    image:
      "https://i.pinimg.com/1200x/8a/83/39/8a8339f04826b90e8345451b74193992.jpg",
  },
  {
    name: "Orthopedic",
    image:
      "https://i.pinimg.com/736x/13/5a/92/135a92fa7ef8025f84f22a9c8fa62f85.jpg",
  },
  {
    name: "Critical Care unit",
    image:
      "https://i.pinimg.com/1200x/78/0f/25/780f25868d52a97f5e150dc04312355e.jpg",
  },
];

export default function Department() {
  return (
    <>
    <br></br>
    <div className="w-full px-6 py-4 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
      {departments.map((dept, index) => (
        <div
          key={index}
          className="relative rounded-3xl overflow-hidden shadow-md hover:shadow-xl transition-shadow duration-300 cursor-pointer"
        >
          {/* Background Image */}
          <img
            src={dept.image}
            alt={dept.name}
            className="w-full h-64 object-cover"
          />

          {/* Title */}
          <div className="absolute bottom-4 left-4 text-yellow-800 text-xl font-semibold drop-shadow-lg">
            {dept.name}
          </div>

          {/* Arrow Button */}
          <div className="absolute bottom-4 right-4 bg-white p-3 rounded-full shadow-md hover:bg-gray-100 transition">
            <ArrowUpRight className="text-blue-900" size={22} />
          </div>
        </div>
      ))}
    </div>
    </>
  );
}
