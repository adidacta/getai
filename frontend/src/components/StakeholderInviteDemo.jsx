import { useState, useEffect } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { User, Mail, Lock, Eye, EyeOff, Phone, Briefcase, Building, CheckCircle, Info } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import AuthLayout from './AuthLayout';

export default function StakeholderInviteDemo() {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const scenario = searchParams.get('scenario') || '1';
  const { signup } = useAuth();

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    password: '',
    confirmPassword: '',
    acceptedTerms: false
  });

  // Mock invite data
  const inviteData = {
    type: 'company', // or 'project'
    companyName: 'ABC Real Estate Company',
    projectName: 'Ben Yehuda 45 Renewal Project',
    inviterName: 'John Cohen',
    inviterRole: 'Company Owner',
    email: 'invited@example.com',
    inviteeRole: 'contractor'
  };

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
    setError('');
  };

  const handleSignup = async (e) => {
    e.preventDefault();

    // Validation
    if (!formData.name.trim()) {
      setError('Please enter your full name');
      return;
    }
    if (!formData.email.trim()) {
      setError('Please enter an email address');
      return;
    }
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      setError('Invalid email address');
      return;
    }
    if (!formData.password) {
      setError('Please enter a password');
      return;
    }
    if (formData.password.length < 8) {
      setError('Password must be at least 8 characters');
      return;
    }
    if (!/[!@#$%^&*(),.?":{}|<>]/.test(formData.password)) {
      setError('Password must contain at least one special character');
      return;
    }
    if (!formData.confirmPassword) {
      setError('Please confirm your password');
      return;
    }
    if (formData.password !== formData.confirmPassword) {
      setError('Passwords do not match');
      return;
    }
    if (!formData.acceptedTerms) {
      setError('Please accept the Terms of Use and Privacy Policy');
      return;
    }

    setLoading(true);
    setError('');

    try {
      const result = await signup({
        name: formData.name,
        email: formData.email,
        phone: formData.phone || undefined,
        password: formData.password,
        userType: 'stakeholder',
        inviteToken: 'demo-token',
        role: inviteData.inviteeRole
      });

      if (result.success) {
        console.log('Signup via stakeholder invite successful:', result.user);
        alert('Signup successful! You are now part of ' + inviteData.companyName);
        navigate('/login');
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

  const handleAcceptInvite = async () => {
    setLoading(true);
    // Mock API call
    await new Promise(resolve => setTimeout(resolve, 1000));
    alert('Invitation accepted! You are now part of ' + inviteData.companyName);
    setLoading(false);
    navigate('/login');
  };

  // Scenario 1: New user - signup flow
  const renderNewUserScenario = () => (
    <AuthLayout>
      <div className="space-y-6 min-h-[400px]">
        {/* Header */}
        <div>
          <h2 className="text-3xl font-bold text-gray-900 leading-none mb-3" style={{ fontFamily: '"Noto Sans", sans-serif' }}>
            You've Been Invited!
          </h2>
          <p className="text-sm text-gray-600" style={{ fontFamily: '"Noto Sans", sans-serif' }}>
            {inviteData.inviterName} invites you to join {inviteData.companyName}
          </p>
        </div>

        {/* Invite Info */}
        <div>
          <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
            <div className="flex items-center gap-2 mb-2">
              <Building className="w-5 h-5 text-blue-600" />
              <h3 className="font-semibold text-gray-800" style={{ fontFamily: '"Noto Sans", sans-serif' }}>
                Join Company as {inviteData.inviteeRole}
              </h3>
            </div>
            <p className="text-sm text-gray-700 mb-1" style={{ fontFamily: '"Noto Sans", sans-serif' }}>
              {inviteData.companyName}
            </p>
            <p className="text-xs text-gray-600" style={{ fontFamily: '"Noto Sans", sans-serif' }}>
              Invited by: {inviteData.inviterName} ({inviteData.inviterRole})
            </p>
          </div>
        </div>

        {/* Form */}
        <form onSubmit={handleSignup} className="flex flex-col flex-1">
          <h2 className="text-xl font-semibold mb-4" style={{ fontFamily: '"Noto Sans", sans-serif' }}>
            Complete Registration
          </h2>

          <div className="space-y-3 mb-4">
            {/* Name */}
            <div className="border border-[#D3D3D3] rounded-md p-3 flex items-center">
              <User size={16} className="text-black/87 mr-2" />
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleInputChange}
                placeholder="Full Name"
                className="flex-1 px-1 bg-white border-none outline-none"
                style={{ fontFamily: '"Noto Sans", sans-serif' }}
              />
            </div>

            {/* Email */}
            <div className="border border-[#D3D3D3] rounded-md p-3 flex items-center">
              <Mail size={16} className="text-black/87 mr-2" />
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleInputChange}
                placeholder="Email"
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
                placeholder="Phone Number (optional)"
                className="flex-1 px-1 bg-white border-none outline-none"
                style={{ fontFamily: '"Noto Sans", sans-serif' }}
              />
            </div>

            {/* Password */}
            <div>
              <div className="border border-[#D3D3D3] rounded-md p-3 flex items-center">
                <Lock size={16} className="text-black/87 mr-2" />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="mr-2"
                >
                  {showPassword ? <EyeOff size={16} className="text-black/87" /> : <Eye size={16} className="text-black/87" />}
                </button>
                <input
                  type={showPassword ? 'text' : 'password'}
                  name="password"
                  value={formData.password}
                  onChange={handleInputChange}
                  placeholder="Password"
                  className="flex-1 px-1 bg-white border-none outline-none"
                  style={{ fontFamily: '"Noto Sans", sans-serif' }}
                />
              </div>
              <p className="text-xs text-gray-500 mt-1.5 px-1" style={{ fontFamily: '"Noto Sans", sans-serif' }}>
                Minimum 8 characters, including at least one special character
              </p>
            </div>

            {/* Confirm Password */}
            <div className="border border-[#D3D3D3] rounded-md p-3 flex items-center">
              <Lock size={16} className="text-black/87 mr-2" />
              <button
                type="button"
                onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                className="mr-2"
              >
                {showConfirmPassword ? <EyeOff size={16} className="text-black/87" /> : <Eye size={16} className="text-black/87" />}
              </button>
              <input
                type={showConfirmPassword ? 'text' : 'password'}
                name="confirmPassword"
                value={formData.confirmPassword}
                onChange={handleInputChange}
                placeholder="Confirm Password"
                className="flex-1 px-1 bg-white border-none outline-none"
                style={{ fontFamily: '"Noto Sans", sans-serif' }}
              />
            </div>

            {/* Terms and Conditions */}
            <div className="flex items-start gap-2 p-2">
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

          {/* Error Message */}
          {error && (
            <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-2 rounded mb-4">
              <p className="text-sm" style={{ fontFamily: '"Noto Sans", sans-serif' }}>
                {error}
              </p>
            </div>
          )}

          {/* Submit Button */}
          <button
            type="submit"
            disabled={loading}
            className="bg-[#0C6DFA] text-white py-3 px-4 rounded shadow-md font-semibold text-sm disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
            style={{ fontFamily: '"Noto Sans", sans-serif' }}
          >
            {loading ? 'Submitting...' : (
              <>
                <CheckCircle size={16} />
                Accept Invitation and Sign Up
              </>
            )}
          </button>

          {/* Back to Login */}
          <div className="flex justify-center items-center pt-4 gap-2">
            <button
              type="button"
              onClick={() => navigate('/login')}
              className="text-[#0C6DFA] font-semibold text-sm"
              style={{ fontFamily: '"Noto Sans", sans-serif' }}
            >
              Already registered? Login
            </button>
          </div>
        </form>
      </div>
    </AuthLayout>
  );

  // Scenario 2: Existing user, logged in - simple accept
  const renderLoggedInScenario = () => (
    <AuthLayout>
      <div className="space-y-6 min-h-[400px]">
        {/* Header */}
        <div>
          <h2 className="text-3xl font-bold text-gray-900 leading-none mb-3" style={{ fontFamily: '"Noto Sans", sans-serif' }}>
            You've Been Invited!
          </h2>
          <p className="text-sm text-gray-600" style={{ fontFamily: '"Noto Sans", sans-serif' }}>
            {inviteData.inviterName} invites you to join {inviteData.companyName}
          </p>
        </div>

        {/* Invite Info */}
        <div>
          <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
            <div className="flex items-center gap-2 mb-2">
              <Building className="w-5 h-5 text-blue-600" />
              <h3 className="font-semibold text-gray-800" style={{ fontFamily: '"Noto Sans", sans-serif' }}>
                Join Company as {inviteData.inviteeRole}
              </h3>
            </div>
            <p className="text-sm text-gray-700 mb-1" style={{ fontFamily: '"Noto Sans", sans-serif' }}>
              {inviteData.companyName}
            </p>
            <p className="text-xs text-gray-600" style={{ fontFamily: '"Noto Sans", sans-serif' }}>
              Invited by: {inviteData.inviterName} ({inviteData.inviterRole})
            </p>
          </div>
        </div>

        {/* Current User Info */}
        <div className="bg-gray-50 border border-gray-200 rounded-lg p-4">
          <h3 className="font-semibold text-gray-800 mb-2" style={{ fontFamily: '"Noto Sans", sans-serif' }}>
            Your Account
          </h3>
          <p className="text-sm text-gray-700" style={{ fontFamily: '"Noto Sans", sans-serif' }}>
            Sarah Johnson
          </p>
          <p className="text-xs text-gray-600" style={{ fontFamily: '"Noto Sans", sans-serif' }}>
            sarah.johnson@example.com
          </p>
        </div>

        {/* Accept Button */}
        <button
          onClick={handleAcceptInvite}
          disabled={loading}
          className="w-full bg-[#0C6DFA] text-white py-3 px-4 rounded shadow-md font-semibold text-sm disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
          style={{ fontFamily: '"Noto Sans", sans-serif' }}
        >
          {loading ? 'Accepting...' : (
            <>
              <CheckCircle size={16} />
              Accept Invitation
            </>
          )}
        </button>

        {/* Decline option */}
        <div className="text-center">
          <button
            onClick={() => navigate('/login')}
            className="text-gray-600 hover:text-gray-800 text-sm"
            style={{ fontFamily: '"Noto Sans", sans-serif' }}
          >
            Decline invitation
          </button>
        </div>
      </div>
    </AuthLayout>
  );

  // Scenario 3: Existing user, logged out - login prompt
  const renderLoggedOutScenario = () => (
    <AuthLayout>
      <div className="space-y-6 min-h-[400px]">
        {/* Header */}
        <div>
          <h2 className="text-3xl font-bold text-gray-900 leading-none mb-3" style={{ fontFamily: '"Noto Sans", sans-serif' }}>
            Hi Sarah. You've Been Invited!
          </h2>
        </div>

        {/* Invite Info */}
        <div>
          <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
            <div className="flex items-center gap-2 mb-2">
              <Building className="w-5 h-5 text-blue-600" />
              <h3 className="font-semibold text-gray-800" style={{ fontFamily: '"Noto Sans", sans-serif' }}>
                Join Company as {inviteData.inviteeRole}
              </h3>
            </div>
            <p className="text-sm text-gray-700 mb-1" style={{ fontFamily: '"Noto Sans", sans-serif' }}>
              {inviteData.companyName}
            </p>
            <p className="text-xs text-gray-600" style={{ fontFamily: '"Noto Sans", sans-serif' }}>
              Invited by: {inviteData.inviterName} ({inviteData.inviterRole})
            </p>
          </div>
        </div>

        {/* Info Message */}
        <div className="flex items-start gap-2">
          <Info className="w-4 h-4 text-gray-600 mt-0.5 flex-shrink-0" />
          <p className="text-sm text-gray-700" style={{ fontFamily: '"Noto Sans", sans-serif' }}>
            To accept the invite, please sign in with your GetStatus account
          </p>
        </div>

        {/* Sign In Button */}
        <button
          onClick={() => navigate('/login/stakeholder')}
          className="w-full bg-[#0C6DFA] text-white py-3 px-4 rounded shadow-md font-semibold text-sm flex items-center justify-center gap-2"
          style={{ fontFamily: '"Noto Sans", sans-serif' }}
        >
          Sign In to Accept Invitation
        </button>

        {/* Don't have account */}
        <div className="text-center">
          <p className="text-sm text-gray-600 mb-2" style={{ fontFamily: '"Noto Sans", sans-serif' }}>
            Don't have a GetStatus account?
          </p>
          <button
            onClick={() => navigate('/signup')}
            className="text-blue-600 hover:text-blue-700 font-semibold text-sm hover:underline"
            style={{ fontFamily: '"Noto Sans", sans-serif' }}
          >
            Create a new account
          </button>
        </div>
      </div>
    </AuthLayout>
  );

  // Render appropriate scenario
  const renderScenario = () => {
    switch (scenario) {
      case '1':
        return renderNewUserScenario();
      case '2':
        return renderLoggedInScenario();
      case '3':
        return renderLoggedOutScenario();
      default:
        return renderNewUserScenario();
    }
  };

  return renderScenario();
}
