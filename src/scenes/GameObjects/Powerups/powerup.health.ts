import Powerup from "./Powerup";
import { Scene } from "phaser";

export default class HealthPowerup extends Powerup{
  constructor(scene:Scene,x:number,y:number){
    super(scene,x,y,'Heart',0);
  }
}