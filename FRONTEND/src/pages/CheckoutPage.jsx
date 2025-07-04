import React from 'react';
import { useCart } from '../contexts/CartContext';
import { useAuth } from '../contexts/AuthContext';
import Input from '../components/common/Input';
import Button from '../components/common/Button';
import OrderSummary from '../components/cart/OrderSummary';
import CartItem from '../components/cart/CartItem';

const CheckoutPage = () => {
  const { user } = useAuth();
  const { cartItems } = useCart();

  if (cartItems.length === 0) {
      return (
          <div className="container mx-auto text-center py-20">
              <h1 className="text-2xl">Your cart is empty. Cannot proceed to checkout.</h1>
          </div>
      )
  }

  const firstItem = cartItems[0]; // Example: showing one item as in the UI

  return (
    <div className="bg-gray-50 min-h-screen">
      <div className="container mx-auto px-4 py-12">
        <div className="grid lg:grid-cols-5 gap-12">

          {/* Left Side: Shipping and Review */}
          <div className="lg:col-span-3">
            <h1 className="text-2xl font-bold mb-6">Review Item And Shipping</h1>
            
            {/* Item Review - showing first item as per image */}
            <div className="bg-white p-4 rounded-lg shadow-md mb-8">
                 <CartItem item={firstItem} isReview={true} />
            </div>

            <div className="bg-white p-6 rounded-lg shadow-md">
                <div className="flex justify-between items-center mb-4">
                     <h2 className="text-xl font-bold">Delivery Information</h2>
                     <button className="text-sm text-blue-600 font-semibold">Edit</button>
                </div>
                {user ? (
                    <div>
                        <p className="font-semibold">{user.name}</p>
                        <p className="text-gray-600">4140 Parker Rd. Allentown, New Mexico 31134</p>
                        <p className="text-gray-600">+447700960054</p>
                        <p className="text-gray-600">{user.email}</p>
                    </div>
                ) : (
                    <p>Please log in to see your address.</p>
                )}
            </div>
          </div>

          {/* Right Side: Order Summary and Payment */}
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
                        <Button className="w-full mt-6">Pay Now</Button>
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