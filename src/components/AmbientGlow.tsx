import React from 'react';

interface AmbientGlowProps {
  variant?: 'hero' | 'section' | 'subtle' | 'zigzag-cyan' | 'zigzag-violet';
  className?: string;
}

export const AmbientGlow: React.FC<AmbientGlowProps> = ({ variant = 'section', className = '' }) => {
  if (variant === 'hero') {
    return (
      <div className={`absolute inset-0 pointer-events-none overflow-hidden -z-10 ${className}`} aria-hidden="true">
        {/* Main top-center cyan/blue atmospheric beacon */}
        <div className="absolute top-[-20%] left-1/2 -translate-x-1/2 w-[900px] h-[550px] bg-gradient-to-b from-cyan-500/25 via-blue-600/20 to-transparent blur-[140px] rounded-full mix-blend-screen" />
        {/* Deep electric indigo secondary aurora */}
        <div className="absolute top-[15%] -left-[10%] w-[700px] h-[600px] bg-indigo-600/20 blur-[150px] rounded-full mix-blend-screen animate-pulse" style={{ animationDuration: '8s' }} />
        {/* Deep violet rim aurora */}
        <div className="absolute top-[25%] -right-[10%] w-[650px] h-[550px] bg-purple-600/18 blur-[160px] rounded-full mix-blend-screen" />
        {/* Concentrated bright glow behind desktop preview */}
        <div className="absolute top-[35%] right-[15%] w-[500px] h-[400px] bg-cyan-400/15 blur-[120px] rounded-full mix-blend-screen" />
      </div>
    );
  }

  if (variant === 'zigzag-cyan') {
    return (
      <div className={`absolute inset-0 pointer-events-none overflow-hidden -z-10 ${className}`} aria-hidden="true">
        <div className="absolute top-1/2 -left-20 -translate-y-1/2 w-[600px] h-[500px] bg-cyan-500/15 blur-[140px] rounded-full mix-blend-screen" />
        <div className="absolute bottom-0 right-10 w-[450px] h-[400px] bg-blue-600/15 blur-[130px] rounded-full mix-blend-screen" />
      </div>
    );
  }

  if (variant === 'zigzag-violet') {
    return (
      <div className={`absolute inset-0 pointer-events-none overflow-hidden -z-10 ${className}`} aria-hidden="true">
        <div className="absolute top-1/2 -right-20 -translate-y-1/2 w-[600px] h-[500px] bg-indigo-500/18 blur-[140px] rounded-full mix-blend-screen" />
        <div className="absolute bottom-0 left-10 w-[450px] h-[400px] bg-purple-600/14 blur-[130px] rounded-full mix-blend-screen" />
      </div>
    );
  }

  if (variant === 'subtle') {
    return (
      <div className={`absolute inset-0 pointer-events-none overflow-hidden -z-10 ${className}`} aria-hidden="true">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[350px] bg-blue-500/10 blur-[140px] rounded-full mix-blend-screen" />
      </div>
    );
  }

  return (
    <div className={`absolute inset-0 pointer-events-none overflow-hidden -z-10 ${className}`} aria-hidden="true">
      <div className="absolute top-1/4 left-1/4 w-[700px] h-[450px] bg-indigo-600/15 blur-[150px] rounded-full mix-blend-screen" />
      <div className="absolute bottom-1/4 right-1/4 w-[650px] h-[450px] bg-cyan-600/15 blur-[140px] rounded-full mix-blend-screen" />
    </div>
  );
};
