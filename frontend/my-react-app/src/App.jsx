import React from 'react';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Navbar from "./Components/Navbar";
import Home from "./pages/home";
import Listings from "./pages/listings";
import Roommates from "./pages/roommates";
import Contact from "./pages/contact";
import "./index.css";

function App() {
  return (
    <BrowserRouter>
      <div className='w-full min-h-screen bg-gradient-to-r from-blue-400 to-blue-700'>
        <Navbar />
        <main>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/listings" element={<Listings />} />
            <Route path="/roommates" element={<Roommates />} />
            <Route path="/contact" element={<Contact />} />
          </Routes>
        </main>
      </div>
    </BrowserRouter>
  );
}

export default App;