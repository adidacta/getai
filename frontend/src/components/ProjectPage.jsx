import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  ChevronLeft,
  ChevronDown,
  Pencil,
  Check,
  MoreVertical,
  Home,
  Mail,
  CheckSquare,
  MessageSquare,
  Users,
  Globe,
  User
} from 'lucide-react';

export default function ProjectPage() {
  const navigate = useNavigate();
  const [showInviteDialog, setShowInviteDialog] = useState(false);
  const [selectedRole, setSelectedRole] = useState(null);

  // Mock project data
  const project = {
    name: 'Ben Yehuda 45',
    type: 'פינוי בינוי',
    courseType: '',
    overallStatus: '',
  };

  // Stakeholder roles configuration
  const stakeholders = [
    {
      role: 'Representative',
      roleKey: 'representative',
      assigned: false,
      name: null,
      status: 'Not specified'
    },
    {
      role: 'Builder',
      roleKey: 'builder',
      assigned: true,
      name: 'מרקט פיט יזמות',
      status: null
    },
    {
      role: 'Lawyer',
      roleKey: 'lawyer',
      assigned: false,
      name: null,
      status: 'Not chosen yet'
    },
    {
      role: 'Supervisor',
      roleKey: 'supervisor',
      assigned: false,
      name: null,
      status: 'Not chosen yet'
    },
  ];

  const additionalStatuses = [
    'Organization',
    'Planning',
    'Registration',
    'Execution',
    'Population',
    'Bedek'
  ];

  const additionalStakeholders = [
    { label: 'Add PM', role: 'pm' },
    { label: 'Add Municipality', role: 'municipality' },
    { label: 'Add Appraiser', role: 'appraiser' },
    { label: 'Add Public Housing', role: 'public_housing' },
  ];

  const tabs = [
    { name: 'Project Status', active: true },
    { name: 'My Process', active: false },
    { name: 'Documents', active: false },
    { name: 'Updates', active: false },
    { name: 'Contacts', active: false },
    { name: 'Tasks', active: false },
    { name: 'Signatures status', active: false },
  ];

  const handleChooseStakeholder = (role) => {
    setSelectedRole(role);
    navigate(`/project/invite?role=${role}`);
  };

  const handleAddStakeholder = (role) => {
    setSelectedRole(role);
    navigate(`/project/invite?role=${role}`);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Top Navigation */}
      <nav className="bg-white border-b border-gray-200 px-6 py-3">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <div className="flex items-center gap-2">
            <div className="text-blue-600">
              <svg width="32" height="32" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M16 4L4 12V28H12V20H20V28H28V12L16 4Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                <path d="M12 12H20V16H12V12Z" fill="currentColor"/>
              </svg>
            </div>
            <span className="text-xl font-bold text-blue-600">getStatus</span>
          </div>

          {/* Main Nav */}
          <div className="flex items-center gap-6">
            <button className="flex items-center gap-2 text-gray-700 hover:text-blue-600 text-sm font-medium">
              <Home size={18} />
              Projects
            </button>
            <button className="flex items-center gap-2 text-gray-700 hover:text-blue-600 text-sm font-medium">
              <Mail size={18} />
              Project invitations
            </button>
            <button className="flex items-center gap-2 text-gray-700 hover:text-blue-600 text-sm font-medium">
              <CheckSquare size={18} />
              Tasks
            </button>
            <button className="flex items-center gap-2 text-gray-700 hover:text-blue-600 text-sm font-medium">
              <MessageSquare size={18} />
              Interacts
            </button>
            <button className="flex items-center gap-2 text-gray-700 hover:text-blue-600 text-sm font-medium">
              <Users size={18} />
              Contacts
            </button>
          </div>

          {/* Right Side */}
          <div className="flex items-center gap-4">
            <button className="flex items-center gap-2 px-4 py-2 border border-gray-300 rounded-full text-sm font-medium text-gray-700 hover:bg-gray-50">
              <Globe size={16} />
              Real Estate Network
            </button>
            <div className="flex items-center gap-2">
              <span className="text-sm text-gray-700">עדי יוסף שמורק</span>
              <div className="w-8 h-8 bg-gray-200 rounded-full flex items-center justify-center">
                <User size={16} className="text-gray-500" />
              </div>
              <ChevronDown size={16} className="text-gray-500" />
            </div>
          </div>
        </div>
      </nav>

      {/* Page Content */}
      <div className="px-6 py-4">
        {/* Back Link */}
        <button
          onClick={() => navigate(-1)}
          className="flex items-center gap-1 text-gray-600 hover:text-gray-800 text-sm mb-2"
        >
          <ChevronLeft size={16} />
          Back to projects
        </button>

        {/* Project Title */}
        <h1 className="text-2xl font-bold text-gray-900 mb-4">{project.name}</h1>

        {/* Tabs */}
        <div className="flex gap-6 border-b border-gray-200 mb-6">
          {tabs.map((tab) => (
            <button
              key={tab.name}
              className={`pb-3 text-sm font-medium border-b-2 transition-colors ${
                tab.active
                  ? 'text-blue-600 border-blue-600'
                  : 'text-gray-600 border-transparent hover:text-gray-800'
              }`}
            >
              {tab.name}
            </button>
          ))}
        </div>

        {/* Main Content Grid */}
        <div className="grid grid-cols-12 gap-6">
          {/* Left Column */}
          <div className="col-span-8 space-y-6">
            {/* Project Info Row */}
            <div className="flex gap-4">
              {/* Project Type */}
              <div className="flex-1 bg-white border border-gray-200 rounded-lg p-4">
                <label className="text-xs text-gray-500 mb-1 block">Project type</label>
                <div className="flex items-center justify-between">
                  <span className="font-medium text-gray-900">{project.type}</span>
                  <ChevronDown size={16} className="text-gray-400" />
                </div>
              </div>

              {/* Course Type */}
              <div className="flex-1 bg-white border border-gray-200 rounded-lg p-4">
                <label className="text-xs text-gray-500 mb-1 block">Course type</label>
                <div className="flex items-center justify-between">
                  <span className="font-medium text-gray-400">-</span>
                  <ChevronDown size={16} className="text-gray-400" />
                </div>
              </div>

              {/* Overall Status */}
              <div className="flex-1 bg-white border border-gray-200 rounded-lg p-4">
                <label className="text-xs text-gray-500 mb-1 block">Overall status</label>
                <div className="flex items-center justify-between">
                  <span className="font-medium text-gray-400">-</span>
                  <ChevronDown size={16} className="text-gray-400" />
                </div>
              </div>

              {/* Spacer */}
              <div className="flex-1"></div>

              {/* Buildings */}
              <div className="bg-white border border-gray-200 rounded-lg p-4 min-w-[120px]">
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-700">Buildings</span>
                  <Pencil size={14} className="text-blue-600" />
                </div>
              </div>

              {/* Apartments */}
              <div className="bg-white border border-gray-200 rounded-lg p-4 min-w-[120px]">
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-700">Apartments</span>
                  <Pencil size={14} className="text-blue-600" />
                </div>
              </div>
            </div>

            {/* Additional Statuses */}
            <div className="bg-white border border-gray-200 rounded-lg p-6">
              <h3 className="font-semibold text-gray-900 mb-4">Additional statuses</h3>
              <div className="space-y-3">
                {additionalStatuses.map((status) => (
                  <div key={status} className="flex items-center">
                    <label className="w-32 text-sm text-gray-700">{status}</label>
                    <div className="flex-1 border border-gray-200 rounded-md p-2 flex items-center justify-end">
                      <ChevronDown size={16} className="text-gray-400" />
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Address / Map */}
            <div className="bg-white border border-gray-200 rounded-lg p-6">
              <h3 className="font-semibold text-gray-900 mb-4">address</h3>
              <div className="h-80 bg-gray-100 rounded-lg flex items-center justify-center text-gray-500">
                <div className="text-center">
                  <Globe size={48} className="mx-auto mb-2 text-gray-300" />
                  <p className="text-sm">Map placeholder</p>
                  <p className="text-xs text-gray-400">Israel Map - govmap</p>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column - Stakeholders */}
          <div className="col-span-4">
            <div className="bg-white border border-gray-200 rounded-lg p-6">
              {/* Header */}
              <div className="flex items-center justify-between mb-2">
                <h3 className="font-semibold text-gray-900">Project Status On the GetStatus Network</h3>
                <div className="relative">
                  <div className="w-6 h-6 bg-red-500 rounded-full flex items-center justify-center">
                    <span className="text-white text-xs font-bold">0</span>
                  </div>
                </div>
              </div>

              {/* Progress */}
              <div className="mb-6">
                <div className="flex items-center justify-between mb-1">
                  <span className="text-sm text-gray-600">Network Completion</span>
                  <span className="text-sm font-semibold text-gray-900">25%</span>
                </div>
                <div className="h-2 bg-gray-200 rounded-full overflow-hidden">
                  <div className="h-full w-1/4 bg-red-500 rounded-full"></div>
                </div>
              </div>

              {/* Stakeholder List */}
              <div className="space-y-3">
                {stakeholders.map((stakeholder) => (
                  <div
                    key={stakeholder.role}
                    className={`rounded-lg p-4 ${
                      stakeholder.assigned
                        ? 'bg-green-500 text-white'
                        : 'bg-gray-50'
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      {/* Avatar */}
                      <div className={`w-10 h-10 rounded-full flex items-center justify-center ${
                        stakeholder.assigned
                          ? 'bg-green-400'
                          : 'bg-gray-200'
                      }`}>
                        {stakeholder.assigned ? (
                          <Check size={20} className="text-white" />
                        ) : (
                          <User size={20} className="text-gray-400" />
                        )}
                      </div>

                      {/* Info */}
                      <div className="flex-1">
                        <div className="flex items-center gap-2">
                          <span className={`font-semibold ${
                            stakeholder.assigned ? 'text-white' : 'text-gray-900'
                          }`}>
                            {stakeholder.role}
                          </span>
                          {!stakeholder.assigned && stakeholder.status && (
                            <span className="text-xs bg-gray-200 text-gray-600 px-2 py-0.5 rounded-full">
                              {stakeholder.status}
                            </span>
                          )}
                        </div>
                        {stakeholder.assigned && stakeholder.name && (
                          <p className="text-sm text-green-100">{stakeholder.name}</p>
                        )}
                        {!stakeholder.assigned && !stakeholder.status && (
                          <p className="text-sm text-gray-500">Not specified</p>
                        )}
                      </div>

                      {/* Actions */}
                      {!stakeholder.assigned && (
                        <div className="flex items-center gap-2">
                          <button
                            onClick={() => handleChooseStakeholder(stakeholder.roleKey)}
                            className="px-4 py-1.5 bg-blue-600 text-white text-sm font-medium rounded-md hover:bg-blue-700 transition-colors cursor-pointer"
                          >
                            Choose
                          </button>
                          <button className="p-1 text-gray-400 hover:text-gray-600">
                            <MoreVertical size={18} />
                          </button>
                        </div>
                      )}
                    </div>
                  </div>
                ))}
              </div>

              {/* Add Additional Stakeholders */}
              <div className="mt-6">
                <h4 className="text-sm font-semibold text-gray-900 mb-3">Add additional stakeholders</h4>
                <div className="flex flex-wrap gap-2">
                  {additionalStakeholders.map((item) => (
                    <button
                      key={item.role}
                      onClick={() => handleAddStakeholder(item.role)}
                      className="px-3 py-1.5 border border-blue-600 text-blue-600 text-sm font-medium rounded-md hover:bg-blue-50 transition-colors flex items-center gap-1 cursor-pointer"
                    >
                      <span>+</span>
                      {item.label}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
