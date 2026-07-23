import React from 'react';
import { 
  BarChart3, 
  ArrowLeftRight, 
  Home, 
  Calculator, 
  ScanFace, 
  PackageCheck, 
  Headphones, 
  DatabaseZap, 
  Sparkles,
  Cpu,
  FileCode,
  Layers,
  CheckCircle2,
  Activity,
  Boxes,
  Workflow,
  Zap,
  ShieldCheck,
  Binary
} from 'lucide-react';

interface ProductCardVisualizationProps {
  productId: string;
  isLightMode?: boolean;
}

export const ProductCardVisualization: React.FC<ProductCardVisualizationProps> = ({ 
  productId,
  isLightMode = false 
}) => {
  switch (productId) {
    case 'ai-reporting':
      return (
        <div className="w-full h-full p-3.5 flex flex-col justify-between relative font-mono text-[11px] overflow-hidden select-none">
          {/* Animated Neural Connections background */}
          <div className="absolute inset-0 opacity-20 pointer-events-none bg-[radial-gradient(#3b82f6_1px,transparent_1px)] [background-size:12px_12px]" />

          {/* Top Pipeline header */}
          <div className="flex items-center justify-between z-10">
            <span className="flex items-center gap-1 text-[10px] text-blue-400 font-extrabold uppercase tracking-wider">
              <Cpu className="w-3 h-3 text-cyan-400 animate-pulse" />
              NLQ-to-DAX Engine
            </span>
            <span className="px-1.5 py-0.5 rounded bg-blue-500/20 text-cyan-300 text-[9px] font-bold border border-blue-400/30">
              Live Query
            </span>
          </div>

          {/* Schematic Diagram Flow */}
          <div className="grid grid-cols-3 gap-1.5 items-center my-2 z-10">
            <div className={`p-2 rounded-lg border text-center flex flex-col items-center justify-center ${
              isLightMode ? 'bg-white/90 border-blue-200 text-slate-800' : 'bg-slate-900/90 border-slate-700 text-white'
            }`}>
              <span className="text-[9px] text-slate-400">Natural Text</span>
              <span className="font-bold text-[10px] text-blue-400">"Q3 Revenue?"</span>
            </div>

            <div className="flex flex-col items-center justify-center">
              <div className="h-0.5 w-full bg-gradient-to-r from-blue-500 via-cyan-400 to-indigo-500 animate-pulse relative">
                <div className="absolute -top-1 right-1/2 w-2 h-2 rounded-full bg-cyan-300 animate-ping" />
              </div>
              <span className="text-[8px] text-cyan-300 mt-1">Transformer</span>
            </div>

            <div className={`p-2 rounded-lg border text-center flex flex-col items-center justify-center ${
              isLightMode ? 'bg-white/90 border-blue-200 text-slate-800' : 'bg-slate-900/90 border-slate-700 text-white'
            }`}>
              <span className="text-[9px] text-slate-400">Power BI DAX</span>
              <span className="font-bold text-[10px] text-emerald-400">SUM(Sales[Val])</span>
            </div>
          </div>

          {/* Micro Analytics Chart Bar Placeholder */}
          <div className="flex items-end gap-1 h-6 pt-1 z-10 border-t border-white/10">
            <div className="w-1/5 bg-blue-500/40 rounded-t h-40%" />
            <div className="w-1/5 bg-blue-500/60 rounded-t h-60%" />
            <div className="w-1/5 bg-cyan-400 rounded-t h-85%" />
            <div className="w-1/5 bg-blue-500 rounded-t h-70%" />
            <div className="w-1/5 bg-indigo-500 rounded-t h-100% animate-pulse" />
          </div>
        </div>
      );

    case 'qlik-migration':
      return (
        <div className="w-full h-full p-3.5 flex flex-col justify-between relative font-mono text-[11px] overflow-hidden select-none">
          <div className="flex items-center justify-between z-10">
            <span className="flex items-center gap-1 text-[10px] text-purple-400 font-extrabold uppercase tracking-wider">
              <ArrowLeftRight className="w-3 h-3 text-purple-300 animate-spin-slow" />
              AST Script Transpiler
            </span>
            <span className="px-1.5 py-0.5 rounded bg-purple-500/20 text-purple-300 text-[9px] font-bold border border-purple-400/30">
              99.8% Match
            </span>
          </div>

          {/* Document AST Flow */}
          <div className="flex items-center justify-around z-10 my-2">
            <div className={`p-2 rounded-lg border text-left flex flex-col ${
              isLightMode ? 'bg-white/90 border-purple-200 text-slate-800' : 'bg-slate-900/90 border-purple-900/50 text-white'
            }`}>
              <span className="text-[9px] text-purple-400 font-bold">Qlik QVF</span>
              <span className="text-[9px] text-slate-400">LOAD * RESIDENT</span>
            </div>

            <Zap className="w-4 h-4 text-purple-400 animate-pulse" />

            <div className={`p-2 rounded-lg border text-left flex flex-col ${
              isLightMode ? 'bg-white/90 border-purple-200 text-slate-800' : 'bg-slate-900/90 border-purple-900/50 text-white'
            }`}>
              <span className="text-[9px] text-cyan-400 font-bold">PBI DAX Model</span>
              <span className="text-[9px] text-emerald-400">CALCULATE(...)</span>
            </div>
          </div>

          <div className="flex items-center justify-between text-[9px] text-slate-400 z-10 border-t border-white/10 pt-1">
            <span>Set Analysis Translation</span>
            <span className="text-emerald-400 font-bold flex items-center gap-0.5">
              <CheckCircle2 className="w-3 h-3" /> Zero Manual Rewrite
            </span>
          </div>
        </div>
      );

    case 'gbti-builder':
      return (
        <div className="w-full h-full p-3.5 flex flex-col justify-between relative font-mono text-[11px] overflow-hidden select-none">
          <div className="flex items-center justify-between z-10">
            <span className="flex items-center gap-1 text-[10px] text-cyan-400 font-extrabold uppercase tracking-wider">
              <Home className="w-3 h-3 text-cyan-300" />
              CAD Vector Blueprint AI
            </span>
            <span className="px-1.5 py-0.5 rounded bg-cyan-500/20 text-cyan-300 text-[9px] font-bold border border-cyan-400/30">
              ±0.2mm Grid
            </span>
          </div>

          {/* Blueprint Grid Lines */}
          <div className="relative h-12 my-1 border border-cyan-500/30 rounded-lg p-1.5 flex items-center justify-between bg-cyan-950/20 z-10 overflow-hidden">
            <div className="absolute inset-0 bg-[linear-gradient(to_right,#06b6d415_1px,transparent_1px),linear-gradient(to_bottom,#06b6d415_1px,transparent_1px)] bg-[size:8px_8px]" />
            
            <div className="z-10 flex flex-col">
              <span className="text-[9px] text-cyan-300 font-bold">Wall Mesh #402</span>
              <span className="text-[8px] text-slate-400">Dim: 4500mm x 2800mm</span>
            </div>

            <div className="z-10 px-2 py-0.5 rounded bg-cyan-400 text-slate-950 text-[9px] font-bold shadow animate-pulse">
              Verified
            </div>
          </div>

          <div className="flex items-center justify-between text-[9px] text-slate-400 z-10 border-t border-white/10 pt-1">
            <span>DXF Layout Parsing</span>
            <span className="text-cyan-400 font-bold">100% Structural Sync</span>
          </div>
        </div>
      );

    case 'buildsmart-estimator':
      return (
        <div className="w-full h-full p-3.5 flex flex-col justify-between relative font-mono text-[11px] overflow-hidden select-none">
          <div className="flex items-center justify-between z-10">
            <span className="flex items-center gap-1 text-[10px] text-emerald-400 font-extrabold uppercase tracking-wider">
              <Calculator className="w-3 h-3 text-emerald-300" />
              BoQ Vision Extractor
            </span>
            <span className="px-1.5 py-0.5 rounded bg-emerald-500/20 text-emerald-300 text-[9px] font-bold border border-emerald-400/30">
              Sub-second
            </span>
          </div>

          {/* BoQ Extraction Line Items */}
          <div className="space-y-1 my-1.5 z-10">
            <div className="flex justify-between items-center bg-emerald-950/30 p-1 rounded border border-emerald-500/20 text-[9px]">
              <span className="text-slate-300">Concrete Slab C30</span>
              <span className="text-emerald-400 font-bold">142 m³ ($28.4k)</span>
            </div>
            <div className="flex justify-between items-center bg-emerald-950/30 p-1 rounded border border-emerald-500/20 text-[9px]">
              <span className="text-slate-300">Steel Rebar Grade 60</span>
              <span className="text-emerald-400 font-bold">18.5 Tons ($14.8k)</span>
            </div>
          </div>

          <div className="flex items-center justify-between text-[9px] text-slate-400 z-10 border-t border-white/10 pt-1">
            <span>Automatic Costing</span>
            <span className="text-emerald-400 font-bold">Accuracy &gt; 99%</span>
          </div>
        </div>
      );

    case 'faceauth':
      return (
        <div className="w-full h-full p-3.5 flex flex-col justify-between relative font-mono text-[11px] overflow-hidden select-none">
          <div className="flex items-center justify-between z-10">
            <span className="flex items-center gap-1 text-[10px] text-amber-400 font-extrabold uppercase tracking-wider">
              <ScanFace className="w-3 h-3 text-amber-300 animate-pulse" />
              3D Mesh Liveness AI
            </span>
            <span className="px-1.5 py-0.5 rounded bg-amber-500/20 text-amber-300 text-[9px] font-bold border border-amber-400/30">
              14ms Auth
            </span>
          </div>

          {/* Reticle Scanner HUD */}
          <div className="relative my-1 h-11 border border-amber-500/40 rounded-lg flex items-center justify-center bg-amber-950/20 overflow-hidden z-10">
            <div className="absolute inset-x-0 h-0.5 bg-amber-400/80 animate-bounce shadow-lg shadow-amber-400" />
            
            <div className="flex items-center gap-2">
              <ShieldCheck className="w-4 h-4 text-amber-400" />
              <span className="text-[10px] text-amber-200 font-bold uppercase tracking-wider">
                Anti-Spoofing: PASSED
              </span>
            </div>
          </div>

          <div className="flex items-center justify-between text-[9px] text-slate-400 z-10 border-t border-white/10 pt-1">
            <span>FAR Error Rate</span>
            <span className="text-amber-400 font-bold">&lt; 0.0001%</span>
          </div>
        </div>
      );

    case 'pack-opt':
      return (
        <div className="w-full h-full p-3.5 flex flex-col justify-between relative font-mono text-[11px] overflow-hidden select-none">
          <div className="flex items-center justify-between z-10">
            <span className="flex items-center gap-1 text-[10px] text-indigo-400 font-extrabold uppercase tracking-wider">
              <Boxes className="w-3 h-3 text-indigo-300" />
              Volumetric Cargo Bin AI
            </span>
            <span className="px-1.5 py-0.5 rounded bg-indigo-500/20 text-indigo-300 text-[9px] font-bold border border-indigo-400/30">
              94.2% Fill
            </span>
          </div>

          {/* Container Grid Visualizer */}
          <div className="grid grid-cols-4 gap-1 my-1.5 z-10">
            <div className="h-7 bg-indigo-600/60 rounded border border-indigo-400/40 flex items-center justify-center text-[8px] text-white font-bold">Box A</div>
            <div className="h-7 bg-indigo-600/80 rounded border border-indigo-400/40 flex items-center justify-center text-[8px] text-white font-bold">Box B</div>
            <div className="h-7 bg-indigo-500/90 rounded border border-indigo-400/40 flex items-center justify-center text-[8px] text-white font-bold">Box C</div>
            <div className="h-7 bg-cyan-500/80 rounded border border-cyan-400/40 flex items-center justify-center text-[8px] text-white font-bold animate-pulse">Opt</div>
          </div>

          <div className="flex items-center justify-between text-[9px] text-slate-400 z-10 border-t border-white/10 pt-1">
            <span>Freight Savings</span>
            <span className="text-indigo-300 font-bold">-28% Freight Cost</span>
          </div>
        </div>
      );

    case 'ai-support':
      return (
        <div className="w-full h-full p-3.5 flex flex-col justify-between relative font-mono text-[11px] overflow-hidden select-none">
          <div className="flex items-center justify-between z-10">
            <span className="flex items-center gap-1 text-[10px] text-rose-400 font-extrabold uppercase tracking-wider">
              <Headphones className="w-3 h-3 text-rose-300 animate-bounce" />
              Autonomous Agent Loop
            </span>
            <span className="px-1.5 py-0.5 rounded bg-rose-500/20 text-rose-300 text-[9px] font-bold border border-rose-400/30">
              Zero Human
            </span>
          </div>

          {/* Ticket Resolution Workflow */}
          <div className="flex items-center justify-between bg-rose-950/30 border border-rose-500/30 p-1.5 rounded-lg my-1 z-10 text-[9px]">
            <span className="text-slate-300">Ticket #8042 (Okta MFA)</span>
            <span className="text-emerald-400 font-bold bg-emerald-950/60 px-1.5 py-0.5 rounded">
              Resolved in 4s
            </span>
          </div>

          <div className="flex items-center justify-between text-[9px] text-slate-400 z-10 border-t border-white/10 pt-1">
            <span>ServiceNow / Jira API</span>
            <span className="text-rose-300 font-bold">85% Auto Deflection</span>
          </div>
        </div>
      );

    case 'pg-to-sql':
      return (
        <div className="w-full h-full p-3.5 flex flex-col justify-between relative font-mono text-[11px] overflow-hidden select-none">
          <div className="flex items-center justify-between z-10">
            <span className="flex items-center gap-1 text-[10px] text-teal-400 font-extrabold uppercase tracking-wider">
              <DatabaseZap className="w-3 h-3 text-teal-300" />
              Postgres → T-SQL Engine
            </span>
            <span className="px-1.5 py-0.5 rounded bg-teal-500/20 text-teal-300 text-[9px] font-bold border border-teal-400/30">
              Safe Sync
            </span>
          </div>

          <div className="flex items-center justify-around z-10 my-2 text-[9px]">
            <div className={`p-1.5 rounded border ${isLightMode ? 'bg-white border-teal-200 text-slate-800' : 'bg-slate-900 border-teal-800 text-teal-200'}`}>
              PostgreSQL DDL
            </div>
            <Activity className="w-3.5 h-3.5 text-teal-400 animate-pulse" />
            <div className={`p-1.5 rounded border ${isLightMode ? 'bg-white border-teal-200 text-slate-800' : 'bg-slate-900 border-teal-800 text-teal-200'}`}>
              MS SQL Server
            </div>
          </div>

          <div className="flex items-center justify-between text-[9px] text-slate-400 z-10 border-t border-white/10 pt-1">
            <span>Stored Proc & Trigger</span>
            <span className="text-teal-300 font-bold">100% Type Safe</span>
          </div>
        </div>
      );

    default:
      return (
        <div className="w-full h-full p-3 flex items-center justify-center text-xs text-slate-400">
          <Sparkles className="w-5 h-5 text-blue-400 mr-2" />
          <span>VTab AI System Architecture</span>
        </div>
      );
  }
};
