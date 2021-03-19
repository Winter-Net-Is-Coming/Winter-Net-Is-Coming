import Monkey from '../entity/Monkey';
import Phaser from 'phaser';
import Ground from '../entity/Ground';

export default class MyGame extends Phaser.Scene {
  constructor() {
    super('game');
  }

  preload() {
    this.load.atlas(
      'monkey',
      'public/assets/monkey.png',
      'public/assets/monkey.json'
    );

    this.load.image('tiles', 'public/assets/platformersheet.png');
    this.load.tilemapTiledJSON('tilemap', 'public/assets/levelOne.json');
  }

  create() {
    this.createMonkeyAnimations();
    const map = this.make.tilemap({ key: 'tilemap' });

    const tileset = map.addTilesetImage('levelOne', 'tiles');

    const ground = map.createLayer('ground', tileset);

    ground.setCollisionByProperty({ collides: true });
    this.matter.world.convertTilemapLayer(ground);

    //this.ground = this.physics.add.staticGroup({ classType: Ground });
    // this.monkey = new Monkey(this, 20, 400, 'monkey').setScale(0.75);
    // this.monkey.setCollideWorldBounds(true);
    // this.physics.add.collider(this.monkey, ground);
    //  Set the camera and physics bounds to be the size of 4x4 bg images

    const { width, height } = this.scale;
    const monkey = this.matter.add.sprite(width * 0.5, height * 0.5, 'monkey');

    this.cameras.main.setBounds(0, 0, 1920 * 2, 1080 * 2);
    //this.physics.world.setBounds(0, 0, 1920 * 2, 1080 * 2);

    // this.cameras.main.scrollY = 800;
    this.cameras.main.startFollow(monkey);
  }

  createMonkeyAnimations() {
    this.anims.create({
      key: 'player-walk',
      frameRate: 10,
      frames: this.anims.generateFrameNames('monkey', {
        start: 1,
        end: 8,
        prefix: 'monkey_run_',
        suffix: '.png',
      }),
      repeat: -1,
    });
  }
}
