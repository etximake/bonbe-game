import dataManager from "../managers/DataManager.js";
import Axe from "../objects/Axe.js";
import Target from "../objects/Target.js";
import { GAME_DURATION_MS, GAME_HEIGHT, GAME_WIDTH } from "../Constants.js";

export default class GameScene extends Phaser.Scene {
  constructor() {
    super("GameScene");
  }

  create() {
    this.sessionGold = 0;
    this.timeLeft = GAME_DURATION_MS / 1000;

    this.add
      .text(GAME_WIDTH / 2, 80, "CHOP!", {
        fontSize: "48px",
        color: "#f5f5ff",
        fontStyle: "800",
      })
      .setOrigin(0.5);

    this.timerText = this.add
      .text(GAME_WIDTH / 2, 140, `Time: ${this.timeLeft}s`, {
        fontSize: "26px",
        color: "#c8c8ff",
      })
      .setOrigin(0.5);

    this.goldText = this.add
      .text(GAME_WIDTH / 2, 190, `Gold: ${this.sessionGold}`, {
        fontSize: "26px",
        color: "#c8c8ff",
      })
      .setOrigin(0.5);

    const equipped = dataManager.getEquippedItem();

    this.axe = new Axe(this, GAME_WIDTH / 2 - 140, GAME_HEIGHT / 2 + 60, equipped);

    this.target = new Target(this, GAME_WIDTH / 2 + 140, GAME_HEIGHT / 2 + 20, {
      textureKey: "target_log",
      maxHp: 100,
    });

    this.input.on("pointerdown", () => this.handleHit());

    this.time.addEvent({
      delay: 1000,
      loop: true,
      callback: () => {
        this.timeLeft -= 1;
        this.timerText.setText(`Time: ${this.timeLeft}s`);
        if (this.timeLeft <= 0) {
          this.endRun();
        }
      },
    });
  }

  handleHit() {
    if (this.timeLeft <= 0) {
      return;
    }

    const equipped = dataManager.getEquippedItem();
    this.axe.swing();
    const crit = Math.random() < equipped.crit;
    const damage = Math.floor(equipped.damage * (crit ? 1.5 : 1));
    const destroyed = this.target.takeDamage(damage);
    this.sessionGold += Math.max(1, Math.floor(damage / 10));
    this.goldText.setText(`Gold: ${this.sessionGold}`);

    if (destroyed) {
      this.sessionGold += 15;
      this.goldText.setText(`Gold: ${this.sessionGold}`);
      this.target.reset();
    }
  }

  endRun() {
    dataManager.addGold(this.sessionGold);
    this.scene.start("ResultScene", {
      earned: this.sessionGold,
      total: dataManager.state.gold,
    });
  }
}
