import {Scene} from 'phaser';
import Player from './GameObjects/Player';
import Platfoem from './GameObjects/Platforms';

export default class GameScene extends Scene{
  constructor(){
    super('game-scene');
  }

  create(){
    this.player = new Player(this,100,100);
    this.cameras.main.setBackgroundColor('#5d5d5d')
    

    this.map = this.add.tilemap('World',16,16);
    
    let tilemap = this.map.addTilesetImage('environment_set','tiles');
    let platforms  = this.map.createStaticLayer('Base',tilemap).setScale(2);


    this.physics.add.collider(this.player,platforms);
    platforms.setCollisionByProperty({collides:true})

  }
  update(){
    this.player.update();
  }
}