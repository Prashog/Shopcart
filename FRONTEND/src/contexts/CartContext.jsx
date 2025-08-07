import React, { createContext, useState, useContext, useEffect } from 'react';

const CartContext = createContext();

export const useCart = () => useContext(CartContext);

export const CartProvider = ({ children }) => {
  const [cartItems, setCartItems] = useState(() => {
    const localData = localStorage.getItem('cartItems');
    return localData ? JSON.parse(localData) : [];
  });

  useEffect(() => {
    localStorage.setItem('cartItems', JSON.stringify(cartItems));
  }, [cartItems]);

  const addToCart = (newItem) => {
    setCartItems((prevItems) => {
      const existingItem = prevItems.find(item => item.id === newItem.id);

      if (existingItem) {
        // Increment quantity
        return prevItems.map(item =>
          item.id === newItem.id
            ? { ...item, qty: item.qty + 1 }
            : item
        );
      } else {
        // Add new item with qty defaulting to 1
        return [...prevItems, { ...newItem, qty: newItem.qty || 1 }];
      }
    });
  };

  const removeFromCart = (productId) => {
    setCartItems(prevItems => prevItems.filter(item => item.id !== productId));
  };

  const updateQuantity = (id, newQty) => {
    setCartItems(prevItems =>
      prevItems.map(item =>
        item.id === id ? { ...item, qty: newQty } : item
      )
    );
  };

  const clearCart = () => {
    setCartItems([]);
  };

  const value = { cartItems, addToCart, removeFromCart, updateQuantity, clearCart };

  return (
    <CartContext.Provider value={value}>
      {children}
    </CartContext.Provider>
  );
};