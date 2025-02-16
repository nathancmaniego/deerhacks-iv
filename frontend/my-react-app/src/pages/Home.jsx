import React from 'react';
import './Home.css';
import sampleImage from '../assets/home.jpg'; // Replace with your image

function Home() {
  return (
    <div className="home-container">
      <div className="home-top">
        <div className="home-left">
          <div className="home-image-container">
            <img 
              src={sampleImage} 
              alt="Housing" 
              className="home-image" 
            />
          </div>
        </div>
        <div className="home-right">
          <h1 className="home-title">DORMIGO</h1>
          <p className="home-description">
            Find safe, affordable, and convenient student housing and roommates.
          </p>
        </div>
      </div>
      <div className="home-bottom">
        <p className="home-bottom-text">
          Welcome to our platform. Discover rental listings and roommates by aggregating Zillow and Toronto Rentals listings, all in one place.
        </p>
      </div>
    </div>
  );
}

export default Home;