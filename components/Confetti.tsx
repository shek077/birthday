
import React, { useEffect, useState } from 'react';
import { Particle } from '../types';

const Confetti: React.FC = () => {
  const [particles, setParticles] = useState<Particle[]>([]);

  useEffect(() => {
    const colors = ['#FFD700', '#FFFFFF', '#F48FB1', '#F06292', '#EC407A', '#FFC1CC'];
    const newParticles: Particle[] = Array.from({ length: 100 }).map((_, i) => ({
      id: i,
      x: 50,
      y: 50,
      color: colors[Math.floor(Math.random() * colors.length)],
      angle: Math.random() * 360,
      speed: Math.random() * 6 + 3,
      rotation: Math.random() * 360,
    }));
    setParticles(newParticles);

    const timer = setTimeout(() => setParticles([]), 5000);
    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="fixed inset-0 pointer-events-none z-50">
      {particles.map((p) => (
        <div
          key={p.id}
          className="absolute w-2 h-2 rounded-full"
          style={{
            left: `${p.x}%`,
            top: `${p.y}%`,
            backgroundColor: p.color,
            boxShadow: `0 0 5px ${p.color}`,
            transform: `rotate(${p.rotation}deg)`,
            animation: `fall-${p.id} 4s cubic-bezier(0.25, 0.46, 0.45, 0.94) forwards`,
          }}
        />
      ))}
      <style>{`
        ${particles.map(p => `
          @keyframes fall-${p.id} {
            0% { transform: translate(0, 0) rotate(0deg); opacity: 1; }
            100% { 
              transform: translate(${(Math.cos(p.angle) * 600)}px, ${(Math.sin(p.angle) * 600) + 900}px) rotate(${p.rotation + 1080}deg); 
              opacity: 0; 
            }
          }
        `).join('')}
      `}</style>
    </div>
  );
};

export default Confetti;
