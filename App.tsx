import React, { useState } from 'react';
import { CursorHeartsCanvas } from './components/CursorHeartsCanvas';
import { FloatingLoveHearts } from './components/FloatingLoveHearts';
import { MusicPlayer } from './components/MusicPlayer';
import { Navbar } from './components/Navbar';
import { HeroSection } from './components/HeroSection';
import { CountdownTimer } from './components/CountdownTimer';
import { PoemsSection } from './components/PoemsSection';
import { RunawayProposal } from './components/RunawayProposal';
import { MemoryGallery } from './components/MemoryGallery';
import { QuotesCarousel } from './components/QuotesCarousel';
import { LoveNotesModal } from './components/LoveNotesModal';
import { LoveNote } from './types';
import { POPUP_LOVE_NOTES } from './data/romanticContent';
import { Heart, Sparkles } from 'lucide-react';

export default function App() {
  const [activeLoveNote, setActiveLoveNote] = useState<LoveNote | null>(null);
  const [isNoteModalOpen, setIsNoteModalOpen] = useState(false);

  const handleOpenNote = (note: LoveNote) => {
    setActiveLoveNote(note);
    setIsNoteModalOpen(true);
  };

  const handleScrollTo = (id: string) => {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 font-sans selection:bg-rose-500 selection:text-white relative overflow-x-hidden">
      {/* Interactive trailing canvas following cursor */}
      <CursorHeartsCanvas />

      {/* Wandering floating hearts with popup love notes */}
      <FloatingLoveHearts onOpenNote={handleOpenNote} />

      {/* Background Soft Melody Music Player */}
      <MusicPlayer />

      {/* Navigation Bar */}
      <Navbar
        onOpenLoveNotes={() => {
          setActiveLoveNote(POPUP_LOVE_NOTES[0]);
          setIsNoteModalOpen(true);
        }}
        onScrollTo={handleScrollTo}
      />

      {/* Main Content */}
      <main className="relative z-10">
        {/* Section 1: Hero Page with Niqabi Girl Motion & Words */}
        <div id="hero">
          <HeroSection
            onExploreMemories={() => handleScrollTo('gallery')}
            onOpenMarriageQuiz={() => handleScrollTo('proposal')}
            onOpenLoveNotes={() => {
              setActiveLoveNote(POPUP_LOVE_NOTES[0]);
              setIsNoteModalOpen(true);
            }}
          />
        </div>

        {/* Section 2: Love Anniversary Countdown Clock (1.5 Years since 2025) */}
        <div id="clock" className="py-8">
          <CountdownTimer initialStartDate="2025-01-26" />
        </div>

        {/* Section 3: Dedicated Romantic Poems for Afsa Taj */}
        <div id="poems" className="py-8">
          <PoemsSection />
        </div>

        {/* Section 4: Runaway Proposal Quiz ("No" button dodges mouse!) */}
        <div id="proposal" className="py-8">
          <RunawayProposal />
        </div>

        {/* Section 5: Photo Gallery of Best Memories */}
        <div id="gallery" className="py-8">
          <MemoryGallery />
        </div>

        {/* Section 6: Romantic Quotes & Poetry */}
        <div id="quotes" className="py-8">
          <QuotesCarousel />
        </div>
      </main>

      {/* Love Notes Modal */}
      {isNoteModalOpen && (
        <LoveNotesModal
          note={activeLoveNote}
          onClose={() => setIsNoteModalOpen(false)}
        />
      )}

      {/* Footer */}
      <footer className="relative z-10 py-12 px-4 border-t border-rose-500/20 bg-slate-950 text-center text-xs text-rose-300/80">
        <div className="max-w-md mx-auto flex flex-col items-center gap-3">
          <div className="flex items-center gap-2">
            <Sparkles className="w-4 h-4 text-amber-300 animate-spin" />
            <span className="font-serif text-sm font-semibold text-rose-200">
              Forever Dedicated to Afsa Taj
            </span>
            <Heart className="w-4 h-4 fill-rose-500 text-rose-500 animate-pulse" />
          </div>
          <p className="text-slate-400">
            Made with endless love, affection, and devotion. You are my world.
          </p>
        </div>
      </footer>
    </div>
  );
}
