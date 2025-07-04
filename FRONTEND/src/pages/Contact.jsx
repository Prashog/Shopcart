import React from 'react';

const Contact = () => {
  return (
    <div className="bg-white text-gray-800 min-h-screen mt-10 px-6 md:px-16 py-10">
      <h1 className="text-4xl font-bold mb-6 text-center text-gray-900">Contact Us</h1>

      <div className="max-w-4xl mx-auto grid md:grid-cols-2 gap-10">
        {/* Contact Info */}
        <div>
          <h2 className="text-2xl font-semibold mb-4">Get in touch</h2>
          <p className="text-gray-700 mb-2">📍 123 Shopping Lane, Indore</p>
          <p className="text-gray-700 mb-2">📞 +91 98765 43210</p>
          <p className="text-gray-700 mb-4">📧 support@shopcart.com</p>
          <p className="text-gray-600">
            We’re here to help with product queries, order status, or general feedback. Drop us a message and we’ll respond within 24 hours.
          </p>
        </div>

        {/* Contact Form */}
        <form className="space-y-4">
          <div>
            <label className="block text-sm font-medium mb-1">Name</label>
            <input type="text" className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500" placeholder="Your name" />
          </div>
          <div>
            <label className="block text-sm font-medium mb-1">Email</label>
            <input type="email" className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500" placeholder="you@example.com" />
          </div>
          <div>
            <label className="block text-sm font-medium mb-1">Message</label>
            <textarea rows="4" className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500" placeholder="Your message here..." />
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