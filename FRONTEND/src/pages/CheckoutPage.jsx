import React, { useEffect, useState } from 'react';
import { useCart } from '../contexts/CartContext';
import { useAuth } from '../contexts/AuthContext';
import Input from '../components/common/Input';
import Button from '../components/common/Button';
import OrderSummary from '../components/cart/OrderSummary';
import CartItem from '../components/cart/CartItem';
import { getPrimaryAddress, getAddresses } from '../services/api';
import { useNavigate } from 'react-router-dom';

const CheckoutPage = () => {
  const { user } = useAuth();
  const { cartItems } = useCart();
  const [primaryAddress, setPrimaryAddress] = useState(null);
  const [allAddresses, setAllAddresses] = useState([]);
  const [selectedAddress, setSelectedAddress] = useState(null);
  const [showAddressList, setShowAddressList] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchAddresses = async () => {
      try {
        const primaryRes = await getPrimaryAddress();
        const listRes = await getAddresses();
        if (primaryRes.data.success) {
          setPrimaryAddress(primaryRes.data.response);
          setSelectedAddress(primaryRes.data.response); // default selection
        }
        if (listRes.data.success) {
          setAllAddresses(listRes.data.response);
        }
      } catch (err) {
        console.error('Error fetching addresses:', err);
      }
    };

    fetchAddresses();
  }, []);

  if (cartItems.length === 0) {
    return (
      <div className="container mx-auto text-center py-20">
        <h1 className="text-2xl">Your cart is empty. Cannot proceed to checkout.</h1>
      </div>
    );
  }

  const firstItem = cartItems[0];

  return (
    <div className="bg-gray-50 min-h-screen">
      <div className="container mx-auto px-4 py-12">
        <div className="grid lg:grid-cols-5 gap-12">

          {/* Left Side */}
          <div className="lg:col-span-3">
            <h1 className="text-2xl font-bold mb-6">Review Item And Shipping</h1>

            {/* Cart Item Review */}
            <div className="bg-white p-4 rounded-lg shadow-md mb-8">
              <CartItem item={firstItem} isReview={true} />
            </div>

            {/* Delivery Info */}
            <div className="bg-white p-6 rounded-lg shadow-md">
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-xl font-bold">Delivery Information</h2>
                <div className="flex gap-4">
                  <Button
                    variant="secondary"
                    onClick={() => setShowAddressList(!showAddressList)}
                  >
                    {showAddressList ? 'Hide Addresses' : 'Select Address'}
                  </Button>
                  <Button
                    className='hover:bg-gray-300 hover:text-black'
                    variant="primary"
                    onClick={() =>
                      navigate('/add-address', { state: { returnTo: '/checkout' } })
                    }
                  >
                    Add Address
                  </Button>
                </div>
              </div>

              {user && selectedAddress ? (
                <div>
                  <p className="font-semibold">{user.name}</p>
                  <p className="text-gray-600">
                    {selectedAddress.address}
                    {selectedAddress.landmark ? `, ${selectedAddress.landmark}` : ''}
                  </p>
                  <p className="text-gray-600">
                    {selectedAddress.city}, {selectedAddress.state} - {selectedAddress.postalCode}
                  </p>
                  <p className="text-gray-600">{selectedAddress.country}</p>
                  <p className="text-gray-600">{user.email}</p>
                </div>
              ) : (
                <p>No address selected. Please add one.</p>
              )}

              {showAddressList && allAddresses.length > 0 && (
                <div className="mt-6 space-y-4">
                  {allAddresses.map((addr) => (
                    <label
                      key={addr._id}
                      className={`block p-4 border rounded cursor-pointer ${
                        selectedAddress?._id === addr._id
                          ? 'border-black bg-gray-100'
                          : 'border-gray-300'
                      }`}
                    >
                      <input
                        type="radio"
                        name="selectedAddress"
                        value={addr._id}
                        checked={selectedAddress?._id === addr._id}
                        onChange={() => setSelectedAddress(addr)}
                        className="mr-2"
                      />
                      {addr.address}, {addr.landmark && `${addr.landmark}, `}
                      {addr.city}, {addr.state} - {addr.postalCode}, {addr.country}
                      {addr.isDefault && (
                        <span className="ml-2 px-2 py-0.5 text-xs bg-black text-white rounded">
                          Default
                        </span>
                      )}
                    </label>
                  ))}
                </div>
              )}
            </div>
          </div>

          {/* Right Side */}
          <div className="lg:col-span-2">
            <OrderSummary>
              <div className="mt-6">
                <h3 className="text-xl font-bold mb-4">Payment Details</h3>
                <form>
                  <div className="space-y-4">
                    <Input name="email" type="email" placeholder="Email" />
                    <Input name="cardHolder" placeholder="Card Holder Name" />
                    <Input name="cardNumber" placeholder="0000 **** **** 1245" />
                    <div className="flex space-x-4">
                      <Input name="expiry" placeholder="MM/YY" />
                      <Input name="cvc" placeholder="CVC" />
                    </div>
                  </div>
                  <Button className="w-full mt-6 hover:bg-gray-300 hover:text-black" type="submit">
                    Pay Now
                  </Button>
                </form>
              </div>
            </OrderSummary>
          </div>

        </div>
      </div>
    </div>
  );
};

export default CheckoutPage;