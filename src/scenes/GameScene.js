import {Scene} from 'phaser';
import Player from './Player';

export default class GameScene extends Scene{
  constructor(){
    super('game-scene');
  }

  create(){
    this.player = new Player(this,100,100);
  }
  update(){
    this.player.update();
  }
}