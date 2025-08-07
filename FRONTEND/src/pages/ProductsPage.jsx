import React from 'react';
import { useLocation } from 'react-router-dom';
import ProductList from '../components/products/ProductList';
import { useCategories } from '../contexts/CategoryContext';

const ProductsPage = () => {
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const categoryId = queryParams.get('category');

  const { categories } = useCategories();

  const getCategoryName = (id) => {
    const category = categories.find((cat) => cat._id === id);
    return category?.name || 'All Products';
  };

  const heading = categoryId ? getCategoryName(categoryId) : 'All Products';

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-4xl font-bold text-gray-800 mb-8">{heading}</h1>
      <ProductList />
    </div>
  );
};

export default ProductsPage;