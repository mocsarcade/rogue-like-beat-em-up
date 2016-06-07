import Monster from "./Monster.js"
import Adventurer from "./Adventurer.js"

import {Input, StutteredInput} from "../utility/Input.js"
import Media from "../Media.js"
import ShortID from "shortid"

export default class Game {
    constructor() {
        this.add("adventurer", new Adventurer({
            sprite: Media.images.sprites.entities["0"],
            inputs: {
                "north": new StutteredInput("<up>", 200),
                "south": new StutteredInput("<down>", 200),
                "west": new StutteredInput("<left>", 200),
                "east": new StutteredInput("<right>", 200),
            }
        }))
        //this.adventurer.weapon = Media.images.items["1x0"]

        this.add("monster", new Monster({
            sprite: Media.images.sprites.entities["0"],
        }))

        // This variable can be
        // conditionally return
        // true when all assets
        // have been loaded and
        // initialized.
        this.isReady = true
    }
    add(label, entity) {
        this[label] = entity
        entity.key = ShortID.generate()
        entity.game = this
    }
    get entities() {
        // Returns a big list of every
        // entity in the game, which
        // is used for rendering.
        return (
            new Array()
                .concat(this.monster)
                .concat(this.adventurer)
        )
    }
    update(delta) {
        this.adventurer.update(delta)
    }
}
