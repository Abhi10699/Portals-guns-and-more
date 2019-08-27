import {Scene} from 'phaser';

export default class PreloadScene extends Scene{
  constructor(){
    super('preload-scene');
  }

  preload(){
    // player
    this.load.spritesheet('player','./assets/player.png',{frameWidth:96,frameHeight:96})
    // portals
    this.load.spritesheet('portal','./assets/portals.png',{frameHeight:64,frameWidth:64});
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