// src/components/common/Sidebar.jsx (or wherever your Sidebar.jsx is located)
import React from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext'; // To get user info for "Hello, [Name]"

const Sidebar = ({ isOpen, onClose }) => {
  const { isAuthenticated, user } = useAuth();

  const getFirstNameForSidebar = () => {
    if (isAuthenticated && user?.name && typeof user.name === 'string') {
      const firstName = user.name.split(' ')[0];
      return firstName.charAt(0).toUpperCase() + firstName.slice(1);
    }
    return 'Sign In';
  };

  return (
    <>
      {/* Overlay for Sidebar */}
      {isOpen && (
        <div
          className="fixed inset-0 z-40"
          style={{
            backgroundColor: 'rgba(0, 0, 0, 0.4)', // Semi-transparent black background
            backdropFilter: 'blur(4px)', // Apply blur effect
            WebkitBackdropFilter: 'blur(4px)' // For Safari support
          }}
          onClick={onClose}
        ></div>
      )}

      {/* Sidebar Content Panel */}
      <div
        className={`fixed top-0 left-0 h-full w-64 shadow-lg transform transition-transform duration-300 ease-in-out z-50
          ${isOpen ? 'translate-x-0' : '-translate-x-full'}`}
        style={{ backgroundColor: 'white' }} // Ensure the main sidebar div itself has a white background
      >
        {/* Sidebar Header - Shopcart Green Theme */}
        <div className="flex items-center bg-green-800 text-white p-4">
          <i className="fas fa-user-circle text-2xl mr-2"></i>
          <h2 className="text-xl font-bold">Hello, {getFirstNameForSidebar()}</h2>
          <button onClick={onClose} className="ml-auto text-gray-300 hover:text-white text-2xl">
            &times; {/* Close button */}
          </button>
        </div>

        {/* This div contains the scrollable content */}
        <div className="p-4 overflow-y-auto h-[calc(100%-60px)]" style={{ backgroundColor: 'white' }}> {/* Explicitly ensure white background here too */}
          {/* Trending Section */}
          <h3 className="text-md font-bold mb-2">Trending</h3>
          <ul className="mb-4 text-gray-700">
            <li className="py-2 hover:bg-gray-100"><Link to="/bestsellers" onClick={onClose}>Bestsellers</Link></li>
            <li className="py-2 hover:bg-gray-100"><Link to="/new-releases" onClick={onClose}>New Releases</Link></li>
            <li className="py-2 hover:bg-gray-100"><Link to="/movers-shakers" onClick={onClose}>Movers and Shakers</Link></li>
          </ul>


          {/* Shop by Category */}
          <h3 className="text-md font-bold mb-2">Shop by Category</h3>
          <ul className="mb-4 text-gray-700">
            <li className="py-2 hover:bg-gray-100 flex justify-between items-center"><Link to="/mobiles-computers" onClick={onClose}>Mobiles, Computers</Link><i className="fas fa-chevron-right text-gray-500"></i></li>
            <li className="py-2 hover:bg-gray-100 flex justify-between items-center"><Link to="/tv-appliances-electronics" onClick={onClose}>TV, Appliances, Electronics</Link><i className="fas fa-chevron-right text-gray-500"></i></li>
            <li className="py-2 hover:bg-gray-100 flex justify-between items-center"><Link to="/mens-fashion" onClick={onClose}>Men's Fashion</Link><i className="fas fa-chevron-right text-gray-500"></i></li>
            <li className="py-2 hover:bg-gray-100 flex justify-between items-center"><Link to="/womens-fashion" onClick={onClose}>Women's Fashion</Link><i className="fas fa-chevron-right text-gray-500"></i></li>
            <li className="py-2 hover:bg-gray-100"><Link to="/all-categories" onClick={onClose}>See all</Link></li>
          </ul>


          {/* Help & Settings */}
          <h3 className="text-md font-bold mb-2">Help & Settings</h3>
          <ul className="mb-4 text-gray-700">
            <li className="py-2 hover:bg-gray-100"><Link to="/your-account" onClick={onClose}>Your Account</Link></li>
            <li className="py-2 hover:bg-gray-100"><Link to="/customer-service" onClick={onClose}>Customer Service</Link></li>
            <li className="py-2 hover:bg-gray-100"><Link to="/login" onClick={onClose}>Sign in</Link></li>
          </ul>
        </div>
      </div>
    </>
  );
};

export default Sidebar;