import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { resetPasswordViaOtp } from '../services/api';

const ResetPasswordViaOtp = () => {
  const location = useLocation();
  const navigate = useNavigate();

  const [email, setEmail] = useState('');
  const [otp, setOtp] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [message, setMessage] = useState('');

  // Autofill from location.state
  useEffect(() => {
    if (location.state?.email && location.state?.otp) {
      setEmail(location.state.email);
      setOtp(location.state.otp);
    } else {
      // If no state passed, redirect to forgot-password
      navigate('/forgot-password');
    }
  }, [location.state, navigate]);

  const handleReset = async (e) => {
    e.preventDefault();
    try {
      const res = await resetPasswordViaOtp(email, otp, newPassword);
      setMessage(res.data.message);

      // Redirect to login after short delay
      setTimeout(() => {
        navigate('/login');
      }, 2000);
    } catch (err) {
      setMessage(err.response?.data?.error || 'Password reset failed');
    }
  };

  return (
    <div className="container mx-auto px-4 py-10">
      <h2 className="text-2xl font-bold mb-4">Reset Password</h2>
      <form onSubmit={handleReset} className="space-y-4 max-w-md">
        <input
          type="email"
          className="border p-2 w-full rounded bg-gray-100"
          value={email}
          disabled
        />
        <input
          type="text"
          className="border p-2 w-full rounded bg-gray-100"
          value={otp}
          disabled
        />
        <input
          type="password"
          placeholder="New Password"
          className="border p-2 w-full rounded"
          value={newPassword}
          onChange={(e) => setNewPassword(e.target.value)}
          required
        />
        <button type="submit" className="bg-purple-600 text-white px-4 py-2 rounded w-full">
          Reset Password
        </button>
      </form>
      {message && <p className="mt-4 text-sm text-center text-gray-700">{message}</p>}
    </div>
  );
};

export default ResetPasswordViaOtp;