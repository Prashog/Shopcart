import React, { createContext, useContext, useEffect, useState } from 'react';
import { getWishlist } from '../services/api';

const WishlistContext = createContext();

export const useWishlist = () => useContext(WishlistContext);

export const WishlistProvider = ({ children }) => {
  const [wishlist, setWishlist] = useState([]);

  const fetchWishlist = async () => {
    try {
      const { data } = await getWishlist();
      setWishlist(data.response || []);
    } catch (err) {
      console.error('Failed to fetch wishlist', err);
    }
  };

  useEffect(() => {
    fetchWishlist();
  }, []);

  const value = { wishlist, refreshWishlist: fetchWishlist };

  return (
    <WishlistContext.Provider value={value}>
      {children}
    </WishlistContext.Provider>
  );
};