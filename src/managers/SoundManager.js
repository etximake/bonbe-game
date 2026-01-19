class SoundManager {
  constructor() {
    this.enabled = true;
  }

  toggle() {
    this.enabled = !this.enabled;
  }

  play(scene, key, config = {}) {
    if (!this.enabled || !scene.sound.get(key)) {
      return;
    }

    scene.sound.play(key, config);
  }
}

const soundManager = new SoundManager();
export default soundManager;
