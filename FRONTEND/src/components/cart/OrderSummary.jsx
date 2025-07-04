import React from 'react';
import { useCart } from '../../contexts/CartContext';
import Input from '../common/Input';
import Button from '../common/Button';

const OrderSummary = ({ children }) => {
    const { cartItems } = useCart();
    const subtotal = cartItems.reduce((acc, item) => acc + item.qty * item.price, 0);
    const shipping = 0; // Assuming free shipping for now
    const total = subtotal + shipping;

    return (
        <div className="bg-white p-6 rounded-lg shadow-md">
            <h2 className="text-2xl font-bold mb-4">Order Summary</h2>
            
            <div className="flex mb-4">
                <Input name="coupon" placeholder="Enter Coupon Code" className="rounded-r-none" />
                <Button className="rounded-l-none">Apply Coupon</Button>
            </div>

            <div className="space-y-2 text-gray-700">
                <div className="flex justify-between">
                    <span>Subtotal</span>
                    <span>${subtotal.toFixed(2)}</span>
                </div>
                 <div className="flex justify-between">
                    <span>Discount</span>
                    <span className="text-green-600">-$0.00</span>
                </div>
                <div className="flex justify-between">
                    <span>Shipping</span>
                    <span>${shipping.toFixed(2)}</span>
                </div>
            </div>

            <div className="flex justify-between font-bold text-xl border-t mt-4 pt-4">
                <span>Total</span>
                <span>${total.toFixed(2)}</span>
            </div>

            {/* Any additional content, like payment form, can be passed as children */}
            {children}
        </div>
    );
};

export default OrderSummary;