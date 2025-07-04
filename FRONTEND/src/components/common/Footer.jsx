import React from 'react';
import { HashLink as Link } from 'react-router-hash-link';

const Footer = () => {
  return (
    <footer className="bg-gray-800 text-white mt-16">
      <div className="container mx-auto px-4 py-8">
        <div className="grid md:grid-cols-4 gap-8">
          <div>
            <h3 className="text-xl font-bold mb-4">Shopcart</h3>
            <p className="text-gray-400">
              A perfect place to find all your needs. High-quality products and unbeatable prices.
            </p>
          </div>
          <div>
            <h4 className="font-semibold mb-4">Quick Links</h4>
            <ul>
              <li><Link smooth to="/about" className="hover:text-gray-300">About Us</Link></li>
              <li><Link smooth to="/contact" className="hover:text-gray-300">Contact</Link></li>
              <li><Link smooth to="/faq" className="hover:text-gray-300">FAQ</Link></li>
            </ul>
          </div>
          <div>
            <h4 className="font-semibold mb-4">Categories</h4>
            <ul>
              <li><Link smooth to="/#categories" className="hover:text-gray-300">Electronics</Link></li>
              <li><Link smooth to="/#categories" className="hover:text-gray-300">Furniture</Link></li>
              <li><Link smooth to="/#categories" className="hover:text-gray-300">Books</Link></li>
            </ul>
          </div>
          <div>
            <h4 className="font-semibold mb-4">Contact Us</h4>
            <p className="text-gray-400">123 Shopping Lane, Indore</p>
            <p className="text-gray-400">Email: support@shopcart.com</p>
          </div>
        </div>
        <div className="text-center text-gray-500 border-t border-gray-700 mt-8 pt-6">
          © 2025 Shopcart. All Rights Reserved.
        </div>
      </div>
    </footer>
  );
};

export default Footer;