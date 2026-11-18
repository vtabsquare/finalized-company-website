import React, { useState } from 'react';
import { Sparkles, Check, ShieldCheck, Zap, Layers, Server, Activity, Database, FileSpreadsheet, Receipt } from 'lucide-react';
import {
  invoiceFlowFeatureCapabilities,
  invoiceFlowConnectorCatalog
} from '../data/invoiceFlowData';

export const InvoiceFeatureShowcase: React.FC = () => {
  const [activeCapId, setActiveCapId] = useState<string>(invoiceFlowFeatureCapabilities[0].id);

  const activeCap =
    invoiceFlowFeatureCapabilities.find((c) => c.id === activeCapId) ||
    invoiceFlowFeatureCapabilities[0];

  return (
    <section id="capabilities" className="relative py-20 lg:py-28 bg-[#050811] border-t border-slate-800/80 overflow-hidden">
      {/* Background radial glow */}
      <div className="absolute top-1/3 right-1/4 w-[600px] h-[350px] bg-cyan-500/5 blur-[140px] rounded-full pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header */}
        <div className="max-w-3xl mb-12">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-cyan-500/30 bg-cyan-950/20 text-cyan-400 text-xs font-mono mb-4">
            <Sparkles className="w-3.5 h-3.5" />
            <span>STUDIO CAPABILITIES</span>
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-white font-sans">
            Interactive invoice & billing capabilities.
          </h2>
          <p className="mt-4 text-base sm:text-lg text-slate-300 font-sans leading-relaxed">
            Select a capability below to explore how VTAB Invoice Suite powers modern corporate billing, compliant invoicing, and automated receivables management.
          </p>
        </div>

        {/* 6 Capability Tabs */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-2 sm:gap-3 mb-10">
          {invoiceFlowFeatureCapabilities.map((cap) => {
            const isActive = cap.id === activeCapId;
            return (
              <button
                key={cap.id}
                onClick={() => setActiveCapId(cap.id)}
                className={`p-3 sm:p-4 rounded-xl text-left border transition-all cursor-pointer relative ${
                  isActive
                    ? 'border-cyan-400 bg-cyan-950/30 shadow-lg shadow-cyan-500/10'
                    : 'border-slate-800 bg-slate-900/40 hover:border-slate-700 hover:bg-slate-900/60'
                }`}
              >
                {isActive && (
                  <div className="absolute top-0 left-0 right-0 h-0.5 bg-gradient-to-r from-blue-400 via-cyan-400 to-indigo-300" />
                )}
                <div className={`text-xs font-mono font-bold mb-1 ${isActive ? 'text-cyan-400' : 'text-slate-400'}`}>
                  {cap.shortName}
                </div>
                <div className="text-xs sm:text-sm font-semibold text-white font-sans line-clamp-2">
                  {cap.name}
                </div>
              </button>
            );
          })}
        </div>

        {/* Active Capability Display Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start mb-14">
          {/* Left Details Box */}
          <div className="lg:col-span-7 rounded-2xl border border-slate-800 bg-slate-900/60 backdrop-blur-xl p-6 sm:p-8 space-y-6">
            <div className="space-y-2">
              <span className="inline-block px-3 py-1 rounded-md text-xs font-mono bg-cyan-950/50 border border-cyan-800/60 text-cyan-300">
                {activeCap.categoryTag}
              </span>
              <h3 className="text-2xl sm:text-3xl font-bold text-white font-sans">
                {activeCap.headline}
              </h3>
              <p className="text-sm sm:text-base text-slate-300 font-sans leading-relaxed pt-1">
                {activeCap.description}
              </p>
            </div>

            {/* Bullets */}
            <div className="space-y-3 pt-2">
              {activeCap.bullets.map((b, i) => (
                <div key={i} className="flex items-start gap-3">
                  <div className="w-5 h-5 rounded-full bg-cyan-500/10 border border-cyan-500/30 flex items-center justify-center shrink-0 mt-0.5">
                    <Check className="w-3.5 h-3.5 text-cyan-400" />
                  </div>
                  <span className="text-sm text-slate-200 font-sans leading-relaxed">
                    {b}
                  </span>
                </div>
              ))}
            </div>

            {/* Specs Grid */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 pt-4 border-t border-slate-800/80">
              {activeCap.specs.map((spec, i) => (
                <div key={i} className="p-3 rounded-lg bg-slate-950/60 border border-slate-800">
                  <div className="text-[11px] font-mono text-slate-400">{spec.label}</div>
                  <div className="text-xs sm:text-sm font-semibold font-mono text-cyan-300 mt-1">
                    {spec.value}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Right Box: Connector Catalog */}
          <div className="lg:col-span-5 rounded-2xl border border-cyan-500/30 bg-[#0A0E17]/90 backdrop-blur-xl p-6 sm:p-7 space-y-5 shadow-xl shadow-cyan-500/5">
            <div className="flex items-center justify-between pb-3 border-b border-slate-800/80">
              <div>
                <span className="text-xs font-mono uppercase text-slate-400 tracking-wider block">
                  SIGNAL CHANNELS
                </span>
                <span className="text-sm font-semibold text-white font-sans">
                  Active Signal Channels: 6 of 8 Connected
                </span>
              </div>
              <span className="px-2 py-0.5 rounded text-[10px] font-mono bg-emerald-950 text-emerald-400 border border-emerald-800/60">
                ALL ENGINES HEALTHY
              </span>
            </div>

            {/* Connectors list */}
            <div className="space-y-3 font-mono text-xs">
              {invoiceFlowConnectorCatalog.map((conn, i) => (
                <div
                  key={i}
                  className="p-3 rounded-lg border border-slate-800/80 bg-slate-950/70 flex items-center justify-between"
                >
                  <div className="space-y-1">
                    <div className="text-slate-200 font-medium">{conn.name}</div>
                    <div className="text-[11px] text-emerald-400">{conn.status}</div>
                  </div>
                  <span className="text-xs text-slate-400">{conn.uptime}</span>
                </div>
              ))}
            </div>

            {/* Security Notice */}
            <div className="p-3 rounded-lg border border-slate-800 bg-slate-950/80 text-xs font-mono text-slate-400 leading-relaxed">
              <span className="text-cyan-400 font-semibold">Security Notice: </span>
              Automatic TLS 1.3 encryption and zero-retention data residency active.
            </div>
          </div>
        </div>

        {/* Bottom Metadata Strip */}
        <div className="rounded-xl border border-slate-800/80 bg-slate-900/50 backdrop-blur-md p-4 sm:p-5 flex flex-wrap items-center justify-between gap-4 font-mono text-xs text-slate-300">
          <div className="flex items-center gap-2">
            <span className="text-slate-400">PROTOCOLS:</span>
            <span className="text-cyan-400">REST, HTTPS, SMTP, Webhooks</span>
          </div>
          <div className="flex items-center gap-2">
            <span className="text-slate-400">VELOCITY:</span>
            <span className="text-cyan-400">Sub-second document synthesis</span>
          </div>
          <div className="flex items-center gap-2">
            <span className="text-slate-400">SECURITY:</span>
            <span className="text-emerald-400">Enterprise RBAC · OTP-Backed Authentication · TLS 1.3</span>
          </div>
        </div>
      </div>
    </section>
  );
};
