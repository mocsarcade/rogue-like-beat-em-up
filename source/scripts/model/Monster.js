var Media = require("../Media.js")
var Effect = require("./Effect.js")
var Creature = require("./Creature.js")

export class Monster extends Creature {
    constructor(monster) {
        super(monster)
        this.type = "Monster"
        
        this.transition = true
        this.stack = 1
    }
    onCollide(entity) {
        if(entity.type == "Adventurer") {
            this.game.effects.push(new Effect({
                position: this.game.adventurer.position,
                game: this.game,
            }))
            this.game.adventurer.takeDamage(this.strength)
        }
    }
    onDeath() {
        var index = this.game.dungeon.monsters.indexOf(this)
        this.game.dungeon.monsters.splice(index, 1)
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

export class Bat extends Monster {
    get color() {
        return Media.colors.blue
    }
    get shape() {
        if(!!this.isReady) {
            return Media.images.shapes.monsters.bats[1]
        } else {
            return Media.images.shapes.monsters.bats[0]
        }
    }
    takeAction() {
        if(this.getReady()) {
            this.move(this.getRandomMovement([
                {y: -1}, {y: +1}, {x: -1}, {x: +1}
            ]))
        }
    }
}

export class VampireBat extends Monster {
    get color() {
        return Media.colors.red
    }
    get shape() {
        return Media.images.shapes.monsters.bats[0]
    }
    takeAction() {
        this.move(this.getRandomMovement([
            {y: -1}, {y: +1}, {x: -1}, {x: +1}
        ]))
    }
}

export class VampireBatKing extends Monster {
    get color() {
        return Media.colors.green
    }
    get shape() {
        return Media.images.shapes.monsters.bats[0]
    }
    takeAction() {
        this.move(this.getRandomMovement([
            {x: +1, y: -1}, {x: +1, y: +1},
            {x: -1, y: +1}, {x: +1, y: +1},
        ]))
    }
}
