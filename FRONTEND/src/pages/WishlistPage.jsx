import React, { useEffect, useState } from 'react';
import api from '../services/api';
import ProductCard from '../components/products/ProductCard';

const WishlistPage = () => {
  const [wishlistProducts, setWishlistProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchWishlist = async () => {
      try {
        const profileRes = await api.get('/users/me');
        if (profileRes.data.success) {
          const wishlistIds = profileRes.data.response.wishlist;
          const productPromises = wishlistIds.map((id) =>
            api.get(`/products/${id}`)
          );
          const productResults = await Promise.all(productPromises);
          const products = productResults.map((res) => res.data.response);
          setWishlistProducts(products);
        }
      } catch (err) {
        console.error('Failed to fetch wishlist:', err);
        setError('Failed to fetch wishlist. Please try again.');
      } finally {
        setLoading(false);
      }
    };

    fetchWishlist();
  }, []);

  if (loading) {
    return <p className="text-center text-lg text-gray-600">Loading products...</p>;
  }

  if (error) {
    return <p className="text-center text-red-500 text-lg">{error}</p>;
  }

  if (!wishlistProducts || wishlistProducts.length === 0) {
    return <p className="text-center text-gray-500 text-lg">You have no items in your wishlist.</p>;
  }

  return (
    <div className="px-4 sm:px-6 lg:px-10">
      <h1 className="text-3xl font-bold mb-6">My Wishlist</h1>
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-x-1 gap-y-1">
        {wishlistProducts.map((product) => (
          <ProductCard key={product._id} product={product} />
        ))}
      </div>
    </div>
  );
};

export default WishlistPage;