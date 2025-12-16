import { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { Compass, X, Home, LogIn, UserPlus, Key, Shield, Mail, Users, Briefcase, FileText } from 'lucide-react';

export default function DevNavigator() {
  const navigate = useNavigate();
  const location = useLocation();
  const [isOpen, setIsOpen] = useState(false);

  const pages = [
    {
      category: 'Home Pages',
      icon: Home,
      items: [
        { name: 'REN Home (Main)', path: '/', icon: Home },
        { name: 'REN Home (/ren)', path: '/ren', icon: Home },
      ]
    },
    {
      category: 'Login Pages',
      icon: LogIn,
      items: [
        { name: 'Login Selection', path: '/login', icon: LogIn },
        { name: 'Resident Login', path: '/login/resident', icon: Users },
        { name: 'Stakeholder Login', path: '/login/stakeholder', icon: Briefcase },
      ]
    },
    {
      category: 'Landing Pages (V2)',
      icon: FileText,
      items: [
        { name: 'Resident Landing (Netflix)', path: '/login2/resident', icon: Users },
        { name: 'Stakeholder Landing (Netflix)', path: '/login2/stakeholder', icon: Briefcase },
      ]
    },
    {
      category: 'Login V3',
      icon: LogIn,
      items: [
        { name: 'Resident Login V3 (Simple)', path: '/login3/resident', icon: Users },
      ]
    },
    {
      category: 'Signup Pages',
      icon: UserPlus,
      items: [
        { name: 'User Type Selection', path: '/signup', icon: UserPlus },
        { name: 'Resident Signup', path: '/signup/resident', icon: Users },
        { name: 'Stakeholder Signup', path: '/signup/stakeholder', icon: Briefcase },
      ]
    },
    {
      category: 'Auth & Other',
      icon: Shield,
      items: [
        { name: 'Forgot Password', path: '/forgot-password', icon: Key },
        { name: 'OTP Verification', path: '/verify-otp', icon: Mail },
        { name: 'Approval Waiting', path: '/approval-waiting', icon: Shield },
        { name: 'Invite Demo', path: '/invite/demo', icon: Users },
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
          <div className="fixed bottom-24 right-6 z-50 w-96 max-h-[600px] bg-white rounded-2xl shadow-2xl border border-gray-200 overflow-hidden">
            {/* Header */}
            <div className="bg-gradient-to-r from-purple-600 to-blue-600 px-6 py-4 text-white">
              <div className="flex items-center gap-3">
                <Compass className="w-5 h-5" />
                <div>
                  <h3 className="font-bold text-lg">Dev Navigator</h3>
                  <p className="text-xs text-purple-100">Quick page navigation for testing</p>
                </div>
              </div>
            </div>

            {/* Current Page */}
            <div className="px-6 py-3 bg-blue-50 border-b border-blue-100">
              <p className="text-xs text-blue-600 font-medium">Current Page</p>
              <p className="text-sm text-blue-900 font-semibold truncate">{location.pathname}</p>
            </div>

            {/* Navigation List */}
            <div className="overflow-y-auto max-h-[440px]">
              {pages.map((category, idx) => (
                <div key={idx} className="border-b border-gray-100 last:border-0">
                  {/* Category Header */}
                  <div className="px-6 py-3 bg-gray-50">
                    <div className="flex items-center gap-2">
                      <category.icon className="w-4 h-4 text-gray-600" />
                      <h4 className="text-xs font-bold text-gray-700 uppercase tracking-wide">
                        {category.category}
                      </h4>
                    </div>
                  </div>

                  {/* Category Items */}
                  <div className="py-1">
                    {category.items.map((item, itemIdx) => (
                      <button
                        key={itemIdx}
                        onClick={() => handleNavigate(item.path)}
                        className={`w-full px-6 py-3 flex items-center gap-3 transition-all hover:bg-blue-50 group ${
                          location.pathname === item.path ? 'bg-blue-50 border-l-4 border-blue-600' : ''
                        }`}
                      >
                        <item.icon className={`w-4 h-4 ${
                          location.pathname === item.path ? 'text-blue-600' : 'text-gray-400 group-hover:text-blue-600'
                        }`} />
                        <div className="flex-1 text-left">
                          <p className={`text-sm font-medium ${
                            location.pathname === item.path ? 'text-blue-900' : 'text-gray-700 group-hover:text-blue-900'
                          }`}>
                            {item.name}
                          </p>
                          <p className="text-xs text-gray-500">{item.path}</p>
                        </div>
                        {location.pathname === item.path && (
                          <div className="w-2 h-2 bg-blue-600 rounded-full"></div>
                        )}
                      </button>
                    ))}
                  </div>
                </div>
              ))}
            </div>

            {/* Footer */}
            <div className="px-6 py-3 bg-gray-50 border-t border-gray-200">
              <p className="text-xs text-gray-500 text-center">
                💡 This is only visible in development
              </p>
            </div>
          </div>
        </>
      )}
    </>
  );
}
