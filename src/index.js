import MyGame from './scenes/MyGame';
import LevelTwo from './scenes/LevelTwo';
import GameOver from './scenes/GameOver';
import GameWin from './scenes/GameWin';

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
};

const game = new Phaser.Game(config);

game.scene.add('game', MyGame);
// game.scene.add('LevelTwo', LevelTwo);
// game.scene.add('GameOver', GameOver);
game.scene.add('GameWin', GameWin);

game.scene.start('game');
// game.scene.start('LevelTwo');

// export default game;
