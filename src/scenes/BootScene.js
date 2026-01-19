import dataManager from "../managers/DataManager.js";

export default class BootScene extends Phaser.Scene {
  constructor() {
    super("BootScene");
  }

  preload() {
    this.load.json("items", "assets/data/items.json");
  }

  create() {
    const items = this.cache.json.get("items") ?? [];
    dataManager.loadItems(items);
    dataManager.loadState();

    this.createPlaceholderTextures(items);
    this.createTargetTextures();

    this.scene.start("MenuScene");
  }

  createPlaceholderTextures(items) {
    items.forEach((item) => {
      if (this.textures.exists(item.textureKey)) {
        return;
      }

      const graphics = this.add.graphics();
      graphics.fillStyle(item.color ?? 0x9ea0ff, 1);
      graphics.fillRoundedRect(0, 0, 140, 140, 24);
      graphics.lineStyle(6, 0xffffff, 0.4);
      graphics.strokeRoundedRect(0, 0, 140, 140, 24);
      graphics.generateTexture(item.textureKey, 140, 140);
      graphics.destroy();
    });
  }

  createTargetTextures() {
    const targets = [
      { key: "target_log", color: 0x9c6b3c },
      { key: "target_stone", color: 0x6d7b89 },
    ];

    targets.forEach((target) => {
      if (this.textures.exists(target.key)) {
        return;
      }

      const graphics = this.add.graphics();
      graphics.fillStyle(target.color, 1);
      graphics.fillRoundedRect(0, 0, 260, 220, 36);
      graphics.lineStyle(6, 0xffffff, 0.25);
      graphics.strokeRoundedRect(0, 0, 260, 220, 36);
      graphics.generateTexture(target.key, 260, 220);
      graphics.destroy();
    });
  }
}
