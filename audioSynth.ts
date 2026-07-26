/**
 * Web Audio API procedural synthesizer for serene romantic ambient music & sound FX.
 */

class RomanticAudioSynth {
  private ctx: AudioContext | null = null;
  private masterGain: GainNode | null = null;
  private analyser: AnalyserNode | null = null;
  private isPlaying: boolean = false;
  private timerId: number | null = null;
  private activeOscillators: OscillatorNode[] = [];
  private currentTrackIndex: number = 0;

  public tracks = [
    { name: 'Soft Piano Lullaby', speed: 1.2, key: 'C_major' },
    { name: 'Moonlight Romance', speed: 0.9, key: 'A_minor' },
    { name: 'Celestial Serenade', speed: 1.5, key: 'F_major' },
    { name: 'Rain & Gentle Keys', speed: 1.0, key: 'G_major' },
  ];

  private initContext() {
    if (!this.ctx) {
      const AudioCtx = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
      this.ctx = new AudioCtx();
      this.masterGain = this.ctx.createGain();
      this.masterGain.gain.value = 0.25;

      this.analyser = this.ctx.createAnalyser();
      this.analyser.fftSize = 32;

      this.masterGain.connect(this.analyser);
      this.analyser.connect(this.ctx.destination);
    }

    if (this.ctx.state === 'suspended') {
      this.ctx.resume();
    }
  }

  public playNote(freq: number, duration: number = 2.0, type: OscillatorType = 'sine', volume: number = 0.2) {
    if (!this.ctx || !this.masterGain) return;

    try {
      const osc = this.ctx.createOscillator();
      const noteGain = this.ctx.createGain();

      osc.type = type;
      osc.frequency.setValueAtTime(freq, this.ctx.currentTime);

      // Envelope
      const now = this.ctx.currentTime;
      noteGain.gain.setValueAtTime(0, now);
      noteGain.gain.linearRampToValueAtTime(volume, now + 0.15);
      noteGain.gain.exponentialRampToValueAtTime(0.0001, now + duration);

      osc.connect(noteGain);
      noteGain.connect(this.masterGain);

      osc.start(now);
      osc.stop(now + duration);

      this.activeOscillators.push(osc);
      setTimeout(() => {
        const idx = this.activeOscillators.indexOf(osc);
        if (idx > -1) this.activeOscillators.splice(idx, 1);
      }, duration * 1000);
    } catch {
      // Audio fallback
    }
  }

  // Play romantic chime effect
  public playHeartChime() {
    this.initContext();
    if (!this.ctx) return;
    const notes = [523.25, 659.25, 783.99, 1046.5]; // C5, E5, G5, C6
    notes.forEach((freq, idx) => {
      setTimeout(() => {
        this.playNote(freq, 0.8, 'sine', 0.15);
      }, idx * 80);
    });
  }

  // Play playful dodge pop sound when No button dodges
  public playDodgeSound() {
    this.initContext();
    if (!this.ctx) return;
    const now = this.ctx.currentTime;
    const osc = this.ctx.createOscillator();
    const gain = this.ctx.createGain();

    osc.type = 'triangle';
    osc.frequency.setValueAtTime(300, now);
    osc.frequency.exponentialRampToValueAtTime(600, now + 0.12);

    gain.gain.setValueAtTime(0.15, now);
    gain.gain.exponentialRampToValueAtTime(0.001, now + 0.12);

    osc.connect(gain);
    if (this.masterGain) gain.connect(this.masterGain);

    osc.start(now);
    osc.stop(now + 0.12);
  }

  // Play celebration fanfare
  public playCelebrateSound() {
    this.initContext();
    if (!this.ctx) return;
    const fanfare = [523.25, 659.25, 783.99, 1046.5, 1318.51];
    fanfare.forEach((freq, i) => {
      setTimeout(() => {
        this.playNote(freq, 1.2, 'triangle', 0.2);
      }, i * 120);
    });
  }

  public startBackgroundMusic() {
    this.initContext();
    if (this.isPlaying) return;
    this.isPlaying = true;

    // Peaceful romantic chord notes (frequencies in Hz)
    // C Major / A Minor romantic scales
    const chordScales = [
      [261.63, 329.63, 392.0, 523.25],  // C maj
      [220.0, 261.63, 329.63, 440.0],   // Am
      [174.61, 220.0, 261.63, 349.23],  // F maj
      [196.0, 246.94, 293.66, 392.0],   // G maj
    ];

    let chordIdx = 0;
    let step = 0;

    const playNextBar = () => {
      if (!this.isPlaying) return;

      const currentChord = chordScales[chordIdx % chordScales.length];
      const noteFreq = currentChord[step % currentChord.length];

      // Arpeggio
      this.playNote(noteFreq, 2.5, 'sine', 0.18);

      // Ocassional upper octave harmony note
      if (step % 2 === 0) {
        this.playNote(noteFreq * 2, 1.8, 'sine', 0.08);
      }

      step++;
      if (step % 4 === 0) {
        chordIdx++;
      }

      const delay = 1000 * (1.2 / this.tracks[this.currentTrackIndex].speed);
      this.timerId = window.setTimeout(playNextBar, delay);
    };

    playNextBar();
  }

  public stopBackgroundMusic() {
    this.isPlaying = false;
    if (this.timerId) {
      clearTimeout(this.timerId);
      this.timerId = null;
    }
  }

  public setVolume(val: number) { // val between 0 and 1
    if (this.masterGain) {
      this.masterGain.gain.setValueAtTime(val, this.ctx?.currentTime || 0);
    }
  }

  public getIsPlaying(): boolean {
    return this.isPlaying;
  }

  public setTrack(index: number) {
    this.currentTrackIndex = index % this.tracks.length;
    if (this.isPlaying) {
      this.stopBackgroundMusic();
      this.startBackgroundMusic();
    }
  }

  public getCurrentTrack() {
    return this.tracks[this.currentTrackIndex];
  }

  public getFrequencyData(): Uint8Array {
    if (!this.analyser) return new Uint8Array(16);
    const data = new Uint8Array(this.analyser.frequencyBinCount);
    this.analyser.getByteFrequencyData(data);
    return data;
  }
}

export const audioSynth = new RomanticAudioSynth();
