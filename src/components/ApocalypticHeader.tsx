import { useState, useEffect } from 'react';
import { AlertTriangle, Zap } from 'lucide-react';

interface ApocalypticHeaderProps {
  quantumChaos: number;
  universesDestroyed: number;
}

export function ApocalypticHeader({ quantumChaos, universesDestroyed }: ApocalypticHeaderProps) {
  const [timeLeft, setTimeLeft] = useState(3600);
  const [glitch, setGlitch] = useState(false);

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft((prev) => (prev > 0 ? prev - 1 : 3600));
    }, 1000);

    const glitchInterval = setInterval(() => {
      if (Math.random() > 0.95) setGlitch(true);
      setTimeout(() => setGlitch(false), 100);
    }, 500);

    return () => {
      clearInterval(timer);
      clearInterval(glitchInterval);
    };
  }, []);

  const minutes = Math.floor(timeLeft / 60);
  const seconds = timeLeft % 60;

  const chaosColor = quantumChaos < 30 ? 'text-green-400' : quantumChaos < 70 ? 'text-yellow-400' : 'text-red-500';

  return (
    <div className="relative z-20 border-b-2 border-cyan-500/50 bg-gradient-to-b from-black via-cyan-950/20 to-transparent py-6 px-4 overflow-hidden">
      <style>{`
        @keyframes glitch-text {
          0%, 100% { clip-path: inset(0); }
          20% { clip-path: inset(60% 0 20% 0); transform: translate(-2px, 2px); }
          40% { clip-path: inset(20% 0 60% 0); transform: translate(2px, -2px); }
          60% { clip-path: inset(40% 0 40% 0); transform: translate(-2px, -2px); }
          80% { clip-path: inset(10% 0 70% 0); transform: translate(2px, 2px); }
        }
        .glitch-header {
          animation: glitch-text 0.3s;
        }
        @keyframes pulse-danger {
          0%, 100% { opacity: 1; }
          50% { opacity: 0.5; }
        }
        .pulse-danger { animation: pulse-danger 0.5s infinite; }
      `}</style>

      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
          <div className={glitch ? 'glitch-header' : ''}>
            <h1 className="text-3xl md:text-4xl font-mono font-black text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-red-500 to-cyan-400 mb-1">
              ⚡ QUANTUM_DEBUGGER ⚡
            </h1>
            <p className="text-xs md:text-sm font-mono text-gray-400 leading-tight">
              {'> '}<span className="text-cyan-300">REALITY STABILITY STATUS: CRITICAL</span>
            </p>
          </div>

          <div className="flex items-center justify-center">
            <div className="text-center">
              <div className="text-xs font-mono text-red-400 mb-1">[ QUANTUM CHAOS ]</div>
              <div className={`text-2xl md:text-3xl font-mono font-black ${chaosColor}`}>
                {quantumChaos}%
              </div>
              <div className="h-2 w-32 bg-gray-900 rounded-full mt-1 overflow-hidden mx-auto">
                <div
                  className={`h-full transition-all ${
                    quantumChaos < 30 ? 'bg-green-500' : quantumChaos < 70 ? 'bg-yellow-500' : 'bg-red-500'
                  }`}
                  style={{ width: `${quantumChaos}%` }}
                />
              </div>
            </div>
          </div>

          <div className="text-right">
            <div className="inline-block">
              <div className="text-xs font-mono text-red-400 mb-1">[ COUNTDOWN TO COLLAPSE ]</div>
              <div className={`text-2xl md:text-3xl font-mono font-black text-red-500 pulse-danger`}>
                {String(minutes).padStart(2, '0')}:{String(seconds).padStart(2, '0')}
              </div>
              <div className="text-xs font-mono text-gray-500 mt-1">
                UNIVERSES LOST: <span className="text-red-400">{universesDestroyed}</span>
              </div>
            </div>
          </div>
        </div>

        <div className="flex gap-2 text-xs font-mono">
          <AlertTriangle className="w-4 h-4 text-yellow-400 flex-shrink-0 mt-0.5" />
          <p className="text-yellow-400">
            {'> '}<span className="text-yellow-300">MULTIVERSE DECAY ACCELERATING // REALITY COHERENCE AT {Math.round(100 - quantumChaos)}% // CAUSALITY LOOPS DETECTED</span>
          </p>
        </div>
      </div>
    </div>
  );
}
