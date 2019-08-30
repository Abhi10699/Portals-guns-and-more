import {Physics, Scene} from 'phaser';
import Gun from './Gun';

const {Sprite} = Physics.Arcade;

export default class Bullet extends Sprite{

  constructor(scene:Scene,x:number,y:number,key:string,frame:number){
    super(scene,x,y,key,frame);
    this.scene.physics.world.enableBody(this);
    this.scene.add.existing(this);
  }

  moveToTarget(target,speed){
    this.scene.physics.accelerateToObject(this,target,speed);
  }

  
  static bulletDirection(parent:Gun){
    if(parent.flipX == true){
      return true;
    }
    else{
      return false;
    }
  }
}