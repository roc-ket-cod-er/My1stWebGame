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
import { ENABLE_GEM3, ENABLE_GEM4, GOT_GEM_1, GOT_GEM_2, storyFlags, TALKED_TO_A, TALKED_TO_B } from "../StoryFlags";

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


        if (!storyFlags.getRelevantScenario([{requires: [GOT_GEM_2]}])) {
            const rod = new Rod(gridCells(9), gridCells(6), "LEVEL 2");
            this.addChild(rod);
        }

        const npc1 = new NPC(gridCells(5), gridCells(4), {
            content: [
                {
                    string: "You have begun your mission, have you?",
                    bypass: [GOT_GEM_1, GOT_GEM_2]
                },
                {
                    string: "Oh really? Well then I guess I will let you go...",
                    requires: [TALKED_TO_B],
                    addsFlag: TALKED_TO_A
                },
                {
                    string: "You should talk to the Knight on the upper level...",
                    requires: [TALKED_TO_A],
                },
                {
                    string: "Keep it up!"
                }
            ],
            portrait: 1,
        });
        this.addChild(npc1);

        const npc2 = new NPC(192, 48, {
            content: [
                {
                    string: "If you want to move on, tell the other guy the queen asks for you to be let through",
                    bypass: [TALKED_TO_B],
                    addsFlag: TALKED_TO_B,
                },
                {
                    string: "Go on now ...",
                    requires: [TALKED_TO_B],
                },
                {
                    string: "..."
                }
            ],
            portrait: 1,
        });
        this.addChild(npc2);

        this.walls = new Set();
        this.house = new Set();

this.walls.add("16,16");
this.walls.add("16,32");
this.walls.add("16,48");
this.walls.add("16,64");
this.walls.add("16,80");
this.walls.add("16,96");
this.walls.add("16,112");

this.walls.add("32,128");
this.walls.add("48,128");
this.walls.add("64,128");
this.walls.add("80,128");
this.walls.add("96,128");
this.walls.add("112,128");
this.walls.add("128,128");
this.walls.add("144,128");
this.walls.add("160,128");
this.walls.add("176,128");
this.walls.add("192,128");
this.walls.add("208,128");
this.walls.add("224,128");
this.walls.add("240,128");
this.walls.add("256,128");
this.walls.add("272,128");

this.walls.add("288,128");
this.walls.add("288,32");
this.walls.add("288,48");
this.walls.add("288,64");
this.walls.add("288,16");
this.walls.add("288,80");
this.walls.add("288,96");
this.walls.add("288,112");

this.walls.add("32,0");
this.walls.add("48,0");
this.walls.add("64,0");
this.walls.add("80,0");
this.walls.add("96,0");
this.walls.add("112,0");
this.walls.add("128,0");
this.walls.add("144,0");
this.walls.add("160,0");
this.walls.add("176,0");
this.walls.add("192,0");
this.walls.add("208,0");
this.walls.add("224,0");
this.walls.add("240,0");
this.walls.add("256,0");
this.walls.add("272,0");
this.walls.add("288,0");

this.walls.add("32,64");
this.walls.add("48,64");

this.walls.add("48,16");
this.walls.add("64,16");

this.walls.add("144,16");

this.walls.add("192,32");
this.walls.add("208,32");
this.walls.add("208,48");

this.walls.add("240,32");
this.walls.add("256,32");

this.walls.add("80,48");
this.walls.add("96,48");
this.walls.add("96,64");
this.walls.add("112,64");
this.walls.add("128,48");

this.walls.add("192,80");
this.walls.add("208,80");
this.walls.add("176,96");
this.walls.add("192,96");
this.walls.add("208,96");
this.walls.add("224,96");

this.walls.add("256,80");

this.walls.add("128,96");
this.walls.add("112,96");
this.walls.add("96,96");




    }

    ready() {
        events.on("HERO_EXITS", this, () => {
            console.log("CHANGE THE MAP!!");
            events.emit("CHANGE_LEVEL", new OutdoorLevel1({
                heroPosition: new Vector2(gridCells(6), gridCells(4))
            }))
        })
    }

    replenish() {
        storyFlags.add(ENABLE_GEM3)
        storyFlags.add(ENABLE_GEM4);
    }
}