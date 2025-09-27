import { GameObject } from "../../GameObject";
import { resources } from "../../Resource";
import { Sprite } from "../../sprite";
import { storyFlags } from "../../StoryFlags";
import { Vector2 } from "../../vector2";

export class NPC extends GameObject {
    constructor(x, y, textContent={}) {
        super({
            position: new Vector2(x, y)
        });

        // Become solid
        this.isSolid = true;

        // Say something
        this.textContent = textContent.content;
        this.textPortraiFrame = textContent.portrait;

        this.call_back = textContent.call_back ?? this.nothing;

        // Shadow
        const shadow = new Sprite({
            resource: resources.images.shadow,
            frameSize: new Vector2(32, 32),
            position: new Vector2(-8, -19),
        })

        this.addChild(shadow);

        const body = new Sprite({
            resource: resources.images.knight,
            frameSize: new Vector2(32, 32),
            hFrames: 2,
            vFrames: 1,
            position: new Vector2(-8, -20),
        })
        this.addChild(body)
    }

    getContent() {


        //Story flag
        const match = storyFlags.getRelevantScenario(this.textContent);
        if (!match) {
            console.warn("No matches found in this list", this.textContent);
            console.log(storyFlags.flags);
            return null;
        }

        this.call_back();

        return {
            portraitFrame: this.textPortraiFrame,
            string: match.string,
            addsFlag: match.addsFlag ?? null,
        }
    }

    nothing () {
        
    }
}