import UIFactory from "../managers/UIFactory.js";
import { GAME_HEIGHT, GAME_WIDTH } from "../Constants.js";

export default class ResultScene extends Phaser.Scene {
  constructor() {
    super("ResultScene");
  }

  init(data) {
    this.earned = data.earned ?? 0;
    this.total = data.total ?? 0;
  }

  create() {
    this.add
      .text(GAME_WIDTH / 2, 200, "RESULT", {
        fontSize: "54px",
        color: "#f5f5ff",
        fontStyle: "800",
      })
      .setOrigin(0.5);

    UIFactory.createLabel(this, {
      x: GAME_WIDTH / 2,
      y: 320,
      label: `Earned: ${this.earned} gold`,
      size: 28,
    });

    UIFactory.createLabel(this, {
      x: GAME_WIDTH / 2,
      y: 370,
      label: `Total: ${this.total} gold`,
      size: 24,
    });

    UIFactory.createButton(this, {
      x: GAME_WIDTH / 2,
      y: GAME_HEIGHT / 2 + 80,
      label: "UPGRADE",
      onClick: () => this.scene.start("ShopScene"),
    });

    UIFactory.createButton(this, {
      x: GAME_WIDTH / 2,
      y: GAME_HEIGHT / 2 + 180,
      label: "PLAY AGAIN",
      onClick: () => this.scene.start("GameScene"),
    });
  }
}
