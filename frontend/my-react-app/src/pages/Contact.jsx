import React, { useState } from 'react';
import './Contact.css';

function Contact() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: ''
  });
  
  const [showPopup, setShowPopup] = useState(false);
  
  const GOOGLE_SCRIPT_URL = 'https://script.google.com/macros/s/AKfycbw4EkvjqNs-GqV8DXCrzzDqJeiPlhUNKcpQPjTrPxQv8SHdGgb8eiMRcKHHLGWEpL_e/exec';
  
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };
  
  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log('Submitting form:', formData);
    try {
      const response = await fetch(GOOGLE_SCRIPT_URL, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData)
      });
      const result = await response.json();
      console.log('Response:', result);
      if (result.result === "success") {
        setShowPopup(true);
        setFormData({ name: '', email: '', message: '' });
      } else {
        console.error('Error:', result.error);
      }
    } catch (error) {
      console.error('Error submitting form:', error);
    }
  };
  
  const closePopup = () => {
    setShowPopup(false);
  };
  
  return (
    <div className="contact-container">
      <h1 className="contact-title">Contact Us</h1>
      <p className="contact-subtitle">We'd love to hear from you!</p>
      <form onSubmit={handleSubmit} className="contact-form">
        <div className="form-group">
          <label>Name</label>
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            placeholder="Your Name"
            required
          />
        </div>
        <div className="form-group">
          <label>Email</label>
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            placeholder="Your Email"
            required
          />
        </div>
        <div className="form-group">
          <label>Message</label>
          <textarea
            name="message"
            value={formData.message}
            onChange={handleChange}
            placeholder="Your Message"
            rows="4"
            required
          />
        </div>
        <button type="submit" className="contact-button">Submit</button>
      </form>
      
      {showPopup && (
        <div className="popup-overlay">
          <div className="popup">
            <p>Thank you! Your message was submitted.</p>
            <button onClick={closePopup} className="popup-close">Close</button>
          </div>
        </div>
      )}
    </div>
  );
}

export default Contact;