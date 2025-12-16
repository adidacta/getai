import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Search, Building2, Users, Scale, Shield, Hammer, LayoutGrid, FileText, BookOpen, Menu, X, TrendingUp } from 'lucide-react';

export default function RENHomePage() {
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState('');
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const handleSearch = (e) => {
    e.preventDefault();
    console.log('Searching for:', searchQuery);
    // TODO: Implement search functionality
  };

  const stats = [
    { icon: Building2, label: 'Projects', count: '4', color: 'text-emerald-600' },
    { icon: Users, label: 'Residents', count: '69757', color: 'text-blue-600' },
    { icon: Users, label: 'Representatives', count: '3', color: 'text-purple-600' },
    { icon: Scale, label: 'Lawyers', count: '175', color: 'text-blue-500' },
    { icon: Shield, label: 'Supervisors', count: '44', color: 'text-cyan-600' },
    { icon: Hammer, label: 'Builders', count: '102', color: 'text-orange-600' },
    { icon: LayoutGrid, label: 'Other', count: '22', color: 'text-gray-600' }
  ];

  return (
    <div className="min-h-screen bg-white">
      {/* Navigation Bar */}
      <nav className="bg-white border-b border-gray-200 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            {/* Left Side - Logo & Main Nav */}
            <div className="flex items-center gap-8">
              {/* Logo */}
              <button onClick={() => navigate('/')} className="flex items-center gap-2">
                <img src="/logo.png" alt="GetStatus" className="h-8" />
              </button>

              {/* Desktop Navigation */}
              <div className="hidden md:flex items-center gap-6">
                <button className="text-gray-700 hover:text-blue-600 transition-colors font-medium text-sm">
                  Projects
                </button>
                <button className="text-gray-700 hover:text-blue-600 transition-colors font-medium text-sm">
                  My Neighbourhood
                </button>
                <button className="text-gray-700 hover:text-blue-600 transition-colors font-medium text-sm">
                  Urban Renewal
                </button>
                <button className="text-gray-700 hover:text-blue-600 transition-colors font-medium text-sm">
                  News
                </button>
                <button className="text-gray-700 hover:text-blue-600 transition-colors font-medium text-sm">
                  Marketplace
                </button>
              </div>
            </div>

            {/* Right Side - CTAs */}
            <div className="hidden md:flex items-center gap-4">
              {/* Stakeholders Zone */}
              <button
                onClick={() => navigate('/login2/stakeholder')}
                className="text-gray-700 hover:text-gray-900 transition-colors font-medium text-sm"
              >
                Stakeholders Zone
              </button>

              {/* Divider */}
              <div className="w-px h-6 bg-gray-300"></div>

              {/* Get Status Updates (Primary CTA) */}
              <button
                onClick={() => navigate('/login3/resident')}
                className="bg-blue-600 hover:bg-blue-700 text-white px-5 py-2 rounded-lg font-medium text-sm transition-all"
              >
                Get Status Updates
              </button>
            </div>

            {/* Mobile Menu Button */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="md:hidden text-gray-700 hover:text-gray-900"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>

          {/* Mobile Menu */}
          {mobileMenuOpen && (
            <div className="md:hidden border-t border-gray-200 py-4 space-y-3">
              <button className="block w-full text-left px-4 py-2 text-gray-700 hover:bg-gray-50 transition-colors">
                Projects
              </button>
              <button className="block w-full text-left px-4 py-2 text-gray-700 hover:bg-gray-50 transition-colors">
                My Neighbourhood
              </button>
              <button className="block w-full text-left px-4 py-2 text-gray-700 hover:bg-gray-50 transition-colors">
                Urban Renewal
              </button>
              <button className="block w-full text-left px-4 py-2 text-gray-700 hover:bg-gray-50 transition-colors">
                News
              </button>
              <button className="block w-full text-left px-4 py-2 text-gray-700 hover:bg-gray-50 transition-colors">
                Marketplace
              </button>
              <div className="border-t border-gray-200 my-2"></div>
              <button
                onClick={() => navigate('/login2/stakeholder')}
                className="block w-full text-left px-4 py-2 text-gray-700 hover:bg-gray-50 transition-colors"
              >
                Stakeholders Zone
              </button>
              <button
                onClick={() => navigate('/login3/resident')}
                className="block w-full mx-4 bg-blue-600 text-white px-5 py-2 rounded-lg font-medium transition-all"
              >
                Get Status Updates
              </button>
            </div>
          )}
        </div>
      </nav>

      {/* Hero Section */}
      <div className="relative bg-gradient-to-br from-blue-600 via-blue-700 to-blue-800 overflow-hidden">
        {/* Background Pattern */}
        <div className="absolute inset-0 opacity-10">
          <div className="absolute inset-0" style={{
            backgroundImage: 'radial-gradient(circle at 2px 2px, white 1px, transparent 0)',
            backgroundSize: '40px 40px'
          }}></div>
        </div>

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 lg:py-28">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            {/* Left Content */}
            <div className="text-white space-y-6">
              <h1 className="text-4xl lg:text-5xl font-bold leading-tight">
                getStatus Real Estate Network
              </h1>
              <p className="text-xl text-blue-100">
                Promote your real estate project transparency with leading companies.
              </p>

              {/* Search Bar */}
              <form onSubmit={handleSearch} className="mt-8">
                <div className="flex items-center gap-2 mb-4">
                  <span className="text-blue-100">I want to get projects status /</span>
                  <button
                    type="button"
                    className="text-blue-100 border border-blue-400 hover:bg-blue-700 px-3 py-1 rounded text-sm transition-colors"
                  >
                    explore companies
                  </button>
                  <button
                    type="button"
                    className="text-blue-100 border border-blue-400 hover:bg-blue-700 px-3 py-1 rounded text-sm transition-colors"
                  >
                    Lawyer ▼
                  </button>
                </div>
                <div className="relative">
                  <input
                    type="text"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    placeholder="Search projects, builders, cities..."
                    className="w-full px-6 py-4 pr-14 rounded-lg text-gray-900 placeholder:text-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-300 shadow-lg"
                  />
                  <button
                    type="submit"
                    className="absolute right-2 top-1/2 -translate-y-1/2 bg-blue-600 hover:bg-blue-700 text-white p-2.5 rounded-md transition-colors"
                  >
                    <Search className="w-5 h-5" />
                  </button>
                </div>
              </form>
            </div>

            {/* Right Content - Phone Mockup */}
            <div className="hidden lg:flex justify-center">
              <div className="relative">
                <div className="w-80 h-[600px] bg-gradient-to-b from-gray-900 to-black rounded-[3rem] border-8 border-gray-800 shadow-2xl overflow-hidden">
                  {/* Phone Content - Project Timeline Visualization */}
                  <div className="bg-white h-full p-6 overflow-hidden">
                    <div className="flex items-center justify-between mb-4">
                      <button className="text-gray-600">←</button>
                      <div className="text-center">
                        <div className="text-sm font-semibold">התשלב הבא</div>
                        <div className="text-xs text-gray-500">קבלת הצעות מיימים</div>
                      </div>
                    </div>

                    {/* Warning Banner */}
                    <div className="bg-amber-50 border border-amber-200 rounded-lg p-3 mb-4 flex items-start gap-2">
                      <div className="bg-amber-400 text-white rounded p-1 mt-0.5">
                        <span className="text-xs">⚠</span>
                      </div>
                      <div className="text-xs text-amber-900">
                        שים לב: 3 דיירים נוספים מעוניינים להצעה הזאת
                      </div>
                    </div>

                    {/* Timeline Path */}
                    <div className="relative h-[400px]">
                      {/* Winding path visualization */}
                      <div className="absolute inset-0 flex items-center justify-center opacity-50">
                        <TrendingUp className="w-32 h-32 text-gray-300" />
                      </div>
                      <div className="text-center text-gray-400 mt-20">
                        <p className="text-sm">Project Timeline</p>
                        <p className="text-xs">Visualization</p>
                      </div>
                    </div>
                  </div>
                </div>
                {/* Phone notch */}
                <div className="absolute top-0 left-1/2 -translate-x-1/2 w-40 h-7 bg-gray-900 rounded-b-2xl"></div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Stats Section */}
      <div className="bg-gray-50 py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-7 gap-6">
            {stats.map((stat, idx) => (
              <div key={idx} className="bg-white rounded-2xl p-6 text-center shadow-sm hover:shadow-md transition-shadow">
                <stat.icon className={`w-12 h-12 mx-auto mb-3 ${stat.color}`} />
                <div className="text-sm text-gray-600 mb-1">{stat.label}</div>
                <div className="text-2xl font-bold text-blue-600">{stat.count}</div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Featured Articles Section */}
      <div className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between mb-8">
            <div>
              <h2 className="text-3xl font-bold text-gray-900 mb-2">Featured Articles</h2>
              <p className="text-gray-600">Stay informed with updates and expert articles from GetStatus.</p>
            </div>
            <button className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-lg font-medium transition-colors">
              View All
            </button>
          </div>

          {/* Articles Grid */}
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[1, 2, 3].map((item) => (
              <div key={item} className="bg-white border border-gray-200 rounded-xl overflow-hidden hover:shadow-lg transition-shadow group">
                <div className="aspect-video bg-gradient-to-br from-blue-100 to-purple-100 flex items-center justify-center">
                  <FileText className="w-16 h-16 text-blue-300" />
                </div>
                <div className="p-6">
                  <h3 className="font-semibold text-lg text-gray-900 mb-2 group-hover:text-blue-600 transition-colors">
                    Article Title {item}
                  </h3>
                  <p className="text-gray-600 text-sm mb-4">
                    Expert insights on urban renewal projects and how to navigate the process effectively...
                  </p>
                  <button className="text-blue-600 hover:text-blue-700 font-medium text-sm flex items-center gap-1">
                    Read More →
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* CTA Section */}
      <div className="bg-gradient-to-r from-blue-600 to-purple-600 py-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center text-white">
          <h2 className="text-3xl font-bold mb-4">Ready to Track Your Project?</h2>
          <p className="text-xl text-blue-100 mb-8">
            Join thousands of residents staying updated on their urban renewal projects
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <button
              onClick={() => navigate('/login2/resident')}
              className="bg-white text-blue-600 hover:bg-blue-50 px-8 py-3 rounded-lg font-semibold transition-colors"
            >
              Get Started Free
            </button>
            <button
              onClick={() => navigate('/login2/stakeholder')}
              className="bg-transparent border-2 border-white text-white hover:bg-white/10 px-8 py-3 rounded-lg font-semibold transition-colors"
            >
              Join as Professional
            </button>
          </div>
        </div>
      </div>

      {/* Footer */}
      <footer className="bg-gray-900 text-gray-400 py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-4 gap-8 mb-8">
            <div>
              <h4 className="text-white font-semibold mb-4">For Residents</h4>
              <ul className="space-y-2">
                <li><a href="#" className="hover:text-white transition-colors">Find My Project</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Browse Projects</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Knowledge Base</a></li>
              </ul>
            </div>
            <div>
              <h4 className="text-white font-semibold mb-4">For Professionals</h4>
              <ul className="space-y-2">
                <li><a href="#" className="hover:text-white transition-colors">Join the Network</a></li>
                <li><a href="#" className="hover:text-white transition-colors">List Your Projects</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Success Stories</a></li>
              </ul>
            </div>
            <div>
              <h4 className="text-white font-semibold mb-4">Resources</h4>
              <ul className="space-y-2">
                <li><a href="#" className="hover:text-white transition-colors">Articles</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Help Center</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Contact Us</a></li>
              </ul>
            </div>
            <div>
              <h4 className="text-white font-semibold mb-4">Company</h4>
              <ul className="space-y-2">
                <li><a href="#" className="hover:text-white transition-colors">About</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Careers</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Privacy</a></li>
              </ul>
            </div>
          </div>
          <div className="border-t border-gray-800 pt-8 text-center">
            <p>© 2024 GetStatus. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}
