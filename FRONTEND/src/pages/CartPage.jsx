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
          <Button className="mt-6">Continue Shopping</Button>
        </Link>
      </div>
    );
  }

  console.log('Cart Items:', cartItems);

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8">Shopping Cart</h1>
      <div className="grid md:grid-cols-3 gap-8">
        <div className="md:col-span-2">
          {cartItems.map(item => (
            // CartItem component would go here
            <div key={item.id} className="flex items-center justify-between bg-white p-4 rounded-lg shadow mb-4">
              <img src={item.imageUrl} alt={item.name} className="w-20 h-20 object-cover rounded" />
              <div className="flex-grow px-4">
                <h2 className="font-semibold">{item.name}</h2>
                <p>₹{item.price}</p>
              </div>
              <input
                type="number"
                min={1}
                max={item.stock || 99} // fallback if stock is missing
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
              <button onClick={() => removeFromCart(item.id)} className="text-red-500 hover:text-red-700 ml-4">Remove</button>
            </div>
          ))}
        </div>
        <div className="bg-white p-6 rounded-lg shadow">
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
            <Button className="w-full mt-6">Proceed to Checkout</Button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default CartPage;