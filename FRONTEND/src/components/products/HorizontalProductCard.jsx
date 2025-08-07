import React from 'react';
import { AiFillStar, AiOutlineStar } from 'react-icons/ai';
import { FaStarHalfAlt } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';

const HorizontalProductCard = ({ product }) => {
  const navigate = useNavigate();
  const mainImage = product.images?.[0] || 'https://via.placeholder.com/150';
  const rating = parseFloat(product.rating || 0);
  const fullStars = Math.floor(rating);
  const hasHalfStar = rating % 1 >= 0.3 && rating % 1 < 0.8;

  const handleClick = () => {
    navigate(`/products/${product._id}`);
  };

  return (
    <div
      className="flex items-center p-4 bg-white rounded-xl shadow hover:shadow-md transition duration-300 w-full h-[140px] cursor-pointer"
      onClick={handleClick}
    >
      <img
        src={mainImage}
        alt={product.name}
        className="w-[80px] h-[80px] object-cover rounded-lg border border-gray-200 mr-4"
      />
      <div className="flex flex-col justify-between flex-1 h-full overflow-hidden">
        <h3 className="text-base font-semibold text-gray-800 truncate">{product.name}</h3>
        
        <div className="flex items-center text-sm mt-1">
          {[...Array(fullStars)].map((_, i) => (
            <AiFillStar key={`full-${i}`} className="text-black text-[16px]" />
          ))}
          {hasHalfStar && <FaStarHalfAlt className="text-black text-[16px]" />}
          {[...Array(5 - fullStars - (hasHalfStar ? 1 : 0))].map((_, i) => (
            <AiOutlineStar key={`empty-${i}`} className="text-black text-[16px]" />
          ))}
          <span className="ml-2 text-gray-500 text-xs">({product.numReviews || 0})</span>
        </div>

        <p className="text-lg font-bold text-black mt-1">₹{product.price}</p>
      </div>
    </div>
  );
};

export default HorizontalProductCard;