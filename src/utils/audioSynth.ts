// Web Audio API ambient vintage music box / piano melody synthesizer
// Gives an emotional, warm, crackling nostalgic musical soundtrack

class VintageAudioEngine {
  private ctx: AudioContext | null = null;
  private isPlaying = false;
  private currentNoteIndex = 0;
  private intervalId: number | null = null;
  private noiseNode: AudioBufferSourceNode | null = null;
  private gainMaster: GainNode | null = null;
  private onStateChangeCb: ((playing: boolean) => void) | null = null;

  // Romantic gentle melody in D minor / F major (intimate, nostalgic, nostalgic Arabic/classical feel)
  private melody: { freq: number; duration: number }[] = [
    { freq: 293.66, duration: 1.8 }, // D4
    { freq: 329.63, duration: 0.9 }, // E4
    { freq: 349.23, duration: 1.8 }, // F4
    { freq: 440.00, duration: 2.2 }, // A4
    { freq: 392.00, duration: 1.2 }, // G4
    { freq: 349.23, duration: 1.8 }, // F4
    { freq: 329.63, duration: 1.8 }, // E4
    { freq: 293.66, duration: 2.5 }, // D4

    { freq: 261.63, duration: 1.5 }, // C4
    { freq: 293.66, duration: 1.2 }, // D4
    { freq: 349.23, duration: 2.0 }, // F4
    { freq: 329.63, duration: 1.5 }, // E4
    { freq: 293.66, duration: 1.5 }, // D4
    { freq: 246.94, duration: 2.0 }, // B3
    { freq: 220.00, duration: 3.0 }, // A3

    { freq: 293.66, duration: 1.8 }, // D4
    { freq: 349.23, duration: 1.8 }, // F4
    { freq: 440.00, duration: 2.0 }, // A4
    { freq: 523.25, duration: 2.5 }, // C5
    { freq: 493.88, duration: 1.5 }, // B4
    { freq: 440.00, duration: 2.0 }, // A4
    { freq: 392.00, duration: 2.0 }, // G4
    { freq: 440.00, duration: 3.5 }, // A4
  ];

  public onStateChange(cb: (playing: boolean) => void) {
    this.onStateChangeCb = cb;
  }

  private initContext() {
    if (!this.ctx) {
      const AudioCtx = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
      this.ctx = new AudioCtx();
      this.gainMaster = this.ctx.createGain();
      this.gainMaster.gain.setValueAtTime(0.35, this.ctx.currentTime);
      this.gainMaster.connect(this.ctx.destination);
    }
    if (this.ctx.state === 'suspended') {
      this.ctx.resume();
    }
  }

  // Play gentle vintage vinyl crackle/hiss
  private startVinylNoise() {
    if (!this.ctx || !this.gainMaster) return;
    try {
      const bufferSize = this.ctx.sampleRate * 2;
      const noiseBuffer = this.ctx.createBuffer(1, bufferSize, this.ctx.sampleRate);
      const output = noiseBuffer.getChannelData(0);
      for (let i = 0; i < bufferSize; i++) {
        const white = Math.random() * 2 - 1;
        // Low pass filter noise to sound like soft vinyl room warmth
        output[i] = white * 0.015;
      }

      this.noiseNode = this.ctx.createBufferSource();
      this.noiseNode.buffer = noiseBuffer;
      this.noiseNode.loop = true;

      const noiseGain = this.ctx.createGain();
      noiseGain.gain.setValueAtTime(0.04, this.ctx.currentTime);

      const filter = this.ctx.createBiquadFilter();
      filter.type = 'lowpass';
      filter.frequency.value = 800;

      this.noiseNode.connect(filter);
      filter.connect(noiseGain);
      noiseGain.connect(this.gainMaster);

      this.noiseNode.start();
    } catch {
      // Ignored if sound blocked
    }
  }

  private playNote(freq: number, duration: number) {
    if (!this.ctx || !this.gainMaster) return;

    const now = this.ctx.currentTime;

    // Harmonic bell/music box oscillator (Fundamental)
    const osc1 = this.ctx.createOscillator();
    const osc2 = this.ctx.createOscillator();
    const gainNote = this.ctx.createGain();

    osc1.type = 'sine';
    osc1.frequency.setValueAtTime(freq, now);

    // Warm sub overtone
    osc2.type = 'triangle';
    osc2.frequency.setValueAtTime(freq * 0.5, now);

    // Filter to warm it up like antique music box
    const filter = this.ctx.createBiquadFilter();
    filter.type = 'lowpass';
    filter.frequency.setValueAtTime(1400, now);
    filter.frequency.exponentialRampToValueAtTime(300, now + duration);

    // Envelope: soft pluck attack, warm slow decay
    gainNote.gain.setValueAtTime(0.0001, now);
    gainNote.gain.linearRampToValueAtTime(0.22, now + 0.06);
    gainNote.gain.exponentialRampToValueAtTime(0.0001, now + duration);

    osc1.connect(filter);
    osc2.connect(filter);
    filter.connect(gainNote);
    gainNote.connect(this.gainMaster);

    osc1.start(now);
    osc2.start(now);
    osc1.stop(now + duration + 0.1);
    osc2.stop(now + duration + 0.1);
  }

  public play() {
    this.initContext();
    if (this.isPlaying) return;
    this.isPlaying = true;
    this.startVinylNoise();
    this.onStateChangeCb?.(true);

    const step = () => {
      if (!this.isPlaying) return;
      const note = this.melody[this.currentNoteIndex];
      this.playNote(note.freq, note.duration);
      this.currentNoteIndex = (this.currentNoteIndex + 1) % this.melody.length;

      const delayMs = note.duration * 750;
      this.intervalId = window.setTimeout(step, delayMs);
    };

    step();
  }

  public pause() {
    this.isPlaying = false;
    if (this.intervalId) {
      clearTimeout(this.intervalId);
      this.intervalId = null;
    }
    if (this.noiseNode) {
      try {
        this.noiseNode.stop();
      } catch {
        // Safe catch
      }
      this.noiseNode = null;
    }
    this.onStateChangeCb?.(false);
  }

  public toggle(): boolean {
    if (this.isPlaying) {
      this.pause();
      return false;
    } else {
      this.play();
      return true;
    }
  }

  public getIsPlaying(): boolean {
    return this.isPlaying;
  }

  public playWaxSealCrack() {
    this.initContext();
    if (!this.ctx || !this.gainMaster) return;

    try {
      const now = this.ctx.currentTime;
      // Realistic wax crack sound using filtered white noise burst & low thump
      const bufferSize = Math.floor(this.ctx.sampleRate * 0.25);
      const buffer = this.ctx.createBuffer(1, bufferSize, this.ctx.sampleRate);
      const data = buffer.getChannelData(0);
      for (let i = 0; i < bufferSize; i++) {
        data[i] = (Math.random() * 2 - 1) * Math.exp(-i / (this.ctx.sampleRate * 0.05));
      }

      const noise = this.ctx.createBufferSource();
      noise.buffer = buffer;

      const filter = this.ctx.createBiquadFilter();
      filter.type = 'bandpass';
      filter.frequency.setValueAtTime(2200, now);
      filter.Q.setValueAtTime(3.0, now);

      const gain = this.ctx.createGain();
      gain.gain.setValueAtTime(0.45, now);
      gain.gain.exponentialRampToValueAtTime(0.001, now + 0.25);

      noise.connect(filter);
      filter.connect(gain);
      gain.connect(this.gainMaster);

      noise.start(now);
    } catch {
      // safe
    }
  }

  public playPaperRustle() {
    this.initContext();
    if (!this.ctx || !this.gainMaster) return;

    try {
      const now = this.ctx.currentTime;
      const bufferSize = Math.floor(this.ctx.sampleRate * 0.5);
      const buffer = this.ctx.createBuffer(1, bufferSize, this.ctx.sampleRate);
      const data = buffer.getChannelData(0);
      for (let i = 0; i < bufferSize; i++) {
        data[i] = (Math.random() * 2 - 1) * Math.sin((i / bufferSize) * Math.PI);
      }

      const noise = this.ctx.createBufferSource();
      noise.buffer = buffer;

      const filter = this.ctx.createBiquadFilter();
      filter.type = 'lowpass';
      filter.frequency.setValueAtTime(900, now);

      const gain = this.ctx.createGain();
      gain.gain.setValueAtTime(0.001, now);
      gain.gain.linearRampToValueAtTime(0.15, now + 0.15);
      gain.gain.exponentialRampToValueAtTime(0.001, now + 0.5);

      noise.connect(filter);
      filter.connect(gain);
      gain.connect(this.gainMaster);

      noise.start(now);
    } catch {
      // safe
    }
  }

  // Soft, intimate ink pen / quill scratching gently on paper
  public playPenWritingSound(durationSeconds: number = 2.2) {
    this.initContext();
    if (!this.ctx || !this.gainMaster) return;

    try {
      const now = this.ctx.currentTime;
      const sampleRate = this.ctx.sampleRate;
      const bufferSize = Math.floor(sampleRate * durationSeconds);
      const buffer = this.ctx.createBuffer(1, bufferSize, sampleRate);
      const data = buffer.getChannelData(0);

      // Generate rhythmic pen strokes (series of gentle friction bursts)
      const strokeFreq = 4.2; // strokes per second
      for (let i = 0; i < bufferSize; i++) {
        const t = i / sampleRate;
        // Stroke rhythm envelope
        const strokeEnv = Math.max(0, Math.sin(t * Math.PI * 2 * strokeFreq));
        const microRoughness = (Math.random() * 2 - 1) * (0.3 + 0.7 * Math.random());
        // Smooth fade in and fade out
        const globalFade = Math.sin((i / bufferSize) * Math.PI);
        data[i] = microRoughness * Math.pow(strokeEnv, 1.8) * globalFade * 0.08;
      }

      const noise = this.ctx.createBufferSource();
      noise.buffer = buffer;

      // Bandpass filter centered around delicate scratch frequencies (3200 Hz)
      const filter = this.ctx.createBiquadFilter();
      filter.type = 'bandpass';
      filter.frequency.setValueAtTime(3200, now);
      filter.Q.setValueAtTime(1.8, now);

      const gain = this.ctx.createGain();
      gain.gain.setValueAtTime(0.0001, now);
      gain.gain.linearRampToValueAtTime(0.09, now + 0.15);
      gain.gain.exponentialRampToValueAtTime(0.0001, now + durationSeconds);

      noise.connect(filter);
      filter.connect(gain);
      gain.connect(this.gainMaster);

      noise.start(now);
    } catch {
      // safe
    }
  }

  public playKeyClick() {
    this.initContext();
    if (!this.ctx || !this.gainMaster) return;

    try {
      const now = this.ctx.currentTime;
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();

      osc.type = 'triangle';
      osc.frequency.setValueAtTime(600, now);
      osc.frequency.exponentialRampToValueAtTime(150, now + 0.05);

      gain.gain.setValueAtTime(0.08, now);
      gain.gain.exponentialRampToValueAtTime(0.001, now + 0.05);

      osc.connect(gain);
      gain.connect(this.gainMaster);

      osc.start(now);
      osc.stop(now + 0.05);
    } catch {
      // safe
    }
  }

  public playUnlockSuccess() {
    this.initContext();
    if (!this.ctx || !this.gainMaster) return;

    try {
      const now = this.ctx.currentTime;
      const notes = [523.25, 659.25, 783.99, 1046.5]; // C5, E5, G5, C6 (warm harp arpeggio)
      notes.forEach((freq, index) => {
        const osc = this.ctx!.createOscillator();
        const gain = this.ctx!.createGain();

        osc.type = 'sine';
        osc.frequency.setValueAtTime(freq, now + index * 0.08);

        gain.gain.setValueAtTime(0.001, now + index * 0.08);
        gain.gain.linearRampToValueAtTime(0.12, now + index * 0.08 + 0.02);
        gain.gain.exponentialRampToValueAtTime(0.0001, now + index * 0.08 + 0.6);

        osc.connect(gain);
        gain.connect(this.gainMaster!);

        osc.start(now + index * 0.08);
        osc.stop(now + index * 0.08 + 0.65);
      });
    } catch {
      // safe
    }
  }

  public playLockError() {
    this.initContext();
    if (!this.ctx || !this.gainMaster) return;

    try {
      const now = this.ctx.currentTime;
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();

      osc.type = 'sawtooth';
      osc.frequency.setValueAtTime(180, now);
      osc.frequency.setValueAtTime(140, now + 0.1);

      gain.gain.setValueAtTime(0.08, now);
      gain.gain.exponentialRampToValueAtTime(0.001, now + 0.25);

      osc.connect(gain);
      gain.connect(this.gainMaster);

      osc.start(now);
      osc.stop(now + 0.25);
    } catch {
      // safe
    }
  }
}

export const vintageAudio = new VintageAudioEngine();
