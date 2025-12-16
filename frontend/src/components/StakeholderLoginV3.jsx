import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Mail, Lock, Eye, EyeOff, ArrowLeft, Briefcase, Shield, CheckCircle, Menu, X, Users, Hammer, TrendingUp, Phone } from 'lucide-react';
import { useAuth } from '../context/AuthContext';

export default function StakeholderLoginV3() {
  const navigate = useNavigate();
  const { login } = useAuth();
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [loginMethod, setLoginMethod] = useState('email'); // 'email' or 'phone'
  const [formData, setFormData] = useState({
    email: '',
    phone: '',
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
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-indigo-50">
      {/* Header - Fiverr Style */}
      <header className="bg-white border-b border-gray-200 sticky top-0 z-50 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            {/* Left Side - Logo & Main Nav */}
            <div className="flex items-center gap-8">
              {/* Logo */}
              <button onClick={() => navigate('/')} className="flex items-center gap-2">
                <img src="/logo.png" alt="GetStatus" className="h-8" />
              </button>

              {/* Desktop Navigation */}
              <div className="hidden md:flex items-center gap-6">
                <button className="text-gray-700 hover:text-blue-600 transition-colors font-medium text-sm">
                  Browse Projects
                </button>
                <button className="text-gray-700 hover:text-blue-600 transition-colors font-medium text-sm">
                  Knowledge Base
                </button>
                <button className="text-gray-700 hover:text-blue-600 transition-colors font-medium text-sm">
                  Posts
                </button>
              </div>
            </div>

            {/* Right Side - CTAs */}
            <div className="hidden md:flex items-center gap-4">
              {/* For Residents Link */}
              <button
                onClick={() => navigate('/login2/resident')}
                className="text-gray-700 hover:text-blue-600 transition-colors font-medium text-sm flex items-center gap-1.5"
              >
                <Users className="w-4 h-4" />
                For Residents
              </button>

              {/* Divider */}
              <div className="w-px h-6 bg-gray-300"></div>

              {/* Sign Up */}
              <button
                onClick={() => navigate('/signup/stakeholder')}
                className="text-gray-700 hover:text-gray-900 transition-colors font-medium text-sm"
              >
                Sign Up
              </button>

              {/* Join Network (Primary CTA) */}
              <button
                onClick={() => navigate('/login2/stakeholder')}
                className="bg-indigo-600 hover:bg-indigo-700 text-white px-5 py-2 rounded-lg font-medium text-sm transition-all"
              >
                Join Network
              </button>
            </div>

            {/* Mobile Menu Button */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="md:hidden text-gray-700 hover:text-gray-900"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>

          {/* Mobile Menu */}
          {mobileMenuOpen && (
            <div className="md:hidden border-t border-gray-200 py-4 space-y-3">
              <button className="block w-full text-left px-4 py-2 text-gray-700 hover:bg-gray-50 transition-colors">
                Browse Projects
              </button>
              <button className="block w-full text-left px-4 py-2 text-gray-700 hover:bg-gray-50 transition-colors">
                Knowledge Base
              </button>
              <button className="block w-full text-left px-4 py-2 text-gray-700 hover:bg-gray-50 transition-colors">
                Posts
              </button>
              <div className="border-t border-gray-200 my-2"></div>
              <button
                onClick={() => navigate('/login2/resident')}
                className="block w-full text-left px-4 py-2 text-blue-600 hover:bg-blue-50 transition-colors font-medium"
              >
                For Residents
              </button>
              <button
                onClick={() => navigate('/signup/stakeholder')}
                className="block w-full text-left px-4 py-2 text-gray-700 hover:bg-gray-50 transition-colors"
              >
                Sign Up
              </button>
              <button
                onClick={() => navigate('/login2/stakeholder')}
                className="block w-full mx-4 bg-indigo-600 text-white px-5 py-2 rounded-lg font-medium transition-all"
              >
                Join Network
              </button>
            </div>
          )}
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 lg:py-20">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-start">
          {/* Left Column - Form */}
          <div className="order-2 lg:order-1">
            {/* Title */}
            <h1 className="text-4xl lg:text-5xl font-bold text-gray-900 mb-8">
              Professional Login
            </h1>

            {/* Form */}
            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Login Method Tabs */}
              <div className="flex gap-3">
                <button
                  type="button"
                  onClick={() => setLoginMethod('email')}
                  className={`flex-1 py-3 px-4 rounded-lg font-medium text-sm transition-all flex items-center justify-center gap-2 ${
                    loginMethod === 'email'
                      ? 'bg-indigo-600 text-white shadow-md'
                      : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                  }`}
                >
                  <Mail className="w-4 h-4" />
                  Login with Email
                </button>
                <button
                  type="button"
                  onClick={() => setLoginMethod('phone')}
                  className={`flex-1 py-3 px-4 rounded-lg font-medium text-sm transition-all flex items-center justify-center gap-2 ${
                    loginMethod === 'phone'
                      ? 'bg-indigo-600 text-white shadow-md'
                      : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                  }`}
                >
                  <Phone className="w-4 h-4" />
                  Login with Phone
                </button>
              </div>

              {/* Email/Phone Input */}
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  {loginMethod === 'email' ? 'Email Address' : 'Mobile Number'}
                </label>
                <div className="relative">
                  <input
                    type={loginMethod === 'email' ? 'email' : 'tel'}
                    name={loginMethod === 'email' ? 'email' : 'phone'}
                    value={loginMethod === 'email' ? formData.email : formData.phone}
                    onChange={handleInputChange}
                    placeholder={loginMethod === 'email' ? 'your@company.com' : '+972-50-123-4567'}
                    className={`w-full px-4 py-4 pl-12 text-lg border-2 rounded-xl focus:outline-none focus:ring-2 transition-all ${
                      error
                        ? 'border-red-300 focus:border-red-500 focus:ring-red-200'
                        : 'border-gray-200 focus:border-indigo-500 focus:ring-indigo-200'
                    }`}
                  />
                  {loginMethod === 'email' ? (
                    <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                  ) : (
                    <Phone className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                  )}
                </div>
              </div>

              {/* Password Input - Only for Email Login */}
              {loginMethod === 'email' && (
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <label className="block text-sm font-semibold text-gray-700">
                      Password
                    </label>
                    <button
                      type="button"
                      onClick={() => navigate('/forgot-password3')}
                      className="text-sm text-indigo-600 hover:text-indigo-700 font-medium"
                    >
                      Forgot password?
                    </button>
                  </div>
                  <div className="relative">
                    <input
                      type={showPassword ? 'text' : 'password'}
                      name="password"
                      value={formData.password}
                      onChange={handleInputChange}
                      placeholder="••••••••"
                      className={`w-full px-4 py-4 pl-12 pr-12 text-lg border-2 rounded-xl focus:outline-none focus:ring-2 transition-all ${
                        error
                          ? 'border-red-300 focus:border-red-500 focus:ring-red-200'
                          : 'border-gray-200 focus:border-indigo-500 focus:ring-indigo-200'
                      }`}
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
              )}

              {/* Error Message */}
              {error && (
                <div className="bg-red-50 border border-red-200 rounded-lg px-4 py-3">
                  <p className="text-sm text-red-700 flex items-center gap-2">
                    <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                    </svg>
                    {error}
                  </p>
                </div>
              )}

              {/* Submit Button - Different for Email vs Phone */}
              {loginMethod === 'email' ? (
                <>
                  {/* Email Login: Sign In with Password */}
                  <button
                    type="submit"
                    disabled={loading}
                    className="w-full bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 text-white font-semibold py-4 px-8 rounded-xl transition-all transform hover:scale-[1.02] active:scale-[0.98] shadow-lg shadow-indigo-500/30 hover:shadow-indigo-500/50 text-lg flex items-center justify-center gap-2 group disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    {loading ? (
                      <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                    ) : (
                      <>
                        Sign In with Password
                        <ArrowLeft className="w-5 h-5 rotate-180 group-hover:translate-x-1 transition-transform" />
                      </>
                    )}
                  </button>

                  {/* Divider with OR */}
                  <div className="relative py-2">
                    <div className="absolute inset-0 flex items-center">
                      <div className="w-full border-t border-gray-300"></div>
                    </div>
                    <div className="relative flex justify-center">
                      <span className="bg-gradient-to-br from-slate-50 via-white to-indigo-50 px-4 text-sm font-medium text-gray-500">
                        OR
                      </span>
                    </div>
                  </div>

                  {/* Alternative Login Option - OTP for Email */}
                  <button
                    type="button"
                    onClick={() => navigate('/verify-otp3', { state: { email: formData.email } })}
                    className="w-full bg-white border-2 border-indigo-200 text-indigo-700 py-3.5 px-6 rounded-xl font-semibold hover:bg-indigo-50 hover:border-indigo-300 transition-all flex items-center justify-center gap-2"
                  >
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                    </svg>
                    Sign In with One-Time Code Instead
                  </button>
                </>
              ) : (
                <>
                  {/* Phone Login: Get OTP Code */}
                  <button
                    type="button"
                    onClick={() => navigate('/verify-otp3', { state: { phone: formData.phone } })}
                    disabled={!formData.phone}
                    className="w-full bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 text-white font-semibold py-4 px-8 rounded-xl transition-all transform hover:scale-[1.02] active:scale-[0.98] shadow-lg shadow-indigo-500/30 hover:shadow-indigo-500/50 text-lg flex items-center justify-center gap-2 group disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                    </svg>
                    Get Verification Code
                    <ArrowLeft className="w-5 h-5 rotate-180 group-hover:translate-x-1 transition-transform" />
                  </button>
                </>
              )}

              {/* Help Text */}
              <p className="text-sm text-gray-500 text-center">
                New to GetStatus?{' '}
                <button
                  type="button"
                  onClick={() => navigate('/signup/stakeholder')}
                  className="text-indigo-600 hover:text-indigo-700 font-medium hover:underline"
                >
                  Create an account
                </button>
              </p>
            </form>
          </div>

          {/* Right Column - Illustration */}
          <div className="order-1 lg:order-2">
            <div className="relative max-w-md w-full mx-auto space-y-6">
              {/* Background Decoration */}
              <div className="absolute -top-4 -right-4 w-72 h-72 bg-indigo-200/20 rounded-full blur-3xl"></div>
              <div className="absolute -bottom-4 -left-4 w-72 h-72 bg-purple-200/20 rounded-full blur-3xl"></div>

              {/* Phone Mockup - Project Management */}
              <div className="relative z-10">
                <div className="w-80 h-[600px] bg-gradient-to-b from-gray-900 to-black rounded-[3rem] border-8 border-gray-800 shadow-2xl overflow-hidden mx-auto">
                  {/* Phone Content */}
                  <div className="bg-white h-full p-6 overflow-hidden">
                    <div className="flex items-center justify-between mb-4">
                      <button className="text-gray-600">←</button>
                      <div className="text-center">
                        <div className="text-sm font-semibold text-gray-900">Project Timeline</div>
                        <div className="text-xs text-gray-500">Urban Renewal Management</div>
                      </div>
                      <div className="w-6"></div>
                    </div>

                    {/* Project Status Card */}
                    <div className="bg-gradient-to-br from-indigo-50 to-purple-50 border border-indigo-200 rounded-lg p-4 mb-4">
                      <div className="flex items-start gap-3">
                        <div className="bg-indigo-500 text-white rounded-lg p-2">
                          <Shield className="w-5 h-5" />
                        </div>
                        <div className="flex-1">
                          <div className="text-sm font-semibold text-gray-900 mb-1">
                            Managing with Transparency
                          </div>
                          <div className="text-xs text-gray-600">
                            Real-time updates for all residents
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Timeline Items */}
                    <div className="space-y-3">
                      {[
                        { label: 'Planning', status: 'completed' },
                        { label: 'Approvals', status: 'completed' },
                        { label: 'Design Phase', status: 'completed' },
                        { label: 'Permits', status: 'in-progress' },
                        { label: 'Construction', status: 'pending' },
                        { label: 'Handover', status: 'pending' }
                      ].map((item, idx) => (
                        <div key={idx} className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg border border-gray-200">
                          <div className={`w-5 h-5 rounded-full flex items-center justify-center ${
                            item.status === 'completed' ? 'bg-emerald-500' :
                            item.status === 'in-progress' ? 'bg-blue-500 animate-pulse' :
                            'bg-gray-300'
                          }`}>
                            {item.status === 'completed' && (
                              <CheckCircle className="w-3 h-3 text-white" />
                            )}
                          </div>
                          <span className={`text-sm ${
                            item.status === 'pending' ? 'text-gray-400' : 'text-gray-700'
                          }`}>
                            {item.label}
                          </span>
                        </div>
                      ))}
                    </div>

                    {/* Stats */}
                    <div className="mt-6 grid grid-cols-2 gap-3">
                      <div className="bg-blue-50 rounded-lg p-3 text-center">
                        <div className="text-2xl font-bold text-blue-600">142</div>
                        <div className="text-xs text-gray-600">Residents</div>
                      </div>
                      <div className="bg-emerald-50 rounded-lg p-3 text-center">
                        <div className="text-2xl font-bold text-emerald-600">89%</div>
                        <div className="text-xs text-gray-600">Signed</div>
                      </div>
                    </div>
                  </div>
                </div>
                {/* Phone notch */}
                <div className="absolute top-0 left-1/2 -translate-x-1/2 w-40 h-7 bg-gray-900 rounded-b-2xl"></div>
              </div>
            </div>
          </div>
        </div>
      </main>

      {/* Footer - Compact */}
      <footer className="bg-gray-900 text-gray-400 py-8 mt-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col sm:flex-row justify-between items-center gap-4">
            <p className="text-sm">© 2025 GetStatus. All rights reserved.</p>
            <div className="flex gap-6 text-sm">
              <a href="#" className="hover:text-white transition-colors">About</a>
              <a href="#" className="hover:text-white transition-colors">Privacy Policy</a>
              <a href="#" className="hover:text-white transition-colors">Terms of Service</a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
