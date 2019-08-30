import Gun from "../Gun";
import LaserBullet from "./Laser";
import { Scene } from "phaser";
import Player from "../../Player/Player";

export default class LaserGun extends Gun{
  
  player: any;
  bulletGroup: Phaser.Physics.Arcade.Group;
  fireRate: number;
  magazineSize: number;
  canShoot: boolean;

  constructor(scene:Scene,x:number,y:number,player:Player){
    super(scene,x,y,'guns',0);
    this.player = player;
    this.bulletGroup = this.scene.physics.add.group();
    
    this.fireRate = 200; // bullets per second
    this.magazineSize = 30;

    this.canShoot = true;
  }

  shoot(){
    if(this.canShoot){
      let _laserBullet = new LaserBullet(this.scene,this.x,this.y,this);
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
          
      //@ts-ignore
      bullet.fire();
    })
  }
}