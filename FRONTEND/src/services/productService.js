// services/productService.js
import api from './api';

export const getBestSellers = () => api.get('/products/bestsellers');
