import React, { useState } from 'react';
import { Heart, Sparkles, Cake, BookOpen, Stars, Feather, Copy, Check } from 'lucide-react';
import { audioSynth } from '../utils/audioSynth';
import confetti from 'canvas-confetti';

export const POEMS_LIST = [
  {
    id: 'p1',
    title: 'The Day I Saw You in Class 🌸',
    theme: 'First Glance at Love',
    stanzas: [
      "The classroom was quiet, the world moved so slow,",
      "Until you walked in, with a radiant glow.",
      "At first i fall for you after watching your boobies,",
      "One glance at your beauty, your elegance and grace,",
      "And no other person could ever take your place.",
      "",
      "Behind your gentle niqab, your expressive eyes shone,",
      "I knew right then, my heart was no longer my own.",
      "Afsa Taj, my darling, since early 2025,",
      "Loving you is the reason my soul feels alive."
    ]
  },
  {
    id: 'p2',
    title: 'A Year and a Half of Pure Magic ✨',
    theme: '1.5 Years Together',
    stanzas: [
      "Eighteen sweet months of laughter and care,",
      "A love so profound, beyond all compare.",
      "From classroom smiles to holding your hand,",
      "You're the sweetest angel in all of the land.",
      "",
      "Through every sunrise and starlit evening sky,",
      "My love for Afsa Taj will never run dry.",
      "A year and a half has flown by like a dream,",
      "With you, my life is a golden beam."
    ]
  },
  {
    id: 'p3',
    title: 'Queen of My Heart (May 25th) 👑',
    theme: 'Birthday & Eternal Love',
    stanzas: [
      "Born on the twenty-fifth day of sweet May,",
      "A gift to this world, brightening every day.",
      "Afsa, my queen, my sanctuary and home,",
      "With you by my side, I will never walk alone.",
      "",
      "Your beauty is timeless, your soul is so pure,",
      "My promise of love will forever endure.",
      "Happy Birthday & Happy Forever, my dear,",
      "I'll cherish you more with every passing year."
    ]
  }
];

export const PoemsSection: React.FC = () => {
  const [activePoemIdx, setActivePoemIdx] = useState(0);
  const [copied, setCopied] = useState(false);

  const poem = POEMS_LIST[activePoemIdx];

  const handleCopyPoem = () => {
    const text = `${poem.title}\n\n${poem.stanzas.join('\n')}\n\n~ Forever Yours`;
    navigator.clipboard.writeText(text);
    setCopied(true);
    audioSynth.playHeartChime();
    setTimeout(() => setCopied(false), 2000);
  };

  const triggerBirthdayCelebration = () => {
    audioSynth.playCelebrateSound();
    confetti({
      particleCount: 100,
      spread: 80,
      origin: { y: 0.6 },
      colors: ['#f43f5e', '#ec4899', '#fbbf24', '#a855f7'],
    });
  };

  return (
    <section className="w-full max-w-4xl mx-auto my-12 px-4">
      <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-rose-950/90 via-slate-900/95 to-purple-950/90 border-2 border-rose-500/40 p-6 sm:p-10 shadow-2xl backdrop-blur-xl">
        
        {/* Glow ambient background */}
        <div className="absolute -top-20 -right-20 w-64 h-64 bg-rose-500/20 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute -bottom-20 -left-20 w-64 h-64 bg-pink-500/20 rounded-full blur-3xl pointer-events-none" />

        <div className="relative z-10 flex flex-col items-center text-center">
          
          {/* Header badges */}
          <div className="flex flex-wrap items-center justify-center gap-2 mb-4">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-rose-500/20 border border-rose-500/40 text-rose-300 text-xs font-semibold">
              <Feather className="w-3.5 h-3.5 text-rose-400" />
              <span>Romantic Poetry for Afsa Taj</span>
            </div>

            <button
              onClick={triggerBirthdayCelebration}
              className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-500/20 hover:bg-amber-500/30 border border-amber-500/40 text-amber-200 text-xs font-semibold transition-all cursor-pointer"
              title="Click to celebrate Afsa's Birthday!"
            >
              <Cake className="w-3.5 h-3.5 text-amber-300" />
              <span>Birthday: May 25th 🎂</span>
            </button>
          </div>

          <h2 className="text-2xl sm:text-4xl font-serif font-bold text-transparent bg-clip-text bg-gradient-to-r from-rose-200 via-pink-100 to-rose-300 mb-3">
            Verses Written From My Heart
          </h2>

          {/* Poem Selector Tabs */}
          <div className="flex flex-wrap justify-center gap-2 mb-8">
            {POEMS_LIST.map((p, idx) => (
              <button
                key={p.id}
                onClick={() => {
                  audioSynth.playHeartChime();
                  setActivePoemIdx(idx);
                }}
                className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-semibold transition-all ${
                  activePoemIdx === idx
                    ? 'bg-gradient-to-r from-rose-500 to-pink-600 text-white shadow-lg shadow-rose-500/30'
                    : 'bg-slate-950/80 text-slate-300 hover:text-white border border-slate-800'
                }`}
              >
                {p.title}
              </button>
            ))}
          </div>

          {/* Active Poem Scroll/Paper view */}
          <div className="w-full max-w-2xl bg-slate-950/80 border border-rose-500/30 rounded-2xl p-6 sm:p-8 shadow-inner relative text-left">
            
            <div className="flex items-center justify-between mb-4 pb-3 border-b border-rose-500/20">
              <span className="text-xs font-mono text-rose-400 uppercase tracking-wider flex items-center gap-1.5">
                <Sparkles className="w-3.5 h-3.5 text-amber-300" />
                {poem.theme}
              </span>

              <button
                onClick={handleCopyPoem}
                className="flex items-center gap-1 px-3 py-1 rounded-lg bg-slate-800 hover:bg-slate-700 text-rose-200 text-xs font-medium transition-colors"
              >
                {copied ? (
                  <>
                    <Check className="w-3.5 h-3.5 text-emerald-400" />
                    <span>Copied!</span>
                  </>
                ) : (
                  <>
                    <Copy className="w-3.5 h-3.5" />
                    <span>Copy Poem</span>
                  </>
                )}
              </button>
            </div>

            <h3 className="text-xl sm:text-2xl font-serif font-bold text-rose-200 mb-6 text-center">
              {poem.title}
            </h3>

            <div className="space-y-3 font-serif italic text-sm sm:text-base text-rose-100/90 leading-relaxed text-center sm:text-left">
              {poem.stanzas.map((line, index) =>
                line === '' ? (
                  <div key={index} className="h-4" />
                ) : (
                  <p key={index} className="hover:text-rose-200 transition-colors">
                    {line}
                  </p>
                )
              )}
            </div>

            <div className="mt-6 pt-4 border-t border-rose-500/20 flex items-center justify-between text-xs text-rose-300/80">
              <span className="italic">For Afsa Taj (Classroom Love Story)</span>
              <span className="font-mono">1.5 Years & Forever ♾️</span>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
};
