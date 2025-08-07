import React, { useEffect, useRef, useState } from 'react';
import { getCommingSoonProducts } from '../../services/api';
import HorizontalProductCard from '../products/HorizontalProductCard';
import { ChevronUp, ChevronDown } from 'lucide-react';

const VISIBLE_CARDS = 4;

const ComingSoon = () => {
  const [products, setProducts] = useState([]);
  const [startIndex, setStartIndex] = useState(0);
  const scrollInterval = useRef(null);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const res = await getCommingSoonProducts();
        setProducts(res.data.response || []);
      } catch (err) {
        console.error('Failed to fetch coming soon products:', err);
      }
    };

    fetchProducts();
  }, []);

  useEffect(() => {
    startAutoScroll();
    return stopAutoScroll; // Cleanup
  }, [products]);

  const scrollByOne = (direction) => {
    setStartIndex((prevIndex) => {
      const nextIndex =
        direction === 'down'
          ? (prevIndex + 1) % products.length
          : (prevIndex - 1 + products.length) % products.length;
      return nextIndex;
    });
  };

  const startAutoScroll = () => {
    stopAutoScroll();
    scrollInterval.current = setInterval(() => scrollByOne('down'), 4000);
  };

  const stopAutoScroll = () => {
    if (scrollInterval.current) {
      clearInterval(scrollInterval.current);
    }
  };

  const visibleProducts = [];
  for (let i = 0; i < Math.min(VISIBLE_CARDS, products.length); i++) {
    const index = (startIndex + i) % products.length;
    if (products[index]) visibleProducts.push(products[index]);
  }

  return (
    <div className="relative max-w-md mx-auto bg-white rounded-xl shadow-lg p-4">
      <h2 className="text-3xl font-bold text-gray-800 relative inline-block pl-2">
        <span className="text-xl font-semibold mb-4 text-center">Coming Soon</span>
        <span className="absolute bottom-0 left-2 w-2/5 h-1 bg-red-600 rounded z-0"></span>
      </h2>

      <div className="flex justify-center mb-2">
        <button
          onClick={() => scrollByOne('up')}
          className="hover:text-gray-700 text-gray-500"
        >
          <ChevronUp />
        </button>
      </div>

      <div
        className="flex flex-col gap-3 transition-all duration-500"
        onMouseEnter={stopAutoScroll}
        onMouseLeave={startAutoScroll}
      >
        {visibleProducts.map((product, idx) =>
          product ? (
            <HorizontalProductCard key={idx} product={product} />
          ) : null
        )}
      </div>

      <div className="flex justify-center mt-2">
        <button
          onClick={() => scrollByOne('down')}
          className="hover:text-gray-700 text-gray-500"
        >
          <ChevronDown />
        </button>
      </div>
    </div>
  );
};

export default ComingSoon;