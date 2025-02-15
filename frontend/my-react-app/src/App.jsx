import React from 'react';
import './index.css';
import Home from "./Components/Home";
import Navbar from "./Components/Navbar";

function App() {
  return (
    <div className='w-full h-full absolute bg-gradient-to-r from-blue-400 to-blue-700'>
      <Navbar />
      <main>
        <Home />
      </main>
    </div>
  );
}

export default App;