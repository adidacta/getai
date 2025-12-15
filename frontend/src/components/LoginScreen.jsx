import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Mail, Lock, Eye, EyeOff, Phone, ArrowLeft } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import AuthLayout from './AuthLayout';

export default function LoginScreen() {
  const navigate = useNavigate();
  const { login } = useAuth();
  const [activeTab, setActiveTab] = useState('email');
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    phone: ''
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    setError('');
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      if (activeTab === 'email') {
        const result = await login({
          email: formData.email,
          password: formData.password,
          userType: 'stakeholder'
        });

        if (result.success) {
          console.log('Login successful:', result.user);
        } else {
          setError(result.error || 'התחברות נכשלה');
        }
      } else {
        navigate('/verify-otp', { state: { phone: formData.phone } });
      }
    } catch (err) {
      setError('אירעה שגיאה. נסה שוב.');
      console.error('Login error:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleSmsCode = (e) => {
    e.preventDefault();
    navigate('/verify-otp', { state: { email: formData.email } });
  };

  return (
    <AuthLayout
      title="ברוכים הבאים"
      subtitle="התחבר לחשבון שלך והמשך לעקוב אחר הפרויקטים שלך"
    >
      <div className="space-y-6">
        {/* Tabs */}
        <div className="flex gap-2 p-1 bg-gray-100 rounded-xl" dir="rtl">
          <button
            onClick={() => setActiveTab('email')}
            className={`flex-1 py-3 px-4 rounded-lg font-semibold text-sm transition-all ${
              activeTab === 'email'
                ? 'bg-white text-blue-600 shadow-sm'
                : 'text-gray-600 hover:text-gray-800'
            }`}
            style={{ fontFamily: '"Noto Sans Hebrew", sans-serif' }}
          >
            כניסה עם מייל
          </button>
          <button
            onClick={() => setActiveTab('mobile')}
            className={`flex-1 py-3 px-4 rounded-lg font-semibold text-sm transition-all ${
              activeTab === 'mobile'
                ? 'bg-white text-blue-600 shadow-sm'
                : 'text-gray-600 hover:text-gray-800'
            }`}
            style={{ fontFamily: '"Noto Sans Hebrew", sans-serif' }}
          >
            כניסה עם נייד
          </button>
        </div>

        {/* Form */}
        <form onSubmit={handleLogin} className="space-y-4">
          <div className="min-h-[280px] transition-all duration-300 ease-in-out">
          {activeTab === 'email' ? (
            <>
              {/* Email Input */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2 text-right" style={{ fontFamily: '"Noto Sans Hebrew", sans-serif' }}>
                  אימייל
                </label>
                <div className="relative">
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    placeholder="your@email.com"
                    className="w-full px-4 py-3 pr-11 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all text-right"
                    style={{ fontFamily: '"Noto Sans", sans-serif' }}
                    dir="ltr"
                  />
                  <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                </div>
              </div>

              {/* Password Input */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2 text-right" style={{ fontFamily: '"Noto Sans Hebrew", sans-serif' }}>
                  סיסמה
                </label>
                <div className="relative">
                  <input
                    type={showPassword ? 'text' : 'password'}
                    name="password"
                    value={formData.password}
                    onChange={handleInputChange}
                    placeholder="••••••••"
                    className="w-full px-4 py-3 pr-11 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all text-right"
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
                  className="text-sm text-blue-600 hover:text-blue-700 font-medium"
                  style={{ fontFamily: '"Noto Sans Hebrew", sans-serif' }}
                >
                  שכחתי סיסמה
                </button>
              </div>
            </>
          ) : (
            <>
              {/* Phone Input */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2 text-right" style={{ fontFamily: '"Noto Sans Hebrew", sans-serif' }}>
                  מספר טלפון נייד
                </label>
                <div className="relative">
                  <input
                    type="tel"
                    name="phone"
                    value={formData.phone}
                    onChange={handleInputChange}
                    placeholder="05X-XXX-XXXX"
                    className="w-full px-4 py-3 pr-11 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all text-right"
                    style={{ fontFamily: '"Noto Sans", sans-serif' }}
                    dir="ltr"
                  />
                  <Phone className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                </div>
              </div>
            </>
          )}
          </div>

          {/* Error Message */}
          {error && (
            <div className="bg-red-50 border border-red-200 rounded-xl px-4 py-3" dir="rtl">
              <p className="text-sm text-red-700 text-right" style={{ fontFamily: '"Noto Sans Hebrew", sans-serif' }}>
                {error}
              </p>
            </div>
          )}

          {/* Login Button */}
          <button
            type="submit"
            disabled={loading}
            className="w-full bg-gradient-to-r from-blue-600 to-indigo-600 text-white py-3.5 px-6 rounded-xl font-semibold shadow-lg shadow-blue-500/30 hover:shadow-xl hover:shadow-blue-500/40 disabled:opacity-50 disabled:cursor-not-allowed transition-all flex items-center justify-center gap-2"
            style={{ fontFamily: '"Noto Sans Hebrew", sans-serif' }}
          >
            {loading ? (
              <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
            ) : (
              <>
                <ArrowLeft className="w-5 h-5" />
                <span>התחבר</span>
              </>
            )}
          </button>

          {/* SMS Code Button for Email */}
          {activeTab === 'email' && (
            <button
              type="button"
              onClick={handleSmsCode}
              disabled={loading}
              className="w-full bg-white border-2 border-gray-200 text-gray-700 py-3.5 px-6 rounded-xl font-semibold hover:border-blue-300 hover:bg-blue-50 disabled:opacity-50 disabled:cursor-not-allowed transition-all"
              style={{ fontFamily: '"Noto Sans Hebrew", sans-serif' }}
            >
              קבל קוד חד-פעמי בסמס
            </button>
          )}
        </form>

        {/* Divider */}
        <div className="relative py-4">
          <div className="absolute inset-0 flex items-center">
            <div className="w-full border-t border-gray-200"></div>
          </div>
          <div className="relative flex justify-center">
            <span className="px-4 bg-white text-sm text-gray-500" style={{ fontFamily: '"Noto Sans Hebrew", sans-serif' }}>
              עדיין לא רשום?
            </span>
          </div>
        </div>

        {/* Sign Up Link */}
        <button
          onClick={() => navigate('/signup')}
          className="w-full bg-gradient-to-r from-gray-50 to-gray-100 text-gray-700 py-3.5 px-6 rounded-xl font-semibold border border-gray-200 hover:border-gray-300 hover:from-gray-100 hover:to-gray-200 transition-all"
          style={{ fontFamily: '"Noto Sans Hebrew", sans-serif' }}
        >
          צור חשבון חדש
        </button>
      </div>
    </AuthLayout>
  );
}
