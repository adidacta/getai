import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Mail, Phone, MessageSquare, FileText, TrendingUp, Users, CheckCircle2, Shield, Clock, Bell, Home, ChevronLeft, Star, Building } from 'lucide-react';

export default function ResidentLanding() {
  const navigate = useNavigate();
  const [contactMethod, setContactMethod] = useState('email'); // 'email' or 'phone'
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');

  const handleGetStarted = (e) => {
    e.preventDefault();
    const data = contactMethod === 'email' ? { email } : { phone };
    navigate('/signup/resident', { state: data });
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950" dir="rtl">
      {/* Animated background pattern */}
      <div className="fixed inset-0 opacity-[0.03] pointer-events-none">
        <div className="absolute inset-0" style={{
          backgroundImage: 'radial-gradient(circle at 2px 2px, white 1px, transparent 0)',
          backgroundSize: '40px 40px'
        }}></div>
      </div>

      {/* Header */}
      <header className="fixed top-0 left-0 right-0 z-50 backdrop-blur-xl bg-slate-950/80 border-b border-white/5">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex items-center justify-between">
          <div className="flex items-center gap-6">
            {/* Language Selector */}
            <select className="bg-white/5 text-white text-sm border border-white/10 rounded-lg px-3 py-2 hover:bg-white/10 transition-all cursor-pointer focus:outline-none focus:ring-2 focus:ring-emerald-500/50">
              <option value="he">עברית</option>
              <option value="en">English</option>
            </select>

            {/* Sign In Link */}
            <button
              onClick={() => navigate('/login/resident')}
              className="text-slate-300 hover:text-white transition-colors text-sm font-medium group"
            >
              כבר יש לך חשבון? <span className="text-emerald-400 group-hover:text-emerald-300 font-semibold">התחבר</span>
            </button>
          </div>

          {/* Logo */}
          <button onClick={() => navigate('/')} className="hover:opacity-80 transition-opacity">
            <img
              src="/logo.png"
              alt="GetStatus"
              className="h-9 object-contain"
            />
          </button>
        </div>
      </header>

      {/* Hero Section */}
      <div className="relative pt-28 pb-16 sm:pt-32 sm:pb-20 px-4 sm:px-6 lg:px-8 overflow-hidden">
        {/* Gradient Orbs */}
        <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-emerald-500/10 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-0 left-0 w-[600px] h-[600px] bg-blue-500/10 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1s' }}></div>

        <div className="relative max-w-5xl mx-auto">
          {/* Trust Badge */}
          <div className="flex justify-center mb-8">
            <div className="inline-flex items-center gap-2 bg-emerald-500/10 border border-emerald-500/20 rounded-full px-4 py-2 backdrop-blur-sm">
              <Shield className="w-4 h-4 text-emerald-400" />
              <span className="text-emerald-400 text-sm font-medium">מאובטח ומוכר על ידי משרד השיכון</span>
            </div>
          </div>

          {/* Main Headline */}
          <div className="text-center mb-12">
            <h1 className="text-5xl sm:text-6xl lg:text-7xl font-bold text-white mb-6 leading-[1.1] tracking-tight">
              הפרויקט שלך להתחדשות עירונית
              <span className="block mt-3 bg-gradient-to-l from-emerald-400 via-emerald-300 to-cyan-400 bg-clip-text text-transparent">
                בשקיפות מלאה.
              </span>
            </h1>

            <p className="text-xl sm:text-2xl text-slate-400 max-w-3xl mx-auto leading-relaxed font-light">
              עקוב אחר התקדמות הפרויקט בזמן אמת, קבל עדכונים מהקבלן שלך,
              <br className="hidden sm:block" />
              וגש לכל המסמכים והמידע החשוב במקום אחד
            </p>
          </div>

          {/* Enhanced CTA Form */}
          <form onSubmit={handleGetStarted} className="max-w-2xl mx-auto">
            {/* Contact Method Toggle */}
            <div className="flex justify-center mb-4">
              <div className="inline-flex bg-white/5 backdrop-blur-sm rounded-xl p-1 border border-white/10">
                <button
                  type="button"
                  onClick={() => setContactMethod('email')}
                  className={`px-6 py-2.5 rounded-lg text-sm font-semibold transition-all ${
                    contactMethod === 'email'
                      ? 'bg-emerald-500 text-white shadow-lg shadow-emerald-500/30'
                      : 'text-slate-400 hover:text-white'
                  }`}
                >
                  <Mail className="w-4 h-4 inline-block ml-2" />
                  מייל
                </button>
                <button
                  type="button"
                  onClick={() => setContactMethod('phone')}
                  className={`px-6 py-2.5 rounded-lg text-sm font-semibold transition-all ${
                    contactMethod === 'phone'
                      ? 'bg-emerald-500 text-white shadow-lg shadow-emerald-500/30'
                      : 'text-slate-400 hover:text-white'
                  }`}
                >
                  <Phone className="w-4 h-4 inline-block ml-2" />
                  טלפון
                </button>
              </div>
            </div>

            {/* Input Container */}
            <div className="bg-white/95 backdrop-blur-xl rounded-2xl p-2 shadow-2xl shadow-black/20 border border-white/20">
              <div className="flex flex-col sm:flex-row gap-2">
                <div className="flex-1 relative group">
                  {contactMethod === 'email' ? (
                    <>
                      <Mail className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 w-5 h-5 group-hover:text-emerald-500 transition-colors" />
                      <input
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder="הכנס את כתובת המייל שלך"
                        className="w-full px-12 py-5 text-lg text-slate-900 placeholder:text-slate-400 focus:outline-none rounded-xl bg-white/50 group-hover:bg-white transition-colors"
                        required
                        dir="rtl"
                      />
                    </>
                  ) : (
                    <>
                      <Phone className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 w-5 h-5 group-hover:text-emerald-500 transition-colors" />
                      <input
                        type="tel"
                        value={phone}
                        onChange={(e) => setPhone(e.target.value)}
                        placeholder="הכנס את מספר הטלפון שלך"
                        className="w-full px-12 py-5 text-lg text-slate-900 placeholder:text-slate-400 focus:outline-none rounded-xl bg-white/50 group-hover:bg-white transition-colors"
                        required
                        dir="rtl"
                      />
                    </>
                  )}
                </div>
                <button
                  type="submit"
                  className="group bg-gradient-to-l from-emerald-500 to-emerald-600 hover:from-emerald-600 hover:to-emerald-700 text-white font-bold px-10 py-5 rounded-xl transition-all transform hover:scale-[1.02] active:scale-[0.98] shadow-xl shadow-emerald-500/30 hover:shadow-emerald-500/50 text-lg whitespace-nowrap relative overflow-hidden"
                >
                  <span className="relative z-10 flex items-center gap-2">
                    מצא את הפרויקט שלי
                    <ChevronLeft className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                  </span>
                  <div className="absolute inset-0 bg-gradient-to-l from-white/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity"></div>
                </button>
              </div>
            </div>

            {/* Help Text */}
            <p className="text-slate-500 text-sm mt-4 text-center">
              הכנס את {contactMethod === 'email' ? 'המייל' : 'הטלפון'} שמקושר לפרויקט שלך ונחפש אותו אוטומטית
            </p>
          </form>

          {/* Quick Stats */}
          <div className="mt-16 grid grid-cols-3 gap-6 max-w-2xl mx-auto">
            {[
              { icon: Users, label: 'דיירים מרוצים', value: '69,000+' },
              { icon: Building, label: 'פרויקטים פעילים', value: '450+' },
              { icon: Star, label: 'דירוג ממוצע', value: '4.9' }
            ].map((stat, idx) => (
              <div key={idx} className="text-center group hover:scale-105 transition-transform">
                <stat.icon className="w-8 h-8 text-emerald-400 mx-auto mb-2 group-hover:scale-110 transition-transform" />
                <div className="text-2xl font-bold text-white mb-1">{stat.value}</div>
                <div className="text-xs text-slate-400">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* How It Works Section */}
      <div className="relative py-24 px-4 sm:px-6 lg:px-8 bg-gradient-to-b from-slate-900/50 to-transparent">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-white mb-4">איך זה עובד?</h2>
            <p className="text-slate-400 text-lg">שלושה שלבים פשוטים לשקיפות מלאה</p>
          </div>

          <div className="grid md:grid-cols-3 gap-8 lg:gap-12">
            {[
              {
                step: '01',
                title: 'הכנס את פרטי הקשר שלך',
                desc: 'מייל או טלפון שמקושר לפרויקט ההתחדשות העירונית שלך',
                icon: Mail
              },
              {
                step: '02',
                title: 'נמצא את הפרויקט שלך',
                desc: 'המערכת תחפש אוטומטית את הפרויקט הרלוונטי ותתחבר לדירה שלך',
                icon: TrendingUp
              },
              {
                step: '03',
                title: 'קבל עדכונים בזמן אמת',
                desc: 'עדכונים אוטומטיים למייל, SMS או וואטסאפ על כל התקדמות',
                icon: Bell
              }
            ].map((item, idx) => (
              <div key={idx} className="relative group">
                <div className="bg-gradient-to-b from-slate-800/50 to-slate-900/50 backdrop-blur-sm border border-white/5 rounded-2xl p-8 hover:border-emerald-500/30 transition-all hover:transform hover:scale-105">
                  <div className="flex items-start gap-4 mb-4">
                    <span className="text-6xl font-bold bg-gradient-to-br from-emerald-400/20 to-emerald-600/20 bg-clip-text text-transparent">
                      {item.step}
                    </span>
                    <div className="mt-2 p-3 bg-emerald-500/10 rounded-xl group-hover:bg-emerald-500/20 transition-colors">
                      <item.icon className="w-6 h-6 text-emerald-400" />
                    </div>
                  </div>
                  <h3 className="text-xl font-semibold text-white mb-3">{item.title}</h3>
                  <p className="text-slate-400 leading-relaxed">{item.desc}</p>
                </div>

                {/* Connecting line */}
                {idx < 2 && (
                  <div className="hidden md:block absolute top-1/2 left-full w-full h-px bg-gradient-to-l from-emerald-500/30 to-transparent -translate-y-1/2 -z-10"></div>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Features Grid */}
      <div className="py-24 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-white mb-4">כל מה שצריך במקום אחד</h2>
            <p className="text-slate-400 text-lg">פלטפורמה מקיפה לניהול ומעקב אחר הפרויקט שלך</p>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              {
                icon: MessageSquare,
                title: 'עדכונים בזמן אמת',
                desc: 'קבל התראות מיידיות על כל שינוי או התקדמות בפרויקט',
                gradient: 'from-blue-500/10 to-cyan-500/10',
                iconColor: 'text-blue-400'
              },
              {
                icon: TrendingUp,
                title: 'מעקב התקדמות',
                desc: 'צפה בציר זמן ויזואלי של הפרויקט ואבני הדרך',
                gradient: 'from-emerald-500/10 to-green-500/10',
                iconColor: 'text-emerald-400'
              },
              {
                icon: FileText,
                title: 'מסמכים ודוחות',
                desc: 'גישה מהירה לכל המסמכים, תוכניות והסכמים',
                gradient: 'from-purple-500/10 to-pink-500/10',
                iconColor: 'text-purple-400'
              },
              {
                icon: Users,
                title: 'תקשורת ישירה',
                desc: 'התחבר לנציגי הבניין ולקבלן בקלות',
                gradient: 'from-orange-500/10 to-red-500/10',
                iconColor: 'text-orange-400'
              },
              {
                icon: Shield,
                title: 'אבטחה מלאה',
                desc: 'המידע שלך מוגן ומוצפן ברמה הגבוהה ביותר',
                gradient: 'from-slate-500/10 to-gray-500/10',
                iconColor: 'text-slate-400'
              },
              {
                icon: Clock,
                title: 'היסטוריה מלאה',
                desc: 'עקוב אחר כל העדכונים וההחלטות לאורך זמן',
                gradient: 'from-indigo-500/10 to-blue-500/10',
                iconColor: 'text-indigo-400'
              },
              {
                icon: Home,
                title: 'פרטי הדירה',
                desc: 'כל המידע על הדירה החדשה שלך במקום אחד',
                gradient: 'from-teal-500/10 to-cyan-500/10',
                iconColor: 'text-teal-400'
              },
              {
                icon: CheckCircle2,
                title: 'מעקב חתימות',
                desc: 'סטטוס עדכני של חתימות ואישורים בפרויקט',
                gradient: 'from-green-500/10 to-emerald-500/10',
                iconColor: 'text-green-400'
              }
            ].map((feature, idx) => (
              <div
                key={idx}
                className="group relative bg-gradient-to-br from-slate-800/40 to-slate-900/40 backdrop-blur-sm border border-white/5 rounded-2xl p-6 hover:border-white/10 transition-all hover:transform hover:scale-105 overflow-hidden"
              >
                <div className={`absolute inset-0 bg-gradient-to-br ${feature.gradient} opacity-0 group-hover:opacity-100 transition-opacity`}></div>
                <div className="relative z-10">
                  <div className="mb-4 inline-block p-3 bg-white/5 rounded-xl group-hover:scale-110 transition-transform">
                    <feature.icon className={`w-8 h-8 ${feature.iconColor}`} />
                  </div>
                  <h3 className="text-lg font-semibold text-white mb-2">{feature.title}</h3>
                  <p className="text-slate-400 text-sm leading-relaxed">{feature.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Social Proof with Testimonials */}
      <div className="py-24 px-4 sm:px-6 lg:px-8 bg-gradient-to-b from-transparent via-slate-900/50 to-transparent">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <div className="inline-flex items-center gap-3 bg-emerald-500/10 border border-emerald-500/20 rounded-full px-6 py-3 mb-8 backdrop-blur-sm">
              <div className="flex -space-x-3">
                {[1, 2, 3, 4].map((i) => (
                  <div key={i} className={`w-10 h-10 bg-gradient-to-br from-emerald-${3+i}00 to-blue-${4+i}00 rounded-full border-2 border-slate-900 flex items-center justify-center text-white text-xs font-bold`}>
                    {String.fromCharCode(64 + i)}
                  </div>
                ))}
              </div>
              <span className="text-emerald-400 font-semibold">מעל 69,000 דיירים עוקבים אחר הפרויקטים שלהם</span>
            </div>

            <h2 className="text-4xl font-bold text-white mb-4">מה הדיירים אומרים?</h2>
            <p className="text-slate-400 text-lg">סיפורי הצלחה של דיירים שמשתמשים בפלטפורמה</p>
          </div>

          <div className="grid md:grid-cols-3 gap-6">
            {[
              {
                name: 'רחל כהן',
                location: 'תל אביב',
                text: 'סוף סוף אני יכולה לעקוב אחר הפרויקט שלי בזמן אמת. זה משנה את כל החוויה!',
                rating: 5
              },
              {
                name: 'דוד לוי',
                location: 'חיפה',
                text: 'הפלטפורמה הכי טובה למעקב אחר התחדשות עירונית. הכל במקום אחד ונגיש.',
                rating: 5
              },
              {
                name: 'שרה אברהם',
                location: 'ירושלים',
                text: 'שקיפות מלאה וקלות שימוש. ממליצה בחום לכל דייר בפרויקט התחדשות.',
                rating: 5
              }
            ].map((testimonial, idx) => (
              <div key={idx} className="bg-gradient-to-br from-slate-800/50 to-slate-900/50 backdrop-blur-sm border border-white/5 rounded-2xl p-6 hover:border-emerald-500/30 transition-all">
                <div className="flex gap-1 mb-4">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <Star key={i} className="w-4 h-4 fill-emerald-400 text-emerald-400" />
                  ))}
                </div>
                <p className="text-slate-300 mb-4 leading-relaxed italic">"{testimonial.text}"</p>
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-gradient-to-br from-emerald-400 to-blue-500 rounded-full flex items-center justify-center text-white font-bold">
                    {testimonial.name[0]}
                  </div>
                  <div>
                    <div className="text-white font-semibold text-sm">{testimonial.name}</div>
                    <div className="text-slate-400 text-xs">{testimonial.location}</div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Final CTA */}
      <div className="py-24 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto">
          <div className="relative bg-gradient-to-br from-emerald-600 to-cyan-600 rounded-3xl p-12 overflow-hidden">
            <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxwYXRoIGQ9Ik0zNiAxOGMzLjMxNCAwIDYgMi42ODYgNiA2cy0yLjY4NiA2LTYgNi02LTIuNjg2LTYtNiAyLjY4Ni02IDYtNnoiIHN0cm9rZT0iI2ZmZiIgc3Ryb2tlLW9wYWNpdHk9Ii4xIi8+PC9nPjwvc3ZnPg==')] opacity-10"></div>

            <div className="relative text-center text-white">
              <h2 className="text-4xl font-bold mb-4">מוכן להתחיל?</h2>
              <p className="text-xl text-emerald-50 mb-8 max-w-2xl mx-auto">
                הצטרף אלפי דיירים שכבר נהנים משקיפות מלאה ועדכונים בזמן אמת על הפרויקטים שלהם
              </p>
              <button
                onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
                className="group bg-white hover:bg-emerald-50 text-emerald-600 font-bold px-12 py-5 rounded-xl transition-all transform hover:scale-105 shadow-2xl text-lg inline-flex items-center gap-2"
              >
                התחל עכשיו בחינם
                <ChevronLeft className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </button>
              <p className="text-emerald-100 text-sm mt-4">ללא צורך בכרטיס אשראי • התחל תוך דקה</p>
            </div>
          </div>
        </div>
      </div>

      {/* Footer */}
      <footer className="border-t border-white/5 bg-slate-950/50 backdrop-blur-xl py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-6xl mx-auto">
          <div className="grid md:grid-cols-4 gap-8 mb-8">
            <div>
              <h4 className="text-white font-semibold mb-4">לדיירים</h4>
              <ul className="space-y-2 text-sm">
                <li><a href="#" className="text-slate-400 hover:text-emerald-400 transition-colors">מצא את הפרויקט שלי</a></li>
                <li><a href="#" className="text-slate-400 hover:text-emerald-400 transition-colors">איך זה עובד</a></li>
                <li><a href="#" className="text-slate-400 hover:text-emerald-400 transition-colors">שאלות נפוצות</a></li>
              </ul>
            </div>
            <div>
              <h4 className="text-white font-semibold mb-4">פרויקטים</h4>
              <ul className="space-y-2 text-sm">
                <li><a href="#" className="text-slate-400 hover:text-emerald-400 transition-colors">עיין בפרויקטים</a></li>
                <li><a href="#" className="text-slate-400 hover:text-emerald-400 transition-colors">פרויקטים פעילים</a></li>
                <li><a href="#" className="text-slate-400 hover:text-emerald-400 transition-colors">סיפורי הצלחה</a></li>
              </ul>
            </div>
            <div>
              <h4 className="text-white font-semibold mb-4">מידע</h4>
              <ul className="space-y-2 text-sm">
                <li><a href="#" className="text-slate-400 hover:text-emerald-400 transition-colors">מאגר ידע</a></li>
                <li><a href="#" className="text-slate-400 hover:text-emerald-400 transition-colors">מדריכים</a></li>
                <li><a href="#" className="text-slate-400 hover:text-emerald-400 transition-colors">צור קשר</a></li>
              </ul>
            </div>
            <div>
              <h4 className="text-white font-semibold mb-4">GetStatus</h4>
              <ul className="space-y-2 text-sm">
                <li><a href="#" className="text-slate-400 hover:text-emerald-400 transition-colors">אודות</a></li>
                <li><a href="#" className="text-slate-400 hover:text-emerald-400 transition-colors">תנאי שימוש</a></li>
                <li><a href="#" className="text-slate-400 hover:text-emerald-400 transition-colors">פרטיות</a></li>
              </ul>
            </div>
          </div>

          <div className="border-t border-white/5 pt-8 flex flex-col sm:flex-row justify-between items-center gap-4">
            <p className="text-slate-500 text-sm">© 2024 GetStatus. כל הזכויות שמורות.</p>
            <div className="flex items-center gap-2">
              <Shield className="w-4 h-4 text-emerald-400" />
              <span className="text-slate-400 text-xs">מוגן ומאובטח ברמה הגבוהה ביותר</span>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
