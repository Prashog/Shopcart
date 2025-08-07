import React from 'react';
import { motion } from 'framer-motion';
import { Rocket, PackageCheck, UserCheck } from 'lucide-react';

const Card = ({ children, className = '' }) => (
  <div className={`bg-white rounded-xl overflow-hidden border border-gray-200 shadow-md hover:shadow-lg transition-all duration-300 ${className}`}>
    {children}
  </div>
);

const CardContent = ({ children, className = '' }) => (
  <div className={`p-4 ${className}`}>{children}</div>
);

const AboutUs = () => {
  return (
    <div className="bg-white text-gray-800 font-sans">
      {/* Hero Section */}
      <motion.section
        initial={{ opacity: 0, y: -50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="px-6 md:px-20 pt-16 pb-10 bg-[#e6f0ff]"
      >
        <h1 className="text-5xl md:text-6xl font-extrabold uppercase leading-tight text-black">
          Building the Future of Online Shopping<span className="text-red-600">.</span>
        </h1>
        <p className="text-gray-600 italic mt-2 text-lg">
          Urban Basket isn’t just another ecommerce store — it's an experience built for the next generation of shoppers.
        </p>
      </motion.section>

      {/* Featured Block */}
      <motion.section
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
        className="grid md:grid-cols-2 gap-10 px-6 md:px-20 py-16 items-center"
      >
        <img
          src="https://images.unsplash.com/photo-1664455340023-214c33a9d0bd?q=80&w=1332&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
          alt="Shopcart Vision"
          className="rounded-xl shadow-lg w-full h-96 object-cover"
        />
        <div>
          <h2 className="text-3xl font-bold mb-4">
            More Than a Marketplace
          </h2>
          <p className="text-gray-700 text-lg">
            We aim to redefine online retail in India by creating a seamless, user-first experience — accessible from anywhere, on any device.
          </p>
        </div>
      </motion.section>

      {/* From the Storyboard */}
      <section className="px-6 md:px-20 py-12 bg-white">
        <h2 className="text-2xl font-bold mb-6">Our Core Values</h2>
        <div className="grid md:grid-cols-3 gap-8">
          {['Smart Commerce', 'Elegant Simplicity', 'India-First Approach'].map((title, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: i * 0.2 }}
            >
              <Card>
                <img
                  src={
                    i === 0
                      ? 'https://images.pexels.com/photos/4498138/pexels-photo-4498138.jpeg?auto=compress&cs=tinysrgb&h=400'
                      : i === 1
                      ? 'https://images.pexels.com/photos/3184465/pexels-photo-3184465.jpeg?auto=compress&cs=tinysrgb&h=400'
                      : 'https://images.unsplash.com/photo-1486548730767-5c679e8eda6b?q=80&w=1170&auto=format&fit=crop'
                  }
                  alt={title}
                  className="h-48 w-full object-cover rounded-t-xl"
                />
                <CardContent>
                  <h3 className="font-semibold text-indigo-800 mb-2">{title}</h3>
                  <p className="text-sm text-gray-600">
                    {i === 0 &&
                      'Using intelligent suggestions and real-time analytics to power customer convenience.'}
                    {i === 1 &&
                      'Clean layouts, responsive interfaces, and delightful experiences for every user.'}
                    {i === 2 &&
                      'Tailored for India’s needs — from pin-code support to language adaptability.'}
                  </p>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Initiatives */}
      <section className="px-6 md:px-20 py-12">
        <h2 className="text-2xl font-bold mb-6">What We’re Innovating</h2>
        <div className="grid md:grid-cols-3 gap-8">
          {[{
            title: 'Speed Optimization',
            icon: <Rocket className="w-6 h-6 text-red-500 mb-2" />,
            desc: 'Delivering blazing-fast load times across all corners of the country.'
          }, {
            title: 'Verified Trust',
            icon: <PackageCheck className="w-6 h-6 text-red-500 mb-2" />,
            desc: 'Empowering shoppers with verified sellers and transparent delivery info.'
          }, {
            title: 'Hyper Personalization',
            icon: <UserCheck className="w-6 h-6 text-red-500 mb-2" />,
            desc: 'Adapting each experience to your habits, interests, and geography.'
          }].map((item, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: i * 0.2 }}
              className="bg-[#f8f9fb] p-6 rounded-lg shadow-sm"
            >
              {item.icon}
              <h4 className="text-lg font-bold mb-2 text-red-600">{item.title}</h4>
              <p className="text-gray-700 text-sm">{item.desc}</p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Final CTA */}
      <motion.section
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5 }}
        className="text-center py-16 bg-white"
      >
        <h2 className="text-3xl font-bold text-black mb-4">Join Our Journey</h2>
        <p className="text-gray-700 mb-8 max-w-xl mx-auto">
          We're continuously building and improving. Whether you're a customer, partner, or supporter — thank you for being a part of the Urban Basket family.
        </p>
        <motion.a
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          href="http://localhost:5173/contact"
          className="inline-block bg-red-600 hover:bg-red-700 text-white font-semibold py-3 px-6 rounded-full transition"
        >
          Contact Us
        </motion.a>
      </motion.section>
    </div>
  );
};

export default AboutUs;