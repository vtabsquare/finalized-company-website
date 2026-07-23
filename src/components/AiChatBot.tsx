import React, { useState, useEffect, useRef } from 'react';
import { 
  Bot, 
  X, 
  Send, 
  Sparkles, 
  Calendar, 
  Cpu, 
  ArrowRight, 
  RefreshCw, 
  MessageSquare, 
  ChevronDown,
  Layers,
  BarChart3,
  CheckCircle2,
  Minimize2,
  Maximize2
} from 'lucide-react';
import { Product } from '../types';
import { PRODUCTS_DATA } from '../data/contentData';

interface AiChatBotProps {
  onScheduleDemo: (interestProduct?: string) => void;
  onOpenSandbox: () => void;
  onSelectProduct: (product: Product) => void;
  onNavigateTab: (tabId: any) => void;
  isLightMode?: boolean;
}

interface ChatMessage {
  id: string;
  sender: 'user' | 'bot';
  text: string;
  timestamp: string;
  actionButtons?: {
    label: string;
    actionType: 'demo' | 'sandbox' | 'product' | 'navigate';
    payload?: string;
  }[];
}

const SUGGESTED_QUESTIONS = [
  "What AI products do you offer?",
  "How does Qlik to Power BI migration work?",
  "What are Autonomous AI Employees?",
  "Tell me about FaceAuth enterprise liveness",
  "Can I test the AI Sandbox with custom data?",
  "How can I book a product demo?"
];

export const AiChatBot: React.FC<AiChatBotProps> = ({
  onScheduleDemo,
  onOpenSandbox,
  onSelectProduct,
  onNavigateTab,
  isLightMode = false,
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [isMinimized, setIsMinimized] = useState(false);
  const [inputQuery, setInputQuery] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [unreadCount, setUnreadCount] = useState(1);
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: 'welcome-1',
      sender: 'bot',
      text: "👋 Hello! I am the **VTab AI Knowledge & Solutions Assistant**.\n\nI can help you explore our enterprise AI products, automated data migration tools, FaceAuth biometrics, or schedule a live demo. What would you like to build today?",
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      actionButtons: [
        { label: '🚀 Explore All 8 Products', actionType: 'navigate', payload: 'products' },
        { label: '⚡ Open AI Sandbox', actionType: 'sandbox' },
        { label: '📅 Schedule Demo', actionType: 'demo', payload: 'General Demo' }
      ]
    }
  ]);

  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (isOpen) {
      setUnreadCount(0);
      scrollToBottom();
    }
  }, [isOpen, messages]);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  const generateBotReply = (query: string) => {
    const q = query.toLowerCase();

    // Qlik or Migration
    if (q.includes('qlik') || q.includes('power bi') || q.includes('migration') || q.includes('convert')) {
      const qlikProd = PRODUCTS_DATA.find(p => p.id === 'qlik-to-powerbi-migration');
      return {
        text: "🔄 **Qlik to Power BI Automated Migration Engine**\n\nOur platform automatically parses Qlik Sense & QlikView set analysis formulas, variables, and data models directly into Microsoft Power BI DAX code with **99.4% precision**.\n\nKey Highlights:\n• Converts 1,000+ calculations in minutes\n• Preserves exact data relationships & security filters\n• Cuts manual rewrite timeline by up to 80%",
        actionButtons: [
          { label: '🔍 View Qlik Specs', actionType: 'product' as const, payload: 'qlik-to-powerbi-migration' },
          { label: '📅 Book Migration Demo', actionType: 'demo' as const, payload: 'Qlik to Power BI Migration' }
        ]
      };
    }

    // AI Employees or Autonomous
    if (q.includes('employee') || q.includes('autonomous') || q.includes('agent') || q.includes('worker') || q.includes('bot')) {
      return {
        text: "🤖 **Autonomous AI Employees**\n\nWe deploy specialized digital AI team members that execute end-to-end enterprise tasks 24/7:\n\n1. **Data Analytics Lead** (DAX/SQL Synthesis)\n2. **Migration Architect** (Legacy Code Translation)\n3. **Construction Estimator** (CAD/BoQ Vision Parsing)\n4. **Support Resolution Agent** (L1 Ticket Auto-Closing)\n\nWould you like to try them in our live sandbox?",
        actionButtons: [
          { label: '⚡ Test AI Employees in Sandbox', actionType: 'sandbox' as const },
          { label: '📅 Book AI Employee Demo', actionType: 'demo' as const, payload: 'Autonomous AI Employees' }
        ]
      };
    }

    // FaceAuth or Biometrics
    if (q.includes('face') || q.includes('biometric') || q.includes('faceauth') || q.includes('liveness') || q.includes('security')) {
      return {
        text: "🔒 **FaceAuth Enterprise Biometrics**\n\nFaceAuth provides millisecond facial recognition with **3D Liveness Detection** to prevent spoofing with photos or videos.\n\n• Match Latency: **< 14ms**\n• False Acceptance Rate: **< 0.0001%**\n• Offline Edge Deployment & Active Directory SSO Support",
        actionButtons: [
          { label: '🔍 View FaceAuth Specs', actionType: 'product' as const, payload: 'faceauth' },
          { label: '📅 Book Security Demo', actionType: 'demo' as const, payload: 'FaceAuth Enterprise' }
        ]
      };
    }

    // Construction, CAD, Blueprint, GBTI, Estimator
    if (q.includes('construction') || q.includes('cad') || q.includes('blueprint') || q.includes('home') || q.includes('estimate') || q.includes('boq')) {
      return {
        text: "🏗️ **Smart Construction & Estimation Suite**\n\nWe offer two flagship AI tools for construction & engineering:\n\n1. **GBTI Smart Home Builder**: AI CAD blueprint vision parsing & spatial measurement verification.\n2. **BuildSmart Estimator**: Automatic Bill of Quantities (BoQ) extraction from PDF architectural drawings in under 3 minutes.",
        actionButtons: [
          { label: '🔍 GBTI Blueprint Builder', actionType: 'product' as const, payload: 'gbti-smart-home-builder' },
          { label: '🔍 BuildSmart Estimator', actionType: 'product' as const, payload: 'buildsmart-estimator' },
          { label: '📅 Book Construction Demo', actionType: 'demo' as const, payload: 'Construction AI Suite' }
        ]
      };
    }

    // Sandbox or Test Data
    if (q.includes('sandbox') || q.includes('test') || q.includes('excel') || q.includes('csv') || q.includes('try')) {
      return {
        text: "⚡ **Interactive AI Sandbox**\n\nOur sandbox allows you to test natural language DAX queries, upload CSV datasets, simulate automated Qlik syntax conversion, or run CAD blueprint parsing in real-time right in your browser!",
        actionButtons: [
          { label: '⚡ Launch Interactive Sandbox', actionType: 'sandbox' as const }
        ]
      };
    }

    // Products list or general inquiry
    if (q.includes('product') || q.includes('offer') || q.includes('solution') || q.includes('what do you do') || q.includes('service')) {
      return {
        text: "✨ **VTab Square AI Product Suite (8 Live Systems)**:\n\n1. **AI Reporting Platform**: NL to DAX & Power BI reports\n2. **Qlik ➔ Power BI**: Automated code translation\n3. **GBTI Smart Home Builder**: AI CAD blueprint vision\n4. **BuildSmart Estimator**: Automated BoQ cost estimation\n5. **FaceAuth Enterprise**: 3D Liveness biometric verification\n6. **Packaging Optimizer**: 3D Spatial freight bin packing\n7. **AI L1 Support Agent**: Autonomous ServiceNow/Okta ticketing\n8. **Postgres ➔ SQL Server**: Low-downtime DB migration",
        actionButtons: [
          { label: '🚀 Explore All Products', actionType: 'navigate' as const, payload: 'products' },
          { label: '📅 Schedule Demo', actionType: 'demo' as const, payload: 'Product Suite Overview' }
        ]
      };
    }

    // Demo or Contact
    if (q.includes('demo') || q.includes('contact') || q.includes('pricing') || q.includes('cost') || q.includes('book') || q.includes('meeting')) {
      return {
        text: "📅 **Schedule a Live Demo**\n\nOur AI solution architects are available for 1-on-1 walkthroughs tailored to your organization's data infrastructure and goals.\n\nPick a product interest or request a custom architectural audit below:",
        actionButtons: [
          { label: '📅 Book 1-on-1 Architecture Demo', actionType: 'demo' as const, payload: 'Executive Demo' },
          { label: '✉️ Send Direct Message', actionType: 'navigate' as const, payload: 'contact' }
        ]
      };
    }

    // Default Fallback Response
    return {
      text: `Thank you for your question about "${query}".\n\nVTab Square specializes in domain-specific enterprise AI solutions spanning automated reporting, legacy code conversion, 3D biometrics, and autonomous AI agents.\n\nWould you like to speak with our AI experts or test our interactive sandbox?`,
      actionButtons: [
        { label: '📅 Book Demo', actionType: 'demo' as const, payload: query },
        { label: '⚡ Open AI Sandbox', actionType: 'sandbox' as const },
        { label: '🚀 View All Solutions', actionType: 'navigate' as const, payload: 'solutions' }
      ]
    };
  };

  const handleSendMessage = (textToSend?: string) => {
    const text = textToSend || inputQuery;
    if (!text.trim()) return;

    const userMsg: ChatMessage = {
      id: `user-${Date.now()}`,
      sender: 'user',
      text: text,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };

    setMessages(prev => [...prev, userMsg]);
    setInputQuery('');
    setIsTyping(true);

    setTimeout(() => {
      const replyData = generateBotReply(text);
      const botMsg: ChatMessage = {
        id: `bot-${Date.now()}`,
        sender: 'bot',
        text: replyData.text,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        actionButtons: replyData.actionButtons
      };

      setMessages(prev => [...prev, botMsg]);
      setIsTyping(false);
    }, 800);
  };

  const handleActionClick = (btn: { actionType: string; payload?: string }) => {
    if (btn.actionType === 'demo') {
      onScheduleDemo(btn.payload || 'AI Solution Demo');
      setIsOpen(false);
    } else if (btn.actionType === 'sandbox') {
      onOpenSandbox();
      setIsOpen(false);
    } else if (btn.actionType === 'product' && btn.payload) {
      const prod = PRODUCTS_DATA.find(p => p.id === btn.payload);
      if (prod) {
        onSelectProduct(prod);
        setIsOpen(false);
      }
    } else if (btn.actionType === 'navigate' && btn.payload) {
      onNavigateTab(btn.payload);
      setIsOpen(false);
    }
  };

  return (
    <div className="fixed bottom-6 right-6 z-50 flex flex-col items-end pointer-events-none">
      
      {/* Expanded Chat Drawer Box */}
      {isOpen && (
        <div 
          className={`pointer-events-auto mb-4 w-[92vw] sm:w-[420px] rounded-2xl shadow-2xl border transition-all duration-300 overflow-hidden flex flex-col ${
            isMinimized ? 'h-16' : 'h-[540px]'
          } ${
            isLightMode 
              ? 'bg-white/95 text-slate-900 border-slate-200 shadow-slate-400/20 backdrop-blur-2xl' 
              : 'bg-[#020612]/95 text-slate-100 border-white/15 shadow-black/80 backdrop-blur-2xl'
          }`}
        >
          {/* Header */}
          <div className={`px-4 py-3 border-b flex items-center justify-between shrink-0 ${
            isLightMode ? 'bg-slate-100/90 border-slate-200' : 'bg-slate-900/90 border-white/10'
          }`}>
            <div className="flex items-center gap-2.5">
              <div className="relative">
                <div className="w-8 h-8 rounded-xl bg-gradient-to-tr from-blue-600 to-purple-600 flex items-center justify-center text-white shadow-md">
                  <Bot className="w-4 h-4" />
                </div>
                <span className="absolute -bottom-0.5 -right-0.5 w-2.5 h-2.5 bg-emerald-500 rounded-full border-2 border-slate-900 animate-pulse" />
              </div>

              <div>
                <div className="flex items-center gap-1.5">
                  <h4 className="text-xs font-bold leading-tight">VTab AI Assistant</h4>
                  <span className="text-[9px] font-mono px-1.5 py-0.2 rounded bg-cyan-500/10 text-cyan-500 border border-cyan-500/20">
                    Active
                  </span>
                </div>
                <p className="text-[10px] text-slate-400">Enterprise AI Knowledge Base</p>
              </div>
            </div>

            <div className="flex items-center gap-1">
              <button
                onClick={() => setIsMinimized(!isMinimized)}
                className="p-1.5 rounded-lg hover:bg-white/10 text-slate-400 hover:text-white transition-colors cursor-pointer"
                title={isMinimized ? "Expand Chat" : "Minimize Chat"}
              >
                {isMinimized ? <Maximize2 className="w-3.5 h-3.5" /> : <Minimize2 className="w-3.5 h-3.5" />}
              </button>

              <button
                onClick={() => setIsOpen(false)}
                className="p-1.5 rounded-lg hover:bg-red-500/20 text-slate-400 hover:text-red-400 transition-colors cursor-pointer"
                title="Close Assistant"
              >
                <X className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* Chat Content Body (when not minimized) */}
          {!isMinimized && (
            <>
              {/* Messages Container */}
              <div className="flex-1 overflow-y-auto p-4 space-y-4 text-xs font-sans">
                
                {messages.map((msg) => (
                  <div
                    key={msg.id}
                    className={`flex flex-col ${msg.sender === 'user' ? 'items-end' : 'items-start'}`}
                  >
                    <div className="flex items-center gap-1 mb-1 text-[10px] text-slate-400 px-1">
                      <span>{msg.sender === 'user' ? 'You' : 'VTab AI'}</span>
                      <span>•</span>
                      <span>{msg.timestamp}</span>
                    </div>

                    <div
                      className={`max-w-[88%] p-3.5 rounded-2xl whitespace-pre-wrap leading-relaxed shadow-sm ${
                        msg.sender === 'user'
                          ? 'bg-blue-600 text-white rounded-tr-none'
                          : isLightMode
                            ? 'bg-slate-100 text-slate-800 rounded-tl-none border border-slate-200'
                            : 'bg-white/5 text-slate-200 rounded-tl-none border border-white/10'
                      }`}
                    >
                      {msg.text}

                      {/* Action Buttons inside Bot Message */}
                      {msg.actionButtons && msg.actionButtons.length > 0 && (
                        <div className="mt-3 pt-2.5 border-t border-slate-200/40 dark:border-white/10 flex flex-wrap gap-1.5">
                          {msg.actionButtons.map((btn, idx) => (
                            <button
                              key={idx}
                              onClick={() => handleActionClick(btn)}
                              className={`px-2.5 py-1.5 rounded-lg text-[11px] font-semibold transition-all flex items-center gap-1 cursor-pointer ${
                                isLightMode
                                  ? 'bg-blue-600 hover:bg-blue-700 text-white shadow-sm'
                                  : 'bg-blue-500/20 hover:bg-blue-600 text-blue-300 hover:text-white border border-blue-400/30'
                              }`}
                            >
                              <span>{btn.label}</span>
                              <ArrowRight className="w-3 h-3" />
                            </button>
                          ))}
                        </div>
                      )}
                    </div>
                  </div>
                ))}

                {/* Typing Indicator */}
                {isTyping && (
                  <div className="flex items-center gap-2 text-slate-400 text-xs p-2">
                    <Bot className="w-4 h-4 text-blue-400 animate-spin" />
                    <span className="font-mono text-[11px]">VTab AI is synthesizing response...</span>
                  </div>
                )}

                <div ref={messagesEndRef} />
              </div>

              {/* Quick Suggested Question Chips */}
              <div className={`p-2.5 border-t border-b overflow-x-auto flex items-center gap-1.5 scrollbar-none shrink-0 ${
                isLightMode ? 'bg-slate-50 border-slate-200' : 'bg-black/30 border-white/5'
              }`}>
                <span className="text-[10px] uppercase font-bold text-slate-400 shrink-0 px-1">Ask:</span>
                {SUGGESTED_QUESTIONS.map((q, idx) => (
                  <button
                    key={idx}
                    onClick={() => handleSendMessage(q)}
                    className={`text-[10px] font-medium px-2.5 py-1 rounded-full whitespace-nowrap transition-all cursor-pointer shrink-0 ${
                      isLightMode
                        ? 'bg-white text-slate-700 hover:bg-blue-50 border border-slate-200'
                        : 'bg-white/5 text-slate-300 hover:bg-blue-600/30 hover:text-white border border-white/10'
                    }`}
                  >
                    {q}
                  </button>
                ))}
              </div>

              {/* Chat Input Bar */}
              <div className={`p-3 flex items-center gap-2 shrink-0 ${
                isLightMode ? 'bg-white border-t border-slate-200' : 'bg-slate-950 border-t border-white/10'
              }`}>
                <input
                  type="text"
                  value={inputQuery}
                  onChange={(e) => setInputQuery(e.target.value)}
                  onKeyDown={(e) => e.key === 'Enter' && handleSendMessage()}
                  placeholder="Ask about DAX, Qlik, FaceAuth, AI Employees..."
                  className={`flex-1 px-3 py-2 rounded-xl text-xs outline-none transition-all ${
                    isLightMode
                      ? 'bg-slate-100 text-slate-900 placeholder:text-slate-400 border border-slate-200 focus:border-blue-500'
                      : 'bg-white/5 text-white placeholder:text-slate-500 border border-white/10 focus:border-blue-400'
                  }`}
                />
                <button
                  onClick={() => handleSendMessage()}
                  disabled={!inputQuery.trim()}
                  className="p-2.5 rounded-xl bg-blue-600 hover:bg-blue-500 disabled:opacity-40 text-white transition-all cursor-pointer shadow-md"
                >
                  <Send className="w-4 h-4" />
                </button>
              </div>
            </>
          )}
        </div>
      )}

      {/* Circular Floating Launcher Button */}
      <button
        onClick={() => {
          setIsOpen(!isOpen);
          setIsMinimized(false);
        }}
        className={`pointer-events-auto w-14 h-14 sm:w-16 sm:h-16 rounded-full shadow-2xl transition-all duration-300 flex items-center justify-center cursor-pointer group hover:scale-110 relative ${
          isOpen
            ? isLightMode
              ? 'bg-slate-900 text-white border-2 border-slate-700 shadow-slate-900/40'
              : 'bg-slate-900 text-white border-2 border-slate-700 shadow-blue-500/30'
            : isLightMode
              ? 'bg-gradient-to-tr from-blue-600 via-indigo-600 to-cyan-500 text-white border-2 border-white shadow-xl shadow-blue-600/30'
              : 'bg-gradient-to-tr from-blue-600 via-indigo-600 to-purple-600 text-white border-2 border-blue-400/40 shadow-blue-500/40'
        }`}
        title="Open VTab AI Assistant"
        id="ai-bot-launcher-btn"
      >
        <div className="relative flex items-center justify-center">
          <Bot className="w-7 h-7 transition-transform group-hover:rotate-12" />
          
          {unreadCount > 0 && !isOpen && (
            <span className="absolute -top-2 -right-2 w-4 h-4 rounded-full bg-cyan-400 text-slate-950 text-[10px] font-black flex items-center justify-center border-2 border-white shadow-md animate-bounce">
              !
            </span>
          )}
        </div>

        {/* Pulse Ring */}
        {!isOpen && (
          <span className={`absolute inset-0 rounded-full animate-ping opacity-25 pointer-events-none ${
            isLightMode ? 'bg-blue-600' : 'bg-cyan-400'
          }`} />
        )}
      </button>

    </div>
  );
};
