import { Sprite } from "../../sprite.js";
import { resources } from "../../Resource";
import { Vector2 } from "../../vector2.js";
import { DOWN, Input, LEFT, RIGHT, UP } from "../../Input.js";
import { isSpaceFree } from "../../helpers/grid.js";
import { moveTowards } from "../../helpers/moveTowards.js";
import { Animations } from "../../animation.js";
import { FrameIndexPattern } from "../../FrameIndexPattern.js";
import { WALK_DOWN, WALK_LEFT, WALK_RIGHT, WALK_UP, STAND_DOWN, STAND_LEFT, STAND_RIGHT, STAND_UP, PICK_UP_DOWN } from "../../objects/Hero/heroAnimations.js";
import { GameObject } from "../../GameObject.js";
import { events } from "../../Events.js";

export class Hero extends GameObject {
    constructor(x, y) {
        super({
            position: new Vector2(x, y)
        });

        const shadow = new Sprite({
            resource: resources.images.shadow,
            frameSize: new Vector2(32, 32),
            position: new Vector2(-8, -18)

        })

        this.addChild(shadow);

        this.body = new Sprite({
            resource: resources.images.hero,
            frameSize: new Vector2(32, 32),
            hFrames: 3,
            vFrames: 8,
            frame: 1,
            position: new Vector2(-8, -18),
            animation: new Animations({
                walkDown: new FrameIndexPattern(WALK_DOWN),
                walkLeft: new FrameIndexPattern(WALK_LEFT),
                walkUp: new FrameIndexPattern(WALK_UP),
                walkRight: new FrameIndexPattern(WALK_RIGHT),
                standDown: new FrameIndexPattern(STAND_DOWN),
                standLeft: new FrameIndexPattern(STAND_LEFT),
                standUp: new FrameIndexPattern(STAND_UP),
                standRight: new FrameIndexPattern(STAND_RIGHT),
                pickUpDown: new FrameIndexPattern(PICK_UP_DOWN),
            })
        })

        this.addChild(this.body);
        this.facingDirection = DOWN;
        this.DestinationPosition = this.position.duplicate();
        this.itemPickUpTime = 0;
        this.itemPickupShell = null;
        this.isLocked = false;

        events.on("HERO_PICKS_UP_ITEM", this, data => {
            this.onPickUpItem(data)
        })
    }

    ready() {
        events.on("START_TEXT_BOX", this, () => {
            this.isLocked = true;
        })
        events.on("END_TEXT_BOX", this, () => {
            this.isLocked = false;
        })
    }

    step(delta, root) {

        if (this.isLocked) {
            return;
        }

        if (this.itemPickUpTime > 0) {
            this.workOnItemPickup(delta);
            return;
        }

        
        /** @type {Input} */
        const input = root.input;
        if (input?.getActionJustPressed("Space")) {
            console.log("ACTION!");

            const objAtPosition = this.parent.children.find(child => {
                return child.position.matches(this.position.toNeighbor(this.facingDirection))
            })
            
            if (objAtPosition) {
                events.emit("HERO_REQUESTS_ACTION", objAtPosition)
            }
        }

        const distance = moveTowards(this, this.DestinationPosition, 1);
        const hasArrived = distance <= 1;
        if (hasArrived) {
            this.tryMove(root)
        }

        this.tryEmitPosition();
    }

    tryEmitPosition() {
        if (this.lastX === this.position.x && this.lastY === this.position.y) {
            return;
        }
        this.lastX = this.position.x;
        this.lastY = this.position.y;
        events.emit("HERO_POSITION", this.position);
    }

    tryMove(root) {
        const {input} = root;

        if (!input.direction) {

            if (this.facingDirection === LEFT) { this.body.animations.play("standLeft");}        
            if (this.facingDirection === RIGHT) { this.body.animations.play("standRight");}
            if (this.facingDirection === UP) { this.body.animations.play("standUp");}
            if (this.facingDirection === DOWN) { this.body.animations.play("standDown");}

            return;
        }

        let nextX = this.DestinationPosition.x;
        let nextY = this.DestinationPosition.y;
        const gridSize = 16;

        if (input.direction === DOWN) {
            nextY += gridSize;
            this.body.animations.play("walkDown");
        }
        if (input.direction === LEFT) {
            nextX -= gridSize;
            this.body.animations.play("walkLeft");
        }
        if (input.direction === RIGHT) {
            nextX += gridSize;
            this.body.animations.play("walkRight");
        }
        if (input.direction === UP) {
            nextY -= gridSize;
            this.body.animations.play("walkUp");
        }
        this.facingDirection = input.direction ?? this.facingDirection;

        // Make sure the desired position is free

        const spaceIsFree = isSpaceFree(root.level?.walls, nextX, nextY);

        const solidBodyAtSpace = this.parent.children.find(c => {
            return c.isSolid && c.position.x === nextX && c.position.y === nextY
        })

        if (spaceIsFree && !solidBodyAtSpace) {
            this.DestinationPosition.x = nextX;
            this.DestinationPosition.y = nextY;
        } else {
            // window.location.href = "https://stackoverflow.com";
        }
    }

    onPickUpItem({ image, position }) {
        this.DestinationPosition = position.duplicate();

        this.itemPickUpTime = 500;

        this.itemPickupShell = new GameObject({});

        this.itemPickupShell.addChild(
            new Sprite({
                resource: image,
                position: new Vector2(0, -14)
            })
        )
        this.addChild(this.itemPickupShell);      

    }

    workOnItemPickup(delta) {
        this.itemPickUpTime -= delta;
        this.body.animations.play("pickUpDown")

        if (this.itemPickUpTime <= 0) {
            this.itemPickupShell.destroy()
        }
    }
}