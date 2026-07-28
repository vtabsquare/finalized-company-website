import React, { useState, useEffect } from 'react';
import { X, Calendar, CheckCircle2, Briefcase, Loader2 } from 'lucide-react';
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
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-slate-900/40 backdrop-blur-sm animate-in fade-in duration-200">
      <div className="relative w-full max-w-2xl bg-white dark:bg-[#0b1120] rounded-2xl border border-slate-200 dark:border-slate-800/60 shadow-[0_20px_60px_-15px_rgba(0,0,0,0.1)] dark:shadow-[0_20px_60px_-15px_rgba(0,0,0,0.6)] overflow-hidden flex flex-col max-h-[95vh]">
        
        {/* Header Section */}
        <div className="flex items-start justify-between px-8 pt-8 pb-5">
          <div className="flex flex-col gap-4">
            <div className="w-12 h-12 rounded-xl border border-slate-200 dark:border-slate-700/60 flex items-center justify-center bg-slate-50 dark:bg-slate-800/50 shadow-sm">
              <Briefcase className="w-5 h-5 text-slate-700 dark:text-slate-300" />
            </div>
            <div>
              <h2 className="text-xl font-bold text-slate-900 dark:text-white tracking-tight">Schedule Executive Demo</h2>
              <p className="text-sm text-slate-500 dark:text-slate-400 mt-1 font-medium">Enter your institutional information below.</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-2 -mr-2 rounded-lg text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Form Body - Scrollable */}
        <div className="px-8 pb-8 overflow-y-auto custom-scrollbar">
          {!submitted ? (
            <form id="demo-modal-form" onSubmit={handleSubmit} className="space-y-5 mt-2">
              
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                <div className="space-y-1.5">
                  <label className="text-xs font-bold uppercase tracking-wider text-slate-600 dark:text-slate-400">Full Name</label>
                  <input
                    type="text"
                    required
                    value={form.fullName}
                    onChange={(e) => setForm({ ...form, fullName: e.target.value })}
                    placeholder="e.g. Sarah Jenkins"
                    className="w-full bg-transparent border border-slate-200 dark:border-slate-700/80 rounded-xl px-4 py-3 text-sm text-slate-900 dark:text-white placeholder-slate-400 dark:placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-teal-600/30 dark:focus:ring-teal-500/30 focus:border-teal-600 dark:focus:border-teal-500 transition-all shadow-sm"
                  />
                </div>

                <div className="space-y-1.5">
                  <label className="text-xs font-bold uppercase tracking-wider text-slate-600 dark:text-slate-400">Work Email</label>
                  <input
                    type="email"
                    required
                    value={form.workEmail}
                    onChange={(e) => setForm({ ...form, workEmail: e.target.value })}
                    placeholder="sarah@company.com"
                    className="w-full bg-transparent border border-slate-200 dark:border-slate-700/80 rounded-xl px-4 py-3 text-sm text-slate-900 dark:text-white placeholder-slate-400 dark:placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-teal-600/30 dark:focus:ring-teal-500/30 focus:border-teal-600 dark:focus:border-teal-500 transition-all shadow-sm"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                <div className="space-y-1.5">
                  <label className="text-xs font-bold uppercase tracking-wider text-slate-600 dark:text-slate-400">Company Name</label>
                  <input
                    type="text"
                    required
                    value={form.companyName}
                    onChange={(e) => setForm({ ...form, companyName: e.target.value })}
                    placeholder="Acme Corp"
                    className="w-full bg-transparent border border-slate-200 dark:border-slate-700/80 rounded-xl px-4 py-3 text-sm text-slate-900 dark:text-white placeholder-slate-400 dark:placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-teal-600/30 dark:focus:ring-teal-500/30 focus:border-teal-600 dark:focus:border-teal-500 transition-all shadow-sm"
                  />
                </div>

                <div className="space-y-1.5">
                  <label className="text-xs font-bold uppercase tracking-wider text-slate-600 dark:text-slate-400">Team Size</label>
                  <select
                    value={form.teamSize}
                    onChange={(e) => setForm({ ...form, teamSize: e.target.value })}
                    className="w-full bg-transparent border border-slate-200 dark:border-slate-700/80 rounded-xl px-4 py-3 text-sm text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-teal-600/30 dark:focus:ring-teal-500/30 focus:border-teal-600 dark:focus:border-teal-500 transition-all shadow-sm appearance-none cursor-pointer"
                    style={{ backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 24 24' stroke='%2364748b'%3E%3Cpath stroke-linecap='round' stroke-linejoin='round' stroke-width='2' d='M19 9l-7 7-7-7'%3E%3C/path%3E%3C/svg%3E")`, backgroundPosition: 'right 1rem center', backgroundRepeat: 'no-repeat', backgroundSize: '1.2em' }}
                  >
                    <option className="bg-white dark:bg-slate-900 text-slate-900 dark:text-white">1-10 Employees</option>
                    <option className="bg-white dark:bg-slate-900 text-slate-900 dark:text-white">10-50 Employees</option>
                    <option className="bg-white dark:bg-slate-900 text-slate-900 dark:text-white">50-250 Employees</option>
                    <option className="bg-white dark:bg-slate-900 text-slate-900 dark:text-white">250+ Enterprise</option>
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                <div className="space-y-1.5">
                  <label className="text-xs font-bold uppercase tracking-wider text-slate-600 dark:text-slate-400">Area of Interest</label>
                  <select
                    value={form.interestArea}
                    onChange={(e) => setForm({ ...form, interestArea: e.target.value })}
                    className="w-full bg-transparent border border-slate-200 dark:border-slate-700/80 rounded-xl px-4 py-3 text-sm text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-teal-600/30 dark:focus:ring-teal-500/30 focus:border-teal-600 dark:focus:border-teal-500 transition-all shadow-sm appearance-none cursor-pointer"
                    style={{ backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 24 24' stroke='%2364748b'%3E%3Cpath stroke-linecap='round' stroke-linejoin='round' stroke-width='2' d='M19 9l-7 7-7-7'%3E%3C/path%3E%3C/svg%3E")`, backgroundPosition: 'right 1rem center', backgroundRepeat: 'no-repeat', backgroundSize: '1.2em' }}
                  >
                    <option className="bg-white dark:bg-slate-900 text-slate-900 dark:text-white">AI Reporting Platform</option>
                    <option className="bg-white dark:bg-slate-900 text-slate-900 dark:text-white">Qlik to Power BI Migration</option>
                    <option className="bg-white dark:bg-slate-900 text-slate-900 dark:text-white">AI Employees & Agents</option>
                    <option className="bg-white dark:bg-slate-900 text-slate-900 dark:text-white">GBTI Smart Home Builder</option>
                    <option className="bg-white dark:bg-slate-900 text-slate-900 dark:text-white">BuildSmart Estimator</option>
                    <option className="bg-white dark:bg-slate-900 text-slate-900 dark:text-white">FaceAuth Biometrics</option>
                    <option className="bg-white dark:bg-slate-900 text-slate-900 dark:text-white">PostgreSQL / SQL Server Migration</option>
                    <option className="bg-white dark:bg-slate-900 text-slate-900 dark:text-white">Custom AI Development</option>
                  </select>
                </div>

                <div className="space-y-1.5">
                  <label className="text-xs font-bold uppercase tracking-wider text-slate-600 dark:text-slate-400 flex items-center gap-1.5">
                    <Calendar className="w-3.5 h-3.5 text-slate-400" />
                    Preferred Date
                  </label>
                  <input
                    type="date"
                    min={new Date().toISOString().split('T')[0]}
                    value={form.preferredDate}
                    onClick={(e) => {
                      try {
                        if ('showPicker' in e.currentTarget) {
                          e.currentTarget.showPicker();
                        }
                      } catch {}
                    }}
                    onFocus={(e) => {
                      try {
                        if ('showPicker' in e.currentTarget) {
                          e.currentTarget.showPicker();
                        }
                      } catch {}
                    }}
                    onChange={(e) => setForm({ ...form, preferredDate: e.target.value })}
                    className="w-full bg-transparent border border-slate-200 dark:border-slate-700/80 rounded-xl px-4 py-3 text-sm text-slate-900 dark:text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-teal-600/30 dark:focus:ring-teal-500/30 focus:border-teal-600 dark:focus:border-teal-500 transition-all shadow-sm cursor-pointer dark:[color-scheme:dark] [color-scheme:light]"
                  />
                </div>
              </div>

              <div className="space-y-1.5">
                <label className="text-xs font-bold uppercase tracking-wider text-slate-600 dark:text-slate-400">Project Requirements / Notes</label>
                <textarea
                  rows={3}
                  value={form.message}
                  onChange={(e) => setForm({ ...form, message: e.target.value })}
                  placeholder="What is your current data stack or automation goal?"
                  className="w-full bg-transparent border border-slate-200 dark:border-slate-700/80 rounded-xl px-4 py-3 text-sm text-slate-900 dark:text-white placeholder-slate-400 dark:placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-teal-600/30 dark:focus:ring-teal-500/30 focus:border-teal-600 dark:focus:border-teal-500 transition-all shadow-sm resize-none"
                />
              </div>

            </form>
          ) : (
            <div className="text-center py-10 space-y-6">
              <div className="w-20 h-20 rounded-2xl bg-emerald-50 dark:bg-emerald-500/10 border border-emerald-200 dark:border-emerald-500/30 flex items-center justify-center text-emerald-500 mx-auto">
                <CheckCircle2 className="w-10 h-10" />
              </div>

              <div className="space-y-2">
                <h3 className="text-2xl font-bold text-slate-900 dark:text-white tracking-tight">Demo Scheduled!</h3>
                <p className="text-sm text-slate-600 dark:text-slate-400 leading-relaxed max-w-md mx-auto">
                  Thank you, <span className="font-semibold text-slate-900 dark:text-white">{form.fullName}</span>. An AI Specialist has received your request for <span className="font-semibold text-slate-900 dark:text-white">{form.interestArea}</span>.
                </p>
              </div>

              <div className="bg-slate-50 dark:bg-slate-900/50 rounded-xl p-5 border border-slate-200 dark:border-slate-800 text-left text-sm font-mono space-y-2 text-slate-600 dark:text-slate-400 max-w-md mx-auto shadow-sm">
                <p>📅 Confirmation: #VTAB-DEMO-{Math.floor(10000 + Math.random() * 90000)}</p>
                <p>✉️ Email sent to: <span className="text-slate-900 dark:text-white font-medium">{form.workEmail}</span></p>
                <p>🚀 An architect will contact you within 2 business hours.</p>
              </div>
            </div>
          )}
        </div>

        {/* Footer Actions */}
        <div className="px-8 py-5 border-t border-slate-100 dark:border-slate-800/60 bg-slate-50/50 dark:bg-slate-900/20 flex justify-end gap-3 items-center">
          {submitted ? (
            <button
              onClick={() => {
                setSubmitted(false);
                onClose();
              }}
              className="px-6 py-2.5 rounded-xl font-semibold text-sm text-slate-700 dark:text-slate-300 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 hover:bg-slate-50 dark:hover:bg-slate-700 transition-colors cursor-pointer shadow-sm"
            >
              Close Window
            </button>
          ) : (
            <>
              <button
                type="button"
                onClick={onClose}
                className="px-6 py-2.5 rounded-xl font-semibold text-sm text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors cursor-pointer"
              >
                Cancel
              </button>
              <button
                type="submit"
                form="demo-modal-form"
                disabled={loading}
                className="px-7 py-2.5 rounded-xl font-semibold text-sm text-white bg-[#13596d] hover:bg-[#0f4757] dark:bg-teal-600 dark:hover:bg-teal-500 disabled:opacity-50 disabled:cursor-not-allowed shadow-md transition-all cursor-pointer flex items-center gap-2"
              >
                {loading ? (
                  <>
                    <Loader2 className="w-4 h-4 animate-spin" />
                    <span>Processing...</span>
                  </>
                ) : (
                  <span>Request Demo</span>
                )}
              </button>
            </>
          )}
        </div>

      </div>
    </div>
  );
};
