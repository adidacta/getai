import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Mail, Lock, Eye, EyeOff, ArrowLeft, Briefcase } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import AuthLayout from './AuthLayout';

export default function StakeholderLogin() {
  const navigate = useNavigate();
  const { login } = useAuth();
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    setError('');
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      const result = await login({
        email: formData.email,
        password: formData.password,
        userType: 'stakeholder'
      });

      if (result.success) {
        console.log('Login successful:', result.user);
        // navigate('/dashboard');
      } else {
        setError(result.error || 'Login failed');
      }
    } catch (err) {
      setError('An error occurred. Please try again.');
      console.error('Login error:', err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <AuthLayout
      title="Stakeholder Login"
      subtitle="Sign in to your account and continue managing your projects"
    >
      <div className="space-y-6">
        {/* Icon */}
        <div className="flex justify-center mb-6">
          <div className="w-20 h-20 bg-gradient-to-br from-indigo-500 to-purple-600 rounded-3xl flex items-center justify-center shadow-lg">
            <Briefcase className="w-10 h-10 text-white" />
          </div>
        </div>

        <h2 className="text-2xl font-bold text-gray-800" style={{ fontFamily: '"Noto Sans", sans-serif' }}>
          Sign in with Email
        </h2>

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="min-h-[200px] space-y-4">
            {/* Email Input */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2" style={{ fontFamily: '"Noto Sans", sans-serif' }}>
                Email
              </label>
              <div className="relative">
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  placeholder="your@email.com"
                  className="w-full px-4 py-3 pl-11 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all"
                  style={{ fontFamily: '"Noto Sans", sans-serif' }}
                />
                <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
              </div>
            </div>

            {/* Password Input */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2" style={{ fontFamily: '"Noto Sans", sans-serif' }}>
                Password
              </label>
              <div className="relative">
                <input
                  type={showPassword ? 'text' : 'password'}
                  name="password"
                  value={formData.password}
                  onChange={handleInputChange}
                  placeholder="••••••••"
                  className="w-full px-4 py-3 pl-11 pr-11 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all"
                  style={{ fontFamily: '"Noto Sans", sans-serif' }}
                />
                <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
                >
                  {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                </button>
              </div>
            </div>

            {/* Forgot Password */}
            <div className="flex justify-end">
              <button
                type="button"
                onClick={() => navigate('/forgot-password')}
                className="text-sm text-indigo-600 hover:text-indigo-700 font-medium"
                style={{ fontFamily: '"Noto Sans", sans-serif' }}
              >
                Forgot password?
              </button>
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

          {/* Login Button */}
          <button
            type="submit"
            disabled={loading}
            className="w-full bg-gradient-to-r from-indigo-600 to-purple-600 text-white py-3.5 px-6 rounded-xl font-semibold shadow-lg shadow-indigo-500/30 hover:shadow-xl hover:shadow-indigo-500/40 disabled:opacity-50 disabled:cursor-not-allowed transition-all flex items-center justify-center gap-2"
            style={{ fontFamily: '"Noto Sans", sans-serif' }}
          >
            {loading ? (
              <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
            ) : (
              <>
                <span>Sign In</span>
                <ArrowLeft className="w-5 h-5" />
              </>
            )}
          </button>

          {/* Alternative Login Option */}
          <button
            type="button"
            onClick={() => navigate('/verify-otp', { state: { email: formData.email } })}
            className="w-full bg-white border-2 border-gray-200 text-gray-700 py-3.5 px-6 rounded-xl font-semibold hover:border-indigo-300 hover:bg-indigo-50 transition-all"
            style={{ fontFamily: '"Noto Sans", sans-serif' }}
          >
            Get one-time SMS code
          </button>
        </form>

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
