import React, { useEffect, useState } from 'react';
import Slider from 'react-slick';
import { dealOfTheDay } from '../../services/api';
import ProductCard from '../products/ProductCard';
import dealImage from '../../assets/images/deal-of-the-day.png';

const DealsOfTheDay = () => {
  const [deals, setDeals] = useState([]);

  useEffect(() => {
    const fetchDeals = async () => {
      try {
        const res = await dealOfTheDay();
        setDeals(res.data.response || []);
      } catch (err) {
        console.error('Failed to fetch deals:', err);
      }
    };

    fetchDeals();
  }, []);

  const sliderSettings = {
    dots: false,
    infinite: true,
    speed: 600,
    slidesToShow: 3,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 4000,
    arrows: true,
    responsive: [
      {
        breakpoint: 1024,
        settings: { slidesToShow: 2 },
      },
      {
        breakpoint: 640,
        settings: { slidesToShow: 1 },
      },
    ],
  };

  return (
    <div className="bg-blue-100 py-12 overflow-x-hidden">
      <div className="max-w-screen-xl mx-auto px-4">
        {/* Title */}
        <div className="mb-8">
          <h2 className="text-3xl font-bold text-gray-800 relative inline-block pl-2">
            <span className="relative z-10">Deal of The Day</span>
            <span className="absolute bottom-0 left-2 w-2/5 h-1 bg-red-500 rounded z-0"></span>
          </h2>
        </div>

        {/* Image + Slider */}
        <div className="flex flex-col lg:flex-row items-center lg:items-start gap-6">
          {/* Image */}
          <div className="w-full max-w-[420px] mx-auto lg:mx-0 lg:w-[420px] shrink-0">
            <img
              src={dealImage}
              alt="Deal of the Day"
              className="w-full h-full object-contain"
            />
          </div>

          {/* Slider */}
          <div className="w-full flex-1 min-w-0 relative lg:ml-12">
            {deals.length === 0 ? (
              <p className="text-center text-gray-500">No deals available.</p>
            ) : (
              <Slider {...sliderSettings}>
                {deals.map((product) => (
                  <div key={product._id} className="px-[6px]">
                    <ProductCard product={product} />
                  </div>
                ))}
              </Slider>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default DealsOfTheDay;