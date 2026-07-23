import React, { useState, useEffect } from 'react';
import { AiEmployee } from '../types';
import { supabase } from '../lib/supabaseClient';
import { Bot, Video, PieChart, Cpu, FileSpreadsheet, Workflow, Sparkles, CheckCircle2, Terminal, ChevronRight, ChevronLeft, Play } from 'lucide-react';

interface AiEmployeesBannerProps {
  onScheduleDemo: (roleTitle?: string) => void;
  onOpenSandbox: () => void;
  isLightMode?: boolean;
}

export const AiEmployeesBanner: React.FC<AiEmployeesBannerProps> = ({
  onScheduleDemo,
  onOpenSandbox,
  isLightMode = false
}) => {
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [employees, setEmployees] = useState<AiEmployee[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchEmployees = async () => {
      const { data, error } = await supabase.from('ai_employees').select('*');
      if (error) {
        console.error('Error fetching AI employees:', error);
      } else if (data) {
        const mappedData: AiEmployee[] = data.map(item => ({
          id: item.id,
          title: item.title,
          role: item.role,
          description: item.description,
          icon: item.icon,
          badge: item.badge,
          capabilities: item.capabilities || [],
          samplePrompt: item.sample_prompt,
          sampleOutput: item.sample_output
        }));
        setEmployees(mappedData);
      }
      setLoading(false);
    };
    fetchEmployees();
  }, []);

  const getIcon = (iconName: string, className = "w-6 h-6") => {
    switch (iconName) {
      case 'Video': return <Video className={className} />;
      case 'PieChart': return <PieChart className={className} />;
      case 'Cpu': return <Cpu className={className} />;
      case 'FileSpreadsheet': return <FileSpreadsheet className={className} />;
      case 'Workflow': return <Workflow className={className} />;
      default: return <Bot className={className} />;
    }
  };

  const getCardStyle = (index: number) => {
    const diff = index - selectedIndex;
    const absDiff = Math.abs(diff);

    // Scaling and positioning
    const scale = 1 - absDiff * 0.15;
    const translateX = diff * 50; // percentage shift
    const zIndex = 50 - absDiff * 10;
    
    // Smooth opacity fade out
    let opacity = 1;
    if (absDiff === 1) opacity = 0.6;
    if (absDiff >= 2) opacity = 0; // Hide completely if too far

    // 3D Rotation
    const rotateY = diff * -15; // Rotate inwards

    return {
      transform: `translateX(${translateX}%) scale(${scale}) perspective(1000px) rotateY(${rotateY}deg)`,
      zIndex,
      opacity,
      pointerEvents: opacity === 0 ? 'none' as const : 'auto' as const,
      visibility: opacity === 0 ? 'hidden' as const : 'visible' as const,
    };
  };

  return (
    <section className={`py-32 relative overflow-hidden transition-colors duration-300 ${isLightMode ? 'bg-slate-50 border-y border-slate-200' : 'bg-[#030712] border-y border-white/5'}`}>
      {/* Immersive Dark Background Gradients */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-blue-600/10 rounded-full blur-[150px] pointer-events-none" />
      <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-purple-600/10 rounded-full blur-[150px] pointer-events-none" />

      <div className="max-w-[1600px] mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Header */}
        <div className="text-center max-w-4xl mx-auto mb-20 space-y-6">
          <div className={`inline-flex items-center gap-2 px-4 py-1.5 rounded-full border text-[10px] font-bold uppercase tracking-[0.2em] shadow-lg ${
            isLightMode 
              ? 'border-blue-300 bg-blue-100/90 text-blue-800 shadow-blue-500/10' 
              : 'border-blue-500/30 bg-blue-500/10 text-blue-400 shadow-blue-500/20'
          }`}>
            <Sparkles className="w-3.5 h-3.5" />
            <span>AI Innovation Paradigm</span>
          </div>

          <h2 className={`text-4xl sm:text-6xl font-heading font-extrabold tracking-tight leading-tight ${isLightMode ? 'text-slate-900' : 'text-white'}`}>
            Innovating Beyond Software
          </h2>

          <div className={`flex flex-wrap items-center justify-center gap-4 text-sm sm:text-base font-semibold pt-2 ${isLightMode ? 'text-slate-500' : 'text-slate-400'}`}>
            <span className={`line-through ${isLightMode ? 'decoration-slate-400' : 'decoration-slate-600'}`}>Not just Applications.</span>
            <span className={`line-through ${isLightMode ? 'decoration-slate-400' : 'decoration-slate-600'}`}>Not just Automation.</span>
            <span className={`text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-indigo-600 text-lg sm:text-2xl font-bold px-6 py-2 rounded-2xl border shadow-lg ${
              isLightMode 
                ? 'bg-blue-50 border-blue-200 shadow-blue-500/10' 
                : 'bg-slate-900/50 border-blue-500/30 shadow-[0_0_30px_rgba(59,130,246,0.3)] text-gradient-to-r from-blue-400 to-indigo-400'
            }`}>
              We build AI Employees.
            </span>
          </div>

          <p className={`max-w-2xl mx-auto pt-2 leading-relaxed ${isLightMode ? 'text-slate-600' : 'text-slate-400'}`}>
            Autonomous digital workforce agents that integrate into your Slack, Teams, ERP, and databases to perform real enterprise work around the clock.
          </p>
        </div>

        {/* 3D Floating Carousel Stage */}
        <div className="relative h-[650px] lg:h-[550px] w-full flex items-center justify-center mt-12 mb-8" style={{ perspective: '2000px' }}>
          
          {loading ? (
            <div className={`p-8 text-center text-sm animate-pulse ${isLightMode ? 'text-slate-500' : 'text-slate-400'}`}>Loading AI Workforce...</div>
          ) : employees.map((employee, index) => {
            const isActive = index === selectedIndex;
            const style = getCardStyle(index);

            return (
              <div
                key={employee.id}
                onClick={() => setSelectedIndex(index)}
                className={`absolute w-full max-w-[850px] transition-all duration-700 ease-out cursor-pointer rounded-3xl overflow-hidden border backdrop-blur-2xl ${
                  isActive 
                    ? isLightMode ? 'border-blue-400 bg-white shadow-[0_20px_70px_-10px_rgba(59,130,246,0.15)] hover:border-blue-500' : 'border-blue-500/40 bg-slate-900/80 shadow-[0_20px_70px_-10px_rgba(59,130,246,0.2)] hover:border-blue-400/60' 
                    : isLightMode ? 'border-slate-200 bg-white/60 shadow-xl shadow-slate-200 hover:bg-white/90' : 'border-white/10 bg-slate-900/40 shadow-2xl shadow-black/80 hover:bg-slate-900/60'
                }`}
                style={style}
              >
                {/* Active Card Glowing Edge */}
                {isActive && (
                  <>
                    <div className="absolute top-0 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-blue-400 to-transparent opacity-80" />
                    <div className="absolute -top-32 left-1/2 -translate-x-1/2 w-64 h-64 bg-blue-500/30 blur-[80px] rounded-full pointer-events-none" />
                  </>
                )}

                <div className="flex flex-col lg:flex-row h-full">
                  {/* Left: Info Panel */}
                  <div className={`p-8 lg:p-10 flex-1 border-b lg:border-b-0 lg:border-r ${isLightMode ? 'border-slate-200' : 'border-white/10'}`}>
                    <div className="flex items-start justify-between mb-8">
                      <div className="flex items-center gap-4">
                        <div className={`w-14 h-14 rounded-2xl flex items-center justify-center border shadow-inner ${
                          isActive 
                            ? isLightMode ? 'bg-blue-100 border-blue-200 text-blue-600' : 'bg-blue-500/10 border-blue-500/30 text-blue-400' 
                            : isLightMode ? 'bg-slate-100 border-slate-200 text-slate-500' : 'bg-slate-800 border-white/5 text-slate-400'
                        }`}>
                          {getIcon(employee.icon, "w-7 h-7")}
                        </div>
                        <div>
                          <span className={`text-[10px] uppercase font-bold tracking-[0.2em] mb-1 block ${
                            isActive ? (isLightMode ? 'text-blue-600' : 'text-blue-400') : (isLightMode ? 'text-slate-500' : 'text-slate-500')
                          }`}>
                            {employee.badge}
                          </span>
                          <h3 className={`text-2xl font-bold tracking-tight ${isLightMode ? 'text-slate-900' : 'text-white'}`}>{employee.title}</h3>
                        </div>
                      </div>
                    </div>

                    <p className={`text-sm leading-relaxed font-medium mb-8 ${
                      isActive ? (isLightMode ? 'text-slate-700' : 'text-blue-100/90') : (isLightMode ? 'text-slate-500' : 'text-slate-400')
                    }`}>
                      {employee.description}
                    </p>

                    <div className="space-y-4">
                      <h4 className="text-[10px] text-slate-500 uppercase tracking-widest font-bold">Key Capabilities</h4>
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                        {employee.capabilities.map((cap, i) => (
                          <div key={i} className={`flex items-start gap-2.5 p-3 rounded-xl border ${
                            isActive 
                              ? isLightMode ? 'bg-slate-50 border-slate-200' : 'bg-slate-950/50 border-white/5' 
                              : 'bg-transparent border-transparent'
                          }`}>
                            <CheckCircle2 className={`w-4 h-4 shrink-0 mt-0.5 ${isActive ? (isLightMode ? 'text-blue-600' : 'text-blue-400') : 'text-slate-400'}`} />
                            <span className={`text-xs leading-snug ${isLightMode ? 'text-slate-600' : 'text-slate-300'}`}>{cap}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>

                  {/* Right: Action/Terminal Panel */}
                  <div className={`lg:w-[320px] p-8 flex flex-col justify-between ${
                    isActive ? (isLightMode ? 'bg-slate-50' : 'bg-slate-950/80') : (isLightMode ? 'bg-slate-100/50' : 'bg-slate-950/40')
                  }`}>
                    <div>
                      <button
                        onClick={(e) => { e.stopPropagation(); onScheduleDemo(employee.title); }}
                        className={`w-full py-3 px-4 rounded-xl text-sm font-bold flex items-center justify-center gap-2 transition-all ${
                          isActive 
                            ? 'bg-blue-600 hover:bg-blue-500 text-white shadow-[0_0_20px_rgba(37,99,235,0.4)] hover:shadow-[0_0_25px_rgba(37,99,235,0.6)]' 
                            : isLightMode ? 'bg-white text-slate-600 border border-slate-300 hover:bg-slate-50' : 'bg-slate-800 text-slate-400 hover:bg-slate-700'
                        }`}
                      >
                        <Play className="w-4 h-4" />
                        Deploy Employee
                      </button>
                    </div>

                    <div className="mt-8">
                      <div className="flex items-center gap-2 mb-3 px-1">
                        <Terminal className={`w-4 h-4 ${isActive ? 'text-slate-400' : 'text-slate-500'}`} />
                        <span className="text-[10px] font-bold text-slate-500 uppercase tracking-widest">Agent Sandbox</span>
                      </div>
                      <div className={`rounded-xl p-4 border shadow-inner ${isLightMode ? 'bg-white border-slate-200' : 'bg-black/60 border-white/5'}`}>
                        <p className="text-[10px] text-slate-400 font-mono mb-2">Sample Prompt:</p>
                        <p className={`text-xs font-mono leading-relaxed mb-4 line-clamp-2 ${isLightMode ? 'text-slate-700' : 'text-slate-300'}`}>
                          "{employee.samplePrompt}"
                        </p>
                        
                        <div className={`border-t pt-3 mb-4 ${isLightMode ? 'border-slate-100' : 'border-white/5'}`}>
                          <p className="text-[10px] text-slate-400 font-mono mb-2">Autonomous Agent Output:</p>
                          <div className={`text-[10px] sm:text-xs font-mono leading-relaxed p-2 rounded border max-h-24 overflow-y-auto whitespace-pre-wrap ${
                            isLightMode ? 'text-emerald-700 bg-emerald-50 border-emerald-100' : 'text-emerald-400 bg-emerald-500/5 border-emerald-500/10'
                          }`}>
                            {employee.sampleOutput}
                          </div>
                        </div>

                        <button 
                          onClick={(e) => { e.stopPropagation(); onOpenSandbox(); }}
                          className={`text-xs font-semibold flex items-center gap-1 transition-colors ${
                            isActive 
                              ? isLightMode ? 'text-blue-600 hover:text-blue-700' : 'text-blue-400 hover:text-blue-300' 
                              : isLightMode ? 'text-slate-500 hover:text-slate-600' : 'text-slate-500 hover:text-slate-400'
                          }`}
                        >
                          Run Full Simulation <ChevronRight className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Carousel Navigation Controls */}
        <div className="absolute -bottom-8 left-1/2 -translate-x-1/2 flex items-center gap-6 z-30">
          <button 
            onClick={() => setSelectedIndex(prev => Math.max(0, prev - 1))}
            disabled={selectedIndex === 0 || loading}
            className={`p-3 rounded-full border shadow-lg backdrop-blur-md transition-all ${
              selectedIndex === 0 || loading
                ? (isLightMode ? 'bg-slate-100 border-slate-200 text-slate-400' : 'bg-slate-900 border-slate-800 text-slate-600') 
                : (isLightMode ? 'bg-white border-blue-200 hover:border-blue-400 text-blue-600 hover:bg-blue-50 cursor-pointer' : 'bg-blue-900/40 border-blue-500/30 hover:bg-blue-800/60 text-blue-400 hover:text-white cursor-pointer')
            }`}
          >
            <ChevronLeft className="w-5 h-5" />
          </button>

          {/* Dot Indicators */}
          <div className="flex items-center gap-2">
            {employees.map((_, idx) => (
              <button
                key={idx}
                onClick={() => setSelectedIndex(idx)}
                className={`transition-all duration-300 rounded-full cursor-pointer ${
                  idx === selectedIndex 
                    ? (isLightMode ? 'w-8 h-2 bg-blue-500' : 'w-8 h-2 bg-blue-500 shadow-[0_0_10px_rgba(59,130,246,0.6)]') 
                    : (isLightMode ? 'w-2 h-2 bg-slate-300 hover:bg-blue-300' : 'w-2 h-2 bg-slate-700 hover:bg-slate-500')
                }`}
              />
            ))}
          </div>

          <button 
            onClick={() => setSelectedIndex(prev => Math.min(employees.length - 1, prev + 1))}
            disabled={selectedIndex === employees.length - 1 || loading}
            className={`p-3 rounded-full border shadow-lg backdrop-blur-md transition-all ${
              selectedIndex === employees.length - 1 || loading
                ? (isLightMode ? 'bg-slate-100 border-slate-200 text-slate-400' : 'bg-slate-900 border-slate-800 text-slate-600') 
                : (isLightMode ? 'bg-white border-blue-200 hover:border-blue-400 text-blue-600 hover:bg-blue-50 cursor-pointer' : 'bg-blue-900/40 border-blue-500/30 hover:bg-blue-800/60 text-blue-400 hover:text-white cursor-pointer')
            }`}
          >
            <ChevronRight className="w-5 h-5" />
          </button>
        </div>

      </div>
    </section>
  );
};
