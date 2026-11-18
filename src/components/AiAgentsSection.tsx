import React, { useState, useEffect } from 'react';
import { Product } from '../types';
import { ScrollReveal } from './animations/ScrollReveal';
import { getValidImageUrl } from '../utils/imageFallback';
import { useIsMobile } from '../hooks/useIsMobile';
import { 
  Bot, 
  Sparkles, 
  ArrowRight, 
  CheckCircle2, 
  Activity, 
  ChevronLeft, 
  ChevronRight, 
  Play, 
  Pause,
  Headphones,
  Maximize2,
  Minimize2
} from 'lucide-react';

interface AiAgentsSectionProps {
  onSelectProduct?: (product: Product) => void;
  onScheduleDemo: (agentTitle?: string) => void;
  isLightMode?: boolean;
}

const AI_AGENTS: Product[] = [
  {
    id: 'ai-l1-support-agent',
    title: 'L1 Automation Agent',
    shortDescription: 'An autonomous digital IT technician that integrates with Slack, Teams, ServiceNow, and Jira to auto-resolve employee IT issues.',
    fullDescription: 'An autonomous digital IT technician that integrates with Slack, Teams, ServiceNow, and Jira. It troubleshoots VPN issues, resets credentials, provisions software access, and guides employees through IT workflows with zero human agent intervention.',
    category: 'Enterprise Automation',
    subcategory: 'Autonomous ITSM',
    tags: ['Knowledge Retrieval', 'Automation', 'Conversational AI', 'ITSM'],
    impactMetric: '75% L1 Tickets Auto-Resolved And more',
    keyFeatures: [
      'RAG Knowledge Base & Policy Search',
      'Automated Active Directory & Okta Actions',
      'Multi-channel Support (Slack, Teams, Web, Email)',
      'Root-cause Analysis & Senior Context Escalation'
    ],
    techStack: ['LangChain / LlamaIndex', 'Pinecone VectorDB', 'Node.js', 'React'],
    iconName: 'Headphones',
    featured: true,
    imageUrl: '/src/assets/images/ai_support_agent_1784778598154.jpg',
    demoSnippet: {
      type: 'chat',
      previewHeadline: 'Autonomous Ticket #4920 Resolution',
      metrics: [
        { label: 'Response Time', value: '0.8 Sec', color: 'text-emerald-400' },
        { label: 'Auto-Resolved', value: '75%', color: 'text-cyan-400' },
        { label: 'Integrations', value: 'ServiceNow/Okta', color: 'text-blue-400' }
      ]
    }
  },
  {
    id: 'ai-marketing-manager-agent',
    title: 'AI Marketing Agent Application',
    shortDescription: 'Autonomous marketing manager for high-intent lead intelligence, personalized campaign generation, and multi-channel asset synthesis.',
    fullDescription: 'An autonomous marketing intelligence engine that crawls high-intent enterprise accounts, crafts personalized marketing narratives, synchronizes automated CRM nurture sequences, and optimizes conversion rates with continuous telemetry.',
    category: 'Marketing Intelligence',
    subcategory: 'Autonomous Growth',
    tags: ['Agentic AI', 'Lead Generation', 'Content Synthesis', 'Growth Automation'],
    impactMetric: '4.8x Lead Velocity & Pipeline Output',
    keyFeatures: [
      'Automated ICP Lead Discovery & Profile Enrichment',
      'AI-driven Multi-channel Ad & Copy Synthesis',
      'Brand Voice & Style Enforcement Guardrails',
      'Automated Campaign Execution & Conversion Telemetry'
    ],
    techStack: ['Agentic Frameworks', 'Claude / GPT-4o', 'Playwright', 'FastAPI', 'React'],
    iconName: 'Sparkles',
    featured: true,
    imageUrl: '/media/ai-marketing-control-room.png',
    demoSnippet: {
      type: 'chart',
      previewHeadline: 'Autonomous Campaign Orchestration',
      metrics: [
        { label: 'Pipeline Velocity', value: '4.8x', color: 'text-fuchsia-400' },
        { label: 'ICP Accuracy', value: '94%', color: 'text-pink-400' },
        { label: 'Time-to-Market', value: '-80%', color: 'text-purple-400' }
      ]
    }
  }
];

export const AiAgentsSection: React.FC<AiAgentsSectionProps> = ({
  onSelectProduct,
  onScheduleDemo,
  isLightMode = false,
}) => {
  const isMobile = useIsMobile(1024);
  const isDesktop = !isMobile;

  const [currentIndex, setCurrentIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(true);
  const [isCinematic, setIsCinematic] = useState(false);
  const [animationKey, setAnimationKey] = useState(0);

  const currentAgent = AI_AGENTS[currentIndex];

  useEffect(() => {
    if (!isPlaying) return;
    const interval = setInterval(() => {
      setCurrentIndex(prev => (prev + 1) % AI_AGENTS.length);
      setAnimationKey(k => k + 1);
    }, 7000);
    return () => clearInterval(interval);
  }, [isPlaying]);

  const handlePrev = () => {
    setCurrentIndex(prev => (prev - 1 + AI_AGENTS.length) % AI_AGENTS.length);
    setAnimationKey(k => k + 1);
  };

  const handleNext = () => {
    setCurrentIndex(prev => (prev + 1) % AI_AGENTS.length);
    setAnimationKey(k => k + 1);
  };

  const renderIcon = (iconName: string) => {
    if (iconName === 'Headphones') {
      return <Headphones className="w-6 h-6 text-cyan-400" />;
    }
    return <Bot className="w-6 h-6 text-fuchsia-400" />;
  };

  return (
    <section
      id="ai-agents-section"
      className={`py-24 relative overflow-hidden transition-colors duration-300 ${
        isLightMode
          ? 'bg-gradient-to-b from-slate-50 via-blue-50/40 to-indigo-50/30 text-slate-900'
          : 'bg-[#020617] text-white'
      }`}
      style={{ overflowAnchor: 'none' }}
    >
      {/* Glow Orbs */}
      <div className="glow-orb-purple top-20 right-10 opacity-30 pointer-events-none" />
      <div className="glow-orb-blue bottom-10 left-10 opacity-30 pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Title Header (Matching Our AI Portfolio Header exactly) */}
        <ScrollReveal animation="fade-up">
          <div className="text-center max-w-3xl mx-auto mb-12 space-y-3">
            <div className={`inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-semibold uppercase tracking-wider ${
              isLightMode
                ? 'bg-blue-100/80 border border-blue-300 text-blue-800'
                : 'bg-blue-950/80 border border-blue-500/30 text-blue-300'
            }`}>
              <Sparkles className="w-3.5 h-3.5 text-blue-500" />
              <span>Autonomous Digital Workforce</span>
            </div>

            <h2 className={`text-3xl sm:text-5xl font-extrabold tracking-tight ${
              isLightMode ? 'text-slate-900' : 'text-white'
            }`}>
              Our AI <span className="text-gradient-primary">Agents</span>
            </h2>

            <p className={`text-sm sm:text-base leading-relaxed ${
              isLightMode ? 'text-slate-600' : 'text-slate-400'
            }`}>
              Enterprise-grade autonomous agents engineered to execute IT automation, orchestrate marketing campaigns, and operate 24/7.
            </p>
          </div>
        </ScrollReveal>

        {/* Featured Showcase Slide (Identical Hero Showcase Layout as AI Portfolio) */}
        <ScrollReveal animation="fade-up" delay={0.2}>
          <div className={`relative w-full overflow-hidden flex flex-col border rounded-3xl transition-colors duration-300 ${
            isLightMode 
              ? 'bg-gradient-to-br from-slate-50 via-blue-50/30 to-indigo-50/20 border-slate-200/80 shadow-2xl' 
              : 'bg-[#030712] border-white/10 shadow-2xl'
          }`}>
            
            {/* ─── MOBILE LAYOUT (< lg) ─── */}
            {!isDesktop && (
              <div className="flex flex-col">
                <div className="relative w-full aspect-video overflow-hidden bg-slate-950">
                  <img
                    src={getValidImageUrl(currentAgent.imageUrl, currentAgent.category, currentAgent.title, currentAgent.id)}
                    alt={currentAgent.title}
                    className="w-full h-full object-cover"
                  />
                  <div className={`absolute inset-x-0 bottom-0 h-16 ${isLightMode ? 'bg-gradient-to-t from-slate-50' : 'bg-gradient-to-t from-[#030712]'}`} />
                </div>

                <div key={animationKey} className="px-5 py-6 space-y-4">
                  <div className="flex items-center gap-3">
                    <div className={`p-3 rounded-xl border shadow-lg backdrop-blur-xl shrink-0 ${isLightMode ? 'bg-gradient-to-br from-blue-700 to-blue-600 border-blue-500/20 text-white' : 'bg-black/60 border-white/15 text-blue-400'}`}>
                      {renderIcon(currentAgent.iconName)}
                    </div>
                    <div>
                      <span className={`text-[10px] uppercase font-bold tracking-[0.2em] block mb-0.5 ${isLightMode ? 'text-blue-600' : 'text-cyan-400'}`}>
                        {currentAgent.category} • {currentAgent.subcategory}
                      </span>
                      <h3 className={`text-2xl font-bold tracking-tight ${isLightMode ? 'text-slate-900' : 'text-white'}`}>
                        {currentAgent.title}
                      </h3>
                    </div>
                  </div>

                  <p className={`text-sm leading-relaxed ${isLightMode ? 'text-slate-700' : 'text-slate-300'}`}>
                    {currentAgent.fullDescription}
                  </p>

                  <div className="space-y-2">
                    {currentAgent.keyFeatures.map((feat, idx) => (
                      <div key={idx} className="flex items-center gap-2 text-xs">
                        <CheckCircle2 className={`w-4 h-4 shrink-0 ${isLightMode ? 'text-blue-600' : 'text-emerald-400'}`} />
                        <span>{feat}</span>
                      </div>
                    ))}
                  </div>

                  <div className="flex flex-col gap-2 pt-2">
                    <button
                      onClick={() => onSelectProduct && onSelectProduct(currentAgent)}
                      className="w-full px-5 py-3 rounded-xl text-sm font-bold text-white bg-gradient-to-r from-blue-700 via-blue-600 to-cyan-600 shadow-xl shadow-blue-600/25 border border-white/20 active:scale-[0.98] transition-all flex items-center justify-center gap-2 cursor-pointer"
                    >
                      <span className="tracking-wide">Explore Architecture & Specs</span>
                      <ArrowRight className="w-4 h-4" />
                    </button>
                    <button
                      onClick={() => onScheduleDemo(currentAgent.title)}
                      className={`w-full px-5 py-3 rounded-xl text-sm font-bold border backdrop-blur-xl transition-all flex items-center justify-center gap-2 cursor-pointer ${
                        isLightMode
                          ? 'text-slate-800 bg-white/90 border-slate-200/90'
                          : 'text-slate-100 bg-slate-900/80 border-white/15'
                      }`}
                    >
                      <Activity className={`w-4 h-4 ${isLightMode ? 'text-blue-600' : 'text-cyan-400'}`} />
                      <span className="tracking-wide">Book Live Demo</span>
                    </button>
                  </div>
                </div>

                {/* Mobile controls */}
                <div className={`flex items-center justify-between px-4 py-3 border-t ${isLightMode ? 'border-slate-200 bg-white/60' : 'border-white/5 bg-black/40'}`}>
                  <button onClick={handlePrev} className="w-10 h-10 rounded-xl border flex items-center justify-center bg-black/40 border-white/10 text-slate-300">
                    <ChevronLeft className="w-5 h-5" />
                  </button>
                  <div className="flex items-center gap-2">
                    {AI_AGENTS.map((_, idx) => (
                      <button
                        key={idx}
                        onClick={() => { setCurrentIndex(idx); setIsPlaying(false); setAnimationKey(k => k + 1); }}
                        className={`rounded-full transition-all duration-300 ${
                          idx === currentIndex ? 'w-6 h-2 bg-blue-500' : 'w-2 h-2 bg-white/20'
                        }`}
                      />
                    ))}
                  </div>
                  <button onClick={handleNext} className="w-10 h-10 rounded-xl border flex items-center justify-center bg-black/40 border-white/10 text-slate-300">
                    <ChevronRight className="w-5 h-5" />
                  </button>
                </div>
              </div>
            )}

            {/* ─── DESKTOP LAYOUT (lg+) ─── */}
            {isDesktop && (
              <div className="relative min-h-[660px]">
                
                {/* Full-Bleed Showcase Image Background */}
                <div className="absolute inset-0 z-0 flex justify-end">
                  {/* Left & Bottom Gradient Masks to ensure text readability */}
                  <div className={`absolute inset-0 z-10 w-full lg:w-2/3 transition-opacity duration-700 ${
                    isCinematic ? 'opacity-0 pointer-events-none' : 'opacity-100'
                  } ${isLightMode ? 'bg-gradient-to-r from-slate-50 via-slate-50/95 to-transparent' : 'bg-gradient-to-r from-[#030712] via-[#030712]/90 to-transparent'}`} />
                  
                  <div className={`absolute inset-0 z-10 transition-opacity duration-700 ${
                    isCinematic ? 'opacity-0 pointer-events-none' : 'opacity-100'
                  } ${isLightMode ? 'bg-gradient-to-t from-slate-50 via-transparent to-transparent' : 'bg-gradient-to-t from-[#030712] via-transparent to-transparent'}`} />

                  {/* Right Showcase Visual */}
                  <div className={`relative h-full transition-all duration-700 ease-[cubic-bezier(0.22,1,0.36,1)] ${
                    isCinematic 
                      ? 'w-full opacity-100 mix-blend-normal z-30' 
                      : isLightMode
                        ? 'w-full lg:w-[65%] opacity-95 mix-blend-normal shadow-2xl rounded-2xl overflow-hidden border border-slate-200/80 z-0'
                        : 'w-full lg:w-[65%] opacity-85 z-0'
                  }`}>
                    <img
                      src={getValidImageUrl(currentAgent.imageUrl, currentAgent.category, currentAgent.title, currentAgent.id)}
                      alt={currentAgent.title}
                      className="w-full h-full object-cover object-center"
                    />
                  </div>
                </div>

                {/* Floating Content Foreground */}
                <div className={`relative z-20 w-full max-w-[1400px] mx-auto px-8 lg:px-12 py-12 h-full flex flex-col justify-center ${
                  isCinematic ? 'pointer-events-none' : ''
                }`}>
                  
                  {/* Tagline */}
                  <div className={`mb-6 transition-all duration-700 ${isCinematic ? 'opacity-0 -translate-x-12 pointer-events-none' : 'opacity-100 translate-x-0'}`}>
                    <span className={`px-4 py-1.5 border rounded-full text-[10px] font-bold uppercase tracking-[0.2em] shadow-sm backdrop-blur-md ${isLightMode ? 'bg-blue-50/80 border-blue-200/80 text-blue-700' : 'bg-white/5 border-white/10 text-slate-300'}`}>
                      Featured Platform Showcase
                    </span>
                  </div>

                  {/* Dynamic Content */}
                  <div 
                    key={animationKey}
                    className={`w-full lg:w-[55%] space-y-5 transition-all duration-700 ease-out fill-mode-both ${
                      isCinematic 
                        ? 'opacity-0 -translate-x-12 pointer-events-none' 
                        : 'opacity-100 translate-x-0 animate-in fade-in slide-in-from-left-8 duration-700'
                    }`}
                  >
                    <div className="flex items-center gap-4">
                      <div className={`p-4 rounded-2xl border shadow-xl backdrop-blur-xl ${isLightMode ? 'bg-gradient-to-br from-blue-700 to-blue-600 border-blue-500/20 text-white shadow-blue-500/20' : 'bg-black/60 border-white/15 text-blue-400'}`}>
                        {renderIcon(currentAgent.iconName)}
                      </div>
                      <div>
                        <span className={`text-[10px] uppercase font-bold tracking-[0.2em] block mb-1 ${isLightMode ? 'text-blue-600' : 'text-cyan-400'}`}>
                          {currentAgent.category}{currentAgent.subcategory ? ` • ${currentAgent.subcategory}` : ''}
                        </span>
                        <h3 className={`text-2xl sm:text-4xl lg:text-5xl font-heading font-extrabold tracking-tight leading-tight line-clamp-2 ${isLightMode ? 'text-slate-900' : 'text-white'}`}>
                          {currentAgent.title}
                        </h3>
                      </div>
                    </div>

                    <p className={`text-sm sm:text-base leading-relaxed max-w-2xl font-medium line-clamp-3 ${isLightMode ? 'text-slate-700' : 'text-slate-300'}`}>
                      {currentAgent.fullDescription}
                    </p>

                    {/* Key Features List */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 max-w-2xl">
                      {currentAgent.keyFeatures.map((feat, idx) => (
                        <div key={idx} className={`flex items-start gap-2.5 border px-3.5 py-2.5 rounded-xl backdrop-blur-md transition-all ${isLightMode ? 'bg-white/90 border-slate-200/90 shadow-sm text-slate-800 hover:border-blue-300' : 'bg-black/40 border-white/5 text-slate-200'}`}>
                          <CheckCircle2 className={`w-4 h-4 shrink-0 mt-0.5 ${isLightMode ? 'text-blue-600' : 'text-emerald-400'}`} />
                          <span className="text-xs font-semibold leading-relaxed line-clamp-2">{feat}</span>
                        </div>
                      ))}
                    </div>

                    {/* Metrics & Impact Badge */}
                    <div className="flex flex-wrap items-center gap-4 max-w-2xl">
                      <div className={`px-5 py-3 border rounded-xl backdrop-blur-md ${isLightMode ? 'bg-gradient-to-br from-blue-50 to-cyan-50 border-blue-200/80 shadow-sm' : 'bg-blue-500/10 border-blue-500/20 shadow-[0_0_20px_rgba(59,130,246,0.1)]'}`}>
                        <span className={`text-[10px] uppercase font-bold tracking-[0.15em] block mb-1 ${isLightMode ? 'text-blue-700' : 'text-blue-400'}`}>Impact Delivered</span>
                        <span className={`text-lg font-extrabold tracking-tight ${isLightMode ? 'text-slate-900' : 'text-white'}`}>{currentAgent.impactMetric}</span>
                      </div>

                      <div className={`px-5 py-3 border rounded-xl backdrop-blur-md ${isLightMode ? 'bg-white/90 border-slate-200 shadow-sm' : 'bg-white/5 border-white/10'}`}>
                        <span className={`text-[10px] uppercase font-bold tracking-[0.15em] block mb-1 ${isLightMode ? 'text-slate-500' : 'text-slate-400'}`}>Tech Stack</span>
                        <div className="flex gap-2">
                          {currentAgent.techStack.slice(0, 3).map((st, i) => (
                            <span key={i} className={`text-xs font-mono font-bold px-2 py-0.5 rounded ${isLightMode ? 'bg-blue-50 text-blue-700 border border-blue-100' : 'bg-cyan-500/10 text-cyan-300'}`}>
                              {st}
                            </span>
                          ))}
                        </div>
                      </div>
                    </div>

                    {/* Action Buttons */}
                    <div className="flex flex-wrap items-center gap-3 pt-2">
                      <button
                        onClick={() => onSelectProduct && onSelectProduct(currentAgent)}
                        className="px-6 py-3 rounded-xl text-sm font-bold text-white bg-gradient-to-r from-blue-700 via-blue-600 to-cyan-600 hover:from-blue-600 hover:via-blue-500 hover:to-cyan-500 shadow-xl shadow-blue-600/25 border border-white/20 hover:scale-[1.02] active:scale-[0.98] transition-all flex items-center gap-2.5 cursor-pointer"
                      >
                        <span className="tracking-wide">Explore Architecture & Specs</span>
                        <ArrowRight className="w-4 h-4" />
                      </button>

                      <button
                        onClick={() => onScheduleDemo(currentAgent.title)}
                        className={`px-6 py-3 rounded-xl text-sm font-bold border backdrop-blur-xl transition-all flex items-center gap-2.5 cursor-pointer shadow-md hover:scale-[1.02] active:scale-[0.98] ${
                          isLightMode 
                            ? 'text-slate-800 bg-white/90 hover:bg-white border-slate-200/90' 
                            : 'text-slate-100 bg-slate-900/80 hover:bg-slate-800/90 border-white/15'
                        }`}
                      >
                        <Activity className={`w-4 h-4 ${isLightMode ? 'text-blue-600' : 'text-cyan-400'}`} />
                        <span className="tracking-wide">Book Live Demo</span>
                      </button>
                    </div>

                  </div>
                </div>

                {/* Top Right Controls (Expand Video, Play/Pause, Next/Prev) */}
                <div className="absolute top-8 right-8 lg:right-12 z-30 hidden lg:flex items-center gap-2">
                  <button
                    onClick={() => setIsCinematic(!isCinematic)}
                    className={`px-4 py-2.5 rounded-2xl border transition-all flex items-center gap-2 cursor-pointer shadow-xl backdrop-blur-md ${
                      isCinematic
                        ? 'bg-gradient-to-r from-amber-500/20 to-orange-500/20 border-amber-500/50 text-amber-300'
                        : isLightMode
                          ? 'bg-white hover:bg-blue-50/80 border-blue-200 text-blue-600'
                          : 'bg-gradient-to-r from-blue-600/30 to-cyan-500/30 border-cyan-400/50 text-cyan-300'
                    }`}
                  >
                    {isCinematic ? <Minimize2 className="w-4 h-4 text-amber-400" /> : <Maximize2 className="w-4 h-4 text-blue-600" />}
                    <span className="text-sm font-bold">{isCinematic ? 'Show Text' : 'Expand Media'}</span>
                  </button>

                  <button
                    onClick={() => setIsPlaying(!isPlaying)}
                    className="px-4 py-2.5 rounded-2xl border transition-all flex items-center gap-2 cursor-pointer shadow-xl backdrop-blur-md bg-black/40 hover:bg-black/60 border-white/10 text-slate-300"
                  >
                    {isPlaying ? <Pause className="w-4 h-4 text-amber-400" /> : <Play className="w-4 h-4 text-emerald-400" />}
                    <span className="text-sm font-semibold">{isPlaying ? 'Pause' : 'Play'}</span>
                  </button>

                  <button onClick={handlePrev} className="w-11 h-11 rounded-2xl border flex items-center justify-center bg-black/40 border-white/10 text-slate-300 hover:text-white cursor-pointer">
                    <ChevronLeft className="w-5 h-5" />
                  </button>

                  <button onClick={handleNext} className="w-11 h-11 rounded-2xl border flex items-center justify-center bg-black/40 border-white/10 text-slate-300 hover:text-white cursor-pointer">
                    <ChevronRight className="w-5 h-5" />
                  </button>
                </div>

                {/* Minimalist Dot Navigation */}
                <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-30 hidden lg:flex items-center gap-2.5 p-2.5 rounded-full border backdrop-blur-xl shadow-2xl bg-black/40 border-white/10">
                  {AI_AGENTS.map((p, idx) => (
                    <button
                      key={p.id}
                      onClick={() => {
                        setCurrentIndex(idx);
                        setIsPlaying(false);
                        setAnimationKey(k => k + 1);
                      }}
                      title={p.title}
                      className={`rounded-full transition-all duration-300 cursor-pointer ${
                        idx === currentIndex
                          ? 'w-6 h-2 bg-blue-500 shadow-[0_0_12px_rgba(59,130,246,0.6)]'
                          : 'w-2 h-2 bg-white/20 hover:bg-white/40'
                      }`}
                    />
                  ))}
                </div>

              </div>
            )}

          </div>
        </ScrollReveal>

      </div>
    </section>
  );
};
