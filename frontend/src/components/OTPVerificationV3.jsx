import { useState, useRef, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { Phone, Mail, ArrowLeft, Menu, X, Users, Hammer, Shield, CheckCircle } from 'lucide-react';
import { useAuth } from '../context/AuthContext';

export default function OTPVerificationV3() {
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
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

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
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-blue-50">
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
              {/* For Professionals Link */}
              <button
                onClick={() => navigate('/login2/stakeholder')}
                className="text-gray-700 hover:text-blue-600 transition-colors font-medium text-sm flex items-center gap-1.5"
              >
                <Hammer className="w-4 h-4" />
                For Professionals
              </button>

              {/* Divider */}
              <div className="w-px h-6 bg-gray-300"></div>

              {/* Sign In */}
              <button
                onClick={() => navigate('/login/resident')}
                className="text-gray-700 hover:text-gray-900 transition-colors font-medium text-sm"
              >
                Sign In
              </button>

              {/* Get Started (Primary CTA) */}
              <button
                onClick={() => navigate('/login2/resident')}
                className="bg-blue-600 hover:bg-blue-700 text-white px-5 py-2 rounded-lg font-medium text-sm transition-all"
              >
                Get Started
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
                onClick={() => navigate('/login2/stakeholder')}
                className="block w-full text-left px-4 py-2 text-blue-600 hover:bg-blue-50 transition-colors font-medium"
              >
                For Professionals
              </button>
              <button
                onClick={() => navigate('/login/resident')}
                className="block w-full text-left px-4 py-2 text-gray-700 hover:bg-gray-50 transition-colors"
              >
                Sign In
              </button>
              <button
                onClick={() => navigate('/login2/resident')}
                className="block w-full mx-4 bg-blue-600 text-white px-5 py-2 rounded-lg font-medium transition-all"
              >
                Get Started
              </button>
            </div>
          )}
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 lg:py-20">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-start">
          {/* Left Column - OTP Form */}
          <div className="order-2 lg:order-1">
            {/* Title */}
            <h1 className="text-4xl lg:text-5xl font-bold text-gray-900 mb-4">
              Verify Your Code
            </h1>

            {/* Subtitle */}
            <p className="text-lg text-gray-600 mb-8">
              A 4-digit code was sent to <strong>{phone || email}</strong>
            </p>

            {/* OTP Input */}
            <div className="mb-6">
              <label className="block text-sm font-semibold text-gray-700 mb-4">
                Enter Verification Code
              </label>
              <div className="flex justify-start gap-3">
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
                    className="w-16 h-16 text-center text-2xl font-bold bg-white border-2 border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all disabled:bg-gray-100"
                  />
                ))}
              </div>
            </div>

            {/* Error Message */}
            {error && (
              <div className="bg-red-50 border border-red-200 rounded-lg px-4 py-3 mb-6">
                <p className="text-sm text-red-700 flex items-center gap-2">
                  <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                  </svg>
                  {error}
                </p>
              </div>
            )}

            {/* Submit Button */}
            <button
              onClick={() => handleSubmit()}
              disabled={loading || otp.some(digit => !digit)}
              className="w-full bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 text-white font-semibold py-4 px-8 rounded-xl transition-all transform hover:scale-[1.02] active:scale-[0.98] shadow-lg shadow-blue-500/30 hover:shadow-blue-500/50 text-lg flex items-center justify-center gap-2 group disabled:opacity-50 disabled:cursor-not-allowed mb-6"
            >
              {loading ? (
                <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
              ) : (
                <>
                  Verify Code
                  <ArrowLeft className="w-5 h-5 rotate-180 group-hover:translate-x-1 transition-transform" />
                </>
              )}
            </button>

            {/* Resend */}
            <div className="text-center mb-6">
              {resendCooldown > 0 ? (
                <p className="text-sm text-gray-500">
                  Resend in {resendCooldown} seconds
                </p>
              ) : (
                <button
                  onClick={handleResend}
                  className="text-sm text-blue-600 hover:text-blue-700 font-semibold hover:underline"
                >
                  Didn't receive a code? Resend
                </button>
              )}
            </div>

            {/* Back Link */}
            <button
              onClick={() => navigate(-1)}
              className="w-full text-gray-600 hover:text-gray-800 py-2 font-medium text-sm flex items-center justify-center gap-2"
            >
              <ArrowLeft className="w-4 h-4" />
              Back to login
            </button>
          </div>

          {/* Right Column - Illustration */}
          <div className="order-1 lg:order-2">
            <div className="relative max-w-md w-full mx-auto">
              {/* Background Decoration */}
              <div className="absolute -top-4 -right-4 w-72 h-72 bg-blue-200/20 rounded-full blur-3xl"></div>
              <div className="absolute -bottom-4 -left-4 w-72 h-72 bg-indigo-200/20 rounded-full blur-3xl"></div>

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
