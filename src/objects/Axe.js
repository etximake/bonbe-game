export default class Axe extends Phaser.GameObjects.Container {
  constructor(scene, x, y, item) {
    super(scene, x, y);
    this.item = item;
    this.sprite = scene.add.image(0, 0, item.textureKey);
    this.sprite.setScale(0.8);
    this.add(this.sprite);
    this.setSize(140, 140);
    scene.add.existing(this);
  }

  swing() {
    this.scene.tweens.add({
      targets: this,
      angle: { from: -20, to: 60 },
      duration: 120 / this.item.speed,
      yoyo: true,
      ease: "Sine.easeInOut",
    });
  }
}
