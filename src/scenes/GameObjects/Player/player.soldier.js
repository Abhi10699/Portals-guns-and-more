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
    let portalGun = new LaserGun(this.scene,this.x,this.y,this);
    this.guns.add(portalGun);
  
  
  }

  // TODO: when many guns will be added to this player
  addGunsToGroup(){
    
  }

  // TODO: will be added using a gui
  changeActiveGun(gun){

  }

  takeDamage(damage){
    this.health-= damage;
  }
  
  update(){
    this.handleMovements();
    // update guns
    this.guns.children.each(gun=>{
      gun.update();
    })
  }
}