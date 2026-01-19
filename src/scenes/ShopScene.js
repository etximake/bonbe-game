import dataManager from "../managers/DataManager.js";
import UIFactory from "../managers/UIFactory.js";
import { GAME_HEIGHT, GAME_WIDTH } from "../Constants.js";

export default class ShopScene extends Phaser.Scene {
  constructor() {
    super("ShopScene");
  }

  create() {
    this.add
      .text(GAME_WIDTH / 2, 120, "SHOP", {
        fontSize: "52px",
        color: "#f5f5ff",
        fontStyle: "800",
      })
      .setOrigin(0.5);

    this.goldText = UIFactory.createLabel(this, {
      x: GAME_WIDTH / 2,
      y: 190,
      label: `Gold: ${dataManager.state.gold}`,
      size: 24,
    });

    const items = dataManager.getItems();
    const startY = 300;
    const gapY = 210;

    items.forEach((item, index) => {
      const y = startY + index * gapY;
      this.renderItemCard(item, y);
    });

    UIFactory.createButton(this, {
      x: GAME_WIDTH / 2,
      y: GAME_HEIGHT - 120,
      label: "BACK",
      onClick: () => this.scene.start("MenuScene"),
    });
  }

  renderItemCard(item, y) {
    const card = this.add
      .rectangle(GAME_WIDTH / 2, y, 600, 170, 0x1b1b2b, 0.9)
      .setStrokeStyle(2, 0x3b3b5d);

    this.add.image(GAME_WIDTH / 2 - 210, y, item.textureKey).setScale(0.75);

    this.add
      .text(GAME_WIDTH / 2 - 80, y - 40, item.name, {
        fontSize: "26px",
        color: "#f5f5ff",
        fontStyle: "700",
      })
      .setOrigin(0, 0.5);

    this.add
      .text(GAME_WIDTH / 2 - 80, y + 10, `DMG ${item.damage} | SPD ${item.speed}`, {
        fontSize: "20px",
        color: "#c8c8ff",
      })
      .setOrigin(0, 0.5);

    const owned = dataManager.isOwned(item.id);
    const equipped = dataManager.state.equippedId === item.id;

    const label = equipped ? "EQUIPPED" : owned ? "EQUIP" : `BUY ${item.price}`;
    const button = UIFactory.createButton(this, {
      x: GAME_WIDTH / 2 + 200,
      y,
      label,
      onClick: () => this.handleAction(item),
    });

    button.button.setScale(0.7, 0.7);
    button.text.setScale(0.7, 0.7);
    card.setData("button", button);
    card.setData("item", item);
  }

  handleAction(item) {
    if (dataManager.isOwned(item.id)) {
      dataManager.equip(item.id);
    } else {
      dataManager.purchase(item.id);
    }

    this.scene.restart();
  }
}
