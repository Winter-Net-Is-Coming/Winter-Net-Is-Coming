import MyGame from './scenes/MyGame';
import LevelTwo from './scenes/LevelTwo';

const config = {
  type: Phaser.AUTO,
  parent: 'game',
  width: 1200,
  height: 600,
  autoCenter: true,
  physics: {
    default: 'matter',
    matter: {
      gravity: { y: 2 },

      debug: true,
    },
  },
  scene: [MyGame],
};

export default new Phaser.Game(config);
