import React, { createContext, useState, useEffect, useContext } from 'react';
import { getProducts } from '../services/api';
import { useLocation } from 'react-router-dom';

const ProductContext = createContext();

export const useProducts = () => useContext(ProductContext);

export const ProductProvider = ({ children }) => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const location = useLocation();

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        setLoading(true);
        const params = new URLSearchParams(location.search);
        const categoryId = params.get('category');

        const { data } = await getProducts(categoryId);

        if (data.success) {
          setProducts(data.response || []);
          setError(null);
        } else {
          setError('Failed to fetch products');
        }
      } catch (err) {
        console.error('Error fetching products:', err);
        setError('Failed to fetch products.');
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, [location.search]); // refetch when URL changes

  const value = { products, loading, error };

  return (
    <ProductContext.Provider value={value}>
      {children}
    </ProductContext.Provider>
  );
};