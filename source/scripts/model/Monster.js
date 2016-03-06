var Media = require("../Media.js")
var Effect = require("./Effect.js")
var Creature = require("./Creature.js")

class Monster extends Creature {
    constructor(monster) {
        super(monster)
        
        this.shape = Media.images.shapes.monsters[127]
        this.color = Media.colors.red
        this.transition = true
        this.stack = 1
    }
    takeAction() {
        this.move({x: -1}) // dumb behavior
    }
    onCollide(entity) {
        if(entity.type == "Adventurer") {
            this.game.adventurer.takeDamage(this.strength)
            this.game.effects.push(new Effect({
                position: this.game.adventurer.position,
                game: this.game,
            }))
        }
    }
    onDeath() {
        var index = this.game.monsters.indexOf(this)
        this.game.monsters.splice(index, 1)
    }
}

module.exports = Monster
