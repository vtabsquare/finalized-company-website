import React, { useState, useEffect } from 'react';
import { Innovation } from '../types';
import { supabase } from '../lib/supabaseClient';
import { Sparkles, Mic, Users, FileText, Code2, CheckCircle2, Lock, Cpu, Activity, Terminal, Send, Loader2 } from 'lucide-react';
import { sendEarlyAccessEmail } from '../lib/brevoService';
import { ScrollReveal } from './animations/ScrollReveal';

interface FutureInnovationsProps {
  onScheduleDemo: (innovationTitle?: string) => void;
  isLightMode?: boolean;
}

export const FutureInnovations: React.FC<FutureInnovationsProps> = ({
  onScheduleDemo,
  isLightMode = false
}) => {
  const [activeIndex, setActiveIndex] = useState(0);
  const [accessSubmitted, setAccessSubmitted] = useState<string | null>(null);
  const [requestingTitle, setRequestingTitle] = useState<string | null>(null);
  const [email, setEmail] = useState('');
  const [submitting, setSubmitting] = useState(false);
  const [innovations, setInnovations] = useState<Innovation[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchInnovations = async () => {
      const { data, error } = await supabase.from('innovations').select('*');
      if (error) {
        console.error('Error fetching innovations:', error);
      } else if (data) {
        setInnovations(data as Innovation[]);
      }
      setLoading(false);
    };
    fetchInnovations();
  }, []);

  const activeInnovation = innovations[activeIndex];

  const renderIcon = (iconName: string) => {
    switch (iconName) {
      case 'Mic': return <Mic className="w-5 h-5" />;
      case 'Users': return <Users className="w-5 h-5" />;
      case 'FileText': return <FileText className="w-5 h-5" />;
      case 'Code2': return <Code2 className="w-5 h-5" />;
      case 'Sparkles': return <Sparkles className="w-5 h-5" />;
      default: return <Cpu className="w-5 h-5" />;
    }
  };

  const handleEarlyAccessSubmit = async (e: React.FormEvent, title: string) => {
    e.preventDefault();
    if (!email || !email.includes('@')) return;
    setSubmitting(true);
    await sendEarlyAccessEmail(email, title);
    setSubmitting(false);
    setRequestingTitle(null);
    setEmail('');
    setAccessSubmitted(title);
    setTimeout(() => {
      setAccessSubmitted(null);
    }, 5000);
  };

  return (
    <section className={`py-24 relative overflow-hidden transition-colors duration-300 border-t ${isLightMode ? 'bg-slate-50 border-slate-200' : 'bg-[#030712] border-white/5'}`}>
      {/* Background Ambience */}
      <div className="absolute top-0 right-0 w-full h-full overflow-hidden pointer-events-none">
        <div className={`absolute -top-[30%] -right-[10%] w-[70%] h-[70%] rounded-full blur-[120px] ${isLightMode ? 'bg-purple-200/40' : 'bg-purple-900/10'}`} />
        <div className={`absolute -bottom-[30%] -left-[10%] w-[70%] h-[70%] rounded-full blur-[120px] ${isLightMode ? 'bg-cyan-200/40' : 'bg-cyan-900/10'}`} />
      </div>

      <div className="max-w-[1400px] mx-auto px-6 lg:px-8 relative z-10">
        
        {/* Section Header */}
        <ScrollReveal animation="fade-up">
          <div className="text-center max-w-3xl mx-auto mb-16 space-y-4">
            <div className={`inline-flex items-center gap-2 px-4 py-1.5 rounded-full border text-[10px] font-bold uppercase tracking-[0.2em] shadow-sm backdrop-blur-md ${isLightMode ? 'bg-white/80 border-slate-300 text-slate-700' : 'bg-white/5 border-white/10 text-slate-300'}`}>
              <Terminal className={`w-3.5 h-3.5 ${isLightMode ? 'text-cyan-600' : 'text-cyan-400'}`} />
              <span>Innovation Lab Roadmap</span>
            </div>

            <h2 className={`text-4xl sm:text-5xl font-extrabold tracking-tight ${isLightMode ? 'text-slate-900' : 'text-white'}`}>
              Future <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-cyan-400">Innovations</span>
            </h2>

            <p className={`text-base sm:text-lg leading-relaxed max-w-2xl mx-auto ${isLightMode ? 'text-slate-600' : 'text-slate-400'}`}>
              Get an exclusive look at the next-generation autonomous AI engines currently undergoing closed lab testing.
            </p>
          </div>
        </ScrollReveal>

        {/* 2-Column Premium Interactive Layout */}
        <div className="flex flex-col lg:flex-row gap-6 lg:gap-8 items-stretch h-full">
          
          {/* Left Column: Index List */}
          <div className="w-full lg:w-1/3 flex flex-col gap-3">
            {loading ? (
              <div className={`p-8 text-center text-sm animate-pulse ${isLightMode ? 'text-slate-500' : 'text-slate-400'}`}>Loading innovations...</div>
            ) : innovations.map((innovation, idx) => {
              const isActive = activeIndex === idx;
              return (
                <ScrollReveal key={innovation.id} animation="fade-right" delay={0.05 * (idx % 3)}>
                  <button
                    onClick={() => setActiveIndex(idx)}
                    className={`w-full text-left p-4 rounded-2xl border transition-all duration-300 flex items-center gap-4 group cursor-pointer ${
                      isActive 
                        ? (isLightMode ? 'bg-purple-50 border-purple-200 shadow-[0_0_30px_rgba(168,85,247,0.1)]' : 'bg-purple-500/10 border-purple-500/30 shadow-[0_0_30px_rgba(168,85,247,0.1)]')
                        : (isLightMode ? 'bg-white border-slate-200 hover:bg-slate-50 hover:border-slate-300 shadow-sm' : 'bg-white/[0.02] border-white/5 hover:bg-white/[0.06] hover:border-white/10')
                    }`}
                  >
                    <div className={`p-3 rounded-xl transition-all duration-300 shadow-sm ${
                      isActive 
                        ? 'bg-purple-600 text-white shadow-purple-500/25 scale-110' 
                        : (isLightMode ? 'bg-slate-100 text-slate-500 group-hover:text-slate-700 border border-slate-200' : 'bg-black/40 text-slate-400 group-hover:text-slate-200 border border-white/5')
                    }`}>
                      {renderIcon(innovation.icon)}
                    </div>
                    <div>
                      <h3 className={`text-base font-bold transition-colors ${isActive ? (isLightMode ? 'text-slate-900' : 'text-white') : (isLightMode ? 'text-slate-700 group-hover:text-slate-900' : 'text-slate-300 group-hover:text-white')}`}>
                        {innovation.title}
                      </h3>
                      <div className="flex items-center gap-2 mt-1">
                        <span className={`w-1.5 h-1.5 rounded-full ${isActive ? (isLightMode ? 'bg-cyan-500 animate-pulse' : 'bg-cyan-400 animate-pulse') : (isLightMode ? 'bg-slate-300' : 'bg-slate-700')}`} />
                        <span className={`text-[10px] font-bold uppercase tracking-widest ${isActive ? (isLightMode ? 'text-cyan-600' : 'text-cyan-400') : 'text-slate-500'}`}>
                          {innovation.status}
                        </span>
                      </div>
                    </div>
                  </button>
                </ScrollReveal>
              );
            })}
          </div>

          {/* Right Column: Holographic Terminal view */}
          <div className="w-full lg:w-2/3 min-h-[450px]">
            {activeInnovation && (
              <ScrollReveal animation="fade-left" delay={0.2} className="h-full">
            <div className={`w-full h-full relative rounded-3xl overflow-hidden border backdrop-blur-3xl shadow-2xl flex flex-col justify-center ${isLightMode ? 'bg-white/90 border-slate-300' : 'bg-[#0a0a0a]/80 border-white/10'}`}>
              
            {/* Minimal Grid overlay for tech aesthetic */}
            <div className={`absolute inset-0 bg-[size:40px_40px] pointer-events-none opacity-50 ${isLightMode ? 'bg-[linear-gradient(rgba(0,0,0,0.05)_1px,transparent_1px),linear-gradient(90deg,rgba(0,0,0,0.05)_1px,transparent_1px)]' : 'bg-[linear-gradient(rgba(255,255,255,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.02)_1px,transparent_1px)]'}`} />
            
            {/* Terminal Top Bar */}
            <div className={`absolute top-0 left-0 w-full h-12 border-b flex items-center px-6 gap-2 ${isLightMode ? 'border-slate-200 bg-slate-100/50' : 'border-white/5 bg-white/[0.02]'}`}>
              <div className="w-3 h-3 rounded-full bg-slate-800" />
              <div className="w-3 h-3 rounded-full bg-slate-800" />
              <div className="w-3 h-3 rounded-full bg-slate-800" />
              <div className="ml-auto flex items-center gap-2">
                <Lock className="w-3.5 h-3.5 text-slate-500" />
                <span className="text-[10px] text-slate-500 font-mono tracking-widest">SECURE_LAB_ENV</span>
              </div>
            </div>

            {/* Content area with instant smooth fade on change */}
            <div className="relative z-10 p-8 lg:p-12 pt-20 h-full flex flex-col justify-center">
              <div key={activeIndex} className="animate-in fade-in zoom-in-[0.98] duration-300 ease-out fill-mode-both">
                
                <h2 className={`text-3xl lg:text-4xl font-extrabold mb-2 tracking-tight ${isLightMode ? 'text-slate-900' : 'text-white'}`}>
                  {activeInnovation.title}
                </h2>
                
                <p className={`font-semibold text-lg mb-6 ${isLightMode ? 'text-cyan-600' : 'text-cyan-400'}`}>
                  {activeInnovation.tagline}
                </p>
                
                <p className={`text-base lg:text-lg leading-relaxed mb-10 max-w-2xl ${isLightMode ? 'text-slate-600' : 'text-slate-300'}`}>
                  {activeInnovation.description}
                </p>
                
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-10 max-w-3xl">
                  {activeInnovation.highlights.map((highlight, idx) => (
                    <div key={idx} className={`flex items-start gap-3 border p-4 rounded-2xl backdrop-blur-md transition-colors ${
                      isLightMode ? 'bg-white/80 border-slate-200 hover:border-purple-300' : 'bg-black/40 border-white/5 hover:border-purple-500/30'
                    }`}>
                      <div className={`mt-0.5 w-5 h-5 rounded-full flex items-center justify-center shrink-0 ${isLightMode ? 'bg-purple-100' : 'bg-purple-500/10'}`}>
                        <CheckCircle2 className={`w-3.5 h-3.5 ${isLightMode ? 'text-purple-600' : 'text-purple-400'}`} />
                      </div>
                      <span className={`text-sm font-medium leading-snug ${isLightMode ? 'text-slate-700' : 'text-slate-200'}`}>{highlight}</span>
                    </div>
                  ))}
                </div>

                <div>
                  {accessSubmitted === activeInnovation.title ? (
                    <div className={`inline-flex items-center gap-2 px-6 py-3.5 rounded-xl text-sm font-bold border ${
                      isLightMode ? 'bg-emerald-50 border-emerald-200 text-emerald-700' : 'bg-emerald-500/10 border-emerald-500/30 text-emerald-400'
                    }`}>
                      <CheckCircle2 className="w-5 h-5 shrink-0" />
                      <span>Priority Request Queued & Email Sent!</span>
                    </div>
                  ) : requestingTitle === activeInnovation.title ? (
                    <form onSubmit={(e) => handleEarlyAccessSubmit(e, activeInnovation.title)} className="flex flex-col sm:flex-row gap-2 max-w-md">
                      <input
                        type="email"
                        required
                        placeholder="Enter your work email..."
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        className={`flex-1 px-4 py-3.5 rounded-xl text-sm border focus:outline-none focus:ring-2 transition-all ${
                          isLightMode
                            ? 'bg-white border-slate-300 text-slate-900 focus:ring-purple-500 focus:border-purple-500 shadow-sm'
                            : 'bg-slate-900/80 border-white/20 text-white placeholder-slate-400 focus:ring-purple-500 focus:border-purple-500'
                        }`}
                      />
                      <button
                        type="submit"
                        disabled={submitting}
                        className="inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-xl text-sm font-bold bg-gradient-to-r from-purple-600 to-indigo-600 text-white hover:from-purple-500 hover:to-indigo-500 shadow-lg shadow-purple-500/25 transition-all cursor-pointer disabled:opacity-50 shrink-0"
                      >
                        {submitting ? (
                          <>
                            <Loader2 className="w-4 h-4 animate-spin" />
                            <span>Sending...</span>
                          </>
                        ) : (
                          <>
                            <Send className="w-4 h-4" />
                            <span>Get Priority Access</span>
                          </>
                        )}
                      </button>
                      <button
                        type="button"
                        onClick={() => setRequestingTitle(null)}
                        className={`px-3 py-3.5 text-xs font-medium rounded-xl border transition-colors ${
                          isLightMode ? 'border-slate-200 hover:bg-slate-100 text-slate-500' : 'border-white/10 hover:bg-white/10 text-slate-400'
                        }`}
                        title="Cancel"
                      >
                        Cancel
                      </button>
                    </form>
                  ) : (
                    <button
                      onClick={() => setRequestingTitle(activeInnovation.title)}
                      className={`group relative inline-flex items-center justify-center gap-2 px-8 py-4 rounded-xl text-sm font-bold border backdrop-blur-xl transition-all cursor-pointer overflow-hidden ${
                        isLightMode 
                          ? 'text-slate-700 bg-white hover:bg-slate-50 border-slate-300 hover:border-purple-300 shadow-sm' 
                          : 'text-white bg-white/5 hover:bg-white/10 border-white/10 hover:border-purple-500/50'
                      }`}
                    >
                      <div className="absolute inset-0 bg-gradient-to-r from-purple-500/20 to-cyan-500/20 opacity-0 group-hover:opacity-100 transition-opacity" />
                      <Activity className={`w-5 h-5 relative z-10 ${isLightMode ? 'text-purple-600' : 'text-purple-400'}`} />
                      <span className="relative z-10">Request Early Beta Access</span>
                    </button>
                  )}
                </div>
              </div>
            </div>

          </div>
          </ScrollReveal>
            )}
          </div>

        </div>
      </div>
    </section>
  );
};
