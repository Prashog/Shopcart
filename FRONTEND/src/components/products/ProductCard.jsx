import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useCart } from '../../contexts/CartContext';
import { AiFillStar, AiOutlineStar } from 'react-icons/ai';
import { FaStarHalfAlt } from 'react-icons/fa';
import Button from '../common/Button';

const ProductCard = ({ product }) => {
  const { addToCart } = useCart();
  const navigate = useNavigate();

  const handleCardClick = () => {
    navigate(`/products/${product._id}`);
  };

  const handleButtonClick = (e) => {
    e.stopPropagation();
    addToCart({
      id: product._id,
      name: product.name,
      price: product.price,
      qty: 1,
      stock: product.stock,
      imageUrl: product.images?.[0] || 'https://via.placeholder.com/400',
    });
  };

  const mainImage = product.images?.[0] || 'https://via.placeholder.com/400';
  const rating = parseFloat(product.rating || 5);
  const fullStars = Math.floor(rating);
  const hasHalfStar = rating % 1 >= 0.3 && rating % 1 < 0.8;

  return (
    <div
      className="relative m-2 w-full max-w-[220px] h-[340px] flex flex-col overflow-hidden rounded-lg border border-gray-200 bg-white shadow-sm hover:shadow-md transition cursor-pointer"
      onClick={handleCardClick}
    >
      {/* Image */}
      <div className="relative mx-2 mt-2 flex h-40 overflow-hidden rounded-lg">
        <img src={mainImage} alt={product.name} className="w-full h-full object-cover" />
        {product.discountPercentage && (
          <span className="absolute top-0 left-0 m-2 rounded-full bg-black px-2 text-xs font-medium text-white">
            {product.discountPercentage}% OFF
          </span>
        )}
      </div>

      {/* Product Info */}
      <div className="mt-3 px-3 pb-4 flex flex-col flex-1 overflow-hidden">
        <h5 className="text-base font-semibold text-slate-900 line-clamp-2 leading-snug">{product.name}</h5>

        <div className="mt-2 mb-2 flex items-center justify-between">
          <p>
            <span className="text-lg font-bold text-slate-900">₹{product.price}</span>
            {product.originalPrice && product.originalPrice > product.price && (
              <span className="text-xs text-slate-500 line-through ml-1">₹{product.originalPrice}</span>
            )}
          </p>

          {/* Star Rating */}
          <div className="flex items-center">
            {[...Array(fullStars)].map((_, index) => (
              <AiFillStar key={index} className="h-4 w-4 text-black" />
            ))}
            {hasHalfStar && <FaStarHalfAlt className="h-4 w-4 text-black" />}
            {[...Array(5 - fullStars - (hasHalfStar ? 1 : 0))].map((_, index) => (
              <AiOutlineStar key={index} className="h-4 w-4 text-black" />
            ))}
          </div>
        </div>

        <Button onClick={handleButtonClick} className="w-full hover:bg-gray-300 hover:text-black text-sm py-2 mt-auto">
          Add to Cart
        </Button>
      </div>
    </div>
  );
};

export default ProductCard;