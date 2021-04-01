import Phaser from 'phaser';

import MyGame from './scenes/MyGame';

const config = {
  type: Phaser.AUTO,
  parent: 'game',
<<<<<<< HEAD
  dom: {
    createContainer: true,
  },
=======
  // dom : {
  //   createContainer : true,
  // },
>>>>>>> 8bf1461cdd4dc943f13cffeec50880622ac1625c
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
