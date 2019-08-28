import {GameObjects} from 'phaser';

const {Rectangle} = GameObjects;

export default class Platfoem extends Rectangle{
  constructor(scene,x,y){
    super(scene,x,y);
    this.fillColor = "black";
    this.scene.physics.world.enableBody(this);

    this.scene.add.existing(this);

    this.body.setCollideWorldBounds(true);
  }
}