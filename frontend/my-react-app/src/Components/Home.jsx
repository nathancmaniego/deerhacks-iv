import React from 'react';
import './Home.css'; 

function Home() {
  return (
    <div className="home-container">
      <h1 className="home-title">UniHousing Hub</h1>
      <p className="home-description">
        Find safe, affordable, and convenient student housing and roommates.
      </p>
      <p>
        Welcome to our platform. Discover rental listings and roommates by aggregating Facebook Marketplace, Kijiji, and university housing listings.
      </p>
    </div>
  );
}

export default Home;