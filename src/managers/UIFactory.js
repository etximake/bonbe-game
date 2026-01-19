export default class UIFactory {
  static createButton(scene, { x, y, label, onClick }) {
    const button = scene.add
      .rectangle(x, y, 320, 72, 0x2f2f4a, 0.9)
      .setStrokeStyle(2, 0x9ea0ff)
      .setInteractive({ useHandCursor: true });

    const text = scene.add
      .text(x, y, label, {
        fontSize: "28px",
        color: "#f5f5ff",
        fontStyle: "700",
      })
      .setOrigin(0.5);

    button.on("pointerdown", () => {
      onClick?.();
    });

    return { button, text };
  }

  static createLabel(scene, { x, y, label, size = 24 }) {
    return scene.add
      .text(x, y, label, {
        fontSize: `${size}px`,
        color: "#f5f5ff",
      })
      .setOrigin(0.5);
  }
}
