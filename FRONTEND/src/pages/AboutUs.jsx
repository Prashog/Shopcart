import React from 'react';

const AboutUs = () => {
  return (
    <div className="bg-white text-gray-800 min-h-screen mt-10 px-6 md:px-16 py-10">
      <h1 className="text-4xl font-bold mb-6 text-center text-gray-900">About Shopcart</h1>

      <div className="max-w-4xl mx-auto text-lg space-y-6 leading-relaxed">
        <p>
          Welcome to <strong>Shopcart</strong> — your one-stop online store for quality products at unbeatable prices.
        </p>
        <p>
          Our mission is to deliver a wide range of high-quality products — from electronics to books — with trust, speed, and value.
        </p>
        <ul className="list-disc list-inside pl-4 space-y-2">
          <li>Excellent customer service and support</li>
          <li>Fast delivery with guaranteed satisfaction</li>
          <li>Trusted by thousands across the country</li>
        </ul>
        <p className="mt-6 italic text-center">
          Thank you for choosing Shopcart!
        </p>
      </div>
    </div>
  );
};

export default AboutUs;