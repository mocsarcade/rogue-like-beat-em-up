var Media = require("../Media.js")
var Effect = require("./Effect.js")
var Creature = require("./Creature.js")

export class Monster extends Creature {
    constructor(monster) {
        super(monster)
        this.type = "Monster"
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
            return this.canMove(movement)
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
    canMove(movement = new Object()) {
        return this.game.dungeon.canMove({
            x: this.position.x + (movement.x || 0),
            y: this.position.y + (movement.y || 0),
        })
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

export class FastBat extends Monster {
    takeAction() {
        if(this.getReady()) {
            this.move(this.getRandomMovement([
                {y: -2}, {y: +2}, {x: -2}, {x: +2}
            ]))
        }
    }
}

var PaceLeftAndRight = function() {
    if(this.direction == undefined) {
        this.direction = +1
    }
    
    if(this.canMove({x: this.direction})) {
        this.move({x: this.direction})
    } else {
        this.direction = this.direction < 0 ? +1 : -1
    }
}

var MoveInSquare = function() {
    if(this.pattern == undefined) {
        this.pattern = 0
    }
    
    this.pattern += 1
    this.pattern %= 4
    
    if(this.pattern == 0) {
        this.move({y: -1})
    } else if(this.pattern == 1) {
        this.move({x: -1})
    } else if(this.pattern == 2) {
        this.move({y: +1})
    } else if(this.pattern == 3) {
        this.move({x: +1})
    }
}

var MoveUpAndDown = function() {
    if(this.pattern == undefined) {
        this.pattern = 0
    }
    
    this.pattern += 1
    this.pattern %= 4
    
    if(this.pattern == 0) {
        this.move({y: -1})
    } else if(this.pattern == 2) {
        this.move({y: +1})
    }
}

var MoveInDiamond = function() {    
    if(this.pattern == undefined) {
        this.pattern = 0
    }
    
    this.pattern += 1
    this.pattern %= 4
    
    if(this.pattern == 0) {
        this.move({x: -1, y: -1})
    } else if(this.pattern == 1) {
        this.move({x: -1, y: +1})
    } else if(this.pattern == 2) {
        this.move({x: +1, y: +1})
    } else if(this.pattern == 3) {
        this.move({x: +1, y: -1})
    }
}

var ChargesOnLineOfSight = function() {
    if(this.movement == undefined) {
        this.movement = {x: 0, y: 0}
    }
    
    if(this.movement.x == 0 && this.movement.y == 0) {
        if(this.position.x == this.game.adventurer.position.x) {
            this.movement.y = this.position.y < this.game.adventurer.position.y ? +1 : -1
        } else if(this.position.y == this.game.adventurer.position.y) {
            this.movement.x = this.position.x < this.game.adventurer.position.x ? +1 : -1
        }
    }
    
    if(this.canMove(this.movement)) {
        this.move(this.movement)
    } else {
        this.movement = {x: 0, y: 0}
    }
}

export class TestMonster extends Monster {
    get color() {
        return Media.colors.white
    }
    get shape() {
        return Media.images.shapes.monsters.owlbear
    }
    takeAction() {
        this.move(this.getMovementTowardsAdventurer())
    }
    getMovementTowardsAdventurer() {
        if(Math.abs(this.position.y - this.game.adventurer.position.y)
        > Math.abs(this.position.x - this.game.adventurer.position.x)) {
            if(this.position.y < this.game.adventurer.position.y) {
                return {y: +1}
            } else if(this.position.y > this.game.adventurer.position.y) {
                return {y: -1}
            } else if(this.position.x < this.game.adventurer.position.x) {
                return {x: +1}
            } else if(this.position.x > this.game.adventurer.position.x) {
                return {x: -1}
            }
        } else {
            if(this.position.x < this.game.adventurer.position.x) {
                return {x: +1}
            } else if(this.position.x > this.game.adventurer.position.x) {
                return {x: -1}
            } else if(this.position.y < this.game.adventurer.position.y) {
                return {y: +1}
            } else if(this.position.y > this.game.adventurer.position.y) {
                return {y: -1}
            }
        }
    }
}

// Stands still
// Stands still until player is near then chases
// Stands still until attacked then chases
// Wanders randomly until attacked
// Follows wall?
