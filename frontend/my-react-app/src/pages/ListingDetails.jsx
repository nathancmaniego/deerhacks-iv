import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import './ListingDetails.css';

function ListingDetails() {
  const { id } = useParams();
  const [listing, setListing] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  useEffect(() => {
    const fetchListing = async () => {
      setLoading(true);
      setError(null);
      try {
        console.log(`Attempting to fetch listing with id: ${id}...`);
        
        const response = await fetch(`https://deerhacks-fast-api.onrender.com/api/listings`);
        
        console.log("Response status:", response.status);
        
        if (!response.ok) {
          const errorText = await response.text();
          throw new Error(`Server error: ${errorText}`);
        }
        
        const data = await response.json();
        const foundListing = data.find(item => item.id == parseInt(id));
        setListing(foundListing);
      } catch (err) {
        console.error("Fetch error:", err.message);
        setError(`Error fetching listing: ${err.message}`);
      } finally {
        setLoading(false);
      }
    };

    fetchListing();
  }, [id]);

  if (loading) {
    return <div className="loading">Loading...</div>;
  }

  if (!listing) {
    return <div className="not-found">Listing not found!</div>;
  }

  return (
    <div className="listing-details-container">
      <div className="listing-details-card">
        <Link to="/listings" className="back-button">← Back to listings</Link>
        
        <div className="listing-details-content">
          <div className="listing-image-container">
            <img src={listing.image_url} alt={listing.title} className="listing-image" />
          </div>
          
          <div className="listing-info">
            <h1 className="listing-title">{listing.title}</h1>
            <p className="listing-price">${listing.price}/month</p>
            <p className="listing-location">{listing.location}</p>
            
            <div className="listing-links">
              <a href={listing.listing_url} className="listing-url-button" target="_blank" rel="noopener noreferrer">
                View Original Listing
              </a>
              
              <a href={listing.contact_info} className="contact-info-button" target="_blank" rel="noopener noreferrer">
                Contact Information
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ListingDetails;