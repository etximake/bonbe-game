export default class Target extends Phaser.GameObjects.Container {
  constructor(scene, x, y, config) {
    super(scene, x, y);
    this.maxHp = config.maxHp;
    this.hp = config.maxHp;
    this.sprite = scene.add.image(0, 0, config.textureKey);
    this.add(this.sprite);

    this.hpText = scene.add
      .text(0, 140, `${this.hp} HP`, {
        fontSize: "24px",
        color: "#f5f5ff",
      })
      .setOrigin(0.5);
    this.add(this.hpText);

    scene.add.existing(this);
  }

  takeDamage(amount) {
    this.hp = Math.max(0, this.hp - amount);
    this.hpText.setText(`${this.hp} HP`);
    this.scene.tweens.add({
      targets: this,
      x: this.x + 6,
      duration: 60,
      yoyo: true,
      repeat: 2,
    });
    return this.hp === 0;
  }

  reset() {
    this.hp = this.maxHp;
    this.hpText.setText(`${this.hp} HP`);
  }
}
