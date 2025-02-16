import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './Roommates.css';

function Roommates() {
  const [roommates, setRoommates] = useState([]);
  const [searchResults, setSearchResults] = useState(null);

  const [filters, setFilters] = useState({
    budget: '',
    cleanliness: '',
    sleep_schedule: '',
    study_habits: '',
    social_level: '',
    pet_friendly: '',
  });

  useEffect(() => {
    axios
      .get('https://deerhacks-fast-api.onrender.com/api/roommates')
      .then((res) => {
        console.log('All roommates:', res.data);
        setRoommates(res.data);
      })
      .catch((err) => {
        console.error('Error fetching roommates:', err);
      });
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFilters((prev) => ({ ...prev, [name]: value }));
  };

  const handleSearch = () => {
    axios
      .post('https://deerhacks-fast-api.onrender.com/api/roommates/match', filters)
      .then((res) => {
        console.log('Match results:', res.data);
        setSearchResults(res.data);
      })
      .catch((err) => {
        console.error('Error matching roommates:', err);
      });
  };

  const handleReset = () => {
    setFilters({
      budget: '',
      cleanliness: '',
      sleep_schedule: '',
      study_habits: '',
      social_level: '',
      pet_friendly: '',
    });
    setSearchResults(null);
  };

  return (
    <div className="roommates-container">
      <h2 className="roommates-title">
        Find <span className="your">your</span> roommate match.
      </h2>

      {/* Filters */}
      <div className="filters">
        <label>
          Budget:
          <select name="budget" value={filters.budget} onChange={handleChange}>
            <option value="">Any</option>
            <option value="0-100">0-100</option>
            <option value="101-200">101-200</option>
            <option value="201-300">201-300</option>
            <option value="301-400">301-400</option>
            <option value="401-500">401-500</option>
            <option value="501-600">501-600</option>
            <option value="600+">600+</option>
          </select>
        </label>
        <label>
          Cleanliness:
          <select name="cleanliness" value={filters.cleanliness} onChange={handleChange}>
            <option value="">Any</option>
            <option value="Very Clean">Very Clean</option>
            <option value="Moderate">Moderate</option>
            <option value="Messy">Messy</option>
          </select>
        </label>
        <label>
          Sleep Schedule:
          <select name="sleep_schedule" value={filters.sleep_schedule} onChange={handleChange}>
            <option value="">Any</option>
            <option value="Early Bird">Early Bird</option>
            <option value="Night Owl">Night Owl</option>
            <option value="Flexible">Flexible</option>
          </select>
        </label>
        <label>
          Study Habits:
          <select name="study_habits" value={filters.study_habits} onChange={handleChange}>
            <option value="">Any</option>
            <option value="Quiet">Quiet</option>
            <option value="Moderate">Moderate</option>
            <option value="Noisy">Noisy</option>
          </select>
        </label>
        <label>
          Social Level:
          <select name="social_level" value={filters.social_level} onChange={handleChange}>
            <option value="">Any</option>
            <option value="Introvert">Introvert</option>
            <option value="Extrovert">Extrovert</option>
            <option value="Moderate">Moderate</option>
          </select>
        </label>
        <label>
          Pet Friendly:
          <select name="pet_friendly" value={filters.pet_friendly} onChange={handleChange}>
            <option value="">Any</option>
            <option value="Yes">Yes</option>
            <option value="No">No</option>
          </select>
        </label>
      </div>

      {/* Buttons */}
      <div className="buttons">
        <button onClick={handleSearch}>Find Me a Match</button>
        <button onClick={handleReset}>Reset</button>
      </div>

      {/* Display All Roommates (Optional) */}
      <div className="all-roommates">
        <h3>All Roommates:</h3>
        <ul>
          {roommates.map((rm) => (
            <li key={rm.id}>
              {rm.name} — Budget: {rm.budget}
            </li>
          ))}
        </ul>
      </div>

      {/* Search Results */}
      {searchResults && (
        <div className="match-results">
          <h3>Top Matches:</h3>
          {searchResults.length > 0 ? (
            searchResults.map((rm) => (
              <div key={rm.id} className="match-card">
                <h4>{rm.name}</h4>
                <p>Budget: {rm.budget}</p>
                <p>Cleanliness: {rm.cleanliness}</p>
                <p>Sleep: {rm.sleep_schedule}</p>
                <p>Study: {rm.study_habits}</p>
                <p>Social: {rm.social_level}</p>
                <p>Pet Friendly: {rm.pet_friendly}</p>
              </div>
            ))
          ) : (
            <p>No matches found.</p>
          )}
        </div>
      )}
    </div>
  );
}

export default Roommates;