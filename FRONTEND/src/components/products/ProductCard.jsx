import React from 'react';
import { Link } from 'react-router-dom';
import { useCart } from '../../contexts/CartContext';
import Button from '../common/Button';

const ProductCard = ({ product }) => {
  const { addToCart } = useCart();

  return (
    <div className="bg-white border rounded-lg shadow-md overflow-hidden flex flex-col">
      <Link to={`/products/${product._id}`} className="block">
        <img src={product.imageUrl || 'https://via.placeholder.com/400'} alt={product.name} className="w-full h-64 object-cover" />
      </Link>
      <div className="p-4 flex flex-col flex-grow">
        <h3 className="text-lg font-semibold text-gray-800 flex-grow">{product.name}</h3>
        <p className="text-gray-600 mt-2">${product.price}</p>
        <div className="mt-4">
            <Button onClick={() => addToCart(product)} className="w-full">Add to Cart</Button>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;