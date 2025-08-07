import React from 'react';
import { FaTruck, FaDollarSign, FaTags, FaHeadphonesAlt } from 'react-icons/fa';

const features = [
  {
    icon: <FaTruck className="text-[#ef4b57] text-2xl" />,
    title: 'Free Delivery',
    description: 'Orders from all item',
  },
  {
    icon: <FaDollarSign className="text-[#ef4b57] text-2xl" />,
    title: 'Return & Refund',
    description: 'Money back guarantee',
  },
  {
    icon: <FaTags className="text-[#ef4b57] text-2xl" />,
    title: 'Member Discount',
    description: 'On every order over ₹2000',
  },
  {
    icon: <FaHeadphonesAlt className="text-[#ef4b57] text-2xl" />,
    title: 'Support 24/7',
    description: 'Contact us 24 hours a day',
  },
];

const InfoBanner = () => {
  return (
    <div className="bg-white py-6 px-4">
      <div className="max-w-7xl mx-auto grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-2">
        {features.map((feature, index) => (
          <div
            key={index}
            className="bg-[#f8f9fb] p-4 rounded-xl flex items-start gap-4 shadow-sm"
          >
            {feature.icon}
            <div>
              <h4 className="font-semibold text-gray-900 text-sm">
                {feature.title}
              </h4>
              <p className="text-sm text-gray-600">{feature.description}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default InfoBanner;