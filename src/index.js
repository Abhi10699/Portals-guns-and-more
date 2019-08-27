import {Game} from 'phaser';
import GameScene from './scenes/GameScene';
import PreloadScene from './scenes/preload';

const WIDTH = window.innerWidth;
const HEIGHT = window.innerHeight;

const config = {
  width:WIDTH/2,
  height:HEIGHT/2,
  physics:{
    default:'arcade',
    arcade:{
      debug:false
    }
  },
  scene:[PreloadScene,GameScene]
}

const game = new Game(config);