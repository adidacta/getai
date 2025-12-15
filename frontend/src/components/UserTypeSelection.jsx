import { useNavigate } from 'react-router-dom';
import { Users, Briefcase } from 'lucide-react';
import AuthLayout from './AuthLayout';

export default function UserTypeSelection() {
  const navigate = useNavigate();

  const userTypes = [
    {
      type: 'resident',
      icon: Users,
      title: 'Resident',
      description: 'Property owner in an urban renewal project',
      gradient: 'from-blue-500 to-cyan-500',
      bgGradient: 'from-blue-50 to-cyan-50'
    },
    {
      type: 'stakeholder',
      icon: Briefcase,
      title: 'Stakeholder',
      description: 'Lawyer, developer, contractor, appraiser, supervisor or consultant',
      gradient: 'from-indigo-500 to-purple-500',
      bgGradient: 'from-indigo-50 to-purple-50'
    }
  ];

  return (
    <AuthLayout
      title="Join the Network"
      subtitle="Choose your user type and start working with full transparency"
    >
      <div className="space-y-8 min-h-[400px]">
        <div>
          <h2 className="text-3xl font-bold text-gray-900 leading-none mb-3" style={{ fontFamily: '"Noto Sans", sans-serif' }}>
            Create Account
          </h2>
          <p className="text-sm text-gray-500" style={{ fontFamily: '"Noto Sans", sans-serif' }}>
            What type of user are you?
          </p>
        </div>

        <div className="space-y-3">
          {userTypes.map(({ type, icon: Icon, title, description, gradient, bgGradient }) => (
            <button
              key={type}
              onClick={() => navigate(`/signup/${type}`)}
              className={`group w-full p-6 bg-white hover:bg-gradient-to-br hover:${bgGradient} border-2 border-gray-200 hover:border-transparent rounded-2xl transition-all duration-200 hover:shadow-lg hover:scale-[1.02]`}
            >
              <div className="flex items-center gap-5">
                <div className={`w-14 h-14 bg-gradient-to-br ${gradient} rounded-xl flex items-center justify-center shadow-md group-hover:shadow-lg transition-all`}>
                  <Icon className="w-7 h-7 text-white" />
                </div>
                <div className="flex-1 text-left">
                  <h3 className="text-lg font-bold text-gray-900 mb-0.5 transition-colors" style={{ fontFamily: '"Noto Sans", sans-serif' }}>
                    {title}
                  </h3>
                  <p className="text-xs text-gray-500 transition-colors" style={{ fontFamily: '"Noto Sans", sans-serif' }}>
                    {description}
                  </p>
                </div>
              </div>
            </button>
          ))}
        </div>

        {/* Divider */}
        <div className="relative py-4">
          <div className="absolute inset-0 flex items-center">
            <div className="w-full border-t border-gray-200"></div>
          </div>
        </div>

        {/* Login Link */}
        <div className="text-center">
          <p className="text-base text-gray-800 mb-2" style={{ fontFamily: '"Noto Sans", sans-serif' }}>
            Have a GetStatus account?
          </p>
          <button
            onClick={() => navigate('/login')}
            className="text-blue-600 hover:text-blue-700 font-semibold text-sm hover:underline transition-all"
            style={{ fontFamily: '"Noto Sans", sans-serif' }}
          >
            Sign in here
          </button>
        </div>
      </div>
    </AuthLayout>
  );
}
