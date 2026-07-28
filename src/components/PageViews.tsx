import React, { useState } from 'react';
import { NavTab, Product } from '../types';
import { CAREER_ROLES } from '../data/contentData';
import { sendContactInquiryEmails } from '../lib/brevoService';
import {
  Building2,
  Cpu,
  Layers,
  ShieldCheck,
  Users,
  Briefcase,
  Mail,
  Phone,
  MapPin,
  Sparkles,
  ArrowRight,
  CheckCircle2,
  Bot,
  Send,
  Code2,
  FileText,
  Clock,
  Loader2
} from 'lucide-react';

interface PageViewsProps {
  activeTab: NavTab;
  setActiveTab: (tab: NavTab) => void;
  onScheduleDemo: (interest?: string) => void;
  onOpenSandbox: () => void;
  onSelectProduct: (product: Product) => void;
}

export const PageViews: React.FC<PageViewsProps> = ({
  activeTab,
  setActiveTab,
  onScheduleDemo,
  onOpenSandbox,
  onSelectProduct
}) => {
  const [appliedRole, setAppliedRole] = useState<string | null>(null);
  const [contactSubmitted, setContactSubmitted] = useState(false);
  const [contactName, setContactName] = useState('');
  const [contactEmail, setContactEmail] = useState('');
  const [contactMsg, setContactMsg] = useState('');
  const [contactLoading, setContactLoading] = useState(false);

  const handleContactSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!contactEmail || !contactName) return;
    setContactLoading(true);
    await sendContactInquiryEmails(contactName, contactEmail, contactMsg);
    setContactLoading(false);
    setContactSubmitted(true);
  };

  if (activeTab === 'home' || activeTab === 'products') return null;

  const handleApplyRole = (roleTitle: string) => {
    setAppliedRole(roleTitle);
    setTimeout(() => {
      setAppliedRole(null);
      onScheduleDemo(`Job Application: ${roleTitle}`);
    }, 1200);
  };

  return (
    <div className="pt-28 pb-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 space-y-16 animate-in fade-in duration-300">
      
      {/* ---------------- SOLUTIONS PAGE ---------------- */}
      {activeTab === 'solutions' && (
        <div className="space-y-12">
          <div className="text-center max-w-3xl mx-auto space-y-3">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-950 border border-blue-500/30 text-blue-300 text-xs font-semibold uppercase">
              <Layers className="w-3.5 h-3.5 text-cyan-400" />
              <span>Tailored Enterprise Capabilities</span>
            </div>
            <h2 className="text-4xl font-extrabold text-white">
              Enterprise AI <span className="text-gradient-primary">Solutions</span>
            </h2>
            <p className="text-slate-400 text-sm">
              Modular AI architectures designed to resolve systemic operational bottlenecks and accelerate decision making.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <div className="backdrop-blur-xl bg-white/[0.03] border border-white/10 p-6 rounded-2xl shadow-2xl space-y-4">
              <div className="w-12 h-12 rounded-xl bg-blue-500/10 border border-blue-500/30 flex items-center justify-center text-blue-400">
                <Cpu className="w-6 h-6" />
              </div>
              <h3 className="text-lg font-bold text-white">Autonomous AI Employees</h3>
              <p className="text-xs text-slate-300 leading-relaxed">
                24/7 digital specialists for meeting transcription, L1 IT support, data analysis, and automated customer onboarding.
              </p>
              <button
                onClick={() => onScheduleDemo('Autonomous AI Employees')}
                className="text-xs font-semibold text-blue-400 hover:underline flex items-center gap-1 cursor-pointer"
              >
                <span>Request Solution Blueprint</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>

            <div className="backdrop-blur-xl bg-white/[0.03] border border-white/10 p-6 rounded-2xl shadow-2xl space-y-4">
              <div className="w-12 h-12 rounded-xl bg-purple-500/10 border border-purple-500/30 flex items-center justify-center text-purple-400">
                <Layers className="w-6 h-6" />
              </div>
              <h3 className="text-lg font-bold text-white">Automated Platform Migration</h3>
              <p className="text-xs text-slate-300 leading-relaxed">
                Zero-downtime automated translation from legacy Qlik to Power BI and PostgreSQL to SQL Server database schemas.
              </p>
              <button
                onClick={() => onScheduleDemo('Automated Platform Migration')}
                className="text-xs font-semibold text-purple-400 hover:underline flex items-center gap-1 cursor-pointer"
              >
                <span>Request Migration Audit</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>

            <div className="backdrop-blur-xl bg-white/[0.03] border border-white/10 p-6 rounded-2xl shadow-2xl space-y-4">
              <div className="w-12 h-12 rounded-xl bg-cyan-500/10 border border-cyan-500/30 flex items-center justify-center text-cyan-400">
                <Building2 className="w-6 h-6" />
              </div>
              <h3 className="text-lg font-bold text-white">Smart Construction & Estimation</h3>
              <p className="text-xs text-slate-300 leading-relaxed">
                Computer vision blueprint parsing, automated Bill of Quantities (BoQ) extraction, and pricing forecasts.
              </p>
              <button
                onClick={() => onScheduleDemo('Smart Construction AI')}
                className="text-xs font-semibold text-cyan-400 hover:underline flex items-center gap-1 cursor-pointer"
              >
                <span>View Estimator Demo</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>
        </div>
      )}

      {/* ---------------- INDUSTRIES PAGE ---------------- */}
      {activeTab === 'industries' && (
        <div className="space-y-12">
          <div className="text-center max-w-3xl mx-auto space-y-3">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-purple-950 border border-purple-500/30 text-purple-300 text-xs font-semibold uppercase">
              <Building2 className="w-3.5 h-3.5 text-purple-400" />
              <span>Domain Verticals</span>
            </div>
            <h2 className="text-4xl font-extrabold text-white">
              Industries <span className="text-gradient-cyan">We Transform</span>
            </h2>
            <p className="text-slate-400 text-sm">
              Deep vertical customization fine-tuned to regulatory, operational, and data compliance standards.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="backdrop-blur-xl bg-white/[0.03] border border-white/10 p-6 rounded-2xl shadow-2xl space-y-3">
              <h3 className="text-lg font-bold text-white text-gradient-primary">🏗️ Construction & Real Estate</h3>
              <p className="text-xs text-slate-300 leading-relaxed">
                Automated blueprint estimates, site milestone verification via Vision AI, and material supply chain forecasting with GBTI Smart Home Builder and BuildSmart Estimator.
              </p>
            </div>

            <div className="backdrop-blur-xl bg-white/[0.03] border border-white/10 p-6 rounded-2xl shadow-2xl space-y-3">
              <h3 className="text-lg font-bold text-white text-gradient-primary">💼 Financial Services & Enterprise Reporting</h3>
              <p className="text-xs text-slate-300 leading-relaxed">
                Natural language executive queries, DAX formula synthesis, Qlik to Power BI automated migrations, and SOC2-compliant reporting pipelines.
              </p>
            </div>

            <div className="backdrop-blur-xl bg-white/[0.03] border border-white/10 p-6 rounded-2xl shadow-2xl space-y-3">
              <h3 className="text-lg font-bold text-white text-gradient-primary">🔒 Identity, Security & IT Operations</h3>
              <p className="text-xs text-slate-300 leading-relaxed">
                Touchless facial biometrics with 3D liveness detection via FaceAuth, and autonomous L1 support ticket resolution.
              </p>
            </div>

            <div className="backdrop-blur-xl bg-white/[0.03] border border-white/10 p-6 rounded-2xl shadow-2xl space-y-3">
              <h3 className="text-lg font-bold text-white text-gradient-primary">📦 Logistics, Production & Supply Chain</h3>
              <p className="text-xs text-slate-300 leading-relaxed">
                3D bin-packing optimization, packaging cost reduction, freight space maximization, and automated ERP reconciliation.
              </p>
            </div>
          </div>
        </div>
      )}

      {/* ---------------- ABOUT PAGE ---------------- */}
      {activeTab === 'about' && (
        <div className="space-y-12">
          <div className="text-center max-w-3xl mx-auto space-y-3">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-950 border border-blue-500/30 text-blue-300 text-xs font-semibold uppercase">
              <Users className="w-3.5 h-3.5 text-blue-400" />
              <span>Company Overview</span>
            </div>
            <h2 className="text-4xl font-extrabold text-white">
              About <span className="text-gradient-primary">VTab Square</span>
            </h2>
            <p className="text-slate-400 text-sm">
              Pioneering practical, enterprise-grade AI applications that replace repetitive toil with intelligent software.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="backdrop-blur-xl bg-white/[0.03] p-6 rounded-2xl border border-white/10 shadow-2xl space-y-3">
              <h3 className="text-lg font-bold text-white">Who We Are</h3>
              <p className="text-xs text-slate-300 leading-relaxed">
                VTab Square is an AI Innovation Company focused on building practical, domain-specific AI software. We bridge cutting-edge LLMs and machine learning algorithms with enterprise data platforms.
              </p>
            </div>

            <div className="backdrop-blur-xl bg-white/[0.03] p-6 rounded-2xl border border-white/10 shadow-2xl space-y-3">
              <h3 className="text-lg font-bold text-white">Our Product Philosophy</h3>
              <p className="text-xs text-slate-300 leading-relaxed">
                We believe in building practical AI, not experimental AI. Our solutions deliver measurable return on investment, rapid deployment cycles, and robust SOC2 enterprise security out of the box.
              </p>
            </div>

            <div className="backdrop-blur-xl bg-white/[0.03] p-6 rounded-2xl border border-white/10 shadow-2xl space-y-3">
              <h3 className="text-lg font-bold text-white">Global Reach</h3>
              <p className="text-xs text-slate-300 leading-relaxed">
                Serving clients across North America, Europe, and Asia-Pacific in construction, financial reporting, database migration, and automated IT services.
              </p>
            </div>
          </div>
        </div>
      )}

      {/* ---------------- CAREERS PAGE ---------------- */}
      {activeTab === 'careers' && (
        <div className="space-y-12">
          <div className="text-center max-w-3xl mx-auto space-y-3">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-950 border border-emerald-500/30 text-emerald-300 text-xs font-semibold uppercase">
              <Briefcase className="w-3.5 h-3.5 text-emerald-400" />
              <span>Join The AI Frontier</span>
            </div>
            <h2 className="text-4xl font-extrabold text-white">
              Careers at <span className="text-gradient-primary">VTab Square</span>
            </h2>
            <p className="text-slate-400 text-sm">
              We are hiring world-class engineers, data architects, and LLM specialists to build autonomous enterprise AI.
            </p>
          </div>

          <div className="space-y-4">
            {CAREER_ROLES.map((role) => (
              <div
                key={role.id}
                className="backdrop-blur-xl bg-white/[0.03] p-6 rounded-2xl border border-white/10 shadow-2xl flex flex-col md:flex-row md:items-center justify-between gap-6"
              >
                <div className="space-y-2 max-w-2xl">
                  <div className="flex flex-wrap items-center gap-2">
                    <span className="text-xs font-bold text-blue-400 uppercase">{role.department}</span>
                    <span className="text-[10px] bg-white/5 text-slate-300 px-2 py-0.5 rounded border border-white/10">{role.location}</span>
                    <span className="text-[10px] bg-emerald-500/10 text-emerald-300 border border-emerald-500/30 px-2 py-0.5 rounded">{role.experience}</span>
                  </div>
                  <h3 className="text-lg font-bold text-white">{role.title}</h3>
                  <p className="text-xs text-slate-300">{role.description}</p>
                </div>

                <button
                  onClick={() => handleApplyRole(role.title)}
                  disabled={appliedRole === role.title}
                  className="px-6 py-2.5 rounded-xl font-semibold text-xs text-white bg-blue-600 hover:bg-blue-500 shadow-md cursor-pointer transition-all shrink-0"
                >
                  {appliedRole === role.title ? 'Application Submitted!' : 'Apply For Role'}
                </button>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* ---------------- CONTACT PAGE ---------------- */}
      {activeTab === 'contact' && (
        <div className="space-y-12">
          <div className="text-center max-w-3xl mx-auto space-y-3">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-950 border border-blue-500/30 text-blue-300 text-xs font-semibold uppercase">
              <Mail className="w-3.5 h-3.5 text-blue-400" />
              <span>Get In Touch</span>
            </div>
            <h2 className="text-4xl font-extrabold text-white">
              Talk to Our <span className="text-gradient-primary">AI Experts</span>
            </h2>
            <p className="text-slate-400 text-sm">
              Have questions about database migration, custom AI models, or deploying AI Employees? Reach out to our team.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            <div className="lg:col-span-5 space-y-6">
              <div className="backdrop-blur-xl bg-white/[0.03] p-6 rounded-2xl border border-white/10 shadow-2xl space-y-4">
                <div className="flex items-center gap-3">
                  <Mail className="w-5 h-5 text-blue-400" />
                  <div>
                    <h4 className="text-xs font-bold text-white uppercase">Direct Email</h4>
                    <p className="text-xs text-slate-300">contact@vtabsquare.com</p>
                  </div>
                </div>

                <div className="flex items-center gap-3">
                  <Phone className="w-5 h-5 text-purple-400" />
                  <div>
                    <h4 className="text-xs font-bold text-white uppercase">Executive Line</h4>
                    <p className="text-xs text-slate-300">+1 (800) 555-VTAB-AI</p>
                  </div>
                </div>

                <div className="flex items-center gap-3">
                  <MapPin className="w-5 h-5 text-cyan-400" />
                  <div>
                    <h4 className="text-xs font-bold text-white uppercase">Innovation Center</h4>
                    <p className="text-xs text-slate-300">VTab Square AI Labs, Tech Park Center</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="lg:col-span-7">
              <div className="backdrop-blur-xl bg-white/[0.03] p-6 sm:p-8 rounded-2xl border border-white/10 shadow-2xl space-y-4">
                <h3 className="text-lg font-bold text-white">Send Us a Direct Message</h3>

                {contactSubmitted ? (
                  <div className="bg-emerald-950/40 border border-emerald-500/30 p-4 rounded-xl text-xs text-emerald-300 space-y-2">
                    <p className="font-bold">Message Delivered!</p>
                    <p>Our AI Solutions Architect will get back to you within 2 business hours.</p>
                  </div>
                ) : (
                  <form
                    onSubmit={handleContactSubmit}
                    className="space-y-3"
                  >
                    <input
                      type="text"
                      required
                      value={contactName}
                      onChange={(e) => setContactName(e.target.value)}
                      placeholder="Your Name"
                      className="w-full bg-slate-950 border border-slate-800 rounded-xl p-3 text-xs text-white focus:outline-none focus:border-blue-500"
                    />
                    <input
                      type="email"
                      required
                      value={contactEmail}
                      onChange={(e) => setContactEmail(e.target.value)}
                      placeholder="Work Email"
                      className="w-full bg-slate-950 border border-slate-800 rounded-xl p-3 text-xs text-white focus:outline-none focus:border-blue-500"
                    />
                    <textarea
                      rows={4}
                      required
                      value={contactMsg}
                      onChange={(e) => setContactMsg(e.target.value)}
                      placeholder="How can VTab Square assist your organization?"
                      className="w-full bg-slate-950 border border-slate-800 rounded-xl p-3 text-xs text-white focus:outline-none focus:border-blue-500 resize-none"
                    />
                    <button
                      type="submit"
                      disabled={contactLoading}
                      className="w-full py-3 bg-blue-600 hover:bg-blue-500 disabled:opacity-50 disabled:cursor-not-allowed text-white font-semibold rounded-xl text-xs flex items-center justify-center gap-2 cursor-pointer shadow-lg"
                    >
                      {contactLoading ? (
                        <>
                          <Loader2 className="w-4 h-4 animate-spin" />
                          <span>Sending Inquiry...</span>
                        </>
                      ) : (
                        <>
                          <Send className="w-4 h-4" />
                          <span>Send Inquiry</span>
                        </>
                      )}
                    </button>
                  </form>
                )}
              </div>
            </div>
          </div>
        </div>
      )}

    </div>
  );
};
