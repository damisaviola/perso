import Phaser from "phaser";
import { GAME_DEVELOPER_DATA, ProjectDetail, SkillItem } from "@/lib/game/gameData";
import { gameAudio } from "@/lib/game/gameAudio";

export interface InteractableEntity {
  id: string;
  name: string;
  type: "npc" | "building" | "terminal" | "altar" | "tower" | "sign" | "puzzle";
  x: number;
  y: number;
  data?: any;
}

export class WorldScene extends Phaser.Scene {
  private player!: Phaser.Types.Physics.Arcade.SpriteWithDynamicBody;
  private cursors!: Phaser.Types.Input.Keyboard.CursorKeys;
  private keyW!: Phaser.Input.Keyboard.Key;
  private keyA!: Phaser.Input.Keyboard.Key;
  private keyS!: Phaser.Input.Keyboard.Key;
  private keyD!: Phaser.Input.Keyboard.Key;
  private keyE!: Phaser.Input.Keyboard.Key;
  private keyEnter!: Phaser.Input.Keyboard.Key;
  private keyEsc!: Phaser.Input.Keyboard.Key;
  private keyShift!: Phaser.Input.Keyboard.Key;
  private keySpace!: Phaser.Input.Keyboard.Key;

  private obstaclesGroup!: Phaser.Physics.Arcade.StaticGroup;
  private crystalsGroup!: Phaser.Physics.Arcade.Group;
  private interactables: InteractableEntity[] = [];
  private activeNearbyEntity: InteractableEntity | null = null;

  private interactPromptText!: Phaser.GameObjects.Text;
  private lastFootstepTime: number = 0;
  private isMovementPaused: boolean = false;
  private mobileInput: { x: number; y: number } = { x: 0, y: 0 };

  // Dash & Speed Mechanics
  private isDashing: boolean = false;
  private dashCooldownEnd: number = 0;
  private hasCoffeeBoost: boolean = false;
  private lastCoordEmitTime: number = 0;

  // Callbacks hooked by React
  public onEventEmit?: (event: string, payload?: any) => void;

  constructor() {
    super({ key: "WorldScene" });
  }

  create() {
    const worldWidth = 2200;
    const worldHeight = 1600;

    // Set world physics bounds
    this.physics.world.setBounds(0, 0, worldWidth, worldHeight);

    // 1. Obstacles Group (Must be initialized before buildTerrain adds obstacles)
    this.obstaclesGroup = this.physics.add.staticGroup();

    // 2. Build Tiled Ground
    this.buildTerrain(worldWidth, worldHeight);

    // 3. Build Town & Landmarks
    this.buildLocations();

    // 4. Place Collectibles (Knowledge Crystals)
    this.buildCollectibles();

    // 5. Create Player
    this.createPlayer();

    // 6. Setup Camera
    this.cameras.main.setBounds(0, 0, worldWidth, worldHeight);
    this.cameras.main.startFollow(this.player, true, 0.08, 0.08);
    this.cameras.main.setZoom(1.2);

    // 7. Setup Inputs
    this.setupInputHandlers();

    // 8. Create Floating Prompt
    this.interactPromptText = this.add.text(0, 0, "[E] INTERACT", {
      fontFamily: "monospace",
      fontSize: "10px",
      color: "#ffffff",
      backgroundColor: "#0284c7",
      padding: { x: 5, y: 3 },
    });
    this.interactPromptText.setOrigin(0.5, 1);
    this.interactPromptText.setDepth(100);
    this.interactPromptText.setVisible(false);

    // Notify React that the world has initialized
    if (this.onEventEmit) {
      this.onEventEmit("game-ready", {
        playerPosition: { x: this.player.x, y: this.player.y },
      });
    }
  }

  private buildTerrain(width: number, height: number) {
    // Fill full map with grass
    for (let x = 0; x < width; x += 32) {
      for (let y = 0; y < height; y += 32) {
        this.add.image(x + 16, y + 16, "tile_grass").setDepth(0);
      }
    }

    // Horizontal main paths
    // Path 1 (North): connecting Home Village (400) -> Academy (1100) -> Achievement Hall (1700) at Y=480
    for (let x = 200; x <= 1900; x += 32) {
      this.add.image(x + 16, 480, "tile_path").setDepth(1);
      this.add.image(x + 16, 512, "tile_path").setDepth(1);
    }

    // Path 2 (South): connecting Skill Forest (400) -> Project Lab (1100) -> Comm Tower (1700) at Y=1180
    for (let x = 200; x <= 1900; x += 32) {
      this.add.image(x + 16, 1180, "tile_path").setDepth(1);
      this.add.image(x + 16, 1212, "tile_path").setDepth(1);
    }

    // Vertical connecting avenues
    // West Avenue at X=400 (Home to Skill Forest)
    for (let y = 480; y <= 1200; y += 32) {
      this.add.image(400, y + 16, "tile_path").setDepth(1);
      this.add.image(432, y + 16, "tile_path").setDepth(1);
    }

    // Central Grand Boulevard at X=1100 (Academy to Project Lab)
    for (let y = 480; y <= 1200; y += 32) {
      this.add.image(1100, y + 16, "tile_path").setDepth(1);
      this.add.image(1132, y + 16, "tile_path").setDepth(1);
    }

    // East Highway at X=1700 (Achievement Hall to Comm Tower)
    for (let y = 480; y <= 1200; y += 32) {
      this.add.image(1700, y + 16, "tile_path").setDepth(1);
      this.add.image(1732, y + 16, "tile_path").setDepth(1);
    }

    // Central Water Fountain Plaza at (1116, 840)
    for (let px = 1050; px <= 1180; px += 32) {
      for (let py = 780; py <= 900; py += 32) {
        this.add.image(px, py, "tile_path").setDepth(1);
      }
    }
    // Fountain Pool in center
    const waterPool = this.add.image(1116, 840, "tile_water").setScale(2).setDepth(2);
    // Obstacle around fountain
    const fRock = this.obstaclesGroup.create(1116, 840, "rock").setScale(1.2).refreshBody();
    fRock.setDepth(3);

    // Decorative Forest Borders
    for (let x = 32; x < width; x += 64) {
      this.obstaclesGroup.create(x, 40, "tree_oak").setDepth(10);
      this.obstaclesGroup.create(x, height - 40, "tree_oak").setDepth(height);
    }
    for (let y = 32; y < height; y += 64) {
      this.obstaclesGroup.create(40, y, "tree_oak").setDepth(y);
      this.obstaclesGroup.create(width - 40, y, "tree_oak").setDepth(y);
    }
  }

  private buildLocations() {
    // -------------------------------------------------------------
    // LOCATION 1: HOME VILLAGE (ABOUT ME) - Around (400, 380)
    // -------------------------------------------------------------
    const homeHouse = this.obstaclesGroup.create(400, 360, "building_home");
    homeHouse.body.setSize(100, 45).setOffset(10, 50);
    homeHouse.setDepth(370);

    // NPC Damianus
    const damianusSprite = this.add.image(430, 420, "npc_damianus").setDepth(420);
    this.interactables.push({
      id: "npc_damianus",
      name: "Damianus Saviola (Creator)",
      type: "npc",
      x: 430,
      y: 420,
      data: GAME_DEVELOPER_DATA.npcDialogues.damianus,
    });

    // Signpost
    const homeSign = this.obstaclesGroup.create(340, 420, "signpost").setDepth(420);
    this.interactables.push({
      id: "sign_home",
      name: "Home Village Notice Board",
      type: "sign",
      x: 340,
      y: 420,
      data: {
        title: "Home Village Notice Board",
        pages: [
          "Selamat datang di Home Village! Di sinilah tempat tinggal Damianus Saviola Maturbongs.",
          "Damianus adalah lulusan S1 Sistem Informasi (Digital Bisnis) dengan IPK 3.88/4.00 dari Yogyakarta.",
          "Arah Timur (kanan): Academy & Achievement Hall. Arah Selatan (bawah): Skill Forest & Project Laboratory.",
        ],
      },
    });

    // Elder Guide at intersection (650, 480)
    this.add.image(650, 480, "npc_guide").setDepth(480);
    this.interactables.push({
      id: "npc_guide",
      name: "Elder Guide",
      type: "npc",
      x: 650,
      y: 480,
      data: GAME_DEVELOPER_DATA.npcDialogues.guide,
    });

    // -------------------------------------------------------------
    // LOCATION 2: ACADEMY (EDUCATION & ORGANIZATIONS) - Around (1100, 360)
    // -------------------------------------------------------------
    const acadBldg = this.obstaclesGroup.create(1100, 350, "building_academy");
    acadBldg.body.setSize(110, 50).setOffset(15, 55);
    acadBldg.setDepth(360);

    // NPC Professor
    this.add.image(1100, 420, "npc_mentor").setDepth(420);
    this.interactables.push({
      id: "npc_mentor",
      name: "Professor Amikom",
      type: "npc",
      x: 1100,
      y: 420,
      data: GAME_DEVELOPER_DATA.npcDialogues.academyMentor,
    });

    // Academy Entrance Trigger
    this.interactables.push({
      id: "loc_academy",
      name: "Academy Archives (Pendidikan & Organisasi)",
      type: "building",
      x: 1100,
      y: 390,
      data: GAME_DEVELOPER_DATA.locations.find((l) => l.id === "loc_academy"),
    });

    // -------------------------------------------------------------
    // LOCATION 3: ACHIEVEMENT HALL - Around (1700, 360)
    // -------------------------------------------------------------
    const hallBldg = this.obstaclesGroup.create(1700, 350, "building_hall");
    hallBldg.body.setSize(110, 50).setOffset(15, 55);
    hallBldg.setDepth(360);

    this.interactables.push({
      id: "loc_achievements",
      name: "Achievement Hall (Sertifikasi & Penghargaan)",
      type: "building",
      x: 1700,
      y: 390,
      data: GAME_DEVELOPER_DATA.locations.find((l) => l.id === "loc_achievements"),
    });

    // -------------------------------------------------------------
    // LOCATION 4: SKILL FOREST - Around (400, 1100)
    // -------------------------------------------------------------
    // Add lush oak trees and 4 Tech Altars
    const skillCategories = [
      { id: "altar_frontend", name: "Altar of Frontend Mastery", x: 330, y: 1040, cat: "Frontend" },
      { id: "altar_backend", name: "Altar of Backend Spells", x: 470, y: 1040, cat: "Backend" },
      { id: "altar_database", name: "Altar of Data Tomes", x: 330, y: 1140, cat: "Database" },
      { id: "altar_devops", name: "Altar of DevOps Relics", x: 470, y: 1140, cat: "Tools" },
    ];

    skillCategories.forEach((altar) => {
      const aObj = this.obstaclesGroup.create(altar.x, altar.y, "tech_altar");
      aObj.body.setSize(30, 25).setOffset(5, 18);
      aObj.setDepth(altar.y);

      const relatedSkills = GAME_DEVELOPER_DATA.skills.filter((s) => s.category === altar.cat);

      this.interactables.push({
        id: altar.id,
        name: altar.name,
        type: "altar",
        x: altar.x,
        y: altar.y,
        data: {
          title: altar.name,
          category: altar.cat,
          skills: relatedSkills,
        },
      });
    });

    // -------------------------------------------------------------
    // LOCATION 5: PROJECT LABORATORY - Around (1100, 1100)
    // -------------------------------------------------------------
    const labBldg = this.obstaclesGroup.create(1100, 1030, "building_lab");
    labBldg.body.setSize(110, 50).setOffset(15, 55);
    labBldg.setDepth(1030);

    // 6 Project Terminals arranged neatly inside the lab plaza
    const terminalPositions = [
      { x: 1010, y: 1100, projId: "lapor-masyarakat" },
      { x: 1100, y: 1100, projId: "futsal-booking" },
      { x: 1190, y: 1100, projId: "sikoskar" },
      { x: 1010, y: 1160, projId: "timverse" },
      { x: 1100, y: 1160, projId: "web-paroki" },
      { x: 1190, y: 1160, projId: "ormas-kesbangpol" },
    ];

    terminalPositions.forEach((pos, idx) => {
      const termObj = this.obstaclesGroup.create(pos.x, pos.y, "terminal_pc");
      termObj.body.setSize(24, 20).setOffset(4, 12);
      termObj.setDepth(pos.y);

      const project = GAME_DEVELOPER_DATA.projects.find((p) => p.id === pos.projId);

      this.interactables.push({
        id: `term_${pos.projId}`,
        name: `Terminal 0${idx + 1}: ${project?.name}`,
        type: "terminal",
        x: pos.x,
        y: pos.y,
        data: project,
      });
    });

    // Central Mainframe Server for Debug Puzzle Quest
    const mainframe = this.obstaclesGroup.create(1100, 1220, "mainframe_terminal");
    mainframe.body.setSize(40, 30).setOffset(2, 10);
    mainframe.setDepth(1220);
    this.interactables.push({
      id: "term_mainframe",
      name: "Central Mainframe (Debug Protocol)",
      type: "puzzle",
      x: 1100,
      y: 1220,
      data: GAME_DEVELOPER_DATA.debugPuzzle,
    });

    // Legendary Espresso Coffee Machine at Plaza Breakroom
    const coffee = this.obstaclesGroup.create(1116, 940, "coffee_machine");
    coffee.body.setSize(22, 20).setOffset(2, 10);
    coffee.setDepth(940);
    this.interactables.push({
      id: "obj_coffee",
      name: "Legendary Espresso Machine",
      type: "npc",
      x: 1116,
      y: 940,
      data: {
        npcName: "Espresso Fuel Station",
        role: "Developer Caffeine Altar",
        avatar: "☕",
        pages: [
          "Mesin kopi legendaris ini menyeduh espresso kental dari biji kopi Gayo & Flores pilihan.",
          "Kamu meminum secangkir espresso... Kecepatan reaksi meningkat! Kemampuan DASH [Shift/Space] kini terasa lebih gesit!",
          "Stamina debugging terisi penuh! Siap membasmi bug di Project Laboratory.",
        ],
      },
    });

    // -------------------------------------------------------------
    // LOCATION 6: COMMUNICATION TOWER - Around (1700, 1100)
    // -------------------------------------------------------------
    const towerBldg = this.obstaclesGroup.create(1700, 1060, "building_tower");
    towerBldg.body.setSize(40, 40).setOffset(10, 75);
    towerBldg.setDepth(1060);

    this.interactables.push({
      id: "loc_tower",
      name: "Communication Tower (Kontak & CV)",
      type: "tower",
      x: 1700,
      y: 1110,
      data: GAME_DEVELOPER_DATA.locations.find((l) => l.id === "loc_tower"),
    });

    // Extra natural scatter (rocks & trees)
    const scatters = [
      { x: 260, y: 460, type: "tree_oak" },
      { x: 520, y: 440, type: "tree_oak" },
      { x: 800, y: 380, type: "tree_oak" },
      { x: 1350, y: 420, type: "tree_oak" },
      { x: 1550, y: 400, type: "tree_oak" },
      { x: 850, y: 1120, type: "tree_oak" },
      { x: 1350, y: 1100, type: "tree_oak" },
      { x: 1550, y: 1150, type: "tree_oak" },
      { x: 600, y: 800, type: "rock" },
      { x: 1400, y: 750, type: "rock" },
      { x: 920, y: 650, type: "rock" },
    ];

    scatters.forEach((s) => {
      const obj = this.obstaclesGroup.create(s.x, s.y, s.type);
      if (s.type === "tree_oak") {
        obj.body.setSize(40, 24).setOffset(12, 52);
      }
      obj.setDepth(s.y);
    });
  }

  private buildCollectibles() {
    this.crystalsGroup = this.physics.add.group();

    GAME_DEVELOPER_DATA.collectibles.forEach((crystal) => {
      const cSprite = this.crystalsGroup.create(crystal.x, crystal.y, "crystal") as Phaser.Physics.Arcade.Sprite;
      cSprite.setData("itemData", crystal);
      cSprite.setDepth(crystal.y);

      // Bobbing floating animation
      this.tweens.add({
        targets: cSprite,
        y: crystal.y - 7,
        duration: 1100 + Math.random() * 400,
        yoyo: true,
        repeat: -1,
        ease: "Sine.easeInOut",
      });
    });
  }

  private createPlayer() {
    // Spawn player at Home Village (400, 460)
    this.player = this.physics.add.sprite(400, 460, "player", 0);
    this.player.body.setSize(18, 14);
    this.player.body.setOffset(7, 18);
    this.player.setCollideWorldBounds(true);
    this.player.setDepth(460);

    // Obstacle collision
    this.physics.add.collider(this.player, this.obstaclesGroup);

    // Collectibles overlap
    this.physics.add.overlap(this.player, this.crystalsGroup, (playerObj, crystalObj) => {
      const crystal = crystalObj as Phaser.Physics.Arcade.Sprite;
      const data = crystal.getData("itemData");
      if (data) {
        gameAudio.playCrystalPickup();
        crystal.destroy();
        if (this.onEventEmit) {
          this.onEventEmit("collect-item", data);
        }
      }
    });
  }

  private setupInputHandlers() {
    if (!this.input.keyboard) return;
    this.cursors = this.input.keyboard.createCursorKeys();
    this.keyW = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.W);
    this.keyA = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.A);
    this.keyS = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.S);
    this.keyD = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.D);
    this.keyE = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.E);
    this.keyEnter = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.ENTER);
    this.keyEsc = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.ESC);
    this.keyShift = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.SHIFT);
    this.keySpace = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.SPACE);

    // Interaction key listeners
    const handleInteractPress = () => {
      if (this.isMovementPaused) return;
      this.triggerInteraction();
    };

    this.keyE.on("down", handleInteractPress);
    this.keyEnter.on("down", handleInteractPress);

    // Dash key listeners
    const handleDashPress = () => {
      if (this.isMovementPaused) return;
      this.performDash();
    };

    this.keyShift.on("down", handleDashPress);
    this.keySpace.on("down", handleDashPress);

    this.keyEsc.on("down", () => {
      if (this.onEventEmit) {
        this.onEventEmit("toggle-pause");
      }
    });
  }

  // Dash sprint with ghost particles
  public performDash() {
    const now = this.time.now;
    if (this.isDashing || now < this.dashCooldownEnd) return;

    this.isDashing = true;
    this.dashCooldownEnd = now + (this.hasCoffeeBoost ? 400 : 550);
    gameAudio.playDash();

    if (this.player) {
      const ghost = this.add.sprite(this.player.x, this.player.y, "player", this.player.frame.name);
      ghost.setAlpha(0.6).setDepth(this.player.depth - 1);
      this.tweens.add({
        targets: ghost,
        alpha: 0,
        scaleX: 1.25,
        scaleY: 1.25,
        duration: 200,
        onComplete: () => ghost.destroy(),
      });
    }

    this.time.delayedCall(220, () => {
      this.isDashing = false;
    });
  }

  public activateCoffeeBoost() {
    this.hasCoffeeBoost = true;
  }

  // Called when player presses E, Enter, or mobile interact button
  public triggerInteraction() {
    if (!this.activeNearbyEntity) return;
    gameAudio.playInteract();

    const entity = this.activeNearbyEntity;
    this.setMovementPaused(true);

    if (entity.id === "obj_coffee") {
      this.activateCoffeeBoost();
    }

    if (this.onEventEmit) {
      if (entity.type === "npc" || entity.type === "sign") {
        this.onEventEmit("open-dialogue", entity.data);
      } else if (entity.type === "terminal") {
        this.onEventEmit("open-project", entity.data);
      } else if (entity.type === "puzzle") {
        this.onEventEmit("open-puzzle", entity.data);
      } else if (entity.type === "altar") {
        this.onEventEmit("open-altar", entity.data);
      } else if (entity.type === "building" || entity.type === "tower") {
        this.onEventEmit("open-location", entity.data);
      }
    }
  }

  public setMovementPaused(paused: boolean) {
    this.isMovementPaused = paused;
    if (paused && this.player?.body) {
      this.player.body.setVelocity(0, 0);
      this.player.anims.stop();
    }
  }

  public setMobileMove(dx: number, dy: number) {
    this.mobileInput = { x: dx, y: dy };
  }

  public teleportPlayer(x: number, y: number) {
    if (this.player) {
      gameAudio.playInteract();

      // Departure flash
      const flash = this.add.circle(this.player.x, this.player.y, 25, 0x38bdf8, 0.8);
      flash.setDepth(this.player.depth + 1);
      this.tweens.add({
        targets: flash,
        scale: 2.2,
        alpha: 0,
        duration: 250,
        onComplete: () => flash.destroy(),
      });

      this.player.setPosition(x, y);

      // Arrival flash
      const arrival = this.add.circle(x, y, 25, 0x10b981, 0.8);
      arrival.setDepth(this.player.depth + 1);
      this.tweens.add({
        targets: arrival,
        scale: 2.2,
        alpha: 0,
        duration: 250,
        onComplete: () => arrival.destroy(),
      });
    }
  }

  update(time: number) {
    if (!this.player || !this.player.body) return;

    // Keep sprite depth sorted by Y coordinate for correct perspective
    this.player.setDepth(this.player.y);

    if (this.isMovementPaused) {
      this.player.body.setVelocity(0, 0);
      return;
    }

    // Movement calculation
    const baseSpeed = this.hasCoffeeBoost ? 165 : 145;
    const speed = this.isDashing ? baseSpeed * 1.9 : baseSpeed;
    let vx = 0;
    let vy = 0;

    // Desktop Keyboard Input
    if (this.cursors.left.isDown || this.keyA.isDown) vx -= speed;
    if (this.cursors.right.isDown || this.keyD.isDown) vx += speed;
    if (this.cursors.up.isDown || this.keyW.isDown) vy -= speed;
    if (this.cursors.down.isDown || this.keyS.isDown) vy += speed;

    // Mobile Virtual Joystick Input
    if (this.mobileInput.x !== 0 || this.mobileInput.y !== 0) {
      vx = this.mobileInput.x * speed;
      vy = this.mobileInput.y * speed;
    }

    // Normalize diagonal velocity
    if (vx !== 0 && vy !== 0) {
      vx *= 0.7071;
      vy *= 0.7071;
    }

    this.player.body.setVelocity(vx, vy);

    // Player Direction Animation
    if (vx !== 0 || vy !== 0) {
      if (Math.abs(vx) > Math.abs(vy)) {
        if (vx < 0) this.player.anims.play("walk_left", true);
        else this.player.anims.play("walk_right", true);
      } else {
        if (vy < 0) this.player.anims.play("walk_up", true);
        else this.player.anims.play("walk_down", true);
      }

      // Footstep sound throttled every 300ms
      if (time - this.lastFootstepTime > 300) {
        gameAudio.playFootstep();
        this.lastFootstepTime = time;
      }
    } else {
      this.player.anims.stop();
    }

    // Throttled Real-time Coordinate Broadcast for Minimap Radar (every 100ms)
    if (time - this.lastCoordEmitTime > 100) {
      this.lastCoordEmitTime = time;
      if (this.onEventEmit) {
        this.onEventEmit("player-move", {
          x: Math.round(this.player.x),
          y: Math.round(this.player.y),
        });
      }
    }

    // Check Proximity to Interactables
    this.checkProximity();
  }

  private checkProximity() {
    const px = this.player.x;
    const py = this.player.y;
    const interactRadius = 65;

    let closest: InteractableEntity | null = null;
    let closestDist = Infinity;

    for (const ent of this.interactables) {
      const dist = Phaser.Math.Distance.Between(px, py, ent.x, ent.y);
      if (dist < interactRadius && dist < closestDist) {
        closest = ent;
        closestDist = dist;
      }
    }

    if (closest !== this.activeNearbyEntity) {
      this.activeNearbyEntity = closest;
      if (closest) {
        this.interactPromptText.setText(`[E] ${closest.name}`);
        this.interactPromptText.setPosition(closest.x, closest.y - 30);
        this.interactPromptText.setVisible(true);

        if (this.onEventEmit) {
          this.onEventEmit("proximity-change", closest.name);
        }
      } else {
        this.interactPromptText.setVisible(false);
        if (this.onEventEmit) {
          this.onEventEmit("proximity-change", null);
        }
      }
    }
  }
}
