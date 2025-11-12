import { useState } from 'react';
import { Universe } from '../types';
import { Copy, Check, Zap } from 'lucide-react';
import hljs from 'highlight.js';
import 'highlight.js/styles/atom-one-dark.css';

interface UniverseCardProps {
  universe: Universe;
  index: number;
  theme: 'green' | 'magenta' | 'cyan' | 'amber';
}

const universeIcons = ['✨', '💀', '⚡', '🏢', '🎲'];

const themeClasses = {
  green: {
    border: 'border-green-400',
    glow: 'shadow-lg shadow-green-500/50',
    text: 'text-green-400',
    bg: 'from-green-900/30 to-green-900/10',
  },
  magenta: {
    border: 'border-pink-400',
    glow: 'shadow-lg shadow-pink-500/50',
    text: 'text-pink-400',
    bg: 'from-pink-900/30 to-pink-900/10',
  },
  cyan: {
    border: 'border-cyan-400',
    glow: 'shadow-lg shadow-cyan-500/50',
    text: 'text-cyan-400',
    bg: 'from-cyan-900/30 to-cyan-900/10',
  },
  amber: {
    border: 'border-amber-400',
    glow: 'shadow-lg shadow-amber-500/50',
    text: 'text-amber-400',
    bg: 'from-amber-900/30 to-amber-900/10',
  },
};

export function UniverseCard({ universe, index, theme }: UniverseCardProps) {
  const [copied, setCopied] = useState(false);
  const [isExpanded, setIsExpanded] = useState(false);

  const copyCode = () => {
    navigator.clipboard.writeText(universe.code);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const classes = themeClasses[theme];
  const chaosColor = universe.chaosRating <= 3 ? 'text-green-400' : universe.chaosRating <= 6 ? 'text-yellow-400' : 'text-red-400';

  let highlightedCode = universe.code;
  try {
    highlightedCode = hljs.highlight(universe.code, { language: universe.language, ignoreIllegals: true }).value;
  } catch {
    highlightedCode = universe.code;
  }

  return (
    <div
      className={`bg-gradient-to-br ${classes.bg} ${classes.border} border-2 rounded-lg overflow-hidden ${classes.glow} transition-all duration-300 hover:scale-[1.02] cursor-pointer`}
      onClick={() => setIsExpanded(!isExpanded)}
      style={{
        animation: `pulse ${3 + universe.chaosRating * 0.2}s ease-in-out infinite`,
      }}
    >
      <style>{`
        @keyframes pulse {
          0%, 100% { opacity: 1; }
          50% { opacity: 0.8; }
        }
      `}</style>

      <div className="p-4 border-b border-gray-600">
        <div className="flex items-center justify-between mb-2">
          <h3 className={`text-xl font-mono font-bold ${classes.text}`}>
            <span className="text-2xl mr-2">{universeIcons[index - 1]}</span>
            UNIVERSE {index}: {universe.name}
          </h3>
          <div className="flex items-center gap-2">
            <Zap className={`w-5 h-5 ${chaosColor}`} />
            <span className={`text-lg font-bold font-mono ${chaosColor}`}>
              {universe.chaosRating}/10
            </span>
          </div>
        </div>
      </div>

      <div className="p-4 space-y-4">
        <div>
          <h4 className={`text-xs font-mono font-semibold ${classes.text} mb-1 uppercase`}>Philosophy</h4>
          <p className="text-gray-300 text-sm">{universe.philosophy}</p>
        </div>

        <div>
          <h4 className={`text-xs font-mono font-semibold ${classes.text} mb-1 uppercase`}>Approach</h4>
          <p className="text-gray-300 text-sm">{universe.approach}</p>
        </div>

        {isExpanded && (
          <div>
            <div className="flex items-center justify-between mb-2">
              <h4 className={`text-xs font-mono font-semibold ${classes.text} uppercase`}>Code Solution</h4>
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  copyCode();
                }}
                className="flex items-center gap-1 bg-gray-800 hover:bg-gray-700 text-white px-2 py-1 rounded text-xs transition-colors"
              >
                {copied ? (
                  <>
                    <Check className="w-3 h-3" />
                    Copied
                  </>
                ) : (
                  <>
                    <Copy className="w-3 h-3" />
                    Copy
                  </>
                )}
              </button>
            </div>
            <pre className="bg-black/50 border border-gray-700 rounded-lg p-3 overflow-x-auto">
              <code
                className="text-xs text-gray-300 font-mono"
                dangerouslySetInnerHTML={{ __html: highlightedCode }}
              />
            </pre>
          </div>
        )}

        <div className="bg-orange-900/20 border border-orange-700/50 rounded-lg p-3">
          <h4 className={`text-xs font-mono font-semibold text-orange-400 mb-1 uppercase`}>⚠️ Trade-offs</h4>
          <p className="text-gray-300 text-sm">{universe.tradeoffs}</p>
        </div>
      </div>
    </div>
  );
}
