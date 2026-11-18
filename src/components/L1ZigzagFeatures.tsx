import React from 'react';
import {
  Sparkles,
  Database,
  Check,
  ShieldCheck,
  Cpu,
  Layers,
  FileText,
  Lock,
  ArrowRight,
  Shield,
  Zap,
  Terminal
} from 'lucide-react';
import { AmbientGlow } from './AmbientGlow';

export const L1ZigzagFeatures: React.FC = () => {
  return (
    <section id="deep-dive" className="relative py-24 lg:py-32 border-t border-slate-800/80 bg-[#05070E] overflow-hidden">
      {/* Subtle background radial pattern */}
      <div className="absolute inset-0 bg-grid-pattern opacity-25 pointer-events-none -z-10" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-28 lg:space-y-36">
        
        {/* Section Master Header */}
        <div className="max-w-3xl text-left space-y-4">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-950/60 border border-cyan-500/30 text-xs font-semibold text-cyan-300 font-mono">
            <Sparkles className="w-3.5 h-3.5 text-cyan-400" />
            <span>ARCHITECTURAL DEEP-DIVE</span>
          </div>
          <h2 className="text-3xl sm:text-5xl font-extrabold text-white tracking-tight leading-tight text-pretty">
            Engineered layer by layer for zero-hallucination compliance.
          </h2>
          <p className="text-base sm:text-lg text-slate-300 leading-relaxed">
            Every tier of the Enterprise L1 Platform is purpose-built to eliminate repetitive tier-1 IT tickets while ensuring strict adherence to organizational IT security boundaries.
          </p>
        </div>

        {/* ── ROW 1: Layer 01 - Enterprise SOP Knowledge Base & Retrieval (RAG) ── */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-14 items-center relative">
          <AmbientGlow variant="zigzag-cyan" />
          
          {/* Text Left (6 cols) */}
          <div className="lg:col-span-6 space-y-6 text-left">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-950/80 border border-blue-500/30 text-xs font-mono font-semibold text-cyan-300">
              <Database className="w-3.5 h-3.5 text-cyan-400" />
              <span>01 · ENTERPRISE SOP KNOWLEDGE BASE & RETRIEVAL (RAG)</span>
            </div>

            <h3 className="text-2xl sm:text-4xl font-extrabold text-white tracking-tight leading-snug">
              Grounded on verified IT SOPs with zero hallucination.
            </h3>

            <p className="text-slate-300 text-sm sm:text-base leading-relaxed">
              Anchor LLM remediation steps in official IT standard operating procedures (SOPs), knowledge base articles, and runbooks. Every generated action is strictly bound to approved enterprise troubleshooting procedures.
            </p>

            <div className="space-y-3 pt-2">
              <div className="flex items-start gap-3">
                <div className="w-5 h-5 rounded-full bg-cyan-500/10 border border-cyan-500/30 flex items-center justify-center shrink-0 mt-0.5">
                  <Check className="w-3 h-3 text-cyan-400" />
                </div>
                <span className="text-sm text-slate-300 leading-relaxed">
                  Native pgvector semantic search retrieving top-k verified resolution runbooks
                </span>
              </div>
              <div className="flex items-start gap-3">
                <div className="w-5 h-5 rounded-full bg-cyan-500/10 border border-cyan-500/30 flex items-center justify-center shrink-0 mt-0.5">
                  <Check className="w-3 h-3 text-cyan-400" />
                </div>
                <span className="text-sm text-slate-300 leading-relaxed">
                  Context-injected few-shot prompts constraining Gemini models to explicit SOP steps
                </span>
              </div>
              <div className="flex items-start gap-3">
                <div className="w-5 h-5 rounded-full bg-cyan-500/10 border border-cyan-500/30 flex items-center justify-center shrink-0 mt-0.5">
                  <Check className="w-3 h-3 text-cyan-400" />
                </div>
                <span className="text-sm text-slate-300 leading-relaxed">
                  Automatic drift rejection: tickets outside documented SOPs trigger immediate escalation to human staff
                </span>
              </div>
            </div>

            {/* Badges */}
            <div className="pt-4 flex flex-wrap gap-2">
              <span className="px-3 py-1 rounded-full text-xs font-mono bg-slate-900 text-cyan-300 border border-cyan-500/30">
                pgvector Semantic Search
              </span>
              <span className="px-3 py-1 rounded-full text-xs font-mono bg-slate-900 text-cyan-300 border border-cyan-500/30">
                Runbook Traceability
              </span>
              <span className="px-3 py-1 rounded-full text-xs font-mono bg-slate-900 text-emerald-300 border border-emerald-500/30">
                Zero-Unverified-Action Buffer
              </span>
            </div>
          </div>

          {/* Visual Right (6 cols) */}
          <div className="lg:col-span-6 rounded-2xl sm:rounded-3xl border border-white/10 bg-slate-950/90 backdrop-blur-xl overflow-hidden shadow-2xl">
            <div className="px-5 py-3.5 bg-black/60 border-b border-white/10 flex items-center justify-between text-xs">
              <span className="font-mono text-slate-400 text-[11px] flex items-center gap-1.5">
                <Database className="w-3.5 h-3.5 text-cyan-400" />
                Active Knowledge Ingestion Mesh
              </span>
              <span className="px-2 py-0.5 rounded text-[10px] font-mono bg-cyan-950 text-cyan-300 border border-cyan-500/40">
                SYNCHRONIZED
              </span>
            </div>

            <div className="p-6 space-y-3 font-mono text-xs sm:text-sm">
              <div className="flex items-center justify-between p-3 rounded-lg bg-black/40 border border-white/5">
                <span className="text-slate-300">Identity & AD SOPs</span>
                <span className="text-emerald-400 font-bold text-xs">Indexed (pgvector Active)</span>
              </div>
              <div className="flex items-center justify-between p-3 rounded-lg bg-black/40 border border-white/5">
                <span className="text-slate-300">VPN & Network Troubleshooting</span>
                <span className="text-cyan-400 font-bold text-xs">Indexed (768-dim Embeddings)</span>
              </div>
              <div className="flex items-center justify-between p-3 rounded-lg bg-black/40 border border-white/5">
                <span className="text-slate-300">M365 & Software Provisioning</span>
                <span className="text-cyan-400 font-bold text-xs">Indexed (Live Vectors)</span>
              </div>
              <div className="flex items-center justify-between p-3 rounded-lg bg-black/40 border border-white/5">
                <span className="text-slate-300">Escalation & P1 Protocols</span>
                <span className="text-sky-400 font-bold text-xs">Indexed (Zero-Tolerance Rules)</span>
              </div>
            </div>

            <div className="p-4 bg-black/80 border-t border-white/10 text-xs font-mono text-slate-400 flex items-center gap-2">
              <Shield className="w-4 h-4 text-emerald-400 shrink-0" />
              <span>Target Status: Hallucination guard active. 100% of remediation actions verified against approved runbooks.</span>
            </div>
          </div>
        </div>

        {/* ── ROW 2: Layers 02 & 03 - Deterministic Policy Guardrails (Visual Left, Text Right) ── */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-14 items-center relative">
          <AmbientGlow variant="zigzag-blue" />

          {/* Visual Left (6 cols) */}
          <div className="lg:col-span-6 order-2 lg:order-1 rounded-2xl sm:rounded-3xl border border-white/10 bg-slate-950/90 backdrop-blur-xl overflow-hidden shadow-2xl">
            <div className="px-5 py-3.5 bg-black/60 border-b border-white/10 flex items-center justify-between text-xs">
              <span className="font-mono text-slate-400 text-[11px] flex items-center gap-1.5">
                <ShieldCheck className="w-3.5 h-3.5 text-cyan-400" />
                Unified Model Topology & Policy Execution Gate
              </span>
              <span className="px-2 py-0.5 rounded text-[10px] font-mono bg-emerald-950 text-emerald-300 border border-emerald-500/40">
                100% GATED
              </span>
            </div>

            {/* Topology Flowchart */}
            <div className="p-6 font-mono text-xs sm:text-sm space-y-4">
              <div className="flex items-center gap-3 p-3 rounded-lg bg-black/40 border border-white/5">
                <span className="text-slate-300">Ingested Ticket</span>
                <span className="text-cyan-400 font-bold">───▶</span>
                <span className="text-cyan-300 font-semibold">AI Intent & Plan Generator</span>
              </div>
              <div className="flex items-center gap-3 p-3 rounded-lg bg-black/40 border border-white/5">
                <span className="text-slate-300">SOP Knowledge</span>
                <span className="text-cyan-400 font-bold">────▶</span>
                <span className="text-emerald-400 font-semibold">Deterministic Policy Engine (Gate)</span>
              </div>
              <div className="flex items-center gap-3 p-3 rounded-lg bg-black/40 border border-white/5">
                <span className="text-emerald-400 font-bold">Policy Approved</span>
                <span className="text-emerald-400 font-bold">──▶</span>
                <span className="text-white font-semibold">Microsoft Graph API Executor</span>
              </div>
              <div className="flex items-center gap-3 p-3 rounded-lg bg-black/40 border border-white/5">
                <span className="text-amber-400 font-bold">Policy Rejected</span>
                <span className="text-amber-400 font-bold">──▶</span>
                <span className="text-amber-300 font-semibold">Human-in-the-Loop Escalation Queue</span>
              </div>
            </div>

            <div className="p-4 bg-black/80 border-t border-white/10 text-xs font-mono text-slate-400 flex items-center gap-2">
              <Zap className="w-4 h-4 text-cyan-400 shrink-0" />
              <span>Status: 100% of destructive operations gated by deterministic policy rules.</span>
            </div>
          </div>

          {/* Text Right (6 cols) */}
          <div className="lg:col-span-6 order-1 lg:order-2 space-y-6 text-left">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-950/80 border border-emerald-500/30 text-xs font-mono font-semibold text-emerald-300">
              <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
              <span>02 & 03 · DETERMINISTIC POLICY GUARDRAILS</span>
            </div>

            <h3 className="text-2xl sm:text-4xl font-extrabold text-white tracking-tight leading-snug">
              Deterministic policy guardrails with automated escalation.
            </h3>

            <p className="text-slate-300 text-sm sm:text-base leading-relaxed">
              Before any remediation action touches production infrastructure, our deterministic policy engine evaluates permissions, user risk, and action blast radius. High-risk operations are automatically routed to human administrators.
            </p>

            <div className="space-y-3 pt-2">
              <div className="flex items-start gap-3">
                <div className="w-5 h-5 rounded-full bg-emerald-500/10 border border-emerald-500/30 flex items-center justify-center shrink-0 mt-0.5">
                  <Check className="w-3 h-3 text-emerald-400" />
                </div>
                <span className="text-sm text-slate-300 leading-relaxed">
                  Code-level deterministic policy evaluation separating AI planning from execution authority
                </span>
              </div>
              <div className="flex items-start gap-3">
                <div className="w-5 h-5 rounded-full bg-emerald-500/10 border border-emerald-500/30 flex items-center justify-center shrink-0 mt-0.5">
                  <Check className="w-3 h-3 text-emerald-400" />
                </div>
                <span className="text-sm text-slate-300 leading-relaxed">
                  Strict boundary enforcement preventing unauthorized password resets or elevated group grants
                </span>
              </div>
              <div className="flex items-start gap-3">
                <div className="w-5 h-5 rounded-full bg-emerald-500/10 border border-emerald-500/30 flex items-center justify-center shrink-0 mt-0.5">
                  <Check className="w-3 h-3 text-emerald-400" />
                </div>
                <span className="text-sm text-slate-300 leading-relaxed">
                  Automatic Jira/ServiceNow escalation with enriched AI diagnostic context for L2/L3 engineers
                </span>
              </div>
            </div>

            {/* Badges */}
            <div className="pt-4 flex flex-wrap gap-2">
              <span className="px-3 py-1 rounded-full text-xs font-mono bg-slate-900 text-cyan-300 border border-cyan-500/30">
                Deterministic Policies
              </span>
              <span className="px-3 py-1 rounded-full text-xs font-mono bg-slate-900 text-emerald-300 border border-emerald-500/30">
                Risk Gated
              </span>
              <span className="px-3 py-1 rounded-full text-xs font-mono bg-slate-900 text-cyan-300 border border-cyan-500/30">
                Zero Rogue Executions
              </span>
            </div>
          </div>
        </div>

        {/* ── ROW 3: Layer 04 - Direct Enterprise Tool Execution & Graph API (Text Left, Visual Right) ── */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-14 items-center relative">
          <AmbientGlow variant="zigzag-cyan" />

          {/* Text Left (6 cols) */}
          <div className="lg:col-span-6 space-y-6 text-left">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-950/80 border border-cyan-500/30 text-xs font-mono font-semibold text-cyan-300">
              <Cpu className="w-3.5 h-3.5 text-cyan-400" />
              <span>04 · DIRECT ENTERPRISE TOOL EXECUTION & GRAPH API</span>
            </div>

            <h3 className="text-2xl sm:text-4xl font-extrabold text-white tracking-tight leading-snug">
              Direct Microsoft Graph & ITSM API orchestration.
            </h3>

            <p className="text-slate-300 text-sm sm:text-base leading-relaxed">
              Execute remediation directly in enterprise directory and cloud systems without intermediate manual intervention. Unlocks AD accounts, resets passwords, provisions group memberships, and synchronizes resolution notes in real time.
            </p>

            <div className="space-y-3 pt-2">
              <div className="flex items-start gap-3">
                <div className="w-5 h-5 rounded-full bg-cyan-500/10 border border-cyan-500/30 flex items-center justify-center shrink-0 mt-0.5">
                  <Check className="w-3 h-3 text-cyan-400" />
                </div>
                <span className="text-sm text-slate-300 leading-relaxed">
                  Microsoft Graph API client executing tenant-scoped user unlocks and security group updates
                </span>
              </div>
              <div className="flex items-start gap-3">
                <div className="w-5 h-5 rounded-full bg-cyan-500/10 border border-cyan-500/30 flex items-center justify-center shrink-0 mt-0.5">
                  <Check className="w-3 h-3 text-cyan-400" />
                </div>
                <span className="text-sm text-slate-300 leading-relaxed">
                  Automated status transitions in Jira ('In Progress' ➔ 'Resolved') with rich ADF resolution comments
                </span>
              </div>
              <div className="flex items-start gap-3">
                <div className="w-5 h-5 rounded-full bg-cyan-500/10 border border-cyan-500/30 flex items-center justify-center shrink-0 mt-0.5">
                  <Check className="w-3 h-3 text-cyan-400" />
                </div>
                <span className="text-sm text-slate-300 leading-relaxed">
                  Immutable audit logging to PostgreSQL capturing timestamp, agent name, payload, and result
                </span>
              </div>
            </div>

            {/* Badges */}
            <div className="pt-4 flex flex-wrap gap-2">
              <span className="px-3 py-1 rounded-full text-xs font-mono bg-slate-900 text-cyan-300 border border-cyan-500/30">
                Microsoft Graph API
              </span>
              <span className="px-3 py-1 rounded-full text-xs font-mono bg-slate-900 text-cyan-300 border border-cyan-500/30">
                Jira Cloud REST v3
              </span>
              <span className="px-3 py-1 rounded-full text-xs font-mono bg-slate-900 text-emerald-300 border border-emerald-500/30">
                Immutable Audit Trail
              </span>
            </div>
          </div>

          {/* Visual Right (6 cols) */}
          <div className="lg:col-span-6 rounded-2xl sm:rounded-3xl border border-white/10 bg-slate-950/90 backdrop-blur-xl overflow-hidden shadow-2xl">
            <div className="px-5 py-3.5 bg-black/60 border-b border-white/10 flex items-center justify-between text-xs">
              <span className="font-mono text-slate-400 text-[11px] flex items-center gap-1.5">
                <Terminal className="w-3.5 h-3.5 text-cyan-400" />
                Execution Engine Telemetry
              </span>
              <span className="px-2 py-0.5 rounded text-[10px] font-mono bg-emerald-950 text-emerald-300 border border-emerald-500/40">
                ALL SYSTEMS OPERATIONAL
              </span>
            </div>

            <div className="p-6 space-y-3 font-mono text-xs sm:text-sm">
              <div className="p-3 rounded-lg bg-black/40 border border-white/5 space-y-1">
                <div className="text-[10px] text-slate-400 uppercase">ACTION EXECUTED</div>
                <div className="text-cyan-300 font-bold">PATCH https://graph.microsoft.com/v1.0/users/john.doe@vtab.com</div>
                <div className="text-[11px] text-emerald-400">accountEnabled: true · passwordPolicies: None · HTTP 204 No Content</div>
              </div>
              <div className="p-3 rounded-lg bg-black/40 border border-white/5 space-y-1">
                <div className="text-[10px] text-slate-400 uppercase">ITSM SYNC STATUS</div>
                <div className="text-white font-bold">Jira Ticket KAN-4920 ➔ Status: Resolved</div>
                <div className="text-[11px] text-slate-400">Atlassian Document Format (ADF) comment posted with runbook evidence</div>
              </div>
              <div className="p-3 rounded-lg bg-black/40 border border-white/5 space-y-1">
                <div className="text-[10px] text-slate-400 uppercase">POSTGRESQL AUDIT LEDGER</div>
                <div className="text-slate-300 font-mono text-[11px]">Record #98412 committed with SHA-256 payload integrity hash</div>
              </div>
            </div>

            <div className="p-4 bg-black/80 border-t border-white/10 text-xs font-mono text-slate-400 flex items-center gap-2">
              <Lock className="w-4 h-4 text-emerald-400 shrink-0" />
              <span>Audit Lineage: Every action cryptographically committed to immutable database ledger.</span>
            </div>
          </div>
        </div>

      </div>
    </section>
  );
};
