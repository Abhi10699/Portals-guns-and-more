import {Physics, Scene} from 'phaser';
import Shield from '../Powerups/poweup.shield';
const {Sprite} = Physics.Arcade;

export default class Player extends Sprite{
  weaponKeys: object;
  keys: object;
  health:number;
  powerups:Phaser.GameObjects.Group;
  powerupKeys:Object
  
  // shield
  shield:Shield;
  shieldCooldown:number;
  shieldDuration:number;
  shieldDamageReduction:number;
  shieldActive:boolean = false;


  constructor(scene:Scene,x:number,y:number,key:string,frame:number){
    super(scene,x,y,key,frame);

    // player configration
    this.scene.physics.world.enableBody(this);
    this.setCollideWorldBounds(true);
    this.InputConfig();
    this.body.gravity.y = 500;
    this.scene.add.existing(this);
    this.setScale(2.3);
    this.setFlipX(true);


    // powerup groups
    this.powerups = this.scene.add.group();
    // activepowerups
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

    this.weaponKeys = this.scene.input.keyboard.addKeys({
      'Q':Phaser.Input.Keyboard.KeyCodes.Q,
      'E':Phaser.Input.Keyboard.KeyCodes.E
    })

    this.powerupKeys = this.scene.input.keyboard.addKeys({
      'Z':Phaser.Input.Keyboard.KeyCodes.Z
    })
  }
  // physics actions
  handleMovements(){
    const speed:number = 250;
    const jumpHeight:number = 300;
    // left
    
    if(!this.body.blocked.down == false){  
      
      //@ts-ignore

      if(this.keys.A.isDown){
        this.setVelocityX(-speed);
        this.setFlipX(true);
        this.anims.play('pmain-run',true);
      }

      // right
      
      //@ts-ignore

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
    
    //@ts-ignore

    if(this.keys.Space.isDown && this.body.blocked.down){ // check if player is on floor.
      this.setVelocityY(-jumpHeight);
    }
  }

  handlePowerups(){
    //@ts-ignore
    // shield
    if(this.powerupKeys.Z.isDown && this.shieldActive == false){
      this.shieldActive = true;
      let shieldTemp = new Shield(this);
      this.powerups.add(shieldTemp);
    }
  }

  powerupUpdate(){
    this.powerups.children.each(powerup=>{
      powerup.update();
    })
  }

  //TODO: calculate damage based on shield active..

  takeDamage(damage:number){
    if(this.shieldActive){
      // deal 50% less damage;
      this.health = this.health - (damage/2);
    }
    else{
      this.health = this.health - (damage/2);
    }
  }
}