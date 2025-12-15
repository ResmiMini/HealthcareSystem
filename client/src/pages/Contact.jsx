import React from 'react';
export default function Contact() {
  return (
  <>
  <br></br>
    <div className="w-full bg-[#F0F8FF] py-12 px-6 ">
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-10">

        {/* Address */}
        <div className="flex items-center gap-6">
          <div className="w-28 h-28 rounded-full border-4 border-teal-500 flex items-center justify-center">
            <div className="w-20 h-20 rounded-full bg-white flex items-center justify-center">
              {/* Location Icon */}
              <svg
                fill="none"
                stroke="#002b5c"
                strokeWidth="2"
                className="w-10 h-10"
                viewBox="0 0 24 24"
              >
                <path d="M12 10a3 3 0 110-6 3 3 0 010 6zm0 0c4.418 0 8 1.79 8 4v5H4v-5c0-2.21 3.582-4 8-4z" />
              </svg>
            </div>
          </div>

          <div>
            <h3 className="text-xl font-bold text-[#002b5c]">Our Address</h3>
            <div className="w-20 h-[2px] bg-gray-300 mt-1 mb-2"></div>

            <p className="text-gray-700 leading-6">
              Nooranadu, Nooranadu p.o<br />
              alappuzha (Dist), Kerala India – 691554
            </p>
          </div>
        </div>

        {/* Mail */}
        <div className="flex items-center gap-6">
          <div className="w-28 h-28 rounded-full border-4 border-teal-500 flex items-center justify-center">
            <div className="w-20 h-20 rounded-full bg-white flex items-center justify-center">
              {/* Mail Icon */}
              <svg
                fill="none"
                stroke="#002b5c"
                strokeWidth="2"
                className="w-10 h-10"
                viewBox="0 0 24 24"
              >
                <path d="M4 4h16v16H4z" />
                <path d="M4 4l8 8 8-8" />
              </svg>
            </div>
          </div>

          <div>
            <h3 className="text-xl font-bold text-[#002b5c]">24/7 Mail us</h3>
            <div className="w-24 h-[2px] bg-gray-300 mt-1 mb-2"></div>

            <p className="text-gray-700">
              info@healthcarehospitalkerala.com
            </p>
          </div>
        </div>

        {/* Contact */}
        <div className="flex items-center gap-6">
          <div className="w-28 h-28 rounded-full border-4 border-teal-500 flex items-center justify-center">
            <div className="w-20 h-20 rounded-full bg-white flex items-center justify-center">
              {/* Phone Icon */}
              <svg
                fill="none"
                stroke="#002b5c"
                strokeWidth="2"
                className="w-10 h-10"
                viewBox="0 0 24 24"
              >
                <path d="M22 16.92v3a2.07 2.07 0 01-2.27 2.07A19.79 19.79 0 013 4.27 2.07 2.07 0 015.07 2h3a2.07 2.07 0 012.07 1.72c.12.8.52 2.02.62 2.28a2.07 2.07 0 01-.47 2.14l-1.27 1.27a16 16 0 006.06 6.06l1.27-1.27a2.07 2.07 0 012.14-.47c.26.1 1.48.5 2.28.62A2.07 2.07 0 0122 16.92z" />
              </svg>
            </div>
          </div>

          <div>
            <h3 className="text-xl font-bold text-[#002b5c]">24/7 Contact us</h3>
            <div className="w-24 h-[2px] bg-gray-300 mt-1 mb-2"></div>

            <p className="text-gray-700 leading-6">
              +91-4734/219500 223377, 220460,<br />
              223402, 221355<br />
              +91 9778504577
            </p>
          </div>
        </div>

      </div>
    </div>
    </>
  );
}
