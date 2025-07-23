import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useCart } from '../../contexts/CartContext';
import Button from '../common/Button';

const ProductCard = ({ product }) => {
  const { addToCart } = useCart();
  const navigate = useNavigate();

  const handleCardClick = () => {
    navigate(`/products/${product._id}`);
  };

  const handleButtonClick = (e) => {
    e.stopPropagation(); // Prevent navigation
    addToCart(product);
  };

  const mainImage = product.images?.[0] || 'https://via.placeholder.com/400';

  return (
    <div
      className="bg-white rounded-lg shadow-md overflow-hidden flex flex-col cursor-pointer hover:shadow-lg transition"
      onClick={handleCardClick}
    >
      <img
        src={mainImage}
        alt={product.name}
        className="w-full h-64 object-cover"
      />

      <div className="p-4 flex flex-col flex-grow">
        <h3 className="text-lg font-semibold text-gray-800 flex-grow">{product.name}</h3>
        <p className="text-gray-600 mt-2">₹{product.price}</p>
        <div className="mt-4">
          <Button onClick={handleButtonClick} className="w-full">
            Add to Cart
          </Button>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;