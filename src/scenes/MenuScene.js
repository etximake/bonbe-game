import dataManager from "../managers/DataManager.js";
import UIFactory from "../managers/UIFactory.js";
import { GAME_HEIGHT, GAME_WIDTH } from "../Constants.js";

export default class MenuScene extends Phaser.Scene {
  constructor() {
    super("MenuScene");
  }

  create() {
    this.add
      .text(GAME_WIDTH / 2, 180, "IDLE AXE", {
        fontSize: "64px",
        color: "#f5f5ff",
        fontStyle: "800",
      })
      .setOrigin(0.5);

    UIFactory.createLabel(this, {
      x: GAME_WIDTH / 2,
      y: 270,
      label: `Gold: ${dataManager.state.gold}`,
      size: 26,
    });

    UIFactory.createButton(this, {
      x: GAME_WIDTH / 2,
      y: GAME_HEIGHT / 2 - 40,
      label: "PLAY",
      onClick: () => this.scene.start("GameScene"),
    });

    UIFactory.createButton(this, {
      x: GAME_WIDTH / 2,
      y: GAME_HEIGHT / 2 + 80,
      label: "SHOP",
      onClick: () => this.scene.start("ShopScene"),
    });
  }
}
