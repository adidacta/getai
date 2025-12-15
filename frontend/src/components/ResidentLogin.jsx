import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Phone, ArrowLeft } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import AuthLayout from './AuthLayout';

export default function ResidentLogin() {
  const navigate = useNavigate();
  const { login } = useAuth();
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [phone, setPhone] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!phone.trim()) {
      setError('Please enter a phone number');
      return;
    }

    setLoading(true);
    setError('');

    try {
      // Navigate to OTP verification with phone number
      navigate('/verify-otp', { state: { phone } });
    } catch (err) {
      setError('An error occurred. Please try again.');
      console.error('Login error:', err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <AuthLayout
      title="Resident Login"
      subtitle="Sign in with your phone number"
      showAppDownload={true}
    >
      <div className="space-y-6">
        {/* Icon */}
        <div className="flex justify-center mb-6">
          <div className="w-20 h-20 bg-gradient-to-br from-blue-500 to-cyan-600 rounded-3xl flex items-center justify-center shadow-lg">
            <Phone className="w-10 h-10 text-white" />
          </div>
        </div>

        <h2 className="text-2xl font-bold text-gray-800" style={{ fontFamily: '"Noto Sans", sans-serif' }}>
          Sign in with Mobile
        </h2>

        <p className="text-sm text-gray-600" style={{ fontFamily: '"Noto Sans", sans-serif' }}>
          We'll send you an SMS verification code to your phone number
        </p>

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="min-h-[100px]">
            {/* Phone Input */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2" style={{ fontFamily: '"Noto Sans", sans-serif' }}>
                Mobile Phone Number
              </label>
              <div className="relative">
                <input
                  type="tel"
                  value={phone}
                  onChange={(e) => {
                    setPhone(e.target.value);
                    setError('');
                  }}
                  placeholder="05X-XXX-XXXX"
                  className="w-full px-4 py-3 pl-11 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                  style={{ fontFamily: '"Noto Sans", sans-serif' }}
                />
                <Phone className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
              </div>
            </div>
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
            type="submit"
            disabled={loading}
            className="w-full bg-gradient-to-r from-blue-600 to-cyan-600 text-white py-3.5 px-6 rounded-xl font-semibold shadow-lg shadow-blue-500/30 hover:shadow-xl hover:shadow-blue-500/40 disabled:opacity-50 disabled:cursor-not-allowed transition-all flex items-center justify-center gap-2"
            style={{ fontFamily: '"Noto Sans", sans-serif' }}
          >
            {loading ? (
              <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
            ) : (
              <>
                <span>Send Verification Code</span>
                <ArrowLeft className="w-5 h-5" />
              </>
            )}
          </button>
        </form>

        {/* Info Box */}
        <div className="bg-blue-50 border border-blue-200 rounded-xl p-4">
          <p className="text-sm text-blue-800" style={{ fontFamily: '"Noto Sans", sans-serif' }}>
            💡 You'll receive an SMS verification code to your phone number. The code is valid for 10 minutes.
          </p>
        </div>

        {/* Divider */}
        <div className="relative py-4">
          <div className="absolute inset-0 flex items-center">
            <div className="w-full border-t border-gray-200"></div>
          </div>
        </div>

        {/* Back Link */}
        <button
          onClick={() => navigate('/login')}
          className="w-full text-gray-600 hover:text-gray-800 py-2 font-medium text-sm"
          style={{ fontFamily: '"Noto Sans", sans-serif' }}
        >
          ← Back to user type selection
        </button>
      </div>
    </AuthLayout>
  );
}
