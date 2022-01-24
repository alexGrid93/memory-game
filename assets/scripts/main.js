let scene = new Phaser.Scene("Game");

scene.preload = function () {
  // 1. загрузить бэкгранд
  this.load.image("bg", "assets/sprites/background.png");
  this.load.image("card", "assets/sprites/card.png");
};

scene.create = function () {
  // 2. вывести бэкграунд
  // this.add.sprite(this.sys.game.config.width / 2, this.sys.game.config.height / 2, 'bg');
  this.add.sprite(0, 0, "bg").setOrigin(0, 0);

  const positionsForCards = scene.generateCardPosition();

  positionsForCards.map((position) => {
    this.add.sprite(position.x, position.y, "card").setOrigin(0, 0);
  });
};

scene.generateCardPosition = () => {
  // параметры картоки
  const card = {
    width: 196 + 5,
    height: 306 + 6,
    paddingX: 20,
    paddingY: 5,
  };

  // размеры поля для расположения карточек
  const cardsArea = {
    width: (card.width + card.paddingX) * config.cols,
    height: (card.height + card.paddingY) * config.rows,
  };

  // размеры отступов для карточки
  const offset = {
    x: (config.width - cardsArea.width) / 2,
    y: (config.height - cardsArea.height) / 2,
  };

  // генерируем координаты для каждой карточки с учётом отступа от краёв и отступа между карточками
  const positions = [];

  for (let row = 0; row < config.rows; row++) {
    for (let col = 0; col < config.cols; col++) {
      positions.push({
        x: offset.x + col * card.width,
        y: offset.y + row * card.height,
      });
    }
  }

  return positions;
};

let config = {
  type: Phaser.AUTO, // webgl or canvas
  width: 1280,
  height: 720,
  rows: 2,
  cols: 5,
  scene: scene,
};

let game = new Phaser.Game(config);
