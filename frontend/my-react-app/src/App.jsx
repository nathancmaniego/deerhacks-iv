import React from 'react';
import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";
import Navbar from "./Components/Navbar";
import Home from "./pages/Home";
import Listings from "./pages/Listings";
import Roommates from "./pages/Roommates";
import Contact from "./pages/Contact";
import ListingDetails from "./pages/ListingDetails";
import Signup from "./pages/Signup";
import "./index.css";

function AppContent() {
  const location = useLocation();

  let backgroundClass = '';
  switch (location.pathname) {
    case '/listings':
      backgroundClass = 'bg-white';
      break;
    case '/roommates':
      backgroundClass = 'bg-white';
      break;
    case '/contact':
      backgroundClass = 'bg-white';
      break;
      case '/signup':
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
          <Route path="/signup" element={<Signup/>}/>
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