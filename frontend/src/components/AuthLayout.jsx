export default function AuthLayout({ children, title, subtitle, showAppDownload = false }) {
  return (
    <div className="min-h-screen flex">
      {/* Left Side - Dark Blue Brand Panel */}
      <div className="hidden lg:flex lg:w-1/2 bg-gradient-to-br from-blue-900 via-blue-800 to-indigo-900 relative overflow-hidden">
        {/* Decorative circles */}
        <div className="absolute top-0 right-0 w-96 h-96 bg-blue-700/20 rounded-full blur-3xl -translate-y-1/2 translate-x-1/3"></div>
        <div className="absolute bottom-0 left-0 w-96 h-96 bg-indigo-700/20 rounded-full blur-3xl translate-y-1/2 -translate-x-1/3"></div>

        <div className="relative z-10 flex flex-col justify-center items-center p-12 xl:p-16 w-full h-full">
          {/* Main Content */}
          <div className="space-y-8 text-center">
            <div>
              <h1 className="text-4xl xl:text-5xl font-bold text-white leading-tight mb-2" style={{ fontFamily: '"Noto Sans", sans-serif' }}>
                Building Trust through
              </h1>
              <h1 className="text-4xl xl:text-5xl font-bold text-green-400 leading-tight" style={{ fontFamily: '"Noto Sans", sans-serif' }}>
                Transparency.
              </h1>
            </div>

            <p className="text-blue-100 text-lg leading-relaxed max-w-md" style={{ fontFamily: '"Noto Sans", sans-serif' }}>
              Track your urban renewal project in real-time. Access documents, view timelines, and stay updated.
            </p>

            {/* Features */}
            <div className="space-y-4">
              {[
                'Real-time Status Updates',
                'Secure Document Access',
                'Personalized Timeline'
              ].map((feature, i) => (
                <div key={i} className="flex items-center gap-3">
                  <div className="w-6 h-6 bg-blue-700/50 rounded-full flex items-center justify-center">
                    <svg className="w-4 h-4 text-green-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="3">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                    </svg>
                  </div>
                  <span className="text-blue-50 text-base" style={{ fontFamily: '"Noto Sans", sans-serif' }}>
                    {feature}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Right Side - White Form Panel */}
      <div className="w-full lg:w-1/2 bg-white flex justify-center p-6 lg:p-12 relative">
        {/* Logo - Fixed Position */}
        <div className="absolute top-8 left-1/2 -translate-x-1/2">
          <img src="/logo.png" alt="GetStatus" className="h-12" />
        </div>

        <div className="w-full max-w-md pt-32">
          {children}
        </div>
      </div>
    </div>
  );
}
