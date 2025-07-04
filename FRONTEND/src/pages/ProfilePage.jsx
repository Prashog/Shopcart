import React, { useEffect, useState } from 'react';
import { useAuth } from '../contexts/AuthContext';
import Button from '../components/common/Button';
import { useNavigate, Link } from 'react-router-dom';
import api from '../services/api';

const ProfilePage = () => {
  const { user, logout, loading } = useAuth();
  const navigate = useNavigate();
  const [orders, setOrders] = useState([]);
  const [wishlistProducts, setWishlistProducts] = useState([]);

  useEffect(() => {
    const fetchOrdersAndWishlist = async () => {
      try {
        const [orderRes, profileRes] = await Promise.all([
          api.get('/orders'),
          api.get('/users/me'),
        ]);

        if (orderRes.data.success) {
          setOrders(orderRes.data.response);
        }

        if (profileRes.data.success) {
          const wishlistIds = profileRes.data.response.wishlist;
          const productPromises = wishlistIds.map(id =>
            api.get(`/products/${id}`)
          );
          const productResults = await Promise.all(productPromises);
          const products = productResults.map(res => res.data.response);
          setWishlistProducts(products);
        }
      } catch (error) {
        console.error('Error fetching profile data:', error);
      }
    };

    if (user) fetchOrdersAndWishlist();
  }, [user]);

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  if (loading) return <p>Loading profile...</p>;
  if (!user) return <p>Could not load user profile.</p>;

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6">My Profile</h1>

      {/* Profile Info */}
      <div className="bg-white p-6 rounded-lg shadow-md mb-10">
        <p className="mb-2"><strong>Name:</strong> {user.name}</p>
        <p className="mb-4"><strong>Email:</strong> {user.email}</p>
        <div className="flex gap-4 mt-4">
          <Button onClick={() => navigate('/change-password')}>
            Change Password
          </Button>
        </div>
      </div>

      {/* Wishlist Section */}
      <div className="mt-10">
        <h2 className="text-2xl font-bold mb-4">Wishlist</h2>
        {wishlistProducts.length === 0 ? (
          <p>You have no items in your wishlist.</p>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {wishlistProducts.map((product) => (
              <div key={product._id} className="border p-4 rounded shadow">
                <img
                  src={`http://localhost:8080/uploads/${product.images[0]}`}
                  alt={product.name}
                  className="h-40 w-full object-cover mb-2 rounded"
                />
                <h3 className="font-semibold">{product.name}</h3>
                <p className="text-sm text-gray-600">{product.brand}</p>
                <p className="text-green-600 font-semibold">₹{product.price}</p>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Orders Section */}
      <div className="mt-10">
        <h2 className="text-2xl font-bold mb-4">My Orders</h2>
        {orders.length === 0 ? (
          <p>You have no past orders.</p>
        ) : (
          <div className="space-y-6">
            {orders.map((order) => (
              <Link
                to={`/orders/${order._id}`}
                key={order._id}
                className="block border p-4 rounded hover:shadow-lg transition"
              >
                <div className="flex justify-between">
                  <div>
                    <p className="font-medium">Order ID: {order._id}</p>
                    <p className="text-sm text-gray-600">Status: {order.orderStatus}</p>
                    <p className="text-sm text-gray-600">
                      Total: ₹{order.totalPrice} | Items: {order.orderItems.length}
                    </p>
                  </div>
                  <div className="text-right">
                    <p className="text-sm">{new Date(order.createdAt).toLocaleDateString()}</p>
                    <p className="text-xs text-gray-500">{order.paymentMethod}</p>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        )}
      </div>

      {/* Logout Button at the Bottom */}
      <div className="text-center mt-12">
        <button
          onClick={handleLogout}
          className="text-red-600 hover:underline font-semibold"
        >
          Logout
        </button>
      </div>
    </div>
  );
};

export default ProfilePage;