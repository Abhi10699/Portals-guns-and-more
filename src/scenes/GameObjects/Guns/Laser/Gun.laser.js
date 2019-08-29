import Gun from "../Gun";
import LaserBullet from "./Laser";

export default class LaserGun extends Gun{
  constructor(scene,x,y,player){
    super(scene,x,y,'guns',0);
    this.player = player;
    this.bulletGroup = this.scene.physics.add.group();
    
    this.fireRate = 200; // bullets per second
    this.magazineSize = 30;

    this.canShoot = true;
  }

  shoot(){
    if(this.canShoot){
      let _laserBullet = new LaserBullet(this);
      this.bulletGroup.add(_laserBullet);
      this.canShoot = false;
      this.setCooldown();
    }
  }

  setCooldown(){
    this.scene.time.addEvent({
      delay:this.fireRate,
      callback:()=>{this.canShoot = true}
    })
  }

  update(){
    this.handleActions();
    this.handlePositions(this.player);

    this.bulletGroup.children.each(bullet=>{
      bullet.fire();
    })
  }
}