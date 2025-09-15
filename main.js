import "./style.css"
import {resources} from './src/Resource.js';
import { Sprite } from "./src/sprite.js";
import { Vector2 } from "./src/vector2.js";
import { GameLoop } from "./src/GameLoop.js";
import { Input} from "./src/Input.js";
import { gridCells } from "./src/helpers/grid.js";
import { GameObject } from "./src/GameObject.js";
import { Hero } from "./src/objects/Hero/Hero.js";
import { Camera } from "./src/Camera.js";
import { Rod } from "./src/objects/Rod/Rod.js";
import { Inventory } from "./src/objects/Inventory/Inventory.js";


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

const groundSprite = new Sprite({
    resource: resources.images.ground,
    frameSize: new Vector2(320, 180),
})
mainScene.addChild(groundSprite);


const hero = new Hero(gridCells(6), gridCells(5));
mainScene.addChild(hero);

const camera = new Camera()
mainScene.addChild(camera);

const rod = new Rod(gridCells(7), gridCells(6));
mainScene.addChild(rod);

const inventory = new Inventory();


// Add input class
mainScene.input = new Input();

// Update and draw loops
const update = (delta) => {
    mainScene.stepEntry(delta, mainScene);
};
const draw = () => {

    ctx.clearRect(0, 0, canvas.clientWidth, canvas.height);

    skySprite.draw(ctx, 0, 0)

    ctx.save();

    ctx.translate(camera.position.x, camera.position.y);

    mainScene.draw(ctx, 0, 0);

    ctx.restore();

    inventory.draw(ctx, 0, 0);
}

// Start the game
const gameLoop = new GameLoop(update, draw);
gameLoop.start();