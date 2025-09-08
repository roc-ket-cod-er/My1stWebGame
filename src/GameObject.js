import { Vector2 } from "./vector2";

export class GameObject {
    constructor({ position }) {
        this.position = position ?? new Vector2;
        this.children = [];
    }

    stepEntry(delta, root) {
        this.children.forEach((child) => child.stepEntry(delta, root));
        this.step(delta, root);
    }


    step(_delta) {

    }

    draw(ctx, x, y) {
        const drawPosX = x + this.position.x;
        const drawPosY = y + this.position.y;

        this.drawImage(ctx, drawPosX, drawPosY);

        this.children.forEach((child) => child.draw(ctx, drawPosX, drawPosY));
    }

    drawImage(ctx, drawPosX, drawPosY) {
        //
    }

    addChild(GameObject) {
        this.children.push(GameObject);
    }

    removeChild(gameObject) {
        this.children = this.children.filter(g => {
            return gameObject !== g;
        })
    }
}