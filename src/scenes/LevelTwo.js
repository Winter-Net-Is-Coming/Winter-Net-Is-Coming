import Phaser from "phaser";
import Zone from "../entity/Zone.js";
import MyGame from "./MyGame";

export default class LevelTwo extends Phaser.Scene {
  constructor() {
    super({ key: "LevelTwo" });
  }

  init() {
    this.cursors = this.input.keyboard.createCursorKeys();
  }

  preload() {
    this.load.atlas("monkey", "assets/monkey.png", "assets/monkey.json");

    this.load.image("tiles", "assets/platformersheet.png");
    this.load.image("tilesbg", "assets/backgroundForest.png");

    this.load.tilemapTiledJSON("tilemap", "assets/levelTwo.json");

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
    this.add.text(400, 1400, `Coming Soon`, {
      fontSize: "50px",
      color: "white",
    });

    //create map
    const map = this.make.tilemap({ key: "tilemap" });
    const tileset = map.addTilesetImage("levelTwo", "tiles");
    const backgroundSet = map.addTilesetImage("backgroundForest", "tilesbg");
    const ground = map.createLayer("ground", tileset);

    const background = map.createLayer("background", backgroundSet);
    ground.setCollisionByProperty({ collides: true });
    this.matter.world.convertTilemapLayer(ground);
    this.matter.world.convertTilemapLayer(background);

    //adding test zone
    this.zone = new Zone(this);

    //this.dropZOne = this.zone.renderZone(650, 1800, 400, 1000);

    this.dropZOne = this.zone.renderZone(2000, 1200, 400, 1000);
    this.dropZTwo = this.zone.renderZone(3800, 1200, 600, 2200);
    this.dropZThree = this.zone.renderZone(5200, 500, 600, 1100);

    //this.dropZTwo = this.zone.renderZone(680, 1800, 200, 1000);

    //this.dropZThree = this.zone.renderZone(570, 1800, 200, 1000);

    //this.dropZFour = this.zone.renderZone(1780, 1800, 600, 1100);

    this.outlineOne = this.zone.renderOutline(this.dropZOne, 0xff09d2);
    this.outlineTwo = this.zone.renderOutline(this.dropZTwo, 0xff09d2);
    this.outlineThree = this.zone.renderOutline(this.dropZThree, 0xff09d2);
    // overall zone 750, 2100, 700, 1200

    this.monkey = this.matter.add
      .sprite(105, 1700, "monkey")
      .setScale(0.75)
      .setFixedRotation();

    const block2 = this.generateBlock(1844, 1200, "block2");
    const block4 = this.generateBlock(block2.x + 105, 1200, "block4");
    const block3 = this.generateBlock(block4.x + 105, 1200, "block3");
    const block1 = this.generateBlock(block3.x + 105, 1200, "block1");

    const block7 = this.generateBlock(5044, 700, "block7");
    const block6 = this.generateBlock(block7.x + 120, 700, "block6");
    const block5 = this.generateBlock(block6.x + 120, 700, "block5");
    const block9 = this.generateBlock(block5.x + 120, 700, "block9");
    const block8 = this.generateBlock(block9.x + 120, 700, "block8");

    const block14 = this.generateBlock(3536, 1200, "block14");
    const block11 = this.generateBlock(block14.x + 79, 1200, "block11");
    const block15 = this.generateBlock(block11.x + 79, 1200, "block15");
    const block10 = this.generateBlock(block15.x + 79, 1200, "block10");
    const block13 = this.generateBlock(block10.x + 79, 1200, "block13");
    const block12 = this.generateBlock(block13.x + 79, 1200, "block12");

    this.input.setDraggable(block3, true);
    this.input.setDraggable(block11, true);
    this.input.setDraggable(block7, true);
    // this.input.setDraggable(block6, true);
    // this.input.setDraggable(block10, true);

    // this.input.setDraggable(block10, true);

    this.input.dragDistanceThreshold = 0;
    -this.input.on("dragstart", function (pointer, gameObject) {});

    this.input.on("drag", function (pointer, gameObject, dragX, dragY) {
      gameObject.x = dragX;
      gameObject.y = dragY;
    });

    // this.input.on("drag", function (pointer, gameObject) {
    //   // console.log('X', gameObject.x, 'Y', gameObject.y);
    //   //console.log(gameObject.x);
    // });

    this.input.on("dragend", function (pointer, gameObject, dropped) {
      //while dragging, when dropped, return object back to original starting pos.
      if (!dropped) {
        gameObject.x = gameObject.input.dragStartX;
        gameObject.y = gameObject.input.dragStartY;
      }
      console.log(gameObject.texture.key, gameObject.x, gameObject.y);
    });

    let helper = this.add.text(
      1233,
      929,
      `Order these from shortest to  \ntallest using Insertion Sort!`,
      { fontSize: "32px" }
    );
    // ////Insertion SORT ////
    let red = 0xff0000;
    let green = 0x00ffff;
    let none = 0xffffff;
    let yellow = 0xffff00;
    block2.setTint(red);
    block4.setTint(red);
    this.input.on("dragend", function (pointer, gameObject) {
      let currentBlock = gameObject.texture.key;
      let xPos = gameObject.x;

      if (currentBlock === "block3" && xPos > 1930 && xPos < 1950) {
        helper.setText("Thats right!");

        block2.setTint(red);
        block3.setTint(red);
        block4.setTint(red);
        block3.input.draggable = false;
        block1.input.draggable = true;
        //     // if its the wrong move we reset it
      } else if (currentBlock === "block1" && xPos > 1830 && xPos < 1850) {
        helper.setText("Good Job!");
        block1.input.draggable = false;
        block2.setTint(none);
        block3.setTint(none);
        block4.setTint(none);
      }
    });

    /////////Merge Sort //////////////
    let mergeHelper = this.add.text(
      2980,
      1017,
      `Order these from shortest to  \ntallest using Merge Sort!`,
      { fontSize: "32px" }
    );
    // if (this.monkey.x > 200) {
    //   helper.setText('Insertion Sort');
    // }
    // console.log(this.monkey.x);
    // block7.setTint(0x00ff00);
    block14.setTint(yellow);
    block11.setTint(red);
    this.input.on("dragend", function (pointer, gameObject) {
      let currentBlock = gameObject.texture.key;
      console.log(currentBlock);
      let xPos = gameObject.x;

      if (currentBlock === "block11" && xPos > 3560 && xPos < 3570) {
        mergeHelper.setText(`Thats right! Now move to the right half!`);
        block14.setTint(yellow);
        block11.setTint(yellow);
        block15.setTint(yellow);
        block12.setTint(red);
        block11.input.draggable = false;
        block12.input.draggable = true;
      } else if (currentBlock === "block12" && xPos > 3950 && xPos < 3960) {
        mergeHelper.setText(`Thats right! Now put it all together!`);
        block11.setTint(yellow);
        block14.setTint(yellow);
        block15.setTint(yellow);
        block12.input.draggable = false;
        block10.input.draggable = true;
        block10.setTint(red);
      } else if (currentBlock === "block10" && xPos > 3560 && xPos < 3570) {
        block10.input.draggable = false;
        block10.setTint(yellow);
        block11.setTint(yellow);
        block14.setTint(yellow);
        block15.setTint(yellow);
        block12.input.draggable = true;
        block12.setTint(red);
      } else if (currentBlock === "block12" && xPos > 3755 && xPos < 3765) {
        mergeHelper.setText(`3 more days`);
        block12.input.draggable = false;
        block10.setTint(yellow);
        block11.setTint(yellow);
        block12.setTint(yellow);
        block14.setTint(yellow);
        block15.setTint(yellow);
        block13.input.draggable = true;
        block13.setTint(red);
      } else if (currentBlock === "block13" && xPos > 3850 && xPos < 3870) {
        mergeHelper.setText(`I'm tired of this `);
        block10.setTint(none);
        block11.setTint(none);
        block12.setTint(none);
        block13.setTint(none);
        block14.setTint(none);
        block15.setTint(none);
      }
    });
    /////////
    ////Bubble ////
    let bubbleHelper = this.add.text(
      4700,
      297,
      `Order these from shortest to  \ntallest using Bubble Sort!`,
      { fontSize: "32px" }
    );
    block7.setTint(green);
    block6.setTint(green);
    this.input.on("dragend", function (pointer, gameObject) {
      let currentBlock = gameObject.texture.key;
      let xPos = gameObject.x;
      if (currentBlock === "block7" && xPos > 5140 && xPos < 5200) {
        block7.setTint(green);
        block5.setTint(green);
        block6.setTint(none);
      } else if (currentBlock === "block7" && xPos > 5230 && xPos < 5255) {
        block7.input.draggable = false;
        block9.input.draggable = true;
        block7.setTint(none);
        block5.setTint(none);
        block9.setTint(green);
        block8.setTint(green);
      } else if (currentBlock === "block9" && xPos > 5450 && xPos < 5475) {
        block9.input.draggable = false;
        block7.setTint(red);
        block8.setTint(red);
        block9.setTint(red);
        block6.input.draggable = true;
        block6.setTint(green);
        block5.setTint(green);
      } else if (currentBlock === "block6" && xPos > 5140 && xPos < 5200) {
        block6.input.draggable = false;
        block5.setTint(none);
        block6.setTint(none);
        block7.setTint(none);
        block8.setTint(none);
        block9.setTint(none);
        bubbleHelper.setText("Finally done");
        //     window.alert('Thats right!');
        //     block10.input.draggable = false;
        //     block14.input.draggable = true;
        //   } else if (currentBlock === 'block14' && xPos > 4105 && xPos < 4200) {
        //     window.alert('Thats right!');
        //     block14.input.draggable = false;
        //     block12.input.draggable = true;
        //   } else if (currentBlock === 'block12' && xPos > 4372 && xPos < 4432) {
        //     window.alert('Thats right!');
        //     block12.input.draggable = false;
        //     block11.input.draggable = true;
        //   } else if (currentBlock === 'block11' && xPos > 4110 && xPos < 4120) {
        //     window.alert('Thats right!');
        //     block11.input.draggable = false;
        //     block12.input.draggable = true;
        //   } else if (currentBlock === 'block12' && xPos > 4185 && xPos < 4225) {
        //     window.alert('Thats right!');
        //     block12.input.draggable = false;
        //     block13.input.draggable = true;
        //   } else if (currentBlock === 'block13' && xPos > 4296 && xPos < 4308) {
        //     window.alert('Congratulations on solving merge sort!');
        //     block13.input.draggable = false;
      }
    });

    // ///////////

    // this.cameras.main.startFollow(this.monkey);
    // // this.cameras.main.setBounds (0, 0, 1920 * 2, 1080 * 2);
    // // this.matter.world.setBounds(0, 0, 1920 * 2, 1080 * 2);

    // // set the monkey animation
    // //this.createMonkeyAnimations();

    this.cameras.main.startFollow(this.monkey);
    this.cameras.main.setBounds(0, 0, 2150 * 3, 1080 * 2);
    this.cameras.main.zoom = 0.75;
    this.matter.world.setBounds(0, 0, 2150 * 3, 1080 * 2);
    this.createMonkeyAnimations();

    // this.input.on('dragend', function (pointer, gameObject) {
    //   let currentBlock = gameObject.texture.key;
    //   let xPos = gameObject.x;
    //   if (currentBlock === 'block10' && xPos > 4000 && xPos < 4051) {
    //     window.alert('Thats right!');
    //     block10.input.draggable = false;
    //     block14.input.draggable = true;
    //   } else if (currentBlock === 'block14' && xPos > 4105 && xPos < 4200) {
    //     window.alert('Thats right!');
    //     block14.input.draggable = false;
    //     block12.input.draggable = true;
    //   } else if (currentBlock === 'block12' && xPos > 4372 && xPos < 4432) {
    //     window.alert('Thats right!');
    //     block12.input.draggable = false;
    //     block11.input.draggable = true;
    //   } else if (currentBlock === 'block11' && xPos > 4110 && xPos < 4120) {
    //     window.alert('Thats right!');
    //     block11.input.draggable = false;
    //     block12.input.draggable = true;
    //   } else if (currentBlock === 'block12' && xPos > 4185 && xPos < 4225) {
    //     window.alert('Thats right!');
    //     block12.input.draggable = false;
    //     block13.input.draggable = true;
    //   } else if (currentBlock === 'block13' && xPos > 4296 && xPos < 4308) {
    //     window.alert('Congratulations on solving merge sort!');
    //     block13.input.draggable = false;
    //   }
    // });

    //victory coordinates 705 6293
    this.cameras.main.startFollow(this.monkey);
    // this.cameras.main.setBounds(45, 0, 2150 * 3, 1080 * 2);
    // this.cameras.main.zoom = 0.75;
    // this.matter.world.setBounds(0, 0, 2150 * 3, 1080 * 2);

    this.createMonkeyAnimations();
  }

  update() {
    //moves our character left, right, and jumping
    const speed = 20;
    const monkey = this.monkey;

    if (this.cursors.left.isDown) {
      monkey.flipX = true;
      monkey.setVelocityX(-speed);
      monkey.play("run", true);
    } else if (this.cursors.right.isDown) {
      monkey.flipX = false;
      monkey.setVelocityX(speed);
      monkey.play("run", true);
    } else {
      monkey.setVelocityX(0);
      monkey.play("idle", true);
    }

    // const justPressedSpace = Phaser.Input.Keyboard.JustDown(this.cursors.space);

    // if (justPressedSpace) {
    //   this.monkey.setVelocityY(-15);
    // }

    const justPressedSpace = Phaser.Input.Keyboard.JustDown(this.cursors.space);

    if (justPressedSpace) {
      this.monkey.play("jump", true);
      this.monkey.setVelocityY(-15);
      console.log("X", this.monkey.x, "Y", this.monkey.y);
    }
  }

  createMonkeyAnimations() {
    this.anims.create({
      key: "run",
      frameRate: 10,
      frames: this.anims.generateFrameNames("monkey", {
        start: 1,
        end: 8,
        prefix: "monkey_run_",
        suffix: ".png",
      }),
      repeat: -1,
    }),
      this.anims.create({
        key: "idle",
        frameRate: 10,
        frames: [{ key: "monkey", frame: "monkey_idle.png" }],
      }),
      this.anims.create({
        key: "jump",
        frameRate: 10,
        frames: this.anims.generateFrameNames("monkey", {
          start: 1,
          end: 3,
          prefix: "monkey_jump_swing_",
          suffix: ".png",
        }),
        repeat: -1,
      }),
      this.anims.create({
        key: "celebrate",
        frameRate: 10,
        frames: [{ key: "monkey", frame: "monkey_armsup_happy.png" }],
      });
  }
}
