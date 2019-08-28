import {Physics} from 'phaser';
import Portal from './Portal';

const {Sprite} = Physics.Arcade;

export default class Player extends Sprite{
  
  constructor(scene,x,y){
    super(scene,x,y,'player-main',0);

    this.scene.physics.world.enableBody(this);
    this.setCollideWorldBounds(true);
  
    // controll keys
    this.InputConfig();

    this.body.gravity.y = 500;

    this.portalGroup = this.scene.physics.add.group();
    this.scene.add.existing(this);
    this.setScale(2.3);
    this.setFlipX(true);
    this.PortalDistance = 130;
    this.scene.physics.add.overlap(this,this.portalGroup);
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

  handleMovements(){
    const speed = 250;
    const jumpHeight = 300;
    // left
    
    // if(!this.body.blocked.down == false){  
    
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
    // }
    
    // jump
    if (this.keys.Space.isDown && this.body.blocked.down) // check if player is on floor.
    {
      this.setVelocityY(-jumpHeight);
    }
  }


  handleActions(){
    
    // spwan portal where mouse is

    if(this.scene.input.activePointer.isDown){
      this.spawnPortal();
    }
  }

  spawnPortal() {
    const portalDirection = this.flipX ? -1 : 1;
    let mouseX = this.scene.input.activePointer.x;
    let mouseY = this.scene.input.activePointer.y;
    let source_portal = new Portal(this.scene, (this.x) + (this.PortalDistance * portalDirection), this.y);
    let destination_portal = new Portal(this.scene, mouseX, mouseY);
    source_portal.setPortalEnd(destination_portal, portalDirection);
    destination_portal.setPortalEnd(source_portal, -portalDirection);
    this.portalGroup.add(source_portal);
    this.portalGroup.add(destination_portal);
  }

  update(){

    this.handleMovements();
    this.handleActions();
    this.handlePortals();
  }

  handlePortals(){
    this.scene.physics.world.overlap(this,this.portalGroup,null,(player,portal)=>{
      // ensure if portal is a valid object 
      if(portal instanceof Portal){
        if(portal.portalEnd != null){
          this.teleportPlayer(portal);
        }
      }
    },null)
  }

  teleportPlayer(portal) {
    let portalX = portal.portalEnd.x;
    let portalY = portal.portalEnd.y;
    let flipValue = portal.portalEnd.exitFlip;
    this.setPosition(portalX + (100 * flipValue), portalY);
  }
}