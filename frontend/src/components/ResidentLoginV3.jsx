import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Mail, Phone, ArrowLeft, Building2, Users, FileText, Shield, CheckCircle, MapPin, Instagram, Linkedin, Facebook, Hammer, Menu, X } from 'lucide-react';

export default function ResidentLoginV3() {
  const navigate = useNavigate();
  const [contact, setContact] = useState('');
  const [error, setError] = useState('');
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const handleContinue = (e) => {
    e.preventDefault();
    if (!contact.trim()) {
      setError('Required Fields Missing');
      return;
    }
    setError('');
    // Navigate to signup with contact info
    navigate('/signup/resident', { state: { contact } });
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
              {/* For Professionals Link (Like "Become a Seller") */}
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

              {/* Get Started (Primary CTA for Residents) */}
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
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          {/* Left Column - Form */}
          <div className="order-2 lg:order-1">
            {/* Title */}
            <h1 className="text-4xl lg:text-5xl font-bold text-gray-900 mb-6">
              Login
            </h1>

            {/* Educational Content */}
            <div className="bg-blue-50 border-l-4 border-blue-500 p-6 rounded-lg mb-8">
              <div className="flex items-start gap-3">
                <Building2 className="w-6 h-6 text-blue-600 flex-shrink-0 mt-1" />
                <div>
                  <p className="text-gray-700 leading-relaxed mb-3">
                    <strong>GetStatus</strong> is where all your urban renewal project updates live.
                  </p>
                  <ul className="text-gray-700 space-y-1.5 text-sm">
                    <li className="flex items-start gap-2">
                      <CheckCircle className="w-4 h-4 text-emerald-500 flex-shrink-0 mt-0.5" />
                      <span>Track your project progress in real-time</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle className="w-4 h-4 text-emerald-500 flex-shrink-0 mt-0.5" />
                      <span>Learn everything about urban renewal</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle className="w-4 h-4 text-emerald-500 flex-shrink-0 mt-0.5" />
                      <span>Find the best lawyers, builders, and supervisors</span>
                    </li>
                  </ul>
                </div>
              </div>
            </div>

            {/* Form */}
            <form onSubmit={handleContinue} className="space-y-6">
              {/* Input Field */}
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Login/Sign Up
                </label>
                <div className="relative">
                  <input
                    type="text"
                    value={contact}
                    onChange={(e) => {
                      setContact(e.target.value);
                      setError('');
                    }}
                    placeholder="Enter email or mobile number"
                    className={`w-full px-4 py-4 text-lg border-2 rounded-xl focus:outline-none focus:ring-2 transition-all ${
                      error
                        ? 'border-red-300 focus:border-red-500 focus:ring-red-200'
                        : 'border-gray-200 focus:border-blue-500 focus:ring-blue-200'
                    }`}
                  />
                </div>

                {/* Error Message */}
                {error && (
                  <p className="mt-2 text-sm text-red-600 flex items-center gap-1">
                    <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                    </svg>
                    {error}
                  </p>
                )}
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                className="w-full bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 text-white font-semibold py-4 px-8 rounded-xl transition-all transform hover:scale-[1.02] active:scale-[0.98] shadow-lg shadow-blue-500/30 hover:shadow-blue-500/50 text-lg flex items-center justify-center gap-2 group"
              >
                Continue
                <ArrowLeft className="w-5 h-5 rotate-180 group-hover:translate-x-1 transition-transform" />
              </button>

              {/* Help Text */}
              <p className="text-sm text-gray-500 text-center">
                Already have an account?{' '}
                <button
                  type="button"
                  onClick={() => navigate('/login/resident')}
                  className="text-blue-600 hover:text-blue-700 font-medium hover:underline"
                >
                  Sign in here
                </button>
              </p>
            </form>
          </div>

          {/* Right Column - Illustration */}
          <div className="order-1 lg:order-2 flex items-center justify-center">
            <div className="relative max-w-md w-full scale-75">
              {/* Background Decoration */}
              <div className="absolute -top-4 -right-4 w-72 h-72 bg-blue-200/20 rounded-full blur-3xl"></div>
              <div className="absolute -bottom-4 -left-4 w-72 h-72 bg-purple-200/20 rounded-full blur-3xl"></div>

              {/* Illustration Image */}
              <div className="relative">
                <img
                  src="/resident-login.png"
                  alt="Urban renewal buildings with people"
                  className="w-full h-auto drop-shadow-2xl"
                />
              </div>
            </div>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="bg-gradient-to-b from-slate-800 to-slate-900 text-white mt-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-12 mb-12">
            {/* About Us */}
            <div>
              <h3 className="text-lg font-bold mb-4 text-blue-400">About Us</h3>
              <p className="text-slate-300 text-sm leading-relaxed">
                GetStatus is a platform that brings together apartment owners and representations to municipalities,
                entrepreneurs, law firms, inspectors, appraisers and organizers to promote urban renewal projects
                through technology, transparency and building trust.
              </p>
            </div>

            {/* Quick Links */}
            <div>
              <h3 className="text-lg font-bold mb-4 text-blue-400">Quick Links</h3>
              <ul className="space-y-2 text-sm">
                <li><a href="#" className="text-slate-300 hover:text-blue-400 transition-colors">Home</a></li>
                <li><a href="#" className="text-slate-300 hover:text-blue-400 transition-colors">Projects</a></li>
                <li><a href="#" className="text-slate-300 hover:text-blue-400 transition-colors">My Apartments</a></li>
                <li><a href="#" className="text-slate-300 hover:text-blue-400 transition-colors">Pricing</a></li>
                <li><a href="#" className="text-slate-300 hover:text-blue-400 transition-colors">English Title</a></li>
              </ul>
            </div>

            {/* Stakeholders */}
            <div>
              <h3 className="text-lg font-bold mb-4 text-blue-400">Stakeholders</h3>
              <ul className="space-y-2 text-sm">
                <li><a href="#" className="text-slate-300 hover:text-blue-400 transition-colors">Lawyer</a></li>
                <li><a href="#" className="text-slate-300 hover:text-blue-400 transition-colors">Supervisor</a></li>
                <li><a href="#" className="text-slate-300 hover:text-blue-400 transition-colors">Builder</a></li>
                <li><a href="#" className="text-slate-300 hover:text-blue-400 transition-colors">Other</a></li>
              </ul>
            </div>

            {/* Contact Us */}
            <div>
              <h3 className="text-lg font-bold mb-4 text-blue-400">Contact Us</h3>
              <ul className="space-y-3 text-sm">
                <li className="flex items-center gap-2 text-slate-300">
                  <Phone className="w-4 h-4 text-blue-400" />
                  <a href="tel:+*8531" className="hover:text-blue-400 transition-colors">+*8531</a>
                </li>
                <li className="flex items-center gap-2 text-slate-300">
                  <Mail className="w-4 h-4 text-blue-400" />
                  <a href="mailto:info@getstatus.io" className="hover:text-blue-400 transition-colors">info@getstatus.io</a>
                </li>
                <li className="flex items-start gap-2 text-slate-300">
                  <MapPin className="w-4 h-4 text-blue-400 mt-0.5 flex-shrink-0" />
                  <span>10 Zarchin st. Raanana</span>
                </li>
              </ul>

              {/* Social Media */}
              <div className="mt-6">
                <h4 className="text-sm font-semibold mb-3 text-slate-300">Follow Us</h4>
                <div className="flex gap-3">
                  <a href="#" className="w-9 h-9 bg-slate-700 hover:bg-blue-600 rounded-full flex items-center justify-center transition-colors">
                    <Instagram className="w-4 h-4" />
                  </a>
                  <a href="#" className="w-9 h-9 bg-slate-700 hover:bg-blue-600 rounded-full flex items-center justify-center transition-colors">
                    <Linkedin className="w-4 h-4" />
                  </a>
                  <a href="#" className="w-9 h-9 bg-slate-700 hover:bg-blue-600 rounded-full flex items-center justify-center transition-colors">
                    <Facebook className="w-4 h-4" />
                  </a>
                </div>
              </div>
            </div>
          </div>

          {/* Bottom Bar */}
          <div className="border-t border-slate-700 pt-8 flex flex-col sm:flex-row justify-between items-center gap-4">
            <p className="text-slate-400 text-sm">© 2025 GetStatus. All rights reserved.</p>
            <div className="flex gap-6 text-sm">
              <a href="#" className="text-slate-400 hover:text-blue-400 transition-colors">About</a>
              <a href="#" className="text-slate-400 hover:text-blue-400 transition-colors">Privacy Policy</a>
              <a href="#" className="text-slate-400 hover:text-blue-400 transition-colors">Accessibility statement</a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
