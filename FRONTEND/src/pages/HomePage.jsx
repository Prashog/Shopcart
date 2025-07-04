import React from 'react';
import { Link } from 'react-router-dom';
import ProductList from '../components/products/ProductList';
import { useCategories } from '../contexts/CategoryContext';
import heroImage from '../assets/images/hero-bg.jpg';

const categoryColors = [
  'bg-green-200', 'bg-orange-200', 'bg-red-200', 'bg-blue-200',
  'bg-pink-200', 'bg-purple-200', 'bg-yellow-200', 'bg-indigo-200',
];

const HomePage = () => {
  const { categories, loading, error } = useCategories();

  const renderCategories = () => {
    if (!loading && categories.length === 0) {
      return <p className="text-center col-span-full">No categories found.</p>;
    }
    if (loading) {
      return <p className="text-center col-span-full">Loading Categories...</p>;
    }
    if (error) {
      return <p className="text-center text-red-500 col-span-full">{error}</p>;
    }

    return categories.map((category, index) => (
      <Link to={`/products?category=${category._id}`} key={category._id}>
        <div
          className={`p-6 rounded-lg text-center h-full flex items-center justify-center transition-transform hover:scale-105 ${categoryColors[index % categoryColors.length]}`}
        >
          <h3 className="font-bold text-gray-800 text-lg">{category.name}</h3>
        </div>
      </Link>
    ));
  };

  return (
    <div>
      {/* Hero Section */}
      <section className="relative bg-yellow-50 overflow-hidden">
        <div className="container mx-auto px-4 py-20 lg:py-32">
          <div className="grid md:grid-cols-2 gap-8 items-center">
            <div className="text-center md:text-left">
              <h1 className="text-4xl lg:text-6xl font-bold text-gray-800 mb-4 leading-tight">Shopping And Department Store.</h1>
              <p className="text-lg text-gray-600 mb-8">Shopping is a bit of a relaxing hobby for me, which is sometimes troubling for the bank balance.</p>
              <Link to="/products">
                <button className="bg-green-800 text-white py-3 px-10 rounded-lg text-lg font-semibold hover:bg-green-900 transition duration-300">
                  Learn More
                </button>
              </Link>
            </div>
            <div className="hidden md:block">
              <img src={heroImage} alt="Shopping items" className="w-full h-auto" />
            </div>
          </div>
        </div>
      </section>

      {/* Categories Section */}
      <section id="categories" className="py-16">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-gray-800 mb-10 text-center">Shop Our Top Categories</h2>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {renderCategories()}
          </div>
        </div>
      </section>

      {/* Featured Products Section */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-gray-800 mb-10 text-center">Products For You!</h2>
          <ProductList />
        </div>
      </section>
    </div>
  );
};

export default HomePage;