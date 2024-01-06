const SCENE_WIDTH = 800;
const SCENE_HEIGHT = 600;
const SCENE_WIDTH_CENTER = SCENE_WIDTH / 2;
const SCENE_HEIGHT_CENTER = SCENE_HEIGHT / 2;
const GRAVITY = 600;

class MyFirstPlatformer extends Phaser.Scene
{
    preload() {
        this.load.image('sky', 'assets/sky.png');
        this.load.image('ground', 'assets/platform.png');
        this.load.image('bomb', 'assets/bomb.png');
        this.load.spritesheet('player', 'assets/dude.png', {
            frameWidth: 32,
            frameHeight: 48
        });
    }

    create() {
        this.add.image(SCENE_WIDTH_CENTER, SCENE_HEIGHT_CENTER, 'sky');
    }

    update() {
    }
}

const config = {
    type: Phaser.CANVAS,
    width: SCENE_WIDTH,
    height: SCENE_HEIGHT,
    scene: MyFirstPlatformer,
    physics: {
        default: 'arcade',
        arcade: {
            gravity: { y: GRAVITY }
        }
    }
};

const game = new Phaser.Game(config);