import {Physics} from 'phaser';

const {Sprite} = Physics.Arcade;

export default class Bullet extends Sprite{
  constructor(scene,x,y,key,frame){
    super(scene,x,y,key,frame);
    this.scene.physics.world.enableBody(this);
    this.scene.add.existing(this);
  }

  moveToTarget(target,speed){
    this.scene.physics.accelerateToObject(this,target,speed);
  }

  
  static bulletDirection(parent){
    if(parent.flipX == true){
      return true;
    }
    else{
      return false;
    }
  }
}