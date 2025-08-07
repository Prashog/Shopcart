import React from 'react';
import Slider from 'react-slick';
import { useProducts } from '../../contexts/ProductContext';
import ProductCard from './ProductCard';

const SlidingProductList = () => {
  const { products, loading, error } = useProducts();

  if (loading) {
    return <p className="text-center text-lg text-gray-600">Loading products...</p>;
  }

  if (error) {
    return <p className="text-center text-red-500 text-lg">{error}</p>;
  }

  if (!products || !Array.isArray(products) || products.length === 0) {
    return <p className="text-center text-gray-500 text-lg">No products found.</p>;
  }

  const settings = {
    dots: false,
    infinite: true,
    autoplay: true,
    autoplaySpeed: 3000,
    speed: 600,
    slidesToShow: 6,
    slidesToScroll: 1,
    arrows: false,
    responsive: [
      {
        breakpoint: 1536, // 2xl
        settings: { slidesToShow: 6 },
      },
      {
        breakpoint: 1280, // xl
        settings: { slidesToShow: 5 },
      },
      {
        breakpoint: 1024, // lg
        settings: { slidesToShow: 4 },
      },
      {
        breakpoint: 768, // md
        settings: { slidesToShow: 2 },
      },
      {
        breakpoint: 640, // sm
        settings: { slidesToShow: 1 },
      },
    ],
  };

  return (
    <div className="max-w-screen-2xl mx-auto px-2 sm:px-4">
      <Slider {...settings}>
        {products.map((product) => (
          <div key={product._id} className="px-1">
            <ProductCard product={product} />
          </div>
        ))}
      </Slider>
    </div>
  );
};

export default SlidingProductList;