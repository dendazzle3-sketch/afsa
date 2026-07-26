import React, { useState, useEffect } from 'react';
import { Heart, Sparkles, ScrollText, Image as ImageIcon, Flame } from 'lucide-react';
import { NIQABI_CHARACTER_IMAGE } from '../data/romanticContent';
import { audioSynth } from '../utils/audioSynth';

interface HeroSectionProps {
  onExploreMemories: () => void;
  onOpenLoveNotes: () => void;
  onOpenMarriageQuiz: () => void;
}

export const HeroSection: React.FC<HeroSectionProps> = ({
  onExploreMemories,
  onOpenLoveNotes,
  onOpenMarriageQuiz,
}) => {
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const [activeWordIdx, setActiveWordIdx] = useState(0);

  const floatingWords = [
    'My Queen Afsa Taj 👑',
    'Infinite Love 💖',
    'Precious & Modest 🌹',
    'My Best Blessing ✨',
    'Forever & Always ♾️',
    'Eyes That Light Up My Soul 🌙',
  ];

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      const cx = window.innerWidth / 2;
      const cy = window.innerHeight / 2;
      setMousePos({
        x: (e.clientX - cx) / cx,
        y: (e.clientY - cy) / cy,
      });
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  useEffect(() => {
    const wordInterval = setInterval(() => {
      setActiveWordIdx((prev) => (prev + 1) % floatingWords.length);
    }, 2800);
    return () => clearInterval(wordInterval);
  }, []);

  return (
    <section className="relative min-h-[90vh] flex items-center justify-center pt-24 pb-16 px-4 overflow-hidden">
      {/* Background ambient lighting */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-rose-600/15 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute top-1/3 left-1/4 w-[300px] h-[300px] bg-purple-600/15 rounded-full blur-[100px] pointer-events-none" />

      <div className="max-w-6xl mx-auto w-full grid grid-cols-1 lg:grid-cols-12 gap-12 items-center relative z-10">
        
        {/* Left Column: Romantic Greetings & Animated Motion Typography */}
        <div className="lg:col-span-7 flex flex-col items-center lg:items-start text-center lg:text-left">
          
          {/* Badge */}
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-rose-500/15 border border-rose-500/30 text-rose-300 text-xs sm:text-sm font-semibold mb-6 shadow-lg backdrop-blur-md">
            <Sparkles className="w-4 h-4 text-amber-300 animate-spin" />
            <span>Crafted With Love For Afsa Taj</span>
            <Heart className="w-4 h-4 fill-rose-500 text-rose-500 animate-pulse" />
          </div>

          <h1 className="text-4xl sm:text-6xl xl:text-7xl font-serif font-extrabold text-white tracking-tight leading-[1.1] mb-6">
            To My Beloved <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-rose-300 via-pink-200 to-rose-400 drop-shadow-lg">
              Afsa Taj
            </span>
          </h1>

          {/* Synchronized Animated Motion Word Carousel */}
          <div className="h-10 sm:h-12 overflow-hidden mb-6 flex items-center justify-center lg:justify-start">
            <div
              className="text-lg sm:text-2xl font-medium text-rose-200/90 flex items-center gap-2 transition-all duration-700 ease-out transform"
              key={activeWordIdx}
            >
              <Flame className="w-5 h-5 text-rose-400 animate-bounce" />
              <span className="italic font-serif text-rose-300 underline decoration-rose-500/50 underline-offset-8">
                {floatingWords[activeWordIdx]}
              </span>
            </div>
          </div>

          <p className="text-sm sm:text-base text-slate-300 max-w-xl mb-8 leading-relaxed">
            Welcome to your dedicated romantic universe. From the quiet beauty of your eyes behind the niqab to the warmth of your smile, every moment with you is my favorite memory.
          </p>

          {/* Action CTAs */}
          <div className="flex flex-wrap items-center justify-center lg:justify-start gap-4 w-full">
            <button
              onClick={() => {
                audioSynth.playHeartChime();
                onOpenMarriageQuiz();
              }}
              className="px-7 py-3.5 rounded-2xl bg-gradient-to-r from-amber-500 via-rose-500 to-pink-600 hover:from-amber-600 hover:to-pink-700 text-white font-bold text-sm shadow-xl shadow-amber-500/30 hover:scale-105 active:scale-95 transition-all flex items-center gap-2 cursor-pointer border border-amber-400/40"
            >
              <Sparkles className="w-4 h-4 text-amber-200 animate-spin" />
              <span>Do You Love Me? 💖</span>
            </button>

            <button
              onClick={() => {
                audioSynth.playHeartChime();
                onExploreMemories();
              }}
              className="px-7 py-3.5 rounded-2xl bg-gradient-to-r from-rose-500 to-pink-600 hover:from-rose-600 hover:to-pink-700 text-white font-bold text-sm shadow-xl shadow-rose-500/30 hover:scale-105 active:scale-95 transition-all flex items-center gap-2 cursor-pointer"
            >
              <ImageIcon className="w-4 h-4" />
              <span>Explore Memory Gallery 📸</span>
            </button>

            <button
              onClick={() => {
                audioSynth.playHeartChime();
                onOpenLoveNotes();
              }}
              className="px-7 py-3.5 rounded-2xl bg-slate-900/80 hover:bg-slate-800 text-rose-200 border border-rose-500/40 text-sm font-semibold shadow-lg hover:scale-105 active:scale-95 transition-all flex items-center gap-2 cursor-pointer"
            >
              <ScrollText className="w-4 h-4 text-rose-400" />
              <span>Open Love Notes 💌</span>
            </button>
          </div>
        </div>

        {/* Right Column: Interactive Animated Moving Niqabi Character Frame */}
        <div className="lg:col-span-5 flex justify-center relative">
          
          {/* Animated Motion Floating Word Chips around character */}
          <div className="absolute -top-6 -left-4 z-20 bg-slate-950/90 text-rose-300 text-xs px-3 py-1.5 rounded-full border border-rose-500/40 shadow-xl animate-bounce">
            ✨ Pure Grace & Dignity
          </div>

          <div
            className="absolute -bottom-4 -right-4 z-20 bg-slate-950/90 text-pink-300 text-xs px-3 py-1.5 rounded-full border border-rose-500/40 shadow-xl animate-bounce"
            style={{ animationDelay: '1.2s' }}
          >
            💖 My Forever Love Afsa
          </div>

          {/* Character Container with Mouse Parallax & Float Animation */}
          <div
            className="relative w-72 h-72 sm:w-80 sm:h-80 md:w-96 md:h-96 rounded-full p-3 bg-gradient-to-tr from-rose-500 via-pink-400 to-amber-300 shadow-2xl shadow-rose-950/80 transition-transform duration-300 ease-out"
            style={{
              transform: `perspective(1000px) rotateY(${mousePos.x * 12}deg) rotateX(${-mousePos.y * 12}deg)`,
            }}
          >
            {/* Pulsing Outer Ring */}
            <div className="absolute inset-0 rounded-full border-2 border-rose-400/50 animate-ping opacity-25" />

            {/* Inner Glowing Frame */}
            <div className="w-full h-full rounded-full overflow-hidden relative border-4 border-slate-950 bg-slate-950 shadow-inner group">
              
              <img
                src={NIQABI_CHARACTER_IMAGE}
                alt="Afsa Taj Niqabi Character"
                className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                referrerPolicy="no-referrer"
              />

              {/* Gradient Overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-transparent to-rose-900/20 pointer-events-none" />

              {/* Glowing eyes aura accent */}
              <div className="absolute top-1/3 left-1/2 -translate-x-1/2 w-32 h-12 bg-rose-400/20 blur-md pointer-events-none rounded-full" />
            </div>

            {/* Sparkles floating around character */}
            <Sparkles className="absolute top-4 right-4 w-7 h-7 text-amber-300 animate-spin" />
            <Heart className="absolute bottom-6 left-2 w-6 h-6 text-rose-500 fill-rose-500 animate-pulse" />
          </div>
        </div>

      </div>
    </section>
  );
};
