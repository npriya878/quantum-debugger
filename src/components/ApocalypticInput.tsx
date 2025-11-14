import { useState } from 'react';
import { Code, Bug, AlertTriangle, FileCode } from 'lucide-react';
import { GlitchEffect } from './GlitchEffect';

interface ApocalypticInputProps {
  onDebug: (language: string, bugDescription: string, code: string, errorMessage: string, context: string) => void;
  loading: boolean;
}

const apocalypticErrors = [
  'The void gazes back at you...',
  'Stack overflow detected in parallel dimension',
  'Undefined is undefined (recursively)',
  'Reality coherence: 23%',
  'SEGMENTATION FAULT IN UNIVERSE 7',
  'The algorithm consumed itself',
];

export function ApocalypticInput({ onDebug, loading }: ApocalypticInputProps) {
  const [language, setLanguage] = useState('javascript');
  const [bugDescription, setBugDescription] = useState('');
  const [code, setCode] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [context, setContext] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!bugDescription || !code) return;
    onDebug(language, bugDescription, code, errorMessage, context);
  };

  return (
    <form onSubmit={handleSubmit} className="bg-gradient-to-br from-black via-cyan-950/10 to-black border-2 border-cyan-600/50 rounded-lg p-6 relative overflow-hidden group">
      <style>{`
        @keyframes border-glow {
          0%, 100% { border-color: rgb(34, 211, 238, 0.5); }
          50% { border-color: rgb(34, 211, 238, 0.8); box-shadow: 0 0 20px rgba(34, 211, 238, 0.3); }
        }
        .input-form { animation: border-glow 3s ease-in-out infinite; }
      `}</style>

      <div className="absolute inset-0 opacity-5 pointer-events-none" style={{ backgroundImage: 'repeating-linear-gradient(0deg, currentColor 0, currentColor 1px, transparent 1px, transparent 2px)' }} />

      <div className="relative z-10">
        <div className="mb-6">
          <GlitchEffect intensity="low">
            <div className="flex items-center gap-2 mb-3">
              <AlertTriangle className="w-5 h-5 text-yellow-400" />
              <h3 className="text-lg font-mono font-bold text-cyan-400">[ DEBUG_PROTOCOL_INITIATED ]</h3>
            </div>
          </GlitchEffect>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
          <div>
            <label className="flex items-center gap-2 text-xs font-mono uppercase text-gray-300 mb-2">
              <FileCode className="w-4 h-4 text-cyan-400" />
              Language
            </label>
            <select
              value={language}
              onChange={(e) => setLanguage(e.target.value)}
              className="w-full bg-black/70 border-2 border-cyan-700 text-cyan-100 rounded-lg px-4 py-2 font-mono text-sm focus:outline-none focus:border-cyan-400 focus:shadow-lg focus:shadow-cyan-500/20"
            >
              <option value="javascript">JavaScript</option>
              <option value="typescript">TypeScript</option>
              <option value="python">Python</option>
              <option value="java">Java</option>
              <option value="cpp">C++</option>
              <option value="rust">Rust</option>
              <option value="go">Go</option>
            </select>
          </div>

          <div>
            <label className="flex items-center gap-2 text-xs font-mono uppercase text-gray-300 mb-2">
              <Bug className="w-4 h-4 text-red-400" />
              Bug Description
            </label>
            <input
              type="text"
              value={bugDescription}
              onChange={(e) => setBugDescription(e.target.value)}
              placeholder="What broke?"
              className="w-full bg-black/70 border-2 border-red-700 text-red-100 placeholder-red-900 rounded-lg px-4 py-2 font-mono text-sm focus:outline-none focus:border-red-400 focus:shadow-lg focus:shadow-red-500/20"
              required
            />
          </div>
        </div>

        <div className="mb-6">
          <label className="flex items-center gap-2 text-xs font-mono uppercase text-gray-300 mb-2">
            <Code className="w-4 h-4 text-yellow-400" />
            Buggy Code
          </label>
          <textarea
            value={code}
            onChange={(e) => setCode(e.target.value)}
            placeholder="Paste the cursed code here…"
            rows={8}
            className="w-full bg-black/70 border-2 border-yellow-700 text-yellow-100 placeholder-yellow-900 rounded-lg px-4 py-2 font-mono text-sm focus:outline-none focus:border-yellow-400 focus:shadow-lg focus:shadow-yellow-500/20 resize-none"
            required
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
          <div>
            <label className="flex items-center gap-2 text-xs font-mono uppercase text-gray-300 mb-2">
              <AlertTriangle className="w-4 h-4 text-orange-400" />
              Error Message
            </label>
            <textarea
              value={errorMessage}
              onChange={(e) => setErrorMessage(e.target.value)}
              placeholder={apocalypticErrors[Math.floor(Math.random() * apocalypticErrors.length)]}
              rows={3}
              className="w-full bg-black/70 border-2 border-orange-700 text-orange-100 placeholder-orange-900 rounded-lg px-4 py-2 font-mono text-sm focus:outline-none focus:border-orange-400 focus:shadow-lg focus:shadow-orange-500/20 resize-none"
            />
          </div>

          <div>
            <label className="flex items-center gap-2 text-xs font-mono uppercase text-gray-300 mb-2">
              <FileCode className="w-4 h-4 text-purple-400" />
              Context
            </label>
            <textarea
              value={context}
              onChange={(e) => setContext(e.target.value)}
              placeholder="What should survive?"
              rows={3}
              className="w-full bg-black/70 border-2 border-purple-700 text-purple-100 placeholder-purple-900 rounded-lg px-4 py-2 font-mono text-sm focus:outline-none focus:border-purple-400 focus:shadow-lg focus:shadow-purple-500/20 resize-none"
            />
          </div>
        </div>

        <button
          type="submit"
          disabled={loading || !bugDescription || !code}
          className="w-full bg-gradient-to-r from-cyan-600 to-red-600 hover:from-cyan-500 hover:to-red-500 disabled:from-gray-700 disabled:to-gray-700 text-white font-mono font-bold py-3 px-6 rounded-lg transition-all duration-200 transform hover:scale-[1.02] disabled:scale-100 disabled:cursor-not-allowed uppercase text-sm shadow-lg hover:shadow-2xl hover:shadow-cyan-500/50 disabled:shadow-none"
        >
          {loading ? '⚠ SCANNING MULTIVERSE…' : '🔮 INITIATE_QUANTUM_SCAN'}
        </button>
      </div>
    </form>
  );
}
