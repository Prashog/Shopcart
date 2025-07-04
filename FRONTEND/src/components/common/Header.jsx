import React from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';
import { useCart } from '../../contexts/CartContext';

const Header = () => {
  const { isAuthenticated, user, logout } = useAuth();
  const { cartItems } = useCart();

  const getFirstName = () => {
    if (!user?.name || typeof user.name !== 'string') return 'Profile';
    const firstName = user.name.split(' ')[0];
    return firstName.charAt(0).toUpperCase() + firstName.slice(1);
  };

  return (
    <header className="bg-white shadow-md sticky top-0 z-50">
      <div className="container mx-auto px-4 py-4 flex justify-between items-center">
        <Link to="/" className="text-2xl font-bold text-gray-800">Shopcart</Link>

        <nav className="hidden md:flex items-center space-x-6">
          <Link to="/products" className="text-gray-600 hover:text-gray-800">Categories</Link>
        </nav>

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

          <Link to="/cart" className="relative text-gray-600 hover:text-gray-800">
            Cart
            {cartItems.length > 0 && (
              <span className="absolute -top-2 -right-4 bg-green-600 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
                {cartItems.reduce((acc, item) => acc + item.qty, 0)}
              </span>
            )}
          </Link>
        </div>
      </div>
    </header>
  );
};

export default Header;