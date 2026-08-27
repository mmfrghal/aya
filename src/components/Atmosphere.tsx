import React, { useMemo } from 'react';

export const Atmosphere: React.FC = () => {
  // Generate random dust motes with stable keys
  const particles = useMemo(() => {
    return Array.from({ length: 18 }).map((_, i) => ({
      id: i,
      left: `${Math.random() * 100}%`,
      top: `${Math.random() * 100}%`,
      size: `${Math.random() * 2.5 + 1}px`,
      duration: `${Math.random() * 12 + 10}s`,
      delay: `${Math.random() * 8}s`,
    }));
  }, []);

  return (
    <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden" aria-hidden="true">
      {/* Warm candlelight glow in corner */}
      <div 
        className="candle-glow absolute -top-24 -right-24 w-[450px] h-[450px] rounded-full blur-3xl opacity-25"
        style={{
          background: 'radial-gradient(circle, rgba(235, 160, 60, 0.45) 0%, rgba(180, 90, 30, 0.2) 50%, transparent 80%)',
        }}
      />
      <div 
        className="candle-glow absolute bottom-1/4 -left-20 w-[350px] h-[350px] rounded-full blur-3xl opacity-20"
        style={{
          background: 'radial-gradient(circle, rgba(220, 140, 50, 0.35) 0%, rgba(140, 60, 20, 0.15) 50%, transparent 80%)',
          animationDelay: '-3s',
        }}
      />

      {/* Floating dust particles */}
      {particles.map((p) => (
        <span
          key={p.id}
          className="dust-particle absolute rounded-full bg-[#fce5b8]"
          style={{
            left: p.left,
            top: p.top,
            width: p.size,
            height: p.size,
            animationDuration: p.duration,
            animationDelay: p.delay,
            filter: 'blur(0.5px)',
          }}
        />
      ))}

      {/* Very subtle vintage grain overlay */}
      <div 
        className="absolute inset-0 opacity-[0.035] mix-blend-overlay"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.8' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")`,
        }}
      />
    </div>
  );
};
