"use client";

import React, { useEffect, useRef, useState, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, Play, RotateCcw, Volume2, VolumeX, Trophy, ShieldAlert, Zap, Terminal } from "lucide-react";
import { soundFX } from "@/lib/sound";
import { useGame } from "./GameContext";

interface Enemy {
  x: number;
  y: number;
  speed: number;
  type: "bug" | "404" | "conflict";
  width: number;
  height: number;
  label: string;
  color: string;
  hp: number;
}

interface Bullet {
  x: number;
  y: number;
  speed: number;
}

interface Particle {
  x: number;
  y: number;
  vx: number;
  vy: number;
  life: number;
  color: string;
}

export default function ArcadeMiniGame() {
  const { arcadeOpen, setArcadeOpen, unlockAchievement, addXp } = useGame();
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  const [gameState, setGameState] = useState<"idle" | "playing" | "gameover">("idle");
  const [score, setScore] = useState(0);
  const [highScore, setHighScore] = useState(0);
  const [serverHealth, setServerHealth] = useState(100);

  // Game loop references to avoid closure stales
  const playerRef = useRef({ x: 200, y: 350, width: 36, height: 24, speed: 6 });
  const keysRef = useRef<{ [key: string]: boolean }>({});
  const bulletsRef = useRef<Bullet[]>([]);
  const enemiesRef = useRef<Enemy[]>([]);
  const particlesRef = useRef<Particle[]>([]);
  const lastSpawnRef = useRef<number>(0);
  const animationFrameRef = useRef<number | null>(null);
  const scoreRef = useRef(0);
  const healthRef = useRef(100);

  useEffect(() => {
    try {
      const saved = localStorage.getItem("dami_arcade_highscore");
      if (saved) setHighScore(parseInt(saved, 10));
    } catch {}
  }, []);

  const spawnEnemy = useCallback((canvasWidth: number) => {
    const types: Array<{ type: "bug" | "404" | "conflict"; label: string; color: string; hp: number; speed: number }> = [
      { type: "bug", label: "🐛 BUG", color: "#ef4444", hp: 1, speed: 2 + Math.random() * 1.5 },
      { type: "404", label: "⚠️ 404", color: "#f59e0b", hp: 2, speed: 1.5 + Math.random() * 1 },
      { type: "conflict", label: "⚔️ CONFLICT", color: "#ec4899", hp: 3, speed: 1.2 + Math.random() * 0.8 },
    ];
    const picked = types[Math.floor(Math.random() * types.length)];
    const width = 48;
    const height = 22;
    const x = Math.max(10, Math.min(canvasWidth - width - 10, Math.random() * (canvasWidth - width)));

    enemiesRef.current.push({
      x,
      y: -30,
      speed: picked.speed,
      type: picked.type,
      width,
      height,
      label: picked.label,
      color: picked.color,
      hp: picked.hp,
    });
  }, []);

  const createExplosion = useCallback((x: number, y: number, color: string) => {
    soundFX.playExplosion();
    for (let i = 0; i < 16; i++) {
      const angle = (Math.PI * 2 * i) / 16;
      const speed = 1.5 + Math.random() * 3.5;
      particlesRef.current.push({
        x,
        y,
        vx: Math.cos(angle) * speed,
        vy: Math.sin(angle) * speed,
        life: 1,
        color,
      });
    }
  }, []);

  const shootBullet = useCallback(() => {
    soundFX.playLaser();
    bulletsRef.current.push({
      x: playerRef.current.x + playerRef.current.width / 2,
      y: playerRef.current.y - 4,
      speed: 9,
    });
  }, []);

  const startGame = () => {
    soundFX.playPowerUp();
    unlockAchievement("arcade_warrior");
    setScore(0);
    scoreRef.current = 0;
    setServerHealth(100);
    healthRef.current = 100;
    bulletsRef.current = [];
    enemiesRef.current = [];
    particlesRef.current = [];
    setGameState("playing");

    if (canvasRef.current) {
      playerRef.current.x = canvasRef.current.width / 2 - 18;
      playerRef.current.y = canvasRef.current.height - 40;
    }
  };

  const endGame = useCallback(() => {
    soundFX.playExplosion();
    setGameState("gameover");
    const currentFinal = scoreRef.current;
    if (currentFinal > highScore) {
      setHighScore(currentFinal);
      try {
        localStorage.setItem("dami_arcade_highscore", currentFinal.toString());
      } catch {}
    }
    if (currentFinal >= 150) {
      addXp(100, "Arcade High Score Bonus");
    }
  }, [highScore, addXp]);

  // Main Canvas Render & Game Loop
  useEffect(() => {
    if (gameState !== "playing" || !arcadeOpen) return;

    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let isRunning = true;

    const handleKeyDown = (e: KeyboardEvent) => {
      keysRef.current[e.key] = true;
      if (e.code === "Space") {
        e.preventDefault();
        shootBullet();
      }
    };

    const handleKeyUp = (e: KeyboardEvent) => {
      keysRef.current[e.key] = false;
    };

    window.addEventListener("keydown", handleKeyDown);
    window.addEventListener("keyup", handleKeyUp);

    const loop = (timestamp: number) => {
      if (!isRunning) return;

      const width = canvas.width;
      const height = canvas.height;

      // Update Player position
      const player = playerRef.current;
      if ((keysRef.current["ArrowLeft"] || keysRef.current["a"] || keysRef.current["A"]) && player.x > 8) {
        player.x -= player.speed;
      }
      if (
        (keysRef.current["ArrowRight"] || keysRef.current["d"] || keysRef.current["D"]) &&
        player.x < width - player.width - 8
      ) {
        player.x += player.speed;
      }

      // Spawning enemies
      if (timestamp - lastSpawnRef.current > 900) {
        spawnEnemy(width);
        lastSpawnRef.current = timestamp;
      }

      // Update bullets
      bulletsRef.current.forEach((b) => {
        b.y -= b.speed;
      });
      bulletsRef.current = bulletsRef.current.filter((b) => b.y > -10);

      // Update enemies & collision detection
      enemiesRef.current.forEach((enemy) => {
        enemy.y += enemy.speed;

        // Check collision with player
        if (
          enemy.y + enemy.height >= player.y &&
          enemy.y <= player.y + player.height &&
          enemy.x + enemy.width >= player.x &&
          enemy.x <= player.x + player.width
        ) {
          enemy.hp = 0;
          createExplosion(enemy.x + enemy.width / 2, enemy.y + enemy.height / 2, enemy.color);
          healthRef.current = Math.max(0, healthRef.current - 25);
          setServerHealth(healthRef.current);
          if (healthRef.current <= 0) {
            endGame();
          }
        }

        // Check if enemy hit bottom base
        if (enemy.y > height) {
          enemy.hp = 0;
          healthRef.current = Math.max(0, healthRef.current - 15);
          setServerHealth(healthRef.current);
          if (healthRef.current <= 0) {
            endGame();
          }
        }

        // Bullet vs enemy collision
        bulletsRef.current.forEach((bullet) => {
          if (
            bullet.x >= enemy.x &&
            bullet.x <= enemy.x + enemy.width &&
            bullet.y >= enemy.y &&
            bullet.y <= enemy.y + enemy.height
          ) {
            bullet.y = -999;
            enemy.hp -= 1;
            if (enemy.hp <= 0) {
              createExplosion(enemy.x + enemy.width / 2, enemy.y + enemy.height / 2, enemy.color);
              scoreRef.current += enemy.type === "conflict" ? 150 : enemy.type === "404" ? 100 : 50;
              setScore(scoreRef.current);
            }
          }
        });
      });

      enemiesRef.current = enemiesRef.current.filter((e) => e.hp > 0 && e.y <= height);

      // Update particles
      particlesRef.current.forEach((p) => {
        p.x += p.vx;
        p.y += p.vy;
        p.life -= 0.04;
      });
      particlesRef.current = particlesRef.current.filter((p) => p.life > 0);

      // RENDER
      ctx.fillStyle = "#090d16";
      ctx.fillRect(0, 0, width, height);

      // Starfield / Cyber grid background
      ctx.fillStyle = "rgba(59, 130, 246, 0.15)";
      for (let i = 0; i < 20; i++) {
        const starX = (i * 37) % width;
        const starY = ((timestamp * 0.05 + i * 40) % height);
        ctx.fillRect(starX, starY, 1.5, 1.5);
      }

      // Draw player ship
      ctx.fillStyle = "#38bdf8";
      ctx.shadowColor = "#38bdf8";
      ctx.shadowBlur = 10;
      // Spaceship triangle shape
      ctx.beginPath();
      ctx.moveTo(player.x + player.width / 2, player.y);
      ctx.lineTo(player.x + player.width, player.y + player.height);
      ctx.lineTo(player.x + player.width / 2, player.y + player.height - 6);
      ctx.lineTo(player.x, player.y + player.height);
      ctx.closePath();
      ctx.fill();

      // Cockpit glow
      ctx.fillStyle = "#ffffff";
      ctx.fillRect(player.x + player.width / 2 - 2, player.y + 6, 4, 6);
      ctx.shadowBlur = 0;

      // Draw bullets
      ctx.fillStyle = "#22c55e";
      ctx.shadowColor = "#22c55e";
      ctx.shadowBlur = 8;
      bulletsRef.current.forEach((b) => {
        ctx.fillRect(b.x - 2, b.y, 4, 12);
      });
      ctx.shadowBlur = 0;

      // Draw enemies
      enemiesRef.current.forEach((enemy) => {
        ctx.fillStyle = enemy.color;
        ctx.shadowColor = enemy.color;
        ctx.shadowBlur = 6;
        ctx.fillRect(enemy.x, enemy.y, enemy.width, enemy.height);

        // Text label on bug
        ctx.fillStyle = "#ffffff";
        ctx.font = "bold 9px monospace";
        ctx.textAlign = "center";
        ctx.fillText(enemy.label, enemy.x + enemy.width / 2, enemy.y + 14);
      });
      ctx.shadowBlur = 0;

      // Draw particles
      particlesRef.current.forEach((p) => {
        ctx.fillStyle = p.color;
        ctx.globalAlpha = p.life;
        ctx.fillRect(p.x, p.y, 3, 3);
      });
      ctx.globalAlpha = 1.0;

      if (isRunning) {
        animationFrameRef.current = requestAnimationFrame(loop);
      }
    };

    animationFrameRef.current = requestAnimationFrame(loop);

    return () => {
      isRunning = false;
      if (animationFrameRef.current) cancelAnimationFrame(animationFrameRef.current);
      window.removeEventListener("keydown", handleKeyDown);
      window.removeEventListener("keyup", handleKeyUp);
    };
  }, [gameState, arcadeOpen, spawnEnemy, createExplosion, shootBullet, endGame]);

  return (
    <AnimatePresence>
      {arcadeOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-black/80 backdrop-blur-md"
        >
          <div className="relative w-full max-w-lg bg-[#090d16] border-2 border-cyan-500/60 rounded-2xl shadow-[0_0_50px_rgba(6,182,212,0.35)] overflow-hidden flex flex-col">
            {/* Header Cabinet */}
            <div className="px-4 py-3 bg-[#0d1527] border-b border-cyan-500/30 flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Terminal className="w-4 h-4 text-cyan-400" />
                <span className="font-mono text-xs font-bold text-cyan-300 tracking-wider">
                  BUG_BUSTER_V2.6 // PRODUCTION_HOTFIX
                </span>
              </div>
              <button
                onClick={() => setArcadeOpen(false)}
                className="p-1 rounded-lg text-slate-400 hover:text-white hover:bg-white/10 transition-colors"
                aria-label="Tutup Arcade"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Scoreboard HUD */}
            <div className="px-4 py-2.5 bg-[#090d16] border-b border-white/5 flex items-center justify-between text-xs font-mono">
              <div className="flex items-center gap-1.5 text-emerald-400 font-bold">
                <span>SCORE:</span>
                <span className="text-sm">{score}</span>
              </div>
              <div className="flex items-center gap-1.5 text-amber-400 font-bold">
                <Trophy className="w-3.5 h-3.5" />
                <span>HI:</span>
                <span>{highScore}</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-slate-400">SERVER HP:</span>
                <div className="w-16 h-2.5 bg-slate-800 rounded-full overflow-hidden border border-slate-700">
                  <div
                    className={`h-full transition-all duration-200 ${
                      serverHealth > 50 ? "bg-emerald-500" : serverHealth > 25 ? "bg-amber-500" : "bg-red-500"
                    }`}
                    style={{ width: `${serverHealth}%` }}
                  />
                </div>
              </div>
            </div>

            {/* Arcade Screen Canvas */}
            <div className="relative bg-[#090d16] flex items-center justify-center min-h-[360px] sm:min-h-[400px]">
              <canvas
                ref={canvasRef}
                width={460}
                height={380}
                className="w-full h-[360px] sm:h-[400px] block"
              />

              {/* CRT Scanline Filter */}
              <div className="absolute inset-0 pointer-events-none bg-[linear-gradient(rgba(18,16,16,0)_50%,rgba(0,0,0,0.25)_50%)] bg-[length:100%_4px]" />

              {/* Idle Overlay */}
              {gameState === "idle" && (
                <div className="absolute inset-0 bg-black/75 flex flex-col items-center justify-center p-6 text-center z-10">
                  <div className="w-14 h-14 rounded-2xl bg-cyan-500/20 border border-cyan-400/40 flex items-center justify-center text-3xl mb-3">
                    👾
                  </div>
                  <h3 className="font-heading font-black text-xl sm:text-2xl text-white tracking-tight">
                    BUG BUSTER: HOTFIX RAID
                  </h3>
                  <p className="text-xs sm:text-sm text-slate-300 mt-2 max-w-xs leading-relaxed font-sans">
                    Bantu Damianus membasmi bug, kode 404, dan merge conflict sebelum server produksi down!
                  </p>
                  <div className="mt-3 text-[11px] font-mono text-cyan-300 bg-cyan-950/40 px-3 py-1.5 rounded-lg border border-cyan-800/40">
                    KONTROL: [← / →] Gerak &bull; [SPACE] Tembak Hotfix
                  </div>
                  <button
                    onClick={startGame}
                    className="mt-5 px-6 py-2.5 rounded-xl bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 text-white font-mono font-bold text-sm flex items-center gap-2 shadow-[0_0_20px_rgba(6,182,212,0.5)] transition-all active:scale-95 cursor-pointer"
                  >
                    <Play className="w-4 h-4 fill-white" />
                    <span>START MISSION [INSERT COIN]</span>
                  </button>
                </div>
              )}

              {/* Game Over Overlay */}
              {gameState === "gameover" && (
                <div className="absolute inset-0 bg-black/85 flex flex-col items-center justify-center p-6 text-center z-10 animate-fade-in">
                  <ShieldAlert className="w-12 h-12 text-red-500 mb-2 animate-bounce" />
                  <h3 className="font-heading font-black text-2xl text-red-400 tracking-tight">
                    SERVER OVERHEAT!
                  </h3>
                  <p className="text-xs text-slate-300 mt-1">
                    Bugs overwhelmed production. Skor kamu:{" "}
                    <span className="font-mono font-bold text-amber-400 text-sm">{score} pts</span>
                  </p>
                  <button
                    onClick={startGame}
                    className="mt-5 px-6 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-mono font-bold text-sm flex items-center gap-2 shadow-[0_0_20px_rgba(16,185,129,0.5)] transition-all active:scale-95 cursor-pointer"
                  >
                    <RotateCcw className="w-4 h-4" />
                    <span>RETRY MISSION</span>
                  </button>
                </div>
              )}
            </div>

            {/* Mobile / Touch Controller Buttons */}
            <div className="p-3 bg-[#0d1527] border-t border-cyan-500/20 flex items-center justify-between sm:hidden">
              <div className="flex items-center gap-2">
                <button
                  onTouchStart={() => {
                    keysRef.current["ArrowLeft"] = true;
                  }}
                  onTouchEnd={() => {
                    keysRef.current["ArrowLeft"] = false;
                  }}
                  className="w-12 h-10 rounded-lg bg-slate-800 text-white font-bold flex items-center justify-center active:bg-cyan-600 border border-slate-700"
                >
                  ◀
                </button>
                <button
                  onTouchStart={() => {
                    keysRef.current["ArrowRight"] = true;
                  }}
                  onTouchEnd={() => {
                    keysRef.current["ArrowRight"] = false;
                  }}
                  className="w-12 h-10 rounded-lg bg-slate-800 text-white font-bold flex items-center justify-center active:bg-cyan-600 border border-slate-700"
                >
                  ▶
                </button>
              </div>

              <button
                onTouchStart={() => {
                  shootBullet();
                }}
                className="px-5 h-10 rounded-lg bg-red-600 text-white font-mono font-bold text-xs flex items-center justify-center active:bg-red-500 shadow-lg border border-red-400"
              >
                FIRE ⚡
              </button>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
