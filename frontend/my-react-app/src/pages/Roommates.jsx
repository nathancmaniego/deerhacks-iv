import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './Roommates.css';

function Roommates() {
  const [roommates, setRoommates] = useState([]);
  const [searchResults, setSearchResults] = useState(null);
  const [isFiltered, setIsFiltered] = useState(false);
  const [filters, setFilters] = useState({
    budget: '',
    cleanliness: '',
    sleep_schedule: '',
    study_habits: '',
    social_level: '',
    pet_friendly: '',
  });

  // Fetch all roommates on component mount
  useEffect(() => {
    axios.get('https://deerhacks-fast-api.onrender.com/api/roommates')
      .then((res) => {
        console.log('All roommates:', res.data);
        setRoommates(res.data);
        setSearchResults(res.data);
      })
      .catch((err) => {
        console.error('Error fetching roommates:', err);
      });
  }, []);

  // Handle filter changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFilters(prev => ({ ...prev, [name]: value }));
  };

  // Convert budget range string into an object with min and max values
  const transformBudget = (budgetStr) => {
    if (!budgetStr) return null;
    if (budgetStr.includes("-")) {
      const [minStr, maxStr] = budgetStr.replace(/\$/g, "").split("-");
      const min = parseFloat(minStr);
      const max = parseFloat(maxStr);
      console.log(`Transforming budget ${budgetStr} to range:`, { min, max });
      return { min, max };
    } else if (budgetStr === "1500+") {
      // Return range with no upper limit.
      console.log(`Transforming budget ${budgetStr} to range:`, { min: 1500, max: Infinity });
      return { min: 1500, max: Infinity };
    }
    return null;
  };

  // Send filters to the API for matching, then perform client-side budget filtering
  const handleSearch = () => {
    // Build payload using only non-empty filter values (excluding budget for now)
    const payload = {};
    if (filters.cleanliness) payload.cleanliness = filters.cleanliness;
    if (filters.sleep_schedule) payload.sleep_schedule = filters.sleep_schedule;
    if (filters.study_habits) payload.study_habits = filters.study_habits;
    if (filters.social_level) payload.social_level = filters.social_level;
    if (filters.pet_friendly) payload.pet_friendly = filters.pet_friendly;
    
    console.log('Payload being sent (excluding budget):', payload);
    
    // If no filters are applied and no budget filter is set, show all roommates.
    if (Object.keys(payload).length === 0 && !filters.budget) {
      setIsFiltered(false);
      setSearchResults(roommates);
      return;
    }
    
    setIsFiltered(true);
    axios.post('https://deerhacks-fast-api.onrender.com/api/roommates/match', payload)
      .then((res) => {
        console.log('Match results (raw):', res.data);
        let results = res.data.matches ? res.data.matches : res.data;
        
        // If a budget filter is applied, further filter the results client-side.
        if (filters.budget) {
          const range = transformBudget(filters.budget);
          if (range) {
            results = results.filter(rm => {
              const bud = parseFloat(rm.budget);
              return bud >= range.min && bud <= range.max;
            });
          }
        }
        
        console.log('Filtered results:', results);
        setSearchResults(results);
      })
      .catch((err) => {
        console.error('Error matching roommates:', err);
        if (err.response) {
          console.error('Response data:', err.response.data);
          console.error('Response status:', err.response.status);
        }
      });
  };

  // Reset filters and show all roommates (as if no filters applied)
  const handleReset = () => {
    setFilters({
      budget: '',
      cleanliness: '',
      sleep_schedule: '',
      study_habits: '',
      social_level: '',
      pet_friendly: '',
    });
    setIsFiltered(false);
    setSearchResults(roommates);
  };

  return (
    <div className="roommates-container">
      {/* Static Page Title */}
        <h2 className="roommates-title">
            Find <span className="your">your</span> roommate match.
        </h2>

      {/* Filters */}
      <div className="filters">
        <label>
          Budget:
          <select name="budget" value={filters.budget} onChange={handleChange}>
            <option value="">Any</option>
            <option value="$0-$400">$0-$400</option>
            <option value="$401-$600">$401-$600</option>
            <option value="$601-$800">$601-$800</option>
            <option value="$801-$1000">$801-$1000</option>
            <option value="$1001-$1500">$1001-$1500</option>
            <option value="1500+">$1500+</option>
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
      <div className="button-container">
        <button className="match-button" onClick={handleSearch}>
          Find Me a Match
        </button>
        <button className="reset-button" onClick={handleReset}>
          Reset
        </button>
      </div>

      {/* Display All Roommates if no search has been performed */}
      {searchResults === null && (
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
      )}

      {/* Display Search Results */}
      {searchResults !== null && (
        <div className="match-results">
          <h3>{ isFiltered ? "We've found your top matches...👀" : "All potential roommates..." }</h3>
          {searchResults.length > 0 ? (
            searchResults.map((rm) => (
              <div key={rm.id} className="match-card">
                <h4>{rm.name}</h4>
                <p><strong>Budget:</strong> {rm.budget}</p>
                <p><strong>Cleanliness:</strong> {rm.cleanliness}</p>
                <p><strong>Sleep:</strong> {rm.sleep_schedule}</p>
                <p><strong>Study:</strong> {rm.study_habits}</p>
                <p><strong>Social:</strong> {rm.social_level}</p>
                <p><strong>Pet Friendly:</strong> {rm.pet_friendly}</p>
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