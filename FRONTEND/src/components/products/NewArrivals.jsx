import React, { useEffect, useState } from 'react';
import Slider from 'react-slick';
import { newArrival } from '../../services/api';
import ProductCard from '../products/ProductCard';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';

const NewArrivals = () => {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    const fetchArrivals = async () => {
      try {
        const res = await newArrival();
        setProducts(res.data.response || []);
      } catch (err) {
        console.error('Failed to fetch new arrivals:', err);
      }
    };
    fetchArrivals();
  }, []);

  const sliderSettings = {
    dots: false,
    infinite: true,
    speed: 600,
    slidesToShow: 4,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 5000,
    arrows: true,
    responsive: [
      {
        breakpoint: 1280,
        settings: { slidesToShow: 3 }
      },
      {
        breakpoint: 768,
        settings: { slidesToShow: 2 }
      },
      {
        breakpoint: 480,
        settings: { slidesToShow: 1 }
      }
    ]
  };

  return (
    <div className="py-14 bg-white">
      <div className="max-w-screen-xl mx-auto px-4">
        <div className="mb-10">
          <h2 className="text-3xl font-bold text-gray-800 relative inline-block pl-2">
            <span className="relative z-10">New Arrivals</span>
            <span className="absolute bottom-0 left-2 w-2/5 h-1 bg-red-600 rounded z-0"></span>
          </h2>
        </div>

        {products.length === 0 ? (
          <p className="text-center text-gray-500">No new arrivals found.</p>
        ) : (
          <div className="pl-8">
            <Slider {...sliderSettings}>
              {products.map((product) => (
                <div key={product._id} className="px-2">
                  <div className="max-w-[260px] mx-auto">
                    <ProductCard product={product} />
                  </div>
                </div>
              ))}
            </Slider>
          </div>
        )}
      </div>
    </div>
  );
};

export default NewArrivals;