import React from "react";

function Navbar() {
  return (
    <nav className="bg-blue-600 text-white p-4 sticky top-0 w-full z-50">
      {/* <div className="container mx-auto flex justify-between items-center"> */}
        <h1 className="text-xl font-bold">UniHousing Hub</h1>
        <div className="space-x-4">
          <a href="/" className="hover:underline">
            Home
          </a>
          <a href="/listings" className="hover:underline">
            Listings
          </a>
          <a href="/roommate" className="hover:underline">
            Roommates
          </a>
          <a href="/contact" className="hover:underline">
            Contact
          </a>
        </div>
      {/* </div> */}
    </nav>
  );
}

export default Navbar;