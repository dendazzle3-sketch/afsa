import React from 'react';
import { Heart, Music, Sparkles, Image as ImageIcon, Clock, HelpCircle, Mail, Feather } from 'lucide-react';
import { audioSynth } from '../utils/audioSynth';

interface NavbarProps {
  onOpenLoveNotes: () => void;
  onScrollTo: (id: string) => void;
}

export const Navbar: React.FC<NavbarProps> = ({ onOpenLoveNotes, onScrollTo }) => {
  return (
    <header className="fixed top-0 left-0 right-0 z-40 bg-slate-950/80 backdrop-blur-xl border-b border-rose-500/20 px-4 py-3 transition-all">
      <div className="max-w-6xl mx-auto flex items-center justify-between">
        
        {/* Brand Logo */}
        <div
          onClick={() => onScrollTo('hero')}
          className="flex items-center gap-2 cursor-pointer group"
        >
          <div className="p-2 rounded-xl bg-gradient-to-tr from-rose-600 to-pink-500 text-white shadow-md group-hover:scale-110 transition-transform">
            <Heart className="w-5 h-5 fill-white text-white" />
          </div>
          <div className="flex flex-col">
            <span className="font-serif font-bold text-base sm:text-lg text-rose-100 group-hover:text-rose-300 transition-colors">
              Afsa Taj
            </span>
            <span className="text-[10px] text-rose-300/80 font-mono tracking-wider">
              MY FOREVER LOVE ✨
            </span>
          </div>
        </div>

        {/* Navigation Links */}
        <nav className="hidden md:flex items-center gap-5 text-xs font-semibold text-slate-300">
          <button
            onClick={() => onScrollTo('clock')}
            className="hover:text-rose-300 transition-colors flex items-center gap-1.5 cursor-pointer"
          >
            <Clock className="w-4 h-4 text-rose-400" />
            <span>Love Clock</span>
          </button>

          <button
            onClick={() => onScrollTo('poems')}
            className="hover:text-rose-300 transition-colors flex items-center gap-1.5 cursor-pointer"
          >
            <Feather className="w-4 h-4 text-rose-400" />
            <span>Poems</span>
          </button>

          <button
            onClick={() => onScrollTo('proposal')}
            className="hover:text-amber-200 transition-colors flex items-center gap-1.5 cursor-pointer text-amber-300 font-bold bg-amber-500/10 px-2.5 py-1 rounded-lg border border-amber-500/30"
          >
            <HelpCircle className="w-4 h-4 text-amber-400" />
            <span>Do You Love Me? 💖</span>
          </button>

          <button
            onClick={() => onScrollTo('gallery')}
            className="hover:text-rose-300 transition-colors flex items-center gap-1.5 cursor-pointer"
          >
            <ImageIcon className="w-4 h-4 text-rose-400" />
            <span>Gallery</span>
          </button>

          <button
            onClick={() => onScrollTo('quotes')}
            className="hover:text-rose-300 transition-colors flex items-center gap-1.5 cursor-pointer"
          >
            <Sparkles className="w-4 h-4 text-amber-300" />
            <span>Quotes</span>
          </button>
        </nav>

        {/* Quick Action */}
        <div className="flex items-center gap-3">
          <button
            onClick={() => {
              audioSynth.playHeartChime();
              onOpenLoveNotes();
            }}
            className="px-4 py-2 rounded-xl bg-gradient-to-r from-rose-500 to-pink-600 hover:from-rose-600 hover:to-pink-700 text-white font-bold text-xs shadow-lg shadow-rose-500/30 hover:scale-105 active:scale-95 transition-all flex items-center gap-1.5 cursor-pointer"
          >
            <Mail className="w-3.5 h-3.5" />
            <span>Love Notes 💌</span>
          </button>
        </div>

      </div>
    </header>
  );
};
