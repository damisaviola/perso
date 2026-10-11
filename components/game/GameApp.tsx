"use client";

import React, { useState, useEffect, useRef, useCallback, useMemo } from "react";
import dynamic from "next/dynamic";
import {
  loadGameStorage,
  saveGameStorage,
  resetGameStorage,
  GameStorageState,
} from "@/lib/game/gameStorage";
import { gameAudio } from "@/lib/game/gameAudio";
import { ProjectDetail, GAME_DEVELOPER_DATA, Quest } from "@/lib/game/gameData";
import IntroScreen from "./ui/IntroScreen";
import GameHUD from "./ui/GameHUD";
import DialogueBox, { DialoguePayload } from "./ui/DialogueBox";
import ProjectDetailModal from "./ui/ProjectDetailModal";
import LocationModal from "./ui/LocationModal";
import QuestTrackerModal from "./ui/QuestTrackerModal";
import SettingsModal from "./ui/SettingsModal";
import MainframePuzzleModal from "./ui/MainframePuzzleModal";
import MobileController from "./ui/MobileController";
import PortfolioView from "./ui/PortfolioView";
import type { GameCanvasHandle } from "./GameCanvas";

// Dynamically import GameCanvas with SSR disabled as required by Next.js & Phaser
const GameCanvas = dynamic(() => import("./GameCanvas"), {
  ssr: false,
  loading: () => (
    <div className="fixed inset-0 bg-[#070b14] flex flex-col items-center justify-center text-white">
      <div className="w-12 h-12 rounded-2xl border-4 border-emerald-500 border-t-transparent animate-spin mb-4" />
      <span className="font-mono text-xs tracking-wider text-emerald-400">
        MEMUAT DEVELOPER WORLD...
      </span>
    </div>
  ),
});

export default function GameApp() {
  const [gameMode, setGameMode] = useState<"intro" | "playing" | "portfolio">("intro");
  const [storageState, setStorageState] = useState<GameStorageState>(loadGameStorage());

  // Modal and Dialogue States
  const [activeDialogue, setActiveDialogue] = useState<DialoguePayload | null>(null);
  const [activeProject, setActiveProject] = useState<ProjectDetail | null>(null);
  const [activeLocationModal, setActiveLocationModal] = useState<{
    type: "academy" | "achievements" | "altar" | "tower" | "location";
    data?: any;
  } | null>(null);
  const [isPuzzleOpen, setIsPuzzleOpen] = useState(false);
  const [isQuestsOpen, setIsQuestsOpen] = useState(false);
  const [isSettingsOpen, setIsSettingsOpen] = useState(false);
  const [nearbyTargetName, setNearbyTargetName] = useState<string | null>(null);
  const [playerCoords, setPlayerCoords] = useState<{ x: number; y: number }>({ x: 430, y: 420 });

  const canvasHandleRef = useRef<GameCanvasHandle | null>(null);

  // Sync mute setting with audio engine
  useEffect(() => {
    gameAudio.setMuted(storageState.settings.isMuted);
  }, [storageState.settings.isMuted]);

  // Check if any modal is open to pause player movement
  const isAnyModalOpen =
    Boolean(activeDialogue) ||
    Boolean(activeProject) ||
    Boolean(activeLocationModal) ||
    isPuzzleOpen ||
    isQuestsOpen ||
    isSettingsOpen;

  // Quest Completer Helper
  const completeQuest = useCallback((questId: string) => {
    setStorageState((prev) => {
      if (prev.completedQuests.includes(questId)) return prev;

      const quest = GAME_DEVELOPER_DATA.quests.find((q) => q.id === questId);
      const addedXp = quest ? quest.xpReward : 100;
      const nextQuests = [...prev.completedQuests, questId];
      const nextXp = prev.xp + addedXp;

      gameAudio.playQuestComplete();

      const updated: GameStorageState = {
        ...prev,
        completedQuests: nextQuests,
        xp: nextXp,
      };
      saveGameStorage(updated);
      return updated;
    });
  }, []);

  // Event handler from Phaser WorldScene
  const handleGameEvent = useCallback(
    (event: string, payload?: any) => {
      switch (event) {
        case "open-dialogue":
          setActiveDialogue(payload);
          if (payload?.npcName === "Espresso Fuel Station") {
            completeQuest("quest_coffee");
          } else {
            completeQuest("quest_meet");
          }
          break;

        case "open-project":
          setActiveProject(payload);
          break;

        case "open-puzzle":
          setIsPuzzleOpen(true);
          break;

        case "open-altar":
          setActiveLocationModal({ type: "altar", data: payload });
          completeQuest("quest_skills");
          break;

        case "open-location":
          if (payload?.id === "loc_academy") {
            setActiveLocationModal({ type: "academy", data: payload });
            completeQuest("quest_academy");
          } else if (payload?.id === "loc_achievements") {
            setActiveLocationModal({ type: "achievements", data: payload });
          } else if (payload?.id === "loc_tower") {
            setActiveLocationModal({ type: "tower", data: payload });
            completeQuest("quest_tower");
          } else {
            setActiveLocationModal({ type: "location", data: payload });
          }
          break;

        case "collect-item":
          setStorageState((prev) => {
            if (prev.collectedItems.includes(payload.id)) return prev;
            const nextItems = [...prev.collectedItems, payload.id];
            const nextXp = prev.xp + 50;

            if (nextItems.length >= 8) {
              completeQuest("quest_crystals");
            }

            const updated: GameStorageState = {
              ...prev,
              collectedItems: nextItems,
              xp: nextXp,
            };
            saveGameStorage(updated);
            return updated;
          });
          break;

        case "player-move":
          setPlayerCoords(payload);
          break;

        case "proximity-change":
          setNearbyTargetName(payload);
          break;

        case "toggle-pause":
          setIsSettingsOpen((prev) => !prev);
          break;

        default:
          break;
      }
    },
    [completeQuest]
  );

  const handleStartGame = () => {
    setGameMode("playing");
    gameAudio.startAmbientBgm();
  };

  const handleViewPortfolio = () => {
    setGameMode("portfolio");
    gameAudio.stopBgm();
  };

  const handleBackToGame = () => {
    setGameMode("playing");
    gameAudio.startAmbientBgm();
  };

  const handleToggleMute = () => {
    const nextMuted = !storageState.settings.isMuted;
    gameAudio.setMuted(nextMuted);
    setStorageState((prev) => {
      const updated = {
        ...prev,
        settings: {
          ...prev.settings,
          isMuted: nextMuted,
        },
      };
      saveGameStorage(updated);
      return updated;
    });
  };

  const handleResetProgress = () => {
    const reset = resetGameStorage();
    setStorageState(reset);
  };

  const handleFastTravel = useCallback((x: number, y: number) => {
    canvasHandleRef.current?.teleportPlayer(x, y);
  }, []);

  // Compute currently active priority quest
  const activeQuest = useMemo(() => {
    const nextQuest = GAME_DEVELOPER_DATA.quests.find(
      (q) => !storageState.completedQuests.includes(q.id)
    );
    if (!nextQuest) return null;
    return {
      title: nextQuest.title,
      location: nextQuest.location,
      xpReward: nextQuest.xpReward,
    };
  }, [storageState.completedQuests]);

  return (
    <div className="relative w-screen h-screen overflow-hidden bg-[#070b14] select-none font-sans">
      {/* 1. Intro Screen */}
      {gameMode === "intro" && (
        <IntroScreen
          onStartGame={handleStartGame}
          onViewPortfolio={handleViewPortfolio}
          onOpenSettings={() => setIsSettingsOpen(true)}
        />
      )}

      {/* 2. Conventional Full Portfolio View (Skip Game Mode) */}
      {gameMode === "portfolio" && (
        <PortfolioView onBackToGame={handleBackToGame} />
      )}

      {/* 3. 2D RPG Gameplay View */}
      {gameMode === "playing" && (
        <>
          {/* Phaser Canvas */}
          <GameCanvas
            ref={canvasHandleRef}
            onGameEvent={handleGameEvent}
            isPaused={isAnyModalOpen}
          />

          {/* Interactive Modern Tactical HUD Overlay */}
          <GameHUD
            xp={storageState.xp}
            completedQuestsCount={storageState.completedQuests.length}
            collectedCrystalsCount={storageState.collectedItems.length}
            nearbyTargetName={nearbyTargetName}
            playerCoords={playerCoords}
            activeQuest={activeQuest}
            isMuted={storageState.settings.isMuted}
            onToggleMute={handleToggleMute}
            onOpenQuests={() => setIsQuestsOpen(true)}
            onOpenSettings={() => setIsSettingsOpen(true)}
            onViewPortfolio={handleViewPortfolio}
            onFastTravel={handleFastTravel}
          />

          {/* Touch Screen Virtual Controls */}
          <MobileController
            onMoveChange={(dx, dy) => {
              canvasHandleRef.current?.setMobileMove(dx, dy);
            }}
            onInteract={() => {
              canvasHandleRef.current?.triggerInteract();
            }}
            onDash={() => {
              canvasHandleRef.current?.triggerDash();
            }}
            nearbyTargetName={nearbyTargetName}
          />
        </>
      )}

      {/* 4. Active Dialogue Box */}
      {activeDialogue && (
        <DialogueBox
          dialogue={activeDialogue}
          onClose={() => {
            setActiveDialogue(null);
            canvasHandleRef.current?.setMovementPaused(false);
          }}
        />
      )}

      {/* 5. Project Detail Modal */}
      {activeProject && (
        <ProjectDetailModal
          project={activeProject}
          onClose={() => {
            setActiveProject(null);
            canvasHandleRef.current?.setMovementPaused(false);
          }}
        />
      )}

      {/* 6. Location & Lore Modal (Academy, Achievements, Altars, Tower) */}
      {activeLocationModal && (
        <LocationModal
          type={activeLocationModal.type}
          data={activeLocationModal.data}
          onClose={() => {
            setActiveLocationModal(null);
            canvasHandleRef.current?.setMovementPaused(false);
          }}
        />
      )}

      {/* 7. Interactive Mainframe Debug Puzzle Modal */}
      {isPuzzleOpen && (
        <MainframePuzzleModal
          onSuccess={() => {
            completeQuest("quest_puzzle");
          }}
          onClose={() => {
            setIsPuzzleOpen(false);
            canvasHandleRef.current?.setMovementPaused(false);
          }}
        />
      )}

      {/* 8. Quest Tracker Chronicles Modal */}
      {isQuestsOpen && (
        <QuestTrackerModal
          completedQuestIds={storageState.completedQuests}
          collectedCrystals={storageState.collectedItems}
          onFastTravel={handleFastTravel}
          onClose={() => {
            setIsQuestsOpen(false);
            canvasHandleRef.current?.setMovementPaused(false);
          }}
        />
      )}

      {/* 9. Settings & Controls Modal */}
      {isSettingsOpen && (
        <SettingsModal
          isMuted={storageState.settings.isMuted}
          onToggleMute={handleToggleMute}
          onResetProgress={handleResetProgress}
          onBackToMainMenu={() => {
            setIsSettingsOpen(false);
            setGameMode("intro");
            gameAudio.stopBgm();
          }}
          onClose={() => {
            setIsSettingsOpen(false);
            canvasHandleRef.current?.setMovementPaused(false);
          }}
        />
      )}
    </div>
  );
}
