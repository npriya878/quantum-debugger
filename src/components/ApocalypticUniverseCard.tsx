import { useState } from 'react';
import { Universe } from '../types';
import { Copy, Check, AlertTriangle, Zap } from 'lucide-react';
import hljs from 'highlight.js';
import 'highlight.js/styles/atom-one-dark.css';
import { GlitchEffect } from './GlitchEffect';

interface ApocalypticUniverseCardProps {
  universe: Universe;
  index: number;
  chaosLevel: number;
}

const universeNames = [
  'The Performance Dimension',
  'The Cursed Realm',
  'The Elegant Paradise',
  'The Engineered Fortress',
  'The Chaotic Void',
];

const apocalypticTradeoffs = [
  'Sacrifices stability for speed. Reality may tear.',
  'This solution is cursed. Use only in desperation.',
  'Perfect, but at what cost? A universe dies for every execution.',
  'Rock solid. No surprises. No hope.',
  'Completely unpredictable. Quantum gods weep.',
];

export function ApocalypticUniverseCard({ universe, index, chaosLevel }: ApocalypticUniverseCardProps) {
  const [copied, setCopied] = useState(false);
  const [isExpanded, setIsExpanded] = useState(false);
  const [sacrificed, setSacrificed] = useState(false);

  const copyCode = () => {
    navigator.clipboard.writeText(universe.code);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const chaosColor = universe.chaosRating <= 3 ? 'text-green-500' : universe.chaosRating <= 6 ? 'text-yellow-500' : 'text-red-600';
  const stabilityPercent = 100 - universe.chaosRating * 10;

  let highlightedCode = universe.code;
  try {
    highlightedCode = hljs.highlight(universe.code, { language: universe.language, ignoreIllegals: true }).value;
  } catch {
    highlightedCode = universe.code;
  }

  const borderColor =
    universe.chaosRating <= 3
      ? 'border-green-600 hover:border-green-400'
      : universe.chaosRating <= 6
        ? 'border-yellow-600 hover:border-yellow-400'
        : 'border-red-600 hover:border-red-400';

  const bgGradient =
    universe.chaosRating <= 3
      ? 'from-green-950/40'
      : universe.chaosRating <= 6
        ? 'from-yellow-950/40'
        : 'from-red-950/40';

  return (
    <div
      className={`bg-gradient-to-br ${bgGradient} to-black/40 ${borderColor} border-2 rounded-lg overflow-hidden transition-all duration-300 hover:shadow-2xl group relative`}
      onClick={() => setIsExpanded(!isExpanded)}
      style={{
        animation: sacrificed ? 'collapse-universe 0.5s ease-out forwards' : `quantum-pulse ${3 + universe.chaosRating * 0.2}s ease-in-out infinite`,
        pointerEvents: sacrificed ? 'none' : 'auto',
      }}
    >
      <style>{`
        @keyframes quantum-pulse {
          0%, 100% { opacity: 1; }
          50% { opacity: 0.85; }
        }
        @keyframes collapse-universe {
          0% { opacity: 1; transform: scale(1); }
          100% { opacity: 0.3; transform: scale(0.95); filter: grayscale(1); }
        }
        @keyframes warning-flash {
          0%, 100% { opacity: 1; }
          50% { opacity: 0.6; }
        }
      `}</style>

      <div className={`p-4 border-b-2 ${borderColor} bg-black/60 relative overflow-hidden`}>
        <div className="absolute inset-0 opacity-5" style={{ backgroundImage: 'repeating-linear-gradient(90deg, currentColor 0, currentColor 1px, transparent 1px, transparent 2px)' }} />
        <div className="relative z-10">
          <GlitchEffect intensity={chaosLevel > 70 ? 'high' : 'low'}>
            <h3 className={`text-lg font-mono font-black mb-2 ${chaosColor}`}>
              UNIVERSE {index}: {universeNames[index - 1]}
            </h3>
          </GlitchEffect>
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Zap className={`w-5 h-5 ${chaosColor}`} />
              <div>
                <div className="text-xs font-mono text-gray-400">CHAOS RATING</div>
                <div className={`text-2xl font-mono font-black ${chaosColor}`}>
                  {universe.chaosRating}/10
                </div>
              </div>
            </div>
            <div className="text-right">
              <div className="text-xs font-mono text-gray-400 mb-1">STABILITY</div>
              <div className="w-20 h-6 bg-gray-900 rounded border border-gray-700 overflow-hidden">
                <div
                  className={`h-full transition-all ${
                    stabilityPercent > 60
                      ? 'bg-green-600'
                      : stabilityPercent > 30
                        ? 'bg-yellow-600'
                        : 'bg-red-600'
                  }`}
                  style={{ width: `${stabilityPercent}%` }}
                />
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="p-4 space-y-3">
        <div>
          <h4 className={`text-xs font-mono font-bold uppercase mb-1 ${chaosColor}`}>Philosophy</h4>
          <p className="text-sm text-gray-300">{universe.philosophy}</p>
        </div>

        <div>
          <h4 className={`text-xs font-mono font-bold uppercase mb-1 ${chaosColor}`}>Approach</h4>
          <p className="text-sm text-gray-300">{universe.approach}</p>
        </div>

        {isExpanded && (
          <div className="space-y-3">
            <div className="border-t border-gray-700 pt-3">
              <div className="flex items-center justify-between mb-2">
                <h4 className={`text-xs font-mono font-bold uppercase ${chaosColor}`}>Fixed Code</h4>
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    copyCode();
                  }}
                  className="flex items-center gap-1 bg-black/70 hover:bg-gray-800 border border-gray-700 text-white px-2 py-1 rounded text-xs transition-all"
                >
                  {copied ? (
                    <>
                      <Check className="w-3 h-3 text-green-400" />
                      <span className="text-green-400">Copied</span>
                    </>
                  ) : (
                    <>
                      <Copy className="w-3 h-3" />
                      Copy
                    </>
                  )}
                </button>
              </div>
              <pre className="bg-black/80 border border-gray-700 rounded-lg p-3 overflow-x-auto">
                <code
                  className="text-xs text-gray-300 font-mono"
                  dangerouslySetInnerHTML={{ __html: highlightedCode }}
                />
              </pre>
            </div>

            <div className="bg-red-950/40 border-2 border-red-700/60 rounded-lg p-3">
              <div className="flex items-start gap-2 mb-2">
                <AlertTriangle className="w-4 h-4 text-red-400 flex-shrink-0 mt-0.5" />
                <h4 className="text-xs font-mono font-bold text-red-400 uppercase">Trade-offs</h4>
              </div>
              <p className="text-sm text-red-200">{universe.tradeoffs || apocalypticTradeoffs[index - 1]}</p>
            </div>

            {universe.chaosRating > 7 && (
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  setSacrificed(true);
                  setTimeout(() => setSacrificed(false), 2000);
                }}
                className="w-full bg-black/70 border-2 border-red-600 text-red-400 hover:bg-red-950/50 font-mono text-xs py-2 rounded transition-all"
              >
                SACRIFICE THIS UNIVERSE TO STABILIZE OTHERS?
              </button>
            )}
          </div>
        )}

        {!isExpanded && (
          <div className="text-xs font-mono text-gray-500 text-center pt-2">
            {'> CLICK_TO_REVEAL_SOLUTION'}
          </div>
        )}
      </div>

      {universe.chaosRating > 8 && (
        <div
          className="absolute top-2 right-2 w-3 h-3 bg-red-500 rounded-full"
          style={{ animation: 'warning-flash 0.5s infinite' }}
        />
      )}
    </div>
  );
}
