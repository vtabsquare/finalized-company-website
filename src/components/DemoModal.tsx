import React, { useState, useEffect } from 'react';
import { 
  X, 
  Calendar, 
  CheckCircle2, 
  Sparkles, 
  Building2, 
  User, 
  Mail, 
  Users, 
  MessageSquare, 
  Send, 
  Loader2, 
  ShieldCheck, 
  Zap, 
  Award, 
  Clock, 
  ArrowRight, 
  Lock, 
  Globe, 
  Star,
  Check
} from 'lucide-react';
import { DemoFormState } from '../types';
import { sendDemoRequestEmails } from '../lib/brevoService';

interface DemoModalProps {
  isOpen: boolean;
  onClose: () => void;
  initialInterest?: string;
}

const TEAM_SIZES = ['1-10', '10-50', '50-250', '250+ Enterprise'];

const INTEREST_AREAS = [
  'AI Reporting Platform',
  'Qlik to Power BI Migration',
  'AI Employees & Agents',
  'GBTI Smart Home Builder',
  'BuildSmart Estimator',
  'FaceAuth Biometrics',
  'PostgreSQL / SQL Server Migration',
  'Custom AI Development'
];

export const DemoModal: React.FC<DemoModalProps> = ({
  isOpen,
  onClose,
  initialInterest = ''
}) => {
  const [form, setForm] = useState<DemoFormState>({
    fullName: '',
    workEmail: '',
    companyName: '',
    teamSize: '10-50',
    interestArea: initialInterest || 'AI Reporting Platform',
    preferredDate: '',
    message: ''
  });

  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (initialInterest) {
      setForm((prev) => ({ ...prev, interestArea: initialInterest }));
    }
  }, [initialInterest]);

  if (!isOpen) return null;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    await sendDemoRequestEmails(form);
    setLoading(false);
    setSubmitted(true);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 md:p-6 bg-slate-950/85 backdrop-blur-2xl animate-in fade-in duration-300 overflow-y-auto">
      {/* Background Neural Glows */}
      <div className="absolute w-[600px] h-[600px] bg-cyan-500/10 rounded-full blur-[140px] pointer-events-none animate-pulse" />
      <div className="absolute w-[500px] h-[500px] bg-purple-500/10 rounded-full blur-[140px] pointer-events-none" />

      {/* Main 2-Column Executive Modal Container */}
      <div className="relative w-full max-w-4xl bg-slate-950/90 rounded-3xl border border-white/15 shadow-[0_0_100px_rgba(6,182,212,0.15)] overflow-hidden my-8 flex flex-col lg:flex-row backdrop-blur-3xl">
        
        {/* Illuminated Top Neon Border */}
        <div className="absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-cyan-500 via-blue-500 to-purple-500 z-50" />

        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 z-50 p-2.5 rounded-2xl text-slate-400 hover:text-white bg-slate-900/80 hover:bg-slate-800 border border-white/10 hover:border-white/20 transition-all cursor-pointer shadow-lg group"
          id="close-demo-modal-btn"
          aria-label="Close modal"
        >
          <X className="w-5 h-5 group-hover:rotate-90 transition-transform duration-300" />
        </button>

        {/* LEFT COLUMN: Institutional Trust & Architecture Hub (40% width on desktop) */}
        <div className="lg:w-5/12 bg-gradient-to-b from-slate-900/90 via-slate-950 to-slate-950 p-6 sm:p-8 border-b lg:border-b-0 lg:border-r border-white/10 flex flex-col justify-between relative overflow-hidden">
          {/* Subtle Grid Background */}
          <div className="absolute inset-0 bg-[linear-gradient(to_right,#1e293b15_1px,transparent_1px),linear-gradient(to_bottom,#1e293b15_1px,transparent_1px)] bg-[size:24px_24px] pointer-events-none" />
          
          <div className="relative z-10 space-y-6">
            {/* Security Badge */}
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-cyan-500/10 border border-cyan-500/30 text-cyan-300 text-[11px] font-bold tracking-wider uppercase">
              <ShieldCheck className="w-3.5 h-3.5 text-cyan-400 animate-pulse" />
              <span>SOC2 Type II • Verified SLA</span>
            </div>

            <div className="space-y-2">
              <h3 className="text-2xl sm:text-3xl font-black text-white tracking-tight leading-tight">
                Architect Your <span className="bg-gradient-to-r from-cyan-400 via-blue-400 to-purple-400 bg-clip-text text-transparent">AI Future</span>
              </h3>
              <p className="text-xs sm:text-sm text-slate-400 leading-relaxed">
                Schedule a private 30-minute consultation with senior VTab Square solutions architects to analyze your data pipelines and compute your exact ROI.
              </p>
            </div>

            {/* What to Expect Checklist */}
            <div className="space-y-3 pt-2">
              <div className="flex items-start gap-3 p-3 rounded-2xl bg-white/[0.03] border border-white/5">
                <div className="p-2 rounded-xl bg-cyan-500/15 text-cyan-400 mt-0.5">
                  <Zap className="w-4 h-4" />
                </div>
                <div>
                  <h4 className="text-xs font-bold text-white">Custom ROI Modeling</h4>
                  <p className="text-[11px] text-slate-400 mt-0.5">Live calculation of labor automation savings & speed multipliers.</p>
                </div>
              </div>

              <div className="flex items-start gap-3 p-3 rounded-2xl bg-white/[0.03] border border-white/5">
                <div className="p-2 rounded-xl bg-blue-500/15 text-blue-400 mt-0.5">
                  <Award className="w-4 h-4" />
                </div>
                <div>
                  <h4 className="text-xs font-bold text-white">Migration Pipeline Blueprint</h4>
                  <p className="text-[11px] text-slate-400 mt-0.5">Walkthrough of 10x faster Qlik & SQL data warehouse transitions.</p>
                </div>
              </div>

              <div className="flex items-start gap-3 p-3 rounded-2xl bg-white/[0.03] border border-white/5">
                <div className="p-2 rounded-xl bg-purple-500/15 text-purple-400 mt-0.5">
                  <Lock className="w-4 h-4" />
                </div>
                <div>
                  <h4 className="text-xs font-bold text-white">Zero-Data Retention SLA</h4>
                  <p className="text-[11px] text-slate-400 mt-0.5">Review enterprise security protocols, encryption, and on-prem deployment.</p>
                </div>
              </div>
            </div>
          </div>

          {/* Assigned Architect Card */}
          <div className="relative z-10 mt-8 pt-6 border-t border-white/10 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="relative">
                <div className="w-10 h-10 rounded-full bg-gradient-to-tr from-cyan-500 to-blue-600 flex items-center justify-center text-white font-bold text-xs shadow-lg">
                  VS
                </div>
                <span className="absolute bottom-0 right-0 w-2.5 h-2.5 rounded-full bg-emerald-500 border-2 border-slate-950 animate-ping" />
                <span className="absolute bottom-0 right-0 w-2.5 h-2.5 rounded-full bg-emerald-500 border-2 border-slate-950" />
              </div>
              <div>
                <p className="text-xs font-bold text-white">Solutions Architecture Team</p>
                <p className="text-[10px] text-slate-400 flex items-center gap-1">
                  <Globe className="w-3 h-3 text-cyan-400" /> Live Hub • 2-Hr Response SLA
                </p>
              </div>
            </div>
            <div className="flex items-center gap-1 text-amber-400 text-xs font-bold bg-amber-500/10 px-2 py-1 rounded-lg border border-amber-500/20">
              <Star className="w-3.5 h-3.5 fill-amber-400" />
              <span>5.0</span>
            </div>
          </div>
        </div>

        {/* RIGHT COLUMN: Interactive Form / Success View (60% width on desktop) */}
        <div className="lg:w-7/12 p-6 sm:p-8 lg:p-10 flex flex-col justify-center relative">
          
          {!submitted ? (
            <form onSubmit={handleSubmit} className="space-y-6">
              
              <div className="flex items-center justify-between border-b border-white/10 pb-4">
                <div>
                  <h4 className="text-lg font-black text-white uppercase tracking-wider flex items-center gap-2">
                    <Calendar className="w-4 h-4 text-cyan-400" />
                    <span>Executive Demo Booking</span>
                  </h4>
                  <p className="text-xs text-slate-400 mt-0.5">Please provide your institutional details below.</p>
                </div>
                <span className="text-[11px] font-mono font-semibold text-slate-400 bg-slate-900 px-2.5 py-1 rounded-md border border-slate-800">
                  Step 1 of 1
                </span>
              </div>

              {/* Grid of inputs */}
              <div className="space-y-4">
                
                {/* Full Name & Work Email */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="space-y-1.5">
                    <label className="text-xs font-bold text-slate-300 flex items-center gap-1.5">
                      <User className="w-3.5 h-3.5 text-cyan-400" />
                      Full Name <span className="text-cyan-400">*</span>
                    </label>
                    <input
                      type="text"
                      required
                      value={form.fullName}
                      onChange={(e) => setForm({ ...form, fullName: e.target.value })}
                      placeholder="e.g. Dr. Sarah Jenkins"
                      className="w-full bg-slate-900/80 border border-white/15 rounded-2xl px-4 py-2.5 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-cyan-500 focus:ring-2 focus:ring-cyan-500/20 transition-all shadow-inner"
                    />
                  </div>

                  <div className="space-y-1.5">
                    <label className="text-xs font-bold text-slate-300 flex items-center gap-1.5">
                      <Mail className="w-3.5 h-3.5 text-cyan-400" />
                      Work Email <span className="text-cyan-400">*</span>
                    </label>
                    <input
                      type="email"
                      required
                      value={form.workEmail}
                      onChange={(e) => setForm({ ...form, workEmail: e.target.value })}
                      placeholder="sarah@enterprise.com"
                      className="w-full bg-slate-900/80 border border-white/15 rounded-2xl px-4 py-2.5 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-cyan-500 focus:ring-2 focus:ring-cyan-500/20 transition-all shadow-inner"
                    />
                  </div>
                </div>

                {/* Company Name & Preferred Date */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="space-y-1.5">
                    <label className="text-xs font-bold text-slate-300 flex items-center gap-1.5">
                      <Building2 className="w-3.5 h-3.5 text-cyan-400" />
                      Company / Institution <span className="text-cyan-400">*</span>
                    </label>
                    <input
                      type="text"
                      required
                      value={form.companyName}
                      onChange={(e) => setForm({ ...form, companyName: e.target.value })}
                      placeholder="Acme Global Intelligence"
                      className="w-full bg-slate-900/80 border border-white/15 rounded-2xl px-4 py-2.5 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-cyan-500 focus:ring-2 focus:ring-cyan-500/20 transition-all shadow-inner"
                    />
                  </div>

                  <div className="space-y-1.5">
                    <label className="text-xs font-bold text-slate-300 flex items-center gap-1.5">
                      <Clock className="w-3.5 h-3.5 text-cyan-400" />
                      Preferred Date
                    </label>
                    <input
                      type="date"
                      value={form.preferredDate}
                      onChange={(e) => setForm({ ...form, preferredDate: e.target.value })}
                      className="w-full bg-slate-900/80 border border-white/15 rounded-2xl px-4 py-2.5 text-xs text-white focus:outline-none focus:border-cyan-500 focus:ring-2 focus:ring-cyan-500/20 transition-all shadow-inner"
                    />
                  </div>
                </div>

                {/* Interactive Team Size Selector Pills */}
                <div className="space-y-2">
                  <label className="text-xs font-bold text-slate-300 flex items-center gap-1.5">
                    <Users className="w-3.5 h-3.5 text-cyan-400" />
                    Team Size
                  </label>
                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                    {TEAM_SIZES.map((size) => {
                      const isSelected = form.teamSize === size;
                      return (
                        <button
                          key={size}
                          type="button"
                          onClick={() => setForm({ ...form, teamSize: size })}
                          className={`py-2 px-3 rounded-xl text-xs font-bold transition-all border cursor-pointer flex items-center justify-center gap-1.5 ${
                            isSelected
                              ? 'bg-gradient-to-r from-cyan-500/20 to-blue-500/20 border-cyan-500 text-cyan-300 shadow-[0_0_15px_rgba(6,182,212,0.2)]'
                              : 'bg-slate-900/50 border-white/10 text-slate-400 hover:text-white hover:border-white/25'
                          }`}
                        >
                          {isSelected && <Check className="w-3.5 h-3.5 text-cyan-400" />}
                          <span>{size}</span>
                        </button>
                      );
                    })}
                  </div>
                </div>

                {/* Area of Interest Selector */}
                <div className="space-y-1.5">
                  <label className="text-xs font-bold text-slate-300 flex items-center gap-1.5">
                    <Sparkles className="w-3.5 h-3.5 text-cyan-400" />
                    Primary Intelligence Focus
                  </label>
                  <select
                    value={form.interestArea}
                    onChange={(e) => setForm({ ...form, interestArea: e.target.value })}
                    className="w-full bg-slate-900/90 border border-white/15 rounded-2xl px-4 py-2.5 text-xs font-semibold text-white focus:outline-none focus:border-cyan-500 focus:ring-2 focus:ring-cyan-500/20 transition-all cursor-pointer shadow-inner"
                  >
                    {INTEREST_AREAS.map((area) => (
                      <option key={area} value={area} className="bg-slate-950 text-white py-1">
                        {area}
                      </option>
                    ))}
                  </select>
                </div>

                {/* Project Requirements Notes */}
                <div className="space-y-1.5">
                  <label className="text-xs font-bold text-slate-300 flex items-center gap-1.5">
                    <MessageSquare className="w-3.5 h-3.5 text-cyan-400" />
                    Architecture & Compute Goals
                  </label>
                  <textarea
                    rows={2}
                    value={form.message}
                    onChange={(e) => setForm({ ...form, message: e.target.value })}
                    placeholder="Describe your data volume, target cloud (AWS/Azure/GCP), or timeline..."
                    className="w-full bg-slate-900/80 border border-white/15 rounded-2xl p-3 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-cyan-500 focus:ring-2 focus:ring-cyan-500/20 transition-all resize-none shadow-inner"
                  />
                </div>

              </div>

              {/* Submit CTA Button */}
              <div className="pt-2">
                <button
                  type="submit"
                  disabled={loading}
                  className="group relative w-full py-4 rounded-2xl font-black text-xs sm:text-sm uppercase tracking-widest text-white bg-gradient-to-r from-cyan-500 via-blue-600 to-purple-600 hover:from-cyan-400 hover:via-blue-500 hover:to-purple-500 disabled:opacity-50 disabled:cursor-not-allowed shadow-[0_0_30px_rgba(6,182,212,0.3)] hover:shadow-[0_0_45px_rgba(6,182,212,0.5)] flex items-center justify-center gap-3 transition-all duration-300 cursor-pointer overflow-hidden border border-white/20"
                  id="submit-demo-form-btn"
                >
                  {/* Button Shimmer */}
                  <div className="absolute inset-0 w-1/2 h-full bg-gradient-to-r from-transparent via-white/20 to-transparent skew-x-[-30deg] -translate-x-full group-hover:translate-x-[300%] transition-transform duration-1000" />
                  
                  {loading ? (
                    <>
                      <Loader2 className="w-4 h-4 animate-spin text-cyan-300" />
                      <span>Allocating Solution Architect...</span>
                    </>
                  ) : (
                    <>
                      <span>Confirm & Request Executive Session</span>
                      <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                    </>
                  )}
                </button>
                <p className="text-[10px] text-center text-slate-400 mt-2 flex items-center justify-center gap-1.5">
                  <Lock className="w-3 h-3 text-emerald-400" /> Confidential & Encrypted Transmission • 100% Privacy Guaranteed
                </p>
              </div>

            </form>
          ) : (
            /* SUCCESS STATE VIEW */
            <div className="text-center py-8 sm:py-12 space-y-6 animate-in zoom-in-95 duration-500">
              <div className="relative w-20 h-20 mx-auto flex items-center justify-center">
                <div className="absolute inset-0 rounded-full bg-emerald-500/20 animate-ping" />
                <div className="relative w-20 h-20 rounded-full bg-gradient-to-tr from-emerald-500 to-cyan-500 border-2 border-white/20 flex items-center justify-center text-white shadow-[0_0_40px_rgba(16,185,129,0.4)]">
                  <CheckCircle2 className="w-10 h-10" />
                </div>
              </div>

              <div className="space-y-2">
                <span className="text-[11px] font-mono font-bold tracking-widest text-emerald-400 bg-emerald-500/10 px-3 py-1 rounded-full border border-emerald-500/20 uppercase">
                  Session Confirmed & Queued
                </span>
                <h3 className="text-2xl sm:text-3xl font-black text-white tracking-tight">
                  We're Ready for You, <span className="text-cyan-400">{form.fullName}</span>.
                </h3>
                <p className="text-xs sm:text-sm text-slate-300 leading-relaxed max-w-md mx-auto">
                  Your request for <span className="font-bold text-white bg-slate-900 px-2 py-0.5 rounded border border-slate-800">{form.interestArea}</span> has been routed to our Senior AI Architects.
                </p>
              </div>

              {/* Digital Ticket Card */}
              <div className="bg-gradient-to-b from-slate-900/90 to-slate-950 rounded-2xl p-5 border border-white/15 shadow-2xl text-left max-w-md mx-auto space-y-3 relative overflow-hidden">
                <div className="absolute top-0 right-0 w-24 h-24 bg-cyan-500/10 rounded-full blur-2xl pointer-events-none" />
                
                <div className="flex items-center justify-between border-b border-white/10 pb-2.5">
                  <span className="text-[11px] font-mono font-bold text-slate-400 uppercase">Consultation ID</span>
                  <span className="text-xs font-mono font-bold text-cyan-400">
                    #VTAB-EXEC-{Math.floor(100000 + Math.random() * 900000)}
                  </span>
                </div>

                <div className="space-y-1.5 text-xs text-slate-300 font-medium">
                  <p className="flex items-center gap-2">
                    <Mail className="w-3.5 h-3.5 text-cyan-400" />
                    <span>Confirmation dispatched to: <strong className="text-white">{form.workEmail}</strong></span>
                  </p>
                  <p className="flex items-center gap-2">
                    <Clock className="w-3.5 h-3.5 text-emerald-400" />
                    <span>SLA Commitment: Architect response within <strong className="text-emerald-300">2 Business Hours</strong>.</span>
                  </p>
                </div>
              </div>

              <div className="pt-2">
                <button
                  onClick={() => {
                    setSubmitted(false);
                    onClose();
                  }}
                  className="px-8 py-3.5 rounded-2xl font-bold text-xs uppercase tracking-wider text-white bg-slate-800 hover:bg-slate-700 border border-white/15 hover:border-white/30 transition-all cursor-pointer shadow-lg"
                >
                  Return to Intelligence Hub
                </button>
              </div>
            </div>
          )}

        </div>

      </div>
    </div>
  );
};
