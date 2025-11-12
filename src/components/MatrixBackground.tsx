import { useEffect, useRef } from 'react';

interface MatrixBackgroundProps {
  theme: 'green' | 'magenta' | 'cyan' | 'amber';
}

export function MatrixBackground({ theme }: MatrixBackgroundProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  const themeColors = {
    green: { main: '#00ff00', glow: '#00aa00', bg: '#001100' },
    magenta: { main: '#ff00ff', glow: '#aa00aa', bg: '#110011' },
    cyan: { main: '#00ffff', glow: '#00aaaa', bg: '#001111' },
    amber: { main: '#ffaa00', glow: '#aa6600', bg: '#110a00' },
  };

  const colors = themeColors[theme];

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    const columns = Math.floor(canvas.width / 20);
    const drops: number[] = Array(columns).fill(0);

    const chars = '01アイウエオカキクケコサシスセソタチツテトナニヌネノハヒフヘホマミムメモヤユヨラリルレロワヲン';

    const draw = () => {
      ctx.fillStyle = colors.bg + '22';
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      ctx.fillStyle = colors.main;
      ctx.font = '15px monospace';
      ctx.shadowColor = colors.glow;
      ctx.shadowBlur = 10;

      for (let i = 0; i < drops.length; i++) {
        const char = chars[Math.floor(Math.random() * chars.length)];
        ctx.fillText(char, i * 20, drops[i] * 20);

        if (drops[i] * 20 > canvas.height && Math.random() > 0.95) {
          drops[i] = 0;
        }
        drops[i]++;
      }

      ctx.shadowColor = 'transparent';
    };

    const interval = setInterval(draw, 50);

    const handleResize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };

    window.addEventListener('resize', handleResize);

    return () => {
      clearInterval(interval);
      window.removeEventListener('resize', handleResize);
    };
  }, [colors]);

  return <canvas ref={canvasRef} className="fixed inset-0 pointer-events-none opacity-30" />;
}
