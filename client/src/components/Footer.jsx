import React from "react";
export default function Footer() {
  return (
    <footer className="bg-gradient-to-r from-[#0097A0] to-[#03506F] text-white py-3 mt-10 mx-10 rounded-[10px]">
      <div className="max-w-6xl mx-auto px-6 grid grid-cols-1 md:grid-cols-3 gap-8">

        {/* Column 1 */}
        <div>
          <h2 className="text-xl font-bold mb-3">HealthCare Hospital</h2>
          <h5>Nooranadu<br></br>Alappuzha</h5>
          <p className="text-sm text-gray-200">
            Providing quality healthcare with advanced technology and experienced professionals.
          </p>
        </div>

        
        

        {/* Column 3 */}
        <div>
          <h2 className="text-xl font-bold mb-3">Contact</h2>
          <ul className="space-y-2 text-gray-200">
            
            <li>📞 Phone: +91 9998877766</li>
            <li>📧 Email: healthcarehospital@gmail.com</li>
          </ul>
        </div>

      

      <div>
          <h2 className="text-xl font-bold mb-3">Location</h2>
          <div className="w-full h-40 rounded-lg overflow-hidden shadow-lg border border-white/20">
            <iframe
              title="map"
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3153.0197200077967!2d-122.41941528468176!3d37.774929279759985!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x8085808e4e2c0e23%3A0xdda8b6dca7b0ef67!2sHospital!5e0!3m2!1sen!2sin!4v1700000000000!5m2!1sen!2sin"
              className="w-full h-full"
              allowFullScreen=""
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            />
          </div>
        </div>
      </div>

      {/* Bottom line */}
      <div className="mt-8 border-t border-white/30 pt-4 text-center text-sm text-gray-200">
        © {new Date().getFullYear()} HealthCareHospital. All Rights Reserved.
      </div>
    </footer>
  );
}
