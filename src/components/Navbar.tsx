import React, { useState, useEffect, useRef } from 'react';
import { Menu, X, ArrowUpRight, Sun, Moon, ChevronDown, Building2, Briefcase, Mail, ShieldCheck } from 'lucide-react';
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
    { id: 'products', label: 'Products' },
    { id: 'solutions', label: 'Solutions' },
  ];

  const secondaryNavItems: { id: NavTab; label: string; desc: string; icon: React.ReactNode }[] = [
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
            ? 'bg-white/70 backdrop-blur-2xl border-b border-slate-900/[0.06] py-3'
            : 'bg-[#05070d]/70 backdrop-blur-2xl border-b border-white/[0.06] py-3'
          : 'bg-transparent border-b border-transparent py-6'
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
            <div className="flex items-center justify-center relative w-11 h-11 shrink-0">
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
              </div>
              <span className="text-[9px] tracking-[0.25em] font-semibold uppercase text-slate-400 dark:text-slate-400 leading-none mt-1.5">
                Enterprise Intelligence
              </span>
            </div>
          </button>

          {/* Editorial Desktop Nav */}
          <nav className="hidden lg:flex items-center gap-9 absolute left-1/2 -translate-x-1/2">
            {primaryNavItems.map((item) => {
              const isActive = activeTab === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => handleNavClick(item.id)}
                  className={`group relative py-2 text-[13px] font-medium tracking-[0.02em] transition-colors duration-300 cursor-pointer flex items-baseline gap-1 ${
                    isActive
                      ? isLightMode ? 'text-slate-950' : 'text-white'
                      : isLightMode
                        ? 'text-slate-500 hover:text-slate-950'
                        : 'text-slate-400 hover:text-white'
                  }`}
                  id={`nav-link-${item.id}`}
                >
                  <span>{item.label}</span>
                  {item.badge && (
                    <span className={`text-[10px] font-semibold leading-none ${isLightMode ? 'text-blue-600' : 'text-cyan-400'}`}>
                      {item.badge.replace(' Live', '')}
                    </span>
                  )}
                  <span className={`absolute -bottom-0.5 left-0 h-px transition-all duration-300 ${
                    isLightMode ? 'bg-slate-950' : 'bg-white'
                  } ${isActive ? 'w-full' : 'w-0 group-hover:w-full'}`} />
                </button>
              );
            })}

            {/* 'More' Dropdown */}
            <div className="relative" ref={dropdownRef}>
              <button
                onClick={() => setMoreDropdownOpen(!moreDropdownOpen)}
                className={`group relative py-2 text-[13px] font-medium tracking-[0.02em] transition-colors duration-300 cursor-pointer flex items-center gap-1.5 ${
                  isSecondaryActive || moreDropdownOpen
                    ? isLightMode ? 'text-slate-950' : 'text-white'
                    : isLightMode
                      ? 'text-slate-500 hover:text-slate-950'
                      : 'text-slate-400 hover:text-white'
                }`}
                id="more-dropdown-btn"
              >
                <span>More</span>
                <ChevronDown className={`w-3.5 h-3.5 opacity-60 transition-transform duration-300 ${moreDropdownOpen ? 'rotate-180' : ''}`} />
                <span className={`absolute -bottom-0.5 left-0 h-px transition-all duration-300 ${
                  isLightMode ? 'bg-slate-950' : 'bg-white'
                } ${isSecondaryActive ? 'w-full' : 'w-0 group-hover:w-full'}`} />
              </button>

              {/* Dropdown Card */}
              {moreDropdownOpen && (
                <div
                  className={`absolute top-full right-0 mt-4 w-72 rounded-xl p-1.5 shadow-2xl border backdrop-blur-2xl transition-all duration-200 animate-in fade-in slide-in-from-top-2 z-50 ${
                    isLightMode
                      ? 'bg-white/95 border-slate-900/[0.08] shadow-slate-900/10 text-slate-900'
                      : 'bg-[#0a0f1a]/95 border-white/10 shadow-black/60 text-white'
                  }`}
                >
                  {secondaryNavItems.map((item) => (
                    <button
                      key={item.id}
                      onClick={() => handleNavClick(item.id)}
                      className={`w-full px-3 py-2.5 rounded-lg text-left transition-colors flex items-center gap-3 cursor-pointer group ${
                        activeTab === item.id
                          ? isLightMode
                            ? 'bg-slate-100 text-slate-950'
                            : 'bg-white/[0.08] text-white'
                          : isLightMode
                            ? 'hover:bg-slate-50 text-slate-700'
                            : 'hover:bg-white/[0.04] text-slate-300'
                      }`}
                    >
                      <div className={`p-1.5 rounded-md transition-transform group-hover:scale-105 ${isLightMode ? 'bg-slate-100' : 'bg-white/[0.06]'}`}>
                        {item.icon}
                      </div>
                      <div className="flex flex-col flex-1 min-w-0">
                        <span className="text-[13px] font-semibold leading-tight">{item.label}</span>
                        <span className="text-[11px] text-slate-400 mt-0.5 truncate">{item.desc}</span>
                      </div>
                      <ArrowUpRight className="w-3.5 h-3.5 opacity-0 -translate-x-1 transition-all group-hover:opacity-40 group-hover:translate-x-0" />
                    </button>
                  ))}

                  <div className={`mt-1 px-3 py-2.5 border-t flex items-center gap-2 ${isLightMode ? 'border-slate-100' : 'border-white/[0.06]'}`}>
                    <ShieldCheck className="w-3.5 h-3.5 text-emerald-500" />
                    <span className="text-[10px] font-medium tracking-[0.14em] uppercase text-slate-400">SOC2 Type II Certified</span>
                  </div>
                </div>
              )}
            </div>
          </nav>

          {/* Action CTAs */}
          <div className="hidden md:flex items-center gap-6">
            {/* Dark/Light Mode Switch */}
            {onToggleTheme && (
              <button
                onClick={onToggleTheme}
                className={`transition-colors duration-300 cursor-pointer ${
                  isLightMode
                    ? 'text-slate-400 hover:text-slate-950'
                    : 'text-slate-500 hover:text-white'
                }`}
                title={isLightMode ? "Switch to Dark Mode" : "Switch to Light Mode"}
                id="theme-toggle-btn"
              >
                {isLightMode ? <Moon className="w-[18px] h-[18px]" /> : <Sun className="w-[18px] h-[18px]" />}
              </button>
            )}

            {/* Primary CTA — solid monochrome */}
            <button
              onClick={() => onOpenDemoModal()}
              className={`group inline-flex items-center gap-2 pl-5 pr-4 py-2.5 rounded-full text-[12px] font-semibold tracking-[0.08em] uppercase transition-colors duration-300 cursor-pointer ${
                isLightMode
                  ? 'bg-slate-950 text-white hover:bg-slate-800'
                  : 'bg-white text-slate-950 hover:bg-slate-200'
              }`}
              id="book-demo-header-btn"
            >
              <span>Contact for Demo</span>
              <ArrowUpRight className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
            </button>
          </div>

          {/* Mobile Menu Button */}
          <div className="lg:hidden flex items-center gap-2">
            {onToggleTheme && (
              <button
                onClick={onToggleTheme}
                className={`p-2 rounded-full transition-colors ${
                  isLightMode ? 'text-slate-500 hover:bg-slate-100' : 'text-slate-400 hover:bg-white/[0.06]'
                }`}
                id="theme-toggle-mobile-btn"
              >
                {isLightMode ? <Sun className="w-4 h-4" /> : <Moon className="w-4 h-4" />}
              </button>
            )}

            <button
              onClick={() => onOpenDemoModal()}
              className={`px-4 py-2 text-[11px] font-semibold uppercase tracking-wider rounded-full transition-colors ${
                isLightMode ? 'bg-slate-950 text-white' : 'bg-white text-slate-950'
              }`}
            >
              Demo
            </button>

            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className={`p-2 rounded-full transition-colors ${
                isLightMode 
                  ? 'text-slate-700 hover:bg-slate-100' 
                  : 'text-slate-300 hover:bg-white/[0.06]'
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
                    ? isLightMode
                      ? 'bg-slate-950 text-white'
                      : 'bg-white text-slate-950'
                    : isLightMode
                      ? 'bg-slate-100 text-slate-800 border border-slate-200'
                      : 'bg-white/[0.04] text-slate-300 border border-white/[0.08]'
                }`}
              >
                <span>{item.label}</span>
                {item.badge && (
                  <span className={`text-[10px] font-semibold ${activeTab === item.id ? (isLightMode ? 'text-blue-300' : 'text-blue-600') : 'text-blue-500'}`}>
                    {item.badge.replace(' Live', '')}
                  </span>
                )}
              </button>
            ))}
          </div>

          <div className="pt-2 border-t border-slate-200 dark:border-slate-800/80 flex flex-col gap-2">
            <button
              onClick={() => {
                setMobileMenuOpen(false);
                onOpenDemoModal();
              }}
              className={`w-full py-3 text-[12px] font-semibold uppercase tracking-[0.1em] rounded-xl flex items-center justify-center gap-2 transition-colors ${
                isLightMode ? 'bg-slate-950 text-white hover:bg-slate-800' : 'bg-white text-slate-950 hover:bg-slate-200'
              }`}
            >
              <span>Contact for Demo</span>
              <ArrowUpRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      )}
    </header>
  );
};
