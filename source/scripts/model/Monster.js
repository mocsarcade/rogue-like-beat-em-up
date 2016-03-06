var Media = require("../Media.js")
var Effect = require("./Effect.js")
var Creature = require("./Creature.js")

class Monster extends Creature {
    constructor(monster) {
        super(monster)
        
        this.type = "Monster"
        
        this.shapes = Media.images.shapes.monsters.bats
        this.color = monster.color || "hotpink"
        this.transition = true
        this.stack = 1
        
        this.isWaiting = true
        
        this.takeAction = monster.action
    }
    get shape() {
        if(!!this.isWaiting) {
            return this.shapes[1]
        } else {
            return this.shapes[0]
        }
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
    
    // Given an array of movements, filters for the
    // movements that won't result in a collision, then
    // returns a random movement.
    getRandomMovement(movements = new Array()) {
        movements = movements.filter((movement) => {
            return this.game.dungeon.canMove({
                x: this.position.x + (movement.x || 0),
                y: this.position.y + (movement.y || 0)
            })
        })
        
        if(movements.length > 0) {
            return movements[Math.floor(Math.random() * movements.length)]
        } else {
            return {x: 0, y: 0}
        }
    }
    
    // Toggles between ready and not
    // ready. Returns true when ready.
    getReady() {
        this.isReady = !this.isReady
        return this.isReady
    }
}

module.exports = Monster
