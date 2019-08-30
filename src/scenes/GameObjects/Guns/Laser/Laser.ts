import Bullet from "../Bullet";
import LaserGun from "./Gun.laser";
import { Scene } from "phaser";

export default class LaserBullet extends Bullet{
  
  lifeTime: number;
  speed: number;
  isLeft: number;
  gun:LaserGun

  constructor(scene:Scene,x:number,y:number,gun:LaserGun){
    super(scene,x,y,'bullets',6);
    this.lifeTime = 2000; // in seconds
    this.speed = 1400;
    
    this.setDepth(-1);
    this.gun = gun;
    this.scene.time.delayedCall(this.lifeTime,()=>{
      this.killBullet();
    },null,this)

    this.isLeft = gun.flipX ? -1 : 1;
  }

  killBullet(){
    console.log("Bullet Killed");
    this.destroy(true);
  }

  fire(){
    this.body.velocity.x = this.isLeft * this.speed;        
  }
}