import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Mail, ArrowLeft, CheckCircle } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import AuthLayout from './AuthLayout';

export default function ForgotPassword() {
  const navigate = useNavigate();
  const { requestPasswordReset } = useAuth();
  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!email.trim()) {
      setError('Please enter an email address');
      return;
    }

    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      setError('Invalid email address');
      return;
    }

    setLoading(true);
    setError('');

    try {
      const result = await requestPasswordReset(email);

      if (result.success) {
        setSuccess(true);
      } else {
        setError(result.error || 'An error occurred. Please try again.');
      }
    } catch (err) {
      setError('An error occurred. Please try again.');
      console.error('Password reset error:', err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <AuthLayout>
      {!success ? (
        <div className="space-y-6 min-h-[400px]">
          <div className="text-center">
            <div className="relative mb-3">
              <button
                onClick={() => navigate('/login')}
                className="absolute left-0 top-1/2 -translate-y-1/2 text-gray-600 hover:text-gray-900 transition-colors"
                aria-label="Back to login"
              >
                <ArrowLeft className="w-5 h-5" />
              </button>
              <h2 className="text-3xl font-bold text-gray-900" style={{ fontFamily: '"Noto Sans", sans-serif' }}>
                Forgot Password?
              </h2>
            </div>
            <p className="text-sm text-gray-500" style={{ fontFamily: '"Noto Sans", sans-serif' }}>
              Enter your email address and we'll send you a link to reset your password
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            {/* Email Input */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2" style={{ fontFamily: '"Noto Sans", sans-serif' }}>
                Email Address
              </label>
              <div className="relative">
                <input
                  type="email"
                  value={email}
                  onChange={(e) => {
                    setEmail(e.target.value);
                    setError('');
                  }}
                  placeholder="your@email.com"
                  className="w-full px-4 py-3 pl-11 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                  style={{ fontFamily: '"Noto Sans", sans-serif' }}
                />
                <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
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
              className="w-full bg-gradient-to-r from-blue-600 to-indigo-600 text-white py-3.5 px-6 rounded-xl font-semibold shadow-lg shadow-blue-500/30 hover:shadow-xl hover:shadow-blue-500/40 disabled:opacity-50 disabled:cursor-not-allowed transition-all flex items-center justify-center gap-2"
              style={{ fontFamily: '"Noto Sans", sans-serif' }}
            >
              {loading ? (
                <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
              ) : (
                <>
                  <span>Send Reset Link</span>
                  <ArrowLeft className="w-5 h-5 rotate-180" />
                </>
              )}
            </button>
          </form>
        </div>
      ) : (
        /* Success State */
        <div className="space-y-6 text-center min-h-[400px]">
          <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto">
            <CheckCircle className="w-12 h-12 text-green-600" />
          </div>

          <div>
            <h2 className="text-3xl font-bold text-gray-900 mb-3" style={{ fontFamily: '"Noto Sans", sans-serif' }}>
              Link Sent!
            </h2>
            <p className="text-sm text-gray-600 mb-2" style={{ fontFamily: '"Noto Sans", sans-serif' }}>
              We've sent a password reset link to:
            </p>
            <p className="text-base font-semibold text-gray-800 mb-4" style={{ fontFamily: '"Noto Sans", sans-serif' }}>
              {email}
            </p>
            <p className="text-xs text-gray-500" style={{ fontFamily: '"Noto Sans", sans-serif' }}>
              Check your inbox and click the link to reset your password
            </p>
          </div>

          <button
            onClick={() => navigate('/login')}
            className="w-full bg-gradient-to-r from-blue-600 to-indigo-600 text-white py-3.5 px-6 rounded-xl font-semibold shadow-lg shadow-blue-500/30 hover:shadow-xl hover:shadow-blue-500/40 transition-all"
            style={{ fontFamily: '"Noto Sans", sans-serif' }}
          >
            Back to Login
          </button>
        </div>
      )}
    </AuthLayout>
  );
}
