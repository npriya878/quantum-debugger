import { useState, useEffect } from 'react';
import { ChevronLeft, ChevronRight, Trash2, Search } from 'lucide-react';
import { supabase } from '../services/supabase';
import { DebugSession } from '../types';

interface HistorySidebarProps {
  onSelectSession: (session: DebugSession) => void;
}

export function HistorySidebar({ onSelectSession }: HistorySidebarProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [history, setHistory] = useState<DebugSession[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (isOpen) {
      loadHistory();
    }
  }, [isOpen]);

  const loadHistory = async () => {
    setLoading(true);
    try {
      const { data, error } = await supabase
        .from('debug_history')
        .select('*')
        .order('created_at', { ascending: false })
        .limit(20);

      if (error) throw error;
      setHistory(data || []);
    } catch (err) {
      console.error('Failed to load history:', err);
    } finally {
      setLoading(false);
    }
  };

  const deleteSession = async (id: string) => {
    try {
      const { error } = await supabase.from('debug_history').delete().eq('id', id);
      if (error) throw error;
      setHistory(history.filter((h) => h.id !== id));
    } catch (err) {
      console.error('Failed to delete session:', err);
    }
  };

  const filteredHistory = history.filter(
    (session) =>
      session.bug_description.toLowerCase().includes(searchTerm.toLowerCase()) ||
      session.language.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const themeColors = {
    green: 'from-green-600 to-green-900 border-green-400',
    magenta: 'from-pink-600 to-pink-900 border-pink-400',
    cyan: 'from-cyan-600 to-cyan-900 border-cyan-400',
    amber: 'from-amber-600 to-amber-900 border-amber-400',
  };

  return (
    <>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="fixed right-4 top-24 z-40 bg-black/70 border border-gray-600 hover:border-white/50 p-2 rounded-lg transition-all"
        title={isOpen ? 'Close History' : 'Open History'}
      >
        {isOpen ? <ChevronRight /> : <ChevronLeft />}
      </button>

      <div
        className={`fixed right-0 top-0 h-screen w-80 bg-black/90 border-l border-gray-600 transform transition-transform duration-300 z-50 ${
          isOpen ? 'translate-x-0' : 'translate-x-full'
        }`}
      >
        <div className="h-full flex flex-col overflow-hidden">
          <div className="p-4 border-b border-gray-600">
            <h2 className="text-lg font-mono font-bold text-white mb-3">[DEBUG_HISTORY]</h2>
            <div className="relative">
              <Search className="absolute left-2 top-2 w-4 h-4 text-gray-400" />
              <input
                type="text"
                placeholder="Search…"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-8 pr-3 py-2 bg-gray-900 border border-gray-700 rounded text-sm text-white placeholder-gray-500 focus:outline-none focus:border-white/50"
              />
            </div>
          </div>

          <div className="flex-1 overflow-y-auto">
            {loading ? (
              <div className="p-4 text-center text-gray-400 text-sm">Loading…</div>
            ) : filteredHistory.length === 0 ? (
              <div className="p-4 text-center text-gray-500 text-sm">No history yet</div>
            ) : (
              <div className="space-y-2 p-3">
                {filteredHistory.map((session) => (
                  <button
                    key={session.id}
                    onClick={() => {
                      onSelectSession(session);
                      setIsOpen(false);
                    }}
                    className="w-full text-left p-3 bg-gray-900/50 hover:bg-gray-800 border border-gray-700 hover:border-gray-500 rounded transition-all group"
                  >
                    <div className="flex items-start justify-between mb-1">
                      <span className="text-xs font-mono text-gray-400">{session.language}</span>
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
                    <p className="text-sm text-white truncate line-clamp-2">{session.bug_description}</p>
                    <div className="flex items-center gap-2 mt-2">
                      <span className="text-xs text-gray-500">
                        ⚡ {session.avg_chaos_rating?.toFixed(1) || '—'}
                      </span>
                      <span className="text-xs text-gray-600">
                        {new Date(session.created_at).toLocaleDateString()}
                      </span>
                    </div>
                  </button>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  );
}
