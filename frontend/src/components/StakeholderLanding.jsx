import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Building2, Scale, Ruler, Briefcase, TrendingUp, Users, CheckCircle, MessageSquare, FileText, Calendar, Network, Award, Mail } from 'lucide-react';

export default function StakeholderLanding() {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');

  const handleGetStarted = (e) => {
    e.preventDefault();
    // For now, navigate to existing stakeholder signup with email pre-filled
    navigate('/signup/stakeholder', { state: { email } });
  };

  return (
    <div className="min-h-screen bg-black" dir="rtl">
      {/* Header */}
      <header className="fixed top-0 left-0 right-0 z-50 bg-gradient-to-b from-black to-transparent">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <select className="bg-zinc-900/80 text-white text-sm border border-zinc-800 rounded px-3 py-1.5 hover:bg-zinc-800 transition-colors">
              <option value="he">עברית</option>
              <option value="en">English</option>
            </select>
            <button
              onClick={() => navigate('/login/stakeholder')}
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
      <div className="relative min-h-screen flex items-center justify-center px-4 sm:px-6 lg:px-8">
        {/* Background gradient */}
        <div className="absolute inset-0 bg-gradient-to-br from-emerald-950/20 via-black to-blue-950/20"></div>

        {/* Hero content */}
        <div className="relative z-10 max-w-4xl mx-auto text-center pt-20 pb-32">
          {/* Professional badge */}
          <div className="inline-flex items-center gap-2 bg-emerald-500/10 border border-emerald-500/30 rounded-full px-4 py-2 mb-8">
            <Award className="w-4 h-4 text-emerald-400" />
            <span className="text-emerald-400 text-sm font-medium">פלטפורמה מקצועית להתחדשות עירונית</span>
          </div>

          {/* Main Headline */}
          <h1 className="text-5xl sm:text-6xl lg:text-7xl font-bold text-white mb-6 leading-tight">
            נהל פרויקטים.
            <span className="block text-emerald-400 mt-2">בנה אמון. הרחב רשת.</span>
          </h1>

          {/* Subheadline */}
          <p className="text-xl sm:text-2xl text-zinc-400 mb-12 max-w-3xl mx-auto leading-relaxed">
            הפלטפורמה המלאה לאנשי מקצוע בהתחדשות עירונית לניהול פרויקטים בשקיפות והתחברות להזדמנויות חדשות.
          </p>

          {/* Email CTA Form */}
          <form onSubmit={handleGetStarted} className="max-w-2xl mx-auto mb-8">
            <div className="bg-zinc-900 rounded-lg p-2 flex flex-col sm:flex-row gap-2 shadow-2xl border border-zinc-800">
              <div className="flex-1 relative">
                <Mail className="absolute right-4 top-1/2 -translate-y-1/2 text-zinc-500 w-5 h-5" />
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="הכנס את כתובת המייל המקצועי שלך"
                  className="w-full px-12 py-4 text-lg bg-transparent text-white placeholder:text-zinc-500 focus:outline-none rounded-md"
                  required
                  dir="rtl"
                />
              </div>
              <button
                type="submit"
                className="bg-emerald-500 hover:bg-emerald-600 text-white font-semibold px-8 py-4 rounded-md transition-all transform hover:scale-105 shadow-lg text-lg whitespace-nowrap"
              >
                הצטרף לרשת המקצוענים ←
              </button>
            </div>
            <p className="text-zinc-500 text-sm mt-3">
              אלפי אנשי מקצוע כבר מנהלים את הפרויקטים שלהם דרך GetStatus
            </p>
          </form>
        </div>

        {/* Decorative elements */}
        <div className="absolute top-1/4 right-10 w-96 h-96 bg-emerald-500/10 rounded-full blur-3xl"></div>
        <div className="absolute bottom-1/4 left-10 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl"></div>
      </div>

      {/* Professional Types Section */}
      <div className="bg-zinc-950/50 backdrop-blur-sm border-y border-zinc-900 py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-2xl font-bold text-white text-center mb-12">
            לאנשי מקצוע שעובדים בשקיפות
          </h2>
          <div className="grid grid-cols-2 md:grid-cols-5 gap-6">
            {[
              { icon: Building2, title: 'קבלנים ויזמים', color: 'emerald' },
              { icon: Scale, title: 'יועצים משפטיים', color: 'blue' },
              { icon: Ruler, title: 'מפקחים טכניים', color: 'purple' },
              { icon: Briefcase, title: 'יזמי נדל"ן', color: 'orange' },
              { icon: TrendingUp, title: 'שמאים', color: 'pink' }
            ].map((type, idx) => (
              <div key={idx} className="bg-zinc-900/50 rounded-xl p-6 border border-zinc-800 hover:border-emerald-500/50 transition-all text-center group hover:transform hover:scale-105">
                <type.icon className={`w-10 h-10 mx-auto mb-3 text-${type.color}-400 group-hover:text-emerald-400 transition-colors`} />
                <p className="text-sm text-zinc-400 group-hover:text-white transition-colors font-medium">{type.title}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Two Platforms Section */}
      <div className="py-24 px-4 sm:px-6 lg:px-8">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-4xl font-bold text-white text-center mb-4">שתי פלטפורמות, מערכת אקולוגית אחת</h2>
          <p className="text-xl text-zinc-400 text-center mb-16">ניהול פרויקטים ורשת מקצועית במקום אחד</p>

          <div className="grid md:grid-cols-2 gap-8">
            {/* PM Platform Card */}
            <div className="bg-gradient-to-br from-emerald-950/30 to-zinc-900/50 backdrop-blur-sm rounded-2xl p-8 border border-emerald-900/30 hover:border-emerald-500/50 transition-all">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-12 h-12 bg-emerald-500/20 rounded-lg flex items-center justify-center">
                  <Briefcase className="w-6 h-6 text-emerald-400" />
                </div>
                <h3 className="text-2xl font-bold text-white">פלטפורמת ניהול פרויקטים</h3>
              </div>

              <p className="text-zinc-400 mb-6">ניהול מקיף של פרויקטים בהתחדשות עירונית</p>

              <ul className="space-y-4">
                {[
                  { icon: MessageSquare, text: 'עדכן דיירים אוטומטית' },
                  { icon: CheckCircle, text: 'נהל חתימות ואישורים' },
                  { icon: FileText, text: 'שתף מסמכים בבטחה' },
                  { icon: Calendar, text: 'מעקב אחר משימות פנימיות' }
                ].map((feature, idx) => (
                  <li key={idx} className="flex items-center gap-3 text-zinc-300">
                    <feature.icon className="w-5 h-5 text-emerald-400 flex-shrink-0" />
                    <span>{feature.text}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* REN Card */}
            <div className="bg-gradient-to-br from-blue-950/30 to-zinc-900/50 backdrop-blur-sm rounded-2xl p-8 border border-blue-900/30 hover:border-blue-500/50 transition-all">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-12 h-12 bg-blue-500/20 rounded-lg flex items-center justify-center">
                  <Network className="w-6 h-6 text-blue-400" />
                </div>
                <h3 className="text-2xl font-bold text-white">רשת הנדל"ן (REN)</h3>
              </div>

              <p className="text-zinc-400 mb-6">הרשת המקצועית להתחדשות עירונית</p>

              <ul className="space-y-4">
                {[
                  { icon: Award, text: 'הצג את המומחיות שלך' },
                  { icon: Users, text: 'מצא הזדמנויות שיתוף פעולה' },
                  { icon: TrendingUp, text: 'בנה מוניטין מקצועי' },
                  { icon: Network, text: 'התחבר לבעלי עניין אחרים' }
                ].map((feature, idx) => (
                  <li key={idx} className="flex items-center gap-3 text-zinc-300">
                    <feature.icon className="w-5 h-5 text-blue-400 flex-shrink-0" />
                    <span>{feature.text}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Integration note */}
          <div className="mt-8 bg-zinc-900/50 backdrop-blur-sm rounded-xl p-6 border border-zinc-800 text-center">
            <p className="text-zinc-400">
              <span className="text-emerald-400 font-semibold">התקדמות פרויקטים</span> בפלטפורמת הניהול משתקפת אוטומטית ב
              <span className="text-blue-400 font-semibold">רשת המקצועית</span> לנראות מלאה
            </p>
          </div>
        </div>
      </div>

      {/* Benefits Section */}
      <div className="bg-zinc-950/30 backdrop-blur-sm py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl font-bold text-white text-center mb-12">למה GetStatus?</h2>
          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                title: 'שקיפות מלאה',
                desc: 'דיירים מעודכנים = פחות שאלות ויותר אמון',
                icon: '🔍'
              },
              {
                title: 'חיסכון בזמן',
                desc: 'ניהול אוטומטי של עדכונים ותקשורת',
                icon: '⚡'
              },
              {
                title: 'הזדמנויות חדשות',
                desc: 'התחבר לפרויקטים ושותפויות ברשת המקצועית',
                icon: '🚀'
              }
            ].map((benefit, idx) => (
              <div key={idx} className="text-center">
                <div className="text-5xl mb-4">{benefit.icon}</div>
                <h3 className="text-xl font-semibold text-white mb-2">{benefit.title}</h3>
                <p className="text-zinc-400">{benefit.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Dashboard Preview Section */}
      <div className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-5xl mx-auto">
          <h2 className="text-3xl font-bold text-white text-center mb-4">ממשק ניהול מתקדם</h2>
          <p className="text-zinc-400 text-center mb-12">כל מה שאתה צריך במקום אחד</p>

          {/* Dashboard mockup placeholder */}
          <div className="bg-zinc-900/50 backdrop-blur-sm rounded-2xl p-8 border border-zinc-800">
            <div className="bg-gradient-to-br from-zinc-800/50 to-zinc-900/50 rounded-xl p-12 min-h-[400px] flex items-center justify-center">
              <div className="text-center">
                <Briefcase className="w-20 h-20 text-zinc-700 mx-auto mb-4" />
                <p className="text-zinc-600 text-lg">תצוגה מקדימה של הדשבורד תוצג כאן</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Social Proof */}
      <div className="bg-zinc-950/50 backdrop-blur-sm py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto text-center">
          <div className="inline-flex items-center gap-3 bg-emerald-500/10 border border-emerald-500/30 rounded-full px-6 py-3">
            <div className="flex -space-x-2">
              <div className="w-10 h-10 bg-gradient-to-br from-emerald-400 to-blue-500 rounded-full border-2 border-black"></div>
              <div className="w-10 h-10 bg-gradient-to-br from-blue-400 to-purple-500 rounded-full border-2 border-black"></div>
              <div className="w-10 h-10 bg-gradient-to-br from-purple-400 to-pink-500 rounded-full border-2 border-black"></div>
            </div>
            <span className="text-emerald-400 font-semibold">מעל 500 אנשי מקצוע מנהלים פרויקטים ברשת</span>
          </div>
        </div>
      </div>

      {/* Final CTA */}
      <div className="py-24 px-4 sm:px-6 lg:px-8">
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="text-4xl font-bold text-white mb-6">מוכן להתחיל?</h2>
          <p className="text-xl text-zinc-400 mb-10">
            הצטרף לרשת המקצוענים המובילה בהתחדשות עירונית בישראל
          </p>
          <button
            onClick={() => document.querySelector('input[type="email"]').focus()}
            className="bg-emerald-500 hover:bg-emerald-600 text-white font-semibold px-12 py-4 rounded-lg transition-all transform hover:scale-105 shadow-2xl text-lg"
          >
            הצטרף עכשיו ←
          </button>
        </div>
      </div>

      {/* Footer */}
      <footer className="border-t border-zinc-900 py-8 px-4 sm:px-6 lg:px-8">
        <div className="max-w-6xl mx-auto text-center text-zinc-600 text-sm">
          <p>© 2024 GetStatus. כל הזכויות שמורות.</p>
        </div>
      </footer>
    </div>
  );
}
