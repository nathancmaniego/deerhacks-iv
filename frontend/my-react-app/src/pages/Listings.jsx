import React, { useState, useEffect } from "react";
import { Search } from "lucide-react";
import { Link } from "react-router-dom";
import "./Listings.css"; 

function Listings() {
  const [listings, setListings] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [priceFilter, setPriceFilter] = useState("all");
  const [currentPage, setCurrentPage] = useState(1);
  const listingsPerPage = 12;
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchListings = async () => {
      setLoading(true);
      try {
        console.log("Attempting to fetch listings...");
        const response = await fetch("https://deerhacks-fast-api.onrender.com/api/listings");
        console.log("Response status:", response.status);
        if (!response.ok) {
          const errorText = await response.text();
          throw new Error(`Server error: ${errorText}`);
        }
        const data = await response.json();
        console.log("Fetched data:", data);
        setListings(data);
      } catch (err) {
        console.error("Fetch error:", err.message);
        setError(`Error fetching listings: ${err.message}`);
      } finally {
        setLoading(false);
      }
    };

    fetchListings();
  }, []);

  // Filtering logic for search term and price
  const filteredListings = listings.filter((listing) => {
    const matchesSearch =
      listing.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      listing.location.toLowerCase().includes(searchTerm.toLowerCase());

    const matchesPrice =
      priceFilter === "all" ||
      (priceFilter === "0-1000" && listing.price >= 0 && listing.price <= 1000) ||
      (priceFilter === "1001-2000" && listing.price >= 1001 && listing.price <= 2000) ||
      (priceFilter === "2001-3000" && listing.price >= 2001 && listing.price <= 3000) ||
      (priceFilter === "3001-4000" && listing.price >= 3001 && listing.price <= 4000) ||
      (priceFilter === "4000+" && listing.price > 4000);

    return matchesSearch && matchesPrice;
  });

  // Pagination logic
  const indexOfLastListing = currentPage * listingsPerPage;
  const indexOfFirstListing = indexOfLastListing - listingsPerPage;
  const currentListings = filteredListings.slice(
    indexOfFirstListing,
    indexOfLastListing
  );
  const totalPages = Math.ceil(filteredListings.length / listingsPerPage);

  const paginate = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  return (
    <div className="listings-container">
      <h1 className="text-4xl font-bold mb-8 text-center text-white">
        Available Listings
      </h1>

      {/* Error Message */}
      {error && <p className="text-center text-red-500">{error}</p>}

      {/* Loading Message */}
      {loading && <p className="text-center text-white">Loading listings...</p>}

      {/* Search and Filter Section */}
      <div className="mb-8 space-y-4">
        <div className="relative">
          <Search
            className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"
            size={20}
          />
          <input
            type="text"
            placeholder="Search by title or location..."
            className="w-full pl-10 pr-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>

        <select
          className="price-filter"
          value={priceFilter}
          onChange={(e) => setPriceFilter(e.target.value)}
        >
          <option value="all">All Prices</option>
          <option value="0-1000">0 - $1000</option>
          <option value="1001-2000">$1001 - $2000</option>
          <option value="2001-3000">$2001 - $3000</option>
          <option value="3001-4000">$3001 - $4000</option>
          <option value="4000+">Over $4000</option>
        </select>
      </div>

      {/* Listings Grid */}
      {!loading && filteredListings.length > 0 && (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {currentListings.map((listing) => (
            <div
              key={listing.id}
              className="bg-white rounded-lg shadow-lg overflow-hidden hover:shadow-xl transition-shadow"
            >
              <Link to={`/listings/${listing.id}`}>
                <img
                  src={listing.image_url}
                  alt={listing.title}
                  className="w-full h-48 object-cover"
                />
                <div className="p-4">
                  <h2 className="text-xl font-semibold text-gray-800 mb-2">
                    {listing.title}
                  </h2>
                  <p className="text-lg font-bold text-blue-600 mb-2">
                    ${listing.price}/month
                  </p>
                  <p className="text-gray-600 mb-2">
                    {listing.location}
                  </p>
                </div>
              </Link>
            </div>
          ))}
        </div>
      )}

      {/* No Results Message */}
      {!loading && filteredListings.length === 0 && (
        <div className="text-center text-white mt-8">
          <p className="text-xl">No listings found matching your criteria.</p>
        </div>
      )}

      {/* Pagination */}
      {totalPages > 1 && (
        <div className="pagination">
          {Array.from({ length: totalPages }, (_, i) => i + 1).map(
            (pageNumber) => (
              <button
                key={pageNumber}
                onClick={() => paginate(pageNumber)}
                className={currentPage === pageNumber ? "active" : ""}
              >
                {pageNumber}
              </button>
            )
          )}
        </div>
      )}
    </div>
  );
}

export default Listings;