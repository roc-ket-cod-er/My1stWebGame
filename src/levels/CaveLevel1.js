import { gridCells } from "../helpers/grid";
import { Exit } from "../objects/Exit/Exit";
import { Hero } from "../objects/Hero/Hero";
import { Level } from "../objects/Level/Level";
import { Rod } from "../objects/Rod/Rod";
import { resources } from "../Resource";
import { Sprite } from "../sprite";
import { Vector2 } from "../vector2";
import { events } from "../Events";
import { OutdoorLevel1 } from "../levels/OutdoorLevel1"
import { NPC } from "../objects/NPC/NPC";
import { TALKED_TO_A, TALKED_TO_B } from "../StoryFlags";

const DEFAULT_HERO_POSITION = new Vector2(gridCells(6), gridCells(5))

export class CaveLevel1 extends Level {
    constructor(params={}) {
        super({});
        this.background = new Sprite({
            resource: resources.images.cave,
            frameSize: new Vector2(320, 180),
        })

        const ground = new Sprite({
            resource: resources.images.caveGround,
            frameSize: new Vector2(320, 180),
        })
        this.addChild(ground);

        const exit = new Exit(gridCells(3), gridCells(5));
        this.addChild(exit);

        this.heroStart = params.heroPosition ?? DEFAULT_HERO_POSITION;
        const hero = new Hero(this.heroStart.x, this.heroStart.y);
        this.addChild(hero);

        const rod = new Rod(gridCells(9), gridCells(6));
        this.addChild(rod);

        const npc1 = new NPC(gridCells(5), gridCells(5), {
            content: [
                {
                    string: "I just can't stand that guy.",
                    requires: [TALKED_TO_B],
                    bypass: [TALKED_TO_A],
                    addsFlag: TALKED_TO_A,
                },
                {
                    string: "He is just the worst!",
                    requires: [TALKED_TO_A],
                },
                {
                    string: "Grumble grumble. Another day at work",
                    requires: [],
                }
            ],
            portrait: 1,
        });
        this.addChild(npc1);

        const npc2 = new NPC(gridCells(8), gridCells(5), {
            content: [
                {
                    string: "What a wonderful day to work in the cave, eh??",
                    requires: [],
                    addsFlag: TALKED_TO_B,
                }
            ],
            portrait: 0,
        });
        this.addChild(npc2);

        this.walls = new Set();
    }

    ready() {
        events.on("HERO_EXITS", this, () => {
            console.log("CHANGE THE MAP!!");
            events.emit("CHANGE_LEVEL", new OutdoorLevel1({
                heroPosition: new Vector2(gridCells(6), gridCells(4))
            }))
        })
    }
}