import React, { useState } from 'react';
import { NavTab, Product, CareerRole } from '../types';
import { supabase } from '../lib/supabaseClient';
import { sendCareerApplicationEmails, sendContactInquiryEmails } from '../lib/brevoService';
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
  const [careerRoles, setCareerRoles] = React.useState<CareerRole[]>([]);
  const [careerRolesLoading, setCareerRolesLoading] = useState(false);
  const [selectedRole, setSelectedRole] = useState('General Application');
  const [careerForm, setCareerForm] = useState({
    fullName: '', email: '', phone: '', linkedInUrl: '', message: '', resumeFile: null as File | null
  });

  React.useEffect(() => {
    if (careerRoles.length > 0) {
      if (selectedRole === 'General Application') {
        setSelectedRole(careerRoles[0]?.title || 'General Application');
      }
    }
  }, [careerRoles]);

  React.useEffect(() => {
    if (activeTab === 'careers') {
      const fetchCareers = async () => {
        setCareerRolesLoading(true);
        const { data, error } = await supabase.from('career_roles').select('*').order('created_at', { ascending: false });
        if (!error && data) {
          const parsed = data.map(r => ({
            ...r,
            requirements: Array.isArray(r.requirements) ? r.requirements : (typeof r.requirements === 'string' ? JSON.parse(r.requirements || '[]') : [])
          }));
          setCareerRoles(parsed);
        }
        setCareerRolesLoading(false);
      };
      fetchCareers();
    }
  }, [activeTab]);
  const [isApplying, setIsApplying] = useState(false);
  const [careerLoading, setCareerLoading] = useState(false);
  const [careerSubmitted, setCareerSubmitted] = useState(false);
  const [careerError, setCareerError] = useState('');
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
    setSelectedRole(roleTitle);
    setCareerSubmitted(false);
    setCareerError('');
    setIsApplying(true);
    requestAnimationFrame(() => {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    });
  };

  const handleCareerSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!careerForm.resumeFile) {
      setCareerError('Please upload your resume.');
      return;
    }
    setCareerLoading(true);
    setCareerError('');

    let uploadedResumeUrl = '';
    try {
      const file = careerForm.resumeFile;
      const fileExt = file.name.split('.').pop();
      const fileName = `resume_${Date.now()}_${Math.random().toString(36).substring(7)}.${fileExt}`;
      
      const { error: uploadError } = await supabase.storage
        .from('resumes')
        .upload(fileName, file, { upsert: false });
        
      if (uploadError) throw uploadError;
      
      const { data: { publicUrl } } = supabase.storage
        .from('resumes')
        .getPublicUrl(fileName);
        
      uploadedResumeUrl = publicUrl;
    } catch (err: any) {
      console.error('Resume upload error:', err);
      setCareerError('Failed to upload resume. Please try again or check if the bucket exists.');
      setCareerLoading(false);
      return;
    }

    let base64Content = '';
    try {
      base64Content = await new Promise<string>((resolve, reject) => {
        const reader = new FileReader();
        reader.onload = () => {
          const result = reader.result as string;
          resolve(result.split(',')[1]); // get base64 part
        };
        reader.onerror = reject;
        reader.readAsDataURL(careerForm.resumeFile!);
      });
    } catch (err) {
      console.error('Failed to read file for attachment:', err);
    }

    const result = await sendCareerApplicationEmails({
      fullName: careerForm.fullName,
      email: careerForm.email,
      phone: careerForm.phone,
      linkedInUrl: careerForm.linkedInUrl,
      message: careerForm.message,
      resumeUrl: uploadedResumeUrl,
      resumeFile: { content: base64Content, name: careerForm.resumeFile.name },
      roleTitle: selectedRole,
    });
    setCareerLoading(false);

    if (!result.success) {
      setCareerError('We could not submit your application right now. Please try again or email contact@vtabsquare.com.');
      return;
    }

    setCareerSubmitted(true);
    setCareerForm({ fullName: '', email: '', phone: '', linkedInUrl: '', message: '', resumeFile: null });
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

          {!isApplying && (
          <div className="space-y-4">
            {careerRolesLoading ? (
              <div className="flex justify-center p-8"><Loader2 className="w-8 h-8 animate-spin text-emerald-400" /></div>
            ) : careerRoles.map((role) => (
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
                  <ul className="grid sm:grid-cols-2 gap-x-6 gap-y-1 pt-2">
                    {role.requirements.slice(0, 4).map((requirement) => (
                      <li key={requirement} className="text-[11px] text-slate-400 flex items-start gap-2">
                        <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 shrink-0 mt-0.5" />
                        <span>{requirement}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <button
                  onClick={() => handleApplyRole(role.title)}
                  className="px-6 py-2.5 rounded-xl font-semibold text-xs text-white bg-blue-600 hover:bg-blue-500 shadow-md cursor-pointer transition-all shrink-0"
                >
                  Apply For Role
                </button>
              </div>
            ))}
          </div>
          )}

          {isApplying && (
          <div id="career-application-form" className="max-w-4xl mx-auto rounded-3xl border border-emerald-500/20 bg-gradient-to-br from-emerald-500/[0.08] via-white/[0.03] to-cyan-500/[0.05] p-6 md:p-10 shadow-2xl">
            <button
              type="button"
              onClick={() => setIsApplying(false)}
              className="mb-8 flex items-center gap-2 text-sm font-semibold text-emerald-400 hover:text-emerald-300 transition-colors"
            >
              <ArrowRight className="w-4 h-4 rotate-180" /> Back to open roles
            </button>

            {careerSubmitted ? (
              <div className="py-10 text-center space-y-4">
                <div className="w-14 h-14 mx-auto rounded-full bg-emerald-500/15 border border-emerald-500/30 flex items-center justify-center">
                  <CheckCircle2 className="w-7 h-7 text-emerald-400" />
                </div>
                <h3 className="text-2xl font-bold text-white">Application received</h3>
                <p className="text-sm text-slate-300">Thank you. Our hiring team will review your profile and contact you if there is a match.</p>
                <button onClick={() => setCareerSubmitted(false)} className="text-sm font-semibold text-cyan-400 hover:text-cyan-300">Submit another application</button>
              </div>
            ) : (
              <form onSubmit={handleCareerSubmit} className="space-y-6">
                <div className="space-y-2">
                  <p className="text-xs font-bold uppercase tracking-[0.18em] text-emerald-400">Candidate application</p>
                  <h3 className="text-2xl md:text-3xl font-extrabold text-white">Apply to join VTab Square</h3>
                  <p className="text-sm text-slate-400">Share your profile and a public link to your resume. All required fields are marked.</p>
                </div>

                <div className="grid md:grid-cols-2 gap-4">
                  <label className="space-y-2 text-xs font-semibold text-slate-300">
                    <span>Role *</span>
                    <select value={selectedRole} onChange={(e) => setSelectedRole(e.target.value)} className="w-full rounded-xl border border-white/10 bg-slate-950/80 px-4 py-3 text-sm text-white focus:border-emerald-400 focus:outline-none">
                      {careerRoles.map(role => <option key={role.id} value={role.title}>{role.title}</option>)}
                      <option value="General Application">General Application</option>
                    </select>
                  </label>
                  <label className="space-y-2 text-xs font-semibold text-slate-300">
                    <span>Full name *</span>
                    <input required autoComplete="name" value={careerForm.fullName} onChange={(e) => setCareerForm({ ...careerForm, fullName: e.target.value })} className="w-full rounded-xl border border-white/10 bg-slate-950/80 px-4 py-3 text-sm text-white placeholder:text-slate-600 focus:border-emerald-400 focus:outline-none" placeholder="Your full name" />
                  </label>
                  <label className="space-y-2 text-xs font-semibold text-slate-300">
                    <span>Email *</span>
                    <input required type="email" autoComplete="email" value={careerForm.email} onChange={(e) => setCareerForm({ ...careerForm, email: e.target.value })} className="w-full rounded-xl border border-white/10 bg-slate-950/80 px-4 py-3 text-sm text-white placeholder:text-slate-600 focus:border-emerald-400 focus:outline-none" placeholder="you@example.com" />
                  </label>
                  <label className="space-y-2 text-xs font-semibold text-slate-300">
                    <span>Phone</span>
                    <input type="tel" autoComplete="tel" value={careerForm.phone} onChange={(e) => setCareerForm({ ...careerForm, phone: e.target.value })} className="w-full rounded-xl border border-white/10 bg-slate-950/80 px-4 py-3 text-sm text-white placeholder:text-slate-600 focus:border-emerald-400 focus:outline-none" placeholder="Country code and number" />
                  </label>
                  <label className="space-y-2 text-xs font-semibold text-slate-300">
                    <span>LinkedIn profile</span>
                    <input type="url" value={careerForm.linkedInUrl} onChange={(e) => setCareerForm({ ...careerForm, linkedInUrl: e.target.value })} className="w-full rounded-xl border border-white/10 bg-slate-950/80 px-4 py-3 text-sm text-white placeholder:text-slate-600 focus:border-emerald-400 focus:outline-none" placeholder="https://linkedin.com/in/..." />
                  </label>
                  <label className="space-y-2 text-xs font-semibold text-slate-300">
                    <span>Resume (PDF, DOCX) *</span>
                    <input 
                      required 
                      type="file" 
                      accept=".pdf,.doc,.docx"
                      onChange={(e) => {
                        if (e.target.files && e.target.files.length > 0) {
                          setCareerForm({ ...careerForm, resumeFile: e.target.files[0] });
                        }
                      }} 
                      className="w-full rounded-xl border border-white/10 bg-slate-950/80 px-4 py-2.5 text-sm text-white file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-emerald-500/10 file:text-emerald-400 hover:file:bg-emerald-500/20 focus:border-emerald-400 focus:outline-none" 
                    />
                  </label>
                </div>

                <label className="block space-y-2 text-xs font-semibold text-slate-300">
                  <span>Why are you interested?</span>
                  <textarea rows={4} value={careerForm.message} onChange={(e) => setCareerForm({ ...careerForm, message: e.target.value })} className="w-full resize-none rounded-xl border border-white/10 bg-slate-950/80 px-4 py-3 text-sm text-white placeholder:text-slate-600 focus:border-emerald-400 focus:outline-none" placeholder="Tell us briefly about your relevant experience." />
                </label>

                {careerError && <p role="alert" className="text-sm text-rose-300">{careerError}</p>}

                <button disabled={careerLoading} className="inline-flex items-center justify-center gap-2 rounded-xl bg-emerald-500 px-7 py-3.5 text-sm font-bold text-slate-950 transition-colors hover:bg-emerald-400 disabled:cursor-not-allowed disabled:opacity-60">
                  {careerLoading ? <Loader2 className="w-4 h-4 animate-spin" /> : <Send className="w-4 h-4" />}
                  <span>{careerLoading ? 'Submitting application...' : 'Submit application'}</span>
                </button>
              </form>
            )}
          </div>
          )}
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
