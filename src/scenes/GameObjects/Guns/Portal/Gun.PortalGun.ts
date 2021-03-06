import Gun from '../Gun';
import Portal from './Portal';


export default class PortalGun extends Gun{
  
  player: any;
  cooldown: number;
  portalGroup: Phaser.Physics.Arcade.Group;
  PortalDistance: number;
  canShoot: boolean;

  constructor(playerScene,x,y,player){
    super(playerScene,x,y,'guns',6);
    this.player = player;
    this.cooldown = 2000; // cooldown duration in milliseconds

    this.portalGroup = this.scene.physics.add.group();
    this.PortalDistance = 100;
    this.canShoot = true;
  }


  handlePortals(){
    this.scene.physics.world.overlap(this.player,this.portalGroup,null,(player,portal)=>{
      // ensure if portal is a valid object 
      console.log(player);
      if(portal instanceof Portal){
        if(portal.portalEnd != null){
          this.teleportPlayer(portal,player);
        }
      }
    },null)
  }

  teleportPlayer(portal,player) {
    let portalX = portal.portalEnd.x;
    let portalY = portal.portalEnd.y;
    let flipValue = portal.portalEnd.exitFlip;
    player.setPosition(portalX + (100 * flipValue), portalY);
  }
  
  spawnPortal() {
   
    let {player} = this;
    const portalDirection = this.flipX ? -1 : 1;
    let mouseX = this.scene.input.activePointer.x;
    let mouseY = this.scene.input.activePointer.y;
    let source_portal = new Portal(this.scene, (player.x) + (this.PortalDistance * portalDirection), player.y);
    let destination_portal = new Portal(this.scene, mouseX, mouseY);
    source_portal.setPortalEnd(destination_portal, portalDirection);
    destination_portal.setPortalEnd(source_portal, -portalDirection);
    this.portalGroup.add(source_portal);
    this.portalGroup.add(destination_portal);
  }

  startCooldown(){
    this.scene.time.addEvent({
      delay:this.cooldown,
      callback:()=>this.canShoot = true
    })
  }

  shoot(){
    if(this.canShoot == true){
      this.spawnPortal();
      this.canShoot = false;
      this.startCooldown();
    }
  }

  update(){
    this.handlePositions(this.player);
    this.handleActions();
    this.handlePortals();
  }
}