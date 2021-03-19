export default class Zone {
  constructor(scene) {
    this.renderZone = () => {
      let dropZone = scene.add
        .zone(400, 375, 500, 250) //(x,y,w,h)
        .setRectangleDropZone(500, 550); //(w,h)
      dropZone.setData({ bars: 0 });
      return dropZone;
    };
    this.renderOutline = (dropZone) => {
      let dropZoneOutline = scene.add.graphics();
      //dropZoneOutline.lineStyle(4, 0xff09d2);
      dropZoneOutline.strokeRect(
        dropZone.x - dropZone.input.hitArea.width / 2,
        dropZone.y - dropZone.input.hitArea.height / 2,
        dropZone.input.hitArea.width,
        dropZone.input.hitArea.height
      );
    };
  }
}
