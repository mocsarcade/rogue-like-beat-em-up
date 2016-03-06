var Camera = require("./Camera.js")
var Monster = require("./Monster.js")
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
        this.camera = new Camera({
            position: {x: 0, y: 0},
            width: 16, height: 9,
            zoom: 0.75
        })
        this.monsters = [
            new Monster({
                position: {x: 5, y: 5},
                game: this
            }),
            new Monster({
                position: {x: 8, y: 3},
                game: this
            }),
        ]
        this.effects = new Array()
        
        this.camera.center(this.adventurer.position)
    }
    get entities() {
        // Returns a big list of every
        // entity in the game, which is
        // useful for rendering.
        return (
            new Array()
                .concat(this.adventurer)
                .concat(this.dungeon.spaces)
                .concat(this.monsters)
                .concat(this.effects)
        )
    }
    onLoop(delta) {
        this.adventurer.onLoop(delta)
        this.effects.forEach((effect) => {
            effect.onLoop(delta)
        })
    }
}

module.exports = Game
