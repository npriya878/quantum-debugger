import { useState, useEffect } from 'react';

interface ExistentialMessagesProps {
  universesDestroyed: number;
  totalAttempts: number;
}

export function ExistentialMessages({ universesDestroyed, totalAttempts }: ExistentialMessagesProps) {
  const [messages, setMessages] = useState<Array<{ id: number; text: string; type: string }>>([]);

  const existentialTexts = [
    { text: 'Another timeline lost...', type: 'loss' },
    { text: 'How many more can you save?', type: 'question' },
    { text: 'The void gazes back at line 4', type: 'dread' },
    { text: 'Reality fragmentation detected', type: 'warning' },
    { text: 'Undefined behavior bleeding into Universe 7', type: 'error' },
    { text: 'Schrödinger awaits your observation', type: 'quantum' },
    { text: 'Did you break something else?', type: 'question' },
    { text: 'One step closer to the heat death', type: 'dread' },
    { text: 'The multiverse does not forgive mistakes', type: 'warning' },
    { text: 'Seven universes destroyed trying to fix a semicolon', type: 'error' },
  ];

  useEffect(() => {
    if (Math.random() > 0.85) {
      const msg = existentialTexts[Math.floor(Math.random() * existentialTexts.length)];
      const id = Date.now();
      setMessages((prev) => [...prev, { id, ...msg }]);
      setTimeout(() => {
        setMessages((prev) => prev.filter((m) => m.id !== id));
      }, 4000);
    }
  }, [universesDestroyed, totalAttempts]);

  const typeColors = {
    loss: 'text-red-500',
    question: 'text-cyan-400',
    dread: 'text-purple-400',
    warning: 'text-yellow-400',
    error: 'text-red-400',
    quantum: 'text-green-400',
  };

  return (
    <div className="fixed bottom-4 left-4 z-40 pointer-events-none space-y-2 max-w-md">
      {messages.map((msg) => (
        <div
          key={msg.id}
          className={`font-mono text-sm ${typeColors[msg.type as keyof typeof typeColors]} animate-pulse border border-current rounded px-3 py-2 bg-black/70`}
          style={{
            animation: 'fadeInOut 4s ease-in-out forwards',
          }}
        >
          <style>{`
            @keyframes fadeInOut {
              0% { opacity: 0; transform: translateY(10px); }
              10% { opacity: 1; transform: translateY(0); }
              90% { opacity: 1; transform: translateY(0); }
              100% { opacity: 0; transform: translateY(-10px); }
            }
          `}</style>
          {'> '}{msg.text}
        </div>
      ))}

      <div className="absolute bottom-0 left-0 text-xs font-mono text-gray-600 space-y-1">
        <div>
          <span className="text-gray-500">TOTAL_REALITIES_PRESERVED:</span> <span className="text-green-500">{totalAttempts}</span>
        </div>
        <div>
          <span className="text-gray-500">CASUALTIES:</span> <span className="text-red-500">{universesDestroyed}</span>
        </div>
      </div>
    </div>
  );
}
