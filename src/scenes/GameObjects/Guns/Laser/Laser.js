import Bullet from "../Bullet";

export default class LaserBullet extends Bullet{
  constructor(gun){
    super(gun.scene,gun.x,gun.y,'bullets',6);
    this.lifeTime = 2000; // in seconds
    this.speed = 1400;
    
    this.setDepth(-1);
    this.gun = gun;
    this.scene.time.delayedCall(this.lifeTime,()=>{
      this.killBullet();
    },null)

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