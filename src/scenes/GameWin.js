import Phaser from 'phaser';
import MyGame from './MyGame';
import LevelTwo from './LevelTwo';

export default class GameWin extends Phaser.Scene {
  constructor() {
    super('GameWin');
  }
  preload() {
    this.load.image('playagain', 'assets/playagain.png');

    this.load.image('next', 'assets/next.png');
  }
  create() {
    var gamedata = this.registry.get('gamedata');

    this.add.text(this.scale.width * 0.35, 100, 'You Won!!', {
      font: '60px Courier',
      fill: '#ffffff',
    });

    // if (gamedata.remainingTime > 1) {
    //   this.remainingTime = this.add.text(
    //     30,
    //     220,
    //     'Remaining Time: ' + gamedata.remainingTime,
    //     { font: '42px Courier', fill: '#000000' }
    //   );
    // }

    var btn1 = this.add.image(this.scale.width * 0.35, 300, 'playagain');
    btn1.setInteractive();
    btn1.setOrigin(0);
    btn1.on('pointerup', this.startGame, this);

    var btn2 = this.add.image(this.scale.width * 0.35, 400, 'next');
    btn2.setInteractive();
    btn2.setOrigin(0);
    btn2.on('pointerup', this.nextGame, this);
    btn2.setScale(0.25);
  }
  startGame() {
    // let myGame = new MyGame('game');
    // this.scene.add('game', myGame, true);
    // this.scene.remove('GameWin');
    this.scene.start('game');
  }
  nextGame() {
    let levelTwo = new LevelTwo('LevelTwo');
    this.scene.add('LevelTwo', levelTwo, true);
    this.scene.remove('GameWin');
    // this.scene.remove('game');
  }
}
