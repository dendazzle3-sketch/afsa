import React, { useState } from 'react';
import { MemoryPhoto } from '../types';
import { DEFAULT_MEMORIES } from '../data/romanticContent';
import { Heart, Plus, Sparkles, Image as ImageIcon, Play, Pause, X, Upload } from 'lucide-react';
import { audioSynth } from '../utils/audioSynth';
import confetti from 'canvas-confetti';

export const MemoryGallery: React.FC = () => {
  const [memories, setMemories] = useState<MemoryPhoto[]>(() => {
    const saved = localStorage.getItem('afsa_memories');
    if (saved) {
      try {
        return JSON.parse(saved);
      } catch {
        return DEFAULT_MEMORIES;
      }
    }
    return DEFAULT_MEMORIES;
  });

  const [activeCategory, setActiveCategory] = useState<string>('All');
  const [selectedPhoto, setSelectedPhoto] = useState<MemoryPhoto | null>(null);
  const [isUploading, setIsUploading] = useState(false);
  const [isPlayingSlideshow, setIsPlayingSlideshow] = useState(false);

  // New photo form state
  const [newTitle, setNewTitle] = useState('');
  const [newDate, setNewDate] = useState('');
  const [newCaption, setNewCaption] = useState('');
  const [newCategory, setNewCategory] = useState<MemoryPhoto['category']>('Cute Moments');
  const [newImageUrl, setNewImageUrl] = useState('');

  const saveMemoriesToStorage = (updated: MemoryPhoto[]) => {
    setMemories(updated);
    localStorage.setItem('afsa_memories', JSON.stringify(updated));
  };

  const categories = ['All', 'Special Dates', 'Cute Moments', 'Trips & Adventures', 'Favorites'];

  const filteredMemories = memories.filter((m) => {
    if (activeCategory === 'All') return true;
    if (activeCategory === 'Favorites') return m.isFavorite;
    return m.category === activeCategory;
  });

  const toggleFavorite = (e: React.MouseEvent, id: string) => {
    e.stopPropagation();
    audioSynth.playHeartChime();
    const updated = memories.map((m) =>
      m.id === id ? { ...m, isFavorite: !m.isFavorite } : m
    );
    saveMemoriesToStorage(updated);
  };

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setNewImageUrl(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleAddMemory = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newTitle.trim() || !newImageUrl) return;

    const newMem: MemoryPhoto = {
      id: `mem-${Date.now()}`,
      url: newImageUrl,
      title: newTitle,
      date: newDate || 'Today',
      caption: newCaption || 'A sweet memory with Afsa Taj.',
      category: newCategory,
      isFavorite: true,
    };

    const updated = [newMem, ...memories];
    saveMemoriesToStorage(updated);

    // Reset
    setNewTitle('');
    setNewDate('');
    setNewCaption('');
    setNewImageUrl('');
    setIsUploading(false);
    audioSynth.playCelebrateSound();

    confetti({
      particleCount: 60,
      spread: 70,
      colors: ['#f43f5e', '#ec4899', '#f472b6'],
    });
  };

  return (
    <section className="w-full max-w-6xl mx-auto my-16 px-4">
      {/* Header */}
      <div className="flex flex-col items-center text-center mb-10">
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-rose-500/20 border border-rose-500/40 text-rose-300 text-xs sm:text-sm font-semibold mb-3">
          <ImageIcon className="w-4 h-4 text-rose-400" />
          <span>Afsa Taj Photo Gallery</span>
          <Sparkles className="w-4 h-4 text-amber-300" />
        </div>

        <h2 className="text-3xl sm:text-5xl font-serif font-bold text-transparent bg-clip-text bg-gradient-to-r from-rose-200 via-pink-100 to-rose-300 mb-3">
          Our Best Memories
        </h2>

        <p className="text-xs sm:text-sm text-slate-300 max-w-lg">
          A timeless collection of our happiest days, sweet glances, and unforgettable adventures together.
        </p>

        {/* Categories Bar */}
        <div className="flex flex-wrap items-center justify-center gap-2 mt-6">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-semibold transition-all ${
                activeCategory === cat
                  ? 'bg-rose-500 text-white shadow-lg shadow-rose-500/30'
                  : 'bg-slate-900/80 text-slate-300 hover:text-white border border-slate-800'
              }`}
            >
              {cat}
            </button>
          ))}

          <button
            onClick={() => setIsUploading(true)}
            className="px-4 py-2 rounded-xl bg-gradient-to-r from-pink-600 to-rose-600 text-white text-xs sm:text-sm font-bold shadow-md hover:scale-105 transition-all flex items-center gap-1.5"
          >
            <Plus className="w-4 h-4" />
            <span>Add Memory 📸</span>
          </button>
        </div>
      </div>

      {/* Photo Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredMemories.map((photo) => (
          <div
            key={photo.id}
            onClick={() => setSelectedPhoto(photo)}
            className="group relative overflow-hidden rounded-3xl bg-slate-900 border border-rose-500/30 shadow-xl cursor-pointer hover:-translate-y-2 transition-all duration-300"
          >
            {/* Image */}
            <div className="relative h-64 sm:h-72 w-full overflow-hidden">
              <img
                src={photo.url}
                alt={photo.title}
                className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                referrerPolicy="no-referrer"
              />

              {/* Gradient Overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/20 to-transparent opacity-80 group-hover:opacity-90 transition-opacity" />

              {/* Category Badge */}
              <span className="absolute top-3 left-3 bg-slate-950/80 backdrop-blur-md text-rose-300 text-[10px] font-semibold px-2.5 py-1 rounded-full border border-rose-500/30">
                {photo.category}
              </span>

              {/* Favorite Button */}
              <button
                onClick={(e) => toggleFavorite(e, photo.id)}
                className="absolute top-3 right-3 p-2 rounded-full bg-slate-950/80 backdrop-blur-md border border-rose-500/30 text-rose-400 hover:text-rose-200 transition-colors"
              >
                <Heart
                  className={`w-4 h-4 ${
                    photo.isFavorite ? 'fill-rose-500 text-rose-500' : ''
                  }`}
                />
              </button>
            </div>

            {/* Content info */}
            <div className="p-5 flex flex-col">
              <span className="text-xs text-rose-400 font-mono mb-1">{photo.date}</span>
              <h3 className="text-lg font-serif font-bold text-rose-100 group-hover:text-rose-300 transition-colors mb-2">
                {photo.title}
              </h3>
              <p className="text-xs text-slate-300 line-clamp-2 leading-relaxed">
                {photo.caption}
              </p>
            </div>
          </div>
        ))}
      </div>

      {/* UPLOAD MODAL */}
      {isUploading && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-md animate-fadeIn">
          <div className="relative w-full max-w-lg overflow-hidden rounded-3xl bg-slate-900 border-2 border-rose-500/40 p-6 shadow-2xl text-white">
            <button
              onClick={() => setIsUploading(false)}
              className="absolute top-4 right-4 p-2 rounded-full bg-slate-800 text-slate-300 hover:text-white"
            >
              <X className="w-5 h-5" />
            </button>

            <h3 className="text-xl font-serif font-bold text-rose-200 mb-4 flex items-center gap-2">
              <Sparkles className="w-5 h-5 text-amber-300" />
              <span>Add a New Memory for Afsa</span>
            </h3>

            <form onSubmit={handleAddMemory} className="flex flex-col gap-4">
              <div>
                <label className="block text-xs font-semibold text-rose-200 mb-1">
                  Memory Title:
                </label>
                <input
                  type="text"
                  value={newTitle}
                  onChange={(e) => setNewTitle(e.target.value)}
                  placeholder="e.g. Our Cozy Coffee Date"
                  className="w-full bg-slate-950 text-white border border-rose-500/30 rounded-xl px-4 py-2 text-xs focus:outline-none focus:border-rose-400"
                  required
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-semibold text-rose-200 mb-1">
                    Date / Time:
                  </label>
                  <input
                    type="text"
                    value={newDate}
                    onChange={(e) => setNewDate(e.target.value)}
                    placeholder="e.g. October 14"
                    className="w-full bg-slate-950 text-white border border-rose-500/30 rounded-xl px-4 py-2 text-xs focus:outline-none focus:border-rose-400"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-rose-200 mb-1">
                    Category:
                  </label>
                  <select
                    value={newCategory}
                    onChange={(e) => setNewCategory(e.target.value as MemoryPhoto['category'])}
                    className="w-full bg-slate-950 text-white border border-rose-500/30 rounded-xl px-3 py-2 text-xs focus:outline-none focus:border-rose-400"
                  >
                    <option value="Special Dates">Special Dates</option>
                    <option value="Cute Moments">Cute Moments</option>
                    <option value="Trips & Adventures">Trips & Adventures</option>
                    <option value="Favorites">Favorites</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-rose-200 mb-1">
                  Upload Photo or Paste Image URL:
                </label>
                <div className="flex flex-col gap-2">
                  <label className="flex items-center justify-center gap-2 p-3 rounded-xl border border-dashed border-rose-500/40 bg-slate-950 hover:bg-slate-950/80 cursor-pointer text-xs text-rose-300">
                    <Upload className="w-4 h-4" />
                    <span>Choose Image File...</span>
                    <input
                      type="file"
                      accept="image/*"
                      onChange={handleFileUpload}
                      className="hidden"
                    />
                  </label>

                  <input
                    type="url"
                    value={newImageUrl}
                    onChange={(e) => setNewImageUrl(e.target.value)}
                    placeholder="Or paste image URL (https://...)"
                    className="w-full bg-slate-950 text-white border border-rose-500/30 rounded-xl px-4 py-2 text-xs focus:outline-none focus:border-rose-400"
                  />
                </div>
              </div>

              {newImageUrl && (
                <div className="h-28 w-full rounded-xl overflow-hidden border border-rose-500/30">
                  <img src={newImageUrl} alt="Preview" className="w-full h-full object-cover" />
                </div>
              )}

              <div>
                <label className="block text-xs font-semibold text-rose-200 mb-1">
                  Caption / Memory Story:
                </label>
                <textarea
                  value={newCaption}
                  onChange={(e) => setNewCaption(e.target.value)}
                  rows={3}
                  placeholder="Describe this precious moment..."
                  className="w-full bg-slate-950 text-white border border-rose-500/30 rounded-xl px-4 py-2 text-xs focus:outline-none focus:border-rose-400"
                />
              </div>

              <button
                type="submit"
                className="w-full py-2.5 rounded-xl bg-gradient-to-r from-rose-500 to-pink-600 hover:from-rose-600 hover:to-pink-700 text-white font-bold text-xs shadow-xl transition-all"
              >
                Save Memory 💖
              </button>
            </form>
          </div>
        </div>
      )}

      {/* LIGHTBOX FULL SCREEN MODAL */}
      {selectedPhoto && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/90 backdrop-blur-lg animate-fadeIn">
          <div className="relative w-full max-w-3xl overflow-hidden rounded-3xl bg-slate-900 border-2 border-rose-500/40 p-6 sm:p-8 shadow-2xl text-white">
            <button
              onClick={() => setSelectedPhoto(null)}
              className="absolute top-4 right-4 p-2 rounded-full bg-slate-800 text-slate-300 hover:text-white z-20"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="flex flex-col md:flex-row gap-6 items-center">
              <div className="w-full md:w-1/2 h-72 sm:h-80 rounded-2xl overflow-hidden border border-rose-500/30 shadow-inner">
                <img
                  src={selectedPhoto.url}
                  alt={selectedPhoto.title}
                  className="w-full h-full object-cover"
                  referrerPolicy="no-referrer"
                />
              </div>

              <div className="w-full md:w-1/2 flex flex-col justify-center text-left">
                <span className="text-xs text-rose-400 font-mono mb-2">{selectedPhoto.date}</span>
                <h3 className="text-2xl font-serif font-bold text-rose-100 mb-3">
                  {selectedPhoto.title}
                </h3>
                <p className="text-sm text-slate-200 leading-relaxed font-serif italic mb-6">
                  "{selectedPhoto.caption}"
                </p>

                <div className="flex items-center gap-3">
                  <button
                    onClick={(e) => toggleFavorite(e, selectedPhoto.id)}
                    className="px-4 py-2 rounded-xl bg-rose-500/20 text-rose-300 border border-rose-500/40 text-xs font-semibold flex items-center gap-2 hover:bg-rose-500 hover:text-white transition-all"
                  >
                    <Heart className="w-4 h-4 fill-rose-500" />
                    <span>Favorite</span>
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};
