import Phaser from "phaser";
import { BootScene } from "./scenes/BootScene";
import { WorldScene } from "./scenes/WorldScene";

export interface PhaserGameInstance {
  game: Phaser.Game;
  worldScene: WorldScene;
  destroy: () => void;
}

export function initPhaserGame(
  parent: HTMLElement,
  onEvent: (event: string, payload?: any) => void
): PhaserGameInstance {
  const bootScene = new BootScene();
  const worldScene = new WorldScene();

  worldScene.onEventEmit = onEvent;

  const config: Phaser.Types.Core.GameConfig = {
    type: Phaser.AUTO,
    parent: parent,
    width: parent.clientWidth || 800,
    height: parent.clientHeight || 600,
    backgroundColor: "#1e3a1f",
    physics: {
      default: "arcade",
      arcade: {
        gravity: { x: 0, y: 0 },
        debug: false,
      },
    },
    scale: {
      mode: Phaser.Scale.RESIZE,
      autoCenter: Phaser.Scale.CENTER_BOTH,
    },
    pixelArt: true,
    roundPixels: true,
    scene: [bootScene, worldScene],
  };

  const game = new Phaser.Game(config);

  return {
    game,
    worldScene,
    destroy: () => {
      game.destroy(true, false);
    },
  };
}
