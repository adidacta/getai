import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { User, Phone, Mail, Home, MapPin, Building2, ArrowRight, ArrowLeftRight, CheckCircle, Copy, Check, Smartphone } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import AuthLayout from './AuthLayout';

export default function ResidentSignup() {
  const navigate = useNavigate();
  const { signup } = useAuth();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [step, setStep] = useState(1);
  const [inviteLink, setInviteLink] = useState('');
  const [linkCopied, setLinkCopied] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    email: '',
    buildingNumber: '',
    street: '',
    city: '',
    apartmentNumber: '',
    projectId: '',
    knowProject: null, // true or false
    isRepresentative: false,
    acceptedTerms: false
  });

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
    setError('');
  };

  const validateStep1 = () => {
    if (!formData.name.trim()) {
      setError('Please enter your full name');
      return false;
    }
    if (!formData.phone.trim()) {
      setError('Please enter a phone number');
      return false;
    }
    if (formData.phone.length < 9) {
      setError('Invalid phone number');
      return false;
    }
    return true;
  };

  const validateStep2 = () => {
    if (!formData.city.trim()) {
      setError('Please enter city');
      return false;
    }
    if (!formData.street.trim()) {
      setError('Please enter street');
      return false;
    }
    if (!formData.buildingNumber.trim()) {
      setError('Please enter building number');
      return false;
    }
    if (!formData.acceptedTerms) {
      setError('Please accept the Terms of Use and Privacy Policy');
      return false;
    }
    return true;
  };

  const handleNextStep = async () => {
    if (step === 1 && validateStep1()) {
      setStep(2);
    } else if (step === 2 && validateStep2()) {
      // Submit the form and get the invite link
      await handleSignup();
    }
  };

  const handleSignup = async () => {
    setLoading(true);
    setError('');

    try {
      const result = await signup({
        name: formData.name,
        phone: formData.phone,
        email: formData.email || undefined,
        userType: 'resident',
        isRepresentative: formData.isRepresentative,
        apartment: {
          city: formData.city,
          street: formData.street,
          buildingNumber: formData.buildingNumber,
          apartmentNumber: formData.apartmentNumber
        }
      });

      if (result.success) {
        // Generate unique invite link (in real implementation, this comes from the API)
        const uniqueToken = Math.random().toString(36).substring(2, 15);
        const generatedLink = `https://getstatus.co.il/join/${uniqueToken}`;
        setInviteLink(generatedLink);
        setStep(3);
      } else {
        setError(result.error || 'Signup failed');
      }
    } catch (err) {
      setError('An error occurred. Please try again.');
      console.error('Signup error:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleCopyLink = () => {
    navigator.clipboard.writeText(inviteLink);
    setLinkCopied(true);
    setTimeout(() => setLinkCopied(false), 2000);
  };

  const handlePrevStep = () => {
    if (step > 1) {
      setStep(step - 1);
      setError('');
    }
  };


  // Full-screen success layout for step 3
  if (step === 3) {
    return (
      <div className="min-h-screen bg-white flex flex-col">
        {/* Logo */}
        <div className="pt-8 pb-4 px-8 flex justify-center">
          <img src="/logo.png" alt="GetStatus" className="h-12" />
        </div>

        {/* Main Content */}
        <div className="flex-1 flex items-start justify-center px-6 pt-8 pb-12">
          <div className="w-full" style={{ maxWidth: '1400px' }}>
            {/* Success Message */}
            <div className="text-center mb-10">
              <h1 className="text-4xl font-bold text-gray-900 mb-3" style={{ fontFamily: '"Noto Sans", sans-serif' }}>
                You're All Set, {formData.name}!
              </h1>
              <p className="text-lg text-gray-600" style={{ fontFamily: '"Noto Sans", sans-serif' }}>
                Follow these steps to get started with GetStatus
              </p>
            </div>

            {/* Steps and Button Layout */}
            <div className="relative">
              {/* Cards Container - Centered */}
              <div className="flex justify-center">
                <div className="grid grid-cols-3 gap-5" style={{ maxWidth: '900px' }}>
                {/* Step 1: Share Link */}
                <div className="bg-blue-50 border-2 border-blue-200 rounded-2xl p-6 text-center flex flex-col" style={{ minHeight: '420px' }}>
                  <div className="w-12 h-12 bg-blue-600 text-white rounded-full flex items-center justify-center text-xl font-bold mx-auto mb-6" style={{ fontFamily: '"Noto Sans", sans-serif' }}>
                    1
                  </div>
                  <h3 className="text-lg font-bold text-gray-900 mb-6" style={{ fontFamily: '"Noto Sans", sans-serif' }}>
                    Share This Link
                  </h3>
                  <div className="bg-white border border-blue-200 rounded-lg p-3 mb-5 text-left break-all flex-grow flex items-center">
                    <code className="text-xs text-gray-700" style={{ fontFamily: 'monospace' }}>
                      {inviteLink}
                    </code>
                  </div>
                  <button
                    onClick={handleCopyLink}
                    className="w-full bg-blue-600 hover:bg-blue-700 text-white py-3 px-4 rounded-lg font-semibold transition-colors flex items-center justify-center gap-2 mb-5"
                    style={{ fontFamily: '"Noto Sans", sans-serif' }}
                  >
                    {linkCopied ? (
                      <>
                        <Check className="w-4 h-4" />
                        Copied!
                      </>
                    ) : (
                      <>
                        <Copy className="w-4 h-4" />
                        Copy Link
                      </>
                    )}
                  </button>
                  <p className="text-xs text-gray-600" style={{ fontFamily: '"Noto Sans", sans-serif' }}>
                    Send to your lawyer and builder to receive project updates
                  </p>
                </div>

                {/* Step 2: Download App */}
                <div className="bg-green-50 border-2 border-green-200 rounded-2xl p-6 text-center flex flex-col" style={{ minHeight: '420px' }}>
                  <div className="w-12 h-12 bg-green-600 text-white rounded-full flex items-center justify-center text-xl font-bold mx-auto mb-6" style={{ fontFamily: '"Noto Sans", sans-serif' }}>
                    2
                  </div>
                  <h3 className="text-lg font-bold text-gray-900 mb-6" style={{ fontFamily: '"Noto Sans", sans-serif' }}>
                    Download the App
                  </h3>
                  <div className="flex flex-col gap-4 items-center flex-grow justify-center mb-5">
                    <a
                      href="https://apps.apple.com/app/getstatus"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-block hover:opacity-80 transition-opacity"
                    >
                      <img
                        src="https://tools.applemediaservices.com/api/badges/download-on-the-app-store/black/en-us?size=250x83"
                        alt="Download on the App Store"
                        className="h-11"
                      />
                    </a>
                    <a
                      href="https://play.google.com/store/apps/details?id=com.getstatus"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-block hover:opacity-80 transition-opacity"
                    >
                      <img
                        src="https://play.google.com/intl/en_us/badges/static/images/badges/en_badge_web_generic.png"
                        alt="Get it on Google Play"
                        className="h-11"
                      />
                    </a>
                  </div>
                  <p className="text-xs text-gray-600" style={{ fontFamily: '"Noto Sans", sans-serif' }}>
                    Track your project on mobile or web
                  </p>
                </div>

                {/* Step 3: Login */}
                <div className="bg-indigo-50 border-2 border-indigo-200 rounded-2xl p-6 text-center flex flex-col" style={{ minHeight: '420px' }}>
                  <div className="w-12 h-12 bg-indigo-600 text-white rounded-full flex items-center justify-center text-xl font-bold mx-auto mb-6" style={{ fontFamily: '"Noto Sans", sans-serif' }}>
                    3
                  </div>
                  <h3 className="text-lg font-bold text-gray-900 mb-6" style={{ fontFamily: '"Noto Sans", sans-serif' }}>
                    Login Anytime
                  </h3>
                  <div className="bg-white border border-indigo-200 rounded-lg p-4 mb-5 flex-grow flex flex-col justify-center">
                    <div className="flex items-center justify-center gap-2 mb-2">
                      <Phone className="w-4 h-4 text-indigo-600" />
                      <span className="font-semibold text-gray-900 text-sm" style={{ fontFamily: '"Noto Sans", sans-serif' }}>
                        {formData.phone}
                      </span>
                    </div>
                    <p className="text-xs text-gray-600" style={{ fontFamily: '"Noto Sans", sans-serif' }}>
                      Your login phone number
                    </p>
                  </div>
                  <p className="text-xs text-gray-600" style={{ fontFamily: '"Noto Sans", sans-serif' }}>
                    We'll text you a verification code each time you log in
                  </p>
                </div>
              </div>
              </div>

              {/* Login Button - Absolutely positioned to the right */}
              <div className="absolute right-0 bottom-0">
                <button
                  onClick={() => navigate('/login/resident')}
                  className="bg-gradient-to-r from-blue-600 to-indigo-600 text-white py-4 px-8 rounded-xl font-bold text-lg shadow-lg hover:shadow-xl transition-all whitespace-nowrap"
                  style={{ fontFamily: '"Noto Sans", sans-serif' }}
                >
                  Go to Login
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <AuthLayout>
      <div className="space-y-6 min-h-[400px]">
        {/* Header */}
        <div>
          <div className="flex items-end justify-between mb-3">
            <h2 className="text-3xl font-bold text-gray-900 leading-none" style={{ fontFamily: '"Noto Sans", sans-serif' }}>
              Join as Resident
            </h2>
            <button
              onClick={() => navigate('/signup/stakeholder')}
              className="flex items-center gap-1.5 text-gray-600 hover:text-gray-900 transition-colors text-sm font-medium"
              aria-label="Switch to stakeholder signup"
            >
              <ArrowLeftRight className="w-4 h-4" />
              <span>Stakeholder</span>
            </button>
          </div>
          <p className="text-sm text-gray-600" style={{ fontFamily: '"Noto Sans", sans-serif' }}>
            Fill in your details and we'll start tracking your project
          </p>
        </div>

        {/* Progress Indicator - Only show for steps 1 and 2 */}
        {step < 3 && (
          <div>
            <div className="flex justify-center gap-2">
              {[1, 2].map((s) => (
                <div
                  key={s}
                  className={`h-1.5 flex-1 rounded-full transition-all ${
                    s === step ? 'bg-blue-500' : s < step ? 'bg-blue-300' : 'bg-gray-200'
                  }`}
                />
              ))}
            </div>
            <p className="text-center text-sm text-gray-600 mt-2" style={{ fontFamily: '"Noto Sans", sans-serif' }}>
              Step {step} of 2
            </p>
          </div>
        )}

            {/* Form */}
            <div className="flex flex-col flex-1 overflow-y-auto">
              {/* Step 1: Personal Info */}
              {step === 1 && (
                <div className="space-y-4">
                  <h2 className="text-xl font-semibold mb-4" style={{ fontFamily: '"Noto Sans", sans-serif' }}>
                    Personal Information
                  </h2>

                  {/* Name */}
                  <div className="border border-[#D3D3D3] rounded-md p-3 flex items-center">
                    <User size={16} className="text-black/87 mr-2" />
                    <input
                      type="text"
                      name="name"
                      value={formData.name}
                      onChange={handleInputChange}
                      placeholder="Full Name"
                      autoComplete="name"
                      className="flex-1 px-1 bg-white border-none outline-none"
                      style={{ fontFamily: '"Noto Sans", sans-serif' }}
                    />
                  </div>

                  {/* Phone */}
                  <div className="border border-[#D3D3D3] rounded-md p-3 flex items-center">
                    <Phone size={16} className="text-black/87 mr-2" />
                    <input
                      type="tel"
                      name="phone"
                      value={formData.phone}
                      onChange={handleInputChange}
                      placeholder="Mobile Phone Number"
                      autoComplete="tel"
                      className="flex-1 px-1 bg-white border-none outline-none"
                      style={{ fontFamily: '"Noto Sans", sans-serif' }}
                    />
                  </div>

                  {/* Email (Optional) */}
                  <div className="border border-[#D3D3D3] rounded-md p-3 flex items-center">
                    <Mail size={16} className="text-black/87 mr-2" />
                    <input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleInputChange}
                      placeholder="Email (Optional)"
                      autoComplete="email"
                      className="flex-1 px-1 bg-white border-none outline-none"
                      style={{ fontFamily: '"Noto Sans", sans-serif' }}
                    />
                  </div>

                  {/* Representative Checkbox */}
                  <div className="flex items-center gap-2 p-2">
                    <input
                      type="checkbox"
                      name="isRepresentative"
                      checked={formData.isRepresentative}
                      onChange={handleInputChange}
                      className="w-4 h-4 text-blue-600"
                    />
                    <label className="text-sm text-gray-700" style={{ fontFamily: '"Noto Sans", sans-serif' }}>
                      I am the building representative
                    </label>
                  </div>
                </div>
              )}

              {/* Step 2: Apartment Details */}
              {step === 2 && (
                <div className="space-y-4">
                  <h2 className="text-xl font-semibold mb-4" style={{ fontFamily: '"Noto Sans", sans-serif' }}>
                    Apartment Details
                  </h2>

                  {/* City */}
                  <div className="border border-[#D3D3D3] rounded-md p-3 flex items-center">
                    <MapPin size={16} className="text-black/87 mr-2" />
                    <input
                      type="text"
                      name="city"
                      value={formData.city}
                      onChange={handleInputChange}
                      placeholder="City"
                      autoComplete="address-level2"
                      className="flex-1 px-1 bg-white border-none outline-none"
                      style={{ fontFamily: '"Noto Sans", sans-serif' }}
                    />
                  </div>

                  {/* Street */}
                  <div className="border border-[#D3D3D3] rounded-md p-3 flex items-center">
                    <Home size={16} className="text-black/87 mr-2" />
                    <input
                      type="text"
                      name="street"
                      value={formData.street}
                      onChange={handleInputChange}
                      placeholder="Street"
                      autoComplete="address-line1"
                      className="flex-1 px-1 bg-white border-none outline-none"
                      style={{ fontFamily: '"Noto Sans", sans-serif' }}
                    />
                  </div>

                  {/* Building Number */}
                  <div className="border border-[#D3D3D3] rounded-md p-3 flex items-center">
                    <Building2 size={16} className="text-black/87 mr-2" />
                    <input
                      type="text"
                      name="buildingNumber"
                      value={formData.buildingNumber}
                      onChange={handleInputChange}
                      placeholder="Building Number"
                      autoComplete="address-line2"
                      className="flex-1 px-1 bg-white border-none outline-none"
                      style={{ fontFamily: '"Noto Sans", sans-serif' }}
                    />
                  </div>

                  {/* Apartment Number (Optional) */}
                  <div className="border border-[#D3D3D3] rounded-md p-3 flex items-center">
                    <Home size={16} className="text-black/87 mr-2" />
                    <input
                      type="text"
                      name="apartmentNumber"
                      value={formData.apartmentNumber}
                      onChange={handleInputChange}
                      placeholder="Apartment Number (Optional)"
                      autoComplete="address-line3"
                      className="flex-1 px-1 bg-white border-none outline-none"
                      style={{ fontFamily: '"Noto Sans", sans-serif' }}
                    />
                  </div>

                  {/* Terms and Conditions */}
                  <div className="flex items-start gap-2 p-3 mt-4">
                    <input
                      type="checkbox"
                      name="acceptedTerms"
                      checked={formData.acceptedTerms}
                      onChange={handleInputChange}
                      className="w-4 h-4 text-blue-600 mt-0.5 flex-shrink-0"
                    />
                    <label className="text-sm text-gray-700" style={{ fontFamily: '"Noto Sans", sans-serif' }}>
                      I agree to the{' '}
                      <a href="/terms" className="text-blue-600 hover:underline" target="_blank" rel="noopener noreferrer">
                        Terms of Use
                      </a>
                      {' '}and{' '}
                      <a href="/privacy" className="text-blue-600 hover:underline" target="_blank" rel="noopener noreferrer">
                        Privacy Policy
                      </a>
                    </label>
                  </div>
                </div>
              )}


              {/* Error Message */}
              {error && (
                <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-2 rounded mt-4">
                  <p className="text-sm" style={{ fontFamily: '"Noto Sans", sans-serif' }}>
                    {error}
                  </p>
                </div>
              )}

              {/* Navigation Buttons - Only show for steps 1 and 2 */}
              {step < 3 && (
                <>
                  <div className="flex gap-3 mt-auto pt-4">
                    {step > 1 && (
                      <button
                        type="button"
                        onClick={handlePrevStep}
                        className="flex-1 bg-gray-200 text-gray-700 py-2.5 px-4 rounded shadow-md font-semibold text-sm"
                        style={{ fontFamily: '"Noto Sans", sans-serif' }}
                      >
                        Back
                      </button>
                    )}

                    <button
                      type="button"
                      onClick={handleNextStep}
                      disabled={loading}
                      className="flex-1 bg-[#0C6DFA] text-white py-2.5 px-4 rounded shadow-md font-semibold text-sm flex items-center justify-center gap-2 disabled:opacity-50"
                      style={{ fontFamily: '"Noto Sans", sans-serif' }}
                    >
                      {loading ? (
                        'Submitting...'
                      ) : step === 1 ? (
                        <>
                          Next
                          <ArrowRight size={16} />
                        </>
                      ) : (
                        'Complete Registration'
                      )}
                    </button>
                  </div>

                  {/* Back to Login */}
                  <div className="flex justify-center items-center pt-3 gap-2">
                    <span className="text-gray-600 text-sm" style={{ fontFamily: '"Noto Sans", sans-serif' }}>
                      Already registered?
                    </span>
                    <button
                      type="button"
                      onClick={() => navigate('/login/resident')}
                      className="text-[#0C6DFA] font-semibold text-sm"
                      style={{ fontFamily: '"Noto Sans", sans-serif' }}
                    >
                      Login
                    </button>
                  </div>
                </>
              )}
        </div>
      </div>
    </AuthLayout>
  );
}
