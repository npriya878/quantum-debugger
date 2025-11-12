import { useState } from 'react';
import { Code, Bug, AlertCircle, FileCode } from 'lucide-react';

interface DebugInputProps {
  onDebug: (language: string, bugDescription: string, code: string, errorMessage: string, context: string) => void;
  loading: boolean;
  theme: 'green' | 'magenta' | 'cyan' | 'amber';
}

const themeStyles = {
  green: {
    select: 'bg-green-950 border-green-700 text-green-100 focus:ring-green-500',
    input: 'bg-green-950 border-green-700 text-green-100 placeholder-green-700 focus:ring-green-500',
    button: 'bg-green-600 hover:bg-green-700 disabled:bg-gray-700',
  },
  magenta: {
    select: 'bg-pink-950 border-pink-700 text-pink-100 focus:ring-pink-500',
    input: 'bg-pink-950 border-pink-700 text-pink-100 placeholder-pink-700 focus:ring-pink-500',
    button: 'bg-pink-600 hover:bg-pink-700 disabled:bg-gray-700',
  },
  cyan: {
    select: 'bg-cyan-950 border-cyan-700 text-cyan-100 focus:ring-cyan-500',
    input: 'bg-cyan-950 border-cyan-700 text-cyan-100 placeholder-cyan-700 focus:ring-cyan-500',
    button: 'bg-cyan-600 hover:bg-cyan-700 disabled:bg-gray-700',
  },
  amber: {
    select: 'bg-amber-950 border-amber-700 text-amber-100 focus:ring-amber-500',
    input: 'bg-amber-950 border-amber-700 text-amber-100 placeholder-amber-700 focus:ring-amber-500',
    button: 'bg-amber-600 hover:bg-amber-700 disabled:bg-gray-700',
  },
};

export function DebugInput({ onDebug, loading, theme }: DebugInputProps) {
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

  const styles = themeStyles[theme];

  return (
    <form onSubmit={handleSubmit} className="bg-black/50 border-2 border-gray-700 rounded-lg p-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
        <div>
          <label className="flex items-center gap-2 text-xs font-mono uppercase text-gray-300 mb-2">
            <FileCode className="w-4 h-4" />
            Language
          </label>
          <select
            value={language}
            onChange={(e) => setLanguage(e.target.value)}
            className={`w-full border rounded-lg px-4 py-2 font-mono text-sm focus:outline-none focus:ring-2 ${styles.select}`}
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
            <Bug className="w-4 h-4" />
            Bug Description
          </label>
          <input
            type="text"
            value={bugDescription}
            onChange={(e) => setBugDescription(e.target.value)}
            placeholder="Function returns undefined…"
            className={`w-full border rounded-lg px-4 py-2 font-mono text-sm focus:outline-none focus:ring-2 ${styles.input}`}
            required
          />
        </div>
      </div>

      <div className="mb-6">
        <label className="flex items-center gap-2 text-xs font-mono uppercase text-gray-300 mb-2">
          <Code className="w-4 h-4" />
          Buggy Code
        </label>
        <textarea
          value={code}
          onChange={(e) => setCode(e.target.value)}
          placeholder="Paste code here…"
          rows={8}
          className={`w-full border rounded-lg px-4 py-2 font-mono text-sm focus:outline-none focus:ring-2 ${styles.input}`}
          required
        />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
        <div>
          <label className="flex items-center gap-2 text-xs font-mono uppercase text-gray-300 mb-2">
            <AlertCircle className="w-4 h-4" />
            Error Message
          </label>
          <textarea
            value={errorMessage}
            onChange={(e) => setErrorMessage(e.target.value)}
            placeholder="Error output…"
            rows={3}
            className={`w-full border rounded-lg px-4 py-2 font-mono text-sm focus:outline-none focus:ring-2 ${styles.input}`}
          />
        </div>

        <div>
          <label className="flex items-center gap-2 text-xs font-mono uppercase text-gray-300 mb-2">
            <FileCode className="w-4 h-4" />
            Context
          </label>
          <textarea
            value={context}
            onChange={(e) => setContext(e.target.value)}
            placeholder="What should it do?…"
            rows={3}
            className={`w-full border rounded-lg px-4 py-2 font-mono text-sm focus:outline-none focus:ring-2 ${styles.input}`}
          />
        </div>
      </div>

      <button
        type="submit"
        disabled={loading || !bugDescription || !code}
        className={`w-full ${styles.button} text-white font-mono font-bold py-3 px-6 rounded-lg transition-all duration-200 transform hover:scale-[1.02] disabled:scale-100 disabled:cursor-not-allowed uppercase text-sm`}
      >
        {loading ? '> Initializing quantum thread...' : '> Scan for parallel solutions'}
      </button>
    </form>
  );
}
