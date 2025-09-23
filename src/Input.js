export const LEFT = "LEFT"
export const RIGHT = "RIGHT"
export const DOWN = "DOWN"
export const UP = "UP"

export class Input {
    constructor() {

        this.heldDirection = [];
        this.keys = {};
        this.lastKeys = {};

        document.addEventListener("keydown", (e) => {

            this.keys[e.code] = true;
            
            if (e.code === "ArrowUp" || e.code === "KeyW") {
                this.onArrowPressed(UP);
            }
            if (e.code === "ArrowDown" || e.code === "KeyS") {
                this.onArrowPressed(DOWN);
            }
            if (e.code === "ArrowLeft" || e.code === "KeyA") {
                this.onArrowPressed(LEFT);
            }
            if (e.code === "ArrowRight" || e.code === "KeyD") {
                this.onArrowPressed(RIGHT);
            }
        })

        document.addEventListener("keyup", (e) => {

            this.keys[e.code] = false;
            
            if (e.code === "ArrowUp" || e.code === "KeyW") {
                this.onArrowReleased(UP);
            }
            if (e.code === "ArrowDown" || e.code === "KeyS") {
                this.onArrowReleased(DOWN);
            }
            if (e.code === "ArrowLeft" || e.code === "KeyA") {
                this.onArrowReleased(LEFT);
            }
            if (e.code === "ArrowRight" || e.code === "KeyD") {
                this.onArrowReleased(RIGHT);
            }
        })
    }

    get direction() {
        return this.heldDirection[0];
    }

    update () {
        this.lastKeys = {...this.keys};
    }

    getActionJustPressed(keyCode) {
        let justPressed = false;
        if (this.keys[keyCode] && !this.lastKeys[keyCode]) {
            justPressed = true;
        }
        return justPressed;
    }

    onArrowPressed(direction) {
        if (this.heldDirection.indexOf(direction) === -1) {
            this.heldDirection.unshift(direction);
        }
    }

    onArrowReleased(direction) {
        const index = this.heldDirection.indexOf(direction);
        if (index === -1) {
            return;
        }

        this.heldDirection.splice(index, 1);


    }
}