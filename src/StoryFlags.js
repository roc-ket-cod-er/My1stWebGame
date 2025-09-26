class StoryFlags {
    constructor() {
        this.flags = new Map();
    }

    add(flag) {
        this.flags.set(flag, true);
    }

    getRelevantScenario(scenarios=[]) {
        return scenarios.find(scenario => {

            const bypassFlags = scenario.bypass ?? [];
            for (let i=0; i<bypassFlags.length; i++) {
                const thisFlag = bypassFlags[i];
                if (this.flags.has(thisFlag)) {
                    return false;
                }
            }

            const requiredFlags = scenario.requires ?? [];
            for (let i=0; i<requiredFlags.length; i++) {
                const thisFlag = requiredFlags[i];
                if (!this.flags.has(thisFlag)) {
                    return false;
                }
            }

            return true;
        });
    }

}

export const TALKED_TO_A = 'TALKED_TO_A';
export const TALKED_TO_B = 'TALKED_TO_B';
export const GOT_GEM_1 = 'GOT_GEM_1';
export const GOT_GEM_2 = 'GOT_GEM_2';
export const BOT1_TALK1 = 'BOT1_TALK1';
export const BOT1_TALK2 = 'BOT1_TALK2';
export const BOT1_TALK3 = 'BOT1_TALK3';
export const BOT1_TALK4 = 'BOT1_TALK4';
export const ENABLE_GEM3 = 'EN3';
export const ENABLE_GEM4 = 'EN4';
export const GOT_GEM_3 = 'GOT_GEM_3';
export const GOT_GEM_4 = 'GOT_GEM_4';

export const storyFlags = new StoryFlags();