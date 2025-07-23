import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import Sidebar from './sidebar';
import { useAuth } from '../../contexts/AuthContext';
import { useCart } from '../../contexts/CartContext';

const Header = () => {
  const { isAuthenticated, user, logout } = useAuth();
  const { cartItems } = useCart();
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const getFirstName = () => {
    if (!user?.name || typeof user.name !== 'string') return 'Profile';
    const firstName = user.name.split(' ')[0];
    return firstName.charAt(0).toUpperCase() + firstName.slice(1);
  };

  return (
    <>
      <header className="bg-white shadow-md sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4 flex justify-between items-center">

          {/* LEFT: Sidebar trigger + Logo */}
          <div className="flex items-center space-x-4">
            <button
              onClick={() => setIsSidebarOpen(true)}
              className="flex items-center bg-[#819A91] text-white px-3 py-2 rounded-md hover:bg-[#6f867d] transition"
            >
              <i className="fas fa-bars mr-2"></i>
              <span className="font-semibold">All</span>
            </button>

            <Link to="/" className="text-2xl font-bold text-gray-800">
              Shopcart
            </Link>
          </div>

          {/* CENTER: Navigation */}
          <nav className="hidden md:flex items-center space-x-6">
            <Link to="/products" className="text-gray-600 hover:text-gray-800">
              Products
            </Link>
          </nav>

          {/* RIGHT: Auth + Cart */}
          <div className="flex items-center space-x-4">
            {isAuthenticated ? (
              <>
                <Link
                  to="/profile"
                  className="px-3 py-1 bg-black text-white rounded hover:bg-gray-800 transition duration-200"
                >
                  {getFirstName()}
                </Link>
                <button
                  onClick={logout}
                  className="px-3 py-1 bg-red-100 text-red-700 rounded hover:bg-red-200 transition duration-200"
                >
                  Logout
                </button>
              </>
            ) : (
              <>
                <Link
                  to="/login"
                  className="px-3 py-1 bg-green-100 text-green-700 rounded hover:bg-green-200 transition duration-200"
                >
                  Login
                </Link>
                <Link
                  to="/register"
                  className="px-3 py-1 bg-blue-100 text-blue-700 rounded hover:bg-blue-200 transition duration-200"
                >
                  Sign Up
                </Link>
              </>
            )}

            {/* Cart Icon */}
            <Link
              to="/cart"
              className="relative flex items-center bg-[#131921] text-white px-3 py-2 rounded-md hover:bg-[#232f3e] transition"
            >
              <i className="fas fa-shopping-cart text-xl"></i>
              <span className="absolute -top-2 left-4 text-orange-500 font-bold text-sm">
                {cartItems.length}
              </span>
              <span className="ml-2 font-semibold">Cart</span>
            </Link>
          </div>
        </div>
      </header>

      {/* Sidebar */}
      <Sidebar isOpen={isSidebarOpen} onClose={() => setIsSidebarOpen(false)} />
    </>
  );
};

export default Header;
