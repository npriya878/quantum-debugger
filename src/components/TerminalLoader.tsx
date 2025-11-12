import { useState, useEffect } from 'react';

export function TerminalLoader() {
  const [lines, setLines] = useState<string[]>([]);

  useEffect(() => {
    const messages = [
      '> Initiating multiverse bootstrap…',
      '> Spinning quantum threads…',
      '> Stabilizing chaos fields',
      '> Parsing bug dimensions…',
      '> Opening parallel portals…',
      '> Synchronizing universe states…',
      '> Crystallizing solutions…',
    ];

    let currentIndex = 0;

    const interval = setInterval(() => {
      if (currentIndex < messages.length) {
        setLines((prev) => [...prev, messages[currentIndex]]);
        currentIndex++;
      }
    }, 300);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="fixed inset-0 bg-black/80 backdrop-blur-sm flex items-center justify-center z-50">
      <div className="bg-black border-2 border-green-400 p-6 max-w-md w-full">
        <div className="font-mono text-green-400 space-y-1">
          {lines.map((line, i) => (
            <div key={i} className="animate-pulse">
              {line}
              {i === lines.length - 1 && <span className="animate-blink">▐</span>}
            </div>
          ))}
          <div className="mt-4 h-2 bg-gray-800 rounded overflow-hidden">
            <div
              className="h-full bg-green-400"
              style={{
                width: `${(lines.length / 7) * 100}%`,
                transition: 'width 0.3s ease',
              }}
            />
          </div>
        </div>
        <style>{`
          @keyframes blink {
            0%, 100% { opacity: 1; }
            50% { opacity: 0; }
          }
          .animate-blink { animation: blink 0.5s infinite; }
        `}</style>
      </div>
    </div>
  );
}
