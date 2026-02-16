
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

  const DEFAULT_WISH = `HAPPIEST BIRTHDAY TO MY DEAREST BEST FRIEND HARITHA, MAY U RECEIVE WHATEVR u wish in life. Thank you for being my safe place, my biggest supporter, and the one who makes life so much fun. I’m so lucky to have you in my life Wishing you endless happiness, love, and success — you truly deserve it all 💕✨`;

  // Pre-fetch logic with safety timeout
  useEffect(() => {
    if (!hasFetched.current) {
      hasFetched.current = true;
      
      // Safety timeout: If AI takes more than 3 seconds, use default
      const timer = setTimeout(() => {
        if (!wish) {
          console.log("Using fallback wish due to timeout");
          setWish(DEFAULT_WISH);
        }
      }, 3000);

      const fetchWish = async () => {
        try {
          const aiWish = await generateBirthdayWish('Haritha');
          if (aiWish) {
            setWish(aiWish);
            clearTimeout(timer);
          }
        } catch (e) {
          setWish(DEFAULT_WISH);
        }
      };
      fetchWish();
      return () => clearTimeout(timer);
    }
  }, []);

  // Countdown timer logic
  useEffect(() => {
    if (timeLeft > 0) {
      const timer = setTimeout(() => setTimeLeft(prev => prev - 1), 1000);
      return () => clearTimeout(timer);
    } else {
      setIsRunning(false);
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
      }, 25);
      return () => clearInterval(interval);
    }
  }, [isTyping, wish]);

  // Handle Secret Message View
  if (showSecretMessage) {
    return (
      <div className="relative min-h-screen w-full flex flex-col items-center justify-center p-6 bg-black text-center z-[100] animate-in fade-in zoom-in duration-500 overflow-y-auto">
        <div className="absolute inset-0 bg-gradient-to-b from-orange-900/40 via-transparent to-red-900/40 pointer-events-none" />
        <div className="flex gap-4 text-6xl md:text-8xl mb-6 animate-bounce">
          <span>🍗</span>
          <span>🍚</span>
          <span>🍗</span>
        </div>
        
        <h2 className="text-2xl md:text-6xl font-black text-transparent bg-clip-text bg-gradient-to-r from-orange-400 via-yellow-200 to-red-500 mb-6 leading-tight drop-shadow-[0_0_20px_rgba(251,146,60,0.5)] px-2 uppercase break-words">
          MARIYAATHIKK MANDHI VAANGHI THANNOLANAM, KEETADI MAAKIRI 🍗✨
        </h2>

        <p className="text-lg md:text-2xl text-orange-200 font-bold mb-10 italic opacity-80 px-4">
          (Buying me Mandhi is mandatory! Hear that, monkey-face? 🐒)
        </p>

        <button 
          onClick={() => window.location.reload()}
          className="px-8 py-4 md:px-12 md:py-5 bg-gradient-to-r from-orange-600 to-red-600 hover:from-orange-500 hover:to-red-500 rounded-full font-black text-lg md:text-xl transition-all shadow-[0_10px_30px_rgba(220,38,38,0.5)] active:scale-95 border-2 border-white/20 uppercase tracking-widest"
        >
          I PROMISE! RELIVE MAGIC 💖
        </button>
        
        <div className="mt-8 text-5xl opacity-20 animate-pulse">🏃‍♀️💨 🍖</div>
      </div>
    );
  }

  return (
    <div className="relative min-h-screen w-full flex flex-col items-center justify-center bg-[#1a0515] overflow-x-hidden selection:bg-pink-500 selection:text-white">
      <style>{`
        .custom-scrollbar::-webkit-scrollbar { width: 6px; }
        .custom-scrollbar::-webkit-scrollbar-track { background: rgba(255, 255, 255, 0.05); }
        .custom-scrollbar::-webkit-scrollbar-thumb { 
          background: linear-gradient(to bottom, #ec407a, #d81b60); 
          border-radius: 10px; 
        }
        .text-glow {
           text-shadow: 0 0 10px rgba(236, 64, 122, 0.3);
        }
      `}</style>

      <Glitter />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(219,39,119,0.15)_0%,transparent_80%)] pointer-events-none" />

      {!isOpened ? (
        <div className="flex flex-col items-center text-center z-10 space-y-8 px-4 py-10 w-full max-w-lg">
          <h1 className="text-5xl md:text-8xl font-black text-transparent bg-clip-text bg-gradient-to-r from-pink-200 via-white to-pink-200 tracking-tighter drop-shadow-[0_5px_15px_rgba(255,182,193,0.4)]">
            HARITHA 💖
          </h1>
          
          <div className="text-sm md:text-xl font-bold text-pink-100 bg-white/5 backdrop-blur-md px-6 py-3 rounded-full border border-white/10 shadow-2xl">
            Surprise revealing in: <span className="text-yellow-400 text-2xl md:text-4xl font-black">{timeLeft}s</span>
          </div>

          <div className="relative w-full h-40 flex items-center justify-center">
             <GiftBox isRunning={isRunning} onOpen={handleOpen} />
          </div>
        </div>
      ) : (
        <div className="w-full max-w-4xl flex flex-col items-center justify-start space-y-6 md:space-y-10 animate-in fade-in zoom-in duration-1000 z-10 px-4 py-12">
          <Confetti />
          
          <div className="text-center space-y-2">
            <p className="text-pink-300 font-bold tracking-[0.2em] uppercase text-[10px] md:text-sm animate-pulse">To my dearest safe place</p>
            <h1 className="text-3xl md:text-7xl font-black text-transparent bg-clip-text bg-gradient-to-b from-yellow-200 via-yellow-100 to-yellow-500 drop-shadow-[0_5px_15px_rgba(255,215,0,0.3)] tracking-tight leading-tight">
              HAPPY BIRTHDAY HARITHA! 💖
            </h1>
          </div>

          <div className="w-full bg-white/5 backdrop-blur-2xl rounded-3xl md:rounded-[3rem] p-6 md:p-10 border border-white/10 shadow-2xl relative">
            <div className="max-h-[40vh] md:max-h-[50vh] overflow-y-auto custom-scrollbar px-2 py-2">
               <p className="text-lg md:text-3xl font-black italic text-pink-50 leading-relaxed text-center drop-shadow-md break-words text-glow">
                "{displayedWish || (wish ? '' : 'Magical things take a second... ✨')}"
                {!displayedWish && !wish && <span className="inline-flex gap-1 ml-2"><span className="animate-bounce">.</span><span className="animate-bounce delay-100">.</span><span className="animate-bounce delay-200">.</span></span>}
              </p>
            </div>
            
            <div className="absolute -top-4 -right-2 md:-top-10 md:-right-10 text-4xl md:text-7xl animate-bounce">💕</div>
            <div className="absolute -bottom-4 -left-2 md:-bottom-10 md:-left-10 text-4xl md:text-7xl animate-bounce delay-300">👑</div>
          </div>

          <div className="flex flex-col items-center gap-6 py-4 w-full">
            <div className="flex gap-4 md:gap-8 text-4xl md:text-6xl">
              <span className="animate-bounce">🎈</span>
              <span className="animate-bounce delay-150">🌸</span>
              <span className="animate-bounce delay-300">✨</span>
            </div>

            <div className="text-center space-y-4">
              <p className="text-pink-200 font-black text-lg md:text-2xl italic animate-pulse">Eat your birthday cake, Bestfriend! 🎂</p>
              <div 
                onClick={() => setCakeEaten(true)}
                className={`text-7xl md:text-9xl cursor-pointer select-none transition-all duration-[1.2s] relative inline-block ${cakeEaten ? 'scale-0 opacity-0' : 'hover:scale-110 active:scale-90'}`}
              >
                {!cakeEaten && <div className="absolute inset-0 animate-ping opacity-20 bg-pink-400 rounded-full" />}
                {cakeEaten ? '✨' : '🎂'}
              </div>
            </div>
            
            {cakeEaten && (
              <div className="animate-in zoom-in slide-in-from-bottom duration-700 text-xl md:text-4xl font-black text-yellow-300 flex flex-col items-center gap-3 px-4 text-center">
                <span className="drop-shadow-lg">MAGICAL! YOU'RE THE BEST! 🍭</span>
                <span className="text-xs md:text-lg font-bold text-pink-200 tracking-widest bg-pink-900/40 px-6 py-2 rounded-full border border-pink-500/20">May all your dreams come true! 🌙</span>
              </div>
            )}
          </div>

          <button 
            onClick={() => setShowSecretMessage(true)}
            className="w-full max-w-xs md:max-w-md px-8 py-4 md:py-5 bg-gradient-to-r from-pink-600 via-rose-500 to-orange-400 rounded-full font-black text-base md:text-xl transition-all shadow-xl hover:shadow-pink-500/50 active:scale-95 border-2 border-white/20 uppercase tracking-tighter"
          >
            RELIVE THE MAGIC 🌌
          </button>
        </div>
      )}

      <footer className="mt-10 mb-6 text-pink-400/40 text-[9px] md:text-xs font-black tracking-[0.3em] uppercase pointer-events-none text-center px-4">
        Haritha • My Dearest Bestfriend • Forever 💖
      </footer>
    </div>
  );
};

export default App;
