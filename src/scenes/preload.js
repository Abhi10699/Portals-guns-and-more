import {Scene} from 'phaser';

export default class PreloadScene extends Scene{
  constructor(){
    super('preload-scene');
  }

  preload(){
    // player
    this.load.spritesheet('player','./assets/player.png',{frameWidth:96,frameHeight:96});
    this.load.spritesheet('player-main','./assets/player_set.png',{frameHeight:17.33,frameWidth:16.66});


    // background
    this.load.image('background','./assets/background.png');

    // portals
    this.load.spritesheet('portal','./assets/portals.png',{frameHeight:64,frameWidth:64});

    // maps
    this.load.image('tiles','./assets/environment_set.png');
    this.load.tilemapTiledJSON('World','./assets/Map/Map.json');

    // guns 
    this.load.spritesheet('guns','./assets/weapons_set.png',{frameHeight:16,frameWidth:25});

    // bullets
    this.load.spritesheet('bullets','./assets/Laser.png',{frameWidth:16,frameHeight:16})
  }
  create(){
    // variables

    const frameRate = 10;

    // player animations
    this.anims.create({
      key:'move-down',
      frames:this.anims.generateFrameNumbers('player',{start:0,end:2}),
      repeat:-1,
      frameRate
    })

    this.anims.create({
      key:'move-up',
      frames:this.anims.generateFrameNumbers('player',{start:6,end:8}),
      repeat:-1,
      frameRate
    })

    this.anims.create({
      key:'move-sideways',
      frames:this.anims.generateFrameNumbers('player',{start:3,end:5}),
      repeat:-1,
      frameRate
    })
    this.anims.create({
      key:'player-idle',
      frames:this.anims.generateFrameNumbers('player',{start:0,end:0}),
      repeat:0,
      frameRate
    })


    // main player anims

    this.anims.create({
      key:'pmain-idle',
      frames:this.anims.generateFrameNumbers('player-main',{start:0,end:0}),
      repeat:0,
      frameRate:10
    })


    this.anims.create({
      key:'pmain-run',
      frames:this.anims.generateFrameNumbers('player-main',{start:0,end:1}),
      repeat:-1,
      frameRate:7
    })

    this.anims.create({
      key:'pmain-jump',
      frames:this.anims.generateFrameNumbers('player-main',{start:6,end:9}),
      repeat:0,
      frameRate:12
    })

    this.anims.create({
      key:'pmain-die',
      frameRate:12,
      frames:this.anims.generateFrameNumbers('player-main',{start:12,end:17}),
      repeat:0
    })


    // portal animations

    this.anims.create({
      key:'portal-active',
      frames:this.anims.generateFrameNumbers('portal',{start:0,end:7}),
      frameRate:12,
      repeat:-1
    })

    
    this.anims.create({
      key:'portal-open',
      frames:this.anims.generateFrameNumbers('portal',{start:8,end:15}),
      frameRate:12,
      repeat:0
    })
        
    this.anims.create({
      key:'portal-close',
      frames:this.anims.generateFrameNumbers('portal',{start:16,end:24}),
      frameRate:12,
      repeat:0
    })
    // load scene
    this.scene.start('game-scene');
  }
}