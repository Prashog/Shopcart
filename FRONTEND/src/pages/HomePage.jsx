import React from 'react';
import { Link } from 'react-router-dom';
import SlidingProductList from '../components/products/SlidingProductList';
import BestSellersSection from '../components/products/BestSellersSection';
import DealsOfTheDay from '../components/products/DealsOfTheDay';
import NewArrivals from '../components/products/NewArrivals';
import ProductHighlights from '../components/products/ProductHighlights';
import CategoryDisplay from '../components/products/CategoryDisplay';
import InfoBanner from '../components/common/InfoBanner';
import heroImage from '../assets/images/home-ad.jpg';

const HomePage = () => {
  return (
    <div>
      {/* Hero Section */}
      <section className="w-full">
        <img
          src={heroImage}
          alt="Shopping banner"
          className="w-full h-auto object-cover max-h-[600px]"
        />
      </section>

      <CategoryDisplay />
      <InfoBanner />

      {/* Sections with IDs for scrolling */}
      <section id="best-sellers">
        <BestSellersSection />
      </section>

      <section id="deals">
        <DealsOfTheDay />
      </section>

      <section id="new-arrivals">
        <NewArrivals />
      </section>

      <section id="discounted">
        <ProductHighlights />
      </section>

      <section className="py-16 bg-gray-50 overflow-hidden">
        <div className="max-w-screen-2xl mx-auto px-4">
          <div className="mb-10">
            <h2 className="text-3xl font-bold text-gray-800 relative inline-block pl-2">
              <span className="relative z-10">Products For You!</span>
              <span className="absolute bottom-0 left-2 w-2/5 h-1 bg-red-600 rounded z-0"></span>
            </h2>
          </div>
          <SlidingProductList />
        </div>
      </section>
    </div>
  );
};

export default HomePage;