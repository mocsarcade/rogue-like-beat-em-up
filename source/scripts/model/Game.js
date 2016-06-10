import ShortID from "shortid"

import Monster from "./Monster.js"
import Adventurer from "./Adventurer.js"

import {StutteredInput} from "../utility/Input.js"

export default class Game {
    constructor() {
        this.add("adventurer", new Adventurer({
            inputs: {
                "north": new StutteredInput("<up>", 200),
                "south": new StutteredInput("<down>", 200),
                "west": new StutteredInput("<left>", 200),
                "east": new StutteredInput("<right>", 200),
            }
        }), false)

        this.add("monsters", new Monster({position: {x: 1, y: 1}}))
        this.add("monsters", new Monster({position: {x: 3, y: 1}}))

        // This variable can be
        // conditionally return
        // true when all assets
        // have been loaded and
        // initialized.
        this.isReady = true
    }
    add(name, entity, key) {
        entity.game = this
        entity.key = key != undefined ? key : ShortID.generate()

        if(key === false) {
            this[name] = entity
        } else {
            this[name] = this[name] || []
            this[name].push(entity)
        }
    }
    get entities() {
        // Returns a big list of every
        // entity in the game, which
        // is used for rendering.
        return (
            new Array()
                .concat(this.monsters)
                .concat(this.adventurer)
        )
    }
    update(delta) {
        this.adventurer.update(delta)
    }
}
