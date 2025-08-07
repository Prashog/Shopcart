import React, { useEffect, useState } from 'react';
import { useAuth } from '../contexts/AuthContext';
import Button from '../components/common/Button';
import { useNavigate, Link } from 'react-router-dom';
import api from '../services/api';
import ProductCard from '../components/products/ProductCard';
import { AiOutlineDelete } from 'react-icons/ai';

const ProfilePage = () => {
  const { user, logout, loading } = useAuth();
  const navigate = useNavigate();
  const [orders, setOrders] = useState([]);
  const [wishlistProducts, setWishlistProducts] = useState([]);
  const [addresses, setAddresses] = useState([]);
  const [selectedAddressId, setSelectedAddressId] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [orderRes, profileRes, addressRes] = await Promise.all([
          api.get('/orders'),
          api.get('/users/me'),
          api.get('/address'),
        ]);

        if (orderRes.data.success) {
          setOrders(orderRes.data.response);
        }

        if (profileRes.data.success) {
          const wishlistIds = profileRes.data.response.wishlist;
          const productPromises = wishlistIds.map((id) =>
            api.get(`/products/${id}`)
          );
          const productResults = await Promise.all(productPromises);
          const products = productResults.map((res) => res.data.response);
          setWishlistProducts(products);
        }

        if (addressRes.data.success) {
          setAddresses(addressRes.data.response);
          const defaultAddress = addressRes.data.response.find(
            (addr) => addr.isDefault
          );
          if (defaultAddress) setSelectedAddressId(defaultAddress._id);
        }
      } catch (error) {
        console.error('Error fetching profile data:', error);
      }
    };

    if (user) fetchData();
  }, [user]);

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  const handleAddressChange = async (id) => {
    const previousDefault = addresses.find(
      (addr) => addr._id === selectedAddressId
    );

    try {
      if (previousDefault && previousDefault._id !== id) {
        await api.put(`/address/${previousDefault._id}`, { isDefault: false });
      }
      await api.put(`/address/${id}`, { isDefault: true });
      setSelectedAddressId(id);
    } catch (err) {
      console.error('Failed to update default address:', err);
    }
  };

  const handleAddAddress = () => navigate('/add-address');

  const handleDeleteAddress = async (e, id) => {
    e.stopPropagation();

    if (id === selectedAddressId) {
      alert("You can't delete the default address.");
      return;
    }

    const confirmDelete = window.confirm(
      'Are you sure you want to delete this address?'
    );
    if (!confirmDelete) return;

    try {
      await api.delete(`/address/${id}`);
      const updated = addresses.filter((addr) => addr._id !== id);
      setAddresses(updated);
    } catch (err) {
      console.error('Failed to delete address:', err);
      alert('Could not delete the address. Try again.');
    }
  };

  if (loading) return <p>Loading profile...</p>;
  if (!user) return <p>Could not load user profile.</p>;

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6">My Profile</h1>

      {/* Profile Info */}
      <div className="bg-white p-6 rounded-lg shadow-md mb-10">
        <p className="mb-2">
          <strong>Name:</strong> {user.name}
        </p>
        <p className="mb-4">
          <strong>Email:</strong> {user.email}
        </p>

        {/* Address Section */}
        <div className="mt-6">
          <div className="flex items-center justify-between mb-2">
            <h3 className="text-lg font-semibold">My Addresses</h3>
            <Button onClick={handleAddAddress} className="bg-black text-white">
              Add Address
            </Button>
          </div>
          <div className="flex flex-wrap gap-3">
            {addresses.map((addr) => {
              const isSelected = selectedAddressId === addr._id;
              return (
                <div
                  key={addr._id}
                  className={`relative group cursor-pointer border px-4 py-3 rounded transition duration-200 flex items-center justify-between w-full md:w-auto
                    ${isSelected ? 'bg-black text-white' : 'bg-white text-black'}
                  `}
                >
                  <div
                    onClick={() => handleAddressChange(addr._id)}
                    className="flex-1"
                  >
                    {`${addr.address}, ${addr.city}, ${addr.state} - ${addr.postalCode}`}
                  </div>

                  {!isSelected && (
                    <button
                      onClick={(e) => handleDeleteAddress(e, addr._id)}
                      className="ml-3 text-red-600 hover:text-red-800"
                      title="Delete Address"
                    >
                      <AiOutlineDelete size={20} />
                    </button>
                  )}
                </div>
              );
            })}
          </div>
        </div>

        <div className="flex gap-4 mt-6">
          <Button onClick={() => navigate('/change-password')}>
            Change Password
          </Button>
        </div>
      </div>

      {/* Wishlist Section */}
      <div className="mt-10">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-2xl font-bold">Wishlist</h2>
          {wishlistProducts.length > 0 && (
            <Button
              onClick={() => navigate('/wishlist')}
              className="text-sm bg-black text-white"
            >
              See All
            </Button>
          )}
        </div>

        {wishlistProducts.length === 0 ? (
          <p>You have no items in your wishlist.</p>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
            {wishlistProducts.slice(0, 4).map((product) => (
              <ProductCard key={product._id} product={product} />
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
                    <p className="text-sm text-gray-600">
                      Status: {order.orderStatus}
                    </p>
                    <p className="text-sm text-gray-600">
                      Total: ₹{order.totalPrice} | Items:{' '}
                      {order.orderItems.length}
                    </p>
                  </div>
                  <div className="text-right">
                    <p className="text-sm">
                      {new Date(order.createdAt).toLocaleDateString()}
                    </p>
                    <p className="text-xs text-gray-500">
                      {order.paymentMethod}
                    </p>
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