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
  
  
    // Filtering logic
    const filteredListings = listings.filter((listing) => {
        const matchesSearch =
            listing.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
            listing.location.toLowerCase().includes(searchTerm.toLowerCase());

        const matchesPrice =
            priceFilter === "all" ||
            (priceFilter === "under2000" && listing.price < 2000) ||
            (priceFilter === "2000to2500" &&
                listing.price >= 2000 &&
                listing.price <= 2500) ||
            (priceFilter === "over2500" && listing.price > 2500);

        return matchesSearch && matchesPrice;
    });

    // Pagination
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
                    <option value="under2000">Under $2000</option>
                    <option value="2000to2500">$2000 - $2500</option>
                    <option value="over2500">Over $2500</option>
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
                                    <h2 className="text-xl font-semibold mb-2">
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




// import React, { useState, useEffect } from 'react';
// import { Search } from 'lucide-react';
// import { Link } from 'react-router-dom';
// import './Listings.css'; 

// function Listings() {
//   const [listings, setListings] = useState([]);
//   const [searchTerm, setSearchTerm] = useState('');
//   const [priceFilter, setPriceFilter] = useState('all');
//   const [currentPage, setCurrentPage] = useState(1);
//   const listingsPerPage = 12;

//     useEffect(() => {
//         // fetch instead of mock
        
//         const mockListings=[
//           {
//             "title": "2 Bedroom",
//             "price": 2895,
//             "id": 1,
//             "image_url": "https://images.rentals.ca/property-pictures/large/toronto-on/958085/condo-351966813.jpg",
//             "listing_url": "https://torontorentals.com/toronto/2221-yonge-street-id958085",
//             "location": "2221 Yonge Street, Toronto M4S 0B8",
//             "contact_info": "https://torontorentals.com/toronto/2221-yonge-street-id958085"
//           },
//           {
//             "title": "3 Bedroom",
//             "price": 3495,
//             "id": 2,
//             "image_url": "https://images.rentals.ca/property-pictures/large/north-york-on/942115/condo-350486793.jpg",
//             "listing_url": "https://torontorentals.com/north-york/15-vicora-linkway-id942115",
//             "location": "15 Vicora Linkway, North York M3C 1A7",
//             "contact_info": "https://torontorentals.com/north-york/15-vicora-linkway-id942115"
//           },
//           {
//             "title": "1 Bedroom",
//             "price": 2150,
//             "id": 3,
//             "image_url": "https://images.rentals.ca/property-pictures/large/etobicoke-on/942706/condo-338783133.jpg",
//             "listing_url": "https://torontorentals.com/etobicoke/251-manitoba-street-id942706",
//             "location": "251 Manitoba Street, Etobicoke M8Y 0C7",
//             "contact_info": "https://torontorentals.com/etobicoke/251-manitoba-street-id942706"
//           },
//           {
//             "title": "1 Bedroom",
//             "price": 2300,
//             "id": 4,
//             "image_url": "https://images.rentals.ca/property-pictures/large/toronto-on/524560/condo-347431739.jpg",
//             "listing_url": "https://torontorentals.com/toronto/400-adelaide-st-e-id524560",
//             "location": "400 Adelaide St E, Toronto M5A 1N4",
//             "contact_info": "https://torontorentals.com/toronto/400-adelaide-st-e-id524560"
//           },
//           {
//             "title": "1 Bedroom",
//             "price": 2500,
//             "id": 5,
//             "image_url": "https://images.rentals.ca/property-pictures/large/toronto-on/519293/condo-345162484.jpg",
//             "listing_url": "https://torontorentals.com/toronto/88-cumberland-st-id519293",
//             "location": "88 Cumberland St, Toronto M5R 1B9",
//             "contact_info": "https://torontorentals.com/toronto/88-cumberland-st-id519293"
//           },
//           {
//             "title": "1 Bedroom",
//             "price": 2200,
//             "id": 6,
//             "image_url": "https://images.rentals.ca/property-pictures/large/toronto-on/725296/condo-345162443.jpg",
//             "listing_url": "https://torontorentals.com/toronto/105-george-st-id725296",
//             "location": "105 George St, Toronto M5A 0L4",
//             "contact_info": "https://torontorentals.com/toronto/105-george-st-id725296"
//           },
//           {
//             "title": "2 Bedroom",
//             "price": 3000,
//             "id": 7,
//             "image_url": "https://images.rentals.ca/property-pictures/large/toronto-on/955084/condo-342738792.jpg",
//             "listing_url": "https://torontorentals.com/toronto/230-simcoe-street-id955084",
//             "location": "230 Simcoe Street, Toronto M5T 0G7",
//             "contact_info": "https://torontorentals.com/toronto/230-simcoe-street-id955084"
//           },
//           {
//             "title": "1 Bedroom",
//             "price": 2400,
//             "id": 8,
//             "image_url": "https://images.rentals.ca/property-pictures/large/toronto-on/513805/condo-342738253.jpg",
//             "listing_url": "https://torontorentals.com/toronto/88-harbour-st-id513805",
//             "location": "88 Harbour St, Toronto M5J 0C3",
//             "contact_info": "https://torontorentals.com/toronto/88-harbour-st-id513805"
//           },
//           {
//             "title": "1 Bedroom",
//             "price": 2345,
//             "id": 9,
//             "image_url": "https://images.rentals.ca/property-pictures/large/toronto-on/908858/condo-343000986.jpg",
//             "listing_url": "https://torontorentals.com/toronto/250-lawrence-avenue-west-id908858",
//             "location": "250 Lawrence Avenue West, Toronto M5M 1B2",
//             "contact_info": "https://torontorentals.com/toronto/250-lawrence-avenue-west-id908858"
//           },
//           {
//             "title": "1 Bedroom",
//             "price": 2299,
//             "id": 10,
//             "image_url": "https://images.rentals.ca/property-pictures/large/toronto-on/524171/condo-343299132.jpg",
//             "listing_url": "https://torontorentals.com/toronto/25-telegram-mews-id524171",
//             "location": "25 Telegram Mews, Toronto M5V 3Z1",
//             "contact_info": "https://torontorentals.com/toronto/25-telegram-mews-id524171"
//           },
//           {
//             "title": "35 Walmer Road",
//             "price": 1933,
//             "id": 11,
//             "image_url": "https://images.rentals.ca/property-pictures/large/toronto-on/830088/apartment-339962663.jpg",
//             "listing_url": "https://torontorentals.com/toronto/35-walmer-road-id830088",
//             "location": "35 Walmer Road, Toronto M5R 2X3",
//             "contact_info": "https://torontorentals.com/toronto/35-walmer-road-id830088"
//           },
//           {
//             "title": "77 & 99 Gerrard Street West",
//             "price": 2195,
//             "id": 12,
//             "image_url": "https://images.rentals.ca/property-pictures/large/toronto-on/700197/apartment-342636092.jpg",
//             "listing_url": "https://torontorentals.com/toronto/77-99-gerrard-street-west-id700197",
//             "location": "77 & 99 Gerrard Street West, Toronto M5G 2B5",
//             "contact_info": "https://torontorentals.com/toronto/77-99-gerrard-street-west-id700197"
//           },
//           {
//             "title": "191-201 Sherbourne Street",
//             "price": 2275,
//             "id": 13,
//             "image_url": "https://images.rentals.ca/property-pictures/large/toronto-on/878058/apartment-353127136.jpg",
//             "listing_url": "https://torontorentals.com/toronto/191-201-sherbourne-street-id878058",
//             "location": "191-201 Sherbourne Street, Toronto M5A 3X1",
//             "contact_info": "https://torontorentals.com/toronto/191-201-sherbourne-street-id878058"
//           },
//           {
//             "title": "100 Mill Street",
//             "price": 2526,
//             "id": 14,
//             "image_url": "https://images.rentals.ca/property-pictures/large/toronto-on/864966/apartment-228604095.jpg",
//             "listing_url": "https://torontorentals.com/toronto/100-mill-street-id864966",
//             "location": "100 Mill Street, Toronto M5A 0G2",
//             "contact_info": "https://torontorentals.com/toronto/100-mill-street-id864966"
//           },
//           {
//             "title": "8 Gloucester Street",
//             "price": 2423,
//             "id": 15,
//             "image_url": "https://images.rentals.ca/property-pictures/large/toronto-on/744918/apartment-207177794.jpg",
//             "listing_url": "https://torontorentals.com/toronto/8-gloucester-street-id744918",
//             "location": "8 Gloucester Street, Toronto M4Y 1L5",
//             "contact_info": "https://torontorentals.com/toronto/8-gloucester-street-id744918"
//           },
//           {
//             "title": "131 Mill Street",
//             "price": 2154,
//             "id": 16,
//             "image_url": "https://images.rentals.ca/property-pictures/large/toronto-on/728064/apartment-228624662.jpg",
//             "listing_url": "https://torontorentals.com/toronto/131-mill-street-id728064",
//             "location": "131 Mill Street, Toronto M5A 2Z8",
//             "contact_info": "https://torontorentals.com/toronto/131-mill-street-id728064"
//           },
//           {
//             "title": "111 Pacific Avenue",
//             "price": 1946,
//             "id": 17,
//             "image_url": "https://images.rentals.ca/property-pictures/large/toronto-on/299433/apartment-338833716.jpg",
//             "listing_url": "https://torontorentals.com/toronto/111-pacific-avenue-id299433",
//             "location": "111 Pacific Avenue, Toronto M6P 2P2",
//             "contact_info": "https://torontorentals.com/toronto/111-pacific-avenue-id299433"
//           },
//           {
//             "title": "61 Yorkville Avenue",
//             "price": 2905,
//             "id": 18,
//             "image_url": "https://images.rentals.ca/property-pictures/large/toronto-on/326598/apartment-128303430.jpg",
//             "listing_url": "https://torontorentals.com/toronto/61-yorkville-avenue-id326598",
//             "location": "61 Yorkville Avenue, Toronto M5R 3V6",
//             "contact_info": "https://torontorentals.com/toronto/61-yorkville-avenue-id326598"
//           },
//           {
//             "title": "39 Niagara Street",
//             "price": 1999,
//             "id": 19,
//             "image_url": "https://images.rentals.ca/property-pictures/large/toronto-on/300047/apartment-179306074.jpg",
//             "listing_url": "https://torontorentals.com/toronto/39-niagara-street-id300047",
//             "location": "39 Niagara Street, Toronto M5V 1C2",
//             "contact_info": "https://torontorentals.com/toronto/39-niagara-street-id300047"
//           },
//           {
//             "title": "18 Erskine Ave",
//             "price": 2225,
//             "id": 20,
//             "image_url": "https://images.rentals.ca/property-pictures/large/toronto-on/339188/apartment-348603708.jpg",
//             "listing_url": "https://torontorentals.com/toronto/18-erskine-ave-id339188",
//             "location": "18 Erskine Ave, Toronto M4P 0C9",
//             "contact_info": "https://torontorentals.com/toronto/18-erskine-ave-id339188"
//           }
//         ];
    
//         // Mock data (using the mock listings)
//         setListings(mockListings);
//     }, []);

//     //filtering :)
//     const filteredListings = listings.filter(listing => {
//         const matchesSearch = listing.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
//             listing.location.toLowerCase().includes(searchTerm.toLowerCase());

//         const matchesPrice = priceFilter === 'all' ||
//             (priceFilter === 'under1000' && listing.price < 1000) ||
//             (priceFilter === '1000to1500' && listing.price >= 1000 && listing.price <= 1500) ||
//             (priceFilter === 'over1500' && listing.price > 1500);

//         return matchesSearch && matchesPrice;
//     });

//     // Calculate pagination
//     const indexOfLastListing = currentPage * listingsPerPage;
//     const indexOfFirstListing = indexOfLastListing - listingsPerPage;
//     const currentListings = filteredListings.slice(indexOfFirstListing, indexOfLastListing);
//     const totalPages = Math.ceil(filteredListings.length / listingsPerPage);

//     const paginate = (pageNumber) => {
//         setCurrentPage(pageNumber);
//     };

//     return (
//         <div className="listings-container">
//             <h1 className="text-4xl font-bold mb-8 text-center text-white">Available Listings</h1>

//             {/* Search and Filter Section */}
//             <div className="mb-8 space-y-4">
//                 <div className="relative">
//                     <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
//                     <input
//                         type="text"
//                         placeholder="Search by title or location..."
//                         className="w-full pl-10 pr-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
//                         value={searchTerm}
//                         onChange={(e) => setSearchTerm(e.target.value)}
//                     />
//                 </div>

//                 <select
//                     className="w-full p-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
//                     value={priceFilter}
//                     onChange={(e) => setPriceFilter(e.target.value)}
//                 >
//                     <option value="all">All Prices</option>
//                     <option value="under1000">Under $1000</option>
//                     <option value="1000to1500">$1000 - $1500</option>
//                     <option value="over1500">Over $1500</option>
//                 </select>
//             </div>

//             {/* Listings Grid */}
//             <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
//                 {currentListings.map(listing => (
//                     <div key={listing.id} className="bg-white rounded-lg shadow-lg overflow-hidden hover:shadow-xl transition-shadow">
//                         <Link to={`/listings/${listing.id}`}> {/* Link to the listing details page */}
//                             <img src={listing.image_url} alt={listing.title} className="w-full h-48 object-cover" />
//                             <div className="p-4">
//                                 <h2 className="text-xl font-semibold mb-2">{listing.title}</h2>
//                                 <p className="text-lg font-bold text-blue-600 mb-2">${listing.price}/month</p>
//                                 <p className="text-gray-600 mb-2">{listing.location}</p>
//                             </div>
//                         </Link>
//                     </div>
//                 ))}
//             </div>

//             {/* Pagination */}
//             {totalPages > 1 && ( // Only show pagination if there's more than one page
//                 <div className="pagination">
//                     {Array.from({ length: totalPages }, (_, i) => i + 1).map(pageNumber => (
//                         <button
//                             key={pageNumber}
//                             onClick={() => paginate(pageNumber)}
//                             className={currentPage === pageNumber ? 'active' : ''}
//                         >
//                             {pageNumber}
//                         </button>
//                     ))}
//                 </div>
//             )}

//             {/* No Results Message */}
//             {filteredListings.length === 0 && (
//                 <div className="text-center text-white mt-8">
//                     <p className="text-xl">No listings found matching your criteria.</p>
//                 </div>
//             )}
//         </div>
//     );
// }

// export default Listings;