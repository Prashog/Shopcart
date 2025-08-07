import React, { useState } from 'react';
import axios from 'axios';
import { motion } from 'framer-motion';
import { MessageCircle, Phone, Mail, MapPin } from 'lucide-react';
import { sendContactMessage } from '../services/api';

const Contact = () => {
  const [formData, setFormData] = useState({ name: '', email: '', message: '' });
  const [submitted, setSubmitted] = useState(false);

  const handleChange = (e) => {
    setFormData(prev => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await sendContactMessage(formData);
      setSubmitted(true);
      setFormData({ name: '', email: '', message: '' });
    } catch (err) {
      console.error('Error sending message:', err);
      alert('Failed to send message. Please try again.');
    }
  };

  return (
    <div className="bg-gradient-to-b from-white to-gray-100 text-gray-800 font-sans min-h-screen pt-20 pb-24 px-6 md:px-20">
      <motion.h1
        initial={{ opacity: 0, y: -30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="text-4xl md:text-5xl font-bold mb-14 text-center text-gray-900"
      >
        Contact <span className="text-black">UrbanBasket</span>
      </motion.h1>

      <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-14 items-start">
        {/* Left Contact Info */}
        <motion.div
          initial={{ opacity: 0, x: -30 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6 }}
          className="grid grid-cols-2 gap-6"
        >
          {[{
            Icon: MessageCircle,
            title: 'Chat with us',
            lines: ['9:00 - 22:00', '7 days a week']
          }, {
            Icon: Phone,
            title: 'Call us',
            lines: ['+91 62632 94639', '9:00 - 22:00', '7 days a week']
          }, {
            Icon: Mail,
            title: 'Email us',
            lines: ['We’ll reply within 1 business day']
          }, {
            Icon: MapPin,
            title: 'Find a Store',
            lines: ['Visit your nearest location']
          }].map(({ Icon, title, lines }, i) => (
            <div
              key={i}
              className="bg-white rounded-lg shadow-md p-6 flex flex-col items-center text-center hover:shadow-lg transition"
            >
              <Icon className="w-9 h-9 text-black mb-2" />
              <p className="font-semibold text-lg mb-1">{title}</p>
              {lines.map((line, j) => (
                <p key={j} className="text-sm text-gray-600">{line}</p>
              ))}
            </div>
          ))}
        </motion.div>

        {/* Contact Form */}
        <motion.form
          initial={{ opacity: 0, x: 30 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6 }}
          onSubmit={handleSubmit}
          className="bg-white rounded-xl p-8 shadow-lg space-y-6"
        >
          {submitted && (
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="text-green-600 font-semibold text-center"
            >
              ✅ Your message has been sent successfully!
            </motion.p>
          )}

          <div>
            <label className="block text-sm font-medium mb-1">Name</label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              className="w-full border border-gray-300 rounded-md px-4 py-2 focus:ring-2 focus:ring-blue-200"
              placeholder="Your name"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-1">Email</label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              className="w-full border border-gray-300 rounded-md px-4 py-2 focus:ring-2 focus:ring-blue-200"
              placeholder="you@example.com"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-1">Message</label>
            <textarea
              name="message"
              value={formData.message}
              onChange={handleChange}
              rows="4"
              className="w-full border border-gray-300 rounded-md px-4 py-2 focus:ring-2 focus:ring-blue-200"
              placeholder="Your message here..."
              required
            />
          </div>

          <button
            type="submit"
            className="bg-black hover:bg-blue-100 text-white hover:text-black font-semibold px-6 py-2 rounded-md transition w-full"
          >
            Send Message
          </button>
        </motion.form>
      </div>
    </div>
  );
};

export default Contact;