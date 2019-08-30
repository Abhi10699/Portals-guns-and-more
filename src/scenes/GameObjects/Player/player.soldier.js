import Player from "./Player";
import PortalGun from "../Guns/Portal/Gun.PortalGun";
import LaserGun from "../Guns/Laser/Gun.laser";

export default class Soldier extends Player{
  constructor(scene,x,y){
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
  setActiveGun(gun){
    if(this.activeGun == null){
      this.activeGun = gun;
    }
    else{
      this.activeGun.setActive(false);
      this.activeGun.setVisible(false);
      this.activeGun = gun;
    }
  }

  takeDamage(damage){
    this.health-= damage;
    if(this.health <= 0){
      this.anims.play('pmain-die');
    }
  }
  
  update(){
    this.handleMovements();
    this.switchWeapon();
    // update guns
    // this.guns.children.each(gun=>{
    //   gun.update();
    // })

    if(this.activeGun != null){
      this.activeGun.update();
    }
  }
}