import { useState, useEffect } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import {
  X,
  Search,
  ChevronDown,
  User,
  Building,
  Mail,
  Check,
  AlertCircle,
  CheckCircle,
  UserPlus,
  Send,
  ArrowLeft,
  Share2,
  FileText,
  MessageSquare,
  Shield,
  Lock
} from 'lucide-react';

// Mock REN stakeholders data
const mockRENStakeholders = [
  { id: 1, name: 'Moshe Haim', company: 'Tidhar', role: 'builder', email: 'moshe.haim@tidhar.co.il' },
  { id: 2, name: 'Sarah Cohen', company: 'Cohen Law Firm', role: 'lawyer', email: 'sarah@cohenlaw.com' },
  { id: 3, name: 'David Levy', company: 'Levy Construction', role: 'builder', email: 'david@levycon.com' },
  { id: 4, name: 'Michael Green', company: 'Green Supervision', role: 'supervisor', email: 'michael@greensup.com' },
  { id: 5, name: 'Rachel Ben-David', company: 'BD Appraisals', role: 'appraiser', email: 'rachel@bdappraisals.com' },
  { id: 6, name: 'Yossi Tidhar', company: 'Tidhar', role: 'builder', email: 'yossi@tidhar.co.il' },
];

const roleOptions = [
  { value: 'lawyer', label: 'Lawyer', plural: 'lawyers', count: 307 },
  { value: 'builder', label: 'Builder', plural: 'builders', count: 300 },
  { value: 'supervisor', label: 'Supervisor', plural: 'supervisors', count: 77 },
  { value: 'appraiser', label: 'Appraiser', plural: 'appraisers', count: 41 },
  { value: 'representative', label: 'Representative', plural: 'representatives', count: 538 },
  { value: 'pm', label: 'Project Manager', plural: 'project managers', count: 45 },
  { value: 'municipality', label: 'Municipality', plural: 'municipalities', count: 28 },
  { value: 'public_housing', label: 'Public Housing', plural: 'public housing', count: 12 },
];

export default function AddStakeholderFlow() {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const initialRole = searchParams.get('role') || '';

  const [step, setStep] = useState(1);
  const [showCancelConfirm, setShowCancelConfirm] = useState(false);
  const [selectedRole, setSelectedRole] = useState(initialRole);
  const [searchQuery, setSearchQuery] = useState('');
  const [searchResults, setSearchResults] = useState([]);
  const [selectedStakeholder, setSelectedStakeholder] = useState(null);
  const [noResults, setNoResults] = useState(false);
  const [isNewInvite, setIsNewInvite] = useState(false);
  const [formData, setFormData] = useState({
    role: initialRole,
    companyName: '',
    stakeholderName: '',
    email: ''
  });
  const [acceptedTerms, setAcceptedTerms] = useState(false);
  const [sending, setSending] = useState(false);

  const projectName = 'Ben Yehuda 45';

  useEffect(() => {
    if (searchQuery.length >= 2) {
      // Search all stakeholders regardless of role - role can be assigned later
      const filtered = mockRENStakeholders.filter(s => {
        const matchesName = s.name.toLowerCase().includes(searchQuery.toLowerCase());
        const matchesCompany = s.company.toLowerCase().includes(searchQuery.toLowerCase());
        return matchesName || matchesCompany;
      });
      setSearchResults(filtered);
      setNoResults(filtered.length === 0);
    } else {
      setSearchResults([]);
      setNoResults(false);
    }
  }, [searchQuery]);

  const handleSelectStakeholder = (stakeholder) => {
    setSelectedStakeholder(stakeholder);
    setFormData({
      role: stakeholder.role,
      companyName: stakeholder.company,
      stakeholderName: stakeholder.name,
      email: stakeholder.email
    });
    setIsNewInvite(false);
  };

  const handleInviteToREN = () => {
    setIsNewInvite(true);
    setFormData({
      role: selectedRole,
      companyName: '',
      stakeholderName: searchQuery,
      email: ''
    });
    setStep(2);
  };

  const handleNextFromSearch = () => {
    if (selectedStakeholder) setStep(2);
  };

  const handleNextFromForm = () => {
    if (formData.role && formData.companyName && formData.stakeholderName && formData.email) setStep(3);
  };

  const handleSendInvite = async () => {
    if (!acceptedTerms) return;
    setSending(true);
    await new Promise(resolve => setTimeout(resolve, 1500));
    setSending(false);
    setStep(4);
  };

  const handleCancel = () => {
    if (step > 1 || searchQuery || selectedStakeholder) {
      setShowCancelConfirm(true);
    } else {
      navigate('/project');
    }
  };

  const getRoleLabel = (roleValue) => {
    const role = roleOptions.find(r => r.value === roleValue);
    return role ? role.label : roleValue;
  };

  const getRoleInfo = (roleValue) => {
    return roleOptions.find(r => r.value === roleValue);
  };

  const getSearchLabel = () => {
    const roleInfo = getRoleInfo(initialRole);
    if (roleInfo) {
      return `Search ${roleInfo.count.toLocaleString()} ${roleInfo.plural}`;
    }
    return 'Search by name or company';
  };

  // Benefits Sidebar Component
  const BenefitsSidebar = () => (
    <div className="bg-gradient-to-br from-blue-600 to-indigo-700 text-white p-6 flex flex-col h-full">
      {/* Logo - Centered */}
      <div className="flex justify-center mb-8">
        <img src="/logo.png" alt="GetStatus" className="h-8" />
      </div>

      <div className="flex-1 flex flex-col">
        <div className="mb-6">
          <h3 className="text-lg font-bold mb-2" style={{ fontFamily: '"Noto Sans", sans-serif' }}>
            Collaborate on GetStatus
          </h3>
          <p className="text-blue-100 text-sm" style={{ fontFamily: '"Noto Sans", sans-serif' }}>
            Add stakeholders to streamline your project collaboration
          </p>
        </div>

        <div className="space-y-4">
          <div className="flex items-start gap-3">
            <div className="w-8 h-8 bg-white/20 rounded-lg flex items-center justify-center flex-shrink-0">
              <MessageSquare size={16} />
            </div>
            <div>
              <p className="font-medium text-sm" style={{ fontFamily: '"Noto Sans", sans-serif' }}>Real-time Updates</p>
              <p className="text-blue-200 text-xs" style={{ fontFamily: '"Noto Sans", sans-serif' }}>Share progress instantly</p>
            </div>
          </div>

          <div className="flex items-start gap-3">
            <div className="w-8 h-8 bg-white/20 rounded-lg flex items-center justify-center flex-shrink-0">
              <FileText size={16} />
            </div>
            <div>
              <p className="font-medium text-sm" style={{ fontFamily: '"Noto Sans", sans-serif' }}>Secure Documents</p>
              <p className="text-blue-200 text-xs" style={{ fontFamily: '"Noto Sans", sans-serif' }}>Exchange files safely</p>
            </div>
          </div>

          <div className="flex items-start gap-3">
            <div className="w-8 h-8 bg-white/20 rounded-lg flex items-center justify-center flex-shrink-0">
              <Share2 size={16} />
            </div>
            <div>
              <p className="font-medium text-sm" style={{ fontFamily: '"Noto Sans", sans-serif' }}>Shared Workspace</p>
              <p className="text-blue-200 text-xs" style={{ fontFamily: '"Noto Sans", sans-serif' }}>Collaborate in one place</p>
            </div>
          </div>
        </div>
      </div>

      {/* Privacy - pinned to bottom */}
      <div className="mt-auto pt-6 border-t border-white/20">
        <div className="flex items-start gap-3">
          <Shield size={20} className="text-emerald-300 flex-shrink-0" />
          <div>
            <p className="font-medium text-sm text-emerald-300" style={{ fontFamily: '"Noto Sans", sans-serif' }}>Your Privacy Protected</p>
            <p className="text-blue-200 text-xs mt-1" style={{ fontFamily: '"Noto Sans", sans-serif' }}>
              Only shared workspace content is visible. Your private data stays private.
            </p>
          </div>
        </div>
      </div>
    </div>
  );

  // Step 1: Search
  const renderSearchStep = () => (
    <div className="p-6 flex flex-col flex-1">
      <h2 className="text-xl font-bold text-gray-900 mb-1" style={{ fontFamily: '"Noto Sans", sans-serif' }}>
        Add a Stakeholder
      </h2>
      <p className="text-gray-500 text-sm mb-6" style={{ fontFamily: '"Noto Sans", sans-serif' }}>
        Search the Real Estate Network
      </p>

      {/* Search Input */}
      <div className="mb-4">
        <label className="block text-sm font-medium text-gray-700 mb-1.5" style={{ fontFamily: '"Noto Sans", sans-serif' }}>
          {getSearchLabel()}
        </label>
        <div className="relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Type to search..."
            className="w-full border border-gray-300 rounded-lg pl-10 pr-4 py-2.5 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm"
            style={{ fontFamily: '"Noto Sans", sans-serif' }}
          />
        </div>
      </div>

      {/* Search Results - Fixed height container */}
      <div className="mb-4 h-48 border border-gray-200 rounded-lg overflow-hidden bg-gray-50">
        {searchQuery.length < 2 ? (
          <div className="h-full flex flex-col items-center justify-center px-4 py-3">
            <p className="text-xs text-gray-400 mb-3" style={{ fontFamily: '"Noto Sans", sans-serif' }}>
              The Real Estate Network in numbers
            </p>
            <div className="grid grid-cols-3 gap-2">
              {[
                { label: 'Lawyers', count: 307 },
                { label: 'Developers', count: 300 },
                { label: 'Representatives', count: 538 },
                { label: 'Supervisors', count: 77 },
                { label: 'Appraisers', count: 41 },
                { label: 'Projects', count: '3,830' },
              ].map((stat) => (
                <div
                  key={stat.label}
                  className="px-3 py-2 rounded-lg bg-indigo-50 border border-indigo-100 text-center"
                >
                  <span className="text-sm font-bold text-indigo-600 block">{stat.count}</span>
                  <span className="text-xs text-indigo-400">{stat.label}</span>
                </div>
              ))}
            </div>
          </div>
        ) : searchResults.length > 0 ? (
          <div className="divide-y divide-gray-100 h-full overflow-y-auto">
            {searchResults.map(stakeholder => (
              <button
                key={stakeholder.id}
                onClick={() => handleSelectStakeholder(stakeholder)}
                className={`w-full px-3 py-3 flex items-center gap-3 hover:bg-blue-50 transition-colors text-left cursor-pointer ${
                  selectedStakeholder?.id === stakeholder.id ? 'bg-blue-50 border-l-4 border-blue-600' : ''
                }`}
              >
                <div className="w-10 h-10 bg-gray-100 rounded-full flex items-center justify-center">
                  <User size={20} className="text-gray-500" />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="font-medium text-gray-900 text-sm truncate" style={{ fontFamily: '"Noto Sans", sans-serif' }}>
                    {stakeholder.name}
                  </p>
                  <p className="text-xs text-gray-500 truncate" style={{ fontFamily: '"Noto Sans", sans-serif' }}>
                    {stakeholder.company} • {getRoleLabel(stakeholder.role)}
                  </p>
                </div>
                {selectedStakeholder?.id === stakeholder.id && (
                  <Check size={18} className="text-blue-600 flex-shrink-0" />
                )}
              </button>
            ))}
          </div>
        ) : noResults ? (
          <div className="h-full flex flex-col items-center justify-center bg-amber-50">
            <AlertCircle className="mb-2 text-amber-500" size={24} />
            <p className="text-sm text-gray-700 mb-1" style={{ fontFamily: '"Noto Sans", sans-serif' }}>
              "{searchQuery}" not found
            </p>
            <p className="text-xs text-gray-500 mb-3" style={{ fontFamily: '"Noto Sans", sans-serif' }}>
              Invite them to collaborate
            </p>
            <button
              onClick={handleInviteToREN}
              className="px-4 py-2 bg-blue-600 text-white text-sm font-medium rounded-lg hover:bg-blue-700 transition-colors cursor-pointer"
              style={{ fontFamily: '"Noto Sans", sans-serif' }}
            >
              Invite to REN
            </button>
          </div>
        ) : (
          <div className="h-full flex items-center justify-center text-gray-400">
            <div className="w-5 h-5 border-2 border-gray-300 border-t-blue-600 rounded-full animate-spin"></div>
          </div>
        )}
      </div>

      {/* Spacer */}
      <div className="flex-1"></div>

      {/* Actions */}
      <div className="flex gap-3 pt-2">
        <button
          onClick={handleCancel}
          className="flex-1 px-4 py-2.5 text-gray-700 font-medium rounded-lg hover:bg-gray-100 transition-colors border border-gray-300 cursor-pointer text-sm"
          style={{ fontFamily: '"Noto Sans", sans-serif' }}
        >
          Cancel
        </button>
        <button
          onClick={handleNextFromSearch}
          disabled={!selectedStakeholder}
          className="flex-1 px-4 py-2.5 bg-blue-600 text-white font-medium rounded-lg hover:bg-blue-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer text-sm"
          style={{ fontFamily: '"Noto Sans", sans-serif' }}
        >
          Next
        </button>
      </div>
    </div>
  );

  // Step 2: Form
  const renderFormStep = () => (
    <div className="p-6 flex flex-col flex-1">
      <h2 className="text-xl font-bold text-gray-900 mb-1" style={{ fontFamily: '"Noto Sans", sans-serif' }}>
        {isNewInvite ? 'Invite to REN' : 'Confirm Details'}
      </h2>
      <p className="text-gray-500 text-sm mb-6" style={{ fontFamily: '"Noto Sans", sans-serif' }}>
        {isNewInvite ? 'Enter stakeholder details' : 'Review information'}
      </p>

      <div className="space-y-4 mb-6">
        {/* Name */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1.5" style={{ fontFamily: '"Noto Sans", sans-serif' }}>Name</label>
          <div className="relative">
            <User className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
            <input
              type="text"
              value={formData.stakeholderName}
              onChange={(e) => setFormData({ ...formData, stakeholderName: e.target.value })}
              disabled={!isNewInvite}
              placeholder="First and last name"
              className="w-full border border-gray-300 rounded-lg pl-10 pr-4 py-2.5 focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:bg-gray-50 disabled:text-gray-700 text-sm"
              style={{ fontFamily: '"Noto Sans", sans-serif' }}
            />
          </div>
        </div>

        {/* Role - always editable to assign role for this project */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1.5" style={{ fontFamily: '"Noto Sans", sans-serif' }}>Role in this project</label>
          <div className="relative">
            <select
              value={formData.role}
              onChange={(e) => setFormData({ ...formData, role: e.target.value })}
              className="w-full border border-gray-300 rounded-lg px-4 py-2.5 appearance-none bg-white focus:outline-none focus:ring-2 focus:ring-blue-500 cursor-pointer text-sm"
              style={{ fontFamily: '"Noto Sans", sans-serif' }}
            >
              <option value="">Select role</option>
              {roleOptions.map(role => (
                <option key={role.value} value={role.value}>{role.label}</option>
              ))}
            </select>
            <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none" size={18} />
          </div>
        </div>

        {/* Company */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1.5" style={{ fontFamily: '"Noto Sans", sans-serif' }}>Company</label>
          <div className="relative">
            <Building className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
            <input
              type="text"
              value={formData.companyName}
              onChange={(e) => setFormData({ ...formData, companyName: e.target.value })}
              disabled={!isNewInvite}
              placeholder="Company name"
              className="w-full border border-gray-300 rounded-lg pl-10 pr-4 py-2.5 focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:bg-gray-50 disabled:text-gray-700 text-sm"
              style={{ fontFamily: '"Noto Sans", sans-serif' }}
            />
          </div>
        </div>

        {/* Email - always editable */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1.5" style={{ fontFamily: '"Noto Sans", sans-serif' }}>Email</label>
          <div className="relative">
            <Mail className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
            <input
              type="email"
              value={formData.email}
              onChange={(e) => setFormData({ ...formData, email: e.target.value })}
              placeholder="email@example.com"
              className="w-full border border-gray-300 rounded-lg pl-10 pr-4 py-2.5 focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm"
              style={{ fontFamily: '"Noto Sans", sans-serif' }}
            />
          </div>
        </div>
      </div>

      {/* Spacer */}
      <div className="flex-1"></div>

      <div className="flex gap-3">
        <button
          onClick={() => setStep(1)}
          className="px-4 py-2.5 text-gray-700 font-medium rounded-lg hover:bg-gray-100 transition-colors border border-gray-300 cursor-pointer text-sm flex items-center gap-2"
          style={{ fontFamily: '"Noto Sans", sans-serif' }}
        >
          <ArrowLeft size={16} />
          Back
        </button>
        <button
          onClick={handleNextFromForm}
          disabled={!formData.role || !formData.companyName || !formData.stakeholderName || !formData.email}
          className="flex-1 px-4 py-2.5 bg-blue-600 text-white font-medium rounded-lg hover:bg-blue-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer text-sm"
          style={{ fontFamily: '"Noto Sans", sans-serif' }}
        >
          Next
        </button>
      </div>
    </div>
  );

  // Step 3: Confirmation
  const renderConfirmationStep = () => (
    <div className="p-6 flex flex-col flex-1">
      <h2 className="text-xl font-bold text-gray-900 mb-4" style={{ fontFamily: '"Noto Sans", sans-serif' }}>
        Confirm Invitation
      </h2>
      {/* Stakeholder card */}
      <p className="text-xs font-medium text-gray-900 uppercase tracking-wide mb-2" style={{ fontFamily: '"Noto Sans", sans-serif' }}>
        You're Inviting
      </p>
      <div className="bg-gray-50 border border-gray-200 rounded-lg p-4 mb-4">
        <div className="flex items-center gap-4">
          <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center flex-shrink-0">
            <User size={24} className="text-blue-600" />
          </div>
          <div className="flex-1 min-w-0 space-y-1">
            <h4 className="font-semibold text-gray-900 text-base leading-relaxed" style={{ fontFamily: '"Noto Sans", sans-serif' }}>
              {formData.stakeholderName}
            </h4>
            <p className="text-sm text-gray-500 leading-relaxed" style={{ fontFamily: '"Noto Sans", sans-serif' }}>
              {getRoleLabel(formData.role)} at {formData.companyName}
            </p>
            <p className="text-sm text-gray-400 truncate leading-relaxed" style={{ fontFamily: '"Noto Sans", sans-serif' }}>
              {formData.email}
            </p>
          </div>
        </div>
      </div>

      {/* Project card */}
      <p className="text-xs font-medium text-gray-900 uppercase tracking-wide mb-2" style={{ fontFamily: '"Noto Sans", sans-serif' }}>
        To Project
      </p>
      <div className="bg-gray-50 border border-gray-200 rounded-lg p-4 mb-4">
        <div className="flex items-center gap-4">
          <div className="w-12 h-12 bg-indigo-100 rounded-full flex items-center justify-center flex-shrink-0">
            <Building size={24} className="text-indigo-600" />
          </div>
          <div className="flex-1 min-w-0">
            <h4 className="font-semibold text-gray-900 text-base leading-relaxed" style={{ fontFamily: '"Noto Sans", sans-serif' }}>
              {projectName}
            </h4>
            <p className="text-sm text-gray-500 leading-relaxed" style={{ fontFamily: '"Noto Sans", sans-serif' }}>
              Urban Renewal Project
            </p>
          </div>
        </div>
      </div>

      <div className="flex items-center gap-2 bg-emerald-50 border border-emerald-200 rounded-lg px-3 py-2 mb-4">
        <Lock size={14} className="text-emerald-600 flex-shrink-0" />
        <p className="text-xs text-emerald-700" style={{ fontFamily: '"Noto Sans", sans-serif' }}>
          Only shared workspace content will be visible to {formData.stakeholderName}
        </p>
      </div>

      {/* Spacer to push actions to bottom */}
      <div className="flex-1"></div>

      <label htmlFor="terms" className="flex items-center gap-2 mb-4 cursor-pointer">
        <input
          type="checkbox"
          id="terms"
          checked={acceptedTerms}
          onChange={(e) => setAcceptedTerms(e.target.checked)}
          className="w-4 h-4 text-blue-600 rounded border-gray-300 cursor-pointer"
        />
        <span className="text-xs text-gray-600" style={{ fontFamily: '"Noto Sans", sans-serif' }}>
          I agree to the <a href="/terms" className="text-blue-600 hover:underline">Terms</a> and <a href="/privacy" className="text-blue-600 hover:underline">Privacy Policy</a>
        </span>
      </label>

      <div className="flex gap-3">
        <button
          onClick={handleCancel}
          className="px-4 py-2.5 text-gray-700 font-medium rounded-lg hover:bg-gray-100 transition-colors border border-gray-300 cursor-pointer text-sm"
          style={{ fontFamily: '"Noto Sans", sans-serif' }}
        >
          Cancel
        </button>
        <button
          onClick={handleSendInvite}
          disabled={!acceptedTerms || sending}
          className="flex-1 px-4 py-2.5 bg-blue-600 text-white font-medium rounded-lg hover:bg-blue-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer text-sm flex items-center justify-center gap-2"
          style={{ fontFamily: '"Noto Sans", sans-serif' }}
        >
          {sending ? (
            <>
              <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
              Sending...
            </>
          ) : (
            <>
              <Send size={16} />
              Send Invitation
            </>
          )}
        </button>
      </div>
    </div>
  );

  // Step 4: Success
  const renderSuccessStep = () => (
    <div className="p-6 flex flex-col flex-1 text-center">
      <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
        <CheckCircle className="text-green-600" size={32} />
      </div>
      <h2 className="text-xl font-bold text-gray-900 mb-2" style={{ fontFamily: '"Noto Sans", sans-serif' }}>
        Invitation Sent!
      </h2>
      <p className="text-gray-600 text-sm mb-6" style={{ fontFamily: '"Noto Sans", sans-serif' }}>
        {formData.stakeholderName} will receive an email to join {projectName}
      </p>

      <div className="bg-gray-50 rounded-lg p-4 mb-4 text-left">
        <p className="text-xs font-medium text-gray-500 uppercase mb-2" style={{ fontFamily: '"Noto Sans", sans-serif' }}>What's next</p>
        <div className="space-y-2 text-sm text-gray-700">
          <div className="flex items-center gap-2">
            <div className="w-5 h-5 bg-blue-600 text-white rounded-full flex items-center justify-center text-xs">1</div>
            <span>They receive your invitation</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-5 h-5 bg-blue-600 text-white rounded-full flex items-center justify-center text-xs">2</div>
            <span>They accept and join</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-5 h-5 bg-blue-600 text-white rounded-full flex items-center justify-center text-xs">3</div>
            <span>Start collaborating!</span>
          </div>
        </div>
      </div>

      <div className="flex items-center justify-center gap-2 text-emerald-600 bg-emerald-50 rounded-lg px-4 py-2 mb-4">
        <Shield size={16} className="flex-shrink-0" />
        <p className="text-xs" style={{ fontFamily: '"Noto Sans", sans-serif' }}>
          You have full control over what to share with {formData.stakeholderName}
        </p>
      </div>

      {/* Spacer */}
      <div className="flex-1"></div>

      <button
        onClick={() => navigate('/project')}
        className="w-full px-4 py-2.5 bg-blue-600 text-white font-medium rounded-lg hover:bg-blue-700 transition-colors cursor-pointer text-sm"
        style={{ fontFamily: '"Noto Sans", sans-serif' }}
      >
        Done
      </button>
    </div>
  );

  // Cancel Confirmation Modal
  const renderCancelConfirmation = () => (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
      <div className="bg-white rounded-xl p-6 max-w-xs w-full mx-4 shadow-2xl">
        <h3 className="text-lg font-bold text-gray-900 mb-2" style={{ fontFamily: '"Noto Sans", sans-serif' }}>
          Cancel Invitation?
        </h3>
        <p className="text-gray-600 text-sm mb-4" style={{ fontFamily: '"Noto Sans", sans-serif' }}>
          Are you sure you want to discard this invite?
        </p>
        <div className="flex gap-3">
          <button
            onClick={() => setShowCancelConfirm(false)}
            className="flex-1 px-4 py-2 text-gray-700 font-medium rounded-lg hover:bg-gray-100 border border-gray-300 cursor-pointer text-sm"
          >
            Go back
          </button>
          <button
            onClick={() => navigate('/project')}
            className="flex-1 px-4 py-2 bg-red-600 text-white font-medium rounded-lg hover:bg-red-700 cursor-pointer text-sm"
          >
            Discard
          </button>
        </div>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center p-4">
      {/* Two-column Dialog */}
      <div className="bg-white rounded-2xl shadow-2xl w-full max-w-4xl overflow-hidden flex items-stretch">
        {/* Left: Benefits Sidebar */}
        <div className="hidden md:flex w-80 flex-shrink-0">
          <BenefitsSidebar />
        </div>

        {/* Right: Form Content - Fixed height based on tallest step */}
        <div className="flex-1 flex flex-col h-[620px]">
          {/* Header with Step Indicator */}
          <div className="flex items-center justify-between px-6 py-4 border-b border-gray-100">
            <div className="flex items-center gap-4">
              {[
                { num: 1, label: 'Search' },
                { num: 2, label: 'Details' },
                { num: 3, label: 'Confirm' }
              ].map((s, idx) => (
                <div key={s.num} className="flex items-center">
                  <div className="flex items-center gap-2">
                    <div
                      className={`w-6 h-6 rounded-full flex items-center justify-center text-xs font-semibold transition-all ${
                        step > s.num
                          ? 'bg-blue-600 text-white'
                          : step === s.num
                          ? 'bg-blue-600 text-white ring-4 ring-blue-100'
                          : 'bg-gray-200 text-gray-500'
                      }`}
                    >
                      {step > s.num ? <Check size={12} /> : s.num}
                    </div>
                    <span
                      className={`text-xs font-medium hidden sm:block ${
                        step >= s.num ? 'text-gray-900' : 'text-gray-400'
                      }`}
                      style={{ fontFamily: '"Noto Sans", sans-serif' }}
                    >
                      {s.label}
                    </span>
                  </div>
                  {idx < 2 && (
                    <div className={`w-8 h-0.5 mx-2 ${step > s.num ? 'bg-blue-600' : 'bg-gray-200'}`} />
                  )}
                </div>
              ))}
            </div>
            <button
              onClick={handleCancel}
              className="p-1.5 text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded-full cursor-pointer"
            >
              <X size={18} />
            </button>
          </div>

          {/* Content */}
          {step === 1 && renderSearchStep()}
          {step === 2 && renderFormStep()}
          {step === 3 && renderConfirmationStep()}
          {step === 4 && renderSuccessStep()}
        </div>
      </div>

      {showCancelConfirm && renderCancelConfirmation()}
    </div>
  );
}
