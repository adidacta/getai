import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, Mail, Phone, MessageSquare, FileText, TrendingUp, Users, ChevronLeft } from 'lucide-react';

export default function ResidentLanding() {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');

  const handleGetStarted = (e) => {
    e.preventDefault();
    // For now, navigate to existing resident signup with email pre-filled
    navigate('/signup/resident', { state: { email } });
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-900 via-slate-800 to-slate-900" dir="rtl">
      {/* Header */}
      <header className="fixed top-0 left-0 right-0 z-50 bg-gradient-to-b from-slate-900/95 to-transparent backdrop-blur-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <select className="bg-slate-800/50 text-white text-sm border border-slate-700 rounded px-3 py-1.5 hover:bg-slate-700/50 transition-colors">
              <option value="he">עברית</option>
              <option value="en">English</option>
            </select>
            <button
              onClick={() => navigate('/login/resident')}
              className="text-white hover:text-emerald-400 transition-colors text-sm font-medium"
            >
              כבר יש לך חשבון? <span className="font-semibold">התחבר</span>
            </button>
          </div>
          <img
            src="/logo.png"
            alt="GetStatus"
            className="h-8 object-contain"
          />
        </div>
      </header>

      {/* Hero Section */}
      <div className="relative pt-32 pb-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto text-center">
          {/* Main Headline */}
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-white mb-6 leading-tight">
            הפרויקט שלך להתחדשות עירונית.
            <span className="block text-emerald-400 mt-2">ברור. מעודכן. נגיש.</span>
          </h1>

          {/* Subheadline */}
          <p className="text-xl sm:text-2xl text-slate-300 mb-8 max-w-3xl mx-auto">
            עקוב אחר התקדמות הפרויקט, קבל עדכונים מהקבלן שלך, וגש לכל המסמכים החשובים במקום אחד.
          </p>

          {/* CTA Form */}
          <form onSubmit={handleGetStarted} className="max-w-2xl mx-auto">
            <div className="bg-white rounded-lg p-2 flex flex-col sm:flex-row gap-2 shadow-2xl">
              <div className="flex-1 relative">
                <Mail className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 w-5 h-5" />
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="הכנס את כתובת המייל שלך"
                  className="w-full px-12 py-4 text-lg text-slate-900 placeholder:text-slate-400 focus:outline-none rounded-md"
                  required
                  dir="rtl"
                />
              </div>
              <button
                type="submit"
                className="bg-emerald-500 hover:bg-emerald-600 text-white font-semibold px-8 py-4 rounded-md transition-all transform hover:scale-105 shadow-lg text-lg whitespace-nowrap"
              >
                מצא את הפרויקט שלי ←
              </button>
            </div>
            <p className="text-slate-400 text-sm mt-3">
              הכנס את המייל או הטלפון שמקושר לפרויקט שלך
            </p>
          </form>
        </div>

        {/* Decorative gradient orbs */}
        <div className="absolute top-20 right-10 w-72 h-72 bg-emerald-500/20 rounded-full blur-3xl"></div>
        <div className="absolute bottom-0 left-10 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl"></div>
      </div>

      {/* How It Works Section */}
      <div className="bg-slate-800/50 backdrop-blur-sm py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl font-bold text-white text-center mb-12">איך זה עובד?</h2>
          <div className="grid md:grid-cols-3 gap-8">
            {[
              { step: '1', title: 'הכנס את פרטי הקשר שלך', desc: 'מייל או טלפון שמקושר לפרויקט' },
              { step: '2', title: 'נמצא את הפרויקט שלך', desc: 'נחפש אוטומטית את הפרויקט הרלוונטי' },
              { step: '3', title: 'קבל עדכונים אוטומטית', desc: 'עדכונים בזמן אמת למייל, SMS או וואטסאפ' }
            ].map((item, idx) => (
              <div key={idx} className="text-center">
                <div className="w-16 h-16 bg-emerald-500 text-white text-2xl font-bold rounded-full flex items-center justify-center mx-auto mb-4 shadow-lg">
                  {item.step}
                </div>
                <h3 className="text-xl font-semibold text-white mb-2">{item.title}</h3>
                <p className="text-slate-400">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Features Section */}
      <div className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl font-bold text-white text-center mb-12">מה תקבל?</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              {
                icon: MessageSquare,
                title: 'עדכונים בזמן אמת',
                desc: 'קבל עדכונים דרך מייל, SMS או וואטסאפ'
              },
              {
                icon: TrendingUp,
                title: 'עקוב אחר התקדמות',
                desc: 'צפה בסטטוס הפרויקט ואבני הדרך'
              },
              {
                icon: FileText,
                title: 'גישה למסמכים',
                desc: 'כל המסמכים החשובים במקום אחד'
              },
              {
                icon: Users,
                title: 'התחבר לנציגים',
                desc: 'תקשורת ישירה עם נציגי הבניין'
              }
            ].map((feature, idx) => (
              <div key={idx} className="bg-slate-800/70 backdrop-blur-sm rounded-xl p-6 border border-slate-700/50 hover:border-emerald-500/50 transition-all hover:transform hover:scale-105">
                <feature.icon className="w-12 h-12 text-emerald-400 mb-4" />
                <h3 className="text-lg font-semibold text-white mb-2">{feature.title}</h3>
                <p className="text-slate-400 text-sm">{feature.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Social Proof Section */}
      <div className="bg-slate-800/30 backdrop-blur-sm py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto text-center">
          <div className="inline-flex items-center gap-2 bg-emerald-500/10 border border-emerald-500/30 rounded-full px-6 py-3 mb-8">
            <div className="flex -space-x-2">
              <div className="w-8 h-8 bg-gradient-to-br from-emerald-400 to-blue-500 rounded-full border-2 border-slate-900"></div>
              <div className="w-8 h-8 bg-gradient-to-br from-blue-400 to-purple-500 rounded-full border-2 border-slate-900"></div>
              <div className="w-8 h-8 bg-gradient-to-br from-purple-400 to-pink-500 rounded-full border-2 border-slate-900"></div>
            </div>
            <span className="text-emerald-400 font-semibold">מעל 1,000 דיירים כבר עוקבים אחר הפרויקטים שלהם</span>
          </div>

          {/* Visual Placeholder for Project Timeline */}
          <div className="bg-slate-800/50 rounded-2xl p-8 border border-slate-700/50">
            <div className="text-slate-400 text-sm mb-4">דוגמה: מעקב אחר התקדמות הפרויקט</div>
            <div className="bg-gradient-to-b from-slate-700/30 to-slate-800/30 rounded-lg p-8 min-h-[200px] flex items-center justify-center">
              <TrendingUp className="w-16 h-16 text-slate-600" />
              <p className="text-slate-500 mr-4">ויזואליזציה של ציר זמן הפרויקט תוצג כאן</p>
            </div>
          </div>
        </div>
      </div>

      {/* Final CTA */}
      <div className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="text-3xl font-bold text-white mb-6">מוכן להתחיל?</h2>
          <p className="text-xl text-slate-300 mb-8">הצטרף לדיירים שכבר נהנים משקיפות מלאה על הפרויקטים שלהם</p>
          <button
            onClick={() => document.querySelector('input[type="email"]').focus()}
            className="bg-emerald-500 hover:bg-emerald-600 text-white font-semibold px-12 py-4 rounded-lg transition-all transform hover:scale-105 shadow-lg text-lg"
          >
            התחל עכשיו ←
          </button>
        </div>
      </div>

      {/* Footer */}
      <footer className="border-t border-slate-800 py-8 px-4 sm:px-6 lg:px-8">
        <div className="max-w-6xl mx-auto text-center text-slate-500 text-sm">
          <p>© 2024 GetStatus. כל הזכויות שמורות.</p>
        </div>
      </footer>
    </div>
  );
}
