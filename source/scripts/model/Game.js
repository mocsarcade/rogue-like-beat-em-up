import Adventurer from "./Adventurer.js"

import {Input, StutteredInput} from "../utility/Input.js"
import Media from "../Media.js"

export default class Game {
    constructor() {
        this.adventurer = new Adventurer({
            sprite: Media.images.sprites.entities["12x0"],
            inputs: {
                "north": new StutteredInput("<up>", 200),
                "south": new StutteredInput("<down>", 200),
                "west": new StutteredInput("<left>", 200),
                "east": new StutteredInput("<right>", 200),
            },
        })

        // This variable can be
        // conditionally return
        // true when all assets
        // have been loaded and
        // initialized.
        this.isReady = true
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
