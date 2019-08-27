import {Physics, Tilemaps} from 'phaser';

const {Sprite}  = Physics.Arcade;

export default class Portal extends Sprite{
  constructor(scene,x,y){
    super(scene,x,y,'portal',0);

    this.scene.physics.world.enableBody(this);
    
    // portal config
    this.body.setSize(this.width - 50,this.height - 20);
    this.setScale(4);
    this.scene.add.existing(this);



    this.anims.play('portal-open');
    this.anims.chain('portal-active');
    
    
    // main stuff

    this.portalEnd = null;
    this.activeTime = 4000;

    this.exitFlip = null;

    this.scene.time.delayedCall(this.activeTime,()=>{
      this.anims.play('portal-close');
    })


    this.on('animationcomplete',(anim,frame)=>{
      this.killPortal(anim);
    })
  }

  killPortal(anim) {
    if (anim.key == 'portal-close') {
      this.destroy(true);
    }
  }

  setPortalEnd(portal,flip){
    this.portalEnd = portal;
    this.portalEnd.exitFlip = flip;
  }

  getPortalEnd(){
    return this.portalEnd;
  }
}