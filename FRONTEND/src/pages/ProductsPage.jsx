import React from 'react';
import ProductList from '../components/products/ProductList';

const ProductsPage = () => {
  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-4xl font-bold text-gray-800 mb-8">All Headphones</h1>
      {/* Filtering options can be added here */}
      <ProductList />
    </div>
  );
};

export default ProductsPage;