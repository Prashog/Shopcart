import React, { useEffect, useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { verifyOtp, sendOtpToEmail } from '../services/api';

const VerifyOtp = () => {
  const location = useLocation();
  const navigate = useNavigate();

  const [email, setEmail] = useState('');
  const [otp, setOtp] = useState('');
  const [message, setMessage] = useState('');
  const [countdown, setCountdown] = useState(600); // 10 minutes
  const [resendEnabled, setResendEnabled] = useState(false);

  // Autofill email from state
  useEffect(() => {
  if (!location.state?.email) {
    navigate('/forgot-password'); // redirect if email is missing
  } else {
    setEmail(location.state.email);
  }
}, [location]);

  // Countdown logic
  useEffect(() => {
    if (countdown > 0) {
      const timer = setInterval(() => setCountdown(prev => prev - 1), 1000);
      return () => clearInterval(timer);
    } else {
      setResendEnabled(true);
    }
  }, [countdown]);

  const formatTime = (s) => `${String(Math.floor(s / 60)).padStart(2, '0')}:${String(s % 60).padStart(2, '0')}`;

  const handleVerify = async (e) => {
    e.preventDefault();
    setMessage('');
    try {
      const res = await verifyOtp(email, otp);
      setMessage(res.data.message);

      // Navigate to reset password screen
      setTimeout(() => {
        navigate('/reset-password-otp', { state: { email, otp } });
      }, 2000);
    } catch (err) {
      setMessage(err.response?.data?.error || 'OTP verification failed');
    }
  };

  const handleResendOtp = async () => {
    try {
      await sendOtpToEmail(email);
      setMessage('OTP resent successfully');
      setCountdown(600);
      setResendEnabled(false);
    } catch (err) {
      setMessage(err.response?.data?.error || 'Failed to resend OTP');
    }
  };

  return (
    <div className="container mx-auto px-4 py-10">
      <div className="max-w-md mx-auto bg-white p-6 rounded shadow">
        <h2 className="text-2xl font-bold mb-4 text-center">Verify OTP</h2>
        <form onSubmit={handleVerify} className="space-y-4">
          <input
            type="email"
            placeholder="Email"
            className="border p-2 w-full rounded bg-gray-100 cursor-not-allowed"
            value={email}
            disabled
          />
          <input
            type="text"
            placeholder="Enter OTP"
            className="border p-2 w-full rounded"
            value={otp}
            onChange={(e) => setOtp(e.target.value)}
            required
          />
          <button
            type="submit"
            className="bg-green-600 text-white px-4 py-2 rounded w-full"
          >
            Verify OTP
          </button>
        </form>

        {/* Resend OTP */}
        <div className="text-center mt-4">
          {resendEnabled ? (
            <button
              onClick={handleResendOtp}
              className="text-blue-600 hover:underline font-medium"
            >
              Resend OTP
            </button>
          ) : (
            <p className="text-sm text-gray-500">
              Resend available in {formatTime(countdown)}
            </p>
          )}
        </div>

        {message && <p className="mt-4 text-sm text-center text-gray-700">{message}</p>}
      </div>
    </div>
  );
};

export default VerifyOtp;