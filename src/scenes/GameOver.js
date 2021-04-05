import Phaser from 'phaser';
import MyGame from './MyGame';
import LevelTwo from './LevelTwo';

export default class GameOver extends Phaser.Scene {
  constructor() {
    super('GameOver');
  }
  preload() {
    this.load.image('playagain', 'assets/playagain.png');

    this.load.image('next', 'assets/next.png');
  }
  create() {
    this.add.text(this.scale.width * 0.35, 100, 'Game Over', {
      font: '60px Courier',
      fill: '#ffffff',
    });

    var btn1 = this.add.image(this.scale.width * 0.35, 200, 'playagain');
    btn1.setInteractive();
    btn1.setOrigin(0);
    btn1.on('pointerup', this.startGame, this);

    var btn2 = this.add.image(this.scale.width * 0.35, 300, 'next');
    btn2.setInteractive();
    btn2.setOrigin(0);
    btn2.on('pointerup', this.nextGame, this);
    btn2.setScale(0.25);
  }
  startGame() {
    let myGame = new MyGame('game');
    this.scene.add('game', myGame, true);
    this.scene.remove('GameOver');
  }
  nextGame() {
    // let levelTwo = new LevelTwo('LevelTwo');
    // this.scene.add('LevelTwo', levelTwo, true);
    // this.scene.remove('GameOver');
    this.scene.start('LevelTwo');
  }
}
