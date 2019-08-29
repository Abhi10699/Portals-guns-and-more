import {GameObjects} from 'phaser';

const {Sprite} = GameObjects;

export default class Gun extends Sprite{
  constructor(scene,x,y,key,frame){
    super(scene,x,y,key,frame);
    this.scene.add.existing(this); 

    // configs
    this.setScale(1.2);
    this.positionOffset ={x:7,y:9};
  
  }

  handlePositions(parent){
    this.flipX = parent.flipX;

    if(this.flipX == true){
      this.positionOffset.x = -5;
    }
    else{
      this.positionOffset.x = 5;
    }
    this.setPosition(parent.x + this.positionOffset.x,parent.y + this.positionOffset.y);
  }

  handleActions(){    
    if(this.scene.input.mousePointer.isDown){
      this.shoot();
    }
  }

  shoot(){
    console.log("Actions coming soon");
  }
}