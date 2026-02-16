
import React, { useState, useEffect, useRef } from 'react';
import GiftBox from './components/GiftBox.tsx';
import Confetti from './components/Confetti.tsx';
import Glitter from './components/Glitter.tsx';
import { generateBirthdayWish } from './services/gemini.ts';

const App: React.FC = () => {
  const [isRunning, setIsRunning] = useState(true);
  const [isOpened, setIsOpened] = useState(false);
  const [timeLeft, setTimeLeft] = useState(6);
  const [wish, setWish] = useState<string>('');
  const [isTyping, setIsTyping] = useState(false);
  const [displayedWish, setDisplayedWish] = useState('');
  const [cakeEaten, setCakeEaten] = useState(false);
  const [showSecretMessage, setShowSecretMessage] = useState(false);
  const hasFetched = useRef(false);

  // Pre-fetch the wish immediately on mount
  useEffect(() => {
    if (!hasFetched.current) {
      hasFetched.current = true;
      const fetchWish = async () => {
        const aiWish = await generateBirthdayWish('Haritha');
        setWish(aiWish);
      };
      fetchWish();
    }
  }, []);

  // Timer logic
  useEffect(() => {
    if (timeLeft > 0) {
      const timer = setTimeout(() => setTimeLeft(prev => prev - 1), 1000);
      return () => clearTimeout(timer);
    } else {
      setIsRunning(false);
      // AUTO DISPLAY: Trigger the reveal as soon as time is up
      handleOpen();
    }
  }, [timeLeft]);

  const handleOpen = () => {
    setIsOpened(true);
    setIsTyping(true);
  };

  // Typing animation logic
  useEffect(() => {
    if (isTyping && wish) {
      let i = 0;
      const interval = setInterval(() => {
        setDisplayedWish(wish.slice(0, i + 1));
        i++;
        if (i >= wish.length) {
          clearInterval(interval);
          setIsTyping(false);
        }
      }, 30); // Slightly faster typing for better UX
      return () => clearInterval(interval);
    }
  }, [isTyping, wish]);

  if (showSecretMessage) {
    return (
      <div className="relative w-full h-screen flex flex-col items-center justify-center p-6 bg-[#000] overflow-hidden text-center z-[100] animate-in fade-in zoom-in duration-500">
        <div className="absolute inset-0 bg-gradient-to-b from-orange-900/40 via-transparent to-red-900/40 pointer-events-none" />
        <div className="flex gap-4 text-7xl md:text-9xl mb-8 animate-bounce">
          <span>🍗</span>
          <span>🍚</span>
          <span>🍗</span>
        </div>
        
        <h2 className="text-3xl md:text-7xl font-black text-transparent bg-clip-text bg-gradient-to-r from-orange-400 via-yellow-200 to-red-500 mb-8 leading-tight drop-shadow-[0_0_30px_rgba(251,146,60,0.4)] px-4 uppercase">
          MARIYAATHIKK MANDHI VAANGHI THANNOLANAM, KEETADI MAAKIRI 🍗✨
        </h2>

        <p className="text-xl md:text-2xl text-orange-200 font-bold mb-12 italic opacity-80">
          (Buying me Mandhi is mandatory! Hear that, monkey-face? 🐒)
        </p>

        <button 
          onClick={() => window.location.reload()}
          className="px-12 py-5 bg-gradient-to-r from-orange-600 to-red-600 hover:from-orange-500 hover:to-red-500 rounded-full font-black text-xl transition-all shadow-[0_15px_40px_rgba(220,38,38,0.4)] hover:scale-110 active:scale-95 border-2 border-white/20 uppercase tracking-widest"
        >
          I PROMISE! RELIVE MAGIC 💖
        </button>
        
        <div className="mt-12 text-6xl opacity-30 animate-pulse">
          🏃‍♀️💨 🍖
        </div>
      </div>
    );
  }

  return (
    <div className="relative w-full h-screen flex flex-col items-center justify-center p-4 bg-[#1a0515] overflow-hidden">
      <style>{`
        .custom-scrollbar::-webkit-scrollbar {
          width: 8px;
        }
        .custom-scrollbar::-webkit-scrollbar-track {
          background: rgba(255, 255, 255, 0.05);
          border-radius: 10px;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb {
          background: linear-gradient(to bottom, #ec407a, #d81b60);
          border-radius: 10px;
          border: 2px solid rgba(26, 5, 21, 0.8);
        }
        .custom-scrollbar::-webkit-scrollbar-thumb:hover {
          background: #f06292;
        }
        .text-glow {
           text-shadow: 0 0 10px rgba(236, 64, 122, 0.5), 0 0 20px rgba(236, 64, 122, 0.3);
        }
      `}</style>

      {/* Background Magical Layers */}
      <Glitter />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(219,39,119,0.25)_0%,transparent_80%)] pointer-events-none" />
      
      {/* The Moon */}
      <div className="absolute top-4 right-4 md:top-20 md:right-20 pointer-events-none z-0">
        <div className="relative w-16 h-16 md:w-32 md:h-32 rounded-full bg-[#fffcf0] shadow-[0_0_80px_#fffcf0,0_0_120px_rgba(255,252,240,0.3)] animate-pulse overflow-hidden">
          <div className="absolute top-4 left-6 w-4 h-4 rounded-full bg-gray-200/50" />
          <div className="absolute bottom-6 right-10 w-6 h-6 rounded-full bg-gray-200/50" />
          <div className="absolute top-1/2 left-2 w-3 h-3 rounded-full bg-gray-200/50" />
        </div>
      </div>

      {!isOpened ? (
        <div className="flex flex-col items-center text-center z-10 space-y-8">
          <h1 className="text-6xl md:text-9xl font-black text-transparent bg-clip-text bg-gradient-to-r from-pink-300 via-white to-pink-300 tracking-tighter drop-shadow-[0_5px_15px_rgba(255,182,193,0.5)]">
            HARITHA 💖
          </h1>
          
          <div className="text-xl font-bold text-pink-100 bg-white/5 backdrop-blur-md px-8 py-4 rounded-full border border-white/10 shadow-2xl">
            <span className="flex items-center gap-3">
              Surprise auto-revealing in: <span className="text-yellow-400 text-4xl font-black drop-shadow-[0_0_10px_rgba(250,204,21,0.5)]">{timeLeft}s</span>
            </span>
          </div>

          <div className="scale-125 md:scale-150">
            <GiftBox isRunning={isRunning} onOpen={handleOpen} />
          </div>
        </div>
      ) : (
        <div className="max-w-4xl w-full flex flex-col items-center justify-start space-y-6 md:space-y-8 animate-in fade-in zoom-in duration-1000 z-10 px-2 overflow-y-auto max-h-screen pt-10 pb-24 custom-scrollbar">
          <Confetti />
          
          <div className="space-y-2 text-center">
            <p className="text-pink-300 font-bold tracking-[0.3em] uppercase text-[10px] md:text-sm animate-pulse">To my dearest safe place</p>
            <h1 className="text-4xl md:text-7xl font-black text-transparent bg-clip-text bg-gradient-to-b from-yellow-200 via-yellow-100 to-yellow-500 drop-shadow-[0_10px_20px_rgba(255,215,0,0.4)] tracking-tight px-4 leading-tight">
              HAPPY BIRTHDAY HARITHA! 💖
            </h1>
          </div>

          <div className="w-full bg-white/5 backdrop-blur-3xl rounded-[2rem] md:rounded-[3rem] p-6 md:p-12 border border-white/10 shadow-[0_0_100px_rgba(219,39,119,0.2)] relative group mx-auto">
            {/* Scrollable text container to prevent screen overflow */}
            <div className="max-h-[40vh] md:max-h-[50vh] overflow-y-auto custom-scrollbar px-4 py-2 text-center">
               <p className="text-xl md:text-4xl font-black italic text-pink-50 leading-relaxed drop-shadow-md break-words text-glow">
                "{displayedWish || (wish ? '' : 'Preparing your magical message...')}"
              </p>
            </div>
            
            <div className="absolute -top-6 -right-4 md:-top-10 md:-right-10 text-5xl md:text-8xl animate-bounce pointer-events-none">💕</div>
            <div className="absolute -bottom-6 -left-4 md:-bottom-10 md:-left-10 text-5xl md:text-8xl animate-bounce pointer-events-none" style={{ animationDelay: '0.5s' }}>👑</div>
            
            <div className="absolute top-0 -left-full w-1/2 h-full bg-gradient-to-r from-transparent via-white/5 to-transparent skew-x-[-25deg] group-hover:left-[150%] transition-all duration-[2s] pointer-events-none" />
          </div>

          <div className="flex flex-col items-center gap-6 py-4 text-center">
            <div className="flex gap-6 text-5xl md:text-7xl">
              <span className="animate-bounce" style={{ animationDelay: '0s' }}>🎈</span>
              <span className="animate-bounce" style={{ animationDelay: '0.2s' }}>🌸</span>
              <span className="animate-bounce" style={{ animationDelay: '0.4s' }}>✨</span>
            </div>

            <div className="space-y-6">
              <p className="text-pink-200 font-black text-xl md:text-2xl italic tracking-wider animate-pulse">Eat your birthday cake, Bestfriend! 🎂✨</p>
              <div 
                onClick={() => setCakeEaten(true)}
                className={`
                  text-8xl md:text-9xl cursor-pointer select-none transition-all duration-[1.5s] relative inline-block
                  ${cakeEaten ? 'scale-[3] -translate-y-[40vh] opacity-0 blur-2xl rotate-[720deg] pointer-events-none' : 'hover:scale-110 active:scale-95 drop-shadow-[0_0_40px_rgba(255,255,255,0.4)]'}
                `}
              >
                {!cakeEaten && <div className="absolute inset-0 animate-ping opacity-20 bg-pink-400 rounded-full scale-50" />}
                {cakeEaten ? '✨💖✨' : '🎂'}
              </div>
            </div>
            
            {cakeEaten && (
              <div className="animate-in zoom-in slide-in-from-bottom duration-1000 text-2xl md:text-5xl font-black text-yellow-400 flex flex-col items-center gap-4 px-4">
                <span className="drop-shadow-[0_0_15px_rgba(250,204,21,0.6)] text-center uppercase">MAGICAL! YOU'RE THE BEST! 🍭</span>
                <span className="text-sm md:text-xl font-bold text-pink-100 tracking-[0.2em] bg-pink-900/40 backdrop-blur-md px-8 py-3 rounded-full border border-pink-500/30 text-center uppercase">May all your dreams come true! 🌙</span>
              </div>
            )}
          </div>

          <button 
            onClick={() => setShowSecretMessage(true)}
            className="px-12 py-5 bg-gradient-to-r from-pink-600 via-rose-500 to-orange-400 hover:from-pink-500 hover:to-orange-300 rounded-full font-black text-xl transition-all shadow-[0_15px_40px_rgba(225,29,72,0.4)] hover:shadow-pink-400/80 active:scale-90 border-4 border-white/20 uppercase tracking-tighter"
          >
            RELIVE THE MAGIC 🌌
          </button>
        </div>
      )}

      <footer className="absolute bottom-4 text-pink-400/30 text-[10px] md:text-xs font-black tracking-[0.4em] uppercase pointer-events-none text-center w-full">
        Haritha • My Dearest Bestfriend • Forever 💖
      </footer>
    </div>
  );
};

export default App;
