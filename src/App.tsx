import { useState, useEffect } from 'react';
import { DebugInput } from './components/DebugInput';
import { UniverseSolutions } from './components/UniverseSolutions';
import { generateQuantumSolutions } from './services/gemini';
import { MatrixBackground } from './components/MatrixBackground';
import { ScanlineOverlay } from './components/ScanlineOverlay';
import { TerminalLoader } from './components/TerminalLoader';
import { ThemeSelector } from './components/ThemeSelector';
import { HistorySidebar } from './components/HistorySidebar';
import { supabase } from './services/supabase';
import { Universe, DebugSession } from './types';
import { Zap } from 'lucide-react';

function App() {
  const [universes, setUniverses] = useState<Universe[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [theme, setTheme] = useState<'green' | 'magenta' | 'cyan' | 'amber'>('green');
  const [showLoader, setShowLoader] = useState(false);

  useEffect(() => {
    const saved = localStorage.getItem('quantumTheme');
    if (saved) setTheme(saved as any);
  }, []);

  const handleThemeChange = (newTheme: 'green' | 'magenta' | 'cyan' | 'amber') => {
    setTheme(newTheme);
    localStorage.setItem('quantumTheme', newTheme);
  };

  const handleDebug = async (language: string, bugDescription: string, code: string, errorMessage: string, context: string) => {
    setLoading(true);
    setShowLoader(true);
    setError(null);
    setUniverses([]);

    try {
      const solutions = await generateQuantumSolutions(language, bugDescription, code, errorMessage, context);
      setUniverses(solutions);

      const avgChaos = solutions.reduce((sum, u) => sum + u.chaosRating, 0) / solutions.length;

      await supabase.from('debug_history').insert({
        language,
        bug_description: bugDescription,
        code,
        error_message: errorMessage,
        context,
        results: solutions,
        avg_chaos_rating: avgChaos,
      });
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to generate solutions');
    } finally {
      setLoading(false);
      setTimeout(() => setShowLoader(false), 500);
    }
  };

  const handleSelectSession = (session: DebugSession) => {
    setUniverses(session.results);
  };

  const themeColors = {
    green: 'text-green-400',
    magenta: 'text-pink-400',
    cyan: 'text-cyan-400',
    amber: 'text-amber-400',
  };

  return (
    <div className="min-h-screen bg-black text-white overflow-x-hidden">
      <MatrixBackground theme={theme} />
      <ScanlineOverlay />
      {showLoader && <TerminalLoader />}

      <div className="relative z-10">
        <div className="container mx-auto px-4 py-8">
          <div className="flex items-center justify-between mb-8">
            <div className="text-left">
              <div className="flex items-center gap-3 mb-2">
                <Zap className={`w-8 h-8 ${themeColors[theme]}`} />
                <h1 className={`text-4xl font-mono font-bold ${themeColors[theme]}`}>
                  &gt; QUANTUM_DEBUGGER
                </h1>
                <Zap className={`w-8 h-8 ${themeColors[theme]}`} />
              </div>
              <p className="text-gray-400 text-sm font-mono">
                Explore parallel universes where your bug was fixed differently
              </p>
            </div>
            <ThemeSelector currentTheme={theme} onThemeChange={handleThemeChange} />
          </div>

          <DebugInput onDebug={handleDebug} loading={loading} theme={theme} />

          {error && (
            <div className="mt-8 bg-red-900/30 border-2 border-red-600 rounded-lg p-4 text-red-200 font-mono">
              <p className="font-bold">[ERROR]</p>
              <p className="text-sm">{error}</p>
            </div>
          )}

          {universes.length > 0 && <UniverseSolutions universes={universes} theme={theme} />}
        </div>
      </div>

      <HistorySidebar onSelectSession={handleSelectSession} />
    </div>
  );
}

export default App;
