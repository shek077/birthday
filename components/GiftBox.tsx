
import React, { useState, useEffect, useCallback } from 'react';
import { Position } from '../types';

interface GiftBoxProps {
  onOpen: () => void;
  isRunning: boolean;
}

const GiftBox: React.FC<GiftBoxProps> = ({ onOpen, isRunning }) => {
  const [pos, setPos] = useState<Position>({ x: 50, y: 50 });

  const moveBox = useCallback(() => {
    if (!isRunning) return;
    const newX = Math.random() * 70 + 15;
    const newY = Math.random() * 70 + 15;
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
      className="absolute transition-all duration-300 ease-out cursor-pointer z-20 group"
      style={{
        left: `${pos.x}%`,
        top: `${pos.y}%`,
        transform: 'translate(-50%, -50%)',
      }}
      onMouseEnter={() => isRunning && moveBox()}
      onClick={handleClick}
    >
      <div className={`
        relative w-32 h-32 rounded-2xl bg-gradient-to-br from-pink-600 to-rose-400
        shadow-[0_0_40px_rgba(236,64,122,0.4)] border-2 border-yellow-200/40
        transition-transform duration-300 ${!isRunning && 'animate-bounce scale-110 hover:scale-125'}
      `}>
        {/* Gold Ribbon Vertical */}
        <div className="absolute left-1/2 -translate-x-1/2 w-6 h-full bg-yellow-400 shadow-[0_0_10px_rgba(255,215,0,0.5)]" />
        {/* Gold Ribbon Horizontal */}
        <div className="absolute top-1/2 -translate-y-1/2 w-full h-6 bg-yellow-400 shadow-[0_0_10px_rgba(255,215,0,0.5)]" />
        
        {/* Bow */}
        <div className="absolute -top-4 left-1/2 -translate-x-1/2 flex gap-1">
          <div className="w-8 h-8 rounded-full border-4 border-yellow-400 bg-transparent rotate-45" />
          <div className="w-8 h-8 rounded-full border-4 border-yellow-400 bg-transparent -rotate-45" />
        </div>
      </div>
      
      {isRunning && (
        <div className="absolute -top-16 left-1/2 -translate-x-1/2 whitespace-nowrap bg-white text-pink-600 px-4 py-2 rounded-full text-sm font-black shadow-xl animate-pulse ring-4 ring-pink-100">
          CATCH HARITHA'S GIFT! 🏃‍♀️💕
        </div>
      )}
      {!isRunning && (
        <div className="absolute -top-16 left-1/2 -translate-x-1/2 whitespace-nowrap bg-yellow-400 text-pink-900 px-6 py-2 rounded-full text-base font-black shadow-xl animate-bounce border-2 border-white">
          TAP TO OPEN! 🎁✨
        </div>
      )}
    </div>
  );
};

export default GiftBox;
