import Adventurer from "./Adventurer.js"

export default class Game {
    constructor() {
        this.adventurer = new Adventurer()
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
