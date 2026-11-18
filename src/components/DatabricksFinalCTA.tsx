import React from 'react';
import {
  Download,
  Sparkles,
  ArrowRight,
  ShieldCheck,
  Zap,
  ExternalLink
} from 'lucide-react';

interface DatabricksFinalCTAProps {
  onScheduleDemo: (interestArea?: string) => void;
  onOpenDownload?: () => void;
}

export const DatabricksFinalCTA: React.FC<DatabricksFinalCTAProps> = ({
  onScheduleDemo,
  onOpenDownload,
}) => {
  return (
    <section className="relative py-20 lg:py-28 bg-[#020510] border-t border-slate-800/80 overflow-hidden">
      {/* Background Volumetric Lighting */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[350px] bg-gradient-to-r from-cyan-600/15 via-emerald-600/15 to-blue-600/15 blur-[120px] rounded-full pointer-events-none -z-10" />

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-8">
        
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full text-xs font-mono font-bold tracking-widest uppercase bg-cyan-950/70 text-cyan-300 border border-cyan-500/30">
          <Zap className="w-3.5 h-3.5 text-cyan-400" />
          <span>PRODUCTION READY • BUILD 2.5.0 STABLE</span>
        </div>

        <h2 className="text-3xl sm:text-5xl font-extrabold text-white tracking-tight leading-tight">
          Ready to modernize your legacy database estate to Databricks Lakehouse?
        </h2>

        <p className="text-slate-300 text-sm sm:text-base leading-relaxed max-w-2xl mx-auto">
          Start with our lightweight on-premise migration agent for instant schema discovery, or schedule a technical walkthrough with our migration engineering team.
        </p>

        {/* CTA Buttons */}
        <div className="flex flex-wrap items-center justify-center gap-4 pt-4">
          <a
            href="https://github.com/vtabsquare/Databricks-Migration-Agent-Releases/releases/latest"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2.5 px-7 py-4 rounded-full font-bold text-xs sm:text-sm tracking-wide uppercase bg-gradient-to-r from-cyan-500 via-sky-500 to-emerald-500 hover:from-cyan-400 hover:to-emerald-400 text-white shadow-[0_0_25px_rgba(6,182,212,0.4)] hover:shadow-[0_0_35px_rgba(16,185,129,0.6)] transition-all cursor-pointer active:scale-95"
          >
            <Download className="w-4 h-4" />
            <span>Download Agent v2.5.0 (Win 64-bit)</span>
          </a>

          <button
            type="button"
            onClick={() => onScheduleDemo('Databricks Migration AI Studio')}
            className="inline-flex items-center gap-2.5 px-7 py-4 rounded-full font-bold text-xs sm:text-sm tracking-wide uppercase bg-slate-900/90 hover:bg-slate-800 text-slate-200 hover:text-white border border-white/15 hover:border-cyan-400/50 shadow-lg transition-all cursor-pointer active:scale-95"
          >
            <Sparkles className="w-4 h-4 text-cyan-400" />
            <span>Schedule Architecture Review</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>

        {/* Trust Badges */}
        <div className="pt-6 flex flex-wrap items-center justify-center gap-6 text-xs font-mono text-slate-400">
          <div className="flex items-center gap-1.5 text-emerald-400">
            <ShieldCheck className="w-4 h-4" />
            <span>Zero Ingress Ports Required</span>
          </div>
          <div>•</div>
          <div>AES-256 GCM Transit Encryption</div>
          <div>•</div>
          <div>100% Deterministic AST Verification</div>
        </div>

      </div>
    </section>
  );
};
