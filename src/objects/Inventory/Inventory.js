import { events } from "../../Events";
import { GameObject } from "../../GameObject";
import { resources } from "../../Resource";
import { Sprite } from "../../sprite";
import { GOT_GEM_1, GOT_GEM_2, storyFlags } from "../../StoryFlags";
import { Vector2 } from "../../vector2";

export class Inventory extends GameObject {
    constructor() {
        super({
            position: new Vector2(0, 2)
        });

        this.drawLayer = "HUD";

        this.nextId = 0;
        this.items = [
            /*{
                id: -2,
                image: resources.images.rod
            },
            {
                id: -1,
                image: resources.images.rod
            }, */
        ]

        events.on("HERO_PICKS_UP_ITEM", this, data=>{
            this.nextId ++;
            this.items.push({
                id: this.nextId,
                image: resources.images.rod,
            })
            this.renderInventory();

            //console.log(storyFlags.flags)

            if (data.level === 'LEVEL 1') {
                storyFlags.add(GOT_GEM_1);
            } else {
                storyFlags.add(GOT_GEM_2)
            }

            //console.log(storyFlags.flags);
            //console.log(data.level);
        })

        // removing demo
        /*
        setTimeout(() => {
            this.removeFromInventory(-2)
        }, 2000) */



        this.renderInventory();
    }

    renderInventory() {

        this.children.forEach(child => child.destroy())

        this.items.forEach(
            (item, index) => {
                const sprite = new Sprite({
                    resource: item.image,
                    position: new Vector2(index*12, 0)
                })
                this.addChild(sprite);
            }
        )
    }

    removeFromInventory(id) {
        this.items = this.items.filter(item => item.id !== id);
        this.renderInventory();
    }
}