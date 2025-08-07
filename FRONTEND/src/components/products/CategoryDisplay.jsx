import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../../services/api';
import electronicsImg from '../../assets/images/electronics.png';
import shoesImg from '../../assets/images/shoes.png';
import computersImg from '../../assets/images/computers.png';
import mobileTabletsImg from '../../assets/images/mobile_tablets.png';
import gamingImg from '../../assets/images/gaming.png';

const imageMap = {
  Electronics: electronicsImg,
  Shoes: shoesImg,
  Computers: computersImg,
  'Mobile/Tablets': mobileTabletsImg,
  Gaming: gamingImg,
};

const CategoryDisplay = () => {
  const [categories, setCategories] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const res = await api.get('/categories/category-display');
        const data = [
          res.data.category1,
          res.data.category2,
          res.data.category3,
          res.data.category4,
          res.data.category5,
        ];
        setCategories(data);
      } catch (error) {
        console.error('Failed to fetch categories:', error);
      }
    };

    fetchCategories();
  }, []);

  const handleCategoryClick = (categoryId) => {
    navigate(`/products?category=${categoryId}`);
  };

  return (
    <div className="pt-12 pb-6 px-4 bg-white">
      <div className="max-w-7xl mx-auto grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-4 text-center">
        {categories.map((cat) => (
          <div
            key={cat._id}
            onClick={() => handleCategoryClick(cat._id)}
            className="flex flex-col items-center cursor-pointer group"
          >
            <div className="w-36 h-36 mb-2 rounded-full bg-blue-100 flex items-center justify-center group-hover:bg-[#d8f1e5] transition">
              <img
                src={imageMap[cat.name]}
                alt={cat.name}
                className="w-24 h-24 object-contain"
              />
            </div>
            <h3 className="font-semibold text-gray-800 text-sm sm:text-base transition">
              {cat.name}
            </h3>
          </div>
        ))}
      </div>
    </div>
  );
};

export default CategoryDisplay;