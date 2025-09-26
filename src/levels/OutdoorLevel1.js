import { Level } from "../objects/Level/Level";
import { Sprite } from "../sprite";
import { Exit } from "../objects/Exit/Exit";
import { Hero } from "../objects/Hero/Hero";
import { Rod } from "../objects/Rod/Rod";
import { resources } from "../Resource";
import { Vector2 } from "../vector2";
import { gridCells } from "../helpers/grid";
import { CaveLevel1 } from "./CaveLevel1";
import { events } from "../Events";
import { BOT1_TALK1, BOT1_TALK2, BOT1_TALK3, BOT1_TALK4, GOT_GEM_1, GOT_GEM_2, storyFlags, TALKED_TO_A, TALKED_TO_B } from "../StoryFlags";
import { NPC } from "../objects/NPC/NPC";

const DEFAULT_HERO_POSITION = new Vector2(gridCells(6), gridCells(5));

export class OutdoorLevel1 extends Level {
    constructor(params={}) {
        super({});
        this.background = new Sprite({
            resource: resources.images.sky,
            frameSize: new Vector2(320, 180),
        })

        const groundSprite = new Sprite({
            resource: resources.images.ground,
            frameSize: new Vector2(320, 180),
        })
        this.addChild(groundSprite);
        
        
        const exit = new Exit(gridCells(6), gridCells(3));
        this.addChild(exit);
        
        this.heroStart = params.heroPosition ?? DEFAULT_HERO_POSITION;
        const hero = new Hero(this.heroStart.x, this.heroStart.y);
        this.addChild(hero);
        
        if (!storyFlags.getRelevantScenario([{requires: [GOT_GEM_1]}])) {
            const rod = new Rod(gridCells(9), gridCells(6), "LEVEL 1");
            this.addChild(rod);
        }

        const npc1 = new NPC(gridCells(12), gridCells(2), {
            content: [
                {
                    string: "Hiya! I am the helper bot. Throughout the game you will have to use double space to continue a conversation.",
                    addsFlag: BOT1_TALK1,
                    bypass: [BOT1_TALK1],
                },
                {
                    string: "Great! Looks like you got the game figured out! ... ",
                    requires: [BOT1_TALK1],
                    bypass: [BOT1_TALK2],
                    addsFlag: BOT1_TALK2,
                },
                {
                    string: "Your goal is to collect 2 gems. Oh look there's one! Come back once you have collected your first.",
                    addsFlag: BOT1_TALK3,
                    bypass: [GOT_GEM_1, GOT_GEM_2],
                    requires: [BOT1_TALK2],
                },
                {
                    string: "Great! You collected your first gem! Now, using the stairs to the left, take a look at the lower level!",
                    addsFlag: BOT1_TALK4,
                    bypass: [GOT_GEM_2, TALKED_TO_A, TALKED_TO_B],
                },
                {
                    string: "You should probably talk to the other Knights...",
                    requires: [GOT_GEM_1, GOT_GEM_2],
                    bypass: [TALKED_TO_B],
                },
                {
                    string: "Congrats! Now you can go to the house!",
                    requires: [GOT_GEM_1, GOT_GEM_2, TALKED_TO_A, TALKED_TO_B]
                },
                {
                    string: "Your goal is to collect 2 gems. Come back once you're done",
                    bypass: [GOT_GEM_1, GOT_GEM_2]
                },
                {
                    string: "..."
                }
            ],
            portrait: 1,
        });
        this.addChild(npc1);




        this.walls = new Set();
        this.house = new Set();

        this.house.add(`224,64`)

        this.walls.add(`64,48`);
        
        this.walls.add(`64,64`);
        this.walls.add(`64,80`);
        this.walls.add(`80,64`);
        this.walls.add(`80,80`);
        
        this.walls.add(`112,80`);
        this.walls.add(`128,80`);
        this.walls.add(`144,80`);
        this.walls.add(`160,80`);
        
        

        this.walls.add(`128,48`);
        this.walls.add(`144,48`);
        
        this.walls.add(`208,64`);
        this.walls.add(`224,64`);
        
        this.walls.add(`224,96`);
        this.walls.add(`208,96`);
        this.walls.add(`192,96`);
        
        this.walls.add(`224,32`);

        this.walls.add(`48,112`);
        this.walls.add(`64,112`);
        this.walls.add(`80,112`);
        this.walls.add(`96,112`);
        this.walls.add(`112,112`);
        this.walls.add(`128,112`);
        this.walls.add(`144,112`);
        this.walls.add(`160,112`);
        this.walls.add(`176,112`);
        this.walls.add(`192,112`);
        this.walls.add(`208,112`);
        this.walls.add(`224,112`);
        this.walls.add(`240,112`);

        this.walls.add(`32,96`);
        this.walls.add(`32,80`);
        this.walls.add(`32,64`);
        this.walls.add(`32,48`);

        this.walls.add(`48,32`);
        this.walls.add(`80,32`);
        this.walls.add(`96,32`);
        this.walls.add(`64,32`);

        this.walls.add(`112,16`);
        this.walls.add(`128,16`);
        this.walls.add(`144,16`);
        this.walls.add(`160,16`);
        this.walls.add(`176,16`);
        this.walls.add(`192,16`);
        this.walls.add(`208,16`);
        this.walls.add(`224,16`);
        this.walls.add(`240,32`);

        this.walls.add(`256,96`);
        this.walls.add(`256,80`);
        this.walls.add(`256,64`);
        this.walls.add(`256,48`);  
    }

    ready() {
        events.on("HERO_EXITS", this, () => {
            console.log("CHANGE THE MAP!!");
            events.emit("CHANGE_LEVEL", new CaveLevel1({
                heroPosition: new Vector2(gridCells(3), gridCells(6))
            }))
        })
    }
}
