import "./style.css"
import {resources} from './src/Resource.js';
import { Sprite } from "./src/sprite.js";
import { Vector2 } from "./src/vector2.js";
import { GameLoop } from "./src/GameLoop.js";
import { Input} from "./src/Input.js";
import { gridCells } from "./src/helpers/grid.js";
import { GameObject } from "./src/GameObject.js";
import { Hero } from "./src/objects/Hero/Hero.js";


// Get Canvas To Draw To
const canvas = document.querySelector("#game-canvas");
const ctx = canvas.getContext("2d");

// Establish Root Scene
const mainScene = new GameObject({
    position: new Vector2(0,0)
})

// Add stuff to it
const skySprite = new Sprite({
    resource: resources.images.sky,
    frameSize: new Vector2(320, 180),
})
mainScene.addChild(skySprite);

const groundSprite = new Sprite({
    resource: resources.images.ground,
    frameSize: new Vector2(320, 180),
})
mainScene.addChild(groundSprite);


const hero = new Hero(gridCells(6), gridCells(5))
mainScene.addChild(hero)


// Add input class
mainScene.input = new Input();

// Update and draw loops
const update = (delta) => {
    mainScene.stepEntry(delta, mainScene);
};
const draw = () => {
    mainScene.draw(ctx, 0, 0);
}

// Start the game
const gameLoop = new GameLoop(update, draw);
gameLoop.start();