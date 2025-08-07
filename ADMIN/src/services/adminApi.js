import axios from 'axios';
import { getAdminToken } from '../utils/adminAuth';

const API_URL = import.meta.env.VITE_API_URL;

const adminApi = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

adminApi.interceptors.request.use((config) => {
  const token = getAdminToken();
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// ===== Admin Auth =====
export const adminLogin = (credentials) => adminApi.post('/auth/admin-login', credentials);

// ===== Admin Categories =====
export const createCategory = (categoryData) => adminApi.post('/categories', categoryData);
export const getCategories = () => adminApi.get('/categories');

// ===== Admin Products =====
export const createProduct = (productData) => adminApi.post('/admin/products', productData);
export const updateProduct = (productId, updatedData) => adminApi.put(`/admin/products/${productId}`, updatedData);
export const deleteProduct = (productId) => adminApi.delete(`/admin/products/${productId}`);
export const getTopSellingProducts = () => adminApi.get('/admin/products/top-selling');

// ===== Products (non-admin) =====
export const getProducts = (categoryId) => {
  if (categoryId) {
    return adminApi.get(`/products?category=${categoryId}`);
  }
  return adminApi.get('/products');
};

// ===== Admin Orders =====
export const getAllOrders = () => adminApi.get('/admin/orders');
export const updateOrderDeliveryStatus = (orderId) => adminApi.put(`/admin/orders/delivery-status/${orderId}`);
export const getRecentOrders = () => adminApi.get('/admin/orders/recent');
export const getUndeliveredOrders = () => adminApi.get('/admin/orders/undelivered');

// ===== Admin Dashboard =====
export const getDashboardStats = () => adminApi.get('/admin/stats');

// ===== Admin Users Management =====
export const getAllUsers = () => adminApi.get('/admin/users');
export const toggleUserAccess = (userId) => adminApi.put(`/admin/users/${userId}`);

export default adminApi;