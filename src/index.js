import {Game} from 'phaser';
import GameScene from './scenes/GameScene';
import PreloadScene from './scenes/preload';

const WIDTH = window.innerWidth;
const HEIGHT = window.innerHeight;

const config = {
  width:WIDTH,
  height:HEIGHT,
  pixelArt:true,
  physics:{
    default:'arcade',
    fps:60,
    arcade:{
      debug:true,
    }
  },
  scene:[PreloadScene,GameScene]
}

const game = new Game(config);