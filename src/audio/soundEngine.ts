/**
 * Procedural Web Audio Sound Engine for Pike County Zombies
 * Synthesizes all weapon gunfire, zombie groans, environmental audio,
 * and atmospheric Appalachian dark ambient music with zero external audio assets.
 */

class SoundEngine {
  private ctx: AudioContext | null = null;
  private masterGain: GainNode | null = null;
  private sfxGain: GainNode | null = null;
  private musicGain: GainNode | null = null;
  private isMuted: boolean = false;
  private musicPlaying: boolean = false;
  private musicInterval: number | null = null;
  private noiseBuffer: AudioBuffer | null = null;

  constructor() {
    // AudioContext will be initialized on first user interaction
  }

  public init() {
    if (!this.ctx) {
      const AudioCtxClass = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
      this.ctx = new AudioCtxClass();

      this.masterGain = this.ctx.createGain();
      this.masterGain.gain.value = 0.8;
      this.masterGain.connect(this.ctx.destination);

      this.sfxGain = this.ctx.createGain();
      this.sfxGain.gain.value = 0.9;
      this.sfxGain.connect(this.masterGain);

      this.musicGain = this.ctx.createGain();
      this.musicGain.gain.value = 0.35;
      this.musicGain.connect(this.masterGain);

      this.generateNoiseBuffer();
    }

    if (this.ctx.state === 'suspended') {
      this.ctx.resume();
    }
  }

  public resume() {
    this.init();
    if (this.ctx?.state === 'suspended') {
      void this.ctx.resume();
    }
  }

  private generateNoiseBuffer() {
    if (!this.ctx) return;
    const bufferSize = this.ctx.sampleRate * 2;
    this.noiseBuffer = this.ctx.createBuffer(1, bufferSize, this.ctx.sampleRate);
    const output = this.noiseBuffer.getChannelData(0);
    for (let i = 0; i < bufferSize; i++) {
      output[i] = Math.random() * 2 - 1;
    }
  }

  public toggleMute(): boolean {
    this.isMuted = !this.isMuted;
    if (this.masterGain && this.ctx) {
      this.masterGain.gain.setValueAtTime(this.isMuted ? 0 : 0.8, this.ctx.currentTime);
    }
    return this.isMuted;
  }

  public getMuted(): boolean {
    return this.isMuted;
  }

  // --- WEAPON SOUND EFFECTS ---

  public playGunshot(type: 'magnum' | 'shotgun' | 'rifle' | 'carbine' | 'crossbow' | 'chainsaw' | 'molotov') {
    if (this.isMuted) return;
    this.init();
    if (!this.ctx || !this.sfxGain || !this.noiseBuffer) return;

    const t = this.ctx.currentTime;

    switch (type) {
      case 'shotgun': {
        // Heavy bass punch + wide noise blast + mechanical rack
        const osc = this.ctx.createOscillator();
        const oscGain = this.ctx.createGain();
        osc.type = 'triangle';
        osc.frequency.setValueAtTime(140, t);
        osc.frequency.exponentialRampToValueAtTime(30, t + 0.25);
        oscGain.gain.setValueAtTime(1.0, t);
        oscGain.gain.exponentialRampToValueAtTime(0.001, t + 0.35);
        osc.connect(oscGain);
        oscGain.connect(this.sfxGain);
        osc.start(t);
        osc.stop(t + 0.35);

        // Noise body
        const noise = this.ctx.createBufferSource();
        noise.buffer = this.noiseBuffer;
        const filter = this.ctx.createBiquadFilter();
        filter.type = 'lowpass';
        filter.frequency.setValueAtTime(1800, t);
        filter.frequency.exponentialRampToValueAtTime(300, t + 0.4);
        const noiseGain = this.ctx.createGain();
        noiseGain.gain.setValueAtTime(0.9, t);
        noiseGain.gain.exponentialRampToValueAtTime(0.001, t + 0.45);
        noise.connect(filter);
        filter.connect(noiseGain);
        noiseGain.connect(this.sfxGain);
        noise.start(t);
        noise.stop(t + 0.45);

        // Mechanical pump sound after 0.25s
        setTimeout(() => {
          this.playClick(0.3, 800);
          setTimeout(() => this.playClick(0.25, 1200), 80);
        }, 220);
        break;
      }

      case 'rifle': {
        // High-velocity crack + mountain echo
        const osc = this.ctx.createOscillator();
        const oscGain = this.ctx.createGain();
        osc.type = 'sawtooth';
        osc.frequency.setValueAtTime(240, t);
        osc.frequency.exponentialRampToValueAtTime(50, t + 0.2);
        oscGain.gain.setValueAtTime(0.8, t);
        oscGain.gain.exponentialRampToValueAtTime(0.001, t + 0.28);
        osc.connect(oscGain);
        oscGain.connect(this.sfxGain);
        osc.start(t);
        osc.stop(t + 0.28);

        const noise = this.ctx.createBufferSource();
        noise.buffer = this.noiseBuffer;
        const filter = this.ctx.createBiquadFilter();
        filter.type = 'bandpass';
        filter.frequency.setValueAtTime(2800, t);
        filter.Q.setValueAtTime(2, t);
        const noiseGain = this.ctx.createGain();
        noiseGain.gain.setValueAtTime(0.85, t);
        noiseGain.gain.exponentialRampToValueAtTime(0.001, t + 0.35);
        noise.connect(filter);
        filter.connect(noiseGain);
        noiseGain.connect(this.sfxGain);
        noise.start(t);
        noise.stop(t + 0.35);
        break;
      }

      case 'magnum': {
        // Punchy revolver thud
        const osc = this.ctx.createOscillator();
        const oscGain = this.ctx.createGain();
        osc.type = 'sine';
        osc.frequency.setValueAtTime(180, t);
        osc.frequency.exponentialRampToValueAtTime(40, t + 0.22);
        oscGain.gain.setValueAtTime(0.9, t);
        oscGain.gain.exponentialRampToValueAtTime(0.001, t + 0.28);
        osc.connect(oscGain);
        oscGain.connect(this.sfxGain);
        osc.start(t);
        osc.stop(t + 0.28);

        const noise = this.ctx.createBufferSource();
        noise.buffer = this.noiseBuffer;
        const filter = this.ctx.createBiquadFilter();
        filter.type = 'lowpass';
        filter.frequency.setValueAtTime(2200, t);
        const noiseGain = this.ctx.createGain();
        noiseGain.gain.setValueAtTime(0.7, t);
        noiseGain.gain.exponentialRampToValueAtTime(0.001, t + 0.25);
        noise.connect(filter);
        filter.connect(noiseGain);
        noiseGain.connect(this.sfxGain);
        noise.start(t);
        noise.stop(t + 0.25);
        break;
      }

      case 'carbine': {
        // Rapid snap
        const osc = this.ctx.createOscillator();
        const oscGain = this.ctx.createGain();
        osc.type = 'triangle';
        osc.frequency.setValueAtTime(190, t);
        osc.frequency.exponentialRampToValueAtTime(60, t + 0.08);
        oscGain.gain.setValueAtTime(0.65, t);
        oscGain.gain.exponentialRampToValueAtTime(0.001, t + 0.12);
        osc.connect(oscGain);
        oscGain.connect(this.sfxGain);
        osc.start(t);
        osc.stop(t + 0.12);

        const noise = this.ctx.createBufferSource();
        noise.buffer = this.noiseBuffer;
        const filter = this.ctx.createBiquadFilter();
        filter.type = 'bandpass';
        filter.frequency.setValueAtTime(2200, t);
        const noiseGain = this.ctx.createGain();
        noiseGain.gain.setValueAtTime(0.6, t);
        noiseGain.gain.exponentialRampToValueAtTime(0.001, t + 0.14);
        noise.connect(filter);
        filter.connect(noiseGain);
        noiseGain.connect(this.sfxGain);
        noise.start(t);
        noise.stop(t + 0.14);
        break;
      }

      case 'crossbow': {
        // String twang and whoosh
        const osc = this.ctx.createOscillator();
        const oscGain = this.ctx.createGain();
        osc.type = 'triangle';
        osc.frequency.setValueAtTime(380, t);
        osc.frequency.exponentialRampToValueAtTime(110, t + 0.18);
        oscGain.gain.setValueAtTime(0.7, t);
        oscGain.gain.exponentialRampToValueAtTime(0.001, t + 0.2);
        osc.connect(oscGain);
        oscGain.connect(this.sfxGain);
        osc.start(t);
        osc.stop(t + 0.2);
        break;
      }

      case 'chainsaw': {
        // Throaty motor rip
        const osc = this.ctx.createOscillator();
        const oscGain = this.ctx.createGain();
        osc.type = 'sawtooth';
        osc.frequency.setValueAtTime(110 + Math.random() * 20, t);
        osc.frequency.linearRampToValueAtTime(160 + Math.random() * 30, t + 0.15);
        oscGain.gain.setValueAtTime(0.5, t);
        oscGain.gain.exponentialRampToValueAtTime(0.001, t + 0.2);
        osc.connect(oscGain);
        oscGain.connect(this.sfxGain);
        osc.start(t);
        osc.stop(t + 0.2);
        break;
      }

      case 'molotov': {
        // Bottle throw whoosh and glass shatter
        this.playBottleShatter();
        break;
      }
    }
  }

  public playBottleShatter() {
    if (this.isMuted) return;
    this.init();
    if (!this.ctx || !this.sfxGain || !this.noiseBuffer) return;
    const t = this.ctx.currentTime;

    // High pitch clink
    for (let i = 0; i < 3; i++) {
      const osc = this.ctx.createOscillator();
      const oscGain = this.ctx.createGain();
      osc.type = 'sine';
      osc.frequency.setValueAtTime(1800 + i * 900 + Math.random() * 400, t + i * 0.03);
      oscGain.gain.setValueAtTime(0.4, t + i * 0.03);
      oscGain.gain.exponentialRampToValueAtTime(0.001, t + 0.15 + i * 0.03);
      osc.connect(oscGain);
      oscGain.connect(this.sfxGain);
      osc.start(t + i * 0.03);
      osc.stop(t + 0.2 + i * 0.03);
    }

    // Fire whoosh
    const noise = this.ctx.createBufferSource();
    noise.buffer = this.noiseBuffer;
    const filter = this.ctx.createBiquadFilter();
    filter.type = 'lowpass';
    filter.frequency.setValueAtTime(800, t);
    const noiseGain = this.ctx.createGain();
    noiseGain.gain.setValueAtTime(0.7, t);
    noiseGain.gain.exponentialRampToValueAtTime(0.001, t + 0.8);
    noise.connect(filter);
    filter.connect(noiseGain);
    noiseGain.connect(this.sfxGain);
    noise.start(t);
    noise.stop(t + 0.8);
  }

  public playZombieHit(isHeadshot: boolean = false) {
    if (this.isMuted) return;
    this.init();
    if (!this.ctx || !this.sfxGain) return;
    const t = this.ctx.currentTime;

    // Meat impact crunch
    const osc = this.ctx.createOscillator();
    const oscGain = this.ctx.createGain();
    osc.type = 'square';
    osc.frequency.setValueAtTime(isHeadshot ? 280 : 160, t);
    osc.frequency.exponentialRampToValueAtTime(40, t + (isHeadshot ? 0.15 : 0.08));
    oscGain.gain.setValueAtTime(isHeadshot ? 0.6 : 0.35, t);
    oscGain.gain.exponentialRampToValueAtTime(0.001, t + (isHeadshot ? 0.18 : 0.1));
    osc.connect(oscGain);
    oscGain.connect(this.sfxGain);
    osc.start(t);
    osc.stop(t + 0.2);

    if (isHeadshot) {
      // High ding satisfaction
      const bell = this.ctx.createOscillator();
      const bellGain = this.ctx.createGain();
      bell.type = 'sine';
      bell.frequency.setValueAtTime(1400, t);
      bellGain.gain.setValueAtTime(0.4, t);
      bellGain.gain.exponentialRampToValueAtTime(0.001, t + 0.25);
      bell.connect(bellGain);
      bellGain.connect(this.sfxGain);
      bell.start(t);
      bell.stop(t + 0.25);
    }
  }

  public playZombieGroan(type: 'shambler' | 'sprinter' | 'miner_brute' | 'bloater_spitter' | 'behemoth') {
    if (this.isMuted) return;
    this.init();
    if (!this.ctx || !this.sfxGain) return;
    const t = this.ctx.currentTime;

    const osc = this.ctx.createOscillator();
    const filter = this.ctx.createBiquadFilter();
    const gain = this.ctx.createGain();

    if (type === 'sprinter') {
      // High pitch feral screech
      osc.type = 'sawtooth';
      osc.frequency.setValueAtTime(450, t);
      osc.frequency.linearRampToValueAtTime(320, t + 0.35);
      filter.type = 'bandpass';
      filter.frequency.setValueAtTime(900, t);
      gain.gain.setValueAtTime(0.3, t);
      gain.gain.exponentialRampToValueAtTime(0.001, t + 0.4);
      osc.connect(filter);
      filter.connect(gain);
      gain.connect(this.sfxGain);
      osc.start(t);
      osc.stop(t + 0.4);
    } else if (type === 'bloater_spitter') {
      // Gurgling wet sound
      osc.type = 'sine';
      osc.frequency.setValueAtTime(160, t);
      osc.frequency.linearRampToValueAtTime(240, t + 0.25);
      filter.type = 'lowpass';
      filter.frequency.setValueAtTime(500, t);
      gain.gain.setValueAtTime(0.35, t);
      gain.gain.exponentialRampToValueAtTime(0.001, t + 0.4);
      osc.connect(filter);
      filter.connect(gain);
      gain.connect(this.sfxGain);
      osc.start(t);
      osc.stop(t + 0.4);
    } else if (type === 'behemoth') {
      // Sub-bass monstrous roar
      osc.type = 'sawtooth';
      osc.frequency.setValueAtTime(75, t);
      osc.frequency.linearRampToValueAtTime(45, t + 0.8);
      filter.type = 'lowpass';
      filter.frequency.setValueAtTime(350, t);
      gain.gain.setValueAtTime(0.7, t);
      gain.gain.exponentialRampToValueAtTime(0.001, t + 0.9);
      osc.connect(filter);
      filter.connect(gain);
      gain.connect(this.sfxGain);
      osc.start(t);
      osc.stop(t + 0.9);
    } else {
      // Standard deep guttural moan
      osc.type = 'sawtooth';
      osc.frequency.setValueAtTime(type === 'miner_brute' ? 85 : 120, t);
      osc.frequency.linearRampToValueAtTime(type === 'miner_brute' ? 65 : 95, t + 0.45);
      filter.type = 'bandpass';
      filter.frequency.setValueAtTime(type === 'miner_brute' ? 300 : 450, t);
      gain.gain.setValueAtTime(0.25, t);
      gain.gain.exponentialRampToValueAtTime(0.001, t + 0.5);
      osc.connect(filter);
      filter.connect(gain);
      gain.connect(this.sfxGain);
      osc.start(t);
      osc.stop(t + 0.5);
    }
  }

  public playReload() {
    if (this.isMuted) return;
    this.init();
    this.playClick(0.35, 900);
    setTimeout(() => this.playClick(0.4, 600), 200);
    setTimeout(() => this.playClick(0.45, 1100), 450);
  }

  public playPickup() {
    if (this.isMuted) return;
    this.init();
    if (!this.ctx || !this.sfxGain) return;
    const t = this.ctx.currentTime;
    const osc = this.ctx.createOscillator();
    const gain = this.ctx.createGain();
    osc.type = 'sine';
    osc.frequency.setValueAtTime(520, t);
    osc.frequency.exponentialRampToValueAtTime(1040, t + 0.12);
    gain.gain.setValueAtTime(0.3, t);
    gain.gain.exponentialRampToValueAtTime(0.001, t + 0.15);
    osc.connect(gain);
    gain.connect(this.sfxGain);
    osc.start(t);
    osc.stop(t + 0.15);
  }

  public playPowerup() {
    if (this.isMuted) return;
    this.init();
    if (!this.ctx || !this.sfxGain) return;
    const t = this.ctx.currentTime;

    // Harmonious triumphant chime chord (C - E - G - C)
    const freqs = [523.25, 659.25, 783.99, 1046.5];
    freqs.forEach((freq, idx) => {
      if (!this.ctx || !this.sfxGain) return;
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();
      osc.type = 'triangle';
      osc.frequency.setValueAtTime(freq, t + idx * 0.06);
      gain.gain.setValueAtTime(0.25, t + idx * 0.06);
      gain.gain.exponentialRampToValueAtTime(0.001, t + idx * 0.06 + 0.4);
      osc.connect(gain);
      gain.connect(this.sfxGain);
      osc.start(t + idx * 0.06);
      osc.stop(t + idx * 0.06 + 0.45);
    });
  }

  public playLoreNote() {
    if (this.isMuted) return;
    this.init();
    if (!this.ctx || !this.sfxGain) return;
    const t = this.ctx.currentTime;

    // Rustling paper crinkle followed by an eerie harmonic resonance
    const osc = this.ctx.createOscillator();
    const gain = this.ctx.createGain();
    osc.type = 'sine';
    osc.frequency.setValueAtTime(330, t); // E4
    osc.frequency.exponentialRampToValueAtTime(440, t + 0.25); // A4
    gain.gain.setValueAtTime(0.3, t);
    gain.gain.exponentialRampToValueAtTime(0.001, t + 0.5);
    osc.connect(gain);
    gain.connect(this.sfxGain);
    osc.start(t);
    osc.stop(t + 0.5);

    // Subtle paper shuffle
    this.playClick(0.35, 1200);
    setTimeout(() => this.playClick(0.25, 850), 60);
  }

  public playBarrelExplosion() {
    if (this.isMuted) return;
    this.init();
    if (!this.ctx || !this.sfxGain || !this.noiseBuffer) return;
    const t = this.ctx.currentTime;

    // Heavy low punch
    const osc = this.ctx.createOscillator();
    const oscGain = this.ctx.createGain();
    osc.type = 'sawtooth';
    osc.frequency.setValueAtTime(140, t);
    osc.frequency.exponentialRampToValueAtTime(25, t + 0.5);
    oscGain.gain.setValueAtTime(0.9, t);
    oscGain.gain.exponentialRampToValueAtTime(0.001, t + 0.6);
    osc.connect(oscGain);
    oscGain.connect(this.sfxGain);
    osc.start(t);
    osc.stop(t + 0.6);

    // Roaring noise explosion blast
    const noise = this.ctx.createBufferSource();
    noise.buffer = this.noiseBuffer;
    const filter = this.ctx.createBiquadFilter();
    filter.type = 'lowpass';
    filter.frequency.setValueAtTime(1200, t);
    filter.frequency.exponentialRampToValueAtTime(120, t + 0.8);
    const noiseGain = this.ctx.createGain();
    noiseGain.gain.setValueAtTime(0.95, t);
    noiseGain.gain.exponentialRampToValueAtTime(0.001, t + 0.9);
    noise.connect(filter);
    filter.connect(noiseGain);
    noiseGain.connect(this.sfxGain);
    noise.start(t);
    noise.stop(t + 0.9);
  }

  public playNuke() {
    if (this.isMuted) return;
    this.init();
    if (!this.ctx || !this.sfxGain || !this.noiseBuffer) return;
    const t = this.ctx.currentTime;

    // Ultra deep rumble
    const osc = this.ctx.createOscillator();
    const oscGain = this.ctx.createGain();
    osc.type = 'sawtooth';
    osc.frequency.setValueAtTime(80, t);
    osc.frequency.exponentialRampToValueAtTime(18, t + 1.2);
    oscGain.gain.setValueAtTime(1.0, t);
    oscGain.gain.exponentialRampToValueAtTime(0.001, t + 1.4);
    osc.connect(oscGain);
    oscGain.connect(this.sfxGain);
    osc.start(t);
    osc.stop(t + 1.4);

    // Huge shockwave white noise
    const noise = this.ctx.createBufferSource();
    noise.buffer = this.noiseBuffer;
    const filter = this.ctx.createBiquadFilter();
    filter.type = 'lowpass';
    filter.frequency.setValueAtTime(2500, t);
    filter.frequency.exponentialRampToValueAtTime(200, t + 1.5);
    const noiseGain = this.ctx.createGain();
    noiseGain.gain.setValueAtTime(0.9, t);
    noiseGain.gain.exponentialRampToValueAtTime(0.001, t + 1.6);
    noise.connect(filter);
    filter.connect(noiseGain);
    noiseGain.connect(this.sfxGain);
    noise.start(t);
    noise.stop(t + 1.6);
  }

  public playPlayerHurt() {
    if (this.isMuted) return;
    this.init();
    if (!this.ctx || !this.sfxGain) return;
    const t = this.ctx.currentTime;
    const osc = this.ctx.createOscillator();
    const gain = this.ctx.createGain();
    osc.type = 'triangle';
    osc.frequency.setValueAtTime(130, t);
    osc.frequency.exponentialRampToValueAtTime(45, t + 0.2);
    gain.gain.setValueAtTime(0.6, t);
    gain.gain.exponentialRampToValueAtTime(0.001, t + 0.25);
    osc.connect(gain);
    gain.connect(this.sfxGain);
    osc.start(t);
    osc.stop(t + 0.25);
  }

  public playDodge() {
    if (this.isMuted) return;
    this.init();
    if (!this.ctx || !this.sfxGain) return;
    const t = this.ctx.currentTime;
    const osc = this.ctx.createOscillator();
    const gain = this.ctx.createGain();
    osc.type = "sine";
    osc.frequency.setValueAtTime(220, t);
    osc.frequency.exponentialRampToValueAtTime(90, t + 0.16);
    gain.gain.setValueAtTime(0.28, t);
    gain.gain.exponentialRampToValueAtTime(0.001, t + 0.18);
    osc.connect(gain);
    gain.connect(this.sfxGain);
    osc.start(t);
    osc.stop(t + 0.18);
  }

  public playBash() {
    if (this.isMuted) return;
    this.init();
    if (!this.ctx || !this.sfxGain) return;
    const t = this.ctx.currentTime;
    const osc = this.ctx.createOscillator();
    const gain = this.ctx.createGain();
    osc.type = "square";
    osc.frequency.setValueAtTime(90, t);
    osc.frequency.exponentialRampToValueAtTime(40, t + 0.12);
    gain.gain.setValueAtTime(0.35, t);
    gain.gain.exponentialRampToValueAtTime(0.001, t + 0.14);
    osc.connect(gain);
    gain.connect(this.sfxGain);
    osc.start(t);
    osc.stop(t + 0.14);
  }

  public playWaveHorn() {
    if (this.isMuted) return;
    this.init();
    if (!this.ctx || !this.sfxGain) return;
    const t = this.ctx.currentTime;
    const osc1 = this.ctx.createOscillator();
    const osc2 = this.ctx.createOscillator();
    const gain = this.ctx.createGain();
    osc1.type = 'sawtooth';
    osc2.type = 'triangle';
    osc1.frequency.setValueAtTime(110, t);
    osc2.frequency.setValueAtTime(165, t);
    gain.gain.setValueAtTime(0.5, t);
    gain.gain.exponentialRampToValueAtTime(0.001, t + 1.2);
    osc1.connect(gain);
    osc2.connect(gain);
    gain.connect(this.sfxGain);
    osc1.start(t);
    osc2.start(t);
    osc1.stop(t + 1.2);
    osc2.stop(t + 1.2);
  }

  public playBell() {
    if (this.isMuted) return;
    this.init();
    if (!this.ctx || !this.sfxGain) return;
    const t = this.ctx.currentTime;
    for (const [freq, delay, vol] of [
      [220, 0, 0.7],
      [330, 0.05, 0.45],
      [165, 0.8, 0.4],
      [110, 1.6, 0.25],
    ] as const) {
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();
      osc.type = "sine";
      osc.frequency.setValueAtTime(freq, t + delay);
      gain.gain.setValueAtTime(vol, t + delay);
      gain.gain.exponentialRampToValueAtTime(0.001, t + delay + 2.2);
      osc.connect(gain);
      gain.connect(this.sfxGain);
      osc.start(t + delay);
      osc.stop(t + delay + 2.3);
    }
  }

  public playLantern() {
    if (this.isMuted) return;
    this.init();
    if (!this.ctx || !this.sfxGain) return;
    const t = this.ctx.currentTime;
    const osc = this.ctx.createOscillator();
    const gain = this.ctx.createGain();
    osc.type = "sine";
    osc.frequency.setValueAtTime(480, t);
    osc.frequency.exponentialRampToValueAtTime(240, t + 0.2);
    gain.gain.setValueAtTime(0.35, t);
    gain.gain.exponentialRampToValueAtTime(0.001, t + 0.35);
    osc.connect(gain);
    gain.connect(this.sfxGain);
    osc.start(t);
    osc.stop(t + 0.35);
  }

  public playSnuff() {
    if (this.isMuted) return;
    this.init();
    if (!this.ctx || !this.sfxGain || !this.noiseBuffer) return;
    const t = this.ctx.currentTime;
    const noise = this.ctx.createBufferSource();
    noise.buffer = this.noiseBuffer;
    const filter = this.ctx.createBiquadFilter();
    filter.type = "lowpass";
    filter.frequency.setValueAtTime(900, t);
    const gain = this.ctx.createGain();
    gain.gain.setValueAtTime(0.4, t);
    gain.gain.exponentialRampToValueAtTime(0.001, t + 0.4);
    noise.connect(filter);
    filter.connect(gain);
    gain.connect(this.sfxGain);
    noise.start(t);
    noise.stop(t + 0.4);
  }

  public playBoard() {
    if (this.isMuted) return;
    this.init();
    if (!this.ctx || !this.sfxGain) return;
    const t = this.ctx.currentTime;
    const osc = this.ctx.createOscillator();
    const gain = this.ctx.createGain();
    osc.type = "triangle";
    osc.frequency.setValueAtTime(180, t);
    osc.frequency.exponentialRampToValueAtTime(90, t + 0.12);
    gain.gain.setValueAtTime(0.45, t);
    gain.gain.exponentialRampToValueAtTime(0.001, t + 0.18);
    osc.connect(gain);
    gain.connect(this.sfxGain);
    osc.start(t);
    osc.stop(t + 0.18);
  }

  public playBoardBreak() {
    this.playSnuff();
  }

  private playClick(volume: number, freq: number) {
    if (!this.ctx || !this.sfxGain) return;
    const t = this.ctx.currentTime;
    const osc = this.ctx.createOscillator();
    const gain = this.ctx.createGain();
    osc.type = 'sine';
    osc.frequency.setValueAtTime(freq, t);
    gain.gain.setValueAtTime(volume, t);
    gain.gain.exponentialRampToValueAtTime(0.001, t + 0.05);
    osc.connect(gain);
    gain.connect(this.sfxGain);
    osc.start(t);
    osc.stop(t + 0.05);
  }

  // --- County night atmospheric bed ---
  // Pentatonic minor banjo plucks & haunting low mountain drone

  public startAtmosphericMusic() {
    if (this.musicPlaying) return;
    this.init();
    this.musicPlaying = true;

    // Pluck notes (D minor pentatonic: D3, F3, G3, A3, C4, D4)
    const banjoNotes = [146.83, 174.61, 196.00, 220.00, 261.63, 293.66];
    let noteIdx = 0;

    // Start background eerie drone
    this.playDroneNote();

    this.musicInterval = window.setInterval(() => {
      if (!this.musicPlaying || this.isMuted || !this.ctx || !this.musicGain) return;

      // Occasional rustic banjo pluck
      if (Math.random() > 0.35) {
        const note = banjoNotes[noteIdx % banjoNotes.length];
        noteIdx = (noteIdx + Math.floor(Math.random() * 3) + 1) % banjoNotes.length;
        this.playBanjoPluck(note);
      }
    }, 450);
  }

  private playDroneNote() {
    if (!this.ctx || !this.musicGain) return;
    const t = this.ctx.currentTime;
    const drone = this.ctx.createOscillator();
    const filter = this.ctx.createBiquadFilter();
    const gain = this.ctx.createGain();

    drone.type = 'sawtooth';
    drone.frequency.setValueAtTime(55, t); // A1 low drone

    filter.type = 'lowpass';
    filter.frequency.setValueAtTime(140, t);

    gain.gain.setValueAtTime(0.12, t);

    drone.connect(filter);
    filter.connect(gain);
    gain.connect(this.musicGain);

    drone.start(t);
  }

  private playBanjoPluck(freq: number) {
    if (!this.ctx || !this.musicGain) return;
    const t = this.ctx.currentTime;

    // Plucked string with fast decay and metallic harmonic
    const osc = this.ctx.createOscillator();
    const harmonic = this.ctx.createOscillator();
    const gain = this.ctx.createGain();

    osc.type = 'triangle';
    osc.frequency.setValueAtTime(freq, t);

    harmonic.type = 'sawtooth';
    harmonic.frequency.setValueAtTime(freq * 2, t);

    gain.gain.setValueAtTime(0.18, t);
    gain.gain.exponentialRampToValueAtTime(0.0001, t + 0.65);

    osc.connect(gain);
    harmonic.connect(gain);
    gain.connect(this.musicGain);

    osc.start(t);
    harmonic.start(t);
    osc.stop(t + 0.7);
    harmonic.stop(t + 0.7);
  }

  public stopAtmosphericMusic() {
    this.musicPlaying = false;
    if (this.musicInterval) {
      clearInterval(this.musicInterval);
      this.musicInterval = null;
    }
  }
}

export const soundEngine = new SoundEngine();
