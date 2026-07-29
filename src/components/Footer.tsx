import React, { useState } from 'react';
import { Bot, Mail, Check, ArrowRight, Shield, Globe, Loader2, MapPin, Phone, ArrowUp, Facebook, Instagram, Linkedin, Youtube, MessageCircle } from 'lucide-react';
import { NavTab, Product } from '../types';
import { PRODUCTS_DATA } from '../data/contentData';
import { sendSubscribeEmail } from '../lib/brevoService';
import { supabaseService } from '../lib/supabaseClient';

interface FooterProps {
  setActiveTab: (tab: NavTab) => void;
  onOpenDemoModal: () => void;
  onSelectProduct?: (product: Product) => void;
  isLightMode?: boolean;
}

export const Footer: React.FC<FooterProps> = ({ setActiveTab, onOpenDemoModal, onSelectProduct, isLightMode = false }) => {
  const [email, setEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);
  const [loading, setLoading] = useState(false);

  const handlePortfolioClick = (id: string) => {
    if (onSelectProduct) {
      const prod = PRODUCTS_DATA.find(p => p.id === id);
      if (prod) {
        onSelectProduct(prod);
        window.scrollTo({ top: 0, behavior: 'smooth' });
        return;
      }
    }
    setActiveTab('products');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleSubscribe = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;
    setLoading(true);
    
    // Save to Supabase for Admin Dashboard
    try {
      await supabaseService.from('subscribers').insert([{ email }]);
    } catch (dbError) {
      console.error("Error saving subscriber:", dbError);
    }

    // Send welcome email via Brevo
    await sendSubscribeEmail(email);
    
    setLoading(false);
    setSubscribed(true);
    setTimeout(() => {
      setEmail('');
      setSubscribed(false);
    }, 4000);
  };

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className={`border-t text-xs py-16 relative overflow-hidden transition-colors duration-300 ${isLightMode ? 'bg-slate-100 border-slate-200 text-slate-600' : 'bg-slate-950 border-slate-900 text-slate-400'}`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 space-y-12">
        
        {/* Top Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-6 gap-8">
          
          {/* Brand Info */}
          <div className="lg:col-span-2 space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-blue-600 to-purple-600 p-[1px]">
                <div className="w-full h-full bg-slate-950 rounded-[11px] flex items-center justify-center">
                  <Bot className="w-5 h-5 text-blue-400" />
                </div>
              </div>
              <div className="flex flex-col">
                <span className={`text-lg font-bold tracking-tight ${isLightMode ? 'text-slate-900' : 'text-white'}`}>VTab Square</span>
                <span className={`text-[10px] font-semibold uppercase tracking-wider ${isLightMode ? 'text-blue-600' : 'text-cyan-400'}`}>AI Innovation Company</span>
              </div>
            </div>

            <p className={`text-xs leading-relaxed max-w-sm ${isLightMode ? 'text-slate-600' : 'text-slate-400'}`}>
              Building next-generation AI applications, autonomous agents, and enterprise BI platforms that automate operations and redefine business productivity.
            </p>

            <div className="flex items-center gap-3 pt-2">
              <span className={`px-2.5 py-1 rounded-md border text-[10px] flex items-center gap-1 ${isLightMode ? 'bg-white border-slate-300 text-slate-600' : 'bg-slate-900 border-slate-800 text-slate-300'}`}>
                <Shield className={`w-3 h-3 ${isLightMode ? 'text-emerald-600' : 'text-emerald-400'}`} /> SOC2 Compliant
              </span>
              <span className={`px-2.5 py-1 rounded-md border text-[10px] flex items-center gap-1 ${isLightMode ? 'bg-white border-slate-300 text-slate-600' : 'bg-slate-900 border-slate-800 text-slate-300'}`}>
                <Globe className={`w-3 h-3 ${isLightMode ? 'text-blue-600' : 'text-cyan-400'}`} /> Global Enterprise Deployment
              </span>
            </div>

            {/* Social Links */}
            <div className="flex items-center gap-3 pt-4">
              <a href="https://api.whatsapp.com/send/?phone=%2B919962597975&text&type=phone_number&app_absent=0" target="_blank" rel="noopener noreferrer" className={`w-8 h-8 rounded-full flex items-center justify-center transition-all ${isLightMode ? 'bg-slate-200 hover:bg-green-500 hover:text-white text-slate-600' : 'bg-slate-800 hover:bg-green-500 hover:text-white text-slate-400'}`} title="WhatsApp">
                <MessageCircle className="w-4 h-4" />
              </a>
              <a href="mailto:vitabsquare@gmail.com" className={`w-8 h-8 rounded-full flex items-center justify-center transition-all ${isLightMode ? 'bg-slate-200 hover:bg-red-500 hover:text-white text-slate-600' : 'bg-slate-800 hover:bg-red-500 hover:text-white text-slate-400'}`} title="Email">
                <Mail className="w-4 h-4" />
              </a>
              <a href="https://www.linkedin.com/company/vtab-square/" target="_blank" rel="noopener noreferrer" className={`w-8 h-8 rounded-full flex items-center justify-center transition-all ${isLightMode ? 'bg-slate-200 hover:bg-blue-600 hover:text-white text-slate-600' : 'bg-slate-800 hover:bg-blue-600 hover:text-white text-slate-400'}`} title="LinkedIn">
                <Linkedin className="w-4 h-4" />
              </a>
              <a href="https://www.facebook.com/people/Vtab-Square-Pltd/pfbid022Lapbq9UHtRyvK9Bf24Feg8fuTdhWFTdgLs8ecb9aVigcz3yUUG6v84TbEyhdQHWl/" target="_blank" rel="noopener noreferrer" className={`w-8 h-8 rounded-full flex items-center justify-center transition-all ${isLightMode ? 'bg-slate-200 hover:bg-blue-500 hover:text-white text-slate-600' : 'bg-slate-800 hover:bg-blue-500 hover:text-white text-slate-400'}`} title="Facebook">
                <Facebook className="w-4 h-4" />
              </a>
              <a href="https://www.instagram.com/vtabsquare/" target="_blank" rel="noopener noreferrer" className={`w-8 h-8 rounded-full flex items-center justify-center transition-all ${isLightMode ? 'bg-slate-200 hover:bg-pink-600 hover:text-white text-slate-600' : 'bg-slate-800 hover:bg-pink-600 hover:text-white text-slate-400'}`} title="Instagram">
                <Instagram className="w-4 h-4" />
              </a>
              <a href="https://www.youtube.com/@vtabsquarepvtltd3512" target="_blank" rel="noopener noreferrer" className={`w-8 h-8 rounded-full flex items-center justify-center transition-all ${isLightMode ? 'bg-slate-200 hover:bg-red-600 hover:text-white text-slate-600' : 'bg-slate-800 hover:bg-red-600 hover:text-white text-slate-400'}`} title="YouTube">
                <Youtube className="w-4 h-4" />
              </a>
            </div>
          </div>

          {/* Nav Column 1 */}
          <div className="space-y-3">
            <h4 className={`text-xs font-bold uppercase tracking-wider ${isLightMode ? 'text-slate-900' : 'text-white'}`}>AI Portfolio</h4>
            <ul className="space-y-2">
              <li>
                <button onClick={() => handlePortfolioClick('ai-reporting-platform')} className="hover:text-blue-400 transition-colors cursor-pointer text-left">
                  AI Reporting Platform
                </button>
              </li>
              <li>
                <button onClick={() => handlePortfolioClick('qlik-to-powerbi-migration')} className="hover:text-blue-400 transition-colors cursor-pointer text-left">
                  Qlik to Power BI Migration
                </button>
              </li>
              <li>
                <button onClick={() => handlePortfolioClick('gbti-smart-home-builder')} className="hover:text-blue-400 transition-colors cursor-pointer text-left">
                  GBTI Smart Home Builder
                </button>
              </li>
              <li>
                <button onClick={() => handlePortfolioClick('buildsmart-estimator')} className="hover:text-blue-400 transition-colors cursor-pointer text-left">
                  BuildSmart Estimator
                </button>
              </li>
              <li>
                <button onClick={() => handlePortfolioClick('faceauth')} className="hover:text-blue-400 transition-colors cursor-pointer text-left">
                  FaceAuth Biometrics
                </button>
              </li>
            </ul>
          </div>

          {/* Nav Column 2 */}
          <div className="space-y-3">
            <h4 className={`text-xs font-bold uppercase tracking-wider ${isLightMode ? 'text-slate-900' : 'text-white'}`}>Company & Lab</h4>
            <ul className="space-y-2">
              <li>
                <button onClick={() => setActiveTab('about')} className="hover:text-blue-400 transition-colors cursor-pointer">
                  About Us & Vision
                </button>
              </li>
              <li>
                <button onClick={() => setActiveTab('solutions')} className="hover:text-blue-400 transition-colors cursor-pointer">
                  Enterprise Solutions
                </button>
              </li>
              <li>
                <button onClick={() => setActiveTab('careers')} className="hover:text-blue-400 transition-colors cursor-pointer">
                  Careers <span className={`text-[9px] px-1.5 py-0.5 rounded ml-1 ${isLightMode ? 'bg-blue-100 text-blue-700' : 'bg-blue-900/80 text-blue-300'}`}>Hiring</span>
                </button>
              </li>
              <li>
                <button onClick={() => setActiveTab('contact')} className="hover:text-blue-400 transition-colors cursor-pointer">
                  Contact AI Experts
                </button>
              </li>
            </ul>
          </div>

          {/* Contact Column */}
          <div className="space-y-3">
            <h4 className={`text-xs font-bold uppercase tracking-wider ${isLightMode ? 'text-slate-900' : 'text-white'}`}>Contact Us</h4>
            <ul className={`space-y-4 text-xs ${isLightMode ? 'text-slate-600' : 'text-slate-400'}`}>
              <li className="flex items-start gap-2.5">
                <MapPin className="w-3.5 h-3.5 shrink-0 mt-0.5 text-blue-500" />
                <span className="leading-relaxed">11 Scott Street Wausau<br />WI USA 54403</span>
              </li>
              <li className="flex items-start gap-2.5">
                <MapPin className="w-3.5 h-3.5 shrink-0 mt-0.5 text-blue-500" />
                <span className="leading-relaxed">No:253, SS Square, 2nd Floor,<br />Avarampalayam Road,<br />New Siddhapudur, Coimbatore 641008,<br />Tamil Nadu, India</span>
              </li>
              <li className="flex items-center gap-2.5">
                <Mail className="w-3.5 h-3.5 shrink-0 text-blue-500" />
                <a href="mailto:info@vtabsquare.com" className="hover:text-blue-400 transition-colors">info@vtabsquare.com</a>
              </li>
              <li className="flex items-center gap-2.5">
                <Phone className="w-3.5 h-3.5 shrink-0 text-blue-500" />
                <a href="tel:+919962597975" className="hover:text-blue-400 transition-colors">+91 99625 97975</a>
              </li>
            </ul>
          </div>

          {/* Newsletter Column */}
          <div className="space-y-3">
            <h4 className={`text-xs font-bold uppercase tracking-wider ${isLightMode ? 'text-slate-900' : 'text-white'}`}>AI Innovation Digest</h4>
            <p className={`text-xs ${isLightMode ? 'text-slate-600' : 'text-slate-400'}`}>
              Receive bi-weekly technical insights on LLMs, Power BI migrations, and agentic workflows.
            </p>

            <form onSubmit={handleSubscribe} className="space-y-2">
              <div className="relative">
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Enter work email..."
                  required
                  className={`w-full border rounded-xl px-3 py-2 text-xs focus:outline-none focus:border-blue-500 ${isLightMode ? 'bg-white border-slate-300 text-slate-900 placeholder-slate-400' : 'bg-slate-900 border-slate-800 text-white placeholder-slate-500'}`}
                />
              </div>

              <button
                type="submit"
                disabled={loading}
                className="w-full py-2 bg-blue-600 hover:bg-blue-500 disabled:opacity-50 disabled:cursor-not-allowed text-white font-semibold rounded-xl text-xs flex items-center justify-center gap-1.5 transition-all cursor-pointer"
              >
                {loading ? (
                  <>
                    <Loader2 className="w-3.5 h-3.5 animate-spin" />
                    <span>Subscribing...</span>
                  </>
                ) : subscribed ? (
                  <>
                    <Check className="w-3.5 h-3.5 text-emerald-400" />
                    <span>Subscribed!</span>
                  </>
                ) : (
                  <>
                    <Mail className="w-3.5 h-3.5" />
                    <span>Subscribe</span>
                  </>
                )}
              </button>
            </form>
          </div>

        </div>

        {/* Bottom Bar */}
        <div className={`pt-8 border-t flex flex-col sm:flex-row items-center justify-between gap-4 text-[11px] ${isLightMode ? 'border-slate-300 text-slate-500' : 'border-slate-900 text-slate-500'}`}>
          <p>© {new Date().getFullYear()} VTab Square. All rights reserved. Building Practical AI for the Enterprise.</p>
          <div className="flex items-center gap-6">
            <a href="#privacy" className="hover:text-slate-300">Privacy Policy</a>
            <a href="#terms" className="hover:text-slate-300">Terms of Service</a>
            <a href="#security" className="hover:text-slate-300">Security Architecture</a>
          </div>
        </div>

        {/* Scroll to Top Button */}
        <button
          onClick={scrollToTop}
          className="absolute right-4 bottom-8 sm:right-8 sm:bottom-8 w-10 h-10 bg-blue-600 hover:bg-blue-500 text-white rounded-full flex items-center justify-center shadow-lg transition-transform hover:-translate-y-1 cursor-pointer z-20"
          aria-label="Scroll to top"
        >
          <ArrowUp className="w-5 h-5" />
        </button>

      </div>
    </footer>
  );
};
