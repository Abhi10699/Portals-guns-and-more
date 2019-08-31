import {Physics, Tilemaps, Scene, Animations} from 'phaser';

const {Sprite}  = Physics.Arcade;

export default class Portal extends Sprite{
  
  portalEnd: Portal;
  activeTime: number;
  exitFlip: any;

  constructor(scene:Scene,x:number,y:number){

    super(scene,x,y,'portal',0);

    this.scene.physics.world.enableBody(this);
    
    // portal config
    this.body.setSize(this.width - 50,this.height - 20);
    this.setScale(2.2);
    this.scene.add.existing(this);



    this.anims.play('portal-open');
    this.anims.chain('portal-active');
    
    // main stuff

    this.portalEnd = null;
    this.activeTime = 4000;

    this.exitFlip = null;

    this.scene.time.delayedCall(this.activeTime,()=>{
      this.anims.play('portal-close');
    },null,null)


    this.on('animationcomplete',(anim:Animations.Animation,frame:number)=>{
      this.killPortal(anim);
    })
  }

  killPortal(anim:Animations.Animation) {
    if (anim.key == 'portal-close') {
      this.destroy(true);
    }
  }

  setPortalEnd(portal:Portal,flip){
    this.portalEnd = portal;
    this.portalEnd.exitFlip = flip;
  }

  getPortalEnd(){
    return this.portalEnd;
  }
}