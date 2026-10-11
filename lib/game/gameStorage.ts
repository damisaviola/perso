export interface GameStorageState {
  version: number;
  completedQuests: string[];
  collectedItems: string[];
  visitedLocations: string[];
  openedProjects: string[];
  playerPosition: { x: number; y: number } | null;
  xp: number;
  settings: {
    isMuted: boolean;
    volume: number;
  };
}

const STORAGE_KEY = "developer_world_save_v1";
const CURRENT_VERSION = 1;

export const DEFAULT_GAME_STORAGE: GameStorageState = {
  version: CURRENT_VERSION,
  completedQuests: [],
  collectedItems: [],
  visitedLocations: ["loc_home"],
  openedProjects: [],
  playerPosition: { x: 400, y: 450 },
  xp: 0,
  settings: {
    isMuted: false,
    volume: 0.7,
  },
};

export function loadGameStorage(): GameStorageState {
  if (typeof window === "undefined") return DEFAULT_GAME_STORAGE;
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return DEFAULT_GAME_STORAGE;
    const parsed = JSON.parse(raw) as Partial<GameStorageState>;
    if (parsed.version !== CURRENT_VERSION) {
      return DEFAULT_GAME_STORAGE;
    }
    return {
      version: CURRENT_VERSION,
      completedQuests: Array.isArray(parsed.completedQuests) ? parsed.completedQuests : [],
      collectedItems: Array.isArray(parsed.collectedItems) ? parsed.collectedItems : [],
      visitedLocations: Array.isArray(parsed.visitedLocations) ? parsed.visitedLocations : ["loc_home"],
      openedProjects: Array.isArray(parsed.openedProjects) ? parsed.openedProjects : [],
      playerPosition: parsed.playerPosition && typeof parsed.playerPosition.x === "number" ? parsed.playerPosition : { x: 400, y: 450 },
      xp: typeof parsed.xp === "number" ? parsed.xp : 0,
      settings: {
        isMuted: parsed.settings?.isMuted ?? false,
        volume: parsed.settings?.volume ?? 0.7,
      },
    };
  } catch {
    return DEFAULT_GAME_STORAGE;
  }
}

export function saveGameStorage(state: Partial<GameStorageState>) {
  if (typeof window === "undefined") return;
  try {
    const current = loadGameStorage();
    const merged: GameStorageState = {
      ...current,
      ...state,
      settings: {
        ...current.settings,
        ...(state.settings || {}),
      },
      version: CURRENT_VERSION,
    };
    localStorage.setItem(STORAGE_KEY, JSON.stringify(merged));
  } catch {}
}

export function resetGameStorage(): GameStorageState {
  if (typeof window !== "undefined") {
    try {
      localStorage.removeItem(STORAGE_KEY);
    } catch {}
  }
  return DEFAULT_GAME_STORAGE;
}
