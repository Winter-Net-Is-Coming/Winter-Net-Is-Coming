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

    //loading testblock images
    this.load.image('testblock', 'public/assets/testblock.png');
    this.load.image('testblock2', 'public/assets/testblock2.png');
    this.load.image('testblock3', 'public/assets/testblock3.png');
    this.load.image('testblock4', 'public/assets/testblock4.png');
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
    //const { width, height } = this.scale;
    this.monkey = this.matter.add
      .sprite(300, 1700, 'monkey')
      .setScale(0.75)
      .setFixedRotation();

    //adding testblocks
    const testblock = this.matter.add
      .image(490, 1900, 'testblock')
      .setInteractive()
      .setFixedRotation();

    const testblock2 = this.matter.add
      .image(testblock.x + 120, 1900, 'testblock2')
      .setInteractive()
      .setFixedRotation();

    const testblock3 = this.matter.add
      .image(testblock2.x + 125, 1900, 'testblock3')
      .setInteractive()
      .setFixedRotation();

    const testblock4 = this.matter.add
      .image(testblock3.x + 125, 1900, 'testblock4')
      .setInteractive()
      .setFixedRotation();

    this.input.setDraggable(testblock);
    this.input.setDraggable(testblock2);
    this.input.setDraggable(testblock3);
    this.input.setDraggable(testblock4);

    this.input.dragDistanceThreshold = 0;
    this.input.on('drag', function (pointer, gameObject, dragX, dragY) {
      gameObject.x = dragX;
      gameObject.y = dragY;
    });

    this.input.on('drag', function (pointer, gameObject) {
      console.log('X', gameObject.x, 'Y', gameObject.y);
      //console.log(gameObject.x);
    });

    this.input.on('dragend', function (pointer, gameObject, dropped) {
      //while dragging, when dropped, return object back to original starting pos.
      if (!dropped) {
        gameObject.x = gameObject.input.dragStartX;
        gameObject.y = gameObject.input.dragStartY;
      }
    });
    // this.input.on("drop", function (pointer, gameObject, dropZone) {
    //   dropZone.data.values.bars++;
    //   gameObject.x = dropZone.x - 300 + dropZone.data.values.bars * 100;
    //   gameObject.y = dropZone.y;
    //   if (gameObject.x > 750) {
    //     gameObject.disableInteractive();
    //   }
    // });
    //}

    //set the camera to our main character
    this.cameras.main.startFollow(this.monkey);
    this.cameras.main.setBounds(0, 0, 1920 * 2, 1080 * 2);
    this.matter.world.setBounds(0, 0, 1920 * 2, 1080 * 2);

    // set the monkey animation
    this.createMonkeyAnimations();

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
  createMonkeyAnimations() {
    this.anims.create({
      key: 'run',
      frameRate: 10,
      frames: this.anims.generateFrameNames('monkey', {
        start: 1,
        end: 8,
        prefix: 'monkey_run_',
        suffix: '.png',
      }),
      repeat: -1,
    }),
      this.anims.create({
        key: 'idle',
        frameRate: 10,
        frames: [{ key: 'monkey', frame: 'monkey_idle.png' }],
      }),
      this.anims.create({
        key: 'jump',
        frameRate: 10,
        frames: this.anims.generateFrameNames('monkey', {
          start: 1,
          end: 4,
          prefix: 'monkey_jump_',
          suffix: '.png',
        }),
        repeat: -1,
      });
  }
}
