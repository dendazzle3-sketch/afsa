import React, { useState, useEffect } from 'react';
import { Music, Volume2, VolumeX, SkipForward, Sparkles, Heart } from 'lucide-react';
import { audioSynth } from '../utils/audioSynth';

export const MusicPlayer: React.FC = () => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const [volume, setVolume] = useState(0.3);
  const [currentTrackIdx, setCurrentTrackIdx] = useState(0);
  const [freqData, setFreqData] = useState<number[]>([10, 20, 15, 30, 25, 18, 12, 28]);

  useEffect(() => {
    let interval: number;
    if (isPlaying) {
      interval = window.setInterval(() => {
        const rawData = audioSynth.getFrequencyData();
        const bars: number[] = [];
        for (let i = 0; i < 8; i++) {
          const val = rawData[i * 2] || Math.floor(Math.random() * 40) + 10;
          bars.push(Math.max(10, Math.min(100, (val / 255) * 100)));
        }
        setFreqData(bars);
      }, 100);
    } else {
      setFreqData([8, 12, 10, 14, 12, 10, 8, 12]);
    }
    return () => clearInterval(interval);
  }, [isPlaying]);

  const togglePlay = () => {
    if (isPlaying) {
      audioSynth.stopBackgroundMusic();
      setIsPlaying(false);
    } else {
      audioSynth.startBackgroundMusic();
      setIsPlaying(true);
    }
  };

  const handleNextTrack = () => {
    const nextIdx = (currentTrackIdx + 1) % audioSynth.tracks.length;
    setCurrentTrackIdx(nextIdx);
    audioSynth.setTrack(nextIdx);
    if (!isPlaying) {
      audioSynth.startBackgroundMusic();
      setIsPlaying(true);
    }
  };

  const handleVolumeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newVol = parseFloat(e.target.value);
    setVolume(newVol);
    audioSynth.setVolume(isMuted ? 0 : newVol);
  };

  const toggleMute = () => {
    if (isMuted) {
      setIsMuted(false);
      audioSynth.setVolume(volume);
    } else {
      setIsMuted(true);
      audioSynth.setVolume(0);
    }
  };

  const currentTrack = audioSynth.tracks[currentTrackIdx];

  return (
    <div className="fixed bottom-4 left-4 z-40 max-w-xs sm:max-w-sm">
      <div className="bg-slate-900/85 backdrop-blur-md text-white border border-rose-500/30 rounded-2xl p-3 shadow-2xl shadow-rose-950/40 flex flex-col gap-2 transition-all">
        {/* Header line */}
        <div className="flex items-center justify-between gap-2">
          <div className="flex items-center gap-2 overflow-hidden">
            <div className={`p-2 rounded-xl bg-gradient-to-tr from-rose-600 to-pink-500 text-white ${isPlaying ? 'animate-pulse' : ''}`}>
              <Music className="w-4 h-4" />
            </div>
            <div className="flex flex-col min-w-0">
              <span className="text-xs font-semibold text-rose-300 flex items-center gap-1">
                <Heart className="w-3 h-3 fill-rose-400 text-rose-400 inline" />
                Serene Melody for Afsa
              </span>
              <span className="text-xs text-slate-200 truncate font-medium">
                {currentTrack.name}
              </span>
            </div>
          </div>

          <button
            onClick={togglePlay}
            className={`px-3 py-1.5 rounded-xl text-xs font-semibold transition-all duration-300 flex items-center gap-1 shadow-md ${
              isPlaying
                ? 'bg-rose-500 text-white hover:bg-rose-600 shadow-rose-500/30'
                : 'bg-rose-950/80 text-rose-200 border border-rose-500/40 hover:bg-rose-900'
            }`}
          >
            {isPlaying ? 'Pause' : 'Play Music 🎵'}
          </button>
        </div>

        {/* Equalizer bars */}
        <div className="flex items-end justify-between h-5 px-2 bg-slate-950/50 rounded-lg py-1">
          {freqData.map((height, i) => (
            <div
              key={i}
              className="w-1.5 bg-gradient-to-t from-pink-500 to-rose-400 rounded-full transition-all duration-150"
              style={{ height: `${height}%` }}
            />
          ))}
        </div>

        {/* Controls bar */}
        <div className="flex items-center justify-between text-xs text-slate-300 pt-1 border-t border-slate-800/80">
          <div className="flex items-center gap-2">
            <button
              onClick={toggleMute}
              className="p-1 text-slate-400 hover:text-rose-300 transition-colors"
              title={isMuted ? 'Unmute' : 'Mute'}
            >
              {isMuted || volume === 0 ? (
                <VolumeX className="w-3.5 h-3.5" />
              ) : (
                <Volume2 className="w-3.5 h-3.5" />
              )}
            </button>
            <input
              type="range"
              min="0"
              max="1"
              step="0.05"
              value={isMuted ? 0 : volume}
              onChange={handleVolumeChange}
              className="w-16 h-1 bg-slate-700 rounded-lg appearance-none cursor-pointer accent-rose-500"
            />
          </div>

          <button
            onClick={handleNextTrack}
            className="flex items-center gap-1 text-rose-300 hover:text-rose-200 font-medium px-2 py-0.5 rounded hover:bg-slate-800 transition-colors"
            title="Change Track"
          >
            <span>Next Song</span>
            <SkipForward className="w-3 h-3" />
          </button>
        </div>
      </div>
    </div>
  );
};
