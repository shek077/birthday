
import React, { useState, useCallback } from 'react';
import { Position } from '../types';

interface GiftBoxProps {
  onOpen: () => void;
  isRunning: boolean;
}

const GiftBox: React.FC<GiftBoxProps> = ({ onOpen, isRunning }) => {
  const [pos, setPos] = useState<Position>({ x: 50, y: 55 });

  const moveBox = useCallback(() => {
    if (!isRunning) return;
    const newX = Math.random() * 60 + 20;
    const newY = Math.random() * 60 + 20;
    setPos({ x: newX, y: newY });
  }, [isRunning]);

  const handleClick = () => {
    if (isRunning) {
      moveBox();
    } else {
      onOpen();
    }
  };

  return (
    <div
      className={`absolute transition-all duration-500 ease-in-out cursor-pointer z-20 group ${!isRunning ? 'animate-float' : ''}`}
      style={{
        left: `${pos.x}%`,
        top: `${pos.y}%`,
        transform: 'translate(-50%, -50%)',
      }}
      onMouseEnter={() => isRunning && moveBox()}
      onClick={handleClick}
    >
      <div className={`
        relative w-36 h-36 rounded-2xl bg-gradient-to-br from-pink-600 via-rose-500 to-pink-400
        shadow-[0_0_50px_rgba(236,64,122,0.6)] border-2 border-white/20
        transition-transform duration-300 ${!isRunning && 'scale-110 hover:scale-125'}
      `}>
        {/* Shine Overlay */}
        <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-white/30 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000 overflow-hidden rounded-2xl" />
        
        {/* Gold Ribbon Vertical */}
        <div className="absolute left-1/2 -translate-x-1/2 w-8 h-full bg-yellow-400 shadow-[0_0_15px_rgba(255,215,0,0.6)]" />
        {/* Gold Ribbon Horizontal */}
        <div className="absolute top-1/2 -translate-y-1/2 w-full h-8 bg-yellow-400 shadow-[0_0_15px_rgba(255,215,0,0.6)]" />
        
        {/* 3D Bow */}
        <div className="absolute -top-6 left-1/2 -translate-x-1/2 flex gap-1 z-30">
          <div className="w-10 h-10 rounded-full border-4 border-yellow-400 bg-yellow-300/20 rotate-45 shadow-lg" />
          <div className="w-10 h-10 rounded-full border-4 border-yellow-400 bg-yellow-300/20 -rotate-45 shadow-lg" />
        </div>
      </div>
      
      {isRunning ? (
        <div className="absolute -top-20 left-1/2 -translate-x-1/2 whitespace-nowrap bg-white text-pink-600 px-6 py-2 rounded-full text-sm font-black shadow-2xl animate-pulse ring-4 ring-pink-300/50">
          CATCH HARITHA'S GIFT! 🏃‍♀️💖
        </div>
      ) : (
        <div className="absolute -top-20 left-1/2 -translate-x-1/2 whitespace-nowrap bg-yellow-400 text-pink-900 px-8 py-3 rounded-full text-lg font-black shadow-[0_0_30px_rgba(255,215,0,0.6)] animate-bounce border-2 border-white uppercase tracking-widest">
          TAP TO UNWRAP! 🎁✨
        </div>
      )}
      <style>{`
        @keyframes float {
          0%, 100% { transform: translate(-50%, -50%) translateY(0); }
          50% { transform: translate(-50%, -50%) translateY(-20px); }
        }
        .animate-float {
          animation: float 3s ease-in-out infinite;
        }
      `}</style>
    </div>
  );
};

export default GiftBox;
