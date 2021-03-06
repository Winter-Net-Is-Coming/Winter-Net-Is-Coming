import Phaser from 'phaser';
import Zone from '../entity/Zone.js';
import GameOver from './GameOver';
import CountdownController from '../entity/CountdownController';

export default class MyGame extends Phaser.Scene {
  constructor() {
    super({ key: 'game' });
  }

  init() {
    this.cursors = this.input.keyboard.createCursorKeys();
  }

  preload() {
    this.load.atlas('monkey', 'assets/monkey.png', 'assets/monkey.json');

    this.load.image('tiles', 'assets/platformersheet.png');
    this.load.image('tilesbg', 'assets/backgroundColorForest.png');

    this.load.tilemapTiledJSON('tilemap', 'assets/levelOne.json');

    for (let i = 1; i <= 15; i++) {
      this.load.image(`block${i}`, `assets/blocks/block${i}.png`);
    }

    this.load.image('energycontainer', 'assets/energycontainer.png');
    this.load.image('energybar', 'assets/energybar.png');

    this.load.image('banana', 'assets/banana.png');
  }

  generateBlock(x, y, blockName) {
    return this.matter.add
      .image(x, y, blockName)
      .setInteractive()
      .setFixedRotation();
  }

  create() {
    const map = this.make.tilemap({ key: 'tilemap' });
    const tileset = map.addTilesetImage('levelOne', 'tiles');
    const backgroundSet = map.addTilesetImage('forestBackground', 'tilesbg');
    const ground = map.createLayer('ground', tileset);

    const background = map.createLayer('background', backgroundSet);
    ground.setCollisionByProperty({ collides: true });
    this.matter.world.convertTilemapLayer(ground);
    this.matter.world.convertTilemapLayer(background);

    this.banana = this.matter.add
      .sprite(6200, 200, 'banana')
      .setScale(0.05)
      .setFixedRotation();
    this.monkey = this.matter.add
      .sprite(105, 1700, 'monkey')
      .setScale(0.75)
      .setFixedRotation();

    let gameOptions = { initialTime: 300 };
    this.timeLeft = gameOptions.initialTime;

    let energyContainer = this.add
      .sprite(this.scale.width / 60, this.scale.height / 70, 'energycontainer')
      .setScrollFactor(0)
      .setScale(0.5);

    let energyBar = this.add
      .sprite(energyContainer.x + 25, energyContainer.y, 'energybar')
      .setScrollFactor(0)
      .setScale(0.5);
    this.energyMask = this.add
      .sprite(energyBar.x, energyBar.y, 'energybar')
      .setScrollFactor(0)
      .setScale(0.5);

    this.energyMask.visible = false;

    energyBar.mask = new Phaser.Display.Masks.BitmapMask(this, this.energyMask);

    this.gameTimer = this.time.addEvent({
      delay: 1000,
      callback: function () {
        this.timeLeft--;
        let stepWidth = this.energyMask.displayWidth / gameOptions.initialTime;
        this.energyMask.x -= stepWidth;
      },
      callbackScope: this,
      loop: true,
    });

    const timerLabel = this.add
      .text(this.scale.width * 0.5, 50, '300', { fontSize: 50 })
      .setOrigin(0.5);

    this.countdown = new CountdownController(this, timerLabel);
    this.countdown.start(this.handleCountdownFinished.bind(this));

    this.zone = new Zone(this);

    this.dropZOne = this.zone.renderZone(650, 1800, 400, 1000);
    this.dropZTwo = this.zone.renderZone(1780, 1800, 600, 1100);
    this.dropZThree = this.zone.renderZone(4267, 2200, 600, 2200);

    const block4 = this.generateBlock(490, 1900, 'block4');
    const block2 = this.generateBlock(block4.x + 105, 1900, 'block2');
    const block1 = this.generateBlock(block2.x + 105, 1900, 'block1');
    const block3 = this.generateBlock(block1.x + 105, 1900, 'block3');

    const block7 = this.generateBlock(1520, 1800, 'block7');
    const block6 = this.generateBlock(block7.x + 120, 1800, 'block6');
    const block5 = this.generateBlock(block6.x + 120, 1800, 'block5');
    const block9 = this.generateBlock(block5.x + 120, 1800, 'block9');
    const block8 = this.generateBlock(block9.x + 120, 1800, 'block8');

    const block15 = this.generateBlock(4028, 1600, 'block15');
    const block10 = this.generateBlock(block15.x + 80, 1600, 'block10');
    const block14 = this.generateBlock(block10.x + 80, 1600, 'block14');
    const block11 = this.generateBlock(block14.x + 80, 1600, 'block11');
    const block13 = this.generateBlock(block11.x + 80, 1600, 'block13');
    const block12 = this.generateBlock(block13.x + 80, 1600, 'block12');

    this.input.setDraggable(block4, true);
    this.input.setDraggable(block6, true);
    this.input.setDraggable(block10, true);

    this.input.setDraggable(block10, true);

    this.input.dragDistanceThreshold = 0;

    this.input.on('drag', function (pointer, gameObject, dragX, dragY) {
      gameObject.x = dragX;
      gameObject.y = dragY;
    });

    this.input.on('dragend', function (pointer, gameObject, dropped) {
      if (!dropped) {
        gameObject.x = gameObject.input.dragStartX;
        gameObject.y = gameObject.input.dragStartY;
      }
    });
    let red = 0x5761f0;
    let green = 0x00ffff;
    let none = 0xffffff;
    let yellow = 0xffff00;

    let helper = this.add.text(
      400,
      1400,
      `Start with the first block on the left, \ncompare it to the block on the right\n If the left is bigger, drag it to the right.`,
      { fontSize: '25px', color: 'black' }
    );
    ////BUBBLE SORT ////
    function removeText(text) {
      text.destroy();
    }

    block4.setTint(green);
    block2.setTint(red);
    this.input.on('dragend', function (pointer, gameObject) {
      let currentBlock = gameObject.texture.key;
      let xPos = gameObject.x;

      if (currentBlock === 'block4' && xPos > 589 && xPos < 600) {
        helper.setText('Thats right!, What about these two?');

        block2.setTint(none);
        block4.setTint(green);
        block1.setTint(red);
      } else if (currentBlock === 'block4' && xPos > 680 && xPos < 690) {
        helper.setText('Awesome!, How about these two?');
        block1.setTint(none);
        block4.setTint(green);
        block3.setTint(red);
      } else if (currentBlock === 'block4' && xPos > 780 && xPos < 790) {
        helper.setText('Awesome!, Almost there!');

        block4.setTint(red);
        block3.setTint(red);
        block1.setTint(red);
        block2.setTint(green);
        block4.input.draggable = false;
        block2.input.draggable = true;
      } else if (currentBlock === 'block2' && xPos > 585 && xPos < 595) {
        block4.setTint(none);
        block3.setTint(none);
        block1.setTint(none);
        block2.setTint(none);
        helper.setText(
          'Awesome!, This algorithm is called Bubble Sort, \n order from big to small by moving left to right '
        );
        block2.input.draggable = false;
      }
    });

    let helperInsertion = this.add.text(
      1000,
      1202,
      `Compare the "6" block \nwith the block to the left &\n drag to the left if it's smaller. `,
      { fontSize: '25px', color: 'black' }
    );

    block7.setTint(red);
    block6.setTint(green);
    this.input.on('dragend', function (pointer, gameObject) {
      let currentBlock = gameObject.texture.key;
      let xPos = gameObject.x;

      if (currentBlock === 'block6' && xPos > 1360 && xPos < 1600) {
        removeText(helper);
        helperInsertion.setText(
          `Where does "5" belong? Drag it to the \n correct spot `
        );
        block6.setTint(red);
        block5.setTint(green);
        block7.setTint(red);

        block6.input.draggable = false;
        block5.input.draggable = true;
      } else if (currentBlock === 'block5' && xPos > 1360 && xPos < 1600) {
        helperInsertion.setText(
          `Nice!, it look like "9" is bigger than\n the block on the left, so where does the "8" belong?  `
        );
        block6.setTint(none);
        block5.setTint(none);
        block7.setTint(none);
        block8.setTint(green);
        block9.setTint(red);
        block5.input.draggable = false;
        block8.input.draggable = true;
      } else if (currentBlock === 'block8' && xPos > 1820 && xPos < 1895) {
        helperInsertion.setText(
          'Great!, This algorithm is called Insertion Sort, \n it compares the current block to everything on\n its left'
        );
        block8.setTint(none);
        block9.setTint(none);
        block8.input.draggable = false;
      }
    });
    /////////MERGE SORT

    let helperMerge = this.add.text(
      3200,
      900,
      `Begin by sorting the left half\nStart with the "10" block and compare\n it to the block\n on the left. `,
      { fontSize: '25px', color: 'black' }
    );
    block15.setTint(red);
    block10.setTint(yellow);
    this.input.on('dragend', function (pointer, gameObject) {
      let currentBlock = gameObject.texture.key;
      let xPos = gameObject.x;
      if (currentBlock === 'block10' && xPos > 4000 && xPos < 4051) {
        removeText(helperInsertion);
        block15.setTint(red);
        block10.setTint(red);
        block14.setTint(yellow);
        helperMerge.setText(
          `Great!, What about block "14", where should it go`
        );
        block10.input.draggable = false;
        block14.input.draggable = true;
      } else if (currentBlock === 'block14' && xPos > 4105 && xPos < 4200) {
        helperMerge.setText(
          `You sorted the left half! Let's try the right half!\n Where does "12" go?`
        );
        block15.setTint(none);
        block10.setTint(none);
        block14.setTint(none);
        block12.setTint(yellow);
        block11.setTint(red);
        block13.setTint(red);
        block14.input.draggable = false;
        block12.input.draggable = true;
      } else if (currentBlock === 'block12' && xPos > 4372 && xPos < 4432) {
        helperMerge.setText(
          `Now the left and right are sorted, lets put it all together,\n "15" is in place, so let's move on the the "11"`
        );
        block15.setTint(red);
        block10.setTint(red);
        block14.setTint(red);
        block13.setTint(none);
        block11.setTint(yellow);
        block12.setTint(none);
        block12.input.draggable = false;
        block11.input.draggable = true;
      } else if (currentBlock === 'block11' && xPos > 4110 && xPos < 4120) {
        helperMerge.setText(`Nice!, What about block "12", where should it go`);
        block15.setTint(red);
        block10.setTint(red);
        block14.setTint(red);
        block13.setTint(none);
        block11.setTint(red);
        block12.setTint(yellow);
        block11.input.draggable = false;
        block12.input.draggable = true;
      } else if (currentBlock === 'block12' && xPos > 4185 && xPos < 4225) {
        block15.setTint(red);
        block10.setTint(red);
        block14.setTint(red);
        block13.setTint(yellow);
        block11.setTint(red);
        block12.setTint(red);
        helperMerge.setText('Amazing!, One more left!');
        block12.input.draggable = false;
        block13.input.draggable = true;
      } else if (currentBlock === 'block13' && xPos > 4296 && xPos < 4308) {
        block15.setTint(none);
        block10.setTint(none);
        block14.setTint(none);
        block13.setTint(none);
        block11.setTint(none);
        block12.setTint(none);
        helperMerge.setText(
          'You did it, this is the Merge Sort algorithm!\n Split the set in half. \nSort the left, right, then the whole set by \nmoving the smallest to the left. '
        );
        block13.input.draggable = false;
      }
    });

    this.cameras.main.startFollow(this.monkey);

    this.cameras.main.setBounds(45, 0, 2119 * 3, 1080 * 2);
    this.cameras.main.zoom = 0.75;
    this.matter.world.setBounds(0, 0, 2119 * 3, 1080 * 2);

    this.createMonkeyAnimations();
  }

  update() {
    const speed = 20;
    const monkey = this.monkey;

    if (this.cursors.left.isDown) {
      monkey.flipX = true;
      monkey.setVelocityX(-speed);
      monkey.play('run', true);
    } else if (this.cursors.right.isDown) {
      monkey.flipX = false;
      monkey.setVelocityX(speed);
      monkey.play('run', true);
    } else {
      monkey.setVelocityX(0);
      monkey.play('idle', true);
    }

    const justPressedSpace = Phaser.Input.Keyboard.JustDown(this.cursors.space);
    if (justPressedSpace && this.monkey.body.velocity.y === 0) {
      this.monkey.setVelocity(-15);
    }

    this.countdown.update();

    if (this.monkey.x > 6100) {
      this.monkey.active = false;
      this.monkey.setVelocity(0, 0);
      this.gameWin();
    }

    if (this.monkey.x > 2484 && this.monkey.y > 1453) {
      this.scene.restart();
    }
  }

  handleCountdownFinished() {
    this.monkey.active = false;
    this.monkey.setVelocity(0, 0);
    this.gameOver();
  }

  gameOver() {
    let gameOver = new GameOver('GameOver');
    this.scene.add('GameOver', gameOver, true);
    this.scene.remove('game');
  }

  gameWin() {
    this.registry.set('gamedata', {
      remainingTime: this.remainingTime(),
    });
    this.scene.start('GameWin');
  }

  wonGame() {
    $.post({
      url: '/api/score',
      data: { score: this.countdown.getTimeRemaining() / 1000 },
      success: (data) => console.log(data),
      error: (err) => console.error(err),
    });

    throw Error('STOP THIS FROM OVER FLOODING SERVER');
  }

  remainingTime() {
    return this.countdown.update();
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
          end: 3,
          prefix: 'monkey_jump_swing_',
          suffix: '.png',
        }),
        repeat: -1,
      }),
      this.anims.create({
        key: 'celebrate',
        frameRate: 10,
        frames: [{ key: 'monkey', frame: 'monkey_armsup_happy.png' }],
      });
  }
}
