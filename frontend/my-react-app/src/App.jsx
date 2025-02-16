import React from 'react';
import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";
import Navbar from "./Components/Navbar";
import Home from "./pages/home";
import Listings from "./pages/listings";
import Roommates from "./pages/roommates";
import Contact from "./pages/contact";
import ListingDetails from "./pages/ListingDetails"
import "./index.css";

function AppContent() {
  const location = useLocation();

  let backgroundClass = '';
  switch (location.pathname) {
    case '/listings':
      backgroundClass = 'bg-gradient-to-r from-blue-400 to-blue-700';
      break;
    case '/roommates':
      backgroundClass = 'bg-white';
      break;
    case '/contact':
      backgroundClass = 'bg-white';
      break;
    default:
      backgroundClass = 'bg-gradient-to-r from-blue-400 to-blue-700';
      break;
  }

  return (
    <div className={`w-full min-h-screen ${backgroundClass}`}>
      <Navbar />
      <main>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/listings" element={<Listings />} />
          <Route path="/listings/:id" element={<ListingDetails />} />
          <Route path="/roommates" element={<Roommates />} />
          <Route path="/contact" element={<Contact />} />
        </Routes>
      </main>
    </div>
  );
}

function App() {
  return (
    <BrowserRouter>
      <AppContent />
    </BrowserRouter>
  );
}

export default App;