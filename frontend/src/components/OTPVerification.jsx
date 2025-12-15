import { useState, useRef, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { Phone, Mail, ArrowLeft } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import AuthLayout from './AuthLayout';

export default function OTPVerification() {
  const navigate = useNavigate();
  const location = useLocation();
  const { verifyOTP } = useAuth();

  const phone = location.state?.phone;
  const email = location.state?.email;
  const requiresApproval = location.state?.requiresApproval;
  const userData = location.state?.userData;

  const [otp, setOtp] = useState(['', '', '', '']);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [resendCooldown, setResendCooldown] = useState(0);

  const inputRefs = [useRef(null), useRef(null), useRef(null), useRef(null)];

  useEffect(() => {
    if (!phone && !email) navigate('/login');
  }, [phone, email, navigate]);

  useEffect(() => {
    if (resendCooldown > 0) {
      const timer = setTimeout(() => setResendCooldown(resendCooldown - 1), 1000);
      return () => clearTimeout(timer);
    }
  }, [resendCooldown]);

  useEffect(() => {
    inputRefs[0].current?.focus();
  }, []);

  const handleChange = (index, value) => {
    if (value && !/^\d+$/.test(value)) return;

    const newOtp = [...otp];
    newOtp[index] = value.slice(-1);
    setOtp(newOtp);
    setError('');

    if (value && index < 3) {
      inputRefs[index + 1].current?.focus();
    }

    if (index === 3 && value && newOtp.every(digit => digit !== '')) {
      handleSubmit(newOtp.join(''));
    }
  };

  const handleKeyDown = (index, e) => {
    if (e.key === 'Backspace' && !otp[index] && index > 0) {
      inputRefs[index - 1].current?.focus();
    }
  };

  const handlePaste = (e) => {
    e.preventDefault();
    const pastedData = e.clipboardData.getData('text').slice(0, 4);
    if (!/^\d+$/.test(pastedData)) return;

    const newOtp = pastedData.split('').concat(['', '', '', '']).slice(0, 4);
    setOtp(newOtp);

    const nextIndex = Math.min(pastedData.length, 3);
    inputRefs[nextIndex].current?.focus();

    if (newOtp.every(digit => digit !== '')) {
      handleSubmit(newOtp.join(''));
    }
  };

  const handleSubmit = async (code = otp.join('')) => {
    if (code.length !== 4) {
      setError('Please fill in all digits');
      return;
    }

    setLoading(true);
    setError('');

    try {
      const result = await verifyOTP(phone || email, code);

      if (result.success) {
        if (requiresApproval) {
          navigate('/approval-waiting', { state: { userData } });
        } else {
          console.log('OTP verified, user logged in');
          alert('Login successful!');
          navigate('/login');
        }
      } else {
        setError(result.error || 'Invalid code');
        setOtp(['', '', '', '']);
        inputRefs[0].current?.focus();
      }
    } catch (err) {
      setError('An error occurred. Please try again.');
      console.error('OTP verification error:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleResend = async () => {
    if (resendCooldown > 0) return;
    setResendCooldown(60);
    setError('');
    console.log('Resending OTP to:', phone || email);
    alert('Code has been resent');
  };

  return (
    <AuthLayout
      title="Identity Verification"
      subtitle={`Enter the code sent to your ${phone ? 'phone' : 'email'}`}
    >
      <div className="space-y-6">
        {/* Icon */}
        <div className="flex justify-center mb-6">
          <div className="w-20 h-20 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-3xl flex items-center justify-center shadow-lg">
            {phone ? <Phone className="w-10 h-10 text-white" /> : <Mail className="w-10 h-10 text-white" />}
          </div>
        </div>

        {/* Contact Info */}
        <div className="text-center">
          <p className="text-sm text-gray-600 mb-1" style={{ fontFamily: '"Noto Sans", sans-serif' }}>
            A 4-digit code was sent to
          </p>
          <p className="text-base font-semibold text-gray-800" style={{ fontFamily: '"Noto Sans", sans-serif' }}>
            {phone || email}
          </p>
        </div>

        {/* OTP Input */}
        <div className="flex justify-center gap-3 my-8">
          {otp.map((digit, index) => (
            <input
              key={index}
              ref={inputRefs[index]}
              type="text"
              inputMode="numeric"
              maxLength={1}
              value={digit}
              onChange={(e) => handleChange(index, e.target.value)}
              onKeyDown={(e) => handleKeyDown(index, e)}
              onPaste={index === 0 ? handlePaste : undefined}
              disabled={loading}
              className="w-14 h-14 text-center text-2xl font-bold bg-gray-50 border-2 border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all disabled:bg-gray-100"
              style={{ fontFamily: '"Noto Sans", sans-serif' }}
            />
          ))}
        </div>

        {/* Error Message */}
        {error && (
          <div className="bg-red-50 border border-red-200 rounded-xl px-4 py-3">
            <p className="text-sm text-red-700" style={{ fontFamily: '"Noto Sans", sans-serif' }}>
              {error}
            </p>
          </div>
        )}

        {/* Submit Button */}
        <button
          onClick={() => handleSubmit()}
          disabled={loading || otp.some(digit => !digit)}
          className="w-full bg-gradient-to-r from-blue-600 to-indigo-600 text-white py-3.5 px-6 rounded-xl font-semibold shadow-lg shadow-blue-500/30 hover:shadow-xl hover:shadow-blue-500/40 disabled:opacity-50 disabled:cursor-not-allowed transition-all flex items-center justify-center gap-2"
          style={{ fontFamily: '"Noto Sans", sans-serif' }}
        >
          {loading ? (
            <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
          ) : (
            <>
              <span>Verify Code</span>
              <ArrowLeft className="w-5 h-5" />
            </>
          )}
        </button>

        {/* Resend */}
        <div className="text-center pt-4">
          {resendCooldown > 0 ? (
            <p className="text-sm text-gray-500" style={{ fontFamily: '"Noto Sans", sans-serif' }}>
              Resend in {resendCooldown} seconds
            </p>
          ) : (
            <button
              onClick={handleResend}
              className="text-sm text-blue-600 hover:text-blue-700 font-semibold"
              style={{ fontFamily: '"Noto Sans", sans-serif' }}
            >
              Didn't receive a code? Resend
            </button>
          )}
        </div>

        {/* Back Link */}
        <button
          onClick={() => navigate('/login')}
          className="w-full text-gray-600 hover:text-gray-800 py-2 font-medium text-sm"
          style={{ fontFamily: '"Noto Sans", sans-serif' }}
        >
          Back to login
        </button>
      </div>
    </AuthLayout>
  );
}
