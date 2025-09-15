import { events } from "./Events";
import { Vector2 } from "./vector2";

export class GameObject {
    constructor({ position }) {
        this.position = position ?? new Vector2;
        this.children = [];
        this.parent = null;
        this.hasReadyBeenCalled = false;
    }

    stepEntry(delta, root) {
        this.children.forEach((child) => child.stepEntry(delta, root));

        if (!this.hasReadyBeenCalled) {
            this.hasReadyBeenCalled = true;
            this.ready();
        }

        this.step(delta, root);
    }


    // Called on the first frame in which it is a part of
    ready() {

    }

    // Called every frame
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

    destroy() {
        this.children.forEach(child => {
            child.destroy();
        })
        this.parent.removeChild(this)
    }

    addChild(gameObject) {
        gameObject.parent = this;
        this.children.push(gameObject);
    }

    removeChild(gameObject) {
        events.unsubscribe(gameObject);
        this.children = this.children.filter(g => {
            return gameObject !== g;
        })
    }
}