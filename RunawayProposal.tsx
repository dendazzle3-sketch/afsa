import React, { useState, useRef } from 'react';
import { Heart, Sparkles, CheckCircle2, ShieldAlert, PartyPopper } from 'lucide-react';
import { PROPOSAL_QUESTIONS } from '../data/romanticContent';
import { audioSynth } from '../utils/audioSynth';
import confetti from 'canvas-confetti';

export const RunawayProposal: React.FC = () => {
  const [currentQuestionIdx, setCurrentQuestionIdx] = useState(0);
  const [agreed, setAgreed] = useState(false);
  const [dodgeCount, setDodgeCount] = useState(0);
  const [noButtonPos, setNoButtonPos] = useState({ x: 0, y: 0, absolute: false });

  const containerRef = useRef<HTMLDivElement | null>(null);

  const currentQ = PROPOSAL_QUESTIONS[currentQuestionIdx];

  const handleAgree = () => {
    setAgreed(true);
    audioSynth.playCelebrateSound();

    // Fire fireworks confetti
    confetti({
      particleCount: 120,
      spread: 90,
      origin: { y: 0.6 },
      colors: ['#f43f5e', '#ec4899', '#f472b6', '#fbbf24', '#a855f7'],
    });
  };

  const handleDodgeNoButton = () => {
    audioSynth.playDodgeSound();
    setDodgeCount((prev) => prev + 1);

    if (containerRef.current) {
      const rect = containerRef.current.getBoundingClientRect();
      // Generate random coordinate within padding boundaries
      const maxX = rect.width - 120;
      const maxY = rect.height - 60;

      const randomX = Math.floor(Math.random() * maxX) - maxX / 2;
      const randomY = Math.floor(Math.random() * maxY) - maxY / 2;

      setNoButtonPos({ x: randomX, y: randomY, absolute: true });
    }
  };

  const nextQuestion = () => {
    setAgreed(false);
    setDodgeCount(0);
    setNoButtonPos({ x: 0, y: 0, absolute: false });
    setCurrentQuestionIdx((prev) => (prev + 1) % PROPOSAL_QUESTIONS.length);
  };

  return (
    <div className="w-full max-w-3xl mx-auto my-12 px-4">
      <div
        ref={containerRef}
        className="relative min-h-[380px] overflow-hidden rounded-3xl bg-gradient-to-br from-rose-950/80 via-slate-900/90 to-purple-950/80 border-2 border-rose-500/40 p-6 sm:p-10 shadow-2xl backdrop-blur-xl flex flex-col items-center justify-center text-center"
      >
        {/* Background glow effects */}
        <div className="absolute top-0 right-0 w-48 h-48 bg-rose-500/15 rounded-full blur-2xl pointer-events-none" />
        <div className="absolute bottom-0 left-0 w-48 h-48 bg-pink-500/15 rounded-full blur-2xl pointer-events-none" />

        {!agreed ? (
          <div className="w-full flex flex-col items-center z-10">
            {/* Header Badge */}
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-rose-500/20 border border-rose-500/40 text-rose-300 text-xs font-semibold mb-4 shadow-sm">
              <Sparkles className="w-4 h-4 text-amber-300 animate-spin" />
              <span>Interactive Romance Quiz #{currentQuestionIdx + 1}</span>
            </div>

            {/* Question Text */}
            <h3 className="text-xl sm:text-3xl font-serif font-bold text-transparent bg-clip-text bg-gradient-to-r from-rose-200 via-pink-100 to-rose-300 mb-3 max-w-xl leading-relaxed">
              "{currentQ.question}"
            </h3>

            <p className="text-xs sm:text-sm text-rose-300/80 mb-8 italic">
              {currentQ.subtitle}
            </p>

            {/* Runaway hint message */}
            {dodgeCount > 0 && (
              <p className="text-xs text-amber-300 font-medium mb-4 animate-bounce flex items-center gap-1">
                <ShieldAlert className="w-3.5 h-3.5" />
                <span>Nice try, Afsa Taj! "NO" is disabled for you! Choose YES! 😉</span>
              </p>
            )}

            {/* Action Buttons */}
            <div className="relative flex flex-wrap items-center justify-center gap-6 w-full min-h-[70px]">
              {/* YES Button */}
              <button
                onClick={handleAgree}
                className="px-8 py-3.5 rounded-2xl bg-gradient-to-r from-emerald-500 via-teal-500 to-emerald-600 hover:from-emerald-600 hover:to-teal-600 text-white font-bold text-base shadow-xl shadow-emerald-500/30 hover:scale-110 active:scale-95 transition-all duration-300 flex items-center gap-2 group cursor-pointer z-20"
              >
                <Heart className="w-5 h-5 fill-white text-white group-hover:animate-ping" />
                <span>YES 💖</span>
              </button>

              {/* RUNAWAY NO Button */}
              <button
                onMouseEnter={handleDodgeNoButton}
                onClick={handleDodgeNoButton}
                onTouchStart={handleDodgeNoButton}
                style={{
                  transform: noButtonPos.absolute
                    ? `translate(${noButtonPos.x}px, ${noButtonPos.y}px)`
                    : 'none',
                  transition: 'all 0.15s ease-out',
                }}
                className={`px-8 py-3.5 rounded-2xl bg-rose-950/90 text-rose-300 border border-rose-500/50 text-base font-bold transition-all shadow-lg cursor-pointer select-none ${
                  dodgeCount > 3 ? 'bg-rose-900/60 text-rose-200 border-rose-400' : ''
                }`}
              >
                {dodgeCount > 3 ? 'NO (Escaping!) 🏃‍♂️' : 'NO 😜'}
              </button>
            </div>
          </div>
        ) : (
          /* Agreement Celebration View */
          <div className="w-full flex flex-col items-center z-10 animate-scaleUp">
            <div className="p-4 rounded-full bg-rose-500/20 text-rose-300 mb-4 border border-rose-500/40">
              <PartyPopper className="w-12 h-12 text-rose-400 animate-bounce" />
            </div>

            <h3 className="text-2xl sm:text-4xl font-serif font-bold text-rose-200 mb-3">
              Official Agreement Confirmed! 💖
            </h3>

            <p className="text-sm sm:text-base text-rose-100 max-w-lg mb-6 leading-relaxed bg-rose-950/40 p-4 rounded-2xl border border-rose-500/30">
              {currentQ.agreeMessage}
            </p>

            <button
              onClick={nextQuestion}
              className="px-6 py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-rose-200 border border-rose-500/30 text-xs font-semibold shadow-lg hover:scale-105 transition-all flex items-center gap-2"
            >
              <CheckCircle2 className="w-4 h-4 text-rose-400" />
              <span>Next Romantic Question ➔</span>
            </button>
          </div>
        )}
      </div>
    </div>
  );
};
