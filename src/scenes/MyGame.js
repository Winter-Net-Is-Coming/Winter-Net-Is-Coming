import Phaser from 'phaser';
import Zone from '../entity/Zone.js';

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
      'assets/monkey.png',
      'assets/monkey.json'
    );

    //loads the tile images for our platforms
    this.load.image('tiles', 'assets/platformersheet.png');
    //loads the json files for our tile map
    this.load.tilemapTiledJSON('tilemap', 'assets/levelOne.json');
    //loading testblock images
    for (let i = 1; i <= 15; i++) {
      this.load.image(`block${i}`, `assets/blocks/block${i}.png`);
    }
  }

  generateBlock(x, y, blockName) {
    return this.matter.add
      .image(x, y, blockName)
      .setInteractive()
      .setFixedRotation();
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

    //adding test zone
    this.zone = new Zone(this);

    this.dropZOne = this.zone.renderZone(790, 1800, 200, 1000);

    this.dropZTwo = this.zone.renderZone(680, 1800, 200, 1000);

    this.dropZThree = this.zone.renderZone(570, 1800, 200, 1000);

    // this.outlineOne = this.zone.renderOutline(this.dropZOne, 0xff09d2);
    // this.outlineTwo = this.zone.renderOutline(this.dropZTwo, 0xff09d2);
    // this.outlineThree = this.zone.renderOutline(this.dropZThree, 0xff09d2);
    // overall zone 750, 2100, 700, 1200

    //this.ground = this.physics.add.staticGroup({ classType: Ground });

    // this.monkey.setCollideWorldBounds(true);
    // this.physics.add.collider(this.monkey, ground);
    //  Set the camera and physics bounds to be the size of 4x4 bg images

    //generate our character to a specific part of the screen(middle)
    // consider resizing the sprite instead of using a setScale function
    //set fixed rotation is to prevent the character from spinning
    //const { width, height } = this.scale;
    this.monkey = this.matter.add
      .sprite(105, 1700, 'monkey')
      .setScale(0.75)
      .setFixedRotation();

    const block4 = this.generateBlock(490, 1900, 'block4');
    const block2 = this.generateBlock(block4.x + 125, 1900, 'block2');
    const block1 = this.generateBlock(block2.x + 125, 1900, 'block1');
    const block3 = this.generateBlock(block1.x + 125, 1900, 'block3');

    const block7 = this.generateBlock(1500, 1800, 'block7');
    const block6 = this.generateBlock(block7.x + 120, 1800, 'block6');
    const block5 = this.generateBlock(block6.x + 120, 1800, 'block5');
    const block9 = this.generateBlock(block5.x + 120, 1800, 'block9');
    const block8 = this.generateBlock(block9.x + 120, 1800, 'block8');

    const block15 = this.generateBlock(4028, 1600, 'block15');
    const block10 = this.generateBlock(block15.x + 120, 1600, 'block10');
    const block14 = this.generateBlock(block10.x + 120, 1600, 'block14');
    const block11 = this.generateBlock(block14.x + 120, 1600, 'block11');
    const block13 = this.generateBlock(block11.x + 120, 1600, 'block13');
    const block12 = this.generateBlock(block13.x + 120, 1600, 'block12');

    this.input.setDraggable(block4, true);

    this.input.dragDistanceThreshold = 0;
    this.input.on('drag', function (pointer, gameObject, dragX, dragY) {
      gameObject.x = dragX;
      gameObject.y = dragY;
    });

    this.input.on('drag', function (pointer, gameObject) {
      // console.log('X', gameObject.x, 'Y', gameObject.y);
      //console.log(gameObject.x);
    });

    this.input.on('dragend', function (pointer, gameObject, dropped) {
      //while dragging, when dropped, return object back to original starting pos.
      if (!dropped) {
        gameObject.x = gameObject.input.dragStartX;
        gameObject.y = gameObject.input.dragStartY;
      }
      // console.log(gameObject.texture.key, gameObject.x, gameObject.y);
    });

    // this.input.on('dragend', function (pointer, gameObject, dropped) {
    //   // does inside of this function not have access to the instances starting with this?
    //   this.dropZOne.active = true;
    //   console.log(this.dropZOne);
    //   while (this.dropZOne.active) {
    //     this.outlineOne = this.zone.renderOutline(this.dropZOne, 0xff09d2);
    //   }
    //   let currentBlock = gameObject.texture.key;
    //   let xPos = gameObject.x;
    //   if (currentBlock === 'textblock4' && xPos > 609 && xPos < 635) {
    //     this.dropZOne.active = false;
    //     this.dropZTwo.active = true;
    //   } else {
    //     gameObject.x = gameObject.input.dragStartX;
    //   }
    // });

    // variables outside of the scope to manipulate in the function
    // move counter variable
    this.input.on('dragend', function (pointer, gameObject, dropped) {
      let currentBlock = gameObject.texture.key;

      let xPos = gameObject.x;
      console.log(xPos);
      console.log(gameObject);

      if (currentBlock === 'block4' && xPos > 609 && xPos < 635) {
        window.alert('Thats right!');
        // if its the wrong move we reset it
      } else if (currentBlock === 'block4' && xPos > 720 && xPos < 750) {
        window.alert('Thats right!');
      } else if (currentBlock === 'block4' && xPos > 810 && xPos < 850) {
        window.alert('Thats right!');
        block4.input.draggable = false;
        block2.input.draggable = true;
      } else if (currentBlock === 'block2' && xPos > 600 && xPos < 630) {
        window.alert('Thats right! Good job solving your first bubble sort!');
        block2.input.draggable = false;
      }
    });
    // adding tests for body/bounce
    // this.matter.world.setFPS(120);
    // this.body.setBounce(1);

    /**
     * FIRST SWAP ZONE
     * activate swap zone
     * if testblock4 is not at x 632, reset
     * else we'll inactivate our zone
     * activate the next zone
     * is 4 at 772? if no reset
     * if yes --> inactivate zone and activate the next zone
     * is 4 at 840?
     * then reactivate zone 1
     * have them swap blocks 1 and 2
     * check if testblock 2 is at x 624? if it is then we're done, else, reset
     *
     */
    // this.dropZOne
    // this.dropZTwo
    // this.dropZThree

    // this.input.on("drop", function (pointer, gameObject, dropZone) {
    //   dropZone.data.values.bars++;
    //   gameObject.x = dropZone.x - 300 + dropZone.data.values.bars * 100;
    //   gameObject.y = dropZone.y;
    //   if (gameObject.x > 750) {
    //     gameObject.disableInteractive();
    //   }
    // });
    //}

    // this.cameras.main.setBounds(0, 0, 1920 * 2, 1080 * 2);

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
      this.monkey.setVelocityY(-15);
      console.log(this.monkey.x);
    }
  }
}
