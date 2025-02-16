import { useState } from "react";
import { Link } from "react-router-dom";
import logo from "../assets/logo.png";
import './Navbar.css';

function Navbar() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <>
      <header className='flex justify-between items-center text-black py-6 px-8 md:px-32 bg-white drop-shadow-md'>
        {/* logo */}
        <Link to="/">
          <img src={logo} alt="UniHousing Hub" className="w-12 hover:scale-105 transition-all" />
        </Link>
        {/* desktop elements */}
        <ul className="hidden xl:flex items-center gap-12 font-semibold text-base">
          <li className="p-3 hover:underline hover:decoration-2 hover:underline-offset-4 transition-all cursor-pointer">
            <Link to="/" className="text-black hover:text-black visited:text-black">Home</Link>
          </li>
          <li className="p-3 hover:underline hover:decoration-2 hover:underline-offset-4 transition-all cursor-pointer">
            <Link to="/listings" className="text-black hover:text-black visited:text-black">Listings</Link>
          </li>
          <li className="p-3 hover:underline hover:decoration-2 hover:underline-offset-4 transition-all cursor-pointer">
            <Link to="/roommates" className="text-black hover:text-black visited:text-black">Roommates</Link>
          </li>
          <li className="p-3 hover:underline hover:decoration-2 hover:underline-offset-4 transition-all cursor-pointer">
            <Link to="/contact" className="text-black hover:text-black visited:text-black">Contact</Link>
          </li>
        </ul>

        {/* <i className="bx bx-menu xl:hidden block text-5xl cursor-pointer" onClick={() => setMobileMenuOpen(!mobileMenuOpen)}></i> */}
      </header>
      
      {/* mobile menu */}
      {mobileMenuOpen && (
        <ul className="xl:hidden flex flex-col gap-4 font-semibold text-base bg-black text-white shadow-md absolute top-24 left-0 w-full p-4 z-50">
          <li
            className="p-3 hover:underline hover:decoration-4 hover:underline-offset-4 cursor-pointer"
            onClick={() => setMobileMenuOpen(false)}
          >
            <Link to="/" className="text-white hover:text-white visited:text-white">Home</Link>
          </li>
          <li
            className="p-3 hover:underline hover:decoration-4 hover:underline-offset-4 cursor-pointer"
            onClick={() => setMobileMenuOpen(false)}
          >
            <Link to="/listings" className="text-white hover:text-white visited:text-white">Listings</Link>
          </li>
          <li
            className="p-3 hover:underline hover:decoration-4 hover:underline-offset-4 cursor-pointer"
            onClick={() => setMobileMenuOpen(false)}
          >
            <Link to="/roommates" className="text-white hover:text-white visited:text-white">Roommates</Link>
          </li>
          <li
            className="p-3 hover:underline hover:decoration-4 hover:underline-offset-4 cursor-pointer"
            onClick={() => setMobileMenuOpen(false)}
          >
            <Link to="/contact" className="text-white hover:text-white visited:text-white">Contact</Link>
          </li>
        </ul>
      )}
    </>
  );
}

export default Navbar;