
import React, { useState, useEffect } from 'react';
import GiftBox from './components/GiftBox';
import Confetti from './components/Confetti';
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
    <div className="relative w-full h-screen flex flex-col items-center justify-center p-4 bg-[#2d0a1a]">
      {/* Background Decorative Elements */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(219,39,119,0.2)_0%,transparent_70%)] pointer-events-none" />
      <div className="absolute top-10 left-10 text-4xl opacity-20 animate-pulse">✨</div>
      <div className="absolute bottom-20 right-10 text-4xl opacity-20 animate-bounce">💖</div>

      {!isOpened ? (
        <>
          <h1 className="text-5xl md:text-7xl font-black text-transparent bg-clip-text bg-gradient-to-r from-pink-300 via-white to-pink-300 mb-8 text-center animate-pulse tracking-tight drop-shadow-sm">
            HARITHA'S SURPRISE 💖
          </h1>
          
          <div className="text-xl font-bold text-pink-200 mb-20 bg-pink-900/40 px-6 py-2 rounded-full border border-pink-400/30">
            {isRunning ? (
              <span className="flex items-center gap-3">
                Catching in: <span className="text-yellow-400 text-3xl font-black">{timeLeft}s</span>
              </span>
            ) : (
              <span className="text-white animate-bounce flex items-center gap-2">
                YOU GOT IT! OPEN FOR HARITHA! 🎁
              </span>
            )}
          </div>

          <GiftBox isRunning={isRunning} onOpen={handleOpen} />
        </>
      ) : (
        <div className="max-w-3xl w-full text-center space-y-8 animate-in fade-in zoom-in duration-1000">
          <Confetti />
          
          <div className="space-y-2">
            <p className="text-pink-300 font-bold tracking-widest uppercase">To my safe place</p>
            <h1 className="text-5xl md:text-7xl font-black text-transparent bg-clip-text bg-gradient-to-b from-yellow-200 to-yellow-500 drop-shadow-[0_2px_10px_rgba(255,215,0,0.3)]">
              HAPPY BIRTHDAY HARITHA! 💖
            </h1>
          </div>

          <div className="bg-white/5 backdrop-blur-xl rounded-[2.5rem] p-10 border border-white/20 shadow-[0_20px_50px_rgba(0,0,0,0.3)] relative group">
             <p className="text-xl md:text-2xl font-bold min-h-[6rem] flex items-center justify-center italic text-pink-50 leading-relaxed text-center">
              "{displayedWish}"
            </p>
            <div className="absolute -top-8 -right-8 text-7xl rotate-12 transition-transform group-hover:scale-125 duration-500">💕</div>
            <div className="absolute -bottom-8 -left-8 text-7xl -rotate-12 transition-transform group-hover:scale-125 duration-500">🌸</div>
          </div>

          <div className="flex flex-col items-center gap-6">
            <div className="flex gap-4 text-6xl animate-bounce">
              <span>👭</span><span>💖</span><span>🍰</span>
            </div>

            <div className="space-y-4">
              <p className="text-pink-200 font-semibold text-lg italic tracking-wide">Take a bite of your birthday cake, Haritha! ✨</p>
              <div 
                onClick={() => setCakeEaten(true)}
                className={`
                  text-9xl cursor-pointer select-none transition-all duration-1000
                  ${cakeEaten ? 'scale-150 -translate-y-[30vh] opacity-0 blur-xl rotate-[360deg] pointer-events-none' : 'hover:scale-110 active:scale-90 drop-shadow-[0_0_20px_rgba(255,182,193,0.5)]'}
                `}
              >
                {cakeEaten ? '💖' : '🎂'}
              </div>
            </div>
            
            {cakeEaten && (
              <div className="animate-in fade-in slide-in-from-bottom duration-700 text-3xl font-black text-yellow-400 flex flex-col items-center gap-2">
                <span>Sweet like you! 🍬</span>
                <span className="text-sm font-normal text-pink-200">You deserve all the success in the world!</span>
              </div>
            )}
          </div>

          <button 
            onClick={() => window.location.reload()}
            className="mt-8 px-10 py-4 bg-gradient-to-r from-pink-600 to-rose-500 hover:from-pink-500 hover:to-rose-400 rounded-full font-black text-lg transition-all shadow-[0_10px_20px_rgba(225,29,72,0.4)] hover:shadow-pink-500/60 active:scale-95 border-2 border-pink-300/30"
          >
            CELEBRATE AGAIN 🎆
          </button>
        </div>
      )}

      <footer className="absolute bottom-6 text-pink-400/40 text-xs font-medium tracking-widest uppercase">
        Infinite Love for Haritha 💖
      </footer>
    </div>
  );
};

export default App;
