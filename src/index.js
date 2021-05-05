import MyGame from "./scenes/MyGame";
import LevelTwo from "./scenes/LevelTwo";
import GameWin from "./scenes/GameWin";

const config = {
  type: Phaser.AUTO,
  parent: "game",
  width: 1200,
  height: 600,
  autoCenter: true,
  physics: {
    default: "matter",
    matter: {
      gravity: { y: 2.5 },

      debug: false,
    },
  },
};

const game = new Phaser.Game(config);

game.scene.add("game", MyGame);
game.scene.add("LevelTwo", LevelTwo);
game.scene.add("GameWin", GameWin);

game.scene.start("game");

export default game;
