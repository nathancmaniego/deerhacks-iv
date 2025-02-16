import React, { useState } from 'react';
import './Signup.css';

function SignUp() {
  const [formData, setFormData] = useState({
    name: '',
    dob: '',
    university: '',
    wantsRoommate: 'no',
    budget: '',
    cleanliness: '',
    sleep_schedule: '',
    study_habits: '',
    social_level: '',
    pet_friendly: ''
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Form submitted:', formData);
    alert('Sign up successful!');
  };

  return (
    <div className="signup-container">
      <h1>Create Your Account</h1>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="name">Full Name</label>
          <input
            type="text"
            id="name"
            name="name"
            value={formData.name}
            onChange={handleChange}
            required
          />
        </div>

        <div className="form-group">
          <label htmlFor="dob">Date of Birth</label>
          <input
            type="date"
            id="dob"
            name="dob"
            value={formData.dob}
            onChange={handleChange}
            required
          />
        </div>

        <div className="form-group">
          <label htmlFor="university">University</label>
          <input
            type="text"
            id="university"
            name="university"
            value={formData.university}
            onChange={handleChange}
            required
          />
        </div>

        <div className="form-group">
          <label>Are you looking for roommate(s)?</label>
          <div className="radio-group">
            <label>
              <input
                type="radio"
                name="wantsRoommate"
                value="yes"
                checked={formData.wantsRoommate === 'yes'}
                onChange={handleChange}
              />
              Yes
            </label>
            <label>
              <input
                type="radio"
                name="wantsRoommate"
                value="no"
                checked={formData.wantsRoommate === 'no'}
                onChange={handleChange}
              />
              No
            </label>
          </div>
        </div>

        {formData.wantsRoommate === 'yes' && (
          <div className="roommate-preferences">
            <h2>Describe yourself</h2>
            
            <div className="form-group">
              <label htmlFor="budget">Budget</label>
              <select
                id="budget"
                name="budget"
                value={formData.budget}
                onChange={handleChange}
                required={formData.wantsRoommate === 'yes'}
              >
                <option value="">Select your budget range</option>
                <option value="$0-$400">$0-$400</option>
                <option value="$401-$600">$401-$600</option>
                <option value="$601-$800">$601-$800</option>
                <option value="$801-$1000">$801-$1000</option>
                <option value="$1001-$1500">$1001-$1500</option>
                <option value="1500+">$1500+</option>
              </select>
            </div>

            <div className="form-group">
              <label htmlFor="cleanliness">Cleanliness</label>
              <select
                id="cleanliness"
                name="cleanliness"
                value={formData.cleanliness}
                onChange={handleChange}
                required={formData.wantsRoommate === 'yes'}
              >
                <option value="">Select cleanliness level</option>
                <option value="Very Clean">Very Clean</option>
                <option value="Moderate">Moderate</option>
                <option value="Messy">Messy</option>
              </select>
            </div>

            <div className="form-group">
              <label htmlFor="sleep_schedule">Sleep Schedule</label>
              <select
                id="sleep_schedule"
                name="sleep_schedule"
                value={formData.sleep_schedule}
                onChange={handleChange}
                required={formData.wantsRoommate === 'yes'}
              >
                <option value="">Select sleep schedule</option>
                <option value="Early Bird">Early Bird</option>
                <option value="Night Owl">Night Owl</option>
                <option value="Flexible">Flexible</option>
              </select>
            </div>

            <div className="form-group">
              <label htmlFor="study_habits">Study Habits</label>
              <select
                id="study_habits"
                name="study_habits"
                value={formData.study_habits}
                onChange={handleChange}
                required={formData.wantsRoommate === 'yes'}
              >
                <option value="">Select study habits</option>
                <option value="Quiet">Quiet</option>
                <option value="Moderate">Moderate</option>
                <option value="Noisy">Noisy</option>
              </select>
            </div>

            <div className="form-group">
              <label htmlFor="social_level">Social Level</label>
              <select
                id="social_level"
                name="social_level"
                value={formData.social_level}
                onChange={handleChange}
                required={formData.wantsRoommate === 'yes'}
              >
                <option value="">Select social level</option>
                <option value="Introvert">Introvert</option>
                <option value="Extrovert">Extrovert</option>
                <option value="Moderate">Moderate</option>
              </select>
            </div>

            <div className="form-group">
              <label htmlFor="pet_friendly">Pet Friendly</label>
              <select
                id="pet_friendly"
                name="pet_friendly"
                value={formData.pet_friendly}
                onChange={handleChange}
                required={formData.wantsRoommate === 'yes'}
              >
                <option value="">Select pet preference</option>
                <option value="Yes">Yes</option>
                <option value="No">No</option>
              </select>
            </div>
          </div>
        )}

        <button type="submit" className="submit-button">Sign Up</button>
      </form>
    </div>
  );
}

export default SignUp;