import React from 'react';
import {
  Activity,
  ArrowRight,
  CloudCog,
  Cpu,
  Gauge,
  RadioTower,
  ServerCog,
  ShieldAlert,
  Thermometer,
  Wifi,
} from 'lucide-react';
import { ScrollReveal } from './animations/ScrollReveal';

interface IndustrialIoTSectionProps {
  onScheduleDemo: (interestArea?: string) => void;
  isLightMode?: boolean;
}

const capabilities = [
  {
    icon: ServerCog,
    title: 'AI Server Room Health Management',
    description: 'Continuously monitor infrastructure health, environmental conditions, and equipment telemetry from one intelligent operations layer.',
  },
  {
    icon: Gauge,
    title: 'Predictive Asset Intelligence',
    description: 'Detect unusual patterns early and turn sensor signals into maintenance priorities before operational issues escalate.',
  },
  {
    icon: RadioTower,
    title: 'Real-Time Industrial Monitoring',
    description: 'Connect machines, gateways, and facility sensors for live status visibility across industrial environments.',
  },
  {
    icon: CloudCog,
    title: 'Edge-to-Cloud Automation',
    description: 'Run time-sensitive decisions at the edge while synchronizing events, insights, and audit history with cloud platforms.',
  },
];

const signals = [
  { icon: Thermometer, label: 'Environment', detail: 'Temperature · Humidity · Airflow', color: 'text-cyan-400' },
  { icon: Activity, label: 'Equipment Health', detail: 'Load · Vibration · Runtime', color: 'text-emerald-400' },
  { icon: ShieldAlert, label: 'Risk Detection', detail: 'Anomalies · Thresholds · Escalation', color: 'text-amber-400' },
];

export const IndustrialIoTSection: React.FC<IndustrialIoTSectionProps> = ({
  onScheduleDemo,
  isLightMode = false,
}) => {
  const heading = isLightMode ? 'text-slate-950' : 'text-white';
  const copy = isLightMode ? 'text-slate-600' : 'text-slate-300';
  const card = isLightMode
    ? 'bg-white/90 border-slate-200 shadow-lg shadow-slate-200/50'
    : 'bg-white/[0.035] border-white/10 shadow-2xl shadow-black/20';

  return (
    <section
      id="industrial-iot"
      className={`scroll-mt-20 relative overflow-hidden border-t py-24 transition-colors duration-300 ${
        isLightMode ? 'bg-white border-slate-200' : 'bg-[#050814] border-white/5'
      }`}
      aria-labelledby="industrial-iot-heading"
    >
      <div className="absolute inset-0 pointer-events-none" aria-hidden="true">
        <div className={`absolute -left-32 top-16 h-96 w-96 rounded-full blur-[120px] ${isLightMode ? 'bg-cyan-200/40' : 'bg-cyan-500/[0.08]'}`} />
        <div className={`absolute -right-24 bottom-0 h-96 w-96 rounded-full blur-[130px] ${isLightMode ? 'bg-emerald-200/40' : 'bg-emerald-500/[0.08]'}`} />
      </div>

      <div className="relative z-10 mx-auto max-w-7xl px-6 lg:px-8">
        <ScrollReveal animation="fade-up">
          <div className="mx-auto mb-14 max-w-4xl text-center">
            <div className={`mb-5 inline-flex items-center gap-2 rounded-full border px-4 py-1.5 text-[10px] font-bold uppercase tracking-[0.2em] ${
              isLightMode ? 'border-cyan-200 bg-cyan-50 text-cyan-700' : 'border-cyan-500/30 bg-cyan-500/10 text-cyan-300'
            }`}>
              <Wifi className="h-3.5 w-3.5" />
              <span>Industrial IoT & Edge AI</span>
            </div>
            <h2 id="industrial-iot-heading" className={`text-4xl font-extrabold tracking-tight sm:text-5xl lg:text-6xl ${heading}`}>
              AI-powered IoT for{' '}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-blue-400 to-emerald-400">
                real-time operations
              </span>
            </h2>
            <p className={`mx-auto mt-6 max-w-3xl text-base leading-relaxed sm:text-lg ${copy}`}>
              VTab Square engineers intelligent IoT applications that connect physical infrastructure with AI—helping industrial teams monitor health, identify risks, and act on live operational signals.
            </p>
          </div>
        </ScrollReveal>

        <div className="grid items-stretch gap-8 lg:grid-cols-[1.08fr_0.92fr]">
          <ScrollReveal animation="fade-right">
            <div className="grid h-full gap-4 sm:grid-cols-2">
              {capabilities.map(({ icon: Icon, title, description }) => (
                <article key={title} className={`group rounded-3xl border p-6 transition-all duration-300 hover:-translate-y-1 hover:border-cyan-500/40 ${card}`}>
                  <div className={`mb-5 flex h-12 w-12 items-center justify-center rounded-2xl border ${
                    isLightMode ? 'border-cyan-200 bg-cyan-50 text-cyan-700' : 'border-cyan-500/30 bg-cyan-500/10 text-cyan-300'
                  }`}>
                    <Icon className="h-6 w-6" />
                  </div>
                  <h3 className={`text-lg font-bold ${heading}`}>{title}</h3>
                  <p className={`mt-3 text-sm leading-relaxed ${copy}`}>{description}</p>
                </article>
              ))}
            </div>
          </ScrollReveal>

          <ScrollReveal animation="fade-left" delay={0.1} className="h-full">
            <div className={`relative h-full overflow-hidden rounded-[2rem] border p-6 sm:p-8 ${
              isLightMode ? 'border-slate-200 bg-white text-slate-900 shadow-[0_8px_30px_rgb(0,0,0,0.04)]' : 'border-cyan-500/20 bg-black/40 text-white shadow-[0_20px_80px_rgba(6,182,212,0.08)]'
            }`}>
              <div className={`absolute inset-0 bg-[size:32px_32px] ${
                isLightMode 
                  ? 'opacity-20 bg-[linear-gradient(rgba(15,23,42,0.05)_1px,transparent_1px),linear-gradient(90deg,rgba(15,23,42,0.05)_1px,transparent_1px)]' 
                  : 'opacity-40 bg-[linear-gradient(rgba(34,211,238,0.06)_1px,transparent_1px),linear-gradient(90deg,rgba(34,211,238,0.06)_1px,transparent_1px)]'
              }`} aria-hidden="true" />
              <div className="relative z-10 flex h-full flex-col">
                <div className={`flex items-center justify-between border-b pb-5 ${isLightMode ? 'border-slate-100' : 'border-white/10'}`}>
                  <div>
                    <p className={`text-[10px] font-bold uppercase tracking-[0.2em] ${isLightMode ? 'text-cyan-600' : 'text-cyan-400'}`}>Reference application</p>
                    <h3 className="mt-1 text-xl font-bold">AI Server Health Command Center</h3>
                  </div>
                  <div className={`relative flex h-11 w-11 items-center justify-center rounded-2xl border ${
                    isLightMode ? 'border-emerald-200 bg-emerald-50 text-emerald-600' : 'border-emerald-500/30 bg-emerald-500/10 text-emerald-400'
                  }`}>
                    <Cpu className="h-5 w-5" />
                    <span className={`absolute -right-1 -top-1 h-3 w-3 rounded-full border-2 bg-emerald-400 ${isLightMode ? 'border-white' : 'border-slate-950'}`} />
                  </div>
                </div>

                <div className="my-7 space-y-3">
                  {signals.map(({ icon: Icon, label, detail, color }) => (
                    <div key={label} className={`flex items-center gap-4 rounded-2xl border p-4 backdrop-blur-sm ${
                      isLightMode ? 'border-slate-100 bg-slate-50' : 'border-white/10 bg-white/[0.04]'
                    }`}>
                      <div className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-xl ${
                        isLightMode ? 'bg-white shadow-sm ' + color.replace('400', '600') : 'bg-white/[0.05] ' + color
                      }`}>
                        <Icon className="h-5 w-5" />
                      </div>
                      <div className="min-w-0 flex-1">
                        <div className="flex items-center justify-between gap-3">
                          <p className="text-sm font-bold">{label}</p>
                          <span className={`text-[9px] font-bold uppercase tracking-wider ${isLightMode ? 'text-emerald-600' : 'text-emerald-400'}`}>Connected</span>
                        </div>
                        <p className={`mt-1 truncate text-xs ${isLightMode ? 'text-slate-500' : 'text-slate-400'}`}>{detail}</p>
                      </div>
                    </div>
                  ))}
                </div>

                <div className={`mt-auto rounded-2xl border p-5 ${
                  isLightMode 
                    ? 'border-cyan-100 bg-gradient-to-r from-cyan-50 to-emerald-50' 
                    : 'border-cyan-500/20 bg-gradient-to-r from-cyan-500/10 to-emerald-500/10'
                }`}>
                  <div className="grid grid-cols-3 gap-3 text-center">
                    {['24/7 Monitoring', 'Early Risk Alerts', 'Edge + Cloud'].map((item) => (
                      <div key={item} className={`text-[10px] font-bold uppercase leading-relaxed tracking-wider ${
                        isLightMode ? 'text-slate-600' : 'text-slate-300'
                      }`}>{item}</div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </ScrollReveal>
        </div>

        <ScrollReveal animation="fade-up" delay={0.15}>
          <div className="mt-12 flex flex-col items-center justify-between gap-5 rounded-3xl border border-cyan-500/20 bg-gradient-to-r from-cyan-500/10 via-blue-500/[0.06] to-emerald-500/10 px-6 py-6 text-center sm:flex-row sm:text-left">
            <div>
              <p className={`text-lg font-bold ${heading}`}>Planning an industrial monitoring or connected-operations use case?</p>
              <p className={`mt-1 text-sm ${copy}`}>Let’s map your sensors, operational signals, AI models, alerts, and deployment architecture.</p>
            </div>
            <button
              onClick={() => onScheduleDemo('Industrial IoT & Edge AI')}
              className="inline-flex shrink-0 items-center gap-2 rounded-full bg-cyan-400 px-6 py-3 text-sm font-bold text-slate-950 transition-all hover:bg-cyan-300 hover:shadow-[0_0_30px_rgba(34,211,238,0.25)]"
            >
              <span>Discuss an IoT Use Case</span>
              <ArrowRight className="h-4 w-4" />
            </button>
          </div>
        </ScrollReveal>
      </div>
    </section>
  );
};

export default IndustrialIoTSection;
