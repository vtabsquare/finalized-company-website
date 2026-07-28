import React, { useState, useEffect, useRef } from 'react';
import { Bot, Menu, X, Sparkles, ChevronRight, ArrowRight, Calendar, Sun, Moon, ChevronDown, FlaskConical, Building2, Briefcase, Mail } from 'lucide-react';
import { NavTab } from '../types';

interface NavbarProps {
  activeTab: NavTab;
  setActiveTab: (tab: NavTab) => void;
  onOpenDemoModal: (interestArea?: string) => void;
  onOpenSandboxModal: () => void;
  isLightMode?: boolean;
  onToggleTheme?: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  activeTab,
  setActiveTab,
  onOpenDemoModal,
  onOpenSandboxModal,
  isLightMode = false,
  onToggleTheme
}) => {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [moreDropdownOpen, setMoreDropdownOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 20) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Close dropdown on click outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setMoreDropdownOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const primaryNavItems: { id: NavTab; label: string; badge?: string }[] = [
    { id: 'home', label: 'Home' },
    { id: 'products', label: 'Products', badge: '8 Live' },
    { id: 'solutions', label: 'Solutions' },
  ];

  const secondaryNavItems: { id: NavTab; label: string; desc: string; icon: React.ReactNode }[] = [
    { 
      id: 'lab', 
      label: 'Innovation Lab', 
      desc: 'Experimental R&D & Autonomous Agents', 
      icon: <FlaskConical className="w-4 h-4 text-purple-400" /> 
    },
    { 
      id: 'about', 
      label: 'Company', 
      desc: 'Mission, Team & Enterprise History', 
      icon: <Building2 className="w-4 h-4 text-blue-400" /> 
    },
    { 
      id: 'careers', 
      label: 'Careers', 
      desc: 'Join our AI Engineering Team', 
      icon: <Briefcase className="w-4 h-4 text-emerald-400" /> 
    },
    { 
      id: 'contact', 
      label: 'Contact', 
      desc: 'Get in touch with Solution Architects', 
      icon: <Mail className="w-4 h-4 text-amber-400" /> 
    },
  ];

  const handleNavClick = (tabId: NavTab) => {
    setActiveTab(tabId);
    setMobileMenuOpen(false);
    setMoreDropdownOpen(false);

    if (tabId === 'home') {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } else if (tabId === 'products') {
      const el = document.getElementById('ai-portfolio');
      if (el) el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const isSecondaryActive = secondaryNavItems.some(item => item.id === activeTab);

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        scrolled
          ? isLightMode
            ? 'bg-white/80 backdrop-blur-xl border-b border-slate-200/80 shadow-[0_4px_20px_rgba(0,0,0,0.03)] py-3.5'
            : 'bg-[#030712]/80 backdrop-blur-xl border-b border-white/10 shadow-[0_4px_30px_rgba(0,0,0,0.5)] py-3.5'
          : 'bg-transparent py-5'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <button
            onClick={() => handleNavClick('home')}
            className="flex items-center gap-3.5 group text-left cursor-pointer focus:outline-none"
            id="vtab-logo-button"
          >
            <div className="flex items-center justify-center relative w-12 h-12 shrink-0">
              <div className="absolute inset-0 bg-blue-500/10 dark:bg-amber-500/10 rounded-full blur-xl group-hover:scale-125 transition-transform duration-500 opacity-0 group-hover:opacity-100" />
              <img src="/logo.png" alt="Logo" className="relative z-10 w-full h-full object-contain transition-transform duration-500 group-hover:scale-105" />
            </div>
            
            <div className="flex flex-col justify-center">
              <div className="flex items-center gap-2">
                <span 
                  className={`text-[22px] font-bold tracking-[0.1em] leading-none transition-colors ${
                    isLightMode 
                      ? 'text-slate-900 group-hover:text-blue-700' 
                      : 'text-white group-hover:text-amber-300'
                  }`} 
                  style={{ fontFamily: "'Cinzel', serif" }}
                >
                  VTAB <span className={isLightMode ? 'text-blue-700 font-extrabold' : 'text-amber-400 font-extrabold'}>SQUARE</span>
                </span>
                <span className="px-1.5 py-0.5 text-[9px] font-bold tracking-widest uppercase rounded bg-gradient-to-r from-amber-500/20 to-amber-600/10 text-amber-700 dark:text-amber-300 border border-amber-500/30 shadow-sm leading-none">
                  AI
                </span>
              </div>
              <span className="text-[9px] tracking-[0.25em] font-semibold uppercase text-slate-400 dark:text-slate-400 leading-none mt-1.5">
                Enterprise Intelligence
              </span>
            </div>
          </button>

          {/* Streamlined Desktop Nav Items */}
          <nav className="hidden lg:flex items-center gap-1 p-1.5 rounded-full border bg-white/40 dark:bg-white/[0.03] border-slate-200/60 dark:border-white/10 backdrop-blur-md shadow-sm">
            {primaryNavItems.map((item) => {
              const isActive = activeTab === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => handleNavClick(item.id)}
                  className={`relative px-4 py-2 rounded-full text-xs font-semibold transition-all duration-300 flex items-center gap-2 cursor-pointer ${
                    isActive
                      ? isLightMode
                        ? 'bg-slate-900 text-white shadow-md shadow-slate-900/10'
                        : 'bg-white text-slate-950 shadow-md shadow-white/10 font-bold'
                      : isLightMode
                        ? 'text-slate-600 hover:text-slate-900 hover:bg-slate-100/80'
                        : 'text-slate-400 hover:text-white hover:bg-white/[0.06]'
                  }`}
                  id={`nav-link-${item.id}`}
                >
                  <span>{item.label}</span>
                  {item.badge && (
                    <span
                      className={`text-[9px] px-1.5 py-0.5 rounded-full font-bold uppercase tracking-wider transition-colors ${
                        isActive
                          ? isLightMode
                            ? 'bg-blue-500 text-white'
                            : 'bg-blue-600 text-white'
                          : isLightMode
                            ? 'bg-blue-100/80 text-blue-700 border border-blue-200'
                            : 'bg-blue-500/20 text-cyan-300 border border-cyan-500/30'
                      }`}
                    >
                      {item.badge}
                    </span>
                  )}
                </button>
              );
            })}

            {/* Streamlined 'More' Dropdown Menu */}
            <div className="relative" ref={dropdownRef}>
              <button
                onClick={() => setMoreDropdownOpen(!moreDropdownOpen)}
                className={`px-4 py-2 rounded-full text-xs font-semibold transition-all duration-300 flex items-center gap-1.5 cursor-pointer ${
                  isSecondaryActive || moreDropdownOpen
                    ? isLightMode
                      ? 'bg-slate-900 text-white shadow-md shadow-slate-900/10'
                      : 'bg-white text-slate-950 shadow-md shadow-white/10 font-bold'
                    : isLightMode
                      ? 'text-slate-600 hover:text-slate-900 hover:bg-slate-100/80'
                      : 'text-slate-400 hover:text-white hover:bg-white/[0.06]'
                }`}
                id="more-dropdown-btn"
              >
                <span>More</span>
                <ChevronDown className={`w-3.5 h-3.5 transition-transform duration-200 ${moreDropdownOpen ? 'rotate-180' : ''}`} />
              </button>

              {/* Dropdown Card */}
              {moreDropdownOpen && (
                <div 
                  className={`absolute top-full right-0 mt-3 w-64 rounded-2xl p-2 shadow-2xl border backdrop-blur-2xl transition-all duration-200 animate-in fade-in slide-in-from-top-2 z-50 ${
                    isLightMode
                      ? 'bg-white/95 border-slate-200 shadow-slate-300/50 text-slate-900'
                      : 'bg-slate-950/95 border-white/15 shadow-black/80 text-white'
                  }`}
                >
                  <div className="px-3 py-1.5 mb-1 border-b border-slate-200/60 dark:border-white/10 text-[10px] uppercase font-bold text-slate-400 tracking-wider">
                    Company & Platform
                  </div>

                  {secondaryNavItems.map((item) => (
                    <button
                      key={item.id}
                      onClick={() => handleNavClick(item.id)}
                      className={`w-full p-2.5 rounded-xl text-left transition-all flex items-start gap-3 cursor-pointer group ${
                        activeTab === item.id
                          ? isLightMode
                            ? 'bg-blue-50 text-blue-700 border border-blue-200'
                            : 'bg-blue-600/20 text-blue-300 border border-blue-500/30'
                          : isLightMode
                            ? 'hover:bg-slate-100 text-slate-800'
                            : 'hover:bg-white/5 text-slate-200'
                      }`}
                    >
                      <div className="p-2 rounded-lg bg-slate-100 dark:bg-white/5 group-hover:scale-110 transition-transform">
                        {item.icon}
                      </div>
                      <div className="flex flex-col">
                        <span className="text-xs font-bold leading-tight">{item.label}</span>
                        <span className="text-[10px] text-slate-400 mt-0.5">{item.desc}</span>
                      </div>
                    </button>
                  ))}
                </div>
              )}
            </div>
          </nav>

          {/* Action CTAs */}
          <div className="hidden md:flex items-center gap-3">
            {/* Live Enterprise Status & Contact Widget */}
            <button
              onClick={() => handleNavClick('contact')}
              className={`hidden xl:flex items-center gap-2.5 px-4 py-2 rounded-full text-xs font-semibold transition-all duration-300 group border cursor-pointer ${
                isLightMode 
                  ? 'bg-white/80 hover:bg-white text-slate-700 hover:text-blue-600 border-slate-200/80 hover:border-blue-300 shadow-sm hover:shadow-md' 
                  : 'bg-white/[0.03] hover:bg-white/[0.08] text-slate-300 hover:text-white border-white/10 hover:border-cyan-400/30 shadow-inner'
              }`}
            >
              <div className="flex items-center gap-1.5">
                <span className="relative flex h-2 w-2">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
                </span>
                <span className="text-[11px] font-bold tracking-wider uppercase text-slate-600 dark:text-slate-300 group-hover:text-blue-600 dark:group-hover:text-cyan-400 transition-colors">
                  SOC2 Type II
                </span>
              </div>
              <span className="h-3.5 w-[1px] bg-slate-200 dark:bg-white/15" />
              <span className="text-[11px] font-bold text-blue-600 dark:text-cyan-400 group-hover:underline flex items-center gap-1">
                <span>Talk to Architect</span>
                <ArrowRight className="w-3 h-3 transition-transform group-hover:translate-x-0.5" />
              </span>
            </button>

            {/* Dark/Light Mode Switch */}
            {onToggleTheme && (
              <button
                onClick={onToggleTheme}
                className={`p-2.5 rounded-full transition-all duration-300 cursor-pointer flex items-center justify-center border ${
                  isLightMode
                    ? 'text-slate-600 bg-white/80 hover:bg-white border-slate-200/80 hover:border-slate-300 hover:text-slate-900 shadow-sm hover:shadow'
                    : 'text-slate-300 bg-white/[0.03] border-white/10 hover:bg-white/[0.1] hover:text-white hover:border-white/20 shadow-inner'
                }`}
                title={isLightMode ? "Switch to Dark Mode" : "Switch to Light Mode"}
                id="theme-toggle-btn"
              >
                {isLightMode ? <Moon className="w-4 h-4 text-slate-700" /> : <Sun className="w-4 h-4 text-amber-400" />}
              </button>
            )}

            {/* Primary Executive Hero CTA */}
            <button
              onClick={() => onOpenDemoModal()}
              className={`group relative inline-flex items-center gap-2.5 px-6 py-2.5 rounded-full text-xs font-extrabold transition-all duration-300 shadow-xl cursor-pointer overflow-hidden border ${
                isLightMode
                  ? 'bg-gradient-to-r from-blue-600 via-indigo-600 to-blue-700 text-white border-blue-500/50 shadow-blue-500/25 hover:shadow-blue-600/40 hover:scale-[1.03] active:scale-[0.98]'
                  : 'bg-gradient-to-r from-cyan-500 via-blue-600 to-indigo-600 text-white border-cyan-400/40 shadow-cyan-500/25 hover:shadow-cyan-500/40 hover:border-cyan-300 hover:scale-[1.03] active:scale-[0.98]'
              }`}
              id="book-demo-header-btn"
            >
              {/* Subtle glass shimmer sweep */}
              <span className="absolute inset-0 w-1/2 h-full bg-white/20 skew-x--20 -translate-x-full group-hover:translate-x-[300%] transition-transform duration-1000 ease-out pointer-events-none" />
              <Calendar className="w-3.5 h-3.5 relative z-10" />
              <span className="tracking-widest uppercase font-bold relative z-10">Book Executive Demo</span>
              <ArrowRight className="w-3.5 h-3.5 relative z-10 transition-transform duration-300 group-hover:translate-x-1" />
            </button>
          </div>

          {/* Mobile Menu Button */}
          <div className="lg:hidden flex items-center gap-2">
            {onToggleTheme && (
              <button
                onClick={onToggleTheme}
                className={`p-2 rounded-lg border ${
                  isLightMode ? 'bg-amber-100 border-amber-300 text-amber-700' : 'border-white/10 bg-white/5 text-cyan-300'
                }`}
                id="theme-toggle-mobile-btn"
              >
                {isLightMode ? <Sun className="w-4 h-4" /> : <Moon className="w-4 h-4" />}
              </button>
            )}

            <button
              onClick={() => onOpenDemoModal()}
              className="px-3 py-1.5 text-xs font-bold text-white bg-blue-600 rounded-lg flex items-center gap-1 shadow-md"
            >
              Demo
            </button>

            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className={`p-2 rounded-xl border ${
                isLightMode 
                  ? 'bg-slate-100 text-slate-800 border-slate-300' 
                  : 'bg-slate-900 text-slate-300 border-slate-800'
              }`}
              aria-label="Toggle menu"
              id="mobile-menu-toggle"
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className={`lg:hidden backdrop-blur-2xl border-b px-4 pt-4 pb-6 mt-3 space-y-3 shadow-2xl animate-in slide-in-from-top-2 ${
          isLightMode ? 'bg-white/95 border-slate-200 text-slate-900' : 'bg-slate-950/95 border-slate-800 text-white'
        }`}>
          <div className="grid grid-cols-2 gap-2 pb-2">
            {primaryNavItems.concat(secondaryNavItems.map(s => ({ id: s.id, label: s.label, badge: undefined }))).map((item) => (
              <button
                key={item.id}
                onClick={() => handleNavClick(item.id)}
                className={`p-2.5 text-xs font-semibold rounded-xl text-left flex items-center justify-between cursor-pointer ${
                  activeTab === item.id
                    ? 'bg-blue-600 text-white shadow-md'
                    : isLightMode
                      ? 'bg-slate-100 text-slate-800 border border-slate-200'
                      : 'bg-slate-900/60 text-slate-300 border border-slate-800/60'
                }`}
              >
                <span>{item.label}</span>
                {item.badge && (
                  <span className="text-[9px] px-1.5 py-0.5 rounded bg-blue-500/20 text-blue-300">
                    {item.badge}
                  </span>
                )}
              </button>
            ))}
          </div>

          <div className="pt-2 border-t border-slate-200 dark:border-slate-800/80 flex flex-col gap-2">
            <button
              onClick={() => {
                setMobileMenuOpen(false);
                handleNavClick('contact');
              }}
              className={`w-full py-2.5 text-xs font-semibold rounded-xl flex items-center justify-center gap-2 ${
                isLightMode ? 'bg-slate-100 text-slate-700 border border-slate-300' : 'bg-white/5 text-slate-300 border border-white/10'
              }`}
            >
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
              <span>Contact Architects</span>
            </button>

            <button
              onClick={() => {
                setMobileMenuOpen(false);
                onOpenDemoModal();
              }}
              className="w-full py-2.5 text-xs font-extrabold uppercase tracking-widest text-white bg-gradient-to-r from-blue-600 via-indigo-600 to-cyan-500 rounded-xl flex items-center justify-center gap-2 shadow-lg shadow-blue-600/30"
            >
              <Calendar className="w-4 h-4" />
              <span>Schedule Demo</span>
            </button>
          </div>
        </div>
      )}
    </header>
  );
};
