let config = {
  type: Phaser.AUTO, // webgl or canvas
  width: 1280,
  height: 720,
  rows: 2,
  cols: 5,
  scene: new GameScene(),
};

const game = new Phaser.Game(config);
