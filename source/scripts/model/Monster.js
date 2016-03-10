var Media = require("../Media.js")
var Effect = require("./Effect.js")
var Creature = require("./Creature.js")

export class Monster extends Creature {
    constructor(template, data) {
        super(data)
        this.type = "monster"
        
        for(var key in template) {
            if(template[key] instanceof Function) {
                Object.defineProperty(this, key, {
                    get: template[key].bind(this)
                })
            } else {
                this[key] = template[key]
            }
        }
    }
    onCollide(entity) {
        if(entity.type == "adventurer") {
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

var Shapes = Media.images.shapes.monsters
var Colors = Media.colors

export var Monsters = {
    "bat": {
        color: Colors.blue,
        shape: function() {
            if(this.state == 0) {
                return Shapes.bat[1]
            } else if(this.state == 1) {
                return Shapes.bat[0]
            }
        },
        state: 0,
        action: function() {
            this.state += 1
            this.state %= 2
            if(this.state == 1) {
                this.move(this.getRandomMovement([
                    {y: -1}, {y: +1}, {x: -1}, {x: +1}
                ]))
            }
        },
    },
    "far bat": {
        color: Colors.green,
        shape: function() {
            if(this.state == 0) {
                return Shapes.bat[1]
            } else if(this.state == 1) {
                return Shapes.bat[0]
            }
        },
        state: 0,
        action: function() {
            this.state += 1
            this.state %= 2
                if(this.state == 1) {
                this.move(this.getRandomMovement([
                    {y: -2}, {y: +2}, {x: -2}, {x: +2}
                ]))
            }
        },
    },
    "fast bat": {
        color: Colors.red,
        shape: Shapes.bat[1],
        action: function() {
            this.move(this.getRandomMovement([
                {y: -1}, {y: +1}, {x: -1}, {x: +1}
            ]))
        },
    },
    "vampire bat": {
        health: 3,
        strength: 1,
        color: "rainbow",
        shape: Shapes.bat[1],
        action: function() {
            this.move(this.getRandomMovement([
                {x: +1, y: -1}, {x: +1, y: +1},
                {x: -1, y: -1}, {x: -1, y: +1}
            ]))
        },
    },
    "frog": {
        color: Colors.green,
        shape: Shapes.frog[0],
    },
    "golden frog": {
        color: Colors.yellow,
        shape: Shapes.frog[0],
    },
    "crab": {
        color: Colors.red,
        shape: Shapes.crab[0],
    },
    "strong crab": {
        color: Colors.blue,
        shape: Shapes.crab[0],
    },
    "owlbear": {
        color: Colors.brown,
        shape: Shapes.owlbear[0],
    },
    "owlbear warrior": {
        color: Colors.brown,
        shape: Shapes.owlbear[1],
        // increased attack
    },
    "owlbear shielded warrior": {
        color: Colors.brown,
        shape: Shapes.owlbear[2],
        // maybe hit after first hit drops shield
        // increased attack
    },
    "owlbear leader": {
        color: Colors.brown,
        shape: Shapes.owlbear[3],
        // ooh ooh! maybe bigger?
        // can cast magic?
    },
    "spider": {
        color: Colors.gray,
        shape: Shapes.spider[0],
    },
    "venomous spider": {
        color: Colors.green,
        shape: Shapes.spider[0],
    },
    "scuttle spider": {
        color: Colors.gray,
        shape: Shapes.spider[1],
    },
    "stealth spider": {
        color: Colors.black,
        shape: Shapes.spider[1],
    },
    "spider queen": {
        color: "rainbow",
        shape: Shapes.spider[2],
    },
    "green troll": {
        color: Colors.green,
        shape: Shapes.troll[0],
    },
    "green troll chief": {
        color: Colors.green,
        shape: Shapes.troll[3],
    },
    "red troll": {
        color: Colors.red,
        shape: Shapes.troll[1],
    },
    "imp": {
        color: Colors.red,
        shape: Shapes.imp[0],
    },
    "ghost": {
        color: Colors.white,
        shape: function() {
            if(!!this.isHidden) {
                return Shapes.ghost[1]
            } else if(!this.isHidden) {
                return Shapes.ghost[0]
            }
        },
    },
    "fire elemental": {
        color: Colors.red,
        shape: function() {
            return Shapes.elemental[0]
            return Shapes.elemental[2]
        },
    },
    "ice elemental": {
        color: Colors.blue,
        shape: function() {
            return Shapes.elemental[0]
            return Shapes.elemental[2]
        },
    },
    "rock elemental": {
        color: Colors.brown,
        shape: Shapes.elemental[3],
    },
    "demon": {
        color: Colors.red,
        shape: Shapes.demon[0],
    },
    "bard": {
        color: Colors.green,
        shape: Shapes.bard[0],
    },
    "skeleton": {
        color: Colors.white,
        shape: Shapes.skeleton[0],
    },
    "skeleton swordsman": {
        color: Colors.white,
        shape: Shapes.skeleton[1],
    },
    "skeleton elite swordsman": {
        color: Colors.white,
        shape: Shapes.skeleton[2],
    },
    "skeleton archer": {
        color: Colors.white,
        shape: Shapes.skeleton[0],
    },
    "skeleton necromancer": {
        color: Colors.white,
        shape: Shapes.skeleton[5],
    },
    "skeleton warlord": {
        width: 2,
        color: Colors.white,
        shape: Shapes.skeleton[7],
    },
    "werewolf": {
        color: Colors.brown,
        shape: function() {
            return Shapes.werewolf[0]
            return Shapes.man[0]
        },
    },
    "alpha werewolf": {
        color: "rainbow",
        shape: function() {
            return Shapes.werewolf[1]
            return Shapes.man[0]
        },
    },
    "death": {
        color: Colors.white,
        shape: function() {
            return Shapes.death[0]
            return Shapes.death[1]
        },
        opacity: function() {
            return 1
            return 0.1
        },
    },
    "pheonix": {
        color: Colors.red,
        shape: Shapes.pheonix[0],
    },
    "statue": {
        color: Colors.gray,
        shape: Shapes.statue[0],
    },
    "\"statue\"": {
        color: Colors.gray,
        shape: Shapes.statue[1],
    },
    "centaur": {
        color: Colors.green,
        shape: Shapes.centaur[0]
    },
    "centaur knight": {
        color: Colors.green,
        shape: Shapes.centaur[2]
    },
    "centaur archer": {
        color: Colors.green,
        shape: Shapes.centaur[1]
    },
    "centaur lord": {
        color: "rainbow",
        shape: Shapes.centaur[3]
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
