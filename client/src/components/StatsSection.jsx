import { useEffect, useState } from "react";
import { FaUserInjured, FaRegCalendarCheck, FaUserMd, FaProcedures } from "react-icons/fa";
import React from "react";
const Counter = ({ target, duration = 2000 }) => {
  const [count, setCount] = useState(0);

  useEffect(() => {
    let start = 0;
    const end = parseInt(target);
    if (start === end) return;

    const incrementTime = (duration / end) * 3;

    const timer = setInterval(() => {
      start += 1;
      setCount(start);
      if (start === end) clearInterval(timer);
    }, incrementTime);

    return () => clearInterval(timer);
  }, [target, duration]);

  return <span>{count}</span>;
};

export default function StatsSection() {
  return (
    <>
    <br></br>
    <div className="py-16 bg-gray-300 mx-10 rounded-[10px]">
      <div className="max-w-6xl mx-auto grid grid-cols-2 md:grid-cols-4 text-center gap-10">

        {/* Item 1 */}
        <div>
          <FaUserInjured className="text-[#0097A0] text-4xl mx-auto" />
          <p className="text-teal-600 font-semibold">Patients Served</p>
          <h2 className="text-5xl font-bold text-[#062057] mt-2">
            <Counter target="30" />K
          </h2>
        </div>

        {/* Item 2 */}
        <div>
           <FaRegCalendarCheck className="text-[#0097A0] text-4xl mx-auto" />
          <p className="text-teal-600 font-semibold">Years of Excellence</p>
          <h2 className="text-5xl font-bold text-[#062057] mt-2">
            <Counter target="20" />+
          </h2>
        </div>

        {/* Item 3 */}
        <div>
          <FaProcedures className="text-[#0097A0] text-4xl mx-auto" />
          <p className="text-teal-600 font-semibold">Surgeries Performed</p>
          <h2 className="text-5xl font-bold text-[#062057] mt-2">
            <Counter target="200" />+
          </h2>
        </div>

        {/* Item 4 */}
        <div>
          <FaUserMd className="text-[#0097A0] text-4xl mx-auto" />
          <p className="text-teal-600 font-semibold">Our Doctors & Staffs</p>
          <h2 className="text-5xl font-bold text-[#062057] mt-2">
            <Counter target="100" />+
          </h2>
        </div>

      </div>
    </div>
    </>
  );
}
