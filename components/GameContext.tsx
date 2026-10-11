"use client";

import React, { createContext, useContext, useState, useEffect, useCallback } from "react";
import { soundFX } from "@/lib/sound";

export interface Achievement {
  id: string;
  title: string;
  description: string;
  xpReward: number;
  icon: string;
}

export const ACHIEVEMENTS: Achievement[] = [
  {
    id: "welcome",
    title: "Player 1 Ready",
    description: "Memulai penjelajahan di portofolio Damianus Saviola",
    xpReward: 50,
    icon: "🎮",
  },
  {
    id: "inspect_project",
    title: "Loot Inspector",
    description: "Memeriksa detail proyek & repositori kode",
    xpReward: 100,
    icon: "🔍",
  },
  {
    id: "arcade_warrior",
    title: "Bug Slayer",
    description: "Memainkan arcade mini-game membasmi bug",
    xpReward: 200,
    icon: "👾",
  },
  {
    id: "tavern_visitor",
    title: "Tavern Explorer",
    description: "Membuka tab Hobi & Kultur (Film, Komik, Steam, Musik)",
    xpReward: 75,
    icon: "🍺",
  },
  {
    id: "contact_transmit",
    title: "Guild Transmit",
    description: "Membuka formulir kontak atau menyalin email",
    xpReward: 150,
    icon: "📡",
  },
  {
    id: "konami_master",
    title: "Secret Konami Code",
    description: "Membuka rahasia kode rahasia legendaris (↑ ↑ ↓ ↓ ← → ← → B A)",
    xpReward: 500,
    icon: "⭐",
  },
];

interface FloatingXPItem {
  id: number;
  amount: number;
  reason: string;
  x: number;
  y: number;
}

interface GameContextType {
  level: number;
  xp: number;
  maxXp: number;
  hp: number;
  mp: number;
  addXp: (amount: number, reason: string, coords?: { x: number; y: number }) => void;
  unlockedAchievements: string[];
  unlockAchievement: (id: string) => void;
  recentAchievement: Achievement | null;
  clearRecentAchievement: () => void;
  isMuted: boolean;
  toggleMute: () => void;
  crtEnabled: boolean;
  toggleCrt: () => void;
  arcadeOpen: boolean;
  setArcadeOpen: (open: boolean) => void;
  floatingXPs: FloatingXPItem[];
  achievementsList: Achievement[];
}

const GameContext = createContext<GameContextType | undefined>(undefined);

export function GameProvider({ children }: { children: React.ReactNode }) {
  const [level, setLevel] = useState(25);
  const [xp, setXp] = useState(8450);
  const maxXp = 10000;
  const hp = 100;
  const mp = 99;

  const [unlockedAchievements, setUnlockedAchievements] = useState<string[]>([]);
  const [recentAchievement, setRecentAchievement] = useState<Achievement | null>(null);
  const [isMuted, setIsMuted] = useState(false);
  const [crtEnabled, setCrtEnabled] = useState(false);
  const [arcadeOpen, setArcadeOpen] = useState(false);
  const [floatingXPs, setFloatingXPs] = useState<FloatingXPItem[]>([]);

  // Load state from localStorage on client
  useEffect(() => {
    try {
      const savedAchievements = localStorage.getItem("dami_game_achievements");
      if (savedAchievements) {
        setUnlockedAchievements(JSON.parse(savedAchievements));
      }
      const savedXp = localStorage.getItem("dami_game_xp");
      if (savedXp) {
        setXp(parseInt(savedXp, 10));
      }
      const savedMuted = localStorage.getItem("game_sfx_muted");
      if (savedMuted !== null) {
        setIsMuted(savedMuted === "true");
      }
      const savedCrt = localStorage.getItem("dami_game_crt");
      if (savedCrt !== null) {
        setCrtEnabled(savedCrt === "true");
      }
    } catch {}
  }, []);

  const toggleMute = useCallback(() => {
    const muted = soundFX.toggleMute();
    setIsMuted(muted);
  }, []);

  const toggleCrt = useCallback(() => {
    setCrtEnabled((prev) => {
      const next = !prev;
      soundFX.playClick();
      try {
        localStorage.setItem("dami_game_crt", next.toString());
      } catch {}
      return next;
    });
  }, []);

  const addXp = useCallback(
    (amount: number, reason: string, coords?: { x: number; y: number }) => {
      soundFX.playCoin();
      setXp((prev) => {
        const nextXp = prev + amount;
        try {
          localStorage.setItem("dami_game_xp", nextXp.toString());
        } catch {}
        if (nextXp >= maxXp) {
          setLevel((l) => l + 1);
        }
        return nextXp;
      });

      // Add floating XP indicator
      const newFloating: FloatingXPItem = {
        id: Date.now() + Math.random(),
        amount,
        reason,
        x: coords?.x ?? (typeof window !== "undefined" ? window.innerWidth / 2 : 200),
        y: coords?.y ?? (typeof window !== "undefined" ? window.innerHeight / 2 : 200),
      };

      setFloatingXPs((prev) => [...prev.slice(-4), newFloating]);

      setTimeout(() => {
        setFloatingXPs((prev) => prev.filter((item) => item.id !== newFloating.id));
      }, 1500);
    },
    [maxXp]
  );

  const unlockAchievement = useCallback(
    (id: string) => {
      setUnlockedAchievements((prev) => {
        if (prev.includes(id)) return prev;
        const next = [...prev, id];
        try {
          localStorage.setItem("dami_game_achievements", JSON.stringify(next));
        } catch {}

        const achievement = ACHIEVEMENTS.find((a) => a.id === id);
        if (achievement) {
          setRecentAchievement(achievement);
          soundFX.playAchievement();
          addXp(achievement.xpReward, `Achievement: ${achievement.title}`);
        }

        return next;
      });
    },
    [addXp]
  );

  const clearRecentAchievement = useCallback(() => {
    setRecentAchievement(null);
  }, []);

  // Trigger initial welcome achievement after short delay
  useEffect(() => {
    const timer = setTimeout(() => {
      unlockAchievement("welcome");
    }, 1500);
    return () => clearTimeout(timer);
  }, [unlockAchievement]);

  // Konami Code listener
  useEffect(() => {
    const konamiSequence = [
      "ArrowUp",
      "ArrowUp",
      "ArrowDown",
      "ArrowDown",
      "ArrowLeft",
      "ArrowRight",
      "ArrowLeft",
      "ArrowRight",
      "b",
      "a",
    ];
    let keyIndex = 0;

    const handleKeyDown = (e: KeyboardEvent) => {
      const key = e.key;
      if (key.toLowerCase() === konamiSequence[keyIndex]?.toLowerCase()) {
        keyIndex++;
        if (keyIndex === konamiSequence.length) {
          unlockAchievement("konami_master");
          keyIndex = 0;
        }
      } else {
        keyIndex = 0;
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [unlockAchievement]);

  return (
    <GameContext.Provider
      value={{
        level,
        xp,
        maxXp,
        hp,
        mp,
        addXp,
        unlockedAchievements,
        unlockAchievement,
        recentAchievement,
        clearRecentAchievement,
        isMuted,
        toggleMute,
        crtEnabled,
        toggleCrt,
        arcadeOpen,
        setArcadeOpen,
        floatingXPs,
        achievementsList: ACHIEVEMENTS,
      }}
    >
      {children}
    </GameContext.Provider>
  );
}

export function useGame() {
  const context = useContext(GameContext);
  if (!context) {
    throw new Error("useGame must be used within a GameProvider");
  }
  return context;
}
