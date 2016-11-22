import DATA from "scripts/data"
import Monster from "scripts/model/Monster.js"
import MONSTERS from "scripts/data/monsters.js"
<<<<<<< HEAD

=======
>>>>>>> 682ab14a2d2967d1e43e74bf9f038f60d9eefbee

export default {
    RED_SLIME: {
        sprite: DATA.SPRITES.MONSTERS.SLIME,
        color: DATA.COLORS.RED,
        health: 1,
        strength: 1,
        isSpawned: true,
        onDeath: function() {
            if(this.isSpawned == true) {
                this.isSpawned = false
                this.game.monsters.push(new Monster(this.game, {
                    protomonster: MONSTERS.SPAWNED_SLIME,
                    position: {x: this.position.x, y: this.position.y},
                }))
                this.game.monsters.push(new Monster(this.game, {
                    protomonster: MONSTERS.SPAWNED_SLIME,
                    position: {x: this.position.x, y: this.position.y},
                }))
                this.game.waves[this.game.adventurer.wave].killcount += 2
            } else if (this.isSpawned = false) {
                this.game.remove("monsters", this)
            }
        }
    },
    BLUE_SLIME: {
        sprite: DATA.SPRITES.MONSTERS.SLIME,
        color: DATA.COLORS.BLUE,
        health: 2,
        strength: 1,
        isSpawned: true,
        onDeath: function() {
            if(this.isSpawned == true) {
                this.isSpawned = false
                this.game.monsters.push(new Monster(this.game, {
                    protomonster: MONSTERS.SPAWNED_SLIME,
                    position: {x: this.position.x, y: this.position.y},
                }))
                this.game.monsters.push(new Monster(this.game, {
                    protomonster: MONSTERS.SPAWNED_SLIME,
                    position: {x: this.position.x, y: this.position.y},
                }))
                this.game.waves[this.game.adventurer.wave].killcount += 2
            } else if (this.isSpawned = false) {
                this.game.remove("monsters", this)
            }
        }
    },
    SPAWNED_SLIME: {
        sprite: DATA.SPRITES.MONSTERS.SLIME,
        color: DATA.COLORS.PINK,
        health: 1,
        strength: 1,
    },
    RED_ORC: {
        sprite: DATA.SPRITES.MONSTERS.ORC,
        color: DATA.COLORS.RED,
        health: 1,
        strength: 1,
    },
    BLUE_ORC: {
        sprite: DATA.SPRITES.MONSTERS.ORC,
        color: DATA.COLORS.BLUE,
        health: 2,
        strength: 1,
    },
    GREEN_ORC: {
        sprite: DATA.SPRITES.MONSTERS.ORC,
        color: DATA.COLORS.GREEN,
        health: 3,
        strength: 1,
    },
    WHITE_TROLL: {
        sprite: DATA.SPRITES.MONSTERS.TROLL,
        color: DATA.COLORS.WHITE,
        health: 5,
        strength: 5,
        turnCounter: function() {
            this.turncount = this.turncount + 1 || 0
            if(this.turncount % 4 == 0) {
                this.phase = true
            } else {
                this.phase = false
            }
            return this.phase
        }
    },
    RED_BAT: {
        sprite: DATA.SPRITES.MONSTERS.BAT,
        color: DATA.COLORS.RED,
        health: 1,
        strength: 1,
        movement: function () {
            if(this.getOffscreenMovement()) {
                return this.getOffscreenMovement()
            }
            var choices = [
                {x: -1},
                {x: +1},
                {y: -1},
                {y: +1}
            ]
            choices = this.pruneMovement(choices)
            return choices[Math.floor((Math.random() * choices.length))]
        }
    },
    BLUE_BAT: {
        sprite: DATA.SPRITES.MONSTERS.BAT,
        color: DATA.COLORS.BLUE,
        health: 1,
        strength: 1,
        turnCounter: function() {
            this.phase = true
        },
        movement: function () {
            if(this.getOffscreenMovement()) {
                return this.getOffscreenMovement()
            }
            var choices = [
                {x: -1},
                {x: +1},
                {y: -1},
                {y: +1}
            ]
            choices = this.pruneMovement(choices)
            return choices[Math.floor((Math.random() * choices.length))]
        }
    },
    GREEN_BAT: {
        sprite: DATA.SPRITES.MONSTERS.BAT,
        color: DATA.COLORS.GREEN,
        health: 1,
        strength: 1,
        turnCounter: function() {
            this.phase = true
        },
        movement: function () {
            if(this.getOffscreenMovement()) {
                return this.getOffscreenMovement()
            }
            var choices = [
                {x: -1, y: -1},
                {x: -1, y: +1},
                {x: +1, y: -1},
                {x: +1, y: +1}
            ]
            choices = this.pruneMovement(choices)
            return choices[Math.floor((Math.random() * choices.length))]
        }
    },
    FAST_BAT: {
        sprite: DATA.SPRITES.MONSTERS.BAT,
        color: DATA.COLORS.PINK,
        health: 1,
        strength: 1,
        movement: function () {
            if(this.getOffscreenMovement()) {
                return this.getOffscreenMovement()
            }
            var choices = [
                {x: -2},
                {x: +2},
                {y: -2},
                {y: +2}
            ]
            choices = this.pruneMovement(choices)
            return choices[Math.floor((Math.random() * choices.length))]
        }
    },
    STONE_BAT: {
        sprite: DATA.SPRITES.MONSTERS.BAT,
        color: DATA.COLORS.GRAY,
        health: 3,
        strength: 1,
        turnCounter: function() {
            this.turn = this.turn + (Math.floor((Math.random() * 3))) + 1 || 0
            if (this.turn >= 3) {
                this.phase = true
                this.turn = 0
            } else {
                this.phase = false
            }
        },
        movement: function () {
<<<<<<< HEAD
            if (this.getOffscreenMovement()) return this.getOffscreenMovement()
=======
>>>>>>> 682ab14a2d2967d1e43e74bf9f038f60d9eefbee
            var choices = [
                {x: -1},
                {x: +1},
                {y: -1},
                {y: +1}
            ]
            choices = this.pruneMovement(choices)
            return choices[Math.floor((Math.random() * choices.length))]
<<<<<<< HEAD
        }
    },
    SKELETON: {
        sprite: DATA.SPRITES.MONSTERS.SKELETON, 
        color: DATA.COLORS.WHITE,
        health: 1,
        strength: 1,
        isSpawned: true, 
        movement: function () {
            if (this.getOffscreenMovement()) return this.getOffscreenMovement()
            return this.pursuit()
        }
    },
    SMALL_NECROMANCER: {                 
        sprite: DATA.SPRITES.MONSTERS.SMALL_NECROMANCER,       
        color: DATA.COLORS.BROWN,              
        health: 1,              
        strength: 1,
        skeletonCap: 0,       
        turnCounter: function() {
            this.turn = this.turn + 1 || 0
            this.skeletonCap = this.skeletonCap || 0
            if (this.turn >=7 && this.skeletonCap < 3) {
                this.skeletonCap += 1
                this.phase = false
                this.game.monsters.push(new Monster(this.game, {
                    protomonster: MONSTERS.SKELETON,
                    position: {x: this.position.x, y: this.position.y},
                }))
                this.game.wave.killcount += 1
                this.turn = 0
            } else {
                this.phase = true
            }
        },
        movement: function () {              
             if (this.getOffscreenMovement()) return this.getOffscreenMovement()                       
                return this.flee()     
        }    
    },        
    BIG_NECROMANCER: {        
         sprite: DATA.SPRITES.MONSTERS.BIG_NECROMANCER,      
         color: DATA.COLORS.GRAY,     
         health: 2,        
         strength: 1,           
        turnCounter: function() {
            this.turn = this.turn + 1 || 0
            this.skeletonCap = this.skeletonCap || 0
            if (this.turn >=7 && this.skeletonCap < 3) {
                this.skeletonCap += 1
                this.phase = false
                this.game.monsters.push(new Monster(this.game, {
                    protomonster: MONSTERS.SKELETON,
                    position: {x: this.position.x, y: this.position.y},
                }))
                this.game.wave.killcount += 1
                this.turn = 0
            } else {
                this.phase = true
            }
        },
        movement: function () {             
            if (this.getOffscreenMovement()) return this.getOffscreenMovement()                       
                return this.flee()     
         }      
    },                  

=======
        }
    },
>>>>>>> 682ab14a2d2967d1e43e74bf9f038f60d9eefbee
    RED_THIEF: {
        sprite: DATA.SPRITES.MONSTERS.THIEF,
        color: DATA.COLORS.RED,
        health: 2,
        strength: 1,
        grabCounter: function() {
            this.turnCount = this.turnCount || 0
            //the adventurer cannot be grabbed by another monster and he cannot grab him more than once
            if(this.game.adventurer.grabCount == 0 && this.turnCount == 0) {
                this.turnCount = this.turnCount + 1
                this.game.adventurer.grabCount += 2
                this.game.adventurer.grabMonster = this
            }
        }
    },
    BLUE_THIEF: {
        sprite: DATA.SPRITES.MONSTERS.THIEF,
        color: DATA.COLORS.BLUE,
        health: 3,
        strength: 2,
        grabCounter: function() {
            this.turnCount = this.turnCount || 0
            //the adventurer cannot be grabbed by another monster and he cannot grab him more than once
            if(this.game.adventurer.grabCount == 0 && this.turnCount == 0) {
                this.turnCount = this.turnCount + 1
                this.game.adventurer.grabCount += 3
                this.game.adventurer.grabMonster = this
            }
        }
    },
<<<<<<< HEAD

=======
>>>>>>> 682ab14a2d2967d1e43e74bf9f038f60d9eefbee
}


