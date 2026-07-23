import React, { useState } from 'react';
import { X, Terminal, Sparkles, Play, RefreshCw, FileSpreadsheet, Bot, Check, ArrowRight, Layers, Cpu } from 'lucide-react';

interface InteractiveAiSandboxModalProps {
  isOpen: boolean;
  onClose: () => void;
  onScheduleDemo: (workloadTitle?: string) => void;
}

const WORKLOAD_TEMPLATES = [
  {
    id: 'dashboard-gen',
    title: 'Excel to Power BI Dashboard',
    prompt: 'Upload global_sales_q3.xlsx and generate Power BI DAX KPIs for YoY growth and region breakdown.',
    icon: 'FileSpreadsheet'
  },
  {
    id: 'qlik-trans',
    title: 'Qlik to Power BI Converter',
    prompt: 'Parse Qlik script sum({<Year={2025}, Region={"APAC"}>} Sales) and convert to DAX measure.',
    icon: 'Layers'
  },
  {
    id: 'meeting-summary',
    title: 'AI Meeting Assistant',
    prompt: 'Summarize 60-min product strategy call, extract decisions, and auto-assign Jira tasks.',
    icon: 'Bot'
  },
  {
    id: 'l1-support',
    title: 'AI L1 IT Support Agent',
    prompt: 'Troubleshoot user VPN connection error #VPN-808 and reset Okta MFA token.',
    icon: 'Cpu'
  }
];

export const InteractiveAiSandboxModal: React.FC<InteractiveAiSandboxModalProps> = ({
  isOpen,
  onClose,
  onScheduleDemo
}) => {
  const [selectedTemplate, setSelectedTemplate] = useState(WORKLOAD_TEMPLATES[0]);
  const [customPrompt, setCustomPrompt] = useState(WORKLOAD_TEMPLATES[0].prompt);
  const [isRunning, setIsRunning] = useState(false);
  const [output, setOutput] = useState<string | null>(null);

  if (!isOpen) return null;

  const handleRun = () => {
    setIsRunning(true);
    setOutput(null);

    setTimeout(() => {
      setIsRunning(false);
      if (selectedTemplate.id === 'dashboard-gen') {
        setOutput(
          `✅ [VTab AI Dashboard Engine Processed File]:
--------------------------------------------------
📊 Analyzed 24,190 records across 6 columns.
• Calculated DAX Measure: 
  Sales YoY % = DIVIDE( [Total Sales Current Year] - [Total Sales Prior Year], [Total Sales Prior Year], 0 )
• Calculated DAX Measure: 
  APAC Region Margin = CALCULATE( SUM(Sales[Profit]), Sales[Region] = "APAC" )
--------------------------------------------------
🚀 Power BI Model Generated (.pbix file ready). 
Published to https://bi.vtabsquare.com/exec-q3-summary`
        );
      } else if (selectedTemplate.id === 'qlik-trans') {
        setOutput(
          `⚡ [VTab Migration Engine AST Translator]:
--------------------------------------------------
Inbound Qlik Expression: sum({<Year={2025}, Region={"APAC"}>} Sales)
Calculated DAX Measure:
--------------------------------------------------
Sales_2025_APAC = 
CALCULATE(
    SUM(Sales[SalesAmount]),
    'Calendar'[Year] = 2025,
    Customer[Region] = "APAC"
)
--------------------------------------------------
Accuracy Score: 100% | Reconstructed visual relationships without data loss.`
        );
      } else if (selectedTemplate.id === 'meeting-summary') {
        setOutput(
          `🤖 [VTab Autonomous Executive Assistant]:
--------------------------------------------------
Meeting Duration: 58 mins | Speakers: 4 Identified
Executive Summary:
• Approved $150K allocation for Q4 AI migration pipeline.
• Deferred legacy database decommissioning to Q1 2027.

Assigned Action Items:
1. @Marcus (Data Lead) -> Provision Azure Synapse sandbox. [Created Jira #ENG-492]
2. @Elena (Ops) -> Circulate SOC2 security guidelines to team. [Created Jira #OPS-109]
--------------------------------------------------
✉️ Sent summary minutes to all 4 attendees.`
        );
      } else {
        setOutput(
          `🛠️ [VTab L1 IT Support Agent]:
--------------------------------------------------
Incident #INC-8902: User reporting VPN TLS handshake failure.
1. Queried Okta Logs: User credential active; MFA token expired at 08:30 AM.
2. Executed Automated Workflow: Reset MFA token & re-sent push verification.
3. Verified Connection: User VPN re-established successfully.
--------------------------------------------------
Ticket status changed to CLOSED. Zero human support hours consumed.`
        );
      }
    }, 1300);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-xl animate-in fade-in duration-200">
      <div className="relative w-full max-w-3xl backdrop-blur-xl bg-[#02040a]/90 rounded-2xl border border-white/10 p-6 sm:p-8 shadow-2xl overflow-hidden max-h-[92vh] overflow-y-auto space-y-6">
        
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-2 rounded-xl text-slate-400 hover:text-white bg-slate-900 border border-slate-800 transition-colors cursor-pointer"
          id="close-sandbox-modal-btn"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Header */}
        <div className="space-y-1">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-950 border border-cyan-500/30 text-cyan-300 text-[11px] font-semibold">
            <Sparkles className="w-3.5 h-3.5 text-cyan-400 animate-spin" />
            <span>VTab AI Studio Sandbox</span>
          </div>
          <h3 className="text-2xl font-bold text-white tracking-tight">Interactive AI Workload Studio</h3>
          <p className="text-xs text-slate-400">
            Select a practical AI workload or type a custom query to witness VTab Square AI execution in real time.
          </p>
        </div>

        {/* Workload Selectors */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
          {WORKLOAD_TEMPLATES.map((tpl) => {
            const isActive = tpl.id === selectedTemplate.id;
            return (
              <button
                key={tpl.id}
                onClick={() => {
                  setSelectedTemplate(tpl);
                  setCustomPrompt(tpl.prompt);
                  setOutput(null);
                }}
                className={`p-3 rounded-xl text-left border text-xs font-semibold transition-all cursor-pointer ${
                  isActive
                    ? 'bg-blue-950/80 border-blue-500/80 text-white shadow-lg shadow-blue-500/20'
                    : 'bg-slate-900/80 border-slate-800 text-slate-400 hover:text-slate-200'
                }`}
              >
                <p className="truncate">{tpl.title}</p>
              </button>
            );
          })}
        </div>

        {/* Prompt Input */}
        <div className="space-y-2">
          <label className="text-xs font-semibold text-slate-300 flex items-center justify-between">
            <span>Workload Instructions / Prompt:</span>
            <span className="text-[10px] text-slate-500 font-mono">Model: VTab-LLM-v2.4</span>
          </label>
          <textarea
            rows={3}
            value={customPrompt}
            onChange={(e) => setCustomPrompt(e.target.value)}
            className="w-full bg-slate-950 border border-slate-800 focus:border-blue-500 rounded-xl p-3 text-xs text-slate-200 font-mono focus:outline-none focus:ring-1 focus:ring-blue-500 resize-none"
          />
        </div>

        {/* Run CTA */}
        <div className="flex items-center justify-between">
          <span className="text-xs text-slate-400 flex items-center gap-1.5">
            <Terminal className="w-3.5 h-3.5 text-blue-400" />
            Runs in isolated sandboxed Cloud container
          </span>

          <button
            onClick={handleRun}
            disabled={isRunning}
            className="px-6 py-2.5 rounded-xl text-xs font-semibold text-white bg-blue-600 hover:bg-blue-500 shadow-lg shadow-blue-600/30 flex items-center gap-2 cursor-pointer transition-all disabled:opacity-50"
            id="run-sandbox-btn"
          >
            {isRunning ? (
              <>
                <RefreshCw className="w-4 h-4 animate-spin" />
                <span>Processing Model Pipeline...</span>
              </>
            ) : (
              <>
                <Play className="w-4 h-4 fill-current" />
                <span>Execute AI Workload</span>
              </>
            )}
          </button>
        </div>

        {/* Terminal Output Display */}
        <div className="bg-slate-950 rounded-xl border border-slate-800/80 p-4 font-mono text-xs text-slate-200 min-h-[160px] relative">
          <div className="flex items-center justify-between text-[10px] text-slate-500 pb-2 mb-2 border-b border-slate-900">
            <span>TERMINAL OUTPUT</span>
            <span>STATUS: {isRunning ? 'EXECUTING' : output ? 'COMPLETED' : 'IDLE'}</span>
          </div>

          {isRunning ? (
            <div className="flex flex-col items-center justify-center h-28 space-y-2 text-slate-400">
              <Cpu className="w-6 h-6 text-blue-400 animate-spin" />
              <p className="text-xs">Parsing AST, computing DAX, & synthesizing AI agents...</p>
            </div>
          ) : output ? (
            <pre className="whitespace-pre-wrap text-emerald-300 font-mono leading-relaxed text-xs">
              {output}
            </pre>
          ) : (
            <div className="text-slate-500 italic py-8 text-center">
              Click 'Execute AI Workload' above to view live synthesis output.
            </div>
          )}
        </div>

        {/* Bottom Bar */}
        <div className="pt-2 flex items-center justify-between border-t border-slate-800 text-xs">
          <span className="text-slate-400">Need this tailored to your enterprise data?</span>
          <button
            onClick={() => {
              onClose();
              onScheduleDemo(selectedTemplate.title);
            }}
            className="px-4 py-2 rounded-xl text-xs font-semibold text-white bg-purple-600 hover:bg-purple-500 cursor-pointer shadow-md"
          >
            Schedule Enterprise Trial
          </button>
        </div>

      </div>
    </div>
  );
};
