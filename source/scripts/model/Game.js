var Camera = require("./Camera.js")
var Adventurer = require("./Adventurer.js")

var StaticDungeon = require("./Dungeon.js").StaticDungeon
var StupidRandomDungeon = require("./Dungeon.js").StupidRandomDungeon

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
                .concat(this.adventurer)
                .concat(this.dungeon.spaces)
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
            game: this
        })
        this.start()
    }
    start() {
        if(this.adventurer.stage < this.dungeons.length) {
            this.adventurer.position.x = 0
            this.adventurer.position.y = 0
            var dungeon = this.dungeons[this.adventurer.stage]
            this.dungeon = new StaticDungeon({
                colors: dungeon.colors,
                size: dungeon.size,
                game: this
            })
            
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
