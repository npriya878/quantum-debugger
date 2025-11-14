import { useState, useEffect } from 'react';
import { ChevronLeft, ChevronRight, Trash2, Search, AlertTriangle } from 'lucide-react';
import { storage } from '../services/storage';
import { DebugSession } from '../types';
import { GlitchEffect } from './GlitchEffect';

interface CorruptedHistoryProps {
  onSelectSession: (session: DebugSession) => void;
}

export function CorruptedHistory({ onSelectSession }: CorruptedHistoryProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [history, setHistory] = useState<DebugSession[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [corruptedIds, setCorruptedIds] = useState<Set<string>>(new Set());

  useEffect(() => {
    if (isOpen) {
      loadHistory();
    }
  }, [isOpen]);

  useEffect(() => {
    const corruptionInterval = setInterval(() => {
      if (history.length > 0 && Math.random() > 0.9) {
        const randomId = history[Math.floor(Math.random() * history.length)].id;
        setCorruptedIds((prev) => {
          const next = new Set(prev);
          if (next.has(randomId)) {
            next.delete(randomId);
          } else {
            next.add(randomId);
          }
          return next;
        });
      }
    }, 2000);

    return () => clearInterval(corruptionInterval);
  }, [history]);

  const loadHistory = () => {
    const sessions = storage.getSessions();
    setHistory(sessions.sort((a, b) => new Date(b.created_at).getTime() - new Date(a.created_at).getTime()));
  };

  const deleteSession = (id: string) => {
    storage.deleteSession(id);
    setHistory(history.filter((h) => h.id !== id));
  };

  const filteredHistory = history.filter(
    (session) =>
      session.bug_description.toLowerCase().includes(searchTerm.toLowerCase()) ||
      session.language.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="fixed right-4 top-32 z-40 bg-gradient-to-br from-red-900/70 to-black/70 border-2 border-red-500 hover:border-red-300 p-3 rounded-lg transition-all group hover:shadow-lg hover:shadow-red-500/50"
        title={isOpen ? 'Close History' : 'Open Corrupted History'}
      >
        {isOpen ? <ChevronRight className="text-red-400" /> : <ChevronLeft className="text-red-400" />}
        <span className="absolute right-0 top-0 w-2 h-2 bg-red-500 rounded-full animate-pulse" />
      </button>

      <div
        className={`fixed right-0 top-0 h-screen w-96 bg-gradient-to-br from-black via-red-950/30 to-black border-l-2 border-red-500/50 transform transition-transform duration-300 z-50 ${
          isOpen ? 'translate-x-0' : 'translate-x-full'
        }`}
      >
        <div className="h-full flex flex-col overflow-hidden">
          <div className="p-4 border-b-2 border-red-500/50 bg-black/50">
            <div className="flex items-center gap-2 mb-3">
              <AlertTriangle className="w-4 h-4 text-red-400" />
              <h2 className="text-lg font-mono font-bold text-red-400">[ CORRUPTED_HISTORY ]</h2>
            </div>
            <div className="relative">
              <Search className="absolute left-2 top-2 w-4 h-4 text-gray-600" />
              <input
                type="text"
                placeholder="Search ruins…"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-8 pr-3 py-2 bg-gray-950 border-2 border-red-900 rounded text-sm text-white placeholder-gray-700 focus:outline-none focus:border-red-500 font-mono"
              />
            </div>
          </div>

          <div className="flex-1 overflow-y-auto bg-black/30 space-y-2 p-3">
            {filteredHistory.length === 0 ? (
              <div className="p-4 text-center text-gray-600 text-sm font-mono">
                {'> '}<span className="text-red-600">TIMELINE_EMPTY</span>
              </div>
            ) : (
              filteredHistory.map((session, idx) => {
                const isCorrupted = corruptedIds.has(session.id);
                const ageInDays = Math.floor(
                  (Date.now() - new Date(session.created_at).getTime()) / (1000 * 60 * 60 * 24)
                );
                const decayOpacity = Math.max(0.3, 1 - ageInDays * 0.1);

                return (
                  <button
                    key={session.id}
                    onClick={() => {
                      onSelectSession(session);
                      setIsOpen(false);
                    }}
                    className={`w-full text-left p-3 rounded transition-all group ${
                      isCorrupted
                        ? 'bg-red-950/40 border-2 border-red-700/50 hover:border-red-500/50 line-through'
                        : 'bg-gray-900/50 border-2 border-gray-700 hover:border-red-500/50'
                    }`}
                    style={{ opacity: decayOpacity }}
                  >
                    <GlitchEffect intensity={isCorrupted ? 'high' : 'low'}>
                      <div className="flex items-start justify-between mb-1">
                        <span className={`text-xs font-mono ${isCorrupted ? 'text-red-400' : 'text-gray-400'}`}>
                          {session.language}
                          {ageInDays > 3 && <span className="ml-1 text-red-600">✗</span>}
                        </span>
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            deleteSession(session.id);
                          }}
                          className="opacity-0 group-hover:opacity-100 transition-opacity"
                        >
                          <Trash2 className="w-3 h-3 text-red-400 hover:text-red-300" />
                        </button>
                      </div>
                      <p
                        className={`text-sm truncate line-clamp-2 ${
                          isCorrupted ? 'text-red-300' : 'text-white'
                        }`}
                      >
                        {isCorrupted && Math.random() > 0.5 ? '[CORRUPTED DATA]' : session.bug_description}
                      </p>
                    </GlitchEffect>
                    <div className="flex items-center gap-2 mt-2 text-xs">
                      <span className={`font-mono ${isCorrupted ? 'text-red-500' : 'text-gray-500'}`}>
                        ⚡ {session.avg_chaos_rating?.toFixed(1) || '—'}
                      </span>
                      <span className="text-gray-700">
                        {ageInDays > 7 ? '👻' : ''} {new Date(session.created_at).toLocaleDateString()}
                      </span>
                    </div>
                  </button>
                );
              })
            )}
          </div>
        </div>
      </div>
    </>
  );
}
