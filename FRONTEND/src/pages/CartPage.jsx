import React from 'react';
import { useCart } from '../contexts/CartContext';
import { Link } from 'react-router-dom';
import Button from '../components/common/Button';

const CartPage = () => {
  const { cartItems, removeFromCart, updateQuantity } = useCart();
  const subtotal = cartItems.reduce((acc, item) => acc + item.qty * item.price, 0);

  if (cartItems.length === 0) {
    return (
      <div className="container mx-auto px-4 py-8 text-center">
        <h1 className="text-3xl font-bold">Your Cart is Empty</h1>
        <Link to="/products">
          <Button className="mt-6 hover:bg-gray-300 hover:text-black">Continue Shopping</Button>
        </Link>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 pt-8 pb-4">
      <h1 className="text-3xl font-bold mb-6">Shopping Cart</h1>
      <div className="grid md:grid-cols-3 gap-6">
        <div className="md:col-span-2 space-y-4">
          {cartItems.map((item, index) => (
            <div
              key={item._id || item.id || index}
              className="bg-white p-4 rounded-lg shadow-sm flex items-center justify-between"
            >
              <img
                src={item.imageUrl}
                alt={item.name}
                className="w-20 h-20 object-cover rounded"
              />
              <div className="flex-grow px-4">
                <h2 className="font-semibold text-lg">{item.name}</h2>
                <p className="text-gray-700">₹{item.price}</p>
              </div>
              <input
                type="number"
                min={1}
                max={item.stock || 99}
                value={item.qty}
                onChange={(e) => {
                  const newQty = parseInt(e.target.value);
                  if (!isNaN(newQty)) {
                    const clampedQty = Math.max(1, Math.min(newQty, item.stock || 99));
                    updateQuantity(item.id, clampedQty);
                  }
                }}
                className="w-16 text-center border rounded"
              />
              <button
                onClick={() => removeFromCart(item.id)}
                className="text-red-500 hover:text-red-700 ml-4"
              >
                Remove
              </button>
            </div>
          ))}
        </div>

        <div className="bg-white p-6 rounded-lg shadow-sm h-fit">
          <h2 className="text-2xl font-semibold mb-4">Order Summary</h2>
          <div className="flex justify-between mb-2">
            <span>Subtotal</span>
            <span>₹{subtotal.toFixed(2)}</span>
          </div>
          <div className="flex justify-between mb-4">
            <span>Shipping</span>
            <span>Free</span>
          </div>
          <div className="flex justify-between font-bold text-xl border-t pt-4">
            <span>Total</span>
            <span>₹{subtotal.toFixed(2)}</span>
          </div>
          <Link to="/checkout">
            <Button className="w-full mt-6 hover:bg-gray-300 hover:text-black">Proceed to Checkout</Button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default CartPage;