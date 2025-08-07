import React from 'react';
import DiscountedProducts from './DiscountedProducts';
import ComingSoon from './CommingSoon';
import laptopAd from '../../assets/images/laptop-ad.jpg';

const ProductHighlights = () => {
  return (
    <div className="flex flex-col lg:flex-row gap-6 justify-center items-center px-4 py-8 bg-white">
      {/* Discounted Products */}
      <div className="flex-1 w-full max-w-md">
        <DiscountedProducts />
      </div>

      {/* Coming Soon */}
      <div className="flex-1 w-full max-w-md">
        <ComingSoon />
      </div>

      {/* Image Section */}
      <div className="flex-1 w-full max-w-md flex justify-center items-center">
        <div className="w-full h-[550px] flex justify-center items-center rounded-xl overflow-hidden shadow-lg bg-white">
          <img
            src={laptopAd}
            alt="Laptop Advertisement"
            className="w-full h-full object-cover"
          />
        </div>
      </div>
    </div>
  );
};

export default ProductHighlights;