"use client";

import React, { useEffect, useRef, useImperativeHandle, forwardRef } from "react";
import { initPhaserGame, PhaserGameInstance } from "./PhaserGame";

export interface GameCanvasHandle {
  setMobileMove: (dx: number, dy: number) => void;
  triggerInteract: () => void;
  triggerDash: () => void;
  teleportPlayer: (x: number, y: number) => void;
  setMovementPaused: (paused: boolean) => void;
}

interface GameCanvasProps {
  onGameEvent: (event: string, payload?: any) => void;
  isPaused: boolean;
}

const GameCanvas = forwardRef<GameCanvasHandle, GameCanvasProps>(
  ({ onGameEvent, isPaused }, ref) => {
    const containerRef = useRef<HTMLDivElement | null>(null);
    const gameInstanceRef = useRef<PhaserGameInstance | null>(null);

    useImperativeHandle(ref, () => ({
      setMobileMove: (dx: number, dy: number) => {
        gameInstanceRef.current?.worldScene.setMobileMove(dx, dy);
      },
      triggerInteract: () => {
        gameInstanceRef.current?.worldScene.triggerInteraction();
      },
      triggerDash: () => {
        gameInstanceRef.current?.worldScene.performDash();
      },
      teleportPlayer: (x: number, y: number) => {
        gameInstanceRef.current?.worldScene.teleportPlayer(x, y);
      },
      setMovementPaused: (paused: boolean) => {
        gameInstanceRef.current?.worldScene.setMovementPaused(paused);
      },
    }));

    // Update pause state in Phaser when React state changes
    useEffect(() => {
      if (gameInstanceRef.current?.worldScene) {
        gameInstanceRef.current.worldScene.setMovementPaused(isPaused);
      }
    }, [isPaused]);

    useEffect(() => {
      if (!containerRef.current || gameInstanceRef.current) return;

      const instance = initPhaserGame(containerRef.current, (event, payload) => {
        onGameEvent(event, payload);
      });
      gameInstanceRef.current = instance;

      return () => {
        if (gameInstanceRef.current) {
          gameInstanceRef.current.destroy();
          gameInstanceRef.current = null;
        }
      };
    }, [onGameEvent]);

    return (
      <div
        ref={containerRef}
        id="phaser-game-container"
        className="w-full h-full absolute inset-0 overflow-hidden bg-[#1e3a1f]"
      />
    );
  }
);

GameCanvas.displayName = "GameCanvas";

export default GameCanvas;
