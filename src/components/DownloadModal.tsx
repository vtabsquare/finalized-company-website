import React, { useState } from 'react';
import { X, Check, Laptop, AlertCircle, Sparkles, ShieldCheck, Mail } from 'lucide-react';
import { SITE_CONFIG } from '../data/reportingProductData';

interface DownloadModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const DownloadModal: React.FC<DownloadModalProps> = ({ isOpen, onClose }) => {
  const [email, setEmail] = useState('');
  const [submitted, setSubmitted] = useState(false);

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (email.trim()) {
      setSubmitted(true);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-fade-in">
      <div 
        className="relative w-full max-w-lg rounded-2xl border border-slate-800 bg-[#0A0E1A] p-6 sm:p-8 shadow-2xl space-y-6"
        role="dialog"
        aria-modal="true"
        aria-labelledby="download-modal-title"
      >
        {/* Close Button */}
        <button
          type="button"
          onClick={onClose}
          aria-label="Close download modal"
          className="absolute top-5 right-5 p-1.5 text-slate-400 hover:text-white rounded-lg hover:bg-slate-800/60 transition-colors"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Modal Header */}
        <div className="space-y-2 text-left">
          <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded bg-amber-500/10 border border-amber-500/20 text-amber-300 text-xs font-semibold">
            <AlertCircle className="w-3.5 h-3.5" />
            <span>Installer link coming soon</span>
          </div>

          <h3 id="download-modal-title" className="text-2xl font-bold text-white tracking-tight">
            VTAB Reporting Studio Desktop
          </h3>

          <p className="text-slate-300 text-sm leading-relaxed">
            v5.0.22 binary package is currently in private staging for enterprise validation.
          </p>
        </div>

        {/* Package Specs Card */}
        <div className="rounded-xl border border-slate-800 bg-[#070A12] p-4 font-mono text-xs text-slate-300 space-y-2.5">
          <div className="flex items-center justify-between pb-2 border-b border-slate-800 text-slate-400">
            <span>Target Platform</span>
            <span className="text-white font-semibold">Windows 10 / 11 x64</span>
          </div>
          <div className="flex items-center justify-between">
            <span className="text-slate-400">Package Format</span>
            <span className="text-slate-200">MSIX / Enterprise EXE</span>
          </div>
          <div className="flex items-center justify-between">
            <span className="text-slate-400">Minimum Memory</span>
            <span className="text-cyan-300">8 GB RAM (16 GB for DirectLake)</span>
          </div>
          <div className="flex items-center justify-between">
            <span className="text-slate-400">DirectX Support</span>
            <span className="text-slate-200">DirectX 11+ Hardware Acceleration</span>
          </div>
        </div>

        {/* Early Access Notification Form */}
        <div className="pt-1">
          {submitted ? (
            <div className="p-3.5 rounded-xl bg-emerald-950/40 border border-emerald-700/50 flex items-center gap-3 text-emerald-200 text-xs">
              <ShieldCheck className="w-5 h-5 text-emerald-400 shrink-0" />
              <span>You will receive an early access download token at <strong>{email}</strong> once the binary build is published.</span>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-3">
              <label htmlFor="early-access-email" className="block text-xs font-medium text-slate-300 text-left">
                Get notified when the desktop installer is ready:
              </label>
              <div className="flex gap-2">
                <div className="relative flex-1">
                  <Mail className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-slate-500" />
                  <input
                    id="early-access-email"
                    type="email"
                    required
                    placeholder="Enter your work email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full pl-9 pr-3 py-2.5 rounded-lg bg-slate-900 border border-slate-800 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-cyan-400"
                  />
                </div>
                <button
                  type="submit"
                  className="px-4 py-2.5 rounded-lg bg-gradient-to-r from-cyan-400 to-blue-500 text-slate-900 font-semibold text-xs whitespace-nowrap hover:from-cyan-300 hover:to-blue-400 transition-all cursor-pointer"
                >
                  Notify Me
                </button>
              </div>
            </form>
          )}
        </div>

        {/* Close confirmation */}
        <div className="pt-2 flex justify-end">
          <button
            type="button"
            onClick={onClose}
            className="px-4 py-2 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 text-xs font-medium transition-colors cursor-pointer"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
};

