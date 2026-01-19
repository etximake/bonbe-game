import { GAME_HEIGHT, GAME_WIDTH } from "./Constants.js";
import BootScene from "./scenes/BootScene.js";
import MenuScene from "./scenes/MenuScene.js";
import ShopScene from "./scenes/ShopScene.js";
import GameScene from "./scenes/GameScene.js";
import ResultScene from "./scenes/ResultScene.js";

const config = {
  type: Phaser.AUTO,
  width: GAME_WIDTH,
  height: GAME_HEIGHT,
  backgroundColor: "#101019",
  parent: "game-container",
  scene: [BootScene, MenuScene, ShopScene, GameScene, ResultScene],
};

new Phaser.Game(config);
