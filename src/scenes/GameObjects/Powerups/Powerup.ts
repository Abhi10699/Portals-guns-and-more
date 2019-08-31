import {Physics, Scene} from 'phaser';
import Player from '../Player/Player';

const {Sprite} = Physics.Arcade;

export default class Powerup extends Sprite{
	
	powerupDuration:number;

	constructor(scene:Scene,x:number,y:number,texture:string,frame:number){
		super(scene,x,y,texture,frame);
		this.scene.physics.world.enableBody(this);
		this.scene.add.existing(this);
	}
}