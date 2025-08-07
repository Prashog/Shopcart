import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useCategories } from '../../contexts/CategoryContext';
import { IoMenu } from 'react-icons/io5';
import { useAuth } from '../../contexts/AuthContext';

const BottomBar = () => {
  const { categories } = useCategories();
  const [showCategories, setShowCategories] = useState(false);
  const { isAuthenticated, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  // Scroll helpers
  const scrollToSection = (id) => {
    const section = document.getElementById(id);
    if (section) {
      section.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="bg-white px-6 py-3 flex justify-between items-center relative text-sm">
      {/* Left Section: All Categories + Section Links */}
      <div className="flex items-center gap-6">
        {/* All Categories Dropdown */}
        <div
          className="relative"
          onMouseEnter={() => setShowCategories(true)}
          onMouseLeave={() => setShowCategories(false)}
        >
          <div className="bg-black text-white hover:bg-blue-100 hover:text-black flex items-center gap-2 font-semibold cursor-pointer px-5 py-2 rounded-lg transition">
            <IoMenu />
            <span>All Categories</span>
          </div>

          {showCategories && (
            <div
              className="absolute left-0 top-full w-64 bg-white text-black shadow-md z-10"
              onMouseEnter={() => setShowCategories(true)}
              onMouseLeave={() => setShowCategories(false)}
            >
              {categories.map((category) => (
                <Link
                  to={`/products?category=${category._id}`}
                  key={category._id}
                  className="block px-4 py-2 hover:bg-gray-100"
                >
                  {category.name}
                </Link>
              ))}
            </div>
          )}
        </div>

        {/* Feature Section Links */}
        <button
          onClick={() => scrollToSection('best-sellers')}
          className="font-semibold hover:text-gray-500 transition"
        >
          Best Sellers
        </button>
        <button
          onClick={() => scrollToSection('deals')}
          className="font-semibold hover:text-gray-500 transition"
        >
          Deals of the Day
        </button>
        <button
          onClick={() => scrollToSection('new-arrivals')}
          className="font-semibold hover:text-gray-500 transition"
        >
          New Arrivals
        </button>
        <button
          onClick={() => scrollToSection('discounted')}
          className="font-semibold hover:text-gray-500 transition"
        >
          Discounted Products
        </button>

        <Link to="/about" className="font-semibold hover:text-gray-500 transition">
          About Us
        </Link>
        <Link to="/contact" className="font-semibold hover:text-gray-500 transition">
          Customer Service
        </Link>
      </div>

      {/* Right Section: Auth */}
      <div className="flex items-center gap-4">
        {isAuthenticated ? (
          <button onClick={handleLogout} className="font-semibold hover:text-gray-500 transition">
            Logout
          </button>
        ) : (
          <Link to="/login" className="font-semibold hover:text-gray-500 transition">
            Sign In
          </Link>
        )}
      </div>
    </div>
  );
};

export default BottomBar;