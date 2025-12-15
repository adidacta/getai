import { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { User, Mail, Lock, Eye, EyeOff, Phone, Briefcase, Building, CheckCircle } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import AuthLayout from './AuthLayout';

export default function InviteSignup() {
  const navigate = useNavigate();
  const { token } = useParams();
  const { signup, isAuthenticated } = useAuth();

  const [loading, setLoading] = useState(false);
  const [loadingInvite, setLoadingInvite] = useState(true);
  const [error, setError] = useState('');
  const [inviteData, setInviteData] = useState(null);
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    password: '',
    acceptedTerms: false
  });

  // Mock invite data fetch - in real implementation, this would call the API
  useEffect(() => {
    const fetchInviteData = async () => {
      try {
        // Mock API call - decode invite token
        await new Promise(resolve => setTimeout(resolve, 500));

        // Mock invite data based on token
        const mockInviteData = {
          type: token.includes('company') ? 'company' : 'project',
          companyName: 'ABC Real Estate Company',
          projectName: 'Ben Yehuda 45 Renewal Project',
          inviterName: 'John Cohen',
          inviterRole: 'Project Manager',
          email: 'invited@example.com', // Pre-filled email if available
          role: 'contractor' // For company invites
        };

        setInviteData(mockInviteData);
        if (mockInviteData.email) {
          setFormData(prev => ({ ...prev, email: mockInviteData.email }));
        }
      } catch (err) {
        setError('Invitation link is invalid or has expired');
        console.error('Invite fetch error:', err);
      } finally {
        setLoadingInvite(false);
      }
    };

    fetchInviteData();
  }, [token]);

  // If user is already authenticated, accept invite directly
  useEffect(() => {
    if (isAuthenticated && inviteData) {
      handleAcceptInviteExistingUser();
    }
  }, [isAuthenticated, inviteData]);

  const handleAcceptInviteExistingUser = async () => {
    // Mock accept invite for existing user
    console.log('Accepting invite for existing user');
    alert('Invitation accepted! You will be redirected to the project/company.');
    navigate('/login'); // In real app, navigate to the project/company
  };

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
    setError('');
  };

  const handleSubmit = async (e) => {
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
    if (inviteData.type === 'project' && !formData.phone.trim()) {
      setError('Please enter a phone number');
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
        userType: inviteData.type === 'company' ? 'stakeholder' : 'stakeholder',
        inviteToken: token,
        role: inviteData.role
      });

      if (result.success) {
        console.log('Signup via invite successful:', result.user);
        alert('Signup successful! You will be redirected to the project/company.');
        navigate('/login'); // In real app, navigate to the project/company
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

  if (loadingInvite) {
    return (
      <div className="bg-white flex items-center justify-center min-h-screen">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-gray-600" style={{ fontFamily: '"Noto Sans", sans-serif' }}>
            Loading invitation...
          </p>
        </div>
      </div>
    );
  }

  if (error && !inviteData) {
    return (
      <div className="bg-white flex items-center justify-center min-h-screen">
        <div className="text-center max-w-md">
          <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <span className="text-3xl">✗</span>
          </div>
          <h2 className="text-2xl font-bold text-gray-800 mb-2" style={{ fontFamily: '"Noto Sans", sans-serif' }}>
            Invalid Invitation
          </h2>
          <p className="text-gray-600 mb-6" style={{ fontFamily: '"Noto Sans", sans-serif' }}>
            {error}
          </p>
          <button
            onClick={() => navigate('/login')}
            className="bg-[#0C6DFA] text-white py-2 px-6 rounded font-semibold"
            style={{ fontFamily: '"Noto Sans", sans-serif' }}
          >
            Back to Login
          </button>
        </div>
      </div>
    );
  }

  return (
    <AuthLayout>
      <div className="space-y-6 min-h-[400px]">
        {/* Header */}
        <div>
          <h2 className="text-3xl font-bold text-gray-900 leading-none mb-3" style={{ fontFamily: '"Noto Sans", sans-serif' }}>
            You've Been Invited!
          </h2>
          <p className="text-sm text-gray-600" style={{ fontFamily: '"Noto Sans", sans-serif' }}>
            {inviteData?.inviterName} invites you to {inviteData?.type === 'company' ? inviteData.companyName : inviteData?.projectName}
          </p>
        </div>

        {/* Invite Info */}
        <div>
              <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                <div className="flex items-center gap-2 mb-2">
                  {inviteData?.type === 'company' ? (
                    <Building className="w-5 h-5 text-blue-600" />
                  ) : (
                    <Briefcase className="w-5 h-5 text-blue-600" />
                  )}
                  <h3 className="font-semibold text-gray-800" style={{ fontFamily: '"Noto Sans", sans-serif' }}>
                    {inviteData?.type === 'company' ? 'Join Company' : 'Join Project'}
                  </h3>
                </div>
                <p className="text-sm text-gray-700 mb-1" style={{ fontFamily: '"Noto Sans", sans-serif' }}>
                  {inviteData?.type === 'company' ? inviteData.companyName : inviteData?.projectName}
                </p>
                <p className="text-xs text-gray-600" style={{ fontFamily: '"Noto Sans", sans-serif' }}>
                  Invited by: {inviteData?.inviterName} ({inviteData?.inviterRole})
                </p>
              </div>
            </div>

            {/* Form */}
            <form onSubmit={handleSubmit} className="flex flex-col flex-1">
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
                    disabled={!!inviteData?.email}
                    className="flex-1 px-1 bg-white border-none outline-none disabled:bg-gray-50"
                    style={{ fontFamily: '"Noto Sans", sans-serif' }}
                  />
                </div>

                {/* Phone (only for project invites) */}
                {inviteData?.type === 'project' && (
                  <div className="border border-[#D3D3D3] rounded-md p-3 flex items-center">
                    <Phone size={16} className="text-black/87 mr-2" />
                    <input
                      type="tel"
                      name="phone"
                      value={formData.phone}
                      onChange={handleInputChange}
                      placeholder="Phone Number"
                      className="flex-1 px-1 bg-white border-none outline-none"
                      style={{ fontFamily: '"Noto Sans", sans-serif' }}
                    />
                  </div>
                )}

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
}
