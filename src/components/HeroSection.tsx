import React, { useState, useEffect } from 'react';
import { Sparkles, Terminal, Bot, Zap, ArrowRight, Layers, User, ShieldCheck, Database, RefreshCw, Send, Lock, Play, Cpu, BarChart2, Triangle, Cloud } from 'lucide-react';
import { ScrollReveal } from './animations/ScrollReveal';

interface HeroSectionProps {
  onExploreProducts: () => void;
  onScheduleDemo: (interest?: string) => void;
  onOpenSandbox: () => void;
  isLightMode?: boolean;
}

const HEADLINES = [
  "Engineering the Future with Artificial Intelligence",
  "Building AI That Solves Real Business Problems",
  "From Ideas to Intelligent Applications"
];

const PRESET_QUERIES = [
  { label: "📊 Analyze Q3 Data", text: "Transform raw sales CSV into Power BI insights and DAX KPIs" },
  { label: "🤖 AI Meeting Minutes", text: "Summarize 45-min sync into action items & Jira tickets" },
  { label: "🔄 Qlik -> Power BI", text: "Translate Qlik set analysis script into Power BI model" },
  { label: "🏗️ BuildSmart Estimator", text: "Calculate BoQ cost estimation for 12,000 sq.ft residential project" }
];

export const HeroSection: React.FC<HeroSectionProps> = ({
  onExploreProducts,
  onScheduleDemo,
  onOpenSandbox,
  isLightMode = false
}) => {
  const [headlineIndex, setHeadlineIndex] = useState(0);
  const [charIndex, setCharIndex] = useState(0);
  const [isDeleting, setIsDeleting] = useState(false);
  const [queryInput, setQueryInput] = useState(PRESET_QUERIES[0].text);
  const [isSimulating, setIsSimulating] = useState(false);
  const [simulationResult, setSimulationResult] = useState<string | null>(null);

  // Generative AI Typewriter Effect
  useEffect(() => {
    const currentHeadline = HEADLINES[headlineIndex];
    let timeout: ReturnType<typeof setTimeout>;

    if (isDeleting) {
      if (charIndex > 0) {
        // Fast backspace
        timeout = setTimeout(() => setCharIndex(prev => prev - 1), 20); 
      } else {
        setIsDeleting(false);
        setHeadlineIndex(prev => (prev + 1) % HEADLINES.length);
      }
    } else {
      if (charIndex < currentHeadline.length) {
        // Variable typing speed for realism (faster bursts)
        const typingSpeed = Math.random() * 40 + 20; 
        timeout = setTimeout(() => setCharIndex(prev => prev + 1), typingSpeed);
      } else {
        // Pause at the end before deleting
        timeout = setTimeout(() => setIsDeleting(true), 3500);
      }
    }

    return () => clearTimeout(timeout);
  }, [charIndex, isDeleting, headlineIndex]);

  const handleSimulate = (textToRun?: string) => {
    const activeText = textToRun || queryInput;
    setIsSimulating(true);
    setSimulationResult(null);

    setTimeout(() => {
      setIsSimulating(false);
      if (activeText.includes("Power BI") || activeText.includes("CSV")) {
        setSimulationResult("⚡ [VTab AI Engine]: Successfully processed 14,280 rows.\n• Generated DAX: Total Sales YTD = CALCULATE(SUM(Sales[Amount]), DATESYTD('Date'[Date]))\n• Auto-built 4 Visual Cards, 1 Anomaly Trend Line.\n• Exported ready dashboard to Power BI service.");
      } else if (activeText.includes("Meeting")) {
        setSimulationResult("⚡ [VTab AI Agent]: Extracted 3 Decisions & 4 Action Items.\n• Decision: Approved Q4 AI migration budget.\n• Action Item: @David assigned to security audit by Thursday.\n• Automated Email sent to 8 meeting participants.");
      } else if (activeText.includes("Qlik")) {
        setSimulationResult("⚡ [VTab Migration Engine]: Parsed Qlik Script (.qvw).\n• Translated Set Analysis sum({<Year={2025}>} Sales) to DAX.\n• Reconstructed 12 data tables & relationships with 100% schema match.");
      } else {
        setSimulationResult("⚡ [VTab Construction Engine]: Analyzed 12 architectural drawings.\n• Estimated Concrete Volume: 420 cu.m ($63,000)\n• Estimated Structural Steel: 18.5 tons ($41,625)\n• Forecasted Completion: 14 Weeks (Risk Index: Very Low).");
      }
    }, 1200);
  };

  const currentFullHeadline = HEADLINES[headlineIndex];
  const displayedText = currentFullHeadline.slice(0, charIndex);
  const words = displayedText.split(" ");
  const fullWords = currentFullHeadline.split(" ");

  return (
    <section className={`relative pt-32 pb-20 md:pt-40 md:pb-28 overflow-hidden transition-colors duration-300 ${
      isLightMode 
        ? 'bg-gradient-to-b from-slate-50 via-blue-50/60 to-slate-100 text-slate-900' 
        : 'text-white'
    }`}>
      {/* Background Glows */}
      <div className="glow-orb-blue top-10 left-1/4 -translate-x-1/2 opacity-70 animate-pulse-glow" />
      <div className="glow-orb-purple top-32 right-10 opacity-60" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          
          {/* Left Column: Messaging */}
          <div className="lg:col-span-7 space-y-6 text-center lg:text-left">
            
            <ScrollReveal animation="fade-up" delay={0.1}>
              {/* Top Badge */}
              <div className={`flex items-center gap-2 px-3.5 py-1.5 rounded-full w-fit mx-auto lg:mx-0 border ${
                isLightMode 
                  ? 'bg-blue-100/90 border-blue-300 text-blue-800' 
                  : 'bg-blue-500/10 border-blue-500/20 text-blue-400'
              }`}>
                <span className="flex h-2 w-2 rounded-full bg-blue-500 animate-pulse" />
                <span className="text-[10px] uppercase tracking-widest font-extrabold">Innovating Beyond Software</span>
              </div>
            </ScrollReveal>

            <ScrollReveal animation="fade-up" delay={0.2}>
              {/* Main Animated Headline */}
              <div className="min-h-[180px] sm:min-h-[140px] md:min-h-[160px] flex items-center justify-center lg:justify-start">
                <h1 className={`text-4xl sm:text-5xl lg:text-6xl font-black tracking-tight leading-[1.1] ${
                  isLightMode ? 'text-slate-900' : 'text-white'
                }`}>
                  {words.map((word, idx) => {
                    const fullWord = fullWords[idx]?.toLowerCase() || "";
                    const isGradient = fullWord.includes("ai") || fullWord.includes("future") || fullWord.includes("artificial") || fullWord.includes("intelligent") || fullWord.includes("business") || fullWord.includes("applications");
                    
                    return (
                      <React.Fragment key={idx}>
                        <span
                          className={isGradient ? "text-transparent bg-clip-text bg-gradient-to-r from-blue-600 via-cyan-600 to-teal-500 inline-block" : "inline-block"}
                        >
                          {word}
                        </span>
                        {idx < words.length - 1 && <span className="inline-block w-[0.25em]" />}
                      </React.Fragment>
                    );
                  })}
                  {/* Custom Terminal Blinking Cursor */}
                  <span className="inline-block w-[4px] h-[0.9em] bg-blue-500 ml-1.5 align-middle opacity-100 transition-opacity duration-75" 
                        style={{ animation: 'terminal-blink 1s step-end infinite' }} />
                </h1>
              </div>
            </ScrollReveal>

            <ScrollReveal animation="fade-up" delay={0.3}>
              {/* Sub Heading */}
              <p className="text-lg text-slate-400 max-w-lg leading-relaxed font-normal mx-auto lg:mx-0">
                We build next-generation AI applications that automate work, accelerate decision-making, and transform businesses through intelligent software.
              </p>
            </ScrollReveal>

            <ScrollReveal animation="fade-up" delay={0.4}>
              {/* Action Buttons */}
              <div className="pt-2 flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4">
              <button
                onClick={onExploreProducts}
                className="w-full sm:w-auto px-8 py-4 bg-gradient-to-r from-blue-700 via-blue-600 to-cyan-600 hover:from-blue-600 hover:via-blue-500 hover:to-cyan-500 text-white font-bold rounded-xl shadow-xl shadow-blue-600/25 border border-white/20 hover:scale-[1.02] active:scale-[0.98] transition-all flex items-center justify-center gap-2.5 group cursor-pointer shadow-[inset_0_1px_1px_rgba(255,255,255,0.3)]"
                id="hero-explore-products-btn"
              >
                <span className="tracking-wide">Explore AI Accelerators</span>
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </button>

              <button
                onClick={() => onScheduleDemo()}
                className={`w-full sm:w-auto px-8 py-4 border font-bold rounded-xl backdrop-blur-xl transition-all flex items-center justify-center gap-2.5 cursor-pointer shadow-md hover:scale-[1.02] active:scale-[0.98] ${
                  isLightMode
                    ? 'bg-white/90 hover:bg-white border-slate-200/90 text-slate-800 hover:border-slate-300 hover:shadow-lg'
                    : 'bg-slate-900/80 hover:bg-slate-800/90 border-white/15 text-slate-100 hover:border-white/30 hover:shadow-xl'
                }`}
                id="hero-schedule-demo-btn"
              >
                <Zap className="w-4 h-4 text-amber-500 fill-amber-500/20" />
                <span className="tracking-wide">Schedule a Demo</span>
              </button>
              </div>
            </ScrollReveal>

            <ScrollReveal animation="fade-up" delay={0.5}>
              {/* Key Trust Signals / Stats */}
              <div className="pt-6 border-t border-slate-200 dark:border-white/10 grid grid-cols-1 sm:grid-cols-3 gap-6 text-left max-w-lg mx-auto lg:mx-0">
              <div className="flex items-center gap-3">
                <div className="p-2.5 bg-blue-50 text-blue-600 rounded-xl border border-blue-100">
                  <Layers className="w-5 h-5" />
                </div>
                <div>
                  <div className={`text-xl font-bold ${isLightMode ? 'text-slate-900' : 'text-white'}`}>100+</div>
                  <div className={`text-[10px] uppercase tracking-wider font-semibold ${isLightMode ? 'text-slate-500' : 'text-slate-400'}`}>Processes Automated</div>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <div className="p-2.5 bg-purple-50 text-purple-600 rounded-xl border border-purple-100">
                  <User className="w-5 h-5" />
                </div>
                <div>
                  <div className={`text-xl font-bold ${isLightMode ? 'text-slate-900' : 'text-white'}`}>95%</div>
                  <div className={`text-[10px] uppercase tracking-wider font-semibold ${isLightMode ? 'text-slate-500' : 'text-slate-400'}`}>Manual Effort Saved</div>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <div className="p-2.5 bg-emerald-50 text-emerald-600 rounded-xl border border-emerald-100">
                  <ShieldCheck className="w-5 h-5" />
                </div>
                <div>
                  <div className={`text-xl font-bold ${isLightMode ? 'text-slate-900' : 'text-white'}`}>24/7</div>
                  <div className={`text-[10px] uppercase tracking-wider font-semibold ${isLightMode ? 'text-slate-500' : 'text-slate-400'}`}>AI Availability & Support</div>
                </div>
              </div>
              </div>
            </ScrollReveal>

          </div>

          {/* Right Column: Interactive AI Agent Sandbox Preview */}
          <div className="lg:col-span-5 lg:ml-8">
            <ScrollReveal animation="fade-left" delay={0.4}>
              <div className="relative group">
              {/* Outer Glow */}
              <div className="absolute -inset-6 bg-blue-500/10 blur-[80px] rounded-full pointer-events-none" />

              <div className={`backdrop-blur-xl border p-6 rounded-2xl shadow-2xl relative space-y-4 ${
                isLightMode ? 'bg-white border-slate-200 shadow-slate-200/50' : 'bg-white/[0.03] border-white/10'
              }`}>
                
                {/* Window Bar */}
                <div className={`flex items-center justify-between pb-3 border-b ${isLightMode ? 'border-slate-100' : 'border-white/10'}`}>
                  <div className="flex items-center gap-2">
                    <div className="w-3 h-3 rounded-full bg-red-500/80" />
                    <div className="w-3 h-3 rounded-full bg-yellow-500/80" />
                    <div className="w-3 h-3 rounded-full bg-green-500/80" />
                    <span className="text-xs font-mono text-slate-400 ml-2 flex items-center gap-1.5">
                      <Terminal className="w-3.5 h-3.5 text-blue-500" />
                      vtab-ai-engine v2.4 (Active)
                    </span>
                  </div>

                  <span className={`text-[10px] font-bold uppercase tracking-widest px-2.5 py-1 rounded-full flex items-center gap-1.5 ${
                    isLightMode ? 'text-blue-700 bg-blue-50 border border-blue-100' : 'text-blue-400 bg-blue-500/10 border border-blue-500/20'
                  }`}>
                    <span className="w-1.5 h-1.5 rounded-full bg-blue-500 animate-pulse" />
                    Live Sandbox
                  </span>
                </div>

                {/* Preset Chips */}
                <div className="space-y-1.5">
                  <label className="text-[11px] font-medium text-slate-400 flex items-center gap-1">
                    <Sparkles className="w-3 h-3 text-blue-500" />
                    Select a sample AI workload to test:
                  </label>
                  <div className="grid grid-cols-1 xs:grid-cols-2 sm:grid-cols-2 gap-1.5">
                    {PRESET_QUERIES.map((preset, idx) => (
                      <button
                        key={idx}
                        onClick={() => {
                          setQueryInput(preset.text);
                          handleSimulate(preset.text);
                        }}
                        className={`text-left px-2.5 py-1.5 rounded-lg text-[11px] font-medium border transition-all cursor-pointer truncate ${
                          isLightMode
                            ? 'bg-slate-50 hover:bg-slate-100 border-slate-200 text-slate-700'
                            : 'bg-slate-900/80 hover:bg-slate-800 border-slate-800 hover:border-blue-500/40 text-slate-300 hover:text-white'
                        }`}
                      >
                        {preset.label}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Interactive Prompt Box */}
                <div className="space-y-2">
                  <div className="relative">
                    <textarea
                      value={queryInput}
                      onChange={(e) => setQueryInput(e.target.value)}
                      rows={2}
                      className={`w-full border rounded-xl p-3 text-xs focus:outline-none focus:ring-1 focus:ring-blue-500 transition-all resize-none font-mono ${
                        isLightMode
                          ? 'bg-slate-50 border-slate-200 text-slate-700'
                          : 'bg-slate-950/90 border-slate-800 text-slate-200'
                      }`}
                      placeholder="Ask VTab AI Engine..."
                    />
                  </div>

                  <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-2">
                    <button
                      onClick={onOpenSandbox}
                      className="text-[11px] text-blue-400 hover:text-blue-300 flex items-center gap-1 cursor-pointer font-medium"
                    >
                      <Layers className="w-3 h-3" />
                      Open Full Interactive Studio
                    </button>

                    <button
                      onClick={() => handleSimulate()}
                      disabled={isSimulating}
                      className="px-4 py-2 text-xs font-bold text-white bg-gradient-to-r from-blue-700 via-blue-600 to-cyan-600 hover:from-blue-600 hover:to-cyan-500 rounded-xl flex items-center gap-1.5 transition-all shadow-lg shadow-blue-600/20 border border-white/20 cursor-pointer disabled:opacity-50 hover:scale-105 active:scale-95 shadow-[inset_0_1px_1px_rgba(255,255,255,0.3)]"
                      id="run-ai-simulation-btn"
                    >
                      {isSimulating ? (
                        <>
                          <RefreshCw className="w-3.5 h-3.5 animate-spin" />
                          <span>Executing...</span>
                        </>
                      ) : (
                        <>
                          <Play className="w-3.5 h-3.5 fill-current" />
                          <span>Run Workload</span>
                        </>
                      )}
                    </button>
                  </div>
                </div>

                {/* Simulation Terminal Output */}
                <div className={`rounded-xl border p-3.5 min-h-[110px] font-mono text-[11px] leading-relaxed relative overflow-hidden ${
                  isLightMode ? 'bg-slate-50 border-slate-200 text-slate-700' : 'bg-slate-950/95 border-slate-800/80 text-slate-300'
                }`}>
                  {isSimulating ? (
                    <div className={`flex items-center justify-center h-20 gap-2 ${isLightMode ? 'text-slate-500' : 'text-slate-400'}`}>
                      <Cpu className="w-4 h-4 text-blue-500 animate-spin" />
                      <span>Synthesizing multi-modal AI context...</span>
                    </div>
                  ) : simulationResult ? (
                    <pre className={`whitespace-pre-wrap font-sans text-xs ${isLightMode ? 'text-slate-800' : 'text-cyan-300'}`}>
                      {simulationResult}
                    </pre>
                  ) : (
                    <div className={`italic flex items-center gap-2 pt-2 ${isLightMode ? 'text-slate-500' : 'text-slate-500'}`}>
                      <Sparkles className="w-4 h-4 text-blue-500" />
                      <span>Click 'Run Workload' or choose a sample above to witness VTab Square AI in real-time.</span>
                    </div>
                  )}
                </div>

              </div>
            </div>
            </ScrollReveal>
          </div>

        </div>
      </div>
      
      {/* Trusted By Section */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-24 pb-10">
        <p className={`text-center text-xs font-semibold mb-8 ${isLightMode ? 'text-slate-500' : 'text-slate-400'}`}>Trusted by forward-thinking teams worldwide</p>
        <div className={`flex flex-wrap justify-center items-center gap-10 md:gap-16 opacity-60 grayscale hover:grayscale-0 transition-all duration-300 ${
          isLightMode ? 'text-slate-800' : 'text-slate-200'
        }`}>
          <div className="flex items-center gap-2 font-bold text-xl"><span className="text-2xl">Q</span> Qlik</div>
          <div className="flex items-center gap-2 font-bold text-xl"><BarChart2 className="w-6 h-6 text-yellow-500" /> Power BI</div>
          <div className="font-bold text-2xl tracking-tighter">aws</div>
          <div className="flex items-center gap-2 font-bold text-xl"><Triangle className="w-6 h-6 text-blue-500" /> Azure</div>
          <div className="flex items-center gap-2 font-bold text-xl"><Cloud className="w-6 h-6 text-red-500" /> Google Cloud</div>
        </div>
      </div>
    </section>
  );
};
