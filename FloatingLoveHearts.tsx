import React, { useState } from 'react';
import { Heart, Sparkles, X, MailOpen } from 'lucide-react';
import { POPUP_LOVE_NOTES } from '../data/romanticContent';
import { LoveNote } from '../types';
import { audioSynth } from '../utils/audioSynth';
import confetti from 'canvas-confetti';

interface FloatingHeartProps {
  onOpenNote: (note: LoveNote) => void;
}

export const FloatingLoveHearts: React.FC<FloatingHeartProps> = ({ onOpenNote }) => {
  // Pre-generate floating items across the viewport
  const floatingItems = [
    { id: 'fh-1', top: '15%', left: '8%', noteIdx: 0, delay: '0s', size: 'w-10 h-10', color: 'text-rose-500' },
    { id: 'fh-2', top: '25%', left: '88%', noteIdx: 1, delay: '1.5s', size: 'w-12 h-12', color: 'text-pink-500' },
    { id: 'fh-3', top: '55%', left: '5%', noteIdx: 2, delay: '2.5s', size: 'w-11 h-11', color: 'text-rose-400' },
    { id: 'fh-4', top: '70%', left: '92%', noteIdx: 3, delay: '0.8s', size: 'w-10 h-10', color: 'text-pink-400' },
    { id: 'fh-5', top: '82%', left: '12%', noteIdx: 4, delay: '3.1s', size: 'w-12 h-12', color: 'text-rose-600' },
    { id: 'fh-6', top: '38%', left: '94%', noteIdx: 5, delay: '2.0s', size: 'w-9 h-9', color: 'text-pink-600' },
  ];

  const handleHeartClick = (e: React.MouseEvent, noteIdx: number) => {
    e.stopPropagation();
    audioSynth.playHeartChime();

    // Trigger cute heart particle explosion at click position
    const rect = e.currentTarget.getBoundingClientRect();
    const x = (rect.left + rect.width / 2) / window.innerWidth;
    const y = (rect.top + rect.height / 2) / window.innerHeight;

    confetti({
      particleCount: 25,
      spread: 60,
      origin: { x, y },
      colors: ['#f43f5e', '#ec4899', '#fda4af', '#f472b6'],
      shapes: ['circle'],
      scalar: 1.2,
    });

    const note = POPUP_LOVE_NOTES[noteIdx % POPUP_LOVE_NOTES.length];
    onOpenNote(note);
  };

  return (
    <div className="fixed inset-0 pointer-events-none z-30 overflow-hidden">
      {floatingItems.map((item) => (
        <div
          key={item.id}
          style={{
            top: item.top,
            left: item.left,
            animationDelay: item.delay,
          }}
          className="absolute pointer-events-auto cursor-pointer group animate-bounce transition-transform duration-500 hover:scale-125"
          onClick={(e) => handleHeartClick(e, item.noteIdx)}
          title="Click to open a secret love note for Afsa Taj! ✨"
        >
          <div className="relative flex items-center justify-center">
            {/* Soft pulsing glow behind */}
            <div className="absolute inset-0 bg-rose-500/30 blur-md rounded-full group-hover:bg-rose-400/60 transition-all" />

            <Heart
              className={`${item.size} ${item.color} fill-rose-500/80 drop-shadow-lg group-hover:rotate-12 transition-all duration-300`}
            />

            <Sparkles className="absolute -top-2 -right-2 w-4 h-4 text-amber-300 animate-spin" />

            {/* Hint label on hover */}
            <span className="absolute -bottom-6 whitespace-nowrap bg-slate-900/90 text-rose-200 text-[10px] px-2 py-0.5 rounded-full border border-rose-500/40 opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none shadow-lg font-medium">
              Open Note 💌
            </span>
          </div>
        </div>
      ))}
    </div>
  );
};
