import React, { useState } from 'react';
import axios from 'axios';

const Contact = () => {
  const [formData, setFormData] = useState({ name: '', email: '', message: '' });
  const [submitted, setSubmitted] = useState(false);

  const handleChange = (e) => {
    setFormData(prev => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await axios.post('http://localhost:8080/api/contact', formData); // Adjust path as needed
      setSubmitted(true);
    } catch (err) {
      console.error('Error sending message:', err);
      alert('Failed to send message. Please try again.');
    }
  };

  return (
    <div className="bg-white text-gray-800 min-h-screen mt-10 px-6 md:px-16 py-10">
      <h1 className="text-4xl font-bold mb-6 text-center text-gray-900">Contact Us</h1>

      <div className="max-w-4xl mx-auto grid md:grid-cols-2 gap-10">
        <div>
          <h2 className="text-2xl font-semibold mb-4">Get in touch</h2>
          <p className="text-gray-700 mb-2">📍 123 Shopping Lane, Indore</p>
          <p className="text-gray-700 mb-2">📞 +91 98765 43210</p>
          <p className="text-gray-700 mb-4">📧 support@shopcart.com</p>
          <p className="text-gray-600">
            We’re here to help with product queries, order status, or general feedback. Drop us a message and we’ll respond within 24 hours.
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          {submitted && <p className="text-green-600 font-medium">Message sent successfully!</p>}
          <div>
            <label className="block text-sm font-medium mb-1">Name</label>
            <input type="text" name="name" value={formData.name} onChange={handleChange}
              className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-blue-500"
              placeholder="Your name" required />
          </div>
          <div>
            <label className="block text-sm font-medium mb-1">Email</label>
            <input type="email" name="email" value={formData.email} onChange={handleChange}
              className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-blue-500"
              placeholder="you@example.com" required />
          </div>
          <div>
            <label className="block text-sm font-medium mb-1">Message</label>
            <textarea name="message" value={formData.message} onChange={handleChange}
              rows="4"
              className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-blue-500"
              placeholder="Your message here..." required />
          </div>
          <button type="submit" className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition">
            Send Message
          </button>
        </form>
      </div>
    </div>
  );
};

export default Contact;
