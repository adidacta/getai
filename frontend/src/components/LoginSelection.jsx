import { useState, useEffect, useRef } from 'react';
import { useNavigate, useParams, useLocation } from 'react-router-dom';
import { Users, Briefcase, ArrowLeft, Phone, Mail, Lock, Eye, EyeOff, ArrowLeftRight } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import AuthLayout from './AuthLayout';

export default function LoginSelection() {
  const navigate = useNavigate();
  const { userType } = useParams();
  const location = useLocation();
  const { login, verifyOTP } = useAuth();
  const [selectedUserType, setSelectedUserType] = useState(userType || null);
  const [loginMethod, setLoginMethod] = useState('email'); // 'email' or 'otp'
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [showOTP, setShowOTP] = useState(false);

  // Form data for stakeholder login
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });

  // Form data for resident login
  const [phone, setPhone] = useState('');

  // OTP form data
  const [otp, setOtp] = useState(['', '', '', '']);
  const [resendCooldown, setResendCooldown] = useState(0);
  const inputRefs = [useRef(null), useRef(null), useRef(null), useRef(null)];

  // Sync selectedUserType with URL params
  useEffect(() => {
    if (userType) {
      setSelectedUserType(userType);
    }
  }, [userType]);

  // Check for remembered user type on mount (only if no URL param)
  useEffect(() => {
    if (!userType) {
      const remembered = localStorage.getItem('preferredUserType');
      if (remembered) {
        navigate(`/login/${remembered}`, { replace: true });
      }
    }
  }, [userType, navigate]);

  // Resend cooldown timer
  useEffect(() => {
    if (resendCooldown > 0) {
      const timer = setTimeout(() => setResendCooldown(resendCooldown - 1), 1000);
      return () => clearTimeout(timer);
    }
  }, [resendCooldown]);

  // Auto-focus first OTP input when OTP form shows
  useEffect(() => {
    if (showOTP && inputRefs[0].current) {
      inputRefs[0].current.focus();
    }
  }, [showOTP]);

  // Handle user type selection
  const handleSelectUserType = (type) => {
    localStorage.setItem('preferredUserType', type);
    setError('');
    navigate(`/login/${type}`);
  };

  // Handle back to user type selection
  const handleBack = () => {
    setSelectedUserType(null);
    setLoginMethod('email');
    setShowOTP(false);
    setError('');
    setFormData({ email: '', password: '' });
    setPhone('');
    setOtp(['', '', '', '']);
  };

  // Handle stakeholder login with email/password
  const handleStakeholderLogin = async (e) => {
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

  // Handle stakeholder login with OTP
  const handleStakeholderOTPLogin = async (e) => {
    e.preventDefault();

    if (!phone.trim()) {
      setError('Please enter a phone number');
      return;
    }

    setError('');
    setShowOTP(true);
    setResendCooldown(60);
  };

  // Handle resident login
  const handleResidentLogin = async (e) => {
    e.preventDefault();

    if (!phone.trim()) {
      setError('Please enter a phone number');
      return;
    }

    setError('');
    setShowOTP(true);
    setResendCooldown(60);
  };

  // Handle OTP input change
  const handleOTPChange = (index, value) => {
    if (value && !/^\d+$/.test(value)) return;

    const newOtp = [...otp];
    newOtp[index] = value.slice(-1);
    setOtp(newOtp);
    setError('');

    if (value && index < 3) {
      inputRefs[index + 1].current?.focus();
    }

    if (index === 3 && value && newOtp.every(digit => digit !== '')) {
      handleOTPSubmit(newOtp.join(''));
    }
  };

  // Handle OTP backspace
  const handleOTPKeyDown = (index, e) => {
    if (e.key === 'Backspace' && !otp[index] && index > 0) {
      inputRefs[index - 1].current?.focus();
    }
  };

  // Handle OTP paste
  const handleOTPPaste = (e) => {
    e.preventDefault();
    const pastedData = e.clipboardData.getData('text').slice(0, 4);
    if (!/^\d+$/.test(pastedData)) return;

    const newOtp = pastedData.split('').concat(['', '', '', '']).slice(0, 4);
    setOtp(newOtp);

    const nextIndex = Math.min(pastedData.length, 3);
    inputRefs[nextIndex].current?.focus();

    if (newOtp.every(digit => digit !== '')) {
      handleOTPSubmit(newOtp.join(''));
    }
  };

  // Handle OTP submission
  const handleOTPSubmit = async (code = otp.join('')) => {
    if (code.length !== 4) {
      setError('Please fill in all digits');
      return;
    }

    setLoading(true);
    setError('');

    try {
      const result = await verifyOTP(phone, code);

      if (result.success) {
        console.log('OTP verified, user logged in');
        alert('Login successful!');
        // navigate('/dashboard');
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

  // Handle resend OTP
  const handleResendOTP = () => {
    if (resendCooldown > 0) return;
    setResendCooldown(60);
    setError('');
    console.log('Resending OTP to:', phone);
    alert('Code has been resent');
  };

  const loginTypes = [
    {
      type: 'stakeholder',
      icon: Briefcase,
      title: 'Stakeholder',
      description: 'Lawyer, developer, contractor, appraiser, supervisor or consultant',
      subtitle: 'Sign in with email and password',
      gradient: 'from-indigo-500 to-purple-500',
      bgGradient: 'from-indigo-50 to-purple-50',
      hoverBorder: 'hover:border-indigo-200'
    },
    {
      type: 'resident',
      icon: Users,
      title: 'Resident',
      description: 'Property owner in an urban renewal project',
      subtitle: 'Sign in with phone number',
      gradient: 'from-blue-500 to-cyan-500',
      bgGradient: 'from-blue-50 to-cyan-50',
      hoverBorder: 'hover:border-blue-200'
    }
  ];

  // Render user type selection if no type selected
  if (!selectedUserType) {
    return (
      <AuthLayout>
        <div className="space-y-8 min-h-[400px]">
          <div className="text-center">
            <h2 className="text-3xl font-bold text-gray-900 mb-3" style={{ fontFamily: '"Noto Sans", sans-serif' }}>
              Welcome back
            </h2>
            <p className="text-sm text-gray-500" style={{ fontFamily: '"Noto Sans", sans-serif' }}>
              Please select your account type to login
            </p>
          </div>

          <div className="space-y-3">
            {loginTypes.map(({ type, icon: Icon, title, description, subtitle, gradient, bgGradient }) => (
              <button
                key={type}
                onClick={() => handleSelectUserType(type)}
                className={`group w-full p-6 bg-white hover:bg-gradient-to-br hover:${bgGradient} border-2 border-gray-200 hover:border-transparent rounded-2xl transition-all duration-200 hover:shadow-lg hover:scale-[1.02]`}
              >
                <div className="flex items-center gap-5">
                  <div className={`w-14 h-14 bg-gradient-to-br ${gradient} rounded-xl flex items-center justify-center shadow-md group-hover:shadow-lg transition-all`}>
                    <Icon className="w-7 h-7 text-white" />
                  </div>
                  <div className="flex-1 text-left">
                    <h3 className="text-lg font-bold text-gray-900 mb-0.5 transition-colors" style={{ fontFamily: '"Noto Sans", sans-serif' }}>
                      {title}
                    </h3>
                    <p className="text-xs text-gray-500 transition-colors mb-1.5" style={{ fontFamily: '"Noto Sans", sans-serif' }}>
                      {description}
                    </p>
                    <p className="text-xs text-gray-400 font-medium transition-colors" style={{ fontFamily: '"Noto Sans", sans-serif' }}>
                      {subtitle}
                    </p>
                  </div>
                </div>
              </button>
            ))}
          </div>

          {/* Divider */}
          <div className="relative py-4">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-gray-200"></div>
            </div>
          </div>

          {/* Sign Up Link */}
          <div className="text-center">
            <p className="text-sm text-gray-600 mb-3" style={{ fontFamily: '"Noto Sans", sans-serif' }}>
              Don't have an account yet?
            </p>
            <button
              onClick={() => navigate('/signup')}
              className="text-blue-600 hover:text-blue-700 font-semibold text-sm hover:underline transition-all"
              style={{ fontFamily: '"Noto Sans", sans-serif' }}>
              Create new account
            </button>
          </div>
        </div>
      </AuthLayout>
    );
  }

  // Render Stakeholder login form
  if (selectedUserType === 'stakeholder') {
    return (
      <AuthLayout>
        <div className="space-y-6 min-h-[400px]">
          <div>
            <div className="flex items-end justify-between mb-3">
              <h2 className="text-3xl font-bold text-gray-900 leading-none" style={{ fontFamily: '"Noto Sans", sans-serif' }}>
                Stakeholder Login
              </h2>
              <button
                onClick={() => navigate('/login/resident')}
                className="flex items-center gap-1.5 text-gray-600 hover:text-gray-900 transition-colors text-sm font-medium"
                aria-label="Switch to Resident"
              >
                <ArrowLeftRight className="w-4 h-4" />
                <span>Resident</span>
              </button>
            </div>
            <p className="text-sm text-gray-500" style={{ fontFamily: '"Noto Sans", sans-serif' }}>
              {loginMethod === 'email' ? 'Sign in with your email and password' : 'Sign in with your phone number'}
            </p>
          </div>

          {/* Login Method Toggle */}
          {!showOTP && (
            <div className="flex bg-gray-100 rounded-xl p-1">
              <button
                type="button"
                onClick={() => {
                  setLoginMethod('email');
                  setError('');
                }}
                className={`flex-1 py-2.5 px-4 rounded-lg text-sm font-semibold transition-all ${
                  loginMethod === 'email'
                    ? 'bg-white text-indigo-600 shadow-sm'
                    : 'text-gray-600 hover:text-gray-900'
                }`}
                style={{ fontFamily: '"Noto Sans", sans-serif' }}
              >
                Email
              </button>
              <button
                type="button"
                onClick={() => {
                  setLoginMethod('otp');
                  setError('');
                }}
                className={`flex-1 py-2.5 px-4 rounded-lg text-sm font-semibold transition-all ${
                  loginMethod === 'otp'
                    ? 'bg-white text-indigo-600 shadow-sm'
                    : 'text-gray-600 hover:text-gray-900'
                }`}
                style={{ fontFamily: '"Noto Sans", sans-serif' }}
              >
                Phone
              </button>
            </div>
          )}

          {!showOTP ? (
            <form onSubmit={loginMethod === 'email' ? handleStakeholderLogin : handleStakeholderOTPLogin} className="space-y-4 min-h-[280px]">
              {loginMethod === 'email' ? (
                <>
                  {/* Email Input */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2" style={{ fontFamily: '"Noto Sans", sans-serif' }}>
                      Email Address
                    </label>
                    <div className="relative">
                      <input
                        type="email"
                        value={formData.email}
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                        placeholder="you@example.com"
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
                        value={formData.password}
                        onChange={(e) => setFormData({ ...formData, password: e.target.value })}
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
                </>
              ) : (
                <>
                  {/* Phone Input for OTP */}
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
                        className="w-full px-4 py-3 pl-11 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all"
                        style={{ fontFamily: '"Noto Sans", sans-serif' }}
                      />
                      <Phone className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                    </div>
                  </div>
                </>
              )}

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
                    <span>{loginMethod === 'email' ? 'Sign In' : 'Send Verification Code'}</span>
                    <ArrowLeft className="w-5 h-5 rotate-180" />
                  </>
                )}
              </button>
            </form>
          ) : (
            <>
              {/* OTP Verification for Stakeholder */}
              <div className="text-center">
                <div className="relative mb-3">
                  <button
                    onClick={handleBack}
                    className="absolute left-0 top-1/2 -translate-y-1/2 text-gray-600 hover:text-gray-900 transition-colors"
                    aria-label="Back"
                  >
                    <ArrowLeft className="w-5 h-5" />
                  </button>
                  <h2 className="text-3xl font-bold text-gray-900" style={{ fontFamily: '"Noto Sans", sans-serif' }}>
                    Enter Verification Code
                  </h2>
                </div>
                <p className="text-sm text-gray-500 mb-1" style={{ fontFamily: '"Noto Sans", sans-serif' }}>
                  A 4-digit code was sent to
                </p>
                <p className="text-base font-semibold text-gray-800" style={{ fontFamily: '"Noto Sans", sans-serif' }}>
                  {phone}
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
                    onChange={(e) => handleOTPChange(index, e.target.value)}
                    onKeyDown={(e) => handleOTPKeyDown(index, e)}
                    onPaste={index === 0 ? handleOTPPaste : undefined}
                    disabled={loading}
                    className="w-14 h-14 text-center text-2xl font-bold bg-gray-50 border-2 border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all disabled:bg-gray-100"
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
                onClick={() => handleOTPSubmit()}
                disabled={loading || otp.some(digit => !digit)}
                className="w-full bg-gradient-to-r from-indigo-600 to-purple-600 text-white py-3.5 px-6 rounded-xl font-semibold shadow-lg shadow-indigo-500/30 hover:shadow-xl hover:shadow-indigo-500/40 disabled:opacity-50 disabled:cursor-not-allowed transition-all flex items-center justify-center gap-2"
                style={{ fontFamily: '"Noto Sans", sans-serif' }}
              >
                {loading ? (
                  <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                ) : (
                  <>
                    <span>Verify Code</span>
                    <ArrowLeft className="w-5 h-5 rotate-180" />
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
                    onClick={handleResendOTP}
                    className="text-sm text-indigo-600 hover:text-indigo-700 font-semibold"
                    style={{ fontFamily: '"Noto Sans", sans-serif' }}
                  >
                    Didn't receive a code? Resend
                  </button>
                )}
              </div>
            </>
          )}

          {!showOTP && (
            <>
              {/* Divider */}
              <div className="relative py-4">
                <div className="absolute inset-0 flex items-center">
                  <div className="w-full border-t border-gray-200"></div>
                </div>
              </div>

              {/* Sign Up Link */}
              <div className="text-center">
                <p className="text-sm text-gray-600 mb-3" style={{ fontFamily: '"Noto Sans", sans-serif' }}>
                  Don't have an account yet?
                </p>
                <button
                  onClick={() => navigate('/signup')}
                  className="text-blue-600 hover:text-blue-700 font-semibold text-sm hover:underline transition-all"
                  style={{ fontFamily: '"Noto Sans", sans-serif' }}>
                  Create new account
                </button>
              </div>
            </>
          )}
        </div>
      </AuthLayout>
    );
  }

  // Render Resident login form
  if (selectedUserType === 'resident') {
    return (
      <AuthLayout>
        <div className="space-y-6 min-h-[400px]">
          {!showOTP ? (
            <>
              <div>
                <div className="flex items-end justify-between mb-3">
                  <h2 className="text-3xl font-bold text-gray-900 leading-none" style={{ fontFamily: '"Noto Sans", sans-serif' }}>
                    Resident Login
                  </h2>
                  <button
                    onClick={() => navigate('/login/stakeholder')}
                    className="flex items-center gap-1.5 text-gray-600 hover:text-gray-900 transition-colors text-sm font-medium"
                    aria-label="Switch to Stakeholder"
                  >
                    <ArrowLeftRight className="w-4 h-4" />
                    <span>Stakeholder</span>
                  </button>
                </div>
                <p className="text-sm text-gray-500" style={{ fontFamily: '"Noto Sans", sans-serif' }}>
                  Sign in with your phone number
                </p>
              </div>

              <form onSubmit={handleResidentLogin} className="space-y-4">
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
                  className="w-full bg-gradient-to-r from-blue-600 to-cyan-600 text-white py-3.5 px-6 rounded-xl font-semibold shadow-lg shadow-blue-500/30 hover:shadow-xl hover:shadow-blue-500/40 disabled:opacity-50 disabled:cursor-not-allowed transition-all flex items-center justify-center gap-2"
                  style={{ fontFamily: '"Noto Sans", sans-serif' }}
                >
                  {loading ? (
                    <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                  ) : (
                    <>
                      <span>Send Verification Code</span>
                      <ArrowLeft className="w-5 h-5 rotate-180" />
                    </>
                  )}
                </button>
              </form>

              {/* Divider */}
              <div className="relative py-4">
                <div className="absolute inset-0 flex items-center">
                  <div className="w-full border-t border-gray-200"></div>
                </div>
              </div>

              {/* Sign Up Link */}
              <div className="text-center">
                <p className="text-sm text-gray-600 mb-3" style={{ fontFamily: '"Noto Sans", sans-serif' }}>
                  Don't have an account yet?
                </p>
                <button
                  onClick={() => navigate('/signup')}
                  className="text-blue-600 hover:text-blue-700 font-semibold text-sm hover:underline transition-all"
                  style={{ fontFamily: '"Noto Sans", sans-serif' }}>
                  Create new account
                </button>
              </div>
            </>
          ) : (
            <>
              {/* OTP Verification */}
              <div className="text-center">
                <div className="relative mb-3">
                  <button
                    onClick={handleBack}
                    className="absolute left-0 top-1/2 -translate-y-1/2 text-gray-600 hover:text-gray-900 transition-colors"
                    aria-label="Back"
                  >
                    <ArrowLeft className="w-5 h-5" />
                  </button>
                  <h2 className="text-3xl font-bold text-gray-900" style={{ fontFamily: '"Noto Sans", sans-serif' }}>
                    Enter Verification Code
                  </h2>
                </div>
                <p className="text-sm text-gray-500 mb-1" style={{ fontFamily: '"Noto Sans", sans-serif' }}>
                  A 4-digit code was sent to
                </p>
                <p className="text-base font-semibold text-gray-800" style={{ fontFamily: '"Noto Sans", sans-serif' }}>
                  {phone}
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
                    onChange={(e) => handleOTPChange(index, e.target.value)}
                    onKeyDown={(e) => handleOTPKeyDown(index, e)}
                    onPaste={index === 0 ? handleOTPPaste : undefined}
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
                onClick={() => handleOTPSubmit()}
                disabled={loading || otp.some(digit => !digit)}
                className="w-full bg-gradient-to-r from-blue-600 to-cyan-600 text-white py-3.5 px-6 rounded-xl font-semibold shadow-lg shadow-blue-500/30 hover:shadow-xl hover:shadow-blue-500/40 disabled:opacity-50 disabled:cursor-not-allowed transition-all flex items-center justify-center gap-2"
                style={{ fontFamily: '"Noto Sans", sans-serif' }}
              >
                {loading ? (
                  <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                ) : (
                  <>
                    <span>Verify Code</span>
                    <ArrowLeft className="w-5 h-5 rotate-180" />
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
                    onClick={handleResendOTP}
                    className="text-sm text-blue-600 hover:text-blue-700 font-semibold"
                    style={{ fontFamily: '"Noto Sans", sans-serif' }}
                  >
                    Didn't receive a code? Resend
                  </button>
                )}
              </div>
            </>
          )}
        </div>
      </AuthLayout>
    );
  }
}
