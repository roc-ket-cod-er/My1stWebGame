import { DOWN, LEFT, RIGHT, UP } from "./Input";

export class Vector2 {
    constructor(x = 0, y = 0) {
        this.x = x;
        this.y = y;
    }

    duplicate() {
        return new Vector2(this.x, this.y)
    }

    matches(otherVector2) {
        return this.x === otherVector2.x && this.y === otherVector2.y;
    }

    toNeighbor(dir) {
        let x = this.x;
        let y = this.y;
        if (dir === LEFT) { x -= 16 }
        if (dir === RIGHT) { x += 16 }
        if (dir === UP) { y -= 16 }
        if (dir === DOWN) { y += 16 }
        return new Vector2(x, y);
    }
}