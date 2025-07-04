import React from 'react';
import { useCart } from '../../contexts/CartContext';

const CartItem = ({ item, isReview = false }) => {
    const { updateQuantity, removeFromCart } = useCart();

    return (
        <div className="flex items-center justify-between bg-white p-4 rounded-lg shadow-sm mb-4">
            <div className="flex items-center">
                <img src={item.imageUrl || 'https://via.placeholder.com/100'} alt={item.name} className="w-20 h-20 object-cover rounded"/>
                <div className="flex-grow px-4">
                    <h2 className="font-bold text-lg">{item.name}</h2>
                    <p className="text-gray-500">Color: Pink</p> {/* Example static color */}
                    {!isReview && <p className="font-semibold">${item.price}</p>}
                </div>
            </div>

            {isReview ? (
                 <div className="text-right">
                    <p className="font-bold text-lg">${(item.price * item.qty).toFixed(2)}</p>
                    <p className="text-gray-500">Quantity: {item.qty}</p>
                 </div>
            ) : (
                <div className="flex items-center space-x-4">
                    <input 
                        type="number" 
                        value={item.qty} 
                        onChange={(e) => updateQuantity(item.id, parseInt(e.target.value))} 
                        className="w-16 text-center border rounded-md py-1"
                        min="1"
                    />
                    <button onClick={() => removeFromCart(item.id)} className="text-red-500 hover:text-red-700 font-semibold">
                        Remove
                    </button>
                </div>
            )}
        </div>
    );
};

export default CartItem;