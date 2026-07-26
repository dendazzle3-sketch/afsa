import React, { useState } from 'react';
import { LoveNote } from '../types';
import { POPUP_LOVE_NOTES, REASONS_LIST } from '../data/romanticContent';
import { Heart, X, Sparkles, Mail, Send, Shuffle, Quote } from 'lucide-react';
import { audioSynth } from '../utils/audioSynth';
import confetti from 'canvas-confetti';

interface LoveNotesModalProps {
  note: LoveNote | null;
  onClose: () => void;
}

export const LoveNotesModal: React.FC<LoveNotesModalProps> = ({ note, onClose }) => {
  const [activeTab, setActiveTab] = useState<'notes' | 'reasons' | 'add'>('notes');
  const [selectedNote, setSelectedNote] = useState<LoveNote>(note || POPUP_LOVE_NOTES[0]);
  const [currentReasonIdx, setCurrentReasonIdx] = useState(0);

  // User created love notes
  const [customNotes, setCustomNotes] = useState<LoveNote[]>([]);
  const [newTitle, setNewTitle] = useState('');
  const [newMessage, setNewMessage] = useState('');

  const allNotes = [...POPUP_LOVE_NOTES, ...customNotes];

  const handleNextReason = () => {
    audioSynth.playHeartChime();
    setCurrentReasonIdx((prev) => (prev + 1) % REASONS_LIST.length);
  };

  const handleAddNote = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newTitle.trim() || !newMessage.trim()) return;

    const created: LoveNote = {
      id: `custom-${Date.now()}`,
      title: newTitle,
      message: newMessage,
      date: 'Just Now',
    };

    setCustomNotes([created, ...customNotes]);
    setSelectedNote(created);
    setNewTitle('');
    setNewMessage('');
    setActiveTab('notes');
    audioSynth.playCelebrateSound();

    confetti({
      particleCount: 50,
      spread: 60,
      colors: ['#f43f5e', '#ec4899', '#fda4af'],
    });
  };

  if (!note && activeTab === 'notes' && !selectedNote) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-md animate-fadeIn">
      <div className="relative w-full max-w-2xl overflow-hidden rounded-3xl bg-slate-900 border-2 border-rose-500/40 p-6 sm:p-8 shadow-2xl shadow-rose-950/60 text-white">
        
        {/* Background glow */}
        <div className="absolute top-0 right-0 w-48 h-48 bg-rose-500/20 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute bottom-0 left-0 w-48 h-48 bg-purple-500/20 rounded-full blur-3xl pointer-events-none" />

        {/* Close button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-2 rounded-full bg-slate-800 text-slate-300 hover:text-white hover:bg-rose-600 transition-colors z-20"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Modal Navigation */}
        <div className="flex items-center justify-center gap-2 mb-6 border-b border-slate-800 pb-4">
          <button
            onClick={() => setActiveTab('notes')}
            className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-semibold transition-all flex items-center gap-1.5 ${
              activeTab === 'notes'
                ? 'bg-rose-500 text-white shadow-lg shadow-rose-500/30'
                : 'bg-slate-800 text-slate-300 hover:text-white'
            }`}
          >
            <Mail className="w-4 h-4" />
            <span>Love Notes ({allNotes.length})</span>
          </button>

          <button
            onClick={() => setActiveTab('reasons')}
            className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-semibold transition-all flex items-center gap-1.5 ${
              activeTab === 'reasons'
                ? 'bg-rose-500 text-white shadow-lg shadow-rose-500/30'
                : 'bg-slate-800 text-slate-300 hover:text-white'
            }`}
          >
            <Sparkles className="w-4 h-4" />
            <span>Why I Love Afsa</span>
          </button>

          <button
            onClick={() => setActiveTab('add')}
            className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-semibold transition-all flex items-center gap-1.5 ${
              activeTab === 'add'
                ? 'bg-rose-500 text-white shadow-lg shadow-rose-500/30'
                : 'bg-slate-800 text-slate-300 hover:text-white'
            }`}
          >
            <Send className="w-4 h-4" />
            <span>Write Note ✍️</span>
          </button>
        </div>

        {/* TAB 1: READ LOVE NOTES */}
        {activeTab === 'notes' && (
          <div className="flex flex-col gap-4">
            {/* Main Note Card */}
            <div className="p-6 rounded-2xl bg-gradient-to-br from-rose-950/80 to-slate-950 border border-rose-500/30 shadow-inner">
              <div className="flex items-center gap-2 text-rose-300 text-xs font-semibold mb-2">
                <Heart className="w-4 h-4 fill-rose-500 text-rose-500" />
                <span>Dedicated to Afsa Taj</span>
              </div>

              <h3 className="text-xl sm:text-2xl font-serif font-bold text-rose-100 mb-3">
                {selectedNote.title}
              </h3>

              <p className="text-sm sm:text-base text-slate-200 leading-relaxed font-serif italic mb-4">
                "{selectedNote.message}"
              </p>

              <div className="text-right text-xs text-rose-300/80 font-mono">
                ~ Yours Forever
              </div>
            </div>

            {/* Note Selector List */}
            <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-none">
              {allNotes.map((n, i) => (
                <button
                  key={n.id}
                  onClick={() => {
                    audioSynth.playHeartChime();
                    setSelectedNote(n);
                  }}
                  className={`px-3 py-2 rounded-xl text-xs whitespace-nowrap font-medium transition-all ${
                    selectedNote.id === n.id
                      ? 'bg-rose-500 text-white border border-rose-400 shadow-md'
                      : 'bg-slate-800/80 text-slate-300 hover:bg-slate-700'
                  }`}
                >
                  💌 Note #{i + 1}
                </button>
              ))}
            </div>
          </div>
        )}

        {/* TAB 2: REASONS WHY I LOVE AFSA */}
        {activeTab === 'reasons' && (
          <div className="flex flex-col items-center text-center py-4">
            <div className="p-3 rounded-full bg-rose-500/20 text-rose-300 mb-4 border border-rose-500/40">
              <Quote className="w-8 h-8 text-rose-400" />
            </div>

            <span className="text-xs font-mono text-rose-300 uppercase tracking-widest mb-2">
              Reason #{currentReasonIdx + 1} of {REASONS_LIST.length}
            </span>

            <h3 className="text-lg sm:text-2xl font-serif font-semibold text-rose-100 mb-6 max-w-md leading-relaxed">
              "{REASONS_LIST[currentReasonIdx]}"
            </h3>

            <button
              onClick={handleNextReason}
              className="px-6 py-3 rounded-2xl bg-gradient-to-r from-rose-500 to-pink-600 hover:from-rose-600 hover:to-pink-700 text-white font-bold text-xs shadow-lg hover:scale-105 transition-all flex items-center gap-2"
            >
              <Shuffle className="w-4 h-4" />
              <span>Discover Another Reason 💖</span>
            </button>
          </div>
        )}

        {/* TAB 3: WRITE CUSTOM LOVE NOTE */}
        {activeTab === 'add' && (
          <form onSubmit={handleAddNote} className="flex flex-col gap-4">
            <div>
              <label className="block text-xs font-semibold text-rose-200 mb-1">
                Note Title:
              </label>
              <input
                type="text"
                value={newTitle}
                onChange={(e) => setNewTitle(e.target.value)}
                placeholder="e.g. My Favorite Memory With You"
                className="w-full bg-slate-950 text-white border border-rose-500/30 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:border-rose-400"
                required
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-rose-200 mb-1">
                Personal Love Message:
              </label>
              <textarea
                value={newMessage}
                onChange={(e) => setNewMessage(e.target.value)}
                rows={4}
                placeholder="Write your sweet message for Afsa Taj here..."
                className="w-full bg-slate-950 text-white border border-rose-500/30 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:border-rose-400"
                required
              />
            </div>

            <button
              type="submit"
              className="w-full py-3 rounded-xl bg-gradient-to-r from-rose-500 to-pink-600 hover:from-rose-600 hover:to-pink-700 text-white font-bold text-sm shadow-xl shadow-rose-500/30 transition-all flex items-center justify-center gap-2"
            >
              <Send className="w-4 h-4" />
              <span>Save & Add to Floating Love Sky 💖</span>
            </button>
          </form>
        )}

      </div>
    </div>
  );
};
