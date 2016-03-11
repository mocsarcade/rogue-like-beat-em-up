var Camera = require("./Camera.js")
var Adventurer = require("./Adventurer.js")

var RandomDungeon = require("./Dungeon.js").RandomDungeon

class Game {
    constructor(game) {
        this.dungeons = game.dungeons

        this.camera = new Camera({
            position: {x: 0, y: 0},
            width: 16, height: 9,
            zoom: 0.75
        })

        this.restart()
    }
    get entities() {
        // Returns a big list of every
        // entity in the game, which is
        // useful for rendering.
        return (
            new Array()
                .concat(this.dungeon.spaces)
                .concat(this.adventurer)
                .concat(this.dungeon.monsters)
                .concat(this.dungeon.stairs)
                .concat(this.effects)
        )
    }
    onLoop(delta) {
        this.adventurer.onLoop(delta)
        this.effects.forEach((effect) => {
            effect.onLoop(delta)
        })
    }
    restart() {
        this.adventurer = new Adventurer({
            position: {x: 0, y: 0},
            health: 1,
            game: this
        })
        this.start()
    }
    start() {
        if(this.adventurer.stage < this.dungeons.length) {
            this.adventurer.position.x = 0
            this.adventurer.position.y = 0
            var dungeon = this.dungeons[this.adventurer.stage]
            this.dungeon = new RandomDungeon({
                game: this,
                size: dungeon.size
            })

            var pos = this.dungeon.spaces[0].position
            pos.x += this.dungeon.spaces[0].width / 2
            pos.y += this.dungeon.spaces[0].height / 2

            this.adventurer.position.x = pos.x
            this.adventurer.position.y = pos.y

            this.effects = new Array()

            this.camera.center(this.adventurer.position)
            this.camera.key += 1
        } else {
            alert("Congratulations! You've won!!")
        }
    }
    advance() {
        this.adventurer.stage += 1
        this.adventurer.key += 1

        this.start()
    }
}

module.exports = Game
