var Adventurer = require("./Adventurer.js")
var Dungeon = require("./Dungeon.js")

class Game {
    constructor() {
        this.adventurer = new Adventurer({
            position: {x: 2, y: 2},
            game: this
        })
        this.dungeon = new Dungeon({
            game: this
        })
    }
    get entities() {
        // Returns a big list of every
        // entity in the game, which is
        // useful for rendering.
        return (
            new Array()
                .concat(this.adventurer)
                .concat(this.dungeon.rooms)
        )
    }
    update() {
        this.adventurer.update()
    }
}

module.exports = Game
