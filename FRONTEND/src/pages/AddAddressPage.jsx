// src/pages/AddAddressPage.jsx
import React, { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import api from '../services/api';
import Button from '../components/common/Button';

const AddAddressPage = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const returnTo = location.state?.returnTo || '/profile';
  const [formData, setFormData] = useState({
    address: '',
    landmark: '',
    city: '',
    state: '',
    postalCode: '',
    country: '',
    isDefault: false,
  });

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await api.post('/address', formData);
      navigate(returnTo); // Redirect to desired page
    } catch (error) {
      console.error('Failed to add address:', error);
      alert('Something went wrong. Please try again.');
    }
  };

  return (
    <div className="max-w-xl mx-auto p-6 bg-white shadow-md rounded">
      <h1 className="text-2xl font-bold mb-4">Add New Address</h1>
      <form onSubmit={handleSubmit} className="space-y-4">
        <input name="address" onChange={handleChange} value={formData.address} placeholder="Address" className="w-full p-2 border rounded" required />
        <input name="landmark" onChange={handleChange} value={formData.landmark} placeholder="Landmark" className="w-full p-2 border rounded" />
        <input name="city" onChange={handleChange} value={formData.city} placeholder="City" className="w-full p-2 border rounded" required />
        <input name="state" onChange={handleChange} value={formData.state} placeholder="State" className="w-full p-2 border rounded" required />
        <input name="postalCode" onChange={handleChange} value={formData.postalCode} placeholder="Postal Code" className="w-full p-2 border rounded" required />
        <input name="country" onChange={handleChange} value={formData.country} placeholder="Country" className="w-full p-2 border rounded" required />
        
        <label className="flex items-center gap-2">
          <input type="checkbox" name="isDefault" checked={formData.isDefault} onChange={handleChange} />
          Set as default address
        </label>

        <Button type="submit" className="bg-black text-white">Save Address</Button>
      </form>
    </div>
  );
};

export default AddAddressPage;
