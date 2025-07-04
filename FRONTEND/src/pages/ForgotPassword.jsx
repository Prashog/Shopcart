import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { sendOtpToEmail } from '../services/api';

const ForgotPassword = () => {
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage('');
    try {
      const res = await sendOtpToEmail(email);
      setMessage(res.data.message);

      // Navigate to /verify-otp and pass the email via state
      navigate('/verify-otp', { state: { email } });
    } catch (err) {
      setMessage(err.response?.data?.error || 'Error sending OTP');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container mx-auto px-4 py-10">
      <div className="max-w-md mx-auto bg-white p-6 rounded shadow">
        <h2 className="text-2xl font-bold mb-4 text-center">Forgot Password</h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            type="email"
            placeholder="Enter your registered email"
            className="border p-2 w-full rounded"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <button
            type="submit"
            className="bg-blue-600 text-white px-4 py-2 rounded w-full"
            disabled={loading}
          >
            {loading ? 'Sending OTP...' : 'Send OTP'}
          </button>
        </form>
        {message && <p className="mt-4 text-sm text-gray-600 text-center">{message}</p>}
      </div>
    </div>
  );
};

export default ForgotPassword;