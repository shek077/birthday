
import React, { useState, useEffect } from 'react';
import GiftBox from './components/GiftBox';
import Confetti from './components/Confetti';
import Glitter from './components/Glitter';
import { generateBirthdayWish } from './services/gemini';

const App: React.FC = () => {
  const [isRunning, setIsRunning] = useState(true);
  const [isOpened, setIsOpened] = useState(false);
  const [timeLeft, setTimeLeft] = useState(6);
  const [wish, setWish] = useState<string>('');
  const [isTyping, setIsTyping] = useState(false);
  const [displayedWish, setDisplayedWish] = useState('');
  const [cakeEaten, setCakeEaten] = useState(false);

  useEffect(() => {
    if (timeLeft > 0) {
      const timer = setTimeout(() => setTimeLeft(prev => prev - 1), 1000);
      return () => clearTimeout(timer);
    } else {
      setIsRunning(false);
    }
  }, [timeLeft]);

  const handleOpen = async () => {
    setIsOpened(true);
    setIsTyping(true);
    const aiWish = await generateBirthdayWish('Haritha');
    setWish(aiWish);
  };

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
      }, 40);
      return () => clearInterval(interval);
    }
  }, [isTyping, wish]);

  return (
    <div className="relative w-full h-screen flex flex-col items-center justify-center p-4 bg-[#1a0515] overflow-hidden">
      {/* Background Magical Layers */}
      <Glitter />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(219,39,119,0.25)_0%,transparent_80%)] pointer-events-none" />
      
      {/* The Moon */}
      <div className="absolute top-10 right-10 md:top-20 md:right-20 pointer-events-none">
        <div className="relative w-24 h-24 md:w-32 md:h-32 rounded-full bg-[#fffcf0] shadow-[0_0_80px_#fffcf0,0_0_120px_rgba(255,252,240,0.3)] animate-pulse overflow-hidden">
          {/* Moon craters */}
          <div className="absolute top-4 left-6 w-4 h-4 rounded-full bg-gray-200/50" />
          <div className="absolute bottom-6 right-10 w-6 h-6 rounded-full bg-gray-200/50" />
          <div className="absolute top-1/2 left-2 w-3 h-3 rounded-full bg-gray-200/50" />
        </div>
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-2xl opacity-40">🦋</div>
      </div>

      {/* Nebula Aura */}
      <div className="absolute top-[-20%] left-[-10%] w-[60%] h-[60%] bg-pink-900/20 blur-[120px] rounded-full animate-pulse" />
      <div className="absolute bottom-[-20%] right-[-10%] w-[60%] h-[60%] bg-purple-900/20 blur-[120px] rounded-full animate-pulse" style={{ animationDelay: '2s' }} />

      {!isOpened ? (
        <>
          <h1 className="text-6xl md:text-8xl font-black text-transparent bg-clip-text bg-gradient-to-r from-pink-300 via-white to-pink-300 mb-8 text-center tracking-tighter drop-shadow-[0_5px_15px_rgba(255,182,193,0.5)]">
            HARITHA 💖
          </h1>
          
          <div className="text-xl font-bold text-pink-100 mb-20 bg-white/5 backdrop-blur-md px-8 py-3 rounded-full border border-white/10 shadow-xl transition-all hover:scale-105">
            {isRunning ? (
              <span className="flex items-center gap-3">
                Magical gift appearing in: <span className="text-yellow-400 text-4xl font-black drop-shadow-[0_0_10px_rgba(250,204,21,0.5)]">{timeLeft}s</span>
              </span>
            ) : (
              <span className="text-white animate-bounce flex items-center gap-3 uppercase tracking-widest text-lg">
                ✨ Catch the magic! ✨
              </span>
            )}
          </div>

          <GiftBox isRunning={isRunning} onOpen={handleOpen} />
        </>
      ) : (
        <div className="max-w-4xl w-full text-center space-y-8 animate-in fade-in zoom-in duration-1000 z-10">
          <Confetti />
          
          <div className="space-y-2">
            <p className="text-pink-300 font-bold tracking-[0.3em] uppercase text-sm animate-pulse">To my dearest safe place</p>
            <h1 className="text-6xl md:text-8xl font-black text-transparent bg-clip-text bg-gradient-to-b from-yellow-200 via-yellow-100 to-yellow-500 drop-shadow-[0_10px_20px_rgba(255,215,0,0.4)] tracking-tight">
              HAPPY BIRTHDAY HARITHA! 💖
            </h1>
          </div>

          <div className="bg-white/10 backdrop-blur-2xl rounded-[3rem] p-12 border border-white/20 shadow-[0_0_80px_rgba(219,39,119,0.3)] relative group overflow-hidden">
            {/* Glitter pop out effect on card */}
            <div className="absolute inset-0 opacity-20 pointer-events-none bg-[url('https://www.transparenttextures.com/patterns/stardust.png')]" />
            
             <p className="text-2xl md:text-4xl font-black min-h-[10rem] flex items-center justify-center italic text-pink-50 leading-[1.4] text-center drop-shadow-md">
              "{displayedWish}"
            </p>
            
            <div className="absolute -top-10 -right-10 text-8xl transition-transform group-hover:scale-125 duration-700 animate-bounce">💕</div>
            <div className="absolute -bottom-10 -left-10 text-8xl transition-transform group-hover:scale-125 duration-700 animate-bounce" style={{ animationDelay: '0.5s' }}>👑</div>
            
            {/* Card Glint Animation */}
            <div className="absolute top-0 -left-full w-1/2 h-full bg-gradient-to-r from-transparent via-white/10 to-transparent skew-x-[-25deg] group-hover:left-[150%] transition-all duration-[1.5s]" />
          </div>

          <div className="flex flex-col items-center gap-8 py-4">
            <div className="flex gap-6 text-7xl">
              <span className="animate-bounce" style={{ animationDelay: '0s' }}>🎈</span>
              <span className="animate-bounce" style={{ animationDelay: '0.2s' }}>🌸</span>
              <span className="animate-bounce" style={{ animationDelay: '0.4s' }}>✨</span>
            </div>

            <div className="space-y-6">
              <p className="text-pink-200 font-black text-2xl italic tracking-wider animate-pulse">Eat your birthday cake, Bestfriend! 🎂✨</p>
              <div 
                onClick={() => setCakeEaten(true)}
                className={`
                  text-9xl cursor-pointer select-none transition-all duration-[1.5s] relative
                  ${cakeEaten ? 'scale-[3] -translate-y-[40vh] opacity-0 blur-2xl rotate-[720deg] pointer-events-none' : 'hover:scale-125 active:scale-95 drop-shadow-[0_0_30px_rgba(255,255,255,0.6)]'}
                `}
              >
                {!cakeEaten && <div className="absolute inset-0 animate-ping opacity-20 bg-pink-400 rounded-full scale-50" />}
                {cakeEaten ? '✨💖✨' : '🎂'}
              </div>
            </div>
            
            {cakeEaten && (
              <div className="animate-in zoom-in slide-in-from-bottom duration-1000 text-4xl font-black text-yellow-400 flex flex-col items-center gap-4">
                <span className="drop-shadow-[0_0_15px_rgba(250,204,21,0.5)]">MAGICAL! YOU'RE THE BEST! 🍭</span>
                <span className="text-lg font-bold text-pink-200 tracking-widest bg-pink-900/50 px-8 py-2 rounded-full border border-pink-500/30">May all your dreams come true! 🌙</span>
              </div>
            )}
          </div>

          <button 
            onClick={() => window.location.reload()}
            className="mt-10 px-14 py-5 bg-gradient-to-r from-pink-600 via-rose-500 to-orange-400 hover:from-pink-500 hover:to-orange-300 rounded-full font-black text-xl transition-all shadow-[0_15px_40px_rgba(225,29,72,0.5)] hover:shadow-pink-400/80 active:scale-90 border-4 border-white/20 uppercase tracking-tighter"
          >
            RELIVE THE MAGIC 🌌
          </button>
        </div>
      )}

      <footer className="absolute bottom-8 text-pink-400/60 text-sm font-black tracking-[0.5em] uppercase pointer-events-none">
        Haritha • My Safe Place • Forever 💖
      </footer>
    </div>
  );
};

export default App;
