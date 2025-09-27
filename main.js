import "./style.css"
import { Vector2 } from "./src/vector2.js";
import { GameLoop } from "./src/GameLoop.js";
import { Main } from "./src/objects/Main/Main.js";
import { OutdoorLevel1 } from "./src/levels/OutdoorLevel1.js";

if (!confirm("Use Arrows / WASD to move, space for action.")) {
    throw new Error();
}

// Get Canvas To Draw To
const canvas = document.querySelector("#game-canvas");
const ctx = canvas.getContext("2d");

// Establish Root Scene
const mainScene = new Main({
    position: new Vector2(0,0)
})
mainScene.setLevel(new OutdoorLevel1())

// Update and draw loops
const update = (delta) => {
    mainScene.stepEntry(delta, mainScene);
    mainScene.input?.update();
};

const draw = () => {
    ctx.clearRect(0, 0, canvas.clientWidth, canvas.height);
    mainScene.drawBackground(ctx);
    ctx.save();

    if (mainScene.camera) {
        ctx.translate(mainScene.camera.position.x, mainScene.camera.position.y);
    }

    mainScene.drawObjects(ctx);
    ctx.restore();

    mainScene.drawForeground(ctx);
}


// Start the game
const gameLoop = new GameLoop(update, draw);
gameLoop.start();
