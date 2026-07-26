import React, { useState, useEffect } from 'react';
import { ROMANTIC_QUOTES } from '../data/romanticContent';
import { Heart, Quote, Sparkles, ChevronLeft, ChevronRight, Copy, Check } from 'lucide-react';
import { audioSynth } from '../utils/audioSynth';

export const QuotesCarousel: React.FC = () => {
  const [activeIdx, setActiveIdx] = useState(0);
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    const timer = setInterval(() => {
      setActiveIdx((prev) => (prev + 1) % ROMANTIC_QUOTES.length);
    }, 6000);
    return () => clearInterval(timer);
  }, []);

  const currentQ = ROMANTIC_QUOTES[activeIdx];

  const handleCopy = () => {
    navigator.clipboard.writeText(`"${currentQ.quote}" ~ ${currentQ.author}`);
    setCopied(true);
    audioSynth.playHeartChime();
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <section className="w-full max-w-4xl mx-auto my-12 px-4">
      <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-slate-900 via-rose-950/80 to-slate-950 border-2 border-rose-500/30 p-8 sm:p-12 shadow-2xl backdrop-blur-xl text-center flex flex-col items-center">
        
        {/* Glow backdrop */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-72 h-72 bg-rose-500/15 rounded-full blur-3xl pointer-events-none" />

        <div className="p-3 rounded-full bg-rose-500/20 text-rose-300 mb-4 border border-rose-500/40">
          <Quote className="w-8 h-8 text-rose-400" />
        </div>

        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-slate-950/80 text-rose-300 text-xs font-mono mb-4 border border-rose-500/30">
          <Sparkles className="w-3.5 h-3.5 text-amber-300" />
          <span>{currentQ.theme}</span>
        </div>

        {/* Animated quote text */}
        <p className="text-xl sm:text-3xl font-serif font-semibold text-rose-100 max-w-2xl leading-relaxed italic mb-6 min-h-[90px] flex items-center justify-center transition-all duration-500">
          "{currentQ.quote}"
        </p>

        <span className="text-sm font-semibold text-rose-300/90 tracking-wide mb-8">
          — {currentQ.author}
        </span>

        {/* Navigation & Copy Bar */}
        <div className="flex items-center justify-between gap-4 w-full max-w-xs pt-4 border-t border-rose-500/20">
          <button
            onClick={() => {
              audioSynth.playHeartChime();
              setActiveIdx((prev) => (prev - 1 + ROMANTIC_QUOTES.length) % ROMANTIC_QUOTES.length);
            }}
            className="p-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-rose-300 hover:text-white transition-colors"
          >
            <ChevronLeft className="w-5 h-5" />
          </button>

          {/* Dots */}
          <div className="flex items-center gap-1.5">
            {ROMANTIC_QUOTES.map((_, i) => (
              <button
                key={i}
                onClick={() => {
                  audioSynth.playHeartChime();
                  setActiveIdx(i);
                }}
                className={`w-2.5 h-2.5 rounded-full transition-all ${
                  activeIdx === i ? 'w-6 bg-rose-500' : 'bg-slate-700'
                }`}
              />
            ))}
          </div>

          <button
            onClick={handleCopy}
            className="p-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-rose-300 hover:text-white transition-colors flex items-center gap-1 text-xs"
            title="Copy Quote"
          >
            {copied ? <Check className="w-4 h-4 text-emerald-400" /> : <Copy className="w-4 h-4" />}
          </button>

          <button
            onClick={() => {
              audioSynth.playHeartChime();
              setActiveIdx((prev) => (prev + 1) % ROMANTIC_QUOTES.length);
            }}
            className="p-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-rose-300 hover:text-white transition-colors"
          >
            <ChevronRight className="w-5 h-5" />
          </button>
        </div>

      </div>
    </section>
  );
};
