import React, { useState } from 'react';
import { Product } from '../types';
import { ProductVideoStreamingPlayer } from './ProductVideoStreamingPlayer';
import { X, Sparkles, CheckCircle2, Cpu, Layers, ArrowRight, ShieldCheck, Play, Terminal, Radio, Eye } from 'lucide-react';

interface ProductDetailModalProps {
  product: Product | null;
  onClose: () => void;
  onScheduleDemo: (productTitle?: string) => void;
  onOpenSandbox: () => void;
}

export const ProductDetailModal: React.FC<ProductDetailModalProps> = ({
  product,
  onClose,
  onScheduleDemo,
  onOpenSandbox
}) => {
  const [modalMediaTab, setModalMediaTab] = useState<'video' | 'photo'>('video');

  if (!product) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-xl animate-in fade-in duration-200">
      <div className="relative w-full max-w-2xl backdrop-blur-xl bg-[#02040a]/90 rounded-2xl border border-white/10 p-6 sm:p-8 shadow-2xl overflow-hidden max-h-[90vh] overflow-y-auto space-y-6">
        
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-2 rounded-xl text-slate-400 hover:text-white bg-slate-900 border border-slate-800 transition-colors cursor-pointer z-10"
          id="close-product-modal-btn"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Header */}
        <div className="space-y-2 pr-8">
          <div className="flex flex-wrap items-center gap-2">
            <span className="px-2.5 py-0.5 text-[10px] font-bold text-cyan-300 bg-cyan-950/80 border border-cyan-500/30 rounded-full">
              {product.category}
            </span>
            <span className="px-2.5 py-0.5 text-[10px] font-bold text-emerald-300 bg-emerald-950/80 border border-emerald-500/30 rounded-full flex items-center gap-1">
              <Sparkles className="w-3 h-3 text-emerald-400" />
              {product.impactMetric}
            </span>
          </div>

          <h3 className="text-2xl font-extrabold text-white tracking-tight">{product.title}</h3>
          <p className="text-xs text-slate-300 leading-relaxed">{product.shortDescription}</p>
        </div>

        {/* Interactive Media Streaming Player or High-Res Photo Banner */}
        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <h4 className="text-xs font-bold text-white uppercase tracking-wider flex items-center gap-1.5">
              <Radio className="w-3.5 h-3.5 text-red-400 animate-pulse" />
              Interactive Demo Media Stream
            </h4>

            {/* Media Tab Switcher */}
            <div className="flex items-center gap-1 bg-slate-900 p-1 rounded-lg border border-slate-800">
              <button
                onClick={() => setModalMediaTab('video')}
                className={`px-2.5 py-0.5 rounded text-[10px] font-bold transition-all flex items-center gap-1 cursor-pointer ${
                  modalMediaTab === 'video' ? 'bg-red-600 text-white' : 'text-slate-400 hover:text-white'
                }`}
              >
                <Radio className="w-3 h-3" />
                <span>Live Stream</span>
              </button>
              <button
                onClick={() => setModalMediaTab('photo')}
                className={`px-2.5 py-0.5 rounded text-[10px] font-bold transition-all flex items-center gap-1 cursor-pointer ${
                  modalMediaTab === 'photo' ? 'bg-blue-600 text-white' : 'text-slate-400 hover:text-white'
                }`}
              >
                <Eye className="w-3 h-3" />
                <span>Picture</span>
              </button>
            </div>
          </div>

          <div className="h-64 sm:h-72 w-full rounded-2xl overflow-hidden border border-white/15 shadow-2xl bg-slate-950">
            {modalMediaTab === 'video' ? (
              <ProductVideoStreamingPlayer
                productId={product.id}
                productTitle={product.title}
                imageUrl={product.imageUrl}
                videoUrl={product.detailContent?.videoUrl || (product.demoSnippet as any)?.videoUrl}
                compactMode={false}
              />
            ) : (
              <div className="relative w-full h-full">
                <img
                  src={product.imageUrl || 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=1200&q=80'}
                  alt={product.title}
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-cover object-center"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-transparent to-transparent" />
              </div>
            )}
          </div>
        </div>

        {/* Full Overview */}
        <div className="bg-slate-950/80 rounded-xl p-4 border border-slate-800 space-y-2">
          <h4 className="text-xs font-bold text-white uppercase tracking-wider flex items-center gap-1.5">
            <Cpu className="w-3.5 h-3.5 text-blue-400" />
            Architectural Summary
          </h4>
          <p className="text-xs text-slate-300 leading-relaxed">{product.fullDescription}</p>
        </div>

        {/* Key Features */}
        <div className="space-y-2">
          <h4 className="text-xs font-bold text-white uppercase tracking-wider flex items-center gap-1.5">
            <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
            Core Capabilities
          </h4>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
            {product.keyFeatures.map((feat, idx) => (
              <div key={idx} className="flex items-start gap-2 bg-slate-900/60 p-2.5 rounded-lg border border-slate-800/80">
                <CheckCircle2 className="w-4 h-4 text-cyan-400 shrink-0 mt-0.5" />
                <span className="text-xs text-slate-300 leading-snug">{feat}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Technical Stack */}
        <div className="space-y-2">
          <h4 className="text-xs font-bold text-white uppercase tracking-wider flex items-center gap-1.5">
            <Layers className="w-3.5 h-3.5 text-purple-400" />
            Technology & Integration Stack
          </h4>
          <div className="flex flex-wrap gap-1.5">
            {product.techStack.map((tech, idx) => (
              <span key={idx} className="px-2.5 py-1 text-xs font-medium text-slate-200 bg-slate-900 border border-slate-700 rounded-lg font-mono">
                {tech}
              </span>
            ))}
          </div>
        </div>

        {/* Action Buttons */}
        <div className="pt-4 border-t border-slate-800 flex flex-col sm:flex-row items-center justify-between gap-3">
          <button
            onClick={() => {
              onClose();
              onOpenSandbox();
            }}
            className="w-full sm:w-auto px-4 py-2.5 rounded-xl text-xs font-semibold text-cyan-300 bg-slate-900 border border-cyan-500/40 hover:bg-slate-800 transition-all flex items-center justify-center gap-2 cursor-pointer"
          >
            <Terminal className="w-3.5 h-3.5 text-cyan-400" />
            <span>Test Logic in AI Sandbox</span>
          </button>

          <button
            onClick={() => {
              onClose();
              onScheduleDemo(product.title);
            }}
            className="w-full sm:w-auto px-6 py-2.5 rounded-xl font-semibold text-xs text-white bg-blue-600 hover:bg-blue-500 shadow-lg shadow-blue-600/30 flex items-center justify-center gap-2 transition-all cursor-pointer"
            id={`modal-demo-${product.id}`}
          >
            <span>Schedule Product Demo</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>

      </div>
    </div>
  );
};
