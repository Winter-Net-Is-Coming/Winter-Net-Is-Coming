import Phaser from "phaser";

export default class GameWin extends Phaser.Scene {
  constructor() {
    super("GameWin");
  }
  preload() {
    this.load.image("playagain", "assets/playagain.png");

    this.load.image("next", "assets/next.png");
  }
  create() {
    var gamedata = this.registry.get("gamedata");

    this.add.text(this.scale.width * 0.35, 100, "You Won!!!", {
      font: "60px Courier",
      fill: "#ffffff",
    });

    this.add.text(this.scale.width * 0.35, 400, "Level Two Coming Soon", {
      font: "30px Courier",
      fill: "#ffffff",
    });

    // if (gamedata.remainingTime > 1) {
    this.remainingTime = this.add.text(
      this.scale.width * 0.35,
      200,
      "Score: " + gamedata.remainingTime,
      { font: "42px Courier", fill: "#ffffff" }
    );

    $.post({
      url: '/api/score',
      data: { score: gamedata.remainingTime},
      success: (data) => console.log(data),
      error: (err) => console.error(err),
    })
    // }

    var btn1 = this.add.image(this.scale.width * 0.35, 300, "playagain");
    btn1.setInteractive();
    btn1.setOrigin(0);
    btn1.on("pointerup", this.startGame, this);

    var btn2 = this.add.image(this.scale.width * 0.35, 400, "Coming Soon");
    btn2.setInteractive();
    btn2.setOrigin(0);
    // btn2.on('pointerup', ()=>{
    //   " "
    // });
    btn2.setScale(0.25);
  }
  startGame() {
    // let myGame = new MyGame('game');
    // this.scene.add('game', myGame, true);
    // this.scene.remove('GameWin');
    this.scene.start("game");
  }
  nextGame() {
    this.scene.start("LevelTwo");
  }
}
