import React, { useState } from 'react';
import './Contact.css';

function Contact() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: ''
  });
  
  const [showPopup, setShowPopup] = useState(false);
  
  const handleChange = (e) => {
    setFormData({...formData, [e.target.name]: e.target.value});
  };
  
  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Form Submitted:', formData);
    // Show the popup
    setShowPopup(true);
    // Reset the form
    setFormData({
      name: '',
      email: '',
      message: ''
    });
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