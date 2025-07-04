// src/components/common/Header.jsx
import React, { useState, useEffect } from 'react'; // <--- Added useEffect
import { Link } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';
import { useCart } from '../../contexts/CartContext';
import Button from './Button';
import Sidebar from './Sidebar';
import SearchBar from './SearchBar';
import { useTranslation } from 'react-i18next';

const Header = () => {
  const { isAuthenticated, user, logout } = useAuth();
  const { cartItems } = useCart();

  // State for Sidebar
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  // States for Dynamic Delivery Location
  const [deliveryLocation, setDeliveryLocation] = useState('Jabalpur 482001'); // Default location
  const [isLocationModalOpen, setIsLocationModalOpen] = useState(false);
  const [newPinCode, setNewPinCode] = useState('');
  // New states for loading and error feedback
  const [locationLoading, setLocationLoading] = useState(false); // Added loading state
  const [locationError, setLocationError] = useState('');     // Added error state

  // Calculate total items in cart
  const cartItemCount = cartItems.reduce((count, item) => count + item.qty, 0);

  // Get user's first name for "Hello, [Name]"
  const getFirstName = () => {
    if (!user?.name || typeof user.name !== 'string') return 'Sign in';
    const firstName = user.name.split(' ')[0];
    return firstName.charAt(0).toUpperCase() + firstName.slice(1);
  };

  // ✅ 1. Handle PIN Code Submission
  const handleUpdateLocation = async () => {
    const pin = newPinCode.trim();
    setLocationError(''); // Clear previous errors
    setLocationLoading(true); // Start loading

    if (!/^\d{6}$/.test(pin)) {
      setLocationError('Please enter a valid 6-digit PIN code.');
      setLocationLoading(false); // End loading on validation error
      return;
    }

    try {
      const response = await fetch(`https://api.postalpincode.in/pincode/${pin}`);
      const data = await response.json();

      if (data[0].Status === "Success" && data[0].PostOffice.length > 0) {
        const postOffice = data[0].PostOffice[0]; // Take the first post office
        const city = postOffice.District;
        const state = postOffice.State;
        const location = `${city}, ${state} - ${pin}`;
        setDeliveryLocation(location);
        localStorage.setItem('deliveryLocation', location);
        setIsLocationModalOpen(false); // Close modal on success
        setNewPinCode(''); // Clear input
      } else {
        setLocationError('Could not find address for the entered PIN code. Please try another.');
      }
    } catch (err) {
      console.error('Error fetching address from PIN code:', err);
      setLocationError('Failed to connect to location service. Please check your internet or try again later.');
    } finally {
      setLocationLoading(false); // End loading regardless of success/failure
    }
  };

  // ✅ 2. IP-Based Auto-Detection on Load
  const fetchLocationFromIP = async () => {
    try {
      // Using ipapi.co for IP-based geolocation. Has free tier limits.
      const res = await fetch('https://ipapi.co/json/');
      const data = await res.json();

      if (res.ok && data.city && data.region && data.postal) {
        const city = data.city;
        const state = data.region;
        const postal = data.postal;
        const location = `${city}, ${state} - ${postal}`;
        setDeliveryLocation(location);
        localStorage.setItem('deliveryLocation', location);
      } else {
        // Fallback or handle cases where IP detection isn't precise enough
        console.warn('IP location detection failed or incomplete data:', data);
        setDeliveryLocation('India - Select Location'); // More generic fallback
      }
    } catch (err) {
      console.error('IP location error:', err);
      setDeliveryLocation('India - Select Location'); // Fallback on network error
    }
  };

  // ✅ 3. Load saved location from localStorage or detect via IP on component mount
  useEffect(() => {
    const saved = localStorage.getItem('deliveryLocation');
    if (saved) {
      setDeliveryLocation(saved);
    } else {
      fetchLocationFromIP();
    }
  }, []); // Empty dependency array means this runs once on mount

  return (
    <>
      <header className="sticky top-0 z-40">
        {/* Top Header Bar - Dark Green (from Shopcart image) */}
        <div className="bg-green-800 text-white text-sm py-2 px-4 flex justify-between items-center">
          <div className="flex items-center space-x-4">
            <span className="flex items-center">
              <i className="fas fa-phone-alt mr-2"></i>
              +001234567890
            </span>
            <span>Get 50% Off on Selected Items | <Link to="/categories" className="underline">Shop Now</Link></span>
          </div>
          {/* Language selector like Shopcart, not Amazon flag */}
          <div className="relative group flex items-center space-x-4">
            <span className="cursor-pointer flex items-center">
              Eng <i className="fas fa-chevron-down ml-1"></i>
            </span>
            {/* Location dropdown (from previous Shopcart design) */}
            <span className="cursor-pointer flex items-center"
                  onClick={() => {
                    setIsLocationModalOpen(true);
                    setNewPinCode(''); // Clear previous input on opening
                    setLocationError(''); // Clear previous error on opening
                  }}>
              Location <i className="fas fa-chevron-down ml-1"></i>
            </span>
          </div>
        </div>

        {/* Main Header Bar - Light Cream/White (from Shopcart image) */}
        <div className="bg-white shadow-md py-3 px-4 flex justify-between items-center">
          {/* Shopcart Logo - Updated to image + text */}
          <Link to="/" className="flex items-center mr-2">
            <img src="https://img.icons8.com/plasticine/100/shopping-cart--v2.png" alt="Shopcart Logo" className="h-8 mr-2" />
            <span className="text-2xl font-bold text-gray-800">Shopcart</span>
          </Link>

          {/* Delivery Location - Amazon Style but with Shopcart colors */}
          <div className="flex items-end text-xs text-gray-700 mr-2 cursor-pointer hover:text-gray-900 border border-transparent hover:border-gray-300 p-1 rounded-sm transition-all duration-100"
               onClick={() => {
                setIsLocationModalOpen(true);
                setNewPinCode(''); // Clear previous input on opening
                setLocationError(''); // Clear previous error on opening
               }}>
            <i className="fas fa-map-marker-alt mr-1 text-base"></i>
            <div>
              <p className="text-gray-500">Delivering to</p>
              <p className="font-bold whitespace-nowrap">{deliveryLocation}</p>
            </div>
          </div>

                    {/* Search Bar */}
          <div className="flex-1 mx-4">
            <SearchBar />
          </div>

          {/* Account & Lists / Sign In / Register (Shopcart style icons, Amazon logic) */}
          <div className="flex items-center space-x-6 text-gray-700">
            {isAuthenticated ? (
              <div className="relative group flex flex-col cursor-pointer hover:text-gray-900 border border-transparent hover:border-gray-300 p-1 rounded-sm transition-all duration-100">
                <span className="text-xs text-gray-500">Hello, {getFirstName()}</span>
                <Link to="/profile" className="font-bold whitespace-nowrap flex items-center">
                  Account & Lists <i className="fas fa-caret-down ml-1 text-xs"></i>
                </Link>
                {/* Profile Dropdown with Logout */}
                <div className="absolute hidden group-hover:block bg-white shadow-lg rounded-md mt-2 py-2 w-32 right-0 top-full text-gray-800 z-10">
                  <Link to="/profile" className="block px-4 py-2 hover:bg-gray-100">My Profile</Link>
                  <button onClick={logout} className="block w-full text-left px-4 py-2 hover:bg-gray-100 text-red-600">Logout</button>
                </div>
              </div>
            ) : (
              <div className="flex flex-col cursor-pointer hover:text-gray-900 border border-transparent hover:border-gray-300 p-1 rounded-sm transition-all duration-100">
                 <span className="text-xs text-gray-500">Hello, Sign in</span>
                <Link to="/login" className="font-bold whitespace-nowrap flex items-center">
                  Account & Lists <i className="fas fa-caret-down ml-1 text-xs"></i>
                </Link>
              </div>
            )}

            {/* Returns & Orders (Amazon feature, keeping its name) */}
            <Link to="/orders" className="flex flex-col text-xs text-gray-700 cursor-pointer hover:text-gray-900 border border-transparent hover:border-gray-300 p-1 rounded-sm transition-all duration-100">
              <span className="text-gray-500">Returns</span>
              <span className="font-bold whitespace-nowrap">& Orders</span>
            </Link>

            {/* Cart Icon (Shopcart green badge) */}
            <Link to="/cart" className="relative flex items-center text-gray-700 hover:text-gray-900 cursor-pointer border border-transparent hover:border-gray-300 p-1 rounded-sm transition-all duration-100">
              <i className="fas fa-shopping-cart text-2xl mr-2"></i>
              <span className="font-bold mt-3 whitespace-nowrap">Cart</span>
              {cartItemCount > 0 && (
                <span className="absolute -top-1 left-4 bg-green-600 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                  {cartItemCount}
                </span>
              )}
            </Link>
          </div>
        </div>

        {/* Bottom Header (Secondary Navigation) - Dark Green from Shopcart Top bar */}
        <div className="bg-green-800 text-white flex items-center p-2 text-sm space-x-3 overflow-x-auto scrollbar-hide">
          <button
            className="flex items-center font-bold hover:border hover:border-white p-1 rounded-sm border border-transparent transition-all duration-100"
            onClick={() => setIsSidebarOpen(true)} // Open sidebar
          >
            <i className="fas fa-bars mr-1"></i>
            All
          </button>
          {/* Shopcart-specific links as per screenshot, but combined with Amazon feature links if desired */}
          <Link to="/deals" className="hover:border hover:border-white p-1 rounded-sm border border-transparent transition-all duration-100 whitespace-nowrap">Deals</Link>
          <Link to="/whats-new" className="hover:border hover:border-white p-1 rounded-sm border border-transparent transition-all duration-100 whitespace-nowrap">What's New</Link>
          <Link to="/delivery" className="hover:border hover:border-white p-1 rounded-sm border border-transparent transition-all duration-100 whitespace-nowrap">Delivery</Link>
          {/* Keep Amazon-like popular links if needed, or remove if only Shopcart specific are desired */}
          <Link to="/todays-deals" className="hover:border hover:border-white p-1 rounded-sm border border-transparent transition-all duration-100 whitespace-nowrap">Today's Deals</Link>
          <Link to="/customer-service" className="hover:border hover:border-white p-1 rounded-sm border border-transparent transition-all duration-100 whitespace-nowrap">Customer Service</Link>
          {/* Example of categories */}
          <Link to="/mobiles" className="hover:border hover:border-white p-1 rounded-sm border border-transparent transition-all duration-100 whitespace-nowrap">Mobiles</Link>
          <Link to="/electronics" className="hover:border hover:border-white p-1 rounded-sm border border-transparent transition-all duration-100 whitespace-nowrap">Electronics</Link>
        </div>
      </header>

      {/* Location Update Modal */}
      {isLocationModalOpen && (
        <div
          className="fixed inset-0 flex items-center justify-center z-50"
          style={{
            backgroundColor: 'rgba(0, 0, 0, 0.4)', // Semi-transparent black background
            backdropFilter: 'blur(4px)', // Apply blur effect
            WebkitBackdropFilter: 'blur(4px)' // For Safari support
          }}
          onClick={() => { // Allow clicking outside to close
            setIsLocationModalOpen(false);
            setNewPinCode('');
            setLocationError(''); // Clear error on close
          }}
        >
          <div className="bg-white p-6 rounded-lg shadow-xl w-80" onClick={(e) => e.stopPropagation()}> {/* Prevent modal closing on click inside */}
            <h3 className="text-lg font-semibold mb-4 text-gray-800">Update Delivery Location</h3>
            <input
              type="text"
              className={`border p-2 rounded w-full mb-2 focus:ring-green-600 focus:border-green-600 text-gray-900 ${locationError ? 'border-red-500' : 'border-gray-300'}`}
              placeholder="Enter new PIN code (e.g., 482001)"
              value={newPinCode}
              onChange={(e) => {
                setNewPinCode(e.target.value);
                setLocationError(''); // Clear error when user types
              }}
              disabled={locationLoading} // Disable input while loading
            />
            {locationLoading && <p className="text-sm text-gray-600 mb-2">Detecting location...</p>}
            {locationError && <p className="text-red-500 text-sm mb-2">{locationError}</p>}
            <div className="flex justify-end space-x-2 mt-4">
              <Button
                onClick={() => {
                  setIsLocationModalOpen(false);
                  setNewPinCode('');
                  setLocationError(''); // Clear error on cancel
                }}
                className="bg-gray-200 text-gray-800 px-4 py-2 rounded hover:bg-gray-300"
                disabled={locationLoading} // Disable button while loading
              >
                Cancel
              </Button>
              <Button
                onClick={handleUpdateLocation}
                className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700 disabled:opacity-50"
                disabled={locationLoading} // Disable button while loading
              >
                {locationLoading ? 'Updating...' : 'Update'}
              </Button>
            </div>
          </div>
        </div>
      )}

      {/* Sidebar Component */}
      <Sidebar isOpen={isSidebarOpen} onClose={() => setIsSidebarOpen(false)} />
    </>
  );
};

export default Header;