import React from 'react';
import { Routes, Route } from 'react-router-dom';
import StickyHeader from './components/common/StickyHeader';
import Footer from './components/common/Footer';
import HomePage from './pages/HomePage';
import ProductsPage from './pages/ProductsPage';
import ProductDetailPage from './pages/ProductDetailPage';
import CartPage from './pages/CartPage';
import CheckoutPage from './pages/CheckoutPage';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import ProfilePage from './pages/ProfilePage';
import OrderDetailsPage from './pages/OrderDetailsPage';
import ForgotPassword from './pages/ForgotPassword';
import VerifyOtp from './pages/VerifyOtp';
import ResetPasswordViaOtp from './pages/ResetPasswordViaOtp';
import ChangePasswordPage from './pages/ChangePasswordPage';
import AboutUs from './pages/AboutUs';
import Contact from './pages/Contact';
import FAQ from './pages/FAQ';
import AddAddressPage from './pages/AddAddressPage';
import WishlistPage from './pages/WishlistPage';

const App = () => {
  return (
    <>
      <StickyHeader />
      <main className="pt-[120px]">
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/products" element={<ProductsPage />} />
          <Route path="/products/:id" element={<ProductDetailPage />} />
          <Route path="/cart" element={<CartPage />} />
          <Route path="/checkout" element={<CheckoutPage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/register" element={<RegisterPage />} />
          <Route path="/profile" element={<ProfilePage />} />
          <Route path="/orders/:id" element={<OrderDetailsPage />} />
          <Route path="/forgot-password" element={<ForgotPassword />} />
          <Route path="/verify-otp" element={<VerifyOtp />} />
          <Route path="/reset-password-otp" element={<ResetPasswordViaOtp />} />
          <Route path="/change-password" element={<ChangePasswordPage />} />
          <Route path="/about" element={<AboutUs />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/faq" element={<FAQ />} />
          <Route path="/add-address" element={<AddAddressPage />} />
          <Route path="/wishlist" element={<WishlistPage />} />
        </Routes>
      </main>
      <Footer />
    </>
  );
};

export default App;