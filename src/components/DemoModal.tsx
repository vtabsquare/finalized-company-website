import React, { useState, useEffect } from 'react';
import { X, Calendar, CheckCircle2, Sparkles, Building2, User, Mail, Users, MessageSquare, Send, Loader2 } from 'lucide-react';
import { DemoFormState } from '../types';
import { sendDemoRequestEmails } from '../lib/brevoService';

interface DemoModalProps {
  isOpen: boolean;
  onClose: () => void;
  initialInterest?: string;
}

export const DemoModal: React.FC<DemoModalProps> = ({
  isOpen,
  onClose,
  initialInterest = ''
}) => {
  const [form, setForm] = useState<DemoFormState>({
    fullName: '',
    workEmail: '',
    companyName: '',
    teamSize: '10-50 Employees',
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
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-xl animate-in fade-in duration-200">
      <div className="relative w-full max-w-lg backdrop-blur-xl bg-[#02040a]/90 rounded-2xl border border-white/10 p-6 sm:p-8 shadow-2xl overflow-hidden max-h-[90vh] overflow-y-auto">
        
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-2 rounded-xl text-slate-400 hover:text-white bg-slate-900 border border-slate-800 transition-colors cursor-pointer"
          id="close-demo-modal-btn"
        >
          <X className="w-5 h-5" />
        </button>

        {!submitted ? (
          <form onSubmit={handleSubmit} className="space-y-5">
            <div className="space-y-1">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-950 border border-blue-500/30 text-blue-300 text-[11px] font-semibold">
                <Calendar className="w-3.5 h-3.5 text-cyan-400" />
                <span>Executive Consultation</span>
              </div>
              <h3 className="text-2xl font-bold text-white tracking-tight">Schedule a Live Demo</h3>
              <p className="text-xs text-slate-400">
                Meet with our AI architects to evaluate custom models, migration pipelines, and ROI metrics for your enterprise.
              </p>
            </div>

            <div className="space-y-3">
              <div>
                <label className="text-xs font-semibold text-slate-300 flex items-center gap-1.5 mb-1">
                  <User className="w-3.5 h-3.5 text-blue-400" />
                  Full Name *
                </label>
                <input
                  type="text"
                  required
                  value={form.fullName}
                  onChange={(e) => setForm({ ...form, fullName: e.target.value })}
                  placeholder="e.g. Sarah Jenkins"
                  className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3.5 py-2 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-blue-500"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="text-xs font-semibold text-slate-300 flex items-center gap-1.5 mb-1">
                    <Mail className="w-3.5 h-3.5 text-blue-400" />
                    Work Email *
                  </label>
                  <input
                    type="email"
                    required
                    value={form.workEmail}
                    onChange={(e) => setForm({ ...form, workEmail: e.target.value })}
                    placeholder="sarah@company.com"
                    className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3.5 py-2 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-blue-500"
                  />
                </div>

                <div>
                  <label className="text-xs font-semibold text-slate-300 flex items-center gap-1.5 mb-1">
                    <Building2 className="w-3.5 h-3.5 text-blue-400" />
                    Company Name *
                  </label>
                  <input
                    type="text"
                    required
                    value={form.companyName}
                    onChange={(e) => setForm({ ...form, companyName: e.target.value })}
                    placeholder="Acme Corp"
                    className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3.5 py-2 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-blue-500"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="text-xs font-semibold text-slate-300 flex items-center gap-1.5 mb-1">
                    <Users className="w-3.5 h-3.5 text-blue-400" />
                    Team Size
                  </label>
                  <select
                    value={form.teamSize}
                    onChange={(e) => setForm({ ...form, teamSize: e.target.value })}
                    className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3.5 py-2 text-xs text-white focus:outline-none focus:border-blue-500"
                  >
                    <option>1-10 Employees</option>
                    <option>10-50 Employees</option>
                    <option>50-250 Employees</option>
                    <option>250+ Enterprise</option>
                  </select>
                </div>

                <div>
                  <label className="text-xs font-semibold text-slate-300 flex items-center gap-1.5 mb-1">
                    <Sparkles className="w-3.5 h-3.5 text-blue-400" />
                    Area of Interest
                  </label>
                  <select
                    value={form.interestArea}
                    onChange={(e) => setForm({ ...form, interestArea: e.target.value })}
                    className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3.5 py-2 text-xs text-white focus:outline-none focus:border-blue-500"
                  >
                    <option>AI Reporting Platform</option>
                    <option>Qlik to Power BI Migration</option>
                    <option>AI Employees & Agents</option>
                    <option>GBTI Smart Home Builder</option>
                    <option>BuildSmart Estimator</option>
                    <option>FaceAuth Biometrics</option>
                    <option>PostgreSQL / SQL Server Migration</option>
                    <option>Custom AI Development</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="text-xs font-semibold text-slate-300 flex items-center gap-1.5 mb-1">
                  <Calendar className="w-3.5 h-3.5 text-blue-400" />
                  Preferred Date
                </label>
                <input
                  type="date"
                  value={form.preferredDate}
                  onChange={(e) => setForm({ ...form, preferredDate: e.target.value })}
                  className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3.5 py-2 text-xs text-white focus:outline-none focus:border-blue-500"
                />
              </div>

              <div>
                <label className="text-xs font-semibold text-slate-300 flex items-center gap-1.5 mb-1">
                  <MessageSquare className="w-3.5 h-3.5 text-blue-400" />
                  Project Requirements / Notes
                </label>
                <textarea
                  rows={3}
                  value={form.message}
                  onChange={(e) => setForm({ ...form, message: e.target.value })}
                  placeholder="Briefly describe your current data stack or automation goals..."
                  className="w-full bg-slate-950 border border-slate-800 rounded-xl p-3 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-blue-500 resize-none"
                />
              </div>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full py-3 rounded-xl font-semibold text-xs text-white bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-500 hover:to-purple-500 disabled:opacity-50 disabled:cursor-not-allowed shadow-xl shadow-blue-600/30 flex items-center justify-center gap-2 transition-all cursor-pointer"
              id="submit-demo-form-btn"
            >
              {loading ? (
                <>
                  <Loader2 className="w-4 h-4 animate-spin" />
                  <span>Sending Booking Request...</span>
                </>
              ) : (
                <>
                  <Send className="w-4 h-4" />
                  <span>Confirm & Request Session</span>
                </>
              )}
            </button>
          </form>
        ) : (
          <div className="text-center py-8 space-y-4">
            <div className="w-16 h-16 rounded-full bg-emerald-500/20 border border-emerald-500/40 flex items-center justify-center text-emerald-400 mx-auto">
              <CheckCircle2 className="w-8 h-8" />
            </div>

            <h3 className="text-2xl font-bold text-white">Demo Scheduled!</h3>

            <p className="text-xs text-slate-300 leading-relaxed max-w-sm mx-auto">
              Thank you, <span className="font-bold text-white">{form.fullName}</span>. An AI Specialist from VTab Square has received your request for <span className="text-cyan-300 font-semibold">{form.interestArea}</span>.
            </p>

            <div className="bg-slate-950/90 rounded-xl p-4 border border-slate-800 text-left text-xs font-mono space-y-1 text-slate-300">
              <p>📅 Confirmation: #VTAB-DEMO-{Math.floor(10000 + Math.random() * 90000)}</p>
              <p>✉️ Confirmation email sent to: {form.workEmail}</p>
              <p>🚀 An AI Solutions Architect will contact you within 2 business hours.</p>
            </div>

            <button
              onClick={() => {
                setSubmitted(false);
                onClose();
              }}
              className="px-6 py-2.5 rounded-xl font-semibold text-xs text-white bg-slate-800 hover:bg-slate-700 transition-colors cursor-pointer"
            >
              Close Window
            </button>
          </div>
        )}

      </div>
    </div>
  );
};
