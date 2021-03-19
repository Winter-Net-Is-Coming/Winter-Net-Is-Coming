import Phaser from 'phaser';
import logoImg from './assets/logo.png';

class MyGame extends Phaser.Scene
{
    constructor ()
    {
        super();
    }

    preload ()
    {
        this.load.image('logo', logoImg);
    }
      
    create ()
    {
        const box = this.add.rectangle(500, 400, 300, 300, 0x32a852).setInteractive();
        //const text = this.add.text(500, 400, 'BLOCK 1', {color: '#ffffff'});

        // var container = this.add.container(400, 300, [ box ]);

        // container.setSize(300, 300);
    
        // container.setInteractive();
    
        this.input.setDraggable(box);
        //  The pointer has to move 16 pixels before it's considered as a drag
        this.input.dragDistanceThreshold = 16;

    
        this.input.on('drag', function (pointer, gameObject, dragX, dragY) {
    
            gameObject.x = dragX;
            gameObject.y = dragY;
    
        });
    }
}

const config = {
    type: Phaser.AUTO,
    parent: 'phaser-example',
    width: '100vw',
    height: '100vh',
    scene: MyGame
};

const game = new Phaser.Game(config);
