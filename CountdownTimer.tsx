import React, { useState, useEffect } from 'react';
import { Calendar, Heart, Clock, Sparkles, Edit3 } from 'lucide-react';

interface CountdownTimerProps {
  initialStartDate?: string; // YYYY-MM-DD
}

export const CountdownTimer: React.FC<CountdownTimerProps> = ({
  initialStartDate = '2023-10-14',
}) => {
  const [startDate, setStartDate] = useState<string>(() => {
    return localStorage.getItem('afsa_anniversary_date') || initialStartDate;
  });

  const [isEditing, setIsEditing] = useState(false);
  const [tempDate, setTempDate] = useState(startDate);

  const [elapsed, setElapsed] = useState({
    years: 0,
    months: 0,
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
    totalDays: 0,
  });

  useEffect(() => {
    const calculateTime = () => {
      const start = new Date(startDate).getTime();
      const now = new Date().getTime();
      const diff = Math.max(0, now - start);

      const seconds = Math.floor((diff / 1000) % 60);
      const minutes = Math.floor((diff / (1000 * 60)) % 60);
      const hours = Math.floor((diff / (1000 * 60 * 60)) % 24);
      const totalDays = Math.floor(diff / (1000 * 60 * 60 * 24));

      const startDateObj = new Date(startDate);
      const nowDateObj = new Date();

      let years = nowDateObj.getFullYear() - startDateObj.getFullYear();
      let months = nowDateObj.getMonth() - startDateObj.getMonth();
      let days = nowDateObj.getDate() - startDateObj.getDate();

      if (days < 0) {
        months -= 1;
        const prevMonthLastDay = new Date(nowDateObj.getFullYear(), nowDateObj.getMonth(), 0).getDate();
        days += prevMonthLastDay;
      }

      if (months < 0) {
        years -= 1;
        months += 12;
      }

      setElapsed({
        years: Math.max(0, years),
        months: Math.max(0, months),
        days: Math.max(0, days),
        hours,
        minutes,
        seconds,
        totalDays,
      });
    };

    calculateTime();
    const interval = setInterval(calculateTime, 1000);
    return () => clearInterval(interval);
  }, [startDate]);

  const handleSaveDate = (e: React.FormEvent) => {
    e.preventDefault();
    setStartDate(tempDate);
    localStorage.setItem('afsa_anniversary_date', tempDate);
    setIsEditing(false);
  };

  return (
    <div className="w-full max-w-4xl mx-auto my-8 px-4">
      <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-rose-950/90 via-slate-900/90 to-purple-950/90 border border-rose-500/30 p-6 sm:p-8 shadow-2xl backdrop-blur-xl">
        {/* Background glow ambient */}
        <div className="absolute -top-24 -left-24 w-60 h-60 bg-rose-500/20 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute -bottom-24 -right-24 w-60 h-60 bg-pink-500/20 rounded-full blur-3xl pointer-events-none" />

        <div className="relative z-10 flex flex-col items-center text-center">
          {/* Badge */}
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-rose-500/20 border border-rose-500/40 text-rose-300 text-xs sm:text-sm font-medium mb-3 shadow-inner">
            <Heart className="w-4 h-4 fill-rose-500 text-rose-500 animate-pulse" />
            <span>Our Love Journey Clock</span>
            <Sparkles className="w-4 h-4 text-amber-300" />
          </div>

          <h2 className="text-2xl sm:text-4xl font-serif font-bold text-transparent bg-clip-text bg-gradient-to-r from-rose-200 via-pink-100 to-rose-300 mb-2">
            How Long We Have Been Together
          </h2>

          <p className="text-xs sm:text-sm text-rose-200/80 mb-6 max-w-lg">
            Every second spent loving <strong className="text-rose-300">Afsa Taj</strong> is a lifetime of pure happiness.
          </p>

          {/* Time metrics grid */}
          <div className="grid grid-cols-2 sm:grid-cols-6 gap-3 sm:gap-4 w-full mb-6">
            <div className="bg-slate-950/60 border border-rose-500/20 rounded-2xl p-3 sm:p-4 flex flex-col items-center justify-center shadow-lg">
              <span className="text-2xl sm:text-4xl font-bold font-mono text-rose-300">
                {elapsed.years}
              </span>
              <span className="text-[11px] sm:text-xs text-slate-400 uppercase tracking-wider mt-1 font-semibold">
                Years
              </span>
            </div>

            <div className="bg-slate-950/60 border border-rose-500/20 rounded-2xl p-3 sm:p-4 flex flex-col items-center justify-center shadow-lg">
              <span className="text-2xl sm:text-4xl font-bold font-mono text-pink-300">
                {elapsed.months}
              </span>
              <span className="text-[11px] sm:text-xs text-slate-400 uppercase tracking-wider mt-1 font-semibold">
                Months
              </span>
            </div>

            <div className="bg-slate-950/60 border border-rose-500/20 rounded-2xl p-3 sm:p-4 flex flex-col items-center justify-center shadow-lg">
              <span className="text-2xl sm:text-4xl font-bold font-mono text-rose-300">
                {elapsed.days}
              </span>
              <span className="text-[11px] sm:text-xs text-slate-400 uppercase tracking-wider mt-1 font-semibold">
                Days
              </span>
            </div>

            <div className="bg-slate-950/60 border border-rose-500/20 rounded-2xl p-3 sm:p-4 flex flex-col items-center justify-center shadow-lg">
              <span className="text-2xl sm:text-4xl font-bold font-mono text-amber-200">
                {String(elapsed.hours).padStart(2, '0')}
              </span>
              <span className="text-[11px] sm:text-xs text-slate-400 uppercase tracking-wider mt-1 font-semibold">
                Hours
              </span>
            </div>

            <div className="bg-slate-950/60 border border-rose-500/20 rounded-2xl p-3 sm:p-4 flex flex-col items-center justify-center shadow-lg">
              <span className="text-2xl sm:text-4xl font-bold font-mono text-pink-200">
                {String(elapsed.minutes).padStart(2, '0')}
              </span>
              <span className="text-[11px] sm:text-xs text-slate-400 uppercase tracking-wider mt-1 font-semibold">
                Mins
              </span>
            </div>

            <div className="bg-slate-950/60 border border-rose-400/40 bg-rose-950/30 rounded-2xl p-3 sm:p-4 flex flex-col items-center justify-center shadow-lg">
              <span className="text-2xl sm:text-4xl font-bold font-mono text-rose-400 animate-pulse">
                {String(elapsed.seconds).padStart(2, '0')}
              </span>
              <span className="text-[11px] sm:text-xs text-rose-300/80 uppercase tracking-wider mt-1 font-semibold">
                Secs
              </span>
            </div>
          </div>

          {/* Footer stats & Date modifier */}
          <div className="flex flex-wrap items-center justify-between gap-4 w-full pt-4 border-t border-rose-500/20 text-xs text-slate-300">
            <div className="flex items-center gap-2">
              <Clock className="w-4 h-4 text-rose-400" />
              <span>Total days together: <strong className="text-rose-300 font-mono text-sm">{elapsed.totalDays.toLocaleString()} days</strong> of pure love</span>
            </div>

            <div className="flex items-center gap-2">
              <Calendar className="w-4 h-4 text-rose-400" />
              <span>Anniversary Date: <strong className="text-slate-100">{startDate}</strong></span>
              <button
                onClick={() => setIsEditing(!isEditing)}
                className="p-1.5 rounded-lg bg-rose-900/50 hover:bg-rose-800 text-rose-300 hover:text-white transition-colors"
                title="Edit Anniversary Date"
              >
                <Edit3 className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>

          {/* Date Editor Modal Inline */}
          {isEditing && (
            <form onSubmit={handleSaveDate} className="mt-4 p-4 rounded-2xl bg-slate-950/90 border border-rose-500/40 flex flex-wrap items-center justify-center gap-3 w-full max-w-md animate-fadeIn">
              <label className="text-xs text-rose-200 font-medium">
                Set Our Anniversary Date:
              </label>
              <input
                type="date"
                value={tempDate}
                onChange={(e) => setTempDate(e.target.value)}
                className="bg-slate-900 text-white border border-rose-500/30 rounded-lg px-3 py-1.5 text-xs focus:outline-none focus:border-rose-400"
              />
              <button
                type="submit"
                className="bg-gradient-to-r from-rose-500 to-pink-500 hover:from-rose-600 hover:to-pink-600 text-white font-semibold px-4 py-1.5 rounded-lg text-xs shadow-md transition-all"
              >
                Save Date 💖
              </button>
            </form>
          )}
        </div>
      </div>
    </div>
  );
};
