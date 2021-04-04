import Phaser from 'phaser';
import MyGame from './MyGame';

export default class GameOver extends Phaser.Scene {
  constructor() {
    super('GameOver');
  }
  preload() {
    this.load.image('playagain', 'assets/playagain.png');
  }
  create() {
    var gamedata = this.registry.get('gamedata');

    this.add.text(this.scale.width * 0.5, 100, 'Game Over', {
      font: '60px Courier',
      fill: '#000000',
    });

    // if (gamedata.remainingTime > 1) {
    //   this.remainingTime = this.add.text(
    //     30,
    //     220,
    //     'Remaining Time: ' + gamedata.remainingTime,
    //     { font: '42px Courier', fill: '#000000' }
    //   );
    // }
    var btn = this.add.image(this.scale.width * 0.5, 200, 'playagain');
    btn.setInteractive();
    btn.setOrigin(0);
    btn.on('pointerup', this.startGame, this);
  }
  startGame() {
    let myGame = new MyGame('game');
    // MyGame.scene.remove('game');
    this.scene.add('game', myGame, true);
    this.scene.remove('GameOver');
  }
}
