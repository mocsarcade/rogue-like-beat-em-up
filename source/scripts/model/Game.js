import Adventurer from "./Adventurer.js"

import {Input, StutteredInput} from "../utility/Input.js"

export default class Game {
    constructor() {
        this.adventurer = new Adventurer({
            inputs: {
                "north": new StutteredInput("<up>", 200),
                "south": new StutteredInput("<down>", 200),
                "west": new StutteredInput("<left>", 200),
                "east": new StutteredInput("<right>", 200),
            }
        })
    }
    get entities() {
        // Returns a big list of every
        // entity in the game, which
        // is used for rendering.
        return (
            new Array()
                .concat(this.adventurer)
        )
    }
    update(delta) {
        this.adventurer.update(delta)
    }
}
