import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { User, Mail, Lock, Eye, EyeOff, Briefcase, Building, ArrowRight, Scale, Building2, HardHat, ClipboardCheck, Calculator, Lightbulb, Ruler, MoreHorizontal, ArrowLeftRight } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import AuthLayout from './AuthLayout';

const PROFESSIONAL_ROLES = [
  { value: 'lawyer', label: 'Lawyer', icon: Scale },
  { value: 'builder', label: 'Builder / Developer', icon: Building2 },
  { value: 'contractor', label: 'Contractor', icon: HardHat },
  { value: 'supervisor', label: 'Technical Supervisor', icon: ClipboardCheck },
  { value: 'appraiser', label: 'Appraiser', icon: Calculator },
  { value: 'consultant', label: 'Consultant', icon: Lightbulb },
  { value: 'architect', label: 'Architect', icon: Ruler },
  { value: 'other', label: 'Other', icon: MoreHorizontal }
];

export default function StakeholderSignup() {
  const navigate = useNavigate();
  const { signup } = useAuth();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [step, setStep] = useState(1);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
    role: '',
    companyType: null, // 'create', 'join', 'freelance'
    companyName: '',
    companyId: '',
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
    if (!formData.email.trim()) {
      setError('Please enter an email address');
      return false;
    }
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      setError('Invalid email address');
      return false;
    }
    if (!formData.password) {
      setError('Please enter a password');
      return false;
    }
    if (formData.password.length < 8) {
      setError('Password must be at least 8 characters');
      return false;
    }
    if (!/[!@#$%^&*(),.?":{}|<>]/.test(formData.password)) {
      setError('Password must contain at least one special character');
      return false;
    }
    if (formData.password !== formData.confirmPassword) {
      setError('Passwords do not match');
      return false;
    }
    return true;
  };

  const validateStep2 = () => {
    if (!formData.role) {
      setError('Please select a role');
      return false;
    }
    return true;
  };

  const validateStep3 = () => {
    if (formData.companyType === null) {
      setError('Please select an option');
      return false;
    }
    if (formData.companyType === 'create' && !formData.companyName.trim()) {
      setError('Please enter company name');
      return false;
    }
    if (formData.companyType === 'join' && !formData.companyId.trim()) {
      setError('Please enter company name or code');
      return false;
    }
    if (!formData.acceptedTerms) {
      setError('Please accept the Terms of Use and Privacy Policy');
      return false;
    }
    return true;
  };

  const handleNextStep = () => {
    if (step === 1 && validateStep1()) {
      setStep(2);
    } else if (step === 2 && validateStep2()) {
      setStep(3);
    }
  };

  const handlePrevStep = () => {
    if (step > 1) {
      setStep(step - 1);
      setError('');
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validateStep3()) {
      return;
    }

    setLoading(true);
    setError('');

    try {
      const result = await signup({
        name: formData.name,
        email: formData.email,
        password: formData.password,
        userType: 'stakeholder',
        role: formData.role,
        company: formData.companyType === 'create'
          ? { type: 'create', name: formData.companyName }
          : formData.companyType === 'join'
          ? { type: 'join', id: formData.companyId }
          : null
      });

      if (result.success) {
        // Stakeholders are approved immediately, navigate to dashboard
        console.log('Signup successful:', result.user);
        // navigate('/dashboard'); // Uncomment when dashboard is ready
        // For now, show success message
        alert('Signup successful! You will be redirected to the home page.');
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

  return (
    <AuthLayout>
      <div className="space-y-6 min-h-[400px]">
        {/* Header */}
        <div>
          <div className="flex items-end justify-between mb-3">
            <h2 className="text-3xl font-bold text-gray-900 leading-none" style={{ fontFamily: '"Noto Sans", sans-serif' }}>
              Join as Stakeholder
            </h2>
            <button
              onClick={() => navigate('/signup/resident')}
              className="flex items-center gap-1.5 text-gray-600 hover:text-gray-900 transition-colors text-sm font-medium"
              aria-label="Switch to resident signup"
            >
              <ArrowLeftRight className="w-4 h-4" />
              <span>Resident</span>
            </button>
          </div>
          <p className="text-sm text-gray-600" style={{ fontFamily: '"Noto Sans", sans-serif' }}>
            Create a professional profile and advance projects with full transparency
          </p>
        </div>

        {/* Progress Indicator */}
        <div>
              <div className="flex justify-center gap-2">
                {[1, 2, 3].map((s) => (
                  <div
                    key={s}
                    className={`h-1.5 flex-1 rounded-full transition-all ${
                      s === step ? 'bg-indigo-500' : s < step ? 'bg-indigo-300' : 'bg-gray-200'
                    }`}
                  />
                ))}
              </div>
              <p className="text-center text-sm text-gray-600 mt-2" style={{ fontFamily: '"Noto Sans", sans-serif' }}>
                Step {step} of 3
              </p>
            </div>

            {/* Form */}
            <form onSubmit={handleSubmit} className="flex flex-col flex-1 overflow-y-auto">
              {/* Step 1: Account Info */}
              {step === 1 && (
                <div className="space-y-4">
                  <h2 className="text-xl font-semibold mb-4" style={{ fontFamily: '"Noto Sans", sans-serif' }}>
                    Account Information
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
                </div>
              )}

              {/* Step 2: Professional Role */}
              {step === 2 && (
                <div className="space-y-4">
                  <h2 className="text-xl font-semibold mb-4" style={{ fontFamily: '"Noto Sans", sans-serif' }}>
                    Professional Role
                  </h2>

                  <p className="text-sm text-gray-600 mb-4" style={{ fontFamily: '"Noto Sans", sans-serif' }}>
                    What is your professional role?
                  </p>

                  <div className="grid grid-cols-2 gap-2">
                    {PROFESSIONAL_ROLES.map((role) => {
                      const Icon = role.icon;
                      return (
                        <button
                          key={role.value}
                          type="button"
                          onClick={() => setFormData(prev => ({ ...prev, role: role.value }))}
                          className={`p-2 rounded-md border transition-all text-xs flex items-center gap-2 ${
                            formData.role === role.value
                              ? 'border-indigo-500 bg-indigo-50'
                              : 'border-gray-200 hover:border-indigo-300'
                          }`}
                        >
                          <Icon size={14} className={formData.role === role.value ? 'text-indigo-600' : 'text-gray-600'} />
                          <p className="font-medium" style={{ fontFamily: '"Noto Sans", sans-serif' }}>
                            {role.label}
                          </p>
                        </button>
                      );
                    })}
                  </div>
                </div>
              )}

              {/* Step 3: Company Selection */}
              {step === 3 && (
                <div className="space-y-4">
                  <h2 className="text-xl font-semibold mb-4" style={{ fontFamily: '"Noto Sans", sans-serif' }}>
                    Company Details
                  </h2>

                  <p className="text-sm text-gray-600 mb-4" style={{ fontFamily: '"Noto Sans", sans-serif' }}>
                    Are you working with a company or as a freelancer?
                  </p>

                  {/* Company Type Buttons */}
                  <div className="flex flex-col gap-2">
                    <button
                      type="button"
                      onClick={() => setFormData(prev => ({ ...prev, companyType: 'create', companyId: '' }))}
                      className={`p-2.5 rounded-md border transition-all ${
                        formData.companyType === 'create'
                          ? 'border-indigo-500 bg-indigo-50'
                          : 'border-gray-200 hover:border-indigo-300'
                      }`}
                    >
                      <div className="flex items-center gap-2">
                        <Building size={16} className="text-indigo-500 flex-shrink-0" />
                        <div className="text-left">
                          <p className="font-medium text-sm" style={{ fontFamily: '"Noto Sans", sans-serif' }}>
                            Create New Company
                          </p>
                          <p className="text-xs text-gray-600" style={{ fontFamily: '"Noto Sans", sans-serif' }}>
                            I represent a new company
                          </p>
                        </div>
                      </div>
                    </button>

                    <button
                      type="button"
                      onClick={() => setFormData(prev => ({ ...prev, companyType: 'join', companyName: '' }))}
                      className={`p-2.5 rounded-md border transition-all ${
                        formData.companyType === 'join'
                          ? 'border-indigo-500 bg-indigo-50'
                          : 'border-gray-200 hover:border-indigo-300'
                      }`}
                    >
                      <div className="flex items-center gap-2">
                        <Briefcase size={16} className="text-indigo-500 flex-shrink-0" />
                        <div className="text-left">
                          <p className="font-medium text-sm" style={{ fontFamily: '"Noto Sans", sans-serif' }}>
                            Join Existing Company
                          </p>
                          <p className="text-xs text-gray-600" style={{ fontFamily: '"Noto Sans", sans-serif' }}>
                            Employee at registered company
                          </p>
                        </div>
                      </div>
                    </button>

                    <button
                      type="button"
                      onClick={() => setFormData(prev => ({ ...prev, companyType: 'freelance', companyName: '', companyId: '' }))}
                      className={`p-2.5 rounded-md border transition-all ${
                        formData.companyType === 'freelance'
                          ? 'border-indigo-500 bg-indigo-50'
                          : 'border-gray-200 hover:border-indigo-300'
                      }`}
                    >
                      <div className="flex items-center gap-2">
                        <User size={16} className="text-indigo-500 flex-shrink-0" />
                        <div className="text-left">
                          <p className="font-medium text-sm" style={{ fontFamily: '"Noto Sans", sans-serif' }}>
                            Freelancer
                          </p>
                          <p className="text-xs text-gray-600" style={{ fontFamily: '"Noto Sans", sans-serif' }}>
                            Independent without a company
                          </p>
                        </div>
                      </div>
                    </button>
                  </div>

                  {/* Company Name Input (if creating) */}
                  {formData.companyType === 'create' && (
                    <div className="mt-4">
                      <input
                        type="text"
                        name="companyName"
                        value={formData.companyName}
                        onChange={handleInputChange}
                        placeholder="Company Name"
                        className="w-full border border-[#D3D3D3] rounded-md p-3 outline-none"
                        style={{ fontFamily: '"Noto Sans", sans-serif' }}
                      />
                    </div>
                  )}

                  {/* Company ID Input (if joining) */}
                  {formData.companyType === 'join' && (
                    <div className="mt-4">
                      <input
                        type="text"
                        name="companyId"
                        value={formData.companyId}
                        onChange={handleInputChange}
                        placeholder="Company Name or Code"
                        className="w-full border border-[#D3D3D3] rounded-md p-3 outline-none"
                        style={{ fontFamily: '"Noto Sans", sans-serif' }}
                      />
                      <p className="text-xs text-gray-500 mt-2" style={{ fontFamily: '"Noto Sans", sans-serif' }}>
                        Joining a company requires approval from the company manager
                      </p>
                    </div>
                  )}

                  {/* Terms and Conditions */}
                  <div className="flex items-start gap-2 p-3 mt-4">
                    <input
                      type="checkbox"
                      name="acceptedTerms"
                      checked={formData.acceptedTerms}
                      onChange={handleInputChange}
                      className="w-4 h-4 text-indigo-600 mt-0.5 flex-shrink-0"
                    />
                    <label className="text-sm text-gray-700" style={{ fontFamily: '"Noto Sans", sans-serif' }}>
                      I agree to the{' '}
                      <a href="/terms" className="text-indigo-600 hover:underline" target="_blank" rel="noopener noreferrer">
                        Terms of Use
                      </a>
                      {' '}and{' '}
                      <a href="/privacy" className="text-indigo-600 hover:underline" target="_blank" rel="noopener noreferrer">
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

              {/* Navigation Buttons */}
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

                {step < 3 ? (
                  <button
                    type="button"
                    onClick={handleNextStep}
                    className="flex-1 bg-[#0C6DFA] text-white py-2.5 px-4 rounded shadow-md font-semibold text-sm flex items-center justify-center gap-2"
                    style={{ fontFamily: '"Noto Sans", sans-serif' }}
                  >
                    Next
                    <ArrowRight size={16} />
                  </button>
                ) : (
                  <button
                    type="submit"
                    disabled={loading}
                    className="flex-1 bg-[#0C6DFA] text-white py-2.5 px-4 rounded shadow-md font-semibold text-sm disabled:opacity-50"
                    style={{ fontFamily: '"Noto Sans", sans-serif' }}
                  >
                    {loading ? 'Submitting...' : 'Complete Registration'}
                  </button>
                )}
              </div>

              {/* Back to Login */}
              <div className="flex justify-center items-center pt-3 gap-2">
                <span className="text-gray-600 text-sm" style={{ fontFamily: '"Noto Sans", sans-serif' }}>
                  Already registered?
                </span>
                <button
                  type="button"
                  onClick={() => navigate('/login')}
                  className="text-[#0C6DFA] font-semibold text-sm"
                  style={{ fontFamily: '"Noto Sans", sans-serif' }}
                >
                  Login
                </button>
              </div>
        </form>
      </div>
    </AuthLayout>
  );
}
