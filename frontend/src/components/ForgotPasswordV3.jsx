import { useState, useRef, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Mail, ArrowLeft, CheckCircle, Menu, X, Users, Hammer, Shield, ChevronDown, Scale, LayoutGrid, BookOpen, FileText } from 'lucide-react';
import { useAuth } from '../context/AuthContext';

export default function ForgotPasswordV3() {
  const navigate = useNavigate();
  const { requestPasswordReset } = useAuth();
  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [stakeholderDropdownOpen, setStakeholderDropdownOpen] = useState(false);
  const [knowledgeDropdownOpen, setKnowledgeDropdownOpen] = useState(false);

  const stakeholderDropdownRef = useRef(null);
  const knowledgeDropdownRef = useRef(null);

  // Close dropdowns when clicking outside
  useEffect(() => {
    function handleClickOutside(event) {
      if (stakeholderDropdownRef.current && !stakeholderDropdownRef.current.contains(event.target)) {
        setStakeholderDropdownOpen(false);
      }
      if (knowledgeDropdownRef.current && !knowledgeDropdownRef.current.contains(event.target)) {
        setKnowledgeDropdownOpen(false);
      }
    }

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

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
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-blue-50">
      {/* Header - Fiverr Style */}
      <header className="bg-white border-b border-gray-200 sticky top-0 z-50 shadow-sm">
        <div className="max-w-full px-6">
          <div className="flex items-center justify-between h-16">
            {/* Left Side - Logo */}
            <div className="flex items-center">
              <button onClick={() => navigate('/')} className="flex items-center gap-2">
                <img src="/logo.png" alt="GetStatus" className="h-10" />
              </button>
            </div>

            {/* Center - Desktop Navigation */}
            <div className="hidden md:flex items-center gap-6 absolute left-1/2 -translate-x-1/2">
              {/* Stakeholder Dropdown */}
              <div className="relative" ref={stakeholderDropdownRef}>
                <button
                  onClick={() => setStakeholderDropdownOpen(!stakeholderDropdownOpen)}
                  className="text-gray-700 hover:text-blue-600 transition-colors font-medium text-base flex items-center gap-1"
                >
                  Stakeholder
                  <ChevronDown className={`w-4 h-4 transition-transform ${stakeholderDropdownOpen ? 'rotate-180' : ''}`} />
                </button>
                {stakeholderDropdownOpen && (
                  <div className="absolute top-full left-0 mt-2 w-48 bg-white border border-gray-200 rounded-lg shadow-lg py-2 z-50">
                    <button className="w-full text-left px-4 py-2 text-gray-700 hover:bg-blue-50 hover:text-blue-600 transition-colors flex items-center gap-2">
                      <Scale className="w-4 h-4" />
                      Lawyers
                    </button>
                    <button className="w-full text-left px-4 py-2 text-gray-700 hover:bg-blue-50 hover:text-blue-600 transition-colors flex items-center gap-2">
                      <Hammer className="w-4 h-4" />
                      Builders
                    </button>
                    <button className="w-full text-left px-4 py-2 text-gray-700 hover:bg-blue-50 hover:text-blue-600 transition-colors flex items-center gap-2">
                      <Shield className="w-4 h-4" />
                      Supervisors
                    </button>
                    <button className="w-full text-left px-4 py-2 text-gray-700 hover:bg-blue-50 hover:text-blue-600 transition-colors flex items-center gap-2">
                      <LayoutGrid className="w-4 h-4" />
                      Other
                    </button>
                  </div>
                )}
              </div>

              <button className="text-gray-700 hover:text-blue-600 transition-colors font-medium text-base">
                Projects
              </button>

              {/* Knowledge base Dropdown */}
              <div className="relative" ref={knowledgeDropdownRef}>
                <button
                  onClick={() => setKnowledgeDropdownOpen(!knowledgeDropdownOpen)}
                  className="text-gray-700 hover:text-blue-600 transition-colors font-medium text-base flex items-center gap-1"
                >
                  Knowledge base
                  <ChevronDown className={`w-4 h-4 transition-transform ${knowledgeDropdownOpen ? 'rotate-180' : ''}`} />
                </button>
                {knowledgeDropdownOpen && (
                  <div className="absolute top-full left-0 mt-2 w-48 bg-white border border-gray-200 rounded-lg shadow-lg py-2 z-50">
                    <button className="w-full text-left px-4 py-2 text-gray-700 hover:bg-blue-50 hover:text-blue-600 transition-colors flex items-center gap-2">
                      <BookOpen className="w-4 h-4" />
                      Guides
                    </button>
                    <button className="w-full text-left px-4 py-2 text-gray-700 hover:bg-blue-50 hover:text-blue-600 transition-colors flex items-center gap-2">
                      <FileText className="w-4 h-4" />
                      Articles
                    </button>
                  </div>
                )}
              </div>

              <button className="text-gray-700 hover:text-blue-600 transition-colors font-medium text-base">
                Posts
              </button>
              <button className="text-gray-700 hover:text-blue-600 transition-colors font-medium text-base">
                Marketplace
              </button>
            </div>

            {/* Right Side - CTAs */}
            <div className="hidden md:flex items-center gap-4">
              {/* Stakeholders Zone */}
              <button
                onClick={() => navigate('/login3/stakeholder')}
                className="text-gray-700 hover:text-gray-900 transition-colors font-medium text-base"
              >
                Stakeholders Zone
              </button>

              {/* Divider */}
              <div className="w-px h-6 bg-gray-300"></div>

              {/* Project Status (Primary CTA) */}
              <button
                onClick={() => navigate('/login3/resident')}
                className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2.5 rounded-lg font-medium text-base transition-all"
              >
                Project Status
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
              {/* Stakeholder Section */}
              <div className="px-4">
                <div className="text-xs font-semibold text-gray-500 uppercase mb-2">Stakeholder</div>
                <button className="block w-full text-left py-2 pl-4 text-gray-700 hover:bg-gray-50 transition-colors flex items-center gap-2">
                  <Scale className="w-4 h-4" />
                  Lawyers
                </button>
                <button className="block w-full text-left py-2 pl-4 text-gray-700 hover:bg-gray-50 transition-colors flex items-center gap-2">
                  <Hammer className="w-4 h-4" />
                  Builders
                </button>
                <button className="block w-full text-left py-2 pl-4 text-gray-700 hover:bg-gray-50 transition-colors flex items-center gap-2">
                  <Shield className="w-4 h-4" />
                  Supervisors
                </button>
                <button className="block w-full text-left py-2 pl-4 text-gray-700 hover:bg-gray-50 transition-colors flex items-center gap-2">
                  <LayoutGrid className="w-4 h-4" />
                  Other
                </button>
              </div>

              <button className="block w-full text-left px-4 py-2 text-gray-700 hover:bg-gray-50 transition-colors">
                Projects
              </button>

              {/* Knowledge base Section */}
              <div className="px-4">
                <div className="text-xs font-semibold text-gray-500 uppercase mb-2">Knowledge base</div>
                <button className="block w-full text-left py-2 pl-4 text-gray-700 hover:bg-gray-50 transition-colors flex items-center gap-2">
                  <BookOpen className="w-4 h-4" />
                  Guides
                </button>
                <button className="block w-full text-left py-2 pl-4 text-gray-700 hover:bg-gray-50 transition-colors flex items-center gap-2">
                  <FileText className="w-4 h-4" />
                  Articles
                </button>
              </div>

              <button className="block w-full text-left px-4 py-2 text-gray-700 hover:bg-gray-50 transition-colors">
                Posts
              </button>
              <button className="block w-full text-left px-4 py-2 text-gray-700 hover:bg-gray-50 transition-colors">
                Marketplace
              </button>
              <div className="border-t border-gray-200 my-2"></div>
              <button
                onClick={() => navigate('/login3/stakeholder')}
                className="block w-full text-left px-4 py-2 text-gray-700 hover:bg-gray-50 transition-colors"
              >
                Stakeholders Zone
              </button>
              <button
                onClick={() => navigate('/login3/resident')}
                className="block w-full mx-4 bg-blue-600 text-white px-5 py-2 rounded-lg font-medium transition-all"
              >
                Project Status
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
            {!success ? (
              <>
                {/* Title */}
                <h1 className="text-4xl lg:text-5xl font-bold text-gray-900 mb-4">
                  Reset Password
                </h1>

                {/* Subtitle */}
                <p className="text-lg text-gray-600 mb-8">
                  Enter your email address and we'll send you a link to reset your password
                </p>

                {/* Form */}
                <form onSubmit={handleSubmit} className="space-y-6">
                  {/* Email Input */}
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">
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
                        className={`w-full px-4 py-4 pl-12 text-lg border-2 rounded-xl focus:outline-none focus:ring-2 transition-all ${
                          error
                            ? 'border-red-300 focus:border-red-500 focus:ring-red-200'
                            : 'border-gray-200 focus:border-blue-500 focus:ring-blue-200'
                        }`}
                      />
                      <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                    </div>
                  </div>

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

                  {/* Submit Button */}
                  <button
                    type="submit"
                    disabled={loading}
                    className="w-full bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 text-white font-semibold py-4 px-8 rounded-xl transition-all transform hover:scale-[1.02] active:scale-[0.98] shadow-lg shadow-blue-500/30 hover:shadow-blue-500/50 text-lg flex items-center justify-center gap-2 group disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    {loading ? (
                      <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                    ) : (
                      <>
                        Send Reset Link
                        <ArrowLeft className="w-5 h-5 rotate-180 group-hover:translate-x-1 transition-transform" />
                      </>
                    )}
                  </button>

                  {/* Back Link */}
                  <button
                    type="button"
                    onClick={() => navigate(-1)}
                    className="w-full text-gray-600 hover:text-gray-800 py-2 font-medium text-sm flex items-center justify-center gap-2"
                  >
                    <ArrowLeft className="w-4 h-4" />
                    Back to login
                  </button>
                </form>
              </>
            ) : (
              /* Success State */
              <>
                {/* Success Icon */}
                <div className="w-24 h-24 bg-emerald-100 rounded-full flex items-center justify-center mb-6">
                  <CheckCircle className="w-14 h-14 text-emerald-600" />
                </div>

                {/* Title */}
                <h1 className="text-4xl lg:text-5xl font-bold text-gray-900 mb-4">
                  Check Your Email
                </h1>

                {/* Message */}
                <div className="mb-8">
                  <p className="text-lg text-gray-600 mb-2">
                    We've sent a password reset link to:
                  </p>
                  <p className="text-xl font-semibold text-gray-900 mb-4">
                    {email}
                  </p>
                  <p className="text-sm text-gray-500">
                    Check your inbox and click the link to reset your password. The link will expire in 24 hours.
                  </p>
                </div>

                {/* Back to Login Button */}
                <button
                  onClick={() => navigate('/login3/stakeholder')}
                  className="w-full bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 text-white font-semibold py-4 px-8 rounded-xl transition-all transform hover:scale-[1.02] active:scale-[0.98] shadow-lg shadow-blue-500/30 hover:shadow-blue-500/50 text-lg flex items-center justify-center gap-2 group"
                >
                  Back to Login
                  <ArrowLeft className="w-5 h-5 rotate-180 group-hover:translate-x-1 transition-transform" />
                </button>

                {/* Resend Link */}
                <p className="text-sm text-gray-500 text-center mt-6">
                  Didn't receive the email?{' '}
                  <button
                    onClick={() => setSuccess(false)}
                    className="text-blue-600 hover:text-blue-700 font-medium hover:underline"
                  >
                    Try again
                  </button>
                </p>
              </>
            )}
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
