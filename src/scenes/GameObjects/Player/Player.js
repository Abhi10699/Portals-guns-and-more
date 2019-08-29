import {Physics} from 'phaser';
const {Sprite} = Physics.Arcade;

export default class Player extends Sprite{
  
  constructor(scene,x,y,key,frame){
    super(scene,x,y,key,frame);

    // player configration
    this.scene.physics.world.enableBody(this);
    this.setCollideWorldBounds(true);
    this.InputConfig();
    this.body.gravity.y = 500;
    this.scene.add.existing(this);
    this.setScale(2.3);
    this.setFlipX(true);

  }

  InputConfig() {
    this.keys = this.scene.input.keyboard.addKeys({
      // movement keys
      'W': Phaser.Input.Keyboard.KeyCodes.W,
      'A': Phaser.Input.Keyboard.KeyCodes.A,
      'S': Phaser.Input.Keyboard.KeyCodes.S,
      'D': Phaser.Input.Keyboard.KeyCodes.D,
      'Space': Phaser.Input.Keyboard.KeyCodes.SPACE
    });
  }
  // physics actions
  handleMovements(){
    const speed = 250;
    const jumpHeight = 300;
    // left
    
    if(!this.body.blocked.down == false){  
    
      if(this.keys.A.isDown){
        this.setVelocityX(-speed);
        this.setFlipX(true);
        this.anims.play('pmain-run',true);
      }

      // right
      
      else if(this.keys.D.isDown){
        this.setVelocityX(speed);
        this.setFlipX(false);      
        this.anims.play('pmain-run',true);    
      }
      else{
        this.setVelocityX(0);
        this.anims.stop();
      }
    }
    
    // jump
    if (this.keys.Space.isDown && this.body.blocked.down) // check if player is on floor.
    {
      this.setVelocityY(-jumpHeight);
    }
  }
}