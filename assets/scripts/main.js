let scene = new Phaser.Scene("Game");

scene.preload = function () {
  // 1. загрузить бэкгранд
  this.load.image("bg", "assets/sprites/background.png");
  this.load.image("card", "assets/sprites/card.png");
};

scene.create = function () {
  this.add.sprite(0, 0, "bg").setOrigin(0, 0);

  const positionsForCards = scene.generateCardPosition();

  positionsForCards.map((position) => {
    this.add.sprite(position.x, position.y, "card").setOrigin(0, 0);
  });
};

scene.generateCardPosition = () => {
  // параметры картоки
  const card = {
    width: 196,
    height: 306,
    marginRight: 10,
    marginBottom: 10,
  };

  // размеры поля для расположения карточек
  const cardsArea = {
    width: card.width * config.cols + (config.cols - 1) * card.marginRight,
    height: card.height * config.rows + (config.rows - 1) * card.marginBottom,
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
        x:
          offset.x +
          col * (col === 0 ? card.width : card.width + card.marginRight),
        y:
          offset.y +
          row * (row === 0 ? card.height : card.height + card.marginBottom),
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
