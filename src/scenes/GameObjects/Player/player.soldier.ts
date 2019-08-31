import Player from "./Player";
import PortalGun from "../Guns/Portal/Gun.PortalGun";
import LaserGun from "../Guns/Laser/Gun.laser";
import { Scene } from "phaser";
import Gun from "../Guns/Gun";

export default class Soldier extends Player{
  
  health: number;
  guns: Phaser.GameObjects.Group;
  activeGun: any;
  weaponKeys: any;


  constructor(scene:Scene,x:number,y:number){
    super(scene,x,y,'player-main',0);
    
    // data
    this.health = 100;
    this.guns = this.scene.add.group();
    this.activeGun = null;

    // portal gun
    // this.guns.add(portalGun);  
  }

  // TODO: when many guns will be added to this player
  switchWeapon(){
    // portal gun  
    if(this.weaponKeys.Q.isDown){
      let portalGun = new PortalGun(this.scene,this.x,this.y,this);      
      this.setActiveGun(portalGun);
    }
    if(this.weaponKeys.E.isDown){
      let laserGun = new LaserGun(this.scene,this.x,this.y,this);
      this.setActiveGun(laserGun);
    }
  }

  // TODO: will be added using a gui
  setActiveGun(gun:Gun){
    if(this.activeGun == null){
      this.activeGun = gun;
    }
    else{
      this.activeGun.setActive(false);
      this.activeGun.setVisible(false);
      this.activeGun = gun;
    }
  }

  takeDamage(damage:number){
    this.health-= damage;
    if(this.health <= 0){
      this.anims.play('pmain-die');
    }
  }
  
  update(){
    this.handleMovements();
    this.switchWeapon();
    
    super.handlePowerups();
    super.powerupUpdate()

    if(this.activeGun != null){
      this.activeGun.update();
    }
  }
}