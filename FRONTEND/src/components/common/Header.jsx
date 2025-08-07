import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useCategories } from '../../contexts/CategoryContext';
import { useWishlist } from '../../contexts/WishlistContext';
import { useCart } from '../../contexts/CartContext';
import { AiOutlineHeart, AiOutlineUser, AiOutlineShoppingCart } from 'react-icons/ai';

const Header = () => {
  const { categories } = useCategories();
  const { wishlist } = useWishlist();
  const { cartItems } = useCart();

  return (
    <header className="w-full z-50 relative">
      {/* Top bar */}
      <div className="bg-white py-2 px-6 flex items-center justify-between gap-6">
        {/* Left - Shop name */}
        <div className="text-2xl font-bold text-gray-800 whitespace-nowrap">
          <Link to="/">UrbanBasket</Link>
        </div>

        {/* Center - Search bar */}
        <div className="flex-1 flex justify-center px-4">
          <div className="relative w-full max-w-xl">
            <input
              type="text"
              placeholder="Search for products..."
              className="w-full px-4 py-2 border border-gray-300 rounded-full focus:outline-none focus:ring-2 focus:ring-black"
            />
          </div>
        </div>

        {/* Right - Icons */}
        <div className="flex items-center gap-6 text-xl whitespace-nowrap">
          <Link to="/profile">
            <AiOutlineUser className="hover:text-black" />
          </Link>

          <Link to="/wishlist" className="relative">
            <AiOutlineHeart className="hover:text-black" />
            {wishlist.length > 0 && (
              <span className="absolute -top-2 -right-2 bg-black text-white text-xs w-5 h-5 rounded-full flex items-center justify-center">
                {wishlist.length}
              </span>
            )}
          </Link>

          <Link to="/cart" className="relative">
            <AiOutlineShoppingCart className="hover:text-black" />
            {cartItems.length > 0 && (
              <span className="absolute -top-2 -right-2 bg-black text-white text-xs w-5 h-5 rounded-full flex items-center justify-center">
                {cartItems.length}
              </span>
            )}
          </Link>
        </div>
      </div>
    </header>
  );
};

export default Header;