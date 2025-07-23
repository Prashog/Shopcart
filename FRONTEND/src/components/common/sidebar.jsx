import React from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';

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

      {/* Sidebar Panel */}
      <div
        className={`fixed top-0 left-0 h-full w-64 shadow-lg transform transition-transform duration-300 ease-in-out z-50
          ${isOpen ? 'translate-x-0' : '-translate-x-full'} bg-white`}
      >
        {/* Sidebar Header */}
        <div className="flex items-center bg-[#819A91] text-white p-4">
          <i className="fas fa-user-circle text-2xl mr-2"></i>
          <h2 className="text-xl font-bold">Hello, {getFirstNameForSidebar()}</h2>
          <button
            onClick={onClose}
            className="ml-auto text-white hover:text-gray-200 text-2xl"
          >
            &times;
          </button>
        </div>

        {/* Scrollable content */}
        <div className="p-4 overflow-y-auto h-[calc(100%-60px)] bg-white">


          {/* Help & Settings */}
          <h3 className="text-md font-semibold text-[#819A91] mb-2">Help & Settings</h3>
          <ul className="text-gray-800">
            <li className="py-2 px-2 rounded hover:bg-[#EEEFE0]">
              <Link to="/profile" onClick={onClose}>Your Account</Link>
            </li>
            <li className="py-2 px-2 rounded hover:bg-[#EEEFE0]">
              <Link to="/contact" onClick={onClose}>Customer Service</Link>
            </li>
            {!isAuthenticated && (
              <li className="py-2 px-2 rounded hover:bg-[#EEEFE0]">
                <Link to="/login" onClick={onClose}>Sign in</Link>
              </li>
            )}
          </ul>
        </div>
      </div>
    </>
  );
};

export default Sidebar;



      