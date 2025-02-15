import logo from "./assets/logo.png"
import { useState } from "react";

function App() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <div className='w-full h-full absolute bg-gradient-to-r from-blue-400 to-blue-700'>
      <header className='flex justify-between items-center text-black py-6 px-8 md:px-32 bg-white drop-shadow-md'>
        
        {/* logo */}
        <a href='#'>
          <img src={logo} alt="UniHousing Hub" className="w-12 hover:scale-105 transition-all"/>
        
        </a>
        {/* desktop elements */}
        <ul className="hidden xl:flex items-center gap-12 font-semibold text-base">
          <li className="p-3 hover:underline hover:decoration-2 hover:underline-offset-4 transition-all cursor-pointer">Home</li>
          <li className="p-3 hover:underline hover:decoration-2 hover:underline-offset-4 transition-all cursor-pointer">Listings</li>
          <li className="p-3 hover:underline hover:decoration-2 hover:underline-offset-4 transition-all cursor-pointer">Roommates</li>
          <li className="p-3 hover:underline hover:decoration-2 hover:underline-offset-4 transition-all cursor-pointer">Contact</li>
        </ul>

        {/* <i className="bx bx-menu xl:hidden block text-5xl cursor-pointer" onClick={() => setMobileMenuOpen(!mobileMenuOpen)}></i> */}
        
      </header>
      
      {/* mobile menu */}
      {mobileMenuOpen && (
        <ul className="xl:hidden flex flex-col gap-4 font-semibold text-base bg-black text-white shadow-md absolute top-24 left-0 w-full p-4">
          <li
            className="p-3 hover:underline hover:decoration-4 hover:underline-offset-4 cursor-pointer"
            onClick={() => setMobileMenuOpen(false)}
          >
            Home
          </li>
          <li
            className="p-3 hover:underline hover:decoration-4 hover:underline-offset-4 cursor-pointer"
            onClick={() => setMobileMenuOpen(false)}
          >
            Listings
          </li>
          <li
            className="p-3 hover:underline hover:decoration-4 hover:underline-offset-4 cursor-pointer"
            onClick={() => setMobileMenuOpen(false)}
          >
            Roommates
          </li>
          <li
            className="p-3 hover:underline hover:decoration-4 hover:underline-offset-4 cursor-pointer"
            onClick={() => setMobileMenuOpen(false)}
          >
            Contact
          </li>
        </ul>
      )}
    </div>
  );
}

export default App
