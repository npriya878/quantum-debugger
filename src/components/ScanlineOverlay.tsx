export function ScanlineOverlay() {
  return (
    <div
      className="fixed inset-0 pointer-events-none"
      style={{
        backgroundImage: `repeating-linear-gradient(
          0deg,
          rgba(0, 0, 0, 0.15),
          rgba(0, 0, 0, 0.15) 1px,
          transparent 1px,
          transparent 2px
        )`,
        animation: 'scan 8s linear infinite',
      }}
    >
      <style>{`
        @keyframes scan {
          0% { transform: translateY(0); }
          100% { transform: translateY(10px); }
        }
        @keyframes glitch {
          0%, 100% { clip-path: inset(40% 0 61% 0); transform: translate(0, 0); }
          20% { clip-path: inset(92% 0 1% 0); transform: translate(-2px, 2px); }
          40% { clip-path: inset(43% 0 1% 0); transform: translate(-2px, -2px); }
          60% { clip-path: inset(25% 0 58% 0); transform: translate(2px, -2px); }
          80% { clip-path: inset(54% 0 7% 0); transform: translate(2px, 2px); }
        }
        @keyframes crt-flicker {
          0%, 100% { opacity: 0.98; }
          50% { opacity: 1; }
        }
        body { animation: crt-flicker 0.15s infinite; }
      `}</style>
    </div>
  );
}
