import Phaser from "phaser";

export class BootScene extends Phaser.Scene {
  constructor() {
    super({ key: "BootScene" });
  }

  preload() {
    // Generate procedural pixel textures so the game is completely self-contained,
    // robust, and guaranteed to render cleanly without external asset loading errors.
    this.createProceduralTextures();
  }

  create() {
    this.createPlayerAnimations();
    this.scene.start("WorldScene");
  }

  private createProceduralTextures() {
    // 1. Terrain Grass Tile (32x32)
    const grassCanvas = document.createElement("canvas");
    grassCanvas.width = 32;
    grassCanvas.height = 32;
    const gCtx = grassCanvas.getContext("2d")!;
    gCtx.fillStyle = "#2d5a27";
    gCtx.fillRect(0, 0, 32, 32);
    // Subtle pixel texture
    gCtx.fillStyle = "#386b31";
    gCtx.fillRect(4, 4, 4, 4);
    gCtx.fillRect(20, 8, 4, 4);
    gCtx.fillRect(10, 22, 4, 4);
    gCtx.fillRect(24, 20, 4, 4);
    gCtx.fillStyle = "#24491f";
    gCtx.fillRect(14, 12, 3, 3);
    gCtx.fillRect(2, 24, 3, 3);
    this.textures.addCanvas("tile_grass", grassCanvas);

    // 2. Cobblestone / Dirt Path Tile (32x32)
    const pathCanvas = document.createElement("canvas");
    pathCanvas.width = 32;
    pathCanvas.height = 32;
    const pCtx = pathCanvas.getContext("2d")!;
    pCtx.fillStyle = "#c2a677";
    pCtx.fillRect(0, 0, 32, 32);
    pCtx.fillStyle = "#b59869";
    pCtx.fillRect(2, 2, 12, 10);
    pCtx.fillRect(18, 4, 12, 12);
    pCtx.fillRect(6, 18, 14, 10);
    pCtx.fillStyle = "#dfc89d";
    pCtx.fillRect(3, 3, 4, 3);
    pCtx.fillRect(20, 6, 5, 4);
    pCtx.fillStyle = "#9c7f53";
    pCtx.strokeRect(0.5, 0.5, 31, 31);
    this.textures.addCanvas("tile_path", pathCanvas);

    // 3. Water Tile (32x32)
    const waterCanvas = document.createElement("canvas");
    waterCanvas.width = 32;
    waterCanvas.height = 32;
    const wCtx = waterCanvas.getContext("2d")!;
    wCtx.fillStyle = "#1e40af";
    wCtx.fillRect(0, 0, 32, 32);
    wCtx.fillStyle = "#3b82f6";
    wCtx.fillRect(4, 6, 14, 3);
    wCtx.fillRect(16, 18, 12, 3);
    wCtx.fillStyle = "#93c5fd";
    wCtx.fillRect(6, 7, 6, 1);
    wCtx.fillRect(18, 19, 5, 1);
    this.textures.addCanvas("tile_water", waterCanvas);

    // 4. Oak Tree (64x80)
    const treeCanvas = document.createElement("canvas");
    treeCanvas.width = 64;
    treeCanvas.height = 80;
    const tCtx = treeCanvas.getContext("2d")!;
    // Shadow
    tCtx.fillStyle = "rgba(0,0,0,0.25)";
    tCtx.beginPath();
    tCtx.ellipse(32, 72, 24, 7, 0, 0, Math.PI * 2);
    tCtx.fill();
    // Trunk
    tCtx.fillStyle = "#5c3d2e";
    tCtx.fillRect(26, 42, 12, 32);
    tCtx.fillStyle = "#42281d";
    tCtx.fillRect(26, 42, 4, 32);
    // Leaves (Layers of green circles)
    tCtx.fillStyle = "#166534";
    tCtx.beginPath();
    tCtx.arc(32, 36, 26, 0, Math.PI * 2);
    tCtx.fill();
    tCtx.fillStyle = "#15803d";
    tCtx.beginPath();
    tCtx.arc(32, 28, 22, 0, Math.PI * 2);
    tCtx.fill();
    tCtx.fillStyle = "#22c55e";
    tCtx.beginPath();
    tCtx.arc(28, 22, 14, 0, Math.PI * 2);
    tCtx.fill();
    this.textures.addCanvas("tree_oak", treeCanvas);

    // 5. Rock (32x26)
    const rockCanvas = document.createElement("canvas");
    rockCanvas.width = 32;
    rockCanvas.height = 26;
    const rCtx = rockCanvas.getContext("2d")!;
    rCtx.fillStyle = "#64748b";
    rCtx.beginPath();
    rCtx.ellipse(16, 14, 14, 10, 0, 0, Math.PI * 2);
    rCtx.fill();
    rCtx.fillStyle = "#94a3b8";
    rCtx.beginPath();
    rCtx.ellipse(13, 11, 8, 5, 0, 0, Math.PI * 2);
    rCtx.fill();
    rCtx.fillStyle = "#334155";
    rCtx.fillRect(8, 20, 16, 3);
    this.textures.addCanvas("rock", rockCanvas);

    // 6. Player Sprite Sheet (32x32 per frame, 4 directions x 3 frames = 12 frames, width 96, height 128)
    // Row 0: Down (frames 0, 1, 2)
    // Row 1: Left (frames 3, 4, 5)
    // Row 2: Right (frames 6, 7, 8)
    // Row 3: Up (frames 9, 10, 11)
    const pSheetCanvas = document.createElement("canvas");
    pSheetCanvas.width = 96;
    pSheetCanvas.height = 128;
    const psCtx = pSheetCanvas.getContext("2d")!;

    for (let row = 0; row < 4; row++) {
      for (let col = 0; col < 3; col++) {
        const ox = col * 32;
        const oy = row * 32;
        const legOffset = col === 1 ? -2 : col === 2 ? 2 : 0;

        // Shadow
        psCtx.fillStyle = "rgba(0,0,0,0.2)";
        psCtx.beginPath();
        psCtx.ellipse(ox + 16, oy + 29, 9, 3, 0, 0, Math.PI * 2);
        psCtx.fill();

        // Boots / Legs
        psCtx.fillStyle = "#1e293b";
        psCtx.fillRect(ox + 10 + legOffset, oy + 23, 5, 7);
        psCtx.fillRect(ox + 17 - legOffset, oy + 23, 5, 7);

        // Body / Tunic (Cyan/Blue Developer Hood)
        psCtx.fillStyle = "#0284c7";
        psCtx.fillRect(ox + 9, oy + 14, 14, 10);
        // Belt
        psCtx.fillStyle = "#d97706";
        psCtx.fillRect(ox + 9, oy + 20, 14, 2);

        // Head / Skin
        psCtx.fillStyle = "#fbcfe8";
        psCtx.fillRect(ox + 10, oy + 6, 12, 9);

        // Hair / Cap (Dark developer hair)
        psCtx.fillStyle = "#1e1b4b";
        psCtx.fillRect(ox + 9, oy + 4, 14, 5);

        // Face details depending on row direction
        if (row === 0) {
          // Down: eyes visible
          psCtx.fillStyle = "#0f172a";
          psCtx.fillRect(ox + 12, oy + 9, 2, 2);
          psCtx.fillRect(ox + 18, oy + 9, 2, 2);
        } else if (row === 1) {
          // Left: eye on left
          psCtx.fillStyle = "#0f172a";
          psCtx.fillRect(ox + 11, oy + 9, 2, 2);
        } else if (row === 2) {
          // Right: eye on right
          psCtx.fillStyle = "#0f172a";
          psCtx.fillRect(ox + 19, oy + 9, 2, 2);
        } else if (row === 3) {
          // Up: full hair back
          psCtx.fillStyle = "#1e1b4b";
          psCtx.fillRect(ox + 9, oy + 5, 14, 8);
        }
      }
    }
    const playerTexture = this.textures.addCanvas("player", pSheetCanvas);
    if (playerTexture) {
      for (let row = 0; row < 4; row++) {
        for (let col = 0; col < 3; col++) {
          const frameIdx = row * 3 + col;
          playerTexture.add(frameIdx, 0, col * 32, row * 32, 32, 32);
        }
      }
    }

    // 7. NPC Damianus Sprite (32x32)
    const npcDamCanvas = document.createElement("canvas");
    npcDamCanvas.width = 32;
    npcDamCanvas.height = 32;
    const ndCtx = npcDamCanvas.getContext("2d")!;
    ndCtx.fillStyle = "rgba(0,0,0,0.25)";
    ndCtx.beginPath();
    ndCtx.ellipse(16, 29, 9, 3, 0, 0, Math.PI * 2);
    ndCtx.fill();
    ndCtx.fillStyle = "#1e293b";
    ndCtx.fillRect(11, 23, 4, 7);
    ndCtx.fillRect(17, 23, 4, 7);
    // Creator Cloak / Wizard Robe
    ndCtx.fillStyle = "#4f46e5";
    ndCtx.fillRect(9, 13, 14, 11);
    ndCtx.fillStyle = "#f59e0b";
    ndCtx.fillRect(14, 13, 4, 11);
    // Face
    ndCtx.fillStyle = "#fcd34d";
    ndCtx.fillRect(10, 6, 12, 8);
    // Developer Glasses
    ndCtx.fillStyle = "#0f172a";
    ndCtx.strokeRect(11.5, 8.5, 3, 3);
    ndCtx.strokeRect(17.5, 8.5, 3, 3);
    // Hair
    ndCtx.fillStyle = "#18181b";
    ndCtx.fillRect(9, 3, 14, 5);
    this.textures.addCanvas("npc_damianus", npcDamCanvas);

    // 8. NPC Guide Sprite (32x32)
    const npcGuideCanvas = document.createElement("canvas");
    npcGuideCanvas.width = 32;
    npcGuideCanvas.height = 32;
    const ngCtx = npcGuideCanvas.getContext("2d")!;
    ngCtx.fillStyle = "#166534";
    ngCtx.fillRect(10, 14, 12, 10);
    ngCtx.fillStyle = "#fed7aa";
    ngCtx.fillRect(11, 7, 10, 8);
    ngCtx.fillStyle = "#b45309";
    ngCtx.fillRect(10, 4, 12, 5);
    this.textures.addCanvas("npc_guide", npcGuideCanvas);

    // 9. NPC Academy Mentor (32x32)
    const npcMentorCanvas = document.createElement("canvas");
    npcMentorCanvas.width = 32;
    npcMentorCanvas.height = 32;
    const nmCtx = npcMentorCanvas.getContext("2d")!;
    nmCtx.fillStyle = "#7c3aed";
    nmCtx.fillRect(10, 14, 12, 10);
    nmCtx.fillStyle = "#fed7aa";
    nmCtx.fillRect(11, 8, 10, 7);
    // Scholar Mortarboard Cap
    nmCtx.fillStyle = "#1e1b4b";
    nmCtx.fillRect(7, 4, 18, 4);
    nmCtx.fillStyle = "#fbbf24";
    nmCtx.fillRect(20, 6, 2, 4);
    this.textures.addCanvas("npc_mentor", npcMentorCanvas);

    // 10. Building: Home Village Cottage (120x100)
    const homeBldgCanvas = document.createElement("canvas");
    homeBldgCanvas.width = 120;
    homeBldgCanvas.height = 100;
    const hbCtx = homeBldgCanvas.getContext("2d")!;
    // Shadow
    hbCtx.fillStyle = "rgba(0,0,0,0.3)";
    hbCtx.fillRect(4, 90, 112, 8);
    // Wall
    hbCtx.fillStyle = "#d4b996";
    hbCtx.fillRect(10, 40, 100, 52);
    // Roof (Terracotta)
    hbCtx.fillStyle = "#b91c1c";
    hbCtx.beginPath();
    hbCtx.moveTo(4, 42);
    hbCtx.lineTo(60, 6);
    hbCtx.lineTo(116, 42);
    hbCtx.closePath();
    hbCtx.fill();
    hbCtx.fillStyle = "#991b1b";
    hbCtx.fillRect(6, 38, 108, 5);
    // Door
    hbCtx.fillStyle = "#5c3d2e";
    hbCtx.fillRect(48, 62, 24, 30);
    hbCtx.fillStyle = "#fbbf24";
    hbCtx.fillRect(66, 76, 3, 3);
    // Windows with warm light
    hbCtx.fillStyle = "#fef08a";
    hbCtx.fillRect(20, 56, 16, 16);
    hbCtx.fillRect(84, 56, 16, 16);
    hbCtx.fillStyle = "#78350f";
    hbCtx.strokeRect(20, 56, 16, 16);
    hbCtx.strokeRect(84, 56, 16, 16);
    this.textures.addCanvas("building_home", homeBldgCanvas);

    // 11. Building: Academy of Amikom (140x110)
    const acadCanvas = document.createElement("canvas");
    acadCanvas.width = 140;
    acadCanvas.height = 110;
    const acCtx = acadCanvas.getContext("2d")!;
    // Shadow
    acCtx.fillStyle = "rgba(0,0,0,0.3)";
    acCtx.fillRect(6, 100, 128, 8);
    // Stone Wall
    acCtx.fillStyle = "#e2e8f0";
    acCtx.fillRect(14, 38, 112, 64);
    // Pediment Roof
    acCtx.fillStyle = "#1e3a8a";
    acCtx.beginPath();
    acCtx.moveTo(10, 40);
    acCtx.lineTo(70, 8);
    acCtx.lineTo(130, 40);
    acCtx.closePath();
    acCtx.fill();
    // Columns
    acCtx.fillStyle = "#cbd5e1";
    acCtx.fillRect(24, 48, 10, 54);
    acCtx.fillRect(50, 48, 10, 54);
    acCtx.fillRect(80, 48, 10, 54);
    acCtx.fillRect(106, 48, 10, 54);
    // Entrance
    acCtx.fillStyle = "#0f172a";
    acCtx.fillRect(58, 66, 24, 36);
    // Academy Sign banner
    acCtx.fillStyle = "#fbbf24";
    acCtx.fillRect(36, 42, 68, 10);
    acCtx.fillStyle = "#0f172a";
    acCtx.font = "bold 7px sans-serif";
    acCtx.textAlign = "center";
    acCtx.fillText("ACADEMY", 70, 50);
    this.textures.addCanvas("building_academy", acadCanvas);

    // 12. Building: Project Laboratory (140x110)
    const labCanvas = document.createElement("canvas");
    labCanvas.width = 140;
    labCanvas.height = 110;
    const lbCtx = labCanvas.getContext("2d")!;
    // Sci-fi / Tech Lab Wall
    lbCtx.fillStyle = "rgba(0,0,0,0.3)";
    lbCtx.fillRect(6, 100, 128, 8);
    lbCtx.fillStyle = "#1e293b";
    lbCtx.fillRect(14, 38, 112, 64);
    // Roof with solar panels
    lbCtx.fillStyle = "#0f172a";
    lbCtx.fillRect(10, 22, 120, 20);
    lbCtx.fillStyle = "#0284c7";
    lbCtx.fillRect(20, 25, 30, 14);
    lbCtx.fillRect(55, 25, 30, 14);
    lbCtx.fillRect(90, 25, 30, 14);
    // Glowing Cyber Door
    lbCtx.fillStyle = "#06b6d4";
    lbCtx.fillRect(56, 64, 28, 38);
    lbCtx.fillStyle = "#e0f2fe";
    lbCtx.fillRect(60, 68, 20, 12);
    // Neon Cables / details
    lbCtx.fillStyle = "#22c55e";
    lbCtx.fillRect(22, 54, 20, 8);
    lbCtx.fillRect(98, 54, 20, 8);
    // Laboratory Label
    lbCtx.fillStyle = "#38bdf8";
    lbCtx.font = "bold 8px monospace";
    lbCtx.textAlign = "center";
    lbCtx.fillText("PROJECT_LAB", 70, 52);
    this.textures.addCanvas("building_lab", labCanvas);

    // 13. Building: Achievement Hall (140x110)
    const hallCanvas = document.createElement("canvas");
    hallCanvas.width = 140;
    hallCanvas.height = 110;
    const hlCtx = hallCanvas.getContext("2d")!;
    hlCtx.fillStyle = "rgba(0,0,0,0.3)";
    hlCtx.fillRect(6, 100, 128, 8);
    hlCtx.fillStyle = "#fef3c7";
    hlCtx.fillRect(14, 40, 112, 62);
    hlCtx.fillStyle = "#b45309";
    hlCtx.beginPath();
    hlCtx.moveTo(10, 42);
    hlCtx.lineTo(70, 10);
    hlCtx.lineTo(130, 42);
    hlCtx.closePath();
    hlCtx.fill();
    // Golden Trophy Emblem
    hlCtx.fillStyle = "#f59e0b";
    hlCtx.beginPath();
    hlCtx.arc(70, 30, 8, 0, Math.PI * 2);
    hlCtx.fill();
    hlCtx.fillStyle = "#78350f";
    hlCtx.fillRect(58, 66, 24, 36);
    this.textures.addCanvas("building_hall", hallCanvas);

    // 14. Building: Communication Tower (60x120)
    const towerCanvas = document.createElement("canvas");
    towerCanvas.width = 60;
    towerCanvas.height = 120;
    const twCtx = towerCanvas.getContext("2d")!;
    // Steel Lattice Mast
    twCtx.strokeStyle = "#94a3b8";
    twCtx.lineWidth = 3;
    twCtx.beginPath();
    twCtx.moveTo(15, 110);
    twCtx.lineTo(30, 20);
    twCtx.lineTo(45, 110);
    twCtx.stroke();
    // Crossbars
    twCtx.beginPath();
    twCtx.moveTo(20, 90);
    twCtx.lineTo(40, 90);
    twCtx.moveTo(23, 70);
    twCtx.lineTo(37, 70);
    twCtx.moveTo(26, 50);
    twCtx.lineTo(34, 50);
    twCtx.stroke();
    // Satellite dish
    twCtx.fillStyle = "#cbd5e1";
    twCtx.beginPath();
    twCtx.arc(30, 35, 12, Math.PI, 0);
    twCtx.fill();
    // Blinking red beacon light at top
    twCtx.fillStyle = "#ef4444";
    twCtx.beginPath();
    twCtx.arc(30, 16, 5, 0, Math.PI * 2);
    twCtx.fill();
    this.textures.addCanvas("building_tower", towerCanvas);

    // 15. Computer Terminal Desk (32x34)
    const pcCanvas = document.createElement("canvas");
    pcCanvas.width = 32;
    pcCanvas.height = 34;
    const pcCtx = pcCanvas.getContext("2d")!;
    // Desk
    pcCtx.fillStyle = "#475569";
    pcCtx.fillRect(4, 18, 24, 14);
    // Monitor
    pcCtx.fillStyle = "#0f172a";
    pcCtx.fillRect(8, 4, 16, 13);
    // Glowing Screen (Cyan)
    pcCtx.fillStyle = "#06b6d4";
    pcCtx.fillRect(10, 6, 12, 9);
    pcCtx.fillStyle = "#ffffff";
    pcCtx.fillRect(12, 8, 4, 1);
    pcCtx.fillRect(12, 10, 6, 1);
    this.textures.addCanvas("terminal_pc", pcCanvas);

    // 16. Tech Altar / Shrine (40x44)
    const altarCanvas = document.createElement("canvas");
    altarCanvas.width = 40;
    altarCanvas.height = 44;
    const alCtx = altarCanvas.getContext("2d")!;
    alCtx.fillStyle = "#334155";
    alCtx.fillRect(6, 24, 28, 18);
    alCtx.fillStyle = "#64748b";
    alCtx.fillRect(4, 20, 32, 6);
    // Floating Orb
    alCtx.fillStyle = "#38bdf8";
    alCtx.beginPath();
    alCtx.arc(20, 12, 8, 0, Math.PI * 2);
    alCtx.fill();
    alCtx.fillStyle = "#ffffff";
    alCtx.beginPath();
    alCtx.arc(18, 10, 3, 0, Math.PI * 2);
    alCtx.fill();
    this.textures.addCanvas("tech_altar", altarCanvas);

    // 17. Knowledge Crystal (20x26)
    const cryCanvas = document.createElement("canvas");
    cryCanvas.width = 20;
    cryCanvas.height = 26;
    const cCtx = cryCanvas.getContext("2d")!;
    cCtx.fillStyle = "#a855f7";
    cCtx.beginPath();
    cCtx.moveTo(10, 2);
    cCtx.lineTo(18, 10);
    cCtx.lineTo(10, 24);
    cCtx.lineTo(2, 10);
    cCtx.closePath();
    cCtx.fill();
    cCtx.fillStyle = "#f3e8ff";
    cCtx.beginPath();
    cCtx.moveTo(10, 4);
    cCtx.lineTo(14, 10);
    cCtx.lineTo(10, 18);
    cCtx.lineTo(6, 10);
    cCtx.closePath();
    cCtx.fill();
    this.textures.addCanvas("crystal", cryCanvas);

    // 18. Wooden Signpost (24x28)
    const signCanvas = document.createElement("canvas");
    signCanvas.width = 24;
    signCanvas.height = 28;
    const sCtx = signCanvas.getContext("2d")!;
    sCtx.fillStyle = "#78350f";
    sCtx.fillRect(10, 14, 4, 14);
    sCtx.fillStyle = "#d97706";
    sCtx.fillRect(2, 4, 20, 12);
    sCtx.fillStyle = "#451a03";
    sCtx.fillRect(5, 7, 14, 2);
    sCtx.fillRect(5, 11, 10, 2);
    this.textures.addCanvas("signpost", signCanvas);

    // 19. Legendary Coffee Machine (26x32)
    const coffeeCanvas = document.createElement("canvas");
    coffeeCanvas.width = 26;
    coffeeCanvas.height = 32;
    const cfCtx = coffeeCanvas.getContext("2d")!;
    cfCtx.fillStyle = "#1e293b";
    cfCtx.fillRect(3, 10, 20, 20);
    cfCtx.fillStyle = "#d97706";
    cfCtx.fillRect(5, 4, 16, 8);
    cfCtx.fillStyle = "#ef4444";
    cfCtx.fillRect(19, 14, 3, 3);
    cfCtx.fillStyle = "#ffffff";
    cfCtx.fillRect(8, 22, 10, 7);
    this.textures.addCanvas("coffee_machine", coffeeCanvas);

    // 20. Mainframe Cyber Server (44x46)
    const mfCanvas = document.createElement("canvas");
    mfCanvas.width = 44;
    mfCanvas.height = 46;
    const mfCtx = mfCanvas.getContext("2d")!;
    mfCtx.fillStyle = "#090d16";
    mfCtx.fillRect(4, 8, 36, 36);
    mfCtx.fillStyle = "#0284c7";
    mfCtx.fillRect(8, 12, 28, 12);
    mfCtx.fillStyle = "#10b981";
    mfCtx.fillRect(8, 28, 6, 2);
    mfCtx.fillRect(18, 28, 6, 2);
    mfCtx.fillRect(28, 28, 6, 2);
    mfCtx.fillStyle = "#f59e0b";
    mfCtx.fillRect(8, 34, 12, 2);
    this.textures.addCanvas("mainframe_terminal", mfCanvas);
  }

  private createPlayerAnimations() {
    this.anims.create({
      key: "walk_down",
      frames: this.anims.generateFrameNumbers("player", { start: 0, end: 2 }),
      frameRate: 8,
      repeat: -1,
    });
    this.anims.create({
      key: "idle_down",
      frames: [{ key: "player", frame: 0 }],
      frameRate: 1,
    });

    this.anims.create({
      key: "walk_left",
      frames: this.anims.generateFrameNumbers("player", { start: 3, end: 5 }),
      frameRate: 8,
      repeat: -1,
    });
    this.anims.create({
      key: "idle_left",
      frames: [{ key: "player", frame: 3 }],
      frameRate: 1,
    });

    this.anims.create({
      key: "walk_right",
      frames: this.anims.generateFrameNumbers("player", { start: 6, end: 8 }),
      frameRate: 8,
      repeat: -1,
    });
    this.anims.create({
      key: "idle_right",
      frames: [{ key: "player", frame: 6 }],
      frameRate: 1,
    });

    this.anims.create({
      key: "walk_up",
      frames: this.anims.generateFrameNumbers("player", { start: 9, end: 11 }),
      frameRate: 8,
      repeat: -1,
    });
    this.anims.create({
      key: "idle_up",
      frames: [{ key: "player", frame: 9 }],
      frameRate: 1,
    });
  }
}
