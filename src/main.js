const SCENE_WIDTH = 800;
const SCENE_HEIGHT = 600;
const SCENE_WIDTH_CENTER = SCENE_WIDTH / 2;
const SCENE_HEIGHT_CENTER = SCENE_HEIGHT / 2;
const GRAVITY = 600;

class MyFirstPlatformer extends Phaser.Scene {
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

    this.createPlatforms();
    this.createPlayer();
    this.setupAnimations();

    this.cursors = this.input.keyboard.createCursorKeys();
  }

  update() {
    this.handleMovement();
  }

  createPlatforms() {
    this.platforms = this.physics.add.staticGroup();
    // TODO - What exactly does refreshBody do and why do I need to call it for a static physics object?
    this.platforms.create(400, 568, 'ground').setScale(2).refreshBody();
  }

  createPlayer() {
    this.player = this.physics.add.sprite(100, 450, 'player');
    this.player.setBounce(0.1);
    this.player.setCollideWorldBounds(true);

    this.physics.add.collider(this.player, this.platforms);
  }

  setupAnimations() {
    this.anims.create({
      key: 'left',
      frames: this.anims.generateFrameNumbers('player', { start: 0, end: 3 }),
      frameRate: 10,
      repeat: -1
    });

    this.anims.create({
      key: 'turn',
      frames: [{ key: 'player', frame: 4 }],
      frameRate: 20
    });

    this.anims.create({
      key: 'right',
      frames: this.anims.generateFrameNumbers('player', { start: 5, end: 8 }),
      frameRate: 10,
      repeat: -1
    });
  }

  handleMovement() {
    if (this.cursors.left.isDown) {
      this.player.setVelocityX(-160);

      this.player.anims.play('left', true);
    }
    else if (this.cursors.right.isDown) {
      this.player.setVelocityX(160);

      this.player.anims.play('right', true);
    }
    else {
      this.player.setVelocityX(0);

      this.player.anims.play('turn');
    }

    if (this.cursors.up.isDown && this.player.body.touching.down) {
      this.player.setVelocityY(-400);
    }
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