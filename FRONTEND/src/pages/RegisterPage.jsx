import React, { useState } from 'react';
import { useAuth } from '../contexts/AuthContext';
import { useNavigate, Link } from 'react-router-dom';
import Input from '../components/common/Input';
import Button from '../components/common/Button';

const RegisterPage = () => {
  const [userData, setUserData] = useState({ name: '', email: '', password: '' });
  const [error, setError] = useState('');
  const { register } = useAuth();
  const navigate = useNavigate();

  const handleChange = (e) => {
    setUserData({ ...userData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    try {
      await register(userData);
      navigate('/profile');
    } catch (err) {
      setError('Failed to register. Please try again.');
      console.error(err);
    }
  };

  return (
    <div className="max-w-md mx-auto mt-10 p-8 border rounded-lg shadow-lg">
      <h2 className="text-2xl font-bold text-center mb-6">Create Account</h2>
      {error && <p className="bg-red-100 text-red-700 p-3 rounded mb-4">{error}</p>}
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <Input name="name" placeholder="Full Name" value={userData.name} onChange={handleChange} />
        </div>
        <div className="mb-4">
          <Input type="email" name="email" placeholder="Email" value={userData.email} onChange={handleChange} />
        </div>
        <div className="mb-6">
          <Input type="password" name="password" placeholder="Password" value={userData.password} onChange={handleChange} />
        </div>
        <Button type="submit" className="w-full">Register</Button>
      </form>
       <p className="text-center mt-4">
        Already have an account? <Link to="/login" className="text-green-600 hover:underline">Log in</Link>
      </p>
    </div>
  );
};

export default RegisterPage;