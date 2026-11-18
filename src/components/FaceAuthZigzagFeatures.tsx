import React from 'react';
import {
  Sparkles,
  Database,
  Check,
  ShieldCheck,
  Cpu,
  MapPin,
  Lock,
  Zap,
  Terminal,
  Shield
} from 'lucide-react';
import { AmbientGlow } from './AmbientGlow';

export const FaceAuthZigzagFeatures: React.FC = () => {
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
            Engineered layer by layer for security, compliance, and real-time speed.
          </h2>
          <p className="text-base sm:text-lg text-slate-300 leading-relaxed">
            Every tier of the FaceAuth architecture is purpose-built to eliminate attendance fraud, prevent proxy check-ins ("buddy punching"), and enforce strict corporate data governance.
          </p>
        </div>

        {/* ── ROW 1: Layer 01 - Secure Cloud Dataverse Federation (Text Left, Visual Right) ── */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-14 items-center relative">
          <AmbientGlow variant="zigzag-cyan" />
          
          {/* Text Left (6 cols) */}
          <div className="lg:col-span-6 space-y-6 text-left">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-950/80 border border-blue-500/30 text-xs font-mono font-semibold text-cyan-300">
              <Database className="w-3.5 h-3.5 text-cyan-400" />
              <span>01 · SECURE CLOUD DATAVERSE FEDERATION</span>
            </div>

            <h3 className="text-2xl sm:text-4xl font-extrabold text-white tracking-tight leading-snug">
              Enterprise-grade data persistence powered by Microsoft Dataverse.
            </h3>

            <p className="text-slate-300 text-sm sm:text-base leading-relaxed">
              Seamlessly integrate employee registries and real-time attendance logs directly with Microsoft Dataverse via Azure AD App Registration. Benefit from resilient OAuth2 MSAL token pooling and exponential backoff retry mechanisms.
            </p>

            <div className="space-y-3 pt-2">
              <div className="flex items-start gap-3">
                <div className="w-5 h-5 rounded-full bg-cyan-500/10 border border-cyan-500/30 flex items-center justify-center shrink-0 mt-0.5">
                  <Check className="w-3 h-3 text-cyan-400" />
                </div>
                <span className="text-sm text-slate-300 leading-relaxed">
                  Direct integration with Microsoft Dataverse OData REST API v9.2
                </span>
              </div>
              <div className="flex items-start gap-3">
                <div className="w-5 h-5 rounded-full bg-cyan-500/10 border border-cyan-500/30 flex items-center justify-center shrink-0 mt-0.5">
                  <Check className="w-3 h-3 text-cyan-400" />
                </div>
                <span className="text-sm text-slate-300 leading-relaxed">
                  Automatic OAuth2 token caching and refresh with MSAL Confidential Client
                </span>
              </div>
              <div className="flex items-start gap-3">
                <div className="w-5 h-5 rounded-full bg-cyan-500/10 border border-cyan-500/30 flex items-center justify-center shrink-0 mt-0.5">
                  <Check className="w-3 h-3 text-cyan-400" />
                </div>
                <span className="text-sm text-slate-300 leading-relaxed">
                  Resilient connection architecture with automated 3-tier exponential backoff retries
                </span>
              </div>
            </div>

            {/* Badges */}
            <div className="pt-4 flex flex-wrap gap-2">
              <span className="px-3 py-1 rounded-full text-xs font-mono bg-slate-900 text-cyan-300 border border-cyan-500/30">
                Azure AD Authenticated
              </span>
              <span className="px-3 py-1 rounded-full text-xs font-mono bg-slate-900 text-cyan-300 border border-cyan-500/30">
                OData v4.0 Certified
              </span>
              <span className="px-3 py-1 rounded-full text-xs font-mono bg-slate-900 text-emerald-300 border border-emerald-500/30">
                TLS 1.3 Strict
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
                AZURE ODATA LIVE
              </span>
            </div>

            <div className="p-6 space-y-3 font-mono text-xs sm:text-sm">
              <div className="flex items-center justify-between p-3 rounded-lg bg-black/40 border border-white/5">
                <span className="text-slate-300">Microsoft Dataverse User Entity (`crc6f_faceappuserses`)</span>
                <span className="text-emerald-400 font-bold text-xs">Connected (OData 4.0 Active)</span>
              </div>
              <div className="flex items-center justify-between p-3 rounded-lg bg-black/40 border border-white/5">
                <span className="text-slate-300">Attendance Ledger (`crc6f_hr_faceappattendances`)</span>
                <span className="text-cyan-400 font-bold text-xs">Connected (Real-Time Commits)</span>
              </div>
              <div className="flex items-center justify-between p-3 rounded-lg bg-black/40 border border-white/5">
                <span className="text-slate-300">Azure Active Directory Authority</span>
                <span className="text-cyan-400 font-bold text-xs">Connected (OAuth2 Bearer Validated)</span>
              </div>
              <div className="flex items-center justify-between p-3 rounded-lg bg-black/40 border border-white/5">
                <span className="text-slate-300">Brevo Cloud Dispatcher</span>
                <span className="text-sky-400 font-bold text-xs">Connected (Transactional Pipeline)</span>
              </div>
            </div>

            <div className="p-4 bg-black/80 border-t border-white/10 text-xs font-mono text-slate-400 flex items-center gap-2">
              <Shield className="w-4 h-4 text-emerald-400 shrink-0" />
              <span>Target Status: Zero-tampering guarantee. 100% of check-in events cryptographically correlated with user GUIDs and GPS telemetry.</span>
            </div>
          </div>
        </div>

        {/* ── ROW 2: Layers 02 & 03 - Haversine Geo-Spatial Verification (Visual Left, Text Right) ── */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-14 items-center relative">
          <AmbientGlow variant="zigzag-blue" />

          {/* Visual Left (6 cols) */}
          <div className="lg:col-span-6 order-2 lg:order-1 rounded-2xl sm:rounded-3xl border border-white/10 bg-slate-950/90 backdrop-blur-xl overflow-hidden shadow-2xl">
            <div className="px-5 py-3.5 bg-black/60 border-b border-white/10 flex items-center justify-between text-xs">
              <span className="font-mono text-slate-400 text-[11px] flex items-center gap-1.5">
                <MapPin className="w-3.5 h-3.5 text-cyan-400" />
                Unified Model Topology & Geofence Auditor
              </span>
              <span className="px-2 py-0.5 rounded text-[10px] font-mono bg-emerald-950 text-emerald-300 border border-emerald-500/40">
                AUDIT ENFORCED
              </span>
            </div>

            {/* Topology Flowchart */}
            <div className="p-6 font-mono text-xs sm:text-sm space-y-4">
              <div className="flex items-center gap-3 p-3 rounded-lg bg-black/40 border border-white/5">
                <span className="text-slate-300">Live Capture</span>
                <span className="text-cyan-400 font-bold">────▶</span>
                <span className="text-cyan-300 font-semibold">128D Face Embedding</span>
              </div>
              <div className="flex items-center gap-3 p-3 rounded-lg bg-black/40 border border-white/5">
                <span className="text-slate-300">GPS Coordinates</span>
                <span className="text-cyan-400 font-bold">──▶</span>
                <span className="text-emerald-400 font-semibold">Haversine Geo-Auditor</span>
              </div>
              <div className="flex items-center gap-3 p-3 rounded-lg bg-black/40 border border-white/5">
                <span className="text-amber-400 font-bold">Anomaly Trigger</span>
                <span className="text-amber-400 font-bold">──▶</span>
                <span className="text-amber-300 font-semibold">Instant Admin Notification (Brevo)</span>
              </div>
            </div>

            <div className="p-4 bg-black/80 border-t border-white/10 text-xs font-mono text-slate-400 flex items-center gap-2">
              <Zap className="w-4 h-4 text-cyan-400 shrink-0" />
              <span>Status: Zero unverified check-ins or location spoofing permitted.</span>
            </div>
          </div>

          {/* Text Right (6 cols) */}
          <div className="lg:col-span-6 order-1 lg:order-2 space-y-6 text-left">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-950/80 border border-emerald-500/30 text-xs font-mono font-semibold text-emerald-300">
              <MapPin className="w-3.5 h-3.5 text-emerald-400" />
              <span>02 & 03 · HAVERSINE GEO-SPATIAL VERIFICATION</span>
            </div>

            <h3 className="text-2xl sm:text-4xl font-extrabold text-white tracking-tight leading-snug">
              Haversine geo-spatial verification & intelligent alert dispatch.
            </h3>

            <p className="text-slate-300 text-sm sm:text-base leading-relaxed">
              Validate the physical integrity of every punch-in and punch-out. FaceAuth computes the straight-line Haversine geodesic distance between login and logout coordinates, automatically flagging and notifying administrators when discrepancies exceed organizational thresholds.
            </p>

            <div className="space-y-3 pt-2">
              <div className="flex items-start gap-3">
                <div className="w-5 h-5 rounded-full bg-emerald-500/10 border border-emerald-500/30 flex items-center justify-center shrink-0 mt-0.5">
                  <Check className="w-3 h-3 text-emerald-400" />
                </div>
                <span className="text-sm text-slate-300 leading-relaxed">
                  Real-time dual-point GPS validation comparing entry and exit device coordinates
                </span>
              </div>
              <div className="flex items-start gap-3">
                <div className="w-5 h-5 rounded-full bg-emerald-500/10 border border-emerald-500/30 flex items-center justify-center shrink-0 mt-0.5">
                  <Check className="w-3 h-3 text-emerald-400" />
                </div>
                <span className="text-sm text-slate-300 leading-relaxed">
                  Automated 500-meter threshold breach detection with direct Google Maps geo-link dispatch
                </span>
              </div>
              <div className="flex items-start gap-3">
                <div className="w-5 h-5 rounded-full bg-emerald-500/10 border border-emerald-500/30 flex items-center justify-center shrink-0 mt-0.5">
                  <Check className="w-3 h-3 text-emerald-400" />
                </div>
                <span className="text-sm text-slate-300 leading-relaxed">
                  Instantaneous Brevo SMTP security notifications sent to security and HR leadership
                </span>
              </div>
            </div>

            {/* Badges */}
            <div className="pt-4 flex flex-wrap gap-2">
              <span className="px-3 py-1 rounded-full text-xs font-mono bg-slate-900 text-cyan-300 border border-cyan-500/30">
                GPS Verified
              </span>
              <span className="px-3 py-1 rounded-full text-xs font-mono bg-slate-900 text-emerald-300 border border-emerald-500/30">
                Anomaly Audited
              </span>
              <span className="px-3 py-1 rounded-full text-xs font-mono bg-slate-900 text-cyan-300 border border-cyan-500/30">
                Real-Time Admin Alerts
              </span>
            </div>
          </div>
        </div>

        {/* ── ROW 3: Layer 04 - Privacy-First 128D Vector Embedding Engine (Text Left, Visual Right) ── */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-14 items-center relative">
          <AmbientGlow variant="zigzag-cyan" />

          {/* Text Left (6 cols) */}
          <div className="lg:col-span-6 space-y-6 text-left">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-950/80 border border-cyan-500/30 text-xs font-mono font-semibold text-cyan-300">
              <Cpu className="w-3.5 h-3.5 text-cyan-400" />
              <span>04 · PRIVACY-FIRST 128D VECTOR EMBEDDING ENGINE</span>
            </div>

            <h3 className="text-2xl sm:text-4xl font-extrabold text-white tracking-tight leading-snug">
              Mathematical vector representation with zero raw image exposure.
            </h3>

            <p className="text-slate-300 text-sm sm:text-base leading-relaxed">
              Eliminate liability and respect employee biometric confidentiality. FaceAuth decodes camera input using dlib and OpenCV, converts facial geometry into a non-reversible 128-dimensional floating point vector, and immediately discards the raw pixel buffer from memory.
            </p>

            <div className="space-y-3 pt-2">
              <div className="flex items-start gap-3">
                <div className="w-5 h-5 rounded-full bg-cyan-500/10 border border-cyan-500/30 flex items-center justify-center shrink-0 mt-0.5">
                  <Check className="w-3 h-3 text-cyan-400" />
                </div>
                <span className="text-sm text-slate-300 leading-relaxed">
                  Sub-second edge inference via pre-trained deep metric learning architecture
                </span>
              </div>
              <div className="flex items-start gap-3">
                <div className="w-5 h-5 rounded-full bg-cyan-500/10 border border-cyan-500/30 flex items-center justify-center shrink-0 mt-0.5">
                  <Check className="w-3 h-3 text-cyan-400" />
                </div>
                <span className="text-sm text-slate-300 leading-relaxed">
                  Irreversible mathematical representations compliant with strict data protection standards
                </span>
              </div>
              <div className="flex items-start gap-3">
                <div className="w-5 h-5 rounded-full bg-cyan-500/10 border border-cyan-500/30 flex items-center justify-center shrink-0 mt-0.5">
                  <Check className="w-3 h-3 text-cyan-400" />
                </div>
                <span className="text-sm text-slate-300 leading-relaxed">
                  Dynamic multi-device face enrollment with instant baseline re-calibration
                </span>
              </div>
            </div>

            {/* Badges */}
            <div className="pt-4 flex flex-wrap gap-2">
              <span className="px-3 py-1 rounded-full text-xs font-mono bg-slate-900 text-cyan-300 border border-cyan-500/30">
                128D Mathematical Vector
              </span>
              <span className="px-3 py-1 rounded-full text-xs font-mono bg-slate-900 text-cyan-300 border border-cyan-500/30">
                Zero Raw Image Retention
              </span>
              <span className="px-3 py-1 rounded-full text-xs font-mono bg-slate-900 text-emerald-300 border border-emerald-500/30">
                GDPR & CCPA Compliant
              </span>
            </div>
          </div>

          {/* Visual Right (6 cols) */}
          <div className="lg:col-span-6 rounded-2xl sm:rounded-3xl border border-white/10 bg-slate-950/90 backdrop-blur-xl overflow-hidden shadow-2xl">
            <div className="px-5 py-3.5 bg-black/60 border-b border-white/10 flex items-center justify-between text-xs">
              <span className="font-mono text-slate-400 text-[11px] flex items-center gap-1.5">
                <Cpu className="w-3.5 h-3.5 text-cyan-400" />
                128D Latent Feature Projector
              </span>
              <span className="px-2 py-0.5 rounded text-[10px] font-mono bg-emerald-950 text-emerald-300 border border-emerald-500/40">
                RAM SANITIZED
              </span>
            </div>

            <div className="p-6 space-y-3 font-mono text-xs sm:text-sm">
              <div className="p-3 rounded-lg bg-black/40 border border-white/5 space-y-1">
                <div className="text-[10px] text-slate-400 uppercase">INCOMING CAMERA FRAME</div>
                <div className="text-cyan-300 font-bold">1920x1080 YUV420 ➔ 68 Facial Landmarks Aligned</div>
                <div className="text-[11px] text-emerald-400">Affine normalization applied · Contrast equalized</div>
              </div>
              <div className="p-3 rounded-lg bg-black/40 border border-white/5 space-y-1">
                <div className="text-[10px] text-slate-400 uppercase">RESNET-34 VECTOR EMBEDDING</div>
                <div className="text-white font-bold">[0.0412, -0.1982, 0.0894, ... +125 dims]</div>
                <div className="text-[11px] text-slate-400">128-dimensional unit hypersphere projection</div>
              </div>
              <div className="p-3 rounded-lg bg-black/40 border border-white/5 space-y-1">
                <div className="text-[10px] text-slate-400 uppercase">MEMORY PURGE AUDIT</div>
                <div className="text-slate-300 font-mono text-[11px]">Raw pixel frame array memset(0) and freed in 2.1ms</div>
              </div>
            </div>

            <div className="p-4 bg-black/80 border-t border-white/10 text-xs font-mono text-slate-400 flex items-center gap-2">
              <Lock className="w-4 h-4 text-emerald-400 shrink-0" />
              <span>Biometric Privacy: Only irreversible numeric float coordinates are stored.</span>
            </div>
          </div>
        </div>

      </div>
    </section>
  );
};
