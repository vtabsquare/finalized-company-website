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
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled
          ? isLightMode
            ? 'bg-white/70 backdrop-blur-md border-b border-slate-200/50 py-3'
            : 'bg-[#030712]/70 backdrop-blur-md border-b border-white/5 py-3'
          : 'bg-transparent py-5'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <button
            onClick={() => handleNavClick('home')}
            className="flex items-center gap-3 group text-left cursor-pointer focus:outline-none"
            id="vtab-logo-button"
          >
            <div className="flex items-center justify-center relative w-12 h-12 shrink-0">
              <img src="/logo.png" alt="Logo" className="absolute inset-0 w-full h-full object-contain transition-transform duration-500 group-hover:scale-105" />
            </div>
            
            <div className="flex items-center gap-2">
              <span className={`text-[22px] font-heading font-extrabold tracking-tight leading-none transition-colors ${
                isLightMode ? 'text-slate-900' : 'text-slate-50'
              }`} style={{ textShadow: isLightMode ? 'none' : '0 2px 10px rgba(255,255,255,0.1)' }}>
                VTAB SQUARE
              </span>
              <span className={`px-1.5 py-0.5 text-[9px] font-bold tracking-widest rounded leading-none flex items-center ${
                isLightMode
                  ? 'text-blue-700 bg-blue-100/50 border border-blue-200'
                  : 'text-blue-300 bg-blue-500/10 border border-blue-500/30'
              }`}>
                AI
              </span>
            </div>
          </button>

          {/* Streamlined Desktop Nav Items */}
          <nav className="hidden lg:flex items-center gap-8">
            {primaryNavItems.map((item) => {
              const isActive = activeTab === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => handleNavClick(item.id)}
                  className={`relative text-sm font-medium transition-colors flex items-center gap-1.5 cursor-pointer ${
                    isActive
                      ? isLightMode
                        ? 'text-slate-900'
                        : 'text-white'
                      : isLightMode
                        ? 'text-slate-500 hover:text-slate-900'
                        : 'text-slate-400 hover:text-white'
                  }`}
                  id={`nav-link-${item.id}`}
                >
                  {item.label}
                  {item.badge && (
                    <span
                      className={`text-[9px] px-1.5 py-0.5 rounded-full font-bold uppercase tracking-wider ${
                        isLightMode
                          ? 'bg-blue-100 text-blue-700'
                          : 'bg-blue-500/20 text-blue-400'
                      }`}
                    >
                      {item.badge}
                    </span>
                  )}
                  {isActive && (
                    <span className="absolute -bottom-1 left-0 right-0 h-[2px] bg-blue-500 rounded-full" />
                  )}
                </button>
              );
            })}

            {/* Streamlined 'More' Dropdown Menu */}
            <div className="relative" ref={dropdownRef}>
              <button
                onClick={() => setMoreDropdownOpen(!moreDropdownOpen)}
                className={`text-sm font-medium transition-colors flex items-center gap-1 cursor-pointer ${
                  isSecondaryActive || moreDropdownOpen
                    ? isLightMode
                      ? 'text-slate-900'
                      : 'text-white'
                    : isLightMode
                      ? 'text-slate-500 hover:text-slate-900'
                      : 'text-slate-400 hover:text-white'
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
            {/* Dark/Light Mode Switch */}
            {onToggleTheme && (
              <button
                onClick={onToggleTheme}
                className={`p-2 rounded-full transition-colors cursor-pointer flex items-center justify-center ${
                  isLightMode
                    ? 'text-slate-500 hover:bg-slate-100 hover:text-slate-900'
                    : 'text-slate-400 hover:bg-white/10 hover:text-white'
                }`}
                title={isLightMode ? "Switch to Dark Mode" : "Switch to Light Mode"}
                id="theme-toggle-btn"
              >
                {isLightMode ? <Moon className="w-4 h-4" /> : <Sun className="w-4 h-4" />}
              </button>
            )}

            <button
              onClick={onOpenSandboxModal}
              className={`px-5 py-2 text-sm font-medium rounded-full transition-all flex items-center gap-2 cursor-pointer border shadow-sm hover:shadow-md ${
                isLightMode
                  ? 'text-blue-700 bg-white hover:bg-blue-50/50 border-blue-200'
                  : 'text-slate-300 hover:text-white bg-[#030712] hover:bg-white/5 border-white/10'
              }`}
              id="sandbox-header-btn"
            >
              <Sparkles className="w-4 h-4 text-blue-500" />
              <span>AI Sandbox</span>
            </button>

            <button
              onClick={() => onOpenDemoModal()}
              className="px-6 py-2.5 text-sm font-bold rounded-full transition-all shadow-lg shadow-blue-600/25 hover:shadow-blue-500/40 flex items-center gap-2 cursor-pointer bg-gradient-to-r from-blue-700 via-blue-600 to-cyan-600 hover:from-blue-600 hover:via-blue-500 hover:to-cyan-500 text-white border border-white/20 hover:scale-105 active:scale-95 shadow-[inset_0_1px_1px_rgba(255,255,255,0.3)]"
              id="book-demo-header-btn"
            >
              <span>Schedule Demo</span>
              <ArrowRight className="w-4 h-4" />
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
                onOpenSandboxModal();
              }}
              className={`w-full py-2.5 text-xs font-semibold rounded-xl flex items-center justify-center gap-2 ${
                isLightMode ? 'bg-slate-100 text-slate-900 border border-slate-300' : 'bg-slate-900 text-slate-200 border border-slate-700'
              }`}
            >
              <Sparkles className="w-4 h-4 text-cyan-500" />
              <span>Try AI Assistant Sandbox</span>
            </button>

            <button
              onClick={() => {
                setMobileMenuOpen(false);
                onOpenDemoModal();
              }}
              className="w-full py-2.5 text-xs font-bold text-white bg-gradient-to-r from-blue-600 to-indigo-600 rounded-xl flex items-center justify-center gap-2 shadow-lg shadow-blue-600/30"
            >
              <Calendar className="w-4 h-4" />
              <span>Schedule a Demo</span>
            </button>
          </div>
        </div>
      )}
    </header>
  );
};
