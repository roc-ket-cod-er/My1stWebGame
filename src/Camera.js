import { events } from "./Events";
import { GameObject } from "./GameObject";
import { Vector2 } from "./vector2";

export class Camera extends GameObject {
    constructor() {
        super({});

        events.on("HERO_POSITION", this, heroPosition => {

            const personfHalf = 8;
            const canvasWidth = 320;
            const canvasHeight = 180;
            const halfWidth = -personfHalf + canvasWidth/2
            const halfHeight = -personfHalf + canvasHeight/2

            this.position = new Vector2(
                -heroPosition.x + halfWidth,
                -heroPosition.y + halfHeight
            );
        })

    }
}