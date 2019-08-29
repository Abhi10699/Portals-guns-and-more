import Player from "./Player.Base";
import PortalGun from "../Guns/Gun.PortalGun";

export default class Soldier extends Player{
  constructor(scene,x,y,){
    super(scene,x,y,'player-main',0);
    
    // data
    this.health = 100;
    this.guns = this.scene.add.group();
    this.activeGun = null;

    // portal gun
    let portalGun = new PortalGun(this.scene,this.x,this.y,this);
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