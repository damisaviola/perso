class GameAudioSynthesizer {
  private ctx: AudioContext | null = null;
  private isMuted: boolean = false;
  private volume: number = 0.6;
  private bgmInterval: number | null = null;
  private isBgmPlaying: boolean = false;

  constructor() {
    if (typeof window !== "undefined") {
      const saved = localStorage.getItem("developer_world_muted");
      this.isMuted = saved === "true";
    }
  }

  private initCtx(): AudioContext | null {
    if (typeof window === "undefined") return null;
    if (!this.ctx) {
      const AudioCtx = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
      if (AudioCtx) {
        this.ctx = new AudioCtx();
      }
    }
    if (this.ctx && this.ctx.state === "suspended") {
      this.ctx.resume().catch(() => {});
    }
    return this.ctx;
  }

  public setMuted(muted: boolean) {
    this.isMuted = muted;
    if (typeof window !== "undefined") {
      localStorage.setItem("developer_world_muted", muted.toString());
    }
    if (muted && this.isBgmPlaying) {
      this.stopBgm();
    }
  }

  public getMuted(): boolean {
    return this.isMuted;
  }

  public setVolume(vol: number) {
    this.volume = Math.max(0, Math.min(1, vol));
  }

  public playFootstep() {
    if (this.isMuted) return;
    try {
      const ctx = this.initCtx();
      if (!ctx) return;
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();

      osc.type = "triangle";
      osc.frequency.setValueAtTime(110 + Math.random() * 30, ctx.currentTime);

      const v = this.volume * 0.04;
      gain.gain.setValueAtTime(v, ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.0001, ctx.currentTime + 0.04);

      osc.connect(gain);
      gain.connect(ctx.destination);
      osc.start();
      osc.stop(ctx.currentTime + 0.04);
    } catch {}
  }

  public playInteract() {
    if (this.isMuted) return;
    try {
      const ctx = this.initCtx();
      if (!ctx) return;
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();

      osc.type = "sine";
      osc.frequency.setValueAtTime(523.25, ctx.currentTime); // C5
      osc.frequency.exponentialRampToValueAtTime(783.99, ctx.currentTime + 0.08); // G5

      const v = this.volume * 0.12;
      gain.gain.setValueAtTime(v, ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.12);

      osc.connect(gain);
      gain.connect(ctx.destination);
      osc.start();
      osc.stop(ctx.currentTime + 0.12);
    } catch {}
  }

  public playCrystalPickup() {
    if (this.isMuted) return;
    try {
      const ctx = this.initCtx();
      if (!ctx) return;
      const notes = [659.25, 783.99, 987.77, 1318.51]; // E5, G5, B5, E6
      notes.forEach((freq, i) => {
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();
        osc.type = "sine";
        osc.frequency.setValueAtTime(freq, ctx.currentTime + i * 0.06);

        const v = this.volume * 0.14;
        gain.gain.setValueAtTime(v, ctx.currentTime + i * 0.06);
        gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + i * 0.06 + 0.2);

        osc.connect(gain);
        gain.connect(ctx.destination);
        osc.start(ctx.currentTime + i * 0.06);
        osc.stop(ctx.currentTime + i * 0.06 + 0.2);
      });
    } catch {}
  }

  public playDash() {
    if (this.isMuted) return;
    try {
      const ctx = this.initCtx();
      if (!ctx) return;
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();

      osc.type = "sawtooth";
      osc.frequency.setValueAtTime(440, ctx.currentTime);
      osc.frequency.exponentialRampToValueAtTime(110, ctx.currentTime + 0.18);

      const v = this.volume * 0.12;
      gain.gain.setValueAtTime(v, ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.0001, ctx.currentTime + 0.18);

      osc.connect(gain);
      gain.connect(ctx.destination);
      osc.start();
      osc.stop(ctx.currentTime + 0.18);
    } catch {}
  }

  public playPuzzleSuccess() {
    if (this.isMuted) return;
    try {
      const ctx = this.initCtx();
      if (!ctx) return;
      const notes = [523.25, 659.25, 783.99, 1046.5]; // C5, E5, G5, C6
      notes.forEach((freq, i) => {
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();
        osc.type = "sine";
        osc.frequency.setValueAtTime(freq, ctx.currentTime + i * 0.08);

        const v = this.volume * 0.15;
        gain.gain.setValueAtTime(v, ctx.currentTime + i * 0.08);
        gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + i * 0.08 + 0.3);

        osc.connect(gain);
        gain.connect(ctx.destination);
        osc.start(ctx.currentTime + i * 0.08);
        osc.stop(ctx.currentTime + i * 0.08 + 0.3);
      });
    } catch {}
  }

  public playQuestComplete() {
    if (this.isMuted) return;
    try {
      const ctx = this.initCtx();
      if (!ctx) return;
      const notes = [440, 554.37, 659.25, 880]; // A4, C#5, E5, A5
      notes.forEach((freq, i) => {
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();
        osc.type = "triangle";
        osc.frequency.setValueAtTime(freq, ctx.currentTime + i * 0.08);

        const v = this.volume * 0.16;
        gain.gain.setValueAtTime(v, ctx.currentTime + i * 0.08);
        gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + i * 0.08 + 0.35);

        osc.connect(gain);
        gain.connect(ctx.destination);
        osc.start(ctx.currentTime + i * 0.08);
        osc.stop(ctx.currentTime + i * 0.08 + 0.35);
      });
    } catch {}
  }

  public playMenuClick() {
    if (this.isMuted) return;
    try {
      const ctx = this.initCtx();
      if (!ctx) return;
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.type = "triangle";
      osc.frequency.setValueAtTime(440, ctx.currentTime);
      osc.frequency.linearRampToValueAtTime(220, ctx.currentTime + 0.05);

      gain.gain.setValueAtTime(this.volume * 0.1, ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.05);

      osc.connect(gain);
      gain.connect(ctx.destination);
      osc.start();
      osc.stop(ctx.currentTime + 0.05);
    } catch {}
  }

  // Soft ambient calming pentatonic RPG BGM loop
  public startAmbientBgm() {
    if (this.isMuted || this.isBgmPlaying) return;
    this.isBgmPlaying = true;

    const scale = [261.63, 293.66, 329.63, 392.0, 440.0, 523.25]; // C, D, E, G, A, C
    let step = 0;

    const tick = () => {
      if (!this.isBgmPlaying || this.isMuted) return;
      try {
        const ctx = this.initCtx();
        if (!ctx) return;

        // Play gentle bell tone
        const freq = scale[step % scale.length];
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();

        osc.type = "sine";
        osc.frequency.setValueAtTime(freq, ctx.currentTime);

        const v = this.volume * 0.035;
        gain.gain.setValueAtTime(v, ctx.currentTime);
        gain.gain.exponentialRampToValueAtTime(0.0001, ctx.currentTime + 1.2);

        osc.connect(gain);
        gain.connect(ctx.destination);

        osc.start();
        osc.stop(ctx.currentTime + 1.2);

        step++;
      } catch {}
    };

    tick();
    this.bgmInterval = window.setInterval(tick, 1600);
  }

  public stopBgm() {
    this.isBgmPlaying = false;
    if (this.bgmInterval) {
      clearInterval(this.bgmInterval);
      this.bgmInterval = null;
    }
  }
}

export const gameAudio = new GameAudioSynthesizer();
