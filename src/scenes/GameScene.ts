import {Scene} from 'phaser';
import Soldier from './GameObjects/Player/player.soldier';
import Shield from './GameObjects/Powerups/poweup.shield';


export default class GameScene extends Scene{
  
  player: Soldier;
  map: Phaser.Tilemaps.Tilemap;
  powerup:Phaser.GameObjects.Group
  shield: Shield;

  constructor(){
    super('game-scene');
  }

  create(){
    this.player = new Soldier(this,100,100);
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