import Phaser from 'phaser';

export default class MyGame extends Phaser.Scene {
  constructor() {
    super('game');
  }

  init() {
    //initialize the game with our cursor keys for movement
    this.cursors = this.input.keyboard.createCursorKeys();
  }

  preload() {
    //load the images and spritesheet for our character
    this.load.atlas(
      'monkey',
      'public/assets/monkey.png',
      'public/assets/monkey.json'
    );

    //loads the tile images for our platforms
    this.load.image('tiles', 'public/assets/platformersheet.png');
    //loads the json files for our tile map
    this.load.tilemapTiledJSON('tilemap', 'public/assets/levelOne.json');

    //Optional animation for our cursor when we get to drag and drop zones
    // this.load.image('cursor', 'public/assets/cursorbanana.png');
  }

  create() {
    //create map
    const map = this.make.tilemap({ key: 'tilemap' });
    //create tileset
    const tileset = map.addTilesetImage('levelOne', 'tiles');
    //add ground
    const ground = map.createLayer('ground', tileset);

    // add background tileset
    const background = map.createLayer('background', tileset);
    //turns physics on. allows collide to be true if the tile has the property of true
    ground.setCollisionByProperty({ collides: true });
    this.matter.world.convertTilemapLayer(ground);

    //this.ground = this.physics.add.staticGroup({ classType: Ground });

    // this.monkey.setCollideWorldBounds(true);
    // this.physics.add.collider(this.monkey, ground);
    //  Set the camera and physics bounds to be the size of 4x4 bg images

    //generate our character to a specific part of the screen(middle)
    // consider resizing the sprite instead of using a setScale function
    //set fixed rotation is to prevent the character from spinning
    const { width, height } = this.scale;
    this.monkey = this.matter.add
      .sprite(width * 0.5, height * 0.5, 'monkey')
      .setScale(0.75)
      .setFixedRotation();

    // this.monkey = new Monkey(this, 20, 400, 'monkey').setScale(0.75);

    // this.cameras.main.setBounds(0, 0, 1920 * 2, 1080 * 2);
    //this.physics.world.setBounds(0, 0, 1920 * 2, 1080 * 2);

    //set the camera to our main character
    this.cameras.main.startFollow(this.monkey);

    //create the idle and running animations for our character
    this.monkey.anims.create({
      key: 'idle',
      frames: [{ key: 'monkey', frame: 'monkey_idle.png' }],
    });

    this.monkey.anims.create({
      key: 'run',
      frameRate: 15,
      frames: this.anims.generateFrameNames('monkey', {
        prefix: 'monkey_run_',
        start: 1,
        end: 8,
        suffix: '.png',
      }),
      repeat: -1,
    });

    //start this by intiating the character in the idle frame
    this.monkey.play('idle');

    //adding cursor movement
    // const cursor = this.add.image(0, 0, 'cursor').setVisible(false);

    // this.input.on(
    //   'pointermove',
    //   function (pointer) {
    //     cursor.setVisible(true).setPosition(pointer.x, pointer.y);

    //     this.physics.moveToObject(this.monkey, pointer, 60);
    //   },
    //   this
    // );
  }

  update() {
    //moves our character left, right, and jumping
    const speed = 15;
    if (this.cursors.left.isDown) {
      this.monkey.flipX = true;
      this.monkey.setVelocityX(-speed);
      this.monkey.play('run', true);
    } else if (this.cursors.right.isDown) {
      this.monkey.flipX = false;
      this.monkey.setVelocityX(speed);
      this.monkey.play('run', true);
    } else {
      this.monkey.setVelocityX(0);
      this.monkey.play('idle', true);
    }

    //uses the built in function Just Down on keyboard to see if the button was just pressed
    //we do this because we dont want someone too hold down space and continue to jump
    const justPressedSpace = Phaser.Input.Keyboard.JustDown(this.cursors.space);

    if (justPressedSpace) {
      this.monkey.setVelocityY(-12);
    }
  }
}
