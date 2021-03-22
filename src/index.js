import Phaser, { GameObjects } from "phaser";
import rectangle from "./assets/rectangle.png";
//hiiiiii
import Zone from "./zone";
class MyGame extends Phaser.Scene {
  constructor() {
    super();
  }

  preload() {
    this.load.image("rectangle", rectangle);
  }

  create() {
    this.zone = new Zone(this);
    this.dropZone = this.zone.renderZone();
    this.outline = this.zone.renderOutline(this.dropZone);

    const rec1 = this.add
      .image(this.dropZone.x, this.dropZone.y, "rectangle")
      .setInteractive();

    const rec2 = this.add
      .image(rec1.x + 105, this.dropZone.y, "rectangle")
      .setInteractive();

    const rec3 = this.add
      .image(rec2.x + 105, this.dropZone.y, "rectangle")
      .setInteractive();

    const rec4 = this.add
      .image(rec3.x + 105, this.dropZone.y, "rectangle")
      .setInteractive();

    this.input.setDraggable(rec1);
    this.input.setDraggable(rec2);
    this.input.setDraggable(rec3);
    this.input.setDraggable(rec4);
    rec1.id = 1;
    rec2.id = 2;
    rec3.id = 3;
    rec4.id = 4;

    let recStats = [
      { title: rec1, location: 0 },
      { title: rec2, location: 0 },
      { title: rec3, location: 0 },
      { title: rec4, location: 0 },
    ];

    this.input.dragDistanceThreshold = 0;
    this.input.on("drag", function (pointer, gameObject, dragX, dragY) {
      gameObject.x = dragX;
      gameObject.y = dragY;
    });

    this.input.on("drag", function (pointer, gameObject) {
      //console.log(gameObject.x);
    });

    this.input.on("dragend", function (pointer, gameObject, dropped) {
      //while dragging, when dropped, return object back to original starting pos.
      if (!dropped) {
        gameObject.x = gameObject.input.dragStartX;
        gameObject.y = gameObject.input.dragStartY;
      }
    });
    this.input.on("drop", function (pointer, gameObject, dropZone) {
      dropZone.data.values.bars++;
      gameObject.x = dropZone.x - 300 + dropZone.data.values.bars * 100;
      gameObject.y = dropZone.y;
      if (gameObject.x > 750) {
        gameObject.disableInteractive();
      }
      recStats.forEach((rec) => {
        console.log(rec.location);
        if (rec.title === gameObject.id) {
          rec.location = gameObject.x;
        }
      });
    });
  }
}

const config = {
  type: Phaser.AUTO,
  parent: "phaser-example",
  width: "70vw",
  height: "90vh",
  scene: MyGame,
};

const game = new Phaser.Game(config);
