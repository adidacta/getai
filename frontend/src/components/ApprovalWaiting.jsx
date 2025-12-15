import { useNavigate, useLocation } from 'react-router-dom';
import { Clock, Home, CheckCircle, Mail, Phone } from 'lucide-react';

export default function ApprovalWaiting() {
  const navigate = useNavigate();
  const location = useLocation();
  const userData = location.state?.userData;

  return (
    <div className="bg-white flex items-center justify-center min-h-screen">
      <div className="relative w-[1286px] h-[724px]">
        {/* Background */}
        <div className="absolute top-0 left-0 right-0 bottom-0 w-full h-full bg-gradient-to-br from-[#4776E6] via-[#3669d8] to-[#2850b8] rounded-lg overflow-hidden">
          {/* Network visualization */}
          <svg className="absolute inset-0 w-full h-full" preserveAspectRatio="none">
            <defs>
              <filter id="glow">
                <feGaussianBlur stdDeviation="3" result="coloredBlur"/>
                <feMerge>
                  <feMergeNode in="coloredBlur"/>
                  <feMergeNode in="SourceGraphic"/>
                </feMerge>
              </filter>
            </defs>
            <line x1="10%" y1="20%" x2="25%" y2="40%" stroke="rgba(255,255,255,0.2)" strokeWidth="1.5" />
            <line x1="25%" y1="40%" x2="45%" y2="35%" stroke="rgba(255,255,255,0.2)" strokeWidth="1.5" />
            <circle cx="10%" cy="20%" r="70" fill="none" stroke="rgba(255,255,255,0.25)" strokeWidth="2.5" filter="url(#glow)" />
            <circle cx="25%" cy="40%" r="85" fill="none" stroke="rgba(255,255,255,0.28)" strokeWidth="2.5" filter="url(#glow)" />
          </svg>

          {/* Person Icons */}
          <div className="absolute inset-0">
            {[
              { x: '10%', y: '20%', size: 35 },
              { x: '25%', y: '40%', size: 42 }
            ].map((node, i) => (
              <div key={i} className="absolute -translate-x-1/2 -translate-y-1/2" style={{ left: node.x, top: node.y }}>
                <svg width={node.size} height={node.size} viewBox="0 0 20 20" fill="rgba(255,255,255,0.35)">
                  <path fillRule="evenodd" d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" clipRule="evenodd" />
                </svg>
              </div>
            ))}
          </div>

          {/* Hero Text */}
          <div className="absolute top-[60px] left-[60px] text-white" style={{ fontFamily: '"Noto Sans Hebrew", sans-serif' }} dir="rtl">
            <h1 className="text-5xl font-bold mb-3 leading-tight">
              בקשתך נשלחה
            </h1>
            <p className="text-lg leading-relaxed max-w-md">
              נשלח הודעה לבעל התפקיד בפרויקט<br />
              ונעדכן אותך ברגע שתאושר
            </p>
          </div>
        </div>

        {/* Approval Waiting Card */}
        <div className="absolute bg-white rounded-2xl shadow-2xl" style={{ left: '833.2px', top: '72.5px', width: '378px', height: '580px' }}>
          <div className="relative h-full flex flex-col p-6">
            {/* Logo */}
            <div className="absolute left-4 top-2.5 flex items-center h-[75px]">
              <img src="/logo.png" alt="GetStatus" className="h-10" />
            </div>

            {/* Content */}
            <div className="flex flex-col items-center justify-center mt-20">
              {/* Icon */}
              <div className="w-20 h-20 bg-yellow-100 rounded-full flex items-center justify-center mb-6">
                <Clock className="w-10 h-10 text-yellow-600" />
              </div>

              {/* Title */}
              <h2
                className="text-2xl font-semibold text-center mb-3"
                style={{
                  fontFamily: '"Noto Sans Hebrew", sans-serif',
                  color: 'rgba(0, 0, 0, 0.87)'
                }}
                dir="rtl"
              >
                ממתינים לאישור
              </h2>

              {/* Description */}
              <p className="text-sm text-gray-600 text-center px-4 mb-8" style={{ fontFamily: '"Noto Sans Hebrew", sans-serif' }} dir="rtl">
                שלחנו הודעה לבעל התפקיד בפרויקט שלך. ברגע שהוא יאשר את הבקשה, נעדכן אותך ותוכל להתחיל להשתמש במערכת.
              </p>

              {/* User Details Card */}
              {userData && (
                <div className="w-full bg-blue-50 border border-blue-200 rounded-lg p-4 mb-6">
                  <h3 className="text-sm font-semibold text-gray-800 text-right mb-3" style={{ fontFamily: '"Noto Sans Hebrew", sans-serif' }} dir="rtl">
                    הפרטים שנרשמו:
                  </h3>

                  <div className="space-y-2">
                    {/* Name */}
                    <div className="flex items-center justify-end gap-2">
                      <span className="text-sm text-gray-700" style={{ fontFamily: '"Noto Sans Hebrew", sans-serif' }} dir="rtl">
                        {userData.name}
                      </span>
                      <Home className="w-4 h-4 text-blue-600" />
                    </div>

                    {/* Phone */}
                    {userData.phone && (
                      <div className="flex items-center justify-end gap-2">
                        <span className="text-sm text-gray-700" style={{ fontFamily: '"Noto Sans", sans-serif' }}>
                          {userData.phone}
                        </span>
                        <Phone className="w-4 h-4 text-blue-600" />
                      </div>
                    )}

                    {/* Email */}
                    {userData.email && (
                      <div className="flex items-center justify-end gap-2">
                        <span className="text-sm text-gray-700" style={{ fontFamily: '"Noto Sans", sans-serif' }}>
                          {userData.email}
                        </span>
                        <Mail className="w-4 h-4 text-blue-600" />
                      </div>
                    )}
                  </div>
                </div>
              )}

              {/* Info Box */}
              <div className="w-full bg-green-50 border border-green-200 rounded-lg p-4 mb-6">
                <div className="flex items-start gap-3">
                  <CheckCircle className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" />
                  <div>
                    <h4 className="text-sm font-semibold text-gray-800 text-right mb-1" style={{ fontFamily: '"Noto Sans Hebrew", sans-serif' }} dir="rtl">
                      מה קורה עכשיו?
                    </h4>
                    <p className="text-xs text-gray-700 text-right" style={{ fontFamily: '"Noto Sans Hebrew", sans-serif' }} dir="rtl">
                      בעל התפקיד בפרויקט קיבל הודעה על בקשתך. הוא יבדוק את הפרטים ויאשר אותם בהקדם. תקבל הודעה באימייל וב-SMS ברגע שהבקשה תאושר.
                    </p>
                  </div>
                </div>
              </div>

              {/* Actions */}
              <div className="w-full space-y-3">
                <button
                  onClick={() => navigate('/login')}
                  className="w-full bg-[#0C6DFA] text-white py-3 px-4 rounded shadow-md font-semibold text-sm"
                  style={{ fontFamily: '"Noto Sans Hebrew", sans-serif' }}
                  dir="rtl"
                >
                  חזור לדף הכניסה
                </button>

                <button
                  onClick={() => window.location.href = 'mailto:support@getstatus.co.il'}
                  className="w-full bg-gray-100 text-gray-700 py-3 px-4 rounded shadow-sm font-semibold text-sm"
                  style={{ fontFamily: '"Noto Sans Hebrew", sans-serif' }}
                  dir="rtl"
                >
                  יש לך שאלות? צור קשר
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
