var Adventurer = require("./Adventurer.js")
var Room = require("./Room.js")

class Game {
    constructor() {
        this.adventurer = new Adventurer({
            position: {x: 2, y: 2},
            game: this
        })
        this.dungeon = {
            rooms: [
                new Room({
                    position: {x: 1, y: 1},
                    width: 7, height: 7,
                    color: "#999"
                }),
                new Room({
                    position: {x: 8, y: 1},
                    width: 5, height: 5,
                    color: "#888"
                }),
                new Room({
                    position: {x: 13, y: 1},
                    width: 2, height: 2,
                    color: "#777"
                }),
            ]
        }
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
