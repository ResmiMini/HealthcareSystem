import React from 'react';
import Footer from '../components/Footer';
import { Link} from 'react-router-dom';
export default function Career()
{
   
   return(
<>
<br />
      <div className="flex items-center justify-center h-[15cm] bg-[url('/src/assets/image/career.jpg')] bg-cover py-2 px-4 mx-10 rounded-[10px]">
        <div className="bg-white p-5 rounded-2xl shadow-md w-[550px]">
          <h1 className="text-6xl font-bold mb-6 text-center text-[#03506F]">Careers</h1>
          <p className="text-xl italic"> "Join us and be the reason someone remembers their stay"</p>
          <br></br><br></br>

         <Link to="/docregister" className="text-blue-600 hover:underline">
                Doctor Register here
              </Link>
<br></br><br></br>
          <Link to="/staffregister" className="text-blue-600 hover:underline">
                Staff Register here
              </Link>

           

            
       </div>
       </div>       
      <Footer/>
</>
   ) ;
}