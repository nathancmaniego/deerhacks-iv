import React, { useState } from 'react';
import './RoommateFilters.css';

const roommateData = [
  {
    id: 1,
    name: "Alice",
    budget: 90,
    cleanliness: "Very Clean",
    sleep_schedule: "Early Bird",
    study_habits: "Quiet",
    social_level: "Introvert",
    pet_friendly: "Yes",
  },
  {
    id: 2,
    name: "Bob",
    budget: 150,
    cleanliness: "Moderate",
    sleep_schedule: "Night Owl",
    study_habits: "Noisy",
    social_level: "Extrovert",
    pet_friendly: "No",
  },
  {
    id: 3,
    name: "Carol",
    budget: 250,
    cleanliness: "Messy",
    sleep_schedule: "Flexible",
    study_habits: "Moderate",
    social_level: "Moderate",
    pet_friendly: "Yes",
  }, 
  {
    id: 4,
    name: "David",
    budget: 840,
    cleanliness: "Messy",
    sleep_schedule: "Flexible",
    study_habits: "Moderate",
    social_level: "Moderate",
    pet_friendly: "No",
  }
  // Add additional sample data as needed...
];

function RoommateFilters() {
  const [filters, setFilters] = useState({
    budget: '',
    cleanliness: '',
    sleep_schedule: '',
    study_habits: '',
    social_level: '',
    pet_friendly: '',
  });
  
  const [searchResults, setSearchResults] = useState(null);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFilters(prev => ({ ...prev, [name]: value }));
  };

  const handleSearch = () => {
    const filtered = roommateData.filter(roommate => {
      let budgetMatch = true;
      if (filters.budget !== '') {
        if (filters.budget === "$600+") {
          budgetMatch = roommate.budget >= 600;
        } else {
          const [minStr, maxStr] = filters.budget.replace(/\$/g, "").split('-');
          const min = parseFloat(minStr);
          const max = parseFloat(maxStr);
          budgetMatch = roommate.budget >= min && roommate.budget <= max;
        }
      }
      return (
        budgetMatch &&
        (filters.cleanliness === '' || roommate.cleanliness === filters.cleanliness) &&
        (filters.sleep_schedule === '' || roommate.sleep_schedule === filters.sleep_schedule) &&
        (filters.study_habits === '' || roommate.study_habits === filters.study_habits) &&
        (filters.social_level === '' || roommate.social_level === filters.social_level) &&
        (filters.pet_friendly === '' || roommate.pet_friendly === filters.pet_friendly)
      );
    });
    setSearchResults(filtered);
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
    <div className="roommate-filters-container">
      <h2 className="roommate-title">
        Find <span className="cursive-underline">your</span> roommate match.
      </h2>
      <div className="filters">
        <label>
          Budget:
          <select name="budget" value={filters.budget} onChange={handleChange}>
            <option value="">Any</option>
            <option value="$0-$100">$0-$100</option>
            <option value="$101-$200">$101-$200</option>
            <option value="$201-$300">$201-$300</option>
            <option value="$301-$400">$301-$400</option>
            <option value="$401-$500">$401-$500</option>
            <option value="$501-$600">$501-$600</option>
            <option value="$600+">$600+</option>
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
      <div className="button-container">
        <button className="match-button" onClick={handleSearch}>
          Find Me a Match
        </button>
        <button className="reset-button" onClick={handleReset}>
          Reset Filters
        </button>
      </div>
      
      {searchResults !== null && (
        <div className="match-results">
          {searchResults.length > 0 ? (
            <>
              <h3 className="top-matches">Here are your top matches...👀</h3>
              {searchResults.map(roommate => (
                <div key={roommate.id} className="match-card">
                  <h4>{roommate.name}</h4>
                  <p><strong>Budget:</strong> ${roommate.budget}</p>
                  <p><strong>Cleanliness:</strong> {roommate.cleanliness}</p>
                  <p><strong>Sleep:</strong> {roommate.sleep_schedule}</p>
                  <p><strong>Study:</strong> {roommate.study_habits}</p>
                  <p><strong>Social:</strong> {roommate.social_level}</p>
                  <p><strong>Pet Friendly:</strong> {roommate.pet_friendly}</p>
                  <p className="match-score">100% Match</p>
                </div>
              ))}
            </>
          ) : (
            <h3>No matches found.</h3>
          )}
        </div>
      )}
    </div>
  );
}

export default RoommateFilters;