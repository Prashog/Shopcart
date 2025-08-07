import axios from 'axios';
import { getToken } from '../utils/auth';

const API_URL = 'http://localhost:8080';

const api = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Attach token if available
api.interceptors.request.use((config) => {
  const token = getToken();
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// ===== Authentication =====
export const register = (userData) => api.post('/auth/register', userData);
export const login = (credentials) => api.post('/auth/login', credentials);

// OTP Password Reset Flow
export const sendOtpToEmail = (email) => api.post('/auth/forgot-password', { email });
export const verifyOtp = (email, otp) => api.post('/auth/verify-otp', { email, otp });
export const resetPasswordViaOtp = (email, otp, newPassword) =>
  api.post('/auth/reset-password', { email, otp, newPassword });

// Authenticated User Password Change
export const changePassword = (passwords) => api.put('/auth/change-password', passwords); 
// passwords: { oldPass, newPass }

// ===== Products =====
export const getProducts = (categoryId) => {
  if (categoryId) {
    return api.get(`/products?category=${categoryId}`);
  }
  return api.get('/products');
};
export const getProductById = (id) => api.get(`/products/${id}`);

// ===== User =====
export const getUserProfile = () => api.get('/users/me');
export const updateUserProfile = (profileData) => api.put('/users/me', profileData);

// ===== Orders =====
export const createOrder = (orderData) => api.post('/orders', orderData);
export const getOrders = () => api.get('/users/orders');
export const getOrderById = (id) => api.get(`/orders/${id}`);

// ===== Categories =====
export const getCategories = () => api.get('/categories');
export const getCategoryDisplay = () => api.get('/categories/category-display');

// ===== Review and wishlist =====
export const addToWishlist = (id) =>
  api.post(`/wishlist/${id}`);

export const getWishlist = () =>
  api.get('/wishlist');

export const removeFromWishlist = (productId) =>
  api.delete(`/wishlist/${productId}`);

export const submitReview = (productId, reviewData) =>
  api.post(`/reviews/${productId}`, reviewData);

// ===== Addresses =====
export const addAddress = (addressData) => api.post('/address', addressData);
export const updateAddress = (addressId, updatedData) => api.put(`/address/${addressId}`, updatedData);
export const deleteAddress = (addressId) => api.delete(`/address/${addressId}`);
export const getAddresses = () => api.get('/address');
export const getPrimaryAddress = () => api.get('/address/primary');

// ===== Sorted Products =====
export const getBestSellers = () => api.get('/products/bestsellers');
export const dealOfTheDay = () => api.get('/products/deal-of-day');
export const newArrival = () => api.get('/products/new-arrival');
export const getDiscountedProducts = () => api.get('/products/discounted');
export const getCommingSoonProducts = () => api.get('/products/coming-soon');

// ===== Contact Us =====
export const sendContactMessage = (data) => api.post('/contact/', data);

export default api;