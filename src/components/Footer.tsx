import React, { useState } from 'react';
import { Bot, Mail, Check, ArrowRight, Shield, Globe } from 'lucide-react';
import { NavTab } from '../types';

interface FooterProps {
  setActiveTab: (tab: NavTab) => void;
  onOpenDemoModal: () => void;
  isLightMode?: boolean;
}

export const Footer: React.FC<FooterProps> = ({ setActiveTab, onOpenDemoModal, isLightMode = false }) => {
  const [email, setEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;
    setSubscribed(true);
    setTimeout(() => {
      setEmail('');
      setSubscribed(false);
    }, 3000);
  };

  return (
    <footer className={`border-t text-xs py-16 relative overflow-hidden transition-colors duration-300 ${isLightMode ? 'bg-slate-100 border-slate-200 text-slate-600' : 'bg-slate-950 border-slate-900 text-slate-400'}`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 space-y-12">
        
        {/* Top Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8">
          
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
          </div>

          {/* Nav Column 1 */}
          <div className="space-y-3">
            <h4 className={`text-xs font-bold uppercase tracking-wider ${isLightMode ? 'text-slate-900' : 'text-white'}`}>AI Portfolio</h4>
            <ul className="space-y-2">
              <li>
                <button onClick={() => setActiveTab('products')} className="hover:text-blue-400 transition-colors cursor-pointer">
                  AI Reporting Platform
                </button>
              </li>
              <li>
                <button onClick={() => setActiveTab('products')} className="hover:text-blue-400 transition-colors cursor-pointer">
                  Qlik to Power BI Migration
                </button>
              </li>
              <li>
                <button onClick={() => setActiveTab('products')} className="hover:text-blue-400 transition-colors cursor-pointer">
                  GBTI Smart Home Builder
                </button>
              </li>
              <li>
                <button onClick={() => setActiveTab('products')} className="hover:text-blue-400 transition-colors cursor-pointer">
                  BuildSmart Estimator
                </button>
              </li>
              <li>
                <button onClick={() => setActiveTab('products')} className="hover:text-blue-400 transition-colors cursor-pointer">
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
                <button onClick={() => setActiveTab('lab')} className="hover:text-blue-400 transition-colors cursor-pointer">
                  Innovation Lab (Labs)
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
                className="w-full py-2 bg-blue-600 hover:bg-blue-500 text-white font-semibold rounded-xl text-xs flex items-center justify-center gap-1.5 transition-all cursor-pointer"
              >
                {subscribed ? (
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

      </div>
    </footer>
  );
};
