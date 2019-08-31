import Powerup from "./Powerup";
import { Scene } from "phaser";
import Player from "../Player/Player";

export default class Shield extends Powerup{

  player: Player;

  constructor(player:Player){
    // @ts-ignore
    super(player.scene,player.x,player.y,'Shield',0);
    this.setAlpha(0.8);
    this.setSize(this.width/2,this.height/2);
    this.setScale(2)
    this.player = player;
    this.startDecay();
  }
  
  startDecay(cooldown:number = 5){
    let inSeconds = cooldown * 1000;
    this.scene.time.addEvent({
      delay:inSeconds,
      callback:()=>{
        this.destroy();
        this.player.shieldActive = false;
      }
    })
  }
  
  update(){
    this.setPosition(this.player.x,this.player.y);
  }
} 