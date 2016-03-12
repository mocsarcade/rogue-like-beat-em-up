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

        if(this.initiate) {
            this.initiate()
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
    "crab": {
        health: 1,
        strength: 1,
        color: Colors.red,
        shape: Shapes.crab[0],
        initiate: function() {
            this.direction = Math.random() < 0.5 ? +1 : -1
        },
        action: function() {
            if(this.canMove({x: this.direction})) {
                this.move({x: this.direction})
            } else {
                this.direction = this.direction < 0 ? +1 : -1
            }
        }
    },
    "strong crab": {
        health: 1,
        strength: 10,
        color: Colors.blue,
        shape: Shapes.crab[0],
        initiate: function() {
            this.direction = Math.random() < 0.5 ? +1 : -1
        },
        action: function() {
            if(this.canMove({x: this.direction})) {
                this.move({x: this.direction})
            } else {
                this.direction = this.direction < 0 ? +1 : -1
            }
        }
    },
    "werewolf": {
        health: 1,
        strength: 2,
        color: Media.colors.brown,
        shape: function() {
            if(this.movement.x == 0 && this.movement.y == 0) {
                return Media.images.shapes.monsters.man[0]
            } else {
                return Media.images.shapes.monsters.werewolf[0]
            }
        },
        direction: function() {
            return this.movement.x <= 0 ? +1 : -1
        },
        movement: {x: 0, y: 0},
        action: function() {
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
    },
    "alpha werewolf": {
        health: 2,
        strength: 2,
        color: function() {
            if(this.movement.x == 0 && this.movement.y == 0) {
                return Media.colors.brown
            } else {
                return Media.colors.gray
            }
        },
        shape: function() {
            if(this.movement.x == 0 && this.movement.y == 0) {
                return Media.images.shapes.monsters.man[0]
            } else {
                return Shapes.werewolf[0]
            }
        },
        direction: function() {
            return this.movement.x <= 0 ? +1 : -1
        },
        movement: {x: 0, y: 0},
        action: function() {
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
    },
    "skeleton": {
        health: 1,
        strength: 1,
        color: Colors.white,
        shape: function() {
            var readiness = this.isReady ? 7 : 0
            var health = Math.min(this.health, 3) - 1
            return Shapes.skeleton[health + readiness]
        },
        initiate: function() {
            this.isReady = Math.random() < 0.5
        },
        action: function() {
            if(this.getReady()) {
                this.move(this.getMovementTowardsAdventurer())
            }
        }
    },
    "skeleton swordsman": {
        health: 2,
        strength: 1,
        color: Colors.white,
        shape: function() {
            var readiness = this.isReady ? 7 : 0
            var health = Math.min(this.health, 3) - 1
            return Shapes.skeleton[health + readiness]
        },
        initiate: function() {
            this.isReady = Math.random() < 0.5
        },
        action: function() {
            if(this.getReady()) {
                this.move(this.getMovementTowardsAdventurer())
            }
        }
    },
    "skeleton elite swordsman": {
        health: 3,
        strength: 1,
        color: Colors.white,
        shape: function() {
            var readiness = this.isReady ? 7 : 0
            var health = Math.min(this.health, 3) - 1
            return Shapes.skeleton[health + readiness]
        },
        initiate: function() {
            this.isReady = Math.random() < 0.5
        },
        action: function() {
            if(this.getReady()) {
                this.move(this.getMovementTowardsAdventurer())
            }
        }
    },
    "frog": {
        health: 10,
        strength: 5,
        color: function() {
            if(this.state >= 0) {
                return Colors.green
            } else if(this.state < 0) {
                return Colors.red
            }
        },
        shape: Shapes.frog[0],
        transition: function() {
            if(this.state >= 0) {
                return {duration: 1.5}
            } else if(this.state < 0) {
                return {duration: 0.5}
            }
        },
        state: 0,
        action: function() {
            if(this.state >= 0) {
                this.state += 1
                this.state %= 3
                if(this.state == 2) {
                    var movement = this.getRandomMovement([
                        {y: -1}, {y: +1},
                        {x: -1}, {x: +1},
                    ])
                    if(this.position.x + (movement.x || 0) == this.game.adventurer.position.x
                    && this.position.y + (movement.y || 0) == this.game.adventurer.position.y) {
                        movement = {x: 0, y: 0}
                    }
                    this.move(movement)
                }
            } else {
                if(this.state == -1) {
                    this.state = -2
                } else {
                    this.move(this.getMovementTowardsAdventurer())
                }
            }
        },
        onTakeDamage: function() {
            if(this.state >= 0) {
                this.state = -1
            }
        }
    },
    "golden frog": {
        health: 10,
        strength: 5,
        color: function() {
            if(this.state >= 0) {
                return Colors.yellow
            } else if(this.state < 0) {
                return Colors.red
            }
        },
        shape: Shapes.frog[0],
        transition: function() {
            if(this.state >= 0) {
                return {duration: 1.5}
            } else if(this.state < 0) {
                return {duration: 0.5}
            }
        },
        initiate: function() {
            this.state = Math.floor(Math.random() * 3)
        },
        action: function() {
            if(this.state >= 0) {
                this.state += 1
                this.state %= 3
                if(this.state == 2) {
                    var movement = this.getRandomMovement([
                        {y: -1}, {y: +1},
                        {x: -1}, {x: +1},
                    ])
                    if(this.position.x + (movement.x || 0) == this.game.adventurer.position.x
                    && this.position.y + (movement.y || 0) == this.game.adventurer.position.y) {
                        movement = {x: 0, y: 0}
                    }
                    this.move(movement)
                }
            } else {
                if(this.state == -1) {
                    this.state = -2
                } else {
                    this.move(this.getMovementTowardsAdventurer())
                }
            }
        },
        onTakeDamage: function() {
            if(this.state >= 0) {
                this.state = -1
            }
        },
        drops: {
            gold: 100
        }
    },
    "spider": {
        health: 1,
        strength: 1,
        color: Colors.gray,
        shape: Shapes.spider[0],
        movement: {y: +1},
        rotation: function() {
            if(!!this.movement.y) {
                if(this.movement.y < 0) {
                    return 180
                } else {
                    return 0
                }
            } else if(!!this.movement.x) {
                if(this.movement.x < 0) {
                    return +90
                } else {
                    return -90
                }
            }
        },
        action: function() {
            var movement = this.getMovementTowardsAdventurer()
            if(!!this.movement.y) {
                if(this.movement.y != movement.y) {
                    if(!!movement.y) {
                        this.movement = {
                            x: Math.random() < 0.5 ? +1 : -1
                        }
                    } else {
                        this.movement = movement
                    }
                } else {
                    this.move(movement)
                }
            } else if(!!this.movement.x) {
                if(this.movement.x != movement.x) {
                    if(!!movement.x) {
                        this.movement = {
                            x: Math.random() < 0.5 ? +1 : -1
                        }
                    } else {
                        this.movement = movement
                    }
                } else {
                    this.move(movement)
                }
            }
        },
    },
    "scuttle spider": {
        health: 2,
        strength: 1,
        color: Colors.gray,
        shape: Shapes.spider[1],
        movement: {y: +1},
        rotation: function() {
            if(!!this.movement.y) {
                if(this.movement.y < 0) {
                    return 180
                } else {
                    return 0
                }
            } else if(!!this.movement.x) {
                if(this.movement.x < 0) {
                    return +90
                } else {
                    return -90
                }
            }
        },
        action: function() {
            var movement = this.getMovementTowardsAdventurer()
            if(!!this.movement.y) {
                if(this.movement.y != movement.y) {
                    if(!!movement.y) {
                        this.movement = {
                            x: Math.random() < 0.5 ? +1 : -1
                        }
                    } else {
                        this.movement = movement
                    }
                } else {
                    this.move(movement)
                }
            } else if(!!this.movement.x) {
                if(this.movement.x != movement.x) {
                    if(!!movement.x) {
                        this.movement = {
                            x: Math.random() < 0.5 ? +1 : -1
                        }
                    } else {
                        this.movement = movement
                    }
                } else {
                    this.move(movement)
                }
            }
        },
    },
    "stealth spider": {
        health: 2,
        strength: 1,
        color: function() {
            if(this.stage == 0) {
                return Colors.gray
            } else {
                return Colors.black
            }
        },
        shape: Shapes.spider[1],
        movement: {y: +1},
        rotation: function() {
            if(!!this.movement.y) {
                if(this.movement.y < 0) {
                    return 180
                } else {
                    return 0
                }
            } else if(!!this.movement.x) {
                if(this.movement.x < 0) {
                    return +90
                } else {
                    return -90
                }
            }
        },
        stage: 0,
        action: function() {
            this.stage += 1
            this.stage %= 2
            var movement = this.getMovementTowardsAdventurer()
            if(!!this.movement.y) {
                if(this.movement.y != movement.y) {
                    if(!!movement.y) {
                        this.movement = {
                            x: Math.random() < 0.5 ? +1 : -1
                        }
                    } else {
                        this.movement = movement
                    }
                } else {
                    this.move(movement)
                }
            } else if(!!this.movement.x) {
                if(this.movement.x != movement.x) {
                    if(!!movement.x) {
                        this.movement = {
                            x: Math.random() < 0.5 ? +1 : -1
                        }
                    } else {
                        this.movement = movement
                    }
                } else {
                    this.move(movement)
                }
            }
        },
    },
    "spider queen": {
        health: 3,
        strength: 2,
        color: "rainbow",
        shape: Shapes.spider[2],
        movement: {y: +1},
        rotation: function() {
            if(!!this.movement.y) {
                if(this.movement.y < 0) {
                    return 180
                } else {
                    return 0
                }
            } else if(!!this.movement.x) {
                if(this.movement.x < 0) {
                    return +90
                } else {
                    return -90
                }
            }
        },
        action: function() {
            var movement = this.getMovementTowardsAdventurer()
            if(!!this.movement.y) {
                if(this.movement.y != movement.y) {
                    if(!!movement.y) {
                        this.movement = {
                            x: Math.random() < 0.5 ? +1 : -1
                        }
                    } else {
                        this.movement = movement
                    }
                } else {
                    this.move(movement)
                }
            } else if(!!this.movement.x) {
                if(this.movement.x != movement.x) {
                    if(!!movement.x) {
                        this.movement = {
                            x: Math.random() < 0.5 ? +1 : -1
                        }
                    } else {
                        this.movement = movement
                    }
                } else {
                    this.move(movement)
                }
            }
        },
    },
}
