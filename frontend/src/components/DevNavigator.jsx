import { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import {
  Compass,
  X,
  UserPlus,
  LogIn,
  FolderKanban,
  Send,
  UserCheck
} from 'lucide-react';

export default function DevNavigator() {
  const navigate = useNavigate();
  const location = useLocation();
  const [isOpen, setIsOpen] = useState(false);

  // Organized by USER FLOWS
  const pages = [
    {
      category: 'Invite Stakeholder Flow',
      icon: Send,
      description: 'Complete invite flow for testing',
      items: [
        { name: '1. Project Page', path: '/', icon: FolderKanban, description: 'Click "Choose" to start invite' },
        { name: '2. Add Stakeholder Dialog', path: '/project/invite', icon: UserPlus, description: 'Search → Details → Confirm' },
        { name: '3a. Invitee: New User', path: '/invite/demo?scenario=1', icon: UserPlus, description: 'Signup to accept invite' },
        { name: '3b. Invitee: Logged In', path: '/invite/demo?scenario=2', icon: UserCheck, description: 'One-click accept' },
        { name: '3c. Invitee: Logged Out', path: '/invite/demo?scenario=3', icon: LogIn, description: 'Login to accept' },
      ]
    },
  ];

  const handleNavigate = (path) => {
    navigate(path);
    setIsOpen(false);
  };

  return (
    <>
      {/* FAB Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className={`fixed bottom-6 right-6 z-50 w-14 h-14 rounded-full shadow-2xl flex items-center justify-center transition-all transform hover:scale-110 ${
          isOpen
            ? 'bg-red-500 hover:bg-red-600 rotate-90'
            : 'bg-gradient-to-br from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700'
        }`}
        aria-label="Developer Navigator"
      >
        {isOpen ? (
          <X className="w-6 h-6 text-white" />
        ) : (
          <Compass className="w-6 h-6 text-white" />
        )}
      </button>

      {/* Navigation Panel */}
      {isOpen && (
        <>
          {/* Backdrop */}
          <div
            className="fixed inset-0 bg-black/20 backdrop-blur-sm z-40"
            onClick={() => setIsOpen(false)}
          ></div>

          {/* Panel */}
          <div className="fixed bottom-24 right-6 z-50 w-[420px] max-h-[650px] bg-white rounded-2xl shadow-2xl border border-gray-200 overflow-hidden">
            {/* Header */}
            <div className="bg-gradient-to-r from-purple-600 to-blue-600 px-6 py-4 text-white">
              <div className="flex items-center gap-3">
                <Compass className="w-5 h-5" />
                <div>
                  <h3 className="font-bold text-lg">Dev Navigator</h3>
                  <p className="text-xs text-purple-100">Navigate user flows for testing</p>
                </div>
              </div>
            </div>

            {/* Current Page */}
            <div className="px-6 py-3 bg-blue-50 border-b border-blue-100">
              <p className="text-xs text-blue-600 font-medium">Current Page</p>
              <p className="text-sm text-blue-900 font-semibold truncate">{location.pathname}{location.search}</p>
            </div>

            {/* Navigation List */}
            <div className="overflow-y-auto max-h-[480px]">
              {pages.map((category, idx) => (
                <div key={idx} className="border-b border-gray-100 last:border-0">
                  {/* Category Header */}
                  <div className="px-6 py-3 bg-gray-50">
                    <div className="flex items-center gap-2">
                      <category.icon className="w-4 h-4 text-gray-600" />
                      <div>
                        <h4 className="text-xs font-bold text-gray-700 uppercase tracking-wide">
                          {category.category}
                        </h4>
                        {category.description && (
                          <p className="text-xs text-gray-500">{category.description}</p>
                        )}
                      </div>
                    </div>
                  </div>

                  {/* Category Items */}
                  <div className="py-1">
                    {category.items.map((item, itemIdx) => {
                      const isActive = location.pathname + location.search === item.path ||
                                       (location.pathname === item.path && !item.path.includes('?'));
                      return (
                        <button
                          key={itemIdx}
                          onClick={() => handleNavigate(item.path)}
                          className={`w-full px-6 py-3 flex items-center gap-3 transition-all hover:bg-blue-50 group ${
                            isActive ? 'bg-blue-50 border-l-4 border-blue-600' : ''
                          }`}
                        >
                          <item.icon className={`w-4 h-4 flex-shrink-0 ${
                            isActive ? 'text-blue-600' : 'text-gray-400 group-hover:text-blue-600'
                          }`} />
                          <div className="flex-1 text-left min-w-0">
                            <p className={`text-sm font-medium truncate ${
                              isActive ? 'text-blue-900' : 'text-gray-700 group-hover:text-blue-900'
                            }`}>
                              {item.name}
                            </p>
                            {item.description && (
                              <p className="text-xs text-gray-500 truncate">{item.description}</p>
                            )}
                          </div>
                          {isActive && (
                            <div className="w-2 h-2 bg-blue-600 rounded-full flex-shrink-0"></div>
                          )}
                        </button>
                      );
                    })}
                  </div>
                </div>
              ))}
            </div>

            {/* Footer */}
            <div className="px-6 py-3 bg-gray-50 border-t border-gray-200">
              <p className="text-xs text-gray-500 text-center">
                Organized by user flows for V2 Collaboration
              </p>
            </div>
          </div>
        </>
      )}
    </>
  );
}
