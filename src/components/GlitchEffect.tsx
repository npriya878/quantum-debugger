import React from 'react';

interface GlitchEffectProps {
  children: React.ReactNode;
  intensity?: 'low' | 'medium' | 'high';
  className?: string;
}

export function GlitchEffect({ children, intensity = 'medium', className = '' }: GlitchEffectProps) {
  const durations = {
    low: '0.5s',
    medium: '0.3s',
    high: '0.15s',
  };

  return (
    <div
      className={`relative inline-block ${className}`}
      style={{
        animation: `glitch-effect ${durations[intensity]} infinite`,
      }}
    >
      <style>{`
        @keyframes glitch-effect {
          0%, 100% {
            clip-path: inset(0);
            transform: translate(0);
          }
          20% {
            clip-path: inset(60% 0 20% 0);
            transform: translate(-1px, 1px);
            opacity: 0.8;
          }
          40% {
            clip-path: inset(20% 0 60% 0);
            transform: translate(1px, -1px);
            opacity: 0.7;
          }
          60% {
            clip-path: inset(40% 0 40% 0);
            transform: translate(-1px, -1px);
            opacity: 0.8;
          }
          80% {
            clip-path: inset(10% 0 70% 0);
            transform: translate(1px, 1px);
            opacity: 0.6;
          }
        }
      `}</style>
      {children}
    </div>
  );
}
