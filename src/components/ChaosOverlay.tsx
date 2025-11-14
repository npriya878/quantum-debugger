import { useEffect, useState } from 'react';

interface ChaosOverlayProps {
  chaos: number;
}

export function ChaosOverlay({ chaos }: ChaosOverlayProps) {
  const [screenTear, setScreenTear] = useState(false);
  const [staticBurst, setStaticBurst] = useState(false);

  useEffect(() => {
    const tearInterval = setInterval(() => {
      if (Math.random() > 0.97 - chaos / 200) {
        setScreenTear(true);
        setTimeout(() => setScreenTear(false), 50 + chaos / 2);
      }
    }, 500);

    return () => clearInterval(tearInterval);
  }, [chaos]);

  return (
    <>
      <style>{`
        @keyframes screen-tear {
          0%, 100% { transform: translateY(0) scaleY(1); }
          50% { transform: translateY(-2px) scaleY(1.02); }
        }
        @keyframes static-burst {
          0%, 100% { opacity: 0; }
          50% { opacity: 0.3; }
        }
        @keyframes reality-breach {
          0%, 100% { opacity: 0; filter: hue-rotate(0deg); }
          50% { opacity: 0.2; filter: hue-rotate(180deg); }
        }
        .screen-tear { animation: screen-tear 0.05s; }
        .static-burst { animation: static-burst 0.1s; }
        .reality-breach { animation: reality-breach 0.3s infinite; }
        .chromatic-aberration {
          background-image:
            linear-gradient(90deg, rgba(255,0,0,0.05), transparent 50%),
            linear-gradient(90deg, transparent 50%, rgba(0,255,255,0.05));
        }
      `}</style>

      {screenTear && (
        <div className="screen-tear fixed inset-0 pointer-events-none border-t-2 border-cyan-500 z-50" />
      )}

      <div
        className="fixed inset-0 pointer-events-none chromatic-aberration z-30"
        style={{
          opacity: chaos / 200,
          mixBlendMode: 'overlay',
        }}
      />

      {chaos > 70 && (
        <div
          className="fixed inset-0 pointer-events-none z-40"
          style={{
            backgroundImage: `repeating-linear-gradient(
              90deg,
              rgba(255, 0, 0, 0.03),
              rgba(255, 0, 0, 0.03) 1px,
              transparent 1px,
              transparent 2px
            )`,
            animation: `static-burst ${0.1 + chaos / 1000}s infinite`,
          }}
        />
      )}
    </>
  );
}
