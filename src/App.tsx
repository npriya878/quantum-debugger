import { useState, useEffect } from 'react';
import { ApocalypticInput } from './components/ApocalypticInput';
import { ApocalypticHeader } from './components/ApocalypticHeader';
import { ApocalypticUniverseCard } from './components/ApocalypticUniverseCard';
import { CorruptedHistory } from './components/CorruptedHistory';
import { ChaosOverlay } from './components/ChaosOverlay';
import { ExistentialMessages } from './components/ExistentialMessages';
import { QuantumParticles } from './components/QuantumParticles';
import { TerminalLoader } from './components/TerminalLoader';
import { generateQuantumSolutions } from './services/gemini';
import { storage } from './services/storage';
import { Universe, DebugSession } from './types';

function App() {
  const [universes, setUniverses] = useState<Universe[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [showLoader, setShowLoader] = useState(false);
  const [chaosLevel, setChaosLevel] = useState(0);
  const [totalAttempts, setTotalAttempts] = useState(0);
  const [universesDestroyed, setUniversesDestroyed] = useState(0);

  useEffect(() => {
    const sessions = storage.getSessions();
    setTotalAttempts(sessions.length);
  }, []);

  const handleDebug = async (language: string, bugDescription: string, code: string, errorMessage: string, context: string) => {
    setLoading(true);
    setShowLoader(true);
    setError(null);
    setUniverses([]);

    try {
      const solutions = await generateQuantumSolutions(language, bugDescription, code, errorMessage, context);
      setUniverses(solutions);

      const avgChaos = solutions.reduce((sum, u) => sum + u.chaosRating, 0) / solutions.length;
      setChaosLevel(Math.min(100, avgChaos * 12));
      setUniversesDestroyed((prev) => prev + Math.floor(Math.random() * 3));

      storage.addSession({
        language,
        bug_description: bugDescription,
        code,
        error_message: errorMessage,
        context,
        results: solutions,
        avg_chaos_rating: avgChaos,
      });

      setTotalAttempts((prev) => prev + 1);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to generate solutions');
      setChaosLevel(Math.min(100, chaosLevel + 30));
    } finally {
      setLoading(false);
      setTimeout(() => setShowLoader(false), 500);
    }
  };

  const handleSelectSession = (session: DebugSession) => {
    setUniverses(session.results);
    const avgChaos = session.avg_chaos_rating || 0;
    setChaosLevel(Math.min(100, avgChaos * 12));
  };

  return (
    <div className="min-h-screen bg-black text-white overflow-x-hidden">
      <style>{`
        @keyframes scanline {
          0% { transform: translateY(0); }
          100% { transform: translateY(10px); }
        }
        body {
          animation: scanline 8s linear infinite;
        }
      `}</style>

      <QuantumParticles density={40 + chaosLevel / 2} chaos={chaosLevel} />
      <ChaosOverlay chaos={chaosLevel} />
      {showLoader && <TerminalLoader />}

      <div className="relative z-10">
        <ApocalypticHeader quantumChaos={chaosLevel} universesDestroyed={universesDestroyed} />

        <div className="container mx-auto px-4 py-8">
          <ApocalypticInput onDebug={handleDebug} loading={loading} />

          {error && (
            <div className="mt-8 bg-red-950/50 border-2 border-red-600 rounded-lg p-4 text-red-200 font-mono text-sm">
              <div className="flex items-start gap-2 mb-2">
                <span className="text-red-500 font-bold">⚠ CRITICAL:</span>
              </div>
              <p>{error}</p>
            </div>
          )}

          {universes.length > 0 && (
            <div className="mt-12">
              <div className="mb-8">
                <h2 className="text-2xl font-mono font-bold text-cyan-400 mb-1 uppercase">
                  [ MULTIVERSE_SOLUTIONS ]
                </h2>
                <div className="h-1 bg-gradient-to-r from-cyan-600 to-transparent w-64" />
              </div>

              <div className="grid grid-cols-1 gap-6">
                {universes.map((universe, idx) => (
                  <ApocalypticUniverseCard
                    key={idx}
                    universe={universe}
                    index={idx + 1}
                    chaosLevel={chaosLevel}
                  />
                ))}
              </div>

              <div className="mt-8 bg-black/50 border-2 border-cyan-600/50 rounded-lg p-4 font-mono text-sm">
                <p className="text-cyan-300">
                  {'> ANALYSIS: Each universe exists in quantum superposition until observed. The multiverse deteriorates with each decision. Choose wisely, or choose quickly—you may not have time for both.'}
                </p>
              </div>
            </div>
          )}
        </div>
      </div>

      <CorruptedHistory onSelectSession={handleSelectSession} />
      <ExistentialMessages universesDestroyed={universesDestroyed} totalAttempts={totalAttempts} />
    </div>
  );
}

export default App;
